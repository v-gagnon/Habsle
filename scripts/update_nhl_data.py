#!/usr/bin/env python3
"""
Script quotidien pour Habsle :
1. Récupère l'alignement (et les positions) depuis l'API LNH (roster/MTL/current)
2. Récupère les statistiques de la saison depuis l'API LNH (club-stats/MTL/now)
3. Récupère les statistiques en carrière de chaque joueur en parallèle (player/{id}/landing)
4. Récupère les trios, paires, blessés et unités spéciales (SN 1, SN 2, IN 1, IN 2) sur Daily Faceoff
5. Enregistre le tout dans nhl-data.json avec un rapport d'état (meta) pour #admin.
"""

from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
import json
import re
import sys
import ssl
import unicodedata
import urllib.request
import urllib.parse

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_JS_PATH = ROOT_DIR / "js" / "data.js"
OUTPUT_JSON_PATH = ROOT_DIR / "nhl-data.json"

NHL_SEARCH_URL = "https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=5&q={query}"
NHL_ROSTER_URL = "https://api-web.nhle.com/v1/roster/MTL/current"
NHL_STATS_URL = "https://api-web.nhle.com/v1/club-stats/MTL/now"
NHL_PLAYER_URL = "https://api-web.nhle.com/v1/player/{pid}/landing"
NHL_REALTIME_URL = "https://api.nhle.com/stats/rest/en/skater/realtime"
NHL_EDGE_SKATER_URL = "https://api-web.nhle.com/v1/edge/skater-detail/{pid}/now"
NHL_EDGE_SKATER_SEASON_URL = "https://api-web.nhle.com/v1/edge/skater-detail/{pid}/{season}/{game_type}"
DAILY_FACEOFF_URL = "https://www.dailyfaceoff.com/teams/montreal-canadiens/line-combinations"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, Gecko) Chrome/128.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-CA,fr;q=0.9,en-US;q=0.8,en;q=0.7",
}

UNIT_MAP = {
    "f1": "Trio 1",
    "f2": "Trio 2",
    "f3": "Trio 3",
    "f4": "Trio 4",
    "d1": "Paire 1",
    "d2": "Paire 2",
    "d3": "Paire 3",
    "g": "Gardien",
}

POS_MAP = {
    "lw": "AG",
    "c": "C",
    "rw": "AD",
    "ld": "D",
    "rd": "D",
    "g": "G",
}

SPECIAL_TEAMS_MAP = {
    "pp1": "SN 1",
    "pp2": "SN 2",
    "pk1": "IN 1",
    "pk2": "IN 2",
}

INJURY_GROUPS = {"ir", "ltir", "out", "injured", "inj"}
SCRATCH_GROUPS = {"scratch", "scratches", "extra", "extras", "healthy_scratch"}


def normalize_name(name: str) -> str:
    nfd = unicodedata.normalize("NFD", name or "")
    clean = "".join(c for c in nfd if unicodedata.category(c) != "Mn")
    clean = clean.replace("-", " ").replace("'", " ").replace(".", " ")
    return re.sub(r"\s+", " ", clean).strip().lower()


def create_ssl_context():
    ctx = ssl.create_default_context()
    # Charge le paquet de certificats système natif de macOS s'il est présent
    macos_cert = Path("/etc/ssl/cert.pem")
    if macos_cert.exists():
        try:
            ctx.load_verify_locations(cafile=str(macos_cert))
        except Exception:
            pass
    return ctx

SSL_CTX = create_ssl_context()
FALLBACK_SSL_CTX = ssl._create_unverified_context()


def fetch_bytes(url: str, timeout: int = 15) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=SSL_CTX) as resp:
            return resp.read()
    except Exception as e:
        if "CERTIFICATE_VERIFY_FAILED" in str(e):
            with urllib.request.urlopen(req, timeout=timeout, context=FALLBACK_SSL_CTX) as resp:
                return resp.read()
        raise


def fetch_json(url: str, timeout: int = 15):
    return json.loads(fetch_bytes(url, timeout=timeout).decode("utf-8", errors="ignore"))


def fetch_text(url: str, timeout: int = 15) -> str:
    return fetch_bytes(url, timeout=timeout).decode("utf-8", errors="ignore")


def load_previous_nhl_data() -> dict:
    if OUTPUT_JSON_PATH.exists():
        try:
            return json.loads(OUTPUT_JSON_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {}


def extract_ids_from_data_js() -> set[int]:
    ids = set()
    if DATA_JS_PATH.exists():
        content = DATA_JS_PATH.read_text(encoding="utf-8")
        for match in re.findall(r"id:\s*(\d+)", content):
            ids.add(int(match))
    return ids


def fetch_career_for_player(pid: int):
    url = NHL_PLAYER_URL.format(pid=pid)
    try:
        data = fetch_json(url, timeout=12)
        reg = data.get("careerTotals", {}).get("regularSeason")
        if isinstance(reg, dict):
            return str(pid), reg
    except Exception as e:
        print(f"[Carrière LNH] Erreur pour {pid}: {e}", file=sys.stderr)
    return str(pid), None

def _extract_realtime_map(rows: list) -> dict:
    result = {}
    for row in rows:
        pid = row.get("playerId")
        if pid is None:
            continue
        result[str(pid)] = {
            "hits": row.get("hits", 0),
            "blockedShots": row.get("blockedShots", 0),
            "takeaways": row.get("takeaways", 0),
            "giveaways": row.get("giveaways", 0),
        }
    return result


def fetch_realtime_stats(player_ids: set[int], season_id: str, game_type: int = 2) -> dict:
    """Récupère hits, blockedShots et takeaways (saison et carrière) via api.nhle.com."""
    ids_csv = ",".join(str(pid) for pid in sorted(player_ids))
    season_map = {}
    career_map = {}

    # 1. Saison en cours : essai par playerId in (...), repli par franchiseId=1 (MTL)
    season_queries = [
        f"seasonId={season_id} and gameTypeId={game_type} and playerId in ({ids_csv})",
        f"seasonId={season_id} and gameTypeId={game_type} and franchiseId=1",
    ]
    for q in season_queries:
        try:
            url = (
                f"{NHL_REALTIME_URL}?isAggregate=false&isGame=false&limit=100"
                f"&cayenneExp={urllib.parse.quote(q)}"
            )
            payload = fetch_json(url, timeout=15)
            rows = payload.get("data", []) if isinstance(payload, dict) else []
            if rows:
                season_map = _extract_realtime_map(rows)
                break
        except Exception as e:
            print(f"[Realtime Saison LNH] Essai échoué ({q}): {e}", file=sys.stderr)

    # 2. Carrière (saison régulière agrégée)
    try:
        q = f"gameTypeId=2 and playerId in ({ids_csv})"
        url = (
            f"{NHL_REALTIME_URL}?isAggregate=true&isGame=false&limit=100"
            f"&cayenneExp={urllib.parse.quote(q)}"
        )
        payload = fetch_json(url, timeout=15)
        rows = payload.get("data", []) if isinstance(payload, dict) else []
        career_map = _extract_realtime_map(rows)
    except Exception as e:
        print(f"[Realtime Carrière LNH] Erreur lot : {e}", file=sys.stderr)

    # Repli par joueur si la requête groupée carrière n'a rien renvoyé
    if not career_map and player_ids:
        def _fetch_one_career_rt(pid: int):
            q_one = f"gameTypeId=2 and playerId={pid}"
            url_one = (
                f"{NHL_REALTIME_URL}?isAggregate=true&isGame=false&limit=1"
                f"&cayenneExp={urllib.parse.quote(q_one)}"
            )
            try:
                p = fetch_json(url_one, timeout=10)
                r = p.get("data", []) if isinstance(p, dict) else []
                if r:
                    return str(pid), _extract_realtime_map(r).get(str(pid))
            except Exception:
                pass
            return str(pid), None

        with ThreadPoolExecutor(max_workers=6) as pool:
            for pid_str, entry in pool.map(_fetch_one_career_rt, sorted(player_ids)):
                if entry:
                    career_map[pid_str] = entry

    return {"season": season_map, "career": career_map}


def _extract_speed_kmh(val):
    """Extrait une vitesse en km/h depuis un objet NHL EDGE {metric, imperial} ou un nombre."""
    if isinstance(val, dict):
        if isinstance(val.get("metric"), (int, float)) and val["metric"] > 0:
            return round(float(val["metric"]), 1)
        if isinstance(val.get("imperial"), (int, float)) and val["imperial"] > 0:
            return round(float(val["imperial"]) * 1.60934, 1)
    elif isinstance(val, (int, float)) and val > 0:
        return round(float(val), 1)
    return None


def fetch_edge_for_skater(pid: int, season_id: str, game_type: int = 2):
    urls = [
        NHL_EDGE_SKATER_URL.format(pid=pid),
        NHL_EDGE_SKATER_SEASON_URL.format(pid=pid, season=season_id, game_type=game_type),
    ]
    for url in urls:
        try:
            data = fetch_json(url, timeout=12)
            if not isinstance(data, dict):
                continue

            skating_block = data.get("skatingSpeed") or {}
            shot_block = data.get("shotSpeed") or {}

            skating_kmh = (
                _extract_speed_kmh(skating_block.get("speedMax"))
                or _extract_speed_kmh(skating_block.get("maxSkatingSpeed"))
                or _extract_speed_kmh(data.get("topSkatingSpeed"))
                or _extract_speed_kmh(data.get("maxSkatingSpeed"))
            )
            shot_kmh = (
                _extract_speed_kmh(data.get("topShotSpeed"))
                or _extract_speed_kmh(shot_block.get("hardestShot"))
                or _extract_speed_kmh(shot_block.get("topShotSpeed"))
                or _extract_speed_kmh(data.get("hardestShot"))
            )

            if skating_kmh is not None or shot_kmh is not None:
                return str(pid), {
                    "skatingSpeedKmh": skating_kmh,
                    "shotSpeedKmh": shot_kmh,
                }
        except Exception:
            continue
    return str(pid), None

def find_df_players_list(node):
    if isinstance(node, dict):
        if "players" in node and isinstance(node["players"], list) and len(node["players"]) >= 10:
            sample = node["players"][0]
            if isinstance(sample, dict) and ("name" in sample or "groupIdentifier" in sample):
                return node["players"]
        for val in node.values():
            found = find_df_players_list(val)
            if found:
                return found
    elif isinstance(node, list):
        for item in node:
            found = find_df_players_list(item)
            if found:
                return found
    return None

def fetch_daily_faceoff_html() -> str:
    last_err = None

    # 1. Essai avec curl_cffi (imite l'empreinte TLS/HTTP2 de Chrome sur GitHub Actions)
    try:
        from curl_cffi import requests as cffi_requests
        resp = cffi_requests.get(DAILY_FACEOFF_URL, impersonate="chrome", timeout=15)
        if resp.status_code == 200 and "__NEXT_DATA__" in resp.text:
            return resp.text
        last_err = RuntimeError(f"HTTP {resp.status_code} via curl_cffi")
    except ImportError:
        pass
    except Exception as e:
        last_err = e

    # 2. Essai direct standard (fonctionne directement sur Mac)
    try:
        html = fetch_text(DAILY_FACEOFF_URL, timeout=15)
        if "__NEXT_DATA__" in html:
            return html
    except Exception as e:
        last_err = e

    # 3. Repli via relais web si l'IP de GitHub Actions reçoit un 403
    encoded_url = urllib.parse.quote(DAILY_FACEOFF_URL, safe="")
    proxy_urls = [
        f"https://api.allorigins.win/raw?url={encoded_url}",
        f"https://corsproxy.io/?{encoded_url}",
    ]
    for proxy_url in proxy_urls:
        try:
            html = fetch_text(proxy_url, timeout=20)
            if "__NEXT_DATA__" in html:
                return html
        except Exception as e:
            last_err = e

    raise last_err or RuntimeError("Impossible de récupérer Daily Faceoff")

def fetch_daily_faceoff_lines():
    html = fetch_daily_faceoff_html()
    match = re.search(
        r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',
        html,
        re.DOTALL,
    )
    if not match:
        raise ValueError("Balise __NEXT_DATA__ introuvable sur Daily Faceoff")

    next_data = json.loads(match.group(1))
    players_raw = find_df_players_list(next_data)
    if not players_raw:
        raise ValueError("Liste de joueurs introuvable dans __NEXT_DATA__")

    lines = {}
    for entry in players_raw:
        name = entry.get("name")
        group_id = (entry.get("groupIdentifier") or "").lower().strip()
        pos_id = (entry.get("positionIdentifier") or "").lower().strip()
        if not name or not group_id:
            continue

        key = normalize_name(name)
        info = lines.setdefault(
            key,
            {
                "name": name,
                "unit": None,
                "pos": None,
                "injured": False,
                "scratched": False,
                "outStatus": None,
                "specialTeams": [],
            },
        )

        if pos_id in POS_MAP and not info["pos"]:
            info["pos"] = POS_MAP[pos_id]

        if group_id in UNIT_MAP:
            info["unit"] = UNIT_MAP[group_id]
            if pos_id in POS_MAP:
                info["pos"] = POS_MAP[pos_id]
        elif group_id in SPECIAL_TEAMS_MAP:
            st_label = SPECIAL_TEAMS_MAP[group_id]
            if st_label not in info["specialTeams"]:
                info["specialTeams"].append(st_label)
        elif group_id in INJURY_GROUPS:
            info["injured"] = True
        elif group_id in SCRATCH_GROUPS:
            info["scratched"] = True

        injury_status = (entry.get("injuryStatus") or "").strip().lower()
        if injury_status and injury_status not in {"healthy", "active", "none"}:
            info["injured"] = True

        jersey_num = entry.get("jerseyNumber") or entry.get("number")
        if jersey_num is not None and "number" not in info:
            try:
                info["number"] = int(jersey_num)
            except (ValueError, TypeError):
                pass

    # Tri SN avant IN et détermination du statut hors alignement
    order = {"SN 1": 1, "SN 2": 2, "IN 1": 3, "IN 2": 4}
    for info in lines.values():
        if info["specialTeams"]:
            info["specialTeams"].sort(key=lambda x: order.get(x, 99))
        else:
            info["specialTeams"] = ["Aucune"]

        if not info["unit"] or info["unit"] == "Hors alignement":
            info["unit"] = "Hors alignement"
            info["outStatus"] = "Blessé" if info["injured"] else "Laissé de côté"
        else:
            info["outStatus"] = None

    return lines

def names_match(key_a: str, key_b: str) -> bool:
    if not key_a or not key_b:
        return False
    if key_a == key_b:
        return True
    parts_a = key_a.split(" ")
    parts_b = key_b.split(" ")
    if len(parts_a) < 2 or len(parts_b) < 2:
        return False
    return parts_a[0][0] == parts_b[0][0] and parts_a[-1] == parts_b[-1]


def enrich_missing_df_players(lines_data: dict, roster_data: dict, career_data: dict):
    """Cherche dans l'API LNH tout joueur présent sur Daily Faceoff mais absent de roster_data."""
    if not isinstance(lines_data, dict) or not isinstance(roster_data, dict):
        return

    existing_keys = set()
    for group in ("forwards", "defensemen", "goalies"):
        for p in roster_data.get(group, []):
            full_name = f"{p.get('firstName', {}).get('default', '')} {p.get('lastName', {}).get('default', '')}"
            existing_keys.add(normalize_name(full_name))

    for df_key, df_info in lines_data.items():
        if any(names_match(df_key, ek) for ek in existing_keys):
            for group in ("forwards", "defensemen", "goalies"):
                for p in roster_data.get(group, []):
                    full_name = f"{p.get('firstName', {}).get('default', '')} {p.get('lastName', {}).get('default', '')}"
                    if names_match(df_key, normalize_name(full_name)):
                        df_info["id"] = p.get("id")
            continue

        raw_name = df_info.get("name") or df_key
        try:
            q = urllib.parse.quote(raw_name)
            results = fetch_json(NHL_SEARCH_URL.format(query=q), timeout=10)
            if not isinstance(results, list) or not results:
                continue

            chosen = next(
                (r for r in results if r.get("teamAbbrev") == "MTL" or r.get("lastTeamAbbrev") == "MTL"),
                results[0],
            )
            pid = int(chosen["playerId"])
            landing = fetch_json(NHL_PLAYER_URL.format(pid=pid), timeout=12)
            if not isinstance(landing, dict):
                continue

            df_info["id"] = pid
            pos_code = landing.get("position", "C")
            synthetic_entry = {
                "id": pid,
                "headshot": landing.get("headshot"),
                "firstName": landing.get("firstName", {"default": raw_name.split(" ")[0]}),
                "lastName": landing.get("lastName", {"default": " ".join(raw_name.split(" ")[1:])}),
                "sweaterNumber": landing.get("sweaterNumber") or df_info.get("number"),
                "positionCode": pos_code,
                "shootsCatches": landing.get("shootsCatches"),
                "heightInInches": landing.get("heightInInches"),
                "weightInPounds": landing.get("weightInPounds"),
                "birthDate": landing.get("birthDate"),
                "birthCity": landing.get("birthCity"),
                "birthCountry": landing.get("birthCountry"),
                "birthStateProvince": landing.get("birthStateProvince"),
            }

            target_group = "goalies" if pos_code == "G" else "defensemen" if pos_code == "D" else "forwards"
            roster_data.setdefault(target_group, []).append(synthetic_entry)
            existing_keys.add(df_key)

            reg = landing.get("careerTotals", {}).get("regularSeason")
            if isinstance(reg, dict):
                career_data[str(pid)] = reg
        except Exception as e:
            print(f"[Enrichissement DF -> LNH] Erreur pour {raw_name}: {e}", file=sys.stderr)
            
def main():
    prev = load_previous_nhl_data()
    services_status = {}

    # 1. Alignement LNH
    try:
        roster_data = fetch_json(NHL_ROSTER_URL)
        r_count = (
            len(roster_data.get("forwards", []))
            + len(roster_data.get("defensemen", []))
            + len(roster_data.get("goalies", []))
        )
        services_status["nhlRoster"] = {
            "ok": r_count > 0,
            "count": r_count,
            "detail": f"Opérationnel ({r_count} joueurs reçus)",
        }
    except Exception as e:
        print(f"[Roster LNH] Erreur: {e}", file=sys.stderr)
        roster_data = prev.get("roster", {})
        services_status["nhlRoster"] = {
            "ok": False,
            "count": 0,
            "detail": f"Échec API ({e}) — cache conservé",
        }

    # 2. Statistiques Saison LNH
    try:
        stats_data = fetch_json(NHL_STATS_URL)
        s_count = len(stats_data.get("skaters", [])) + len(stats_data.get("goalies", []))
        services_status["nhlStats"] = {
            "ok": s_count > 0,
            "count": s_count,
            "detail": f"Opérationnel ({s_count} fiches de saison)",
        }
    except Exception as e:
        print(f"[Stats LNH] Erreur: {e}", file=sys.stderr)
        stats_data = prev.get("stats", {})
        services_status["nhlStats"] = {
            "ok": False,
            "count": 0,
            "detail": f"Échec API ({e}) — cache conservé",
        }

    # 3. Statistiques Carrière LNH (en parallèle)
    all_ids = extract_ids_from_data_js()
    for group in ("forwards", "defensemen", "goalies"):
        for p in roster_data.get(group, []):
            if "id" in p:
                all_ids.add(int(p["id"]))
    for group in ("skaters", "goalies"):
        for p in stats_data.get(group, []):
            if "playerId" in p:
                all_ids.add(int(p["playerId"]))

    career_data = dict(prev.get("career", {}))
    fetched_career_count = 0

    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(fetch_career_for_player, pid) for pid in sorted(all_ids)]
        for fut in as_completed(futures):
            pid_str, reg = fut.result()
            if reg is not None:
                career_data[pid_str] = reg
                fetched_career_count += 1

    services_status["nhlCareer"] = {
        "ok": fetched_career_count > 0,
        "count": fetched_career_count,
        "detail": f"Opérationnel ({fetched_career_count}/{len(all_ids)} fiches carrière à jour)",
    }

    # 4. Daily Faceoff (Trios, Hors alignement, SN/IN)
    try:
        lines_data = fetch_daily_faceoff_lines()
        enrich_missing_df_players(lines_data, roster_data, career_data)
        for group in ("forwards", "defensemen", "goalies"):
            for p in roster_data.get(group, []):
                if "id" in p:
                    all_ids.add(int(p["id"]))
        active_count = sum(1 for v in lines_data.values() if v.get("unit") and v.get("unit") != "Hors alignement")
        injured_count = sum(1 for v in lines_data.values() if v.get("unit") == "Hors alignement" and v.get("outStatus") == "Blessé")
        scratched_count = sum(1 for v in lines_data.values() if v.get("unit") == "Hors alignement" and v.get("outStatus") != "Blessé")
        services_status["dailyFaceoff"] = {
            "ok": len(lines_data) > 0,
            "count": len(lines_data),
            "detail": f"Opérationnel ({active_count} alignés, {injured_count} blessés, {scratched_count} laissés de côté)",
        }
    except Exception as e:
        print(f"[Daily Faceoff] Erreur: {e}", file=sys.stderr)
        lines_data = prev.get("lines", {})
        services_status["dailyFaceoff"] = {
            "ok": False,
            "count": len(lines_data),
            "detail": f"Échec d'extraction ({e}) — cache conservé",
        }

    # 5. Statistiques temps réel (mises en échec, tirs bloqués, revirements)
    season_id = str(stats_data.get("season", "20262027"))
    game_type = int(stats_data.get("gameType", 2))
    goalie_ids = {int(p["id"]) for p in roster_data.get("goalies", []) if "id" in p}
    goalie_ids.update(int(g["playerId"]) for g in stats_data.get("goalies", []) if "playerId" in g)
    skater_ids = {pid for pid in all_ids if pid not in goalie_ids}

    prev_realtime = prev.get("realtime", {"season": {}, "career": {}})
    try:
        realtime_data = fetch_realtime_stats(skater_ids, season_id, game_type)
        rt_season_count = len(realtime_data.get("season", {}))
        rt_career_count = len(realtime_data.get("career", {}))
        if rt_season_count == 0 and prev_realtime.get("season"):
            realtime_data["season"] = prev_realtime["season"]
        if rt_career_count == 0 and prev_realtime.get("career"):
            realtime_data["career"] = prev_realtime["career"]
        services_status["nhlRealtime"] = {
            "ok": rt_season_count > 0,
            "count": rt_season_count,
            "detail": f"Opérationnel ({rt_season_count} saison, {rt_career_count} carrière)",
        }
    except Exception as e:
        print(f"[Realtime LNH] Erreur: {e}", file=sys.stderr)
        realtime_data = prev_realtime
        services_status["nhlRealtime"] = {
            "ok": False,
            "count": 0,
            "detail": f"Échec API ({e}) — cache conservé",
        }

    # 6. Données NHL EDGE (vitesse de patinage & vitesse de tir)
    edge_data = dict(prev.get("edge", {}))
    fetched_edge_count = 0
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [
            pool.submit(fetch_edge_for_skater, pid, season_id, game_type)
            for pid in sorted(skater_ids)
        ]
        for fut in as_completed(futures):
            pid_str, entry = fut.result()
            if entry is not None:
                edge_data[pid_str] = entry
                fetched_edge_count += 1

    services_status["nhlEdge"] = {
        "ok": fetched_edge_count > 0,
        "count": fetched_edge_count,
        "detail": (
            f"Opérationnel ({fetched_edge_count}/{len(skater_ids)} fiches EDGE)"
            if fetched_edge_count > 0
            else "Non disponible — cache conservé"
        ),
    }

    output = {
        "meta": {
            "updatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "services": services_status,
        },
        "roster": roster_data,
        "stats": stats_data,
        "career": career_data,
        "realtime": realtime_data,
        "edge": edge_data,
        "lines": lines_data,
    }

    OUTPUT_JSON_PATH.write_text(
        json.dumps(output, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"nhl-data.json généré avec succès ({len(all_ids)} joueurs).")

if __name__ == "__main__":
    main()