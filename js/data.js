// Alignement et statistiques 2026-2027 des Canadiens de Montréal
// Sources : NHL.com (nhl.com/canadiens/stats), Hockey-Reference & Daily Faceoff (nov. 2026)
const PLAYERS = [
  // --- TRIO 1 ---
  {
    id: 8480018, name: "Nick Suzuki", number: 14, pos: "C", posGroup: "ATT", unit: "Trio 1", unitGroup: "Trio",
    age: 27, shoots: "D", country: "CAN", height: "5'11\"", weight: 207, hometown: "London, ON",
    note: "Capitaine du CH, centre du 1er trio",
    stats: { gp: 10, g: 6, a: 9, pts: 15, plusMinus: 8, pim: 2, ppg: 1, gwg: 0, shots: 30, shPct: "20.0%", toi: "21:37", fowPct: "53.9%" }
  },
  {
    id: 8481540, name: "Cole Caufield", number: 13, pos: "AD", posGroup: "ATT", unit: "Trio 1", unitGroup: "Trio",
    age: 25, shoots: "D", country: "USA", height: "5'8\"", weight: 175, hometown: "Mosinee, WI",
    note: "Franc-tireur de 1er trio et 1re vague d'avantage numérique",
    stats: { gp: 16, g: 11, a: 4, pts: 15, plusMinus: 5, pim: 8, ppg: 2, gwg: 3, shots: 54, shPct: "20.4%", toi: "18:39", fowPct: "60.0%" }
  },
  {
    id: 8483515, name: "Juraj Slafkovský", number: 20, pos: "AG", posGroup: "ATT", unit: "Trio 1", unitGroup: "Trio",
    age: 22, shoots: "G", country: "SVK", height: "6'3\"", weight: 225, hometown: "Košice, SVK",
    note: "1er choix au total en 2022, ailier de puissance du 1er trio",
    stats: { gp: 16, g: 2, a: 10, pts: 12, plusMinus: 0, pim: 14, ppg: 0, gwg: 0, shots: 39, shPct: "5.1%", toi: "18:14", fowPct: "31.3%" }
  },

  // --- TRIO 2 ---
  {
    id: 8481618, name: "Alex Newhook", number: 15, pos: "AG", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio",
    age: 25, shoots: "G", country: "CAN", height: "5'11\"", weight: 200, hometown: "St. John's, NL",
    note: "Attaquant rapide polyvalent (centre / ailier gauche)",
    stats: { gp: 16, g: 3, a: 4, pts: 7, plusMinus: -3, pim: 12, ppg: 0, gwg: 0, shots: 15, shPct: "20.0%", toi: "16:30", fowPct: "50.3%" }
  },
  {
    id: 8482775, name: "Oliver Kapanen", number: 91, pos: "C", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio",
    age: 23, shoots: "D", country: "FIN", height: "6'2\"", weight: 194, hometown: "Timrå, SWE",
    note: "Centre intelligent repêché au 2e tour en 2021",
    stats: { gp: 9, g: 1, a: 0, pts: 1, plusMinus: -1, pim: 2, ppg: 0, gwg: 0, shots: 8, shPct: "12.5%", toi: "11:40", fowPct: "47.5%" }
  },
  {
    id: 8481523, name: "Kirby Dach", number: 77, pos: "AD", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio",
    age: 25, shoots: "D", country: "CAN", height: "6'4\"", weight: 221, hometown: "Fort Saskatchewan, AB",
    note: "Attaquant format géant évoluant au centre et à l'aile droite",
    stats: { gp: 14, g: 1, a: 4, pts: 5, plusMinus: 0, pim: 6, ppg: 1, gwg: 0, shots: 11, shPct: "9.1%", toi: "10:48", fowPct: "43.8%" }
  },
  {
    id: 8484984, name: "Ivan Demidov", number: 93, pos: "AD", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio",
    age: 20, shoots: "G", country: "RUS", height: "6'1\"", weight: 192, hometown: "Sergiyev Posad, RUS",
    note: "5e choix au total en 2024, ailier créatif électrisant",
    stats: { gp: 2, g: 1, a: 1, pts: 2, plusMinus: 0, pim: 2, ppg: 0, gwg: 0, shots: 4, shPct: "25.0%", toi: "15:37", fowPct: "—" }
  },

  // --- TRIO 3 ---
  {
    id: 8482737, name: "Zachary Bolduc", number: 76, pos: "AD", posGroup: "ATT", unit: "Trio 3", unitGroup: "Trio",
    age: 23, shoots: "G", country: "CAN", height: "6'0\"", weight: 187, hometown: "Trois-Rivières, QC",
    note: "Ailier québécois acquis de Saint-Louis en juillet 2025",
    stats: { gp: 16, g: 5, a: 2, pts: 7, plusMinus: 1, pim: 4, ppg: 2, gwg: 1, shots: 27, shPct: "18.5%", toi: "13:58", fowPct: "—" }
  },
  {
    id: 8476479, name: "Phillip Danault", number: 24, pos: "C", posGroup: "ATT", unit: "Trio 3", unitGroup: "Trio",
    age: 33, shoots: "G", country: "CAN", height: "6'1\"", weight: 200, hometown: "Victoriaville, QC",
    note: "Spécialiste défensif et des mises au jeu revenu à Montréal",
    stats: { gp: 16, g: 1, a: 5, pts: 6, plusMinus: 4, pim: 0, ppg: 0, gwg: 0, shots: 22, shPct: "4.5%", toi: "17:05", fowPct: "54.7%" }
  },
  {
    id: 8480074, name: "Alexandre Texier", number: 85, pos: "AG", posGroup: "ATT", unit: "Trio 3", unitGroup: "Trio",
    age: 27, shoots: "G", country: "FRA", height: "6'1\"", weight: 196, hometown: "Saint-Martin-d'Hères, FRA",
    note: "Attaquant français agile sur le 3e trio",
    stats: { gp: 16, g: 2, a: 3, pts: 5, plusMinus: -2, pim: 10, ppg: 0, gwg: 0, shots: 22, shPct: "9.1%", toi: "13:14", fowPct: "—" }
  },

  // --- TRIO 4 & ATTAQUANTS DE PROFONDEUR ---
  {
    id: 8475184, name: "Chris Kreider", number: 22, pos: "AG", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 35, shoots: "G", country: "USA", height: "6'3\"", weight: 232, hometown: "Boxford, MA",
    note: "Vétéran expérimenté redoutable devant le filet",
    stats: { gp: 16, g: 2, a: 6, pts: 8, plusMinus: 4, pim: 6, ppg: 0, gwg: 0, shots: 17, shPct: "11.8%", toi: "13:46", fowPct: "33.3%" }
  },
  {
    id: 8478133, name: "Jake Evans", number: 71, pos: "C", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 30, shoots: "D", country: "CAN", height: "6'0\"", weight: 190, hometown: "Toronto, ON",
    note: "Pilier du désavantage numérique au centre du 4e trio",
    stats: { gp: 16, g: 2, a: 4, pts: 6, plusMinus: 5, pim: 2, ppg: 0, gwg: 1, shots: 12, shPct: "16.7%", toi: "15:24", fowPct: "54.8%" }
  },
  {
    id: 8483424, name: "Owen Beck", number: 62, pos: "C", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 22, shoots: "D", country: "CAN", height: "6'0\"", weight: 199, hometown: "Port Hope, ON",
    note: "Jeune centre fiable dans les deux sens de la patinoire",
    stats: { gp: 5, g: 1, a: 2, pts: 3, plusMinus: 0, pim: 5, ppg: 0, gwg: 0, shots: 6, shPct: "16.7%", toi: "08:42", fowPct: "57.1%" }
  },
  {
    id: 8476981, name: "Josh Anderson", number: 17, pos: "AD", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 32, shoots: "D", country: "CAN", height: "6'3\"", weight: 226, hometown: "Burlington, ON",
    note: "Ailier droit robuste et très rapide en transition",
    stats: { gp: 16, g: 7, a: 3, pts: 10, plusMinus: 8, pim: 16, ppg: 0, gwg: 1, shots: 33, shPct: "21.2%", toi: "14:28", fowPct: "33.3%" }
  },
  {
    id: 8484403, name: "Florian Xhekaj", number: 63, pos: "AG", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 22, shoots: "G", country: "CAN", height: "6'3\"", weight: 195, hometown: "Hamilton, ON",
    note: "Frère cadet d'Arber, attaquant robuste et énergique",
    stats: { gp: 7, g: 1, a: 2, pts: 3, plusMinus: -1, pim: 13, ppg: 0, gwg: 0, shots: 9, shPct: "11.1%", toi: "07:53", fowPct: "20.0%" }
  },

  // --- DÉFENSEURS (PAIRES 1 À 3) ---
  {
    id: 8483457, name: "Lane Hutson", number: 48, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "Paire",
    age: 22, shoots: "G", country: "USA", height: "5'9\"", weight: 162, hometown: "Holland, MI",
    note: "Quart-arrière offensif ultra-mobile à la ligne bleue",
    stats: { gp: 16, g: 3, a: 13, pts: 16, plusMinus: 8, pim: 8, ppg: 1, gwg: 0, shots: 29, shPct: "10.3%", toi: "24:59", fowPct: "—" }
  },
  {
    id: 8480865, name: "Noah Dobson", number: 53, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "Paire",
    age: 26, shoots: "D", country: "CAN", height: "6'4\"", weight: 200, hometown: "Summerside, PE",
    note: "Défenseur droitier numéro un sur la première paire",
    stats: { gp: 16, g: 0, a: 8, pts: 8, plusMinus: 1, pim: 12, ppg: 0, gwg: 0, shots: 34, shPct: "0.0%", toi: "20:56", fowPct: "—" }
  },
  {
    id: 8482087, name: "Kaiden Guhle", number: 21, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "Paire",
    age: 24, shoots: "G", country: "CAN", height: "6'3\"", weight: 202, hometown: "Edmonton, AB",
    note: "Défenseur complet affrontant les meilleurs trios adverses",
    stats: { gp: 12, g: 2, a: 3, pts: 5, plusMinus: 3, pim: 10, ppg: 0, gwg: 1, shots: 14, shPct: "14.3%", toi: "23:03", fowPct: "—" }
  },
  {
    id: 8478851, name: "Alexandre Carrier", number: 45, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "Paire",
    age: 30, shoots: "D", country: "CAN", height: "5'11\"", weight: 174, hometown: "Québec, QC",
    note: "Défenseur droitier québécois fiable en relance",
    stats: { gp: 16, g: 1, a: 5, pts: 6, plusMinus: 5, pim: 12, ppg: 0, gwg: 1, shots: 14, shPct: "7.1%", toi: "20:36", fowPct: "—" }
  },
  {
    id: 8476875, name: "Mike Matheson", number: 8, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "Paire",
    age: 32, shoots: "G", country: "CAN", height: "6'2\"", weight: 196, hometown: "Pointe-Claire, QC",
    note: "Vétéran originaire de Pointe-Claire au coup de patin élite",
    stats: { gp: 8, g: 1, a: 3, pts: 4, plusMinus: 1, pim: 6, ppg: 0, gwg: 0, shots: 15, shPct: "6.7%", toi: "23:45", fowPct: "—" }
  },
  {
    id: 8482964, name: "Arber Xhekaj", number: 72, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "Paire",
    age: 25, shoots: "G", country: "CAN", height: "6'4\"", weight: 240, hometown: "Hamilton, ON",
    note: "Surnommé le Shérif, défenseur physique au tir frappé lourd",
    stats: { gp: 15, g: 1, a: 2, pts: 3, plusMinus: -1, pim: 30, ppg: 0, gwg: 0, shots: 11, shPct: "9.1%", toi: "11:51", fowPct: "—" }
  },
  {
    id: 8483686, name: "Adam Engström", number: 42, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "Paire",
    age: 22, shoots: "G", country: "SWE", height: "6'2\"", weight: 193, hometown: "Järna, SWE",
    note: "Défenseur suédois fluide repêché en 2022",
    stats: { gp: 10, g: 1, a: 1, pts: 2, plusMinus: 5, pim: 0, ppg: 0, gwg: 0, shots: 11, shPct: "9.1%", toi: "11:25", fowPct: "—" }
  },

  // --- GARDIENS ---
  {
    id: 8484170, name: "Jacob Fowler", number: 32, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "Gardien",
    age: 21, shoots: "G", country: "USA", height: "6'1\"", weight: 223, hometown: "Melbourne, FL",
    note: "Jeune gardien calme et technique devant le filet",
    stats: { gp: 9, gs: 9, w: 7, l: 1, otl: 1, gaa: "2.17", svPct: ".925", so: 2, saves: 247, shotsAgainst: 267 }
  },
  {
    id: 8482487, name: "Jakub Dobeš", number: 75, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "Gardien",
    age: 25, shoots: "G", country: "CZE", height: "6'4\"", weight: 215, hometown: "Ostrava, CZE",
    note: "Gardien tchèque imposant de 6 pieds 4 pouces",
    stats: { gp: 7, gs: 7, w: 3, l: 2, otl: 2, gaa: "4.04", svPct: ".860", so: 0, saves: 172, shotsAgainst: 200 }
  },
  {
    id: 8478470, name: "Samuel Montembeault", number: 35, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "Gardien",
    age: 30, shoots: "G", country: "CAN", height: "6'3\"", weight: 218, hometown: "Bécancour, QC",
    note: "Gardien québécois vétéran devant le filet du Tricolore",
    stats: { gp: 0, gs: 0, w: 0, l: 0, otl: 0, gaa: "—", svPct: "—", so: 0, saves: 0, shotsAgainst: 0 }
  }
];

const MAX_ATTEMPTS = 8;
const DAILY_STORAGE_KEY = "habsle_daily_state_v2";
const DAILY_REMIX_STORAGE_KEY = "habsle_daily_remix_state_v2";
const DAILY_EXPERT_STORAGE_KEY = "habsle_daily_expert_state_v1";
const DAILY_IMAGE_STORAGE_KEY = "habsle_daily_image_state_v1";
const CUSTOM_PREFS_STORAGE_KEY = "habsle_custom_prefs_v1";
const NHL_CACHE_KEY = "habsle_nhl_api_cache_v1";

const UNITS_ORDER = ["Trio 1", "Trio 2", "Trio 3", "Trio 4", "Paire 1", "Paire 2", "Paire 3", "Gardien"];
const CLASSIC_COLUMNS = ["number", "pos", "unit", "shoots", "age"];
const STAT_POOL_COLUMNS = ["country", "gp", "g", "a", "pts", "plusMinus", "pim", "shots", "toi", "height", "weight"];
const ALL_AVAILABLE_COLUMNS = [...CLASSIC_COLUMNS, ...STAT_POOL_COLUMNS];

function getPlayerPhotoUrl(player) {
  return player.headshotUrl || `https://assets.nhle.com/mugs/nhl/20262027/MTL/${player.id}.png`;
}

function getPlayerFallbackPhotoUrl(player) {
  return `https://assets.nhle.com/mugs/nhl/latest/${player.id}.png`;
}

function parseHeightToInches(heightStr) {
  if (!heightStr) return 72;
  const match = heightStr.match(/(\d+)'(\d+)/);
  if (!match) return 72;
  return parseInt(match[1], 10) * 12 + parseInt(match[2], 10);
}

function parseMMSS(mmss) {
  if (!mmss || mmss === "—") return null;
  const parts = mmss.split(":");
  if (parts.length !== 2) return null;
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

function compareNumericClue(guessVal, secretVal, closeThreshold, displayStr, upLabel = "▲ Plus haut", downLabel = "▼ Plus bas") {
  if (guessVal === null || secretVal === null || isNaN(guessVal) || isNaN(secretVal)) {
    const bothMissing = guessVal === secretVal;
    return {
      text: displayStr,
      status: bothMissing ? "exact" : "wrong",
      sub: ""
    };
  }
  const diff = secretVal - guessVal;
  const status = diff === 0 ? "exact" : Math.abs(diff) <= closeThreshold ? "close" : "wrong";
  const sub = diff === 0 ? "" : diff > 0 ? upLabel : downLabel;
  return { text: displayStr, status, sub };
}

const CLUE_DEFINITIONS = {
  number: {
    label: "#",
    fullName: "Numéro (#)",
    interval: "(±5)",
    isStat: false,
    evaluate(player, secret) {
      return compareNumericClue(player.number, secret.number, 5, `#${player.number}`);
    }
  },
  pos: {
    label: "Pos",
    fullName: "Position",
    interval: "(Groupe)",
    isStat: false,
    evaluate(player, secret) {
      const status =
        player.pos === secret.pos
          ? "exact"
          : player.posGroup === secret.posGroup
          ? "close"
          : "wrong";
      return { text: player.pos, status, sub: "" };
    }
  },
  unit: {
    label: "Unité",
    fullName: "Unité / Trio",
    interval: "(Groupe)",
    isStat: false,
    evaluate(player, secret) {
      const status =
        player.unit === secret.unit
          ? "exact"
          : player.unitGroup === secret.unitGroup
          ? "close"
          : "wrong";
      return { text: player.unit, status, sub: "" };
    }
  },
  shoots: {
    label: "Lancer",
    fullName: "Lancer (G/D)",
    interval: "",
    isStat: false,
    evaluate(player, secret) {
      return {
        text: player.shoots,
        status: player.shoots === secret.shoots ? "exact" : "wrong",
        sub: ""
      };
    }
  },
  age: {
    label: "Âge",
    fullName: "Âge",
    interval: "(±2)",
    isStat: false,
    evaluate(player, secret) {
      return compareNumericClue(
        player.age,
        secret.age,
        2,
        `${player.age} ans`,
        "▲ Plus vieux",
        "▼ Plus jeune"
      );
    }
  },
  country: {
    label: "Pays",
    fullName: "Pays",
    interval: "",
    isStat: true,
    evaluate(player, secret) {
      return {
        text: player.country,
        status: player.country === secret.country ? "exact" : "wrong",
        sub: ""
      };
    }
  },
  gp: {
    label: "MJ",
    fullName: "Matchs joués",
    interval: "(±3)",
    isStat: true,
    evaluate(player, secret) {
      const gVal = player.stats?.gp ?? 0;
      const sVal = secret.stats?.gp ?? 0;
      return compareNumericClue(gVal, sVal, 3, `${gVal} MJ`);
    }
  },
  g: {
    label: "Buts",
    fullName: "Buts",
    interval: "(±2)",
    isStat: true,
    evaluate(player, secret) {
      const gVal = player.stats?.g ?? 0;
      const sVal = secret.stats?.g ?? 0;
      return compareNumericClue(gVal, sVal, 2, `${gVal} B`);
    }
  },
  a: {
    label: "Passes",
    fullName: "Passes",
    interval: "(±2)",
    isStat: true,
    evaluate(player, secret) {
      const gVal = player.stats?.a ?? 0;
      const sVal = secret.stats?.a ?? 0;
      return compareNumericClue(gVal, sVal, 2, `${gVal} A`);
    }
  },
  pts: {
    label: "Points",
    fullName: "Points",
    interval: "(±3)",
    isStat: true,
    evaluate(player, secret) {
      const gVal = player.stats?.pts ?? 0;
      const sVal = secret.stats?.pts ?? 0;
      return compareNumericClue(gVal, sVal, 3, `${gVal} Pts`);
    }
  },
  plusMinus: {
    label: "+/-",
    fullName: "Différentiel (+/-)",
    interval: "(±2)",
    isStat: true,
    evaluate(player, secret) {
      const gIsGoalie = player.posGroup === "GAR";
      const sIsGoalie = secret.posGroup === "GAR";
      if (gIsGoalie || sIsGoalie) {
        const gText = gIsGoalie ? "—" : (player.stats?.plusMinus > 0 ? `+${player.stats.plusMinus}` : `${player.stats?.plusMinus ?? 0}`);
        return {
          text: gText,
          status: gIsGoalie && sIsGoalie ? "exact" : "wrong",
          sub: ""
        };
      }
      const gVal = player.stats?.plusMinus ?? 0;
      const sVal = secret.stats?.plusMinus ?? 0;
      const formatted = gVal > 0 ? `+${gVal}` : `${gVal}`;
      return compareNumericClue(gVal, sVal, 2, formatted);
    }
  },
  pim: {
    label: "PUN",
    fullName: "Punitions (PUN)",
    interval: "(±4)",
    isStat: true,
    evaluate(player, secret) {
      const gVal = player.stats?.pim ?? 0;
      const sVal = secret.stats?.pim ?? 0;
      return compareNumericClue(gVal, sVal, 4, `${gVal} min`);
    }
  },
  shots: {
    label: "Tirs",
    fullName: "Tirs au but",
    interval: "(±8)",
    isStat: true,
    evaluate(player, secret) {
      const gVal = player.stats?.shots ?? 0;
      const sVal = secret.stats?.shots ?? 0;
      return compareNumericClue(gVal, sVal, 8, `${gVal} tirs`);
    }
  },
  toi: {
    label: "TG/M",
    fullName: "Temps de glace",
    interval: "(±2:00)",
    isStat: true,
    evaluate(player, secret) {
      const gStr = player.posGroup === "GAR" ? (player.stats?.gp > 0 ? "60:00" : "—") : (player.stats?.toi || "—");
      const sStr = secret.posGroup === "GAR" ? (secret.stats?.gp > 0 ? "60:00" : "—") : (secret.stats?.toi || "—");
      const gSec = parseMMSS(gStr);
      const sSec = parseMMSS(sStr);
      return compareNumericClue(gSec, sSec, 120, gStr);
    }
  },
  height: {
    label: "Taille",
    fullName: "Taille",
    interval: "(±2\")",
    isStat: true,
    evaluate(player, secret) {
      const gIn = parseHeightToInches(player.height);
      const sIn = parseHeightToInches(secret.height);
      return compareNumericClue(
        gIn,
        sIn,
        2,
        player.height,
        "▲ Plus grand",
        "▼ Plus petit"
      );
    }
  },
  weight: {
    label: "Poids",
    fullName: "Poids (lb)",
    interval: "(±10)",
    isStat: true,
    evaluate(player, secret) {
      return compareNumericClue(
        player.weight,
        secret.weight,
        10,
        `${player.weight} lb`,
        "▲ Plus lourd",
        "▼ Plus léger"
      );
    }
  }
};

// --- SYNCHRONISATION AVEC L'API OFFICIELLE DE LA LNH ---
function formatSecondsToMMSS(seconds) {
  if (!seconds || isNaN(seconds)) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = String(Math.round(seconds % 60)).padStart(2, "0");
  return `${mins}:${secs}`;
}

function calculateAgeFromBirthDate(birthDateStr) {
  if (!birthDateStr) return null;
  const birth = new Date(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function applyNHLAPIData(rosterData, statsData) {
  if (rosterData) {
    const allRosterEntries = [
      ...(rosterData.forwards || []),
      ...(rosterData.defensemen || []),
      ...(rosterData.goalies || [])
    ];

    allRosterEntries.forEach(entry => {
      const player = PLAYERS.find(p => p.id === entry.id);
      if (!player) return;

      if (typeof entry.sweaterNumber === "number") {
        player.number = entry.sweaterNumber;
      }
      if (entry.shootsCatches) {
        player.shoots = entry.shootsCatches === "L" ? "G" : "D";
      }
      if (entry.birthCountry) {
        player.country = entry.birthCountry;
      }
      if (entry.birthDate) {
        const computedAge = calculateAgeFromBirthDate(entry.birthDate);
        if (computedAge) player.age = computedAge;
      }
      if (entry.headshot) {
        player.headshotUrl = entry.headshot;
      }
      if (typeof entry.weightInPounds === "number") {
        player.weight = entry.weightInPounds;
      }
    });
  }

  if (statsData) {
    if (Array.isArray(statsData.skaters)) {
      statsData.skaters.forEach(s => {
        const player = PLAYERS.find(p => p.id === s.playerId);
        if (!player || player.posGroup === "GAR") return;

        player.stats = {
          gp: s.gamesPlayed ?? 0,
          g: s.goals ?? 0,
          a: s.assists ?? 0,
          pts: s.points ?? 0,
          plusMinus: s.plusMinus ?? 0,
          pim: s.penaltyMinutes ?? 0,
          ppg: s.powerPlayGoals ?? 0,
          gwg: s.gameWinningGoals ?? 0,
          shots: s.shots ?? 0,
          shPct: typeof s.shootingPctg === "number" ? `${(s.shootingPctg * 100).toFixed(1)}%` : "0.0%",
          toi: formatSecondsToMMSS(s.avgTimeOnIcePerGame),
          fowPct: typeof s.faceoffWinPctg === "number" && s.faceoffWinPctg > 0
            ? `${(s.faceoffWinPctg * 100).toFixed(1)}%`
            : "—"
        };
      });
    }

    if (Array.isArray(statsData.goalies)) {
      statsData.goalies.forEach(g => {
        const player = PLAYERS.find(p => p.id === g.playerId);
        if (!player || player.posGroup !== "GAR") return;

        player.stats = {
          gp: g.gamesPlayed ?? 0,
          gs: g.gamesStarted ?? 0,
          w: g.wins ?? 0,
          l: g.losses ?? 0,
          otl: g.overtimeLosses ?? 0,
          gaa: typeof g.goalsAgainstAverage === "number" ? g.goalsAgainstAverage.toFixed(2) : "—",
          svPct: typeof g.savePercentage === "number" ? g.savePercentage.toFixed(3).replace(/^0/, "") : "—",
          so: g.shutouts ?? 0,
          saves: g.saves ?? 0,
          shotsAgainst: g.shotsAgainst ?? 0
        };
      });
    }
  }
}

async function fetchViaCORSFallback(targetUrl) {
  const proxies = [
    url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  ];

  for (const buildProxyUrl of proxies) {
    try {
      const response = await fetch(buildProxyUrl(targetUrl));
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {}
  }
  return null;
}

async function syncWithNHLAPI(forceRefresh = false) {
  const apiSyncStatusEl = document.getElementById("api-sync-status");

  if (!forceRefresh) {
    try {
      const cached = JSON.parse(localStorage.getItem(NHL_CACHE_KEY) || "null");
      if (cached && Date.now() - cached.timestamp < 6 * 3600 * 1000) {
        applyNHLAPIData(cached.roster, cached.stats);
        if (apiSyncStatusEl) {
          apiSyncStatusEl.textContent = "Synchronisé avec l'API LNH (cache du jour)";
        }
        return;
      }
    } catch (e) {}
  }

  if (apiSyncStatusEl) {
    apiSyncStatusEl.textContent = "Synchronisation avec l'API LNH en cours...";
  }

  try {
    const localResp = await fetch("./nhl-data.json", { cache: "no-store" });
    if (localResp.ok) {
      const localData = await localResp.json();
      applyNHLAPIData(localData.roster, localData.stats);
      if (apiSyncStatusEl) {
        apiSyncStatusEl.textContent = "Données synchronisées";
      }
      if (typeof renderStudyDirectory === "function" && currentView === "study") {
        renderStudyDirectory(document.getElementById("study-search-input")?.value || "");
      }
      return;
    }
  } catch (e) {}

  const [rosterData, statsData] = await Promise.all([
    fetchViaCORSFallback("https://api-web.nhle.com/v1/roster/MTL/current"),
    fetchViaCORSFallback("https://api-web.nhle.com/v1/club-stats/MTL/now")
  ]);

  if (rosterData || statsData) {
    applyNHLAPIData(rosterData, statsData);
    try {
      localStorage.setItem(
        NHL_CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), roster: rosterData, stats: statsData })
      );
    } catch (e) {}

    if (apiSyncStatusEl) {
      apiSyncStatusEl.textContent = "Synchronisé en direct avec api-web.nhle.com";
    }
    if (typeof renderStudyDirectory === "function" && currentView === "study") {
      renderStudyDirectory(document.getElementById("study-search-input")?.value || "");
    }
  } else if (apiSyncStatusEl) {
    apiSyncStatusEl.textContent = "Données LNH 2026-2027 intégrées actives";
  }
}