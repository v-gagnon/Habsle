// Alignement et statistiques 2026-2027 des Canadiens de Montréal
// Sources : NHL.com (nhl.com/canadiens/stats), Hockey-Reference & Daily Faceoff (nov. 2026)
const PLAYERS = [
  // --- TRIO 1 ---
  {
    id: 8480018, name: "Nick Suzuki", number: 14, pos: "C", posGroup: "ATT", unit: "Trio 1", unitGroup: "Trio",
    age: 27, shoots: "D", country: "CAN", height: "5'11\"", hometown: "London, ON",
    note: "Capitaine du CH, centre du 1er trio",
    stats: { gp: 10, g: 6, a: 9, pts: 15, plusMinus: 8, pim: 2, ppg: 1, gwg: 0, shots: 30, shPct: "20.0%", toi: "21:37", fowPct: "53.9%" }
  },
  {
    id: 8481540, name: "Cole Caufield", number: 13, pos: "AD", posGroup: "ATT", unit: "Trio 1", unitGroup: "Trio",
    age: 25, shoots: "D", country: "USA", height: "5'8\"", hometown: "Mosinee, WI",
    note: "Franc-tireur de 1er trio et 1re vague d'avantage numérique",
    stats: { gp: 16, g: 11, a: 4, pts: 15, plusMinus: 5, pim: 8, ppg: 2, gwg: 3, shots: 54, shPct: "20.4%", toi: "18:39", fowPct: "60.0%" }
  },
  {
    id: 8483515, name: "Juraj Slafkovský", number: 20, pos: "AG", posGroup: "ATT", unit: "Trio 1", unitGroup: "Trio",
    age: 22, shoots: "G", country: "SVK", height: "6'3\"", hometown: "Košice, SVK",
    note: "1er choix au total en 2022, ailier de puissance du 1er trio",
    stats: { gp: 16, g: 2, a: 10, pts: 12, plusMinus: 0, pim: 14, ppg: 0, gwg: 0, shots: 39, shPct: "5.1%", toi: "18:14", fowPct: "31.3%" }
  },

  // --- TRIO 2 ---
  {
    id: 8481618, name: "Alex Newhook", number: 15, pos: "AG", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio",
    age: 25, shoots: "G", country: "CAN", height: "5'11\"", hometown: "St. John's, NL",
    note: "Attaquant rapide polyvalent (centre / ailier gauche)",
    stats: { gp: 16, g: 3, a: 4, pts: 7, plusMinus: -3, pim: 12, ppg: 0, gwg: 0, shots: 15, shPct: "20.0%", toi: "16:30", fowPct: "50.3%" }
  },
  {
    id: 8482775, name: "Oliver Kapanen", number: 91, pos: "C", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio",
    age: 23, shoots: "D", country: "FIN", height: "6'2\"", hometown: "Timrå, SWE",
    note: "Centre intelligent repêché au 2e tour en 2021",
    stats: { gp: 9, g: 1, a: 0, pts: 1, plusMinus: -1, pim: 2, ppg: 0, gwg: 0, shots: 8, shPct: "12.5%", toi: "11:40", fowPct: "47.5%" }
  },
  {
    id: 8481523, name: "Kirby Dach", number: 77, pos: "AD", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio",
    age: 25, shoots: "D", country: "CAN", height: "6'4\"", hometown: "Fort Saskatchewan, AB",
    note: "Attaquant format géant évoluant au centre et à l'aile droite",
    stats: { gp: 14, g: 1, a: 4, pts: 5, plusMinus: 0, pim: 6, ppg: 1, gwg: 0, shots: 11, shPct: "9.1%", toi: "10:48", fowPct: "43.8%" }
  },
  {
    id: 8484984, name: "Ivan Demidov", number: 93, pos: "AD", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio",
    age: 20, shoots: "G", country: "RUS", height: "6'1\"", hometown: "Sergiyev Posad, RUS",
    note: "5e choix au total en 2024, ailier créatif électrisant",
    stats: { gp: 2, g: 1, a: 1, pts: 2, plusMinus: 0, pim: 2, ppg: 0, gwg: 0, shots: 4, shPct: "25.0%", toi: "15:37", fowPct: "—" }
  },

  // --- TRIO 3 ---
  {
    id: 8482737, name: "Zachary Bolduc", number: 76, pos: "AD", posGroup: "ATT", unit: "Trio 3", unitGroup: "Trio",
    age: 23, shoots: "G", country: "CAN", height: "6'0\"", hometown: "Trois-Rivières, QC",
    note: "Ailier québécois acquis de Saint-Louis en juillet 2025",
    stats: { gp: 16, g: 5, a: 2, pts: 7, plusMinus: 1, pim: 4, ppg: 2, gwg: 1, shots: 27, shPct: "18.5%", toi: "13:58", fowPct: "—" }
  },
  {
    id: 8476479, name: "Phillip Danault", number: 24, pos: "C", posGroup: "ATT", unit: "Trio 3", unitGroup: "Trio",
    age: 33, shoots: "G", country: "CAN", height: "6'1\"", hometown: "Victoriaville, QC",
    note: "Spécialiste défensif et des mises au jeu revenu à Montréal",
    stats: { gp: 16, g: 1, a: 5, pts: 6, plusMinus: 4, pim: 0, ppg: 0, gwg: 0, shots: 22, shPct: "4.5%", toi: "17:05", fowPct: "54.7%" }
  },
  {
    id: 8480074, name: "Alexandre Texier", number: 85, pos: "AG", posGroup: "ATT", unit: "Trio 3", unitGroup: "Trio",
    age: 27, shoots: "G", country: "FRA", height: "6'1\"", hometown: "Saint-Martin-d'Hères, FRA",
    note: "Attaquant français agile sur le 3e trio",
    stats: { gp: 16, g: 2, a: 3, pts: 5, plusMinus: -2, pim: 10, ppg: 0, gwg: 0, shots: 22, shPct: "9.1%", toi: "13:14", fowPct: "—" }
  },

  // --- TRIO 4 & ATTAQUANTS DE PROFONDEUR ---
  {
    id: 8475184, name: "Chris Kreider", number: 22, pos: "AG", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 35, shoots: "G", country: "USA", height: "6'3\"", hometown: "Boxford, MA",
    note: "Vétéran expérimenté redoutable devant le filet",
    stats: { gp: 16, g: 2, a: 6, pts: 8, plusMinus: 4, pim: 6, ppg: 0, gwg: 0, shots: 17, shPct: "11.8%", toi: "13:46", fowPct: "33.3%" }
  },
  {
    id: 8478133, name: "Jake Evans", number: 71, pos: "C", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 30, shoots: "D", country: "CAN", height: "6'0\"", hometown: "Toronto, ON",
    note: "Pilier du désavantage numérique au centre du 4e trio",
    stats: { gp: 16, g: 2, a: 4, pts: 6, plusMinus: 5, pim: 2, ppg: 0, gwg: 1, shots: 12, shPct: "16.7%", toi: "15:24", fowPct: "54.8%" }
  },
  {
    id: 8483424, name: "Owen Beck", number: 62, pos: "C", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 22, shoots: "D", country: "CAN", height: "6'0\"", hometown: "Port Hope, ON",
    note: "Jeune centre fiable dans les deux sens de la patinoire",
    stats: { gp: 5, g: 1, a: 2, pts: 3, plusMinus: 0, pim: 5, ppg: 0, gwg: 0, shots: 6, shPct: "16.7%", toi: "08:42", fowPct: "57.1%" }
  },
  {
    id: 8476981, name: "Josh Anderson", number: 17, pos: "AD", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 32, shoots: "D", country: "CAN", height: "6'3\"", hometown: "Burlington, ON",
    note: "Ailier droit robuste et très rapide en transition",
    stats: { gp: 16, g: 7, a: 3, pts: 10, plusMinus: 8, pim: 16, ppg: 0, gwg: 1, shots: 33, shPct: "21.2%", toi: "14:28", fowPct: "33.3%" }
  },
  {
    id: 8484403, name: "Florian Xhekaj", number: 63, pos: "AG", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio",
    age: 22, shoots: "G", country: "CAN", height: "6'3\"", hometown: "Hamilton, ON",
    note: "Frère cadet d'Arber, attaquant robuste et énergique",
    stats: { gp: 7, g: 1, a: 2, pts: 3, plusMinus: -1, pim: 13, ppg: 0, gwg: 0, shots: 9, shPct: "11.1%", toi: "07:53", fowPct: "20.0%" }
  },

  // --- DÉFENSEURS (PAIRES 1 À 3) ---
  {
    id: 8483457, name: "Lane Hutson", number: 48, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "Paire",
    age: 22, shoots: "G", country: "USA", height: "5'9\"", hometown: "Holland, MI",
    note: "Quart-arrière offensif ultra-mobile à la ligne bleue",
    stats: { gp: 16, g: 3, a: 13, pts: 16, plusMinus: 8, pim: 8, ppg: 1, gwg: 0, shots: 29, shPct: "10.3%", toi: "24:59", fowPct: "—" }
  },
  {
    id: 8480865, name: "Noah Dobson", number: 53, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "Paire",
    age: 26, shoots: "D", country: "CAN", height: "6'4\"", hometown: "Summerside, PE",
    note: "Défenseur droitier numéro un sur la première paire",
    stats: { gp: 16, g: 0, a: 8, pts: 8, plusMinus: 1, pim: 12, ppg: 0, gwg: 0, shots: 34, shPct: "0.0%", toi: "20:56", fowPct: "—" }
  },
  {
    id: 8482087, name: "Kaiden Guhle", number: 21, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "Paire",
    age: 24, shoots: "G", country: "CAN", height: "6'3\"", hometown: "Edmonton, AB",
    note: "Défenseur complet affrontant les meilleurs trios adverses",
    stats: { gp: 12, g: 2, a: 3, pts: 5, plusMinus: 3, pim: 10, ppg: 0, gwg: 1, shots: 14, shPct: "14.3%", toi: "23:03", fowPct: "—" }
  },
  {
    id: 8478851, name: "Alexandre Carrier", number: 45, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "Paire",
    age: 30, shoots: "D", country: "CAN", height: "5'11\"", hometown: "Québec, QC",
    note: "Défenseur droitier québécois fiable en relance",
    stats: { gp: 16, g: 1, a: 5, pts: 6, plusMinus: 5, pim: 12, ppg: 0, gwg: 1, shots: 14, shPct: "7.1%", toi: "20:36", fowPct: "—" }
  },
  {
    id: 8476875, name: "Mike Matheson", number: 8, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "Paire",
    age: 32, shoots: "G", country: "CAN", height: "6'2\"", hometown: "Pointe-Claire, QC",
    note: "Vétéran originaire de Pointe-Claire au coup de patin élite",
    stats: { gp: 8, g: 1, a: 3, pts: 4, plusMinus: 1, pim: 6, ppg: 0, gwg: 0, shots: 15, shPct: "6.7%", toi: "23:45", fowPct: "—" }
  },
  {
    id: 8482964, name: "Arber Xhekaj", number: 72, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "Paire",
    age: 25, shoots: "G", country: "CAN", height: "6'4\"", hometown: "Hamilton, ON",
    note: "Surnommé le Shérif, défenseur physique au tir frappé lourd",
    stats: { gp: 15, g: 1, a: 2, pts: 3, plusMinus: -1, pim: 30, ppg: 0, gwg: 0, shots: 11, shPct: "9.1%", toi: "11:51", fowPct: "—" }
  },
  {
    id: 8483686, name: "Adam Engström", number: 42, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "Paire",
    age: 22, shoots: "G", country: "SWE", height: "6'2\"", hometown: "Järna, SWE",
    note: "Défenseur suédois fluide repêché en 2022",
    stats: { gp: 10, g: 1, a: 1, pts: 2, plusMinus: 5, pim: 0, ppg: 0, gwg: 0, shots: 11, shPct: "9.1%", toi: "11:25", fowPct: "—" }
  },

  // --- GARDIENS ---
  {
    id: 8484170, name: "Jacob Fowler", number: 32, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "Gardien",
    age: 21, shoots: "G", country: "USA", height: "6'1\"", hometown: "Melbourne, FL",
    note: "Jeune gardien calme et technique devant le filet",
    stats: { gp: 9, gs: 9, w: 7, l: 1, otl: 1, gaa: "2.17", svPct: ".925", so: 2, saves: 247, shotsAgainst: 267 }
  },
  {
    id: 8482487, name: "Jakub Dobeš", number: 75, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "Gardien",
    age: 25, shoots: "G", country: "CZE", height: "6'4\"", hometown: "Ostrava, CZE",
    note: "Gardien tchèque imposant de 6 pieds 4 pouces",
    stats: { gp: 7, gs: 7, w: 3, l: 2, otl: 2, gaa: "4.04", svPct: ".860", so: 0, saves: 172, shotsAgainst: 200 }
  },
  {
    id: 8478470, name: "Samuel Montembeault", number: 35, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "Gardien",
    age: 30, shoots: "G", country: "CAN", height: "6'3\"", hometown: "Bécancour, QC",
    note: "Gardien québécois vétéran devant le filet du Tricolore",
    stats: { gp: 0, gs: 0, w: 0, l: 0, otl: 0, gaa: "—", svPct: "—", so: 0, saves: 0, shotsAgainst: 0 }
  }
];

const MAX_ATTEMPTS = 8;
const DAILY_STORAGE_KEY = "habsle_daily_state_v1";
const DAILY_REMIX_STORAGE_KEY = "habsle_daily_remix_state_v1";
const NHL_CACHE_KEY = "habsle_nhl_api_cache_v1";
const UNITS_ORDER = ["Trio 1", "Trio 2", "Trio 3", "Trio 4", "Paire 1", "Paire 2", "Paire 3", "Gardien"];
const CLASSIC_COLUMNS = ["number", "pos", "unit", "age", "shoots", "country"];
const STAT_POOL_COLUMNS = ["gp", "g", "a", "pts", "plusMinus", "pim", "shots", "toi", "height"];

// --- FONCTIONS UTILITAIRES POUR ÉVALUER LES COLONNES ---
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

// Catalogue complet des colonnes avec intervalles affichés directement dans les titres
const CLUE_DEFINITIONS = {
  number: {
    label: "#",
    interval: "(±5)",
    isStat: false,
    evaluate(player, secret) {
      return compareNumericClue(player.number, secret.number, 5, `#${player.number}`);
    }
  },
  pos: {
    label: "Pos",
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
  age: {
    label: "Âge",
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
  shoots: {
    label: "Lancer",
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
  country: {
    label: "Pays",
    interval: "",
    isStat: false,
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
  }
};

// Générateur pseudo-aléatoire déterministe pour que tout le monde ait le même Défi Mélangé
function createSeededRNG(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleArray(arr, rng = Math.random) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Génère 6 colonnes : entre 2 et 4 indices normaux + le reste en statistiques (total = 6)
function generateRemixedColumns(rng = Math.random) {
  const normalCount = 2 + Math.floor(rng() * 3); // 2, 3 ou 4 indices de base
  const statCount = 6 - normalCount; // 4, 3 ou 2 statistiques
  const keptBase = shuffleArray(CLASSIC_COLUMNS, rng).slice(0, normalCount);
  const pickedStats = shuffleArray(STAT_POOL_COLUMNS, rng).slice(0, statCount);
  return shuffleArray([...keptBase, ...pickedStats], rng);
}

let currentView = "menu"; // "menu" | "daily" | "dailyRemix" | "practice" | "study"
let activeGameMode = "daily"; // "daily" | "dailyRemix" | "practice"

const sessions = {
  daily: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    isRemix: false,
    columns: [...CLASSIC_COLUMNS]
  },
  dailyRemix: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    isRemix: true,
    columns: []
  },
  practice: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    isRemix: false,
    columns: [...CLASSIC_COLUMNS]
  }
};

// Références DOM
const menuView = document.getElementById("menu-view");
const gameView = document.getElementById("game-view");
const studyView = document.getElementById("study-view");
const modeNavbar = document.getElementById("mode-navbar");
const navTabs = document.querySelectorAll(".nav-tab");

const modeTitleEl = document.getElementById("current-mode-title");
const modeSubtitleEl = document.getElementById("current-mode-subtitle");
const remixActivePill = document.getElementById("remix-active-pill");
const dailyStatusBadge = document.getElementById("daily-status-badge");
const dailyRemixStatusBadge = document.getElementById("daily-remix-status-badge");
const boardHeaderEl = document.getElementById("board-header");

const inputEl = document.getElementById("player-input");
const autocompleteEl = document.getElementById("autocomplete-list");
const guessesContainer = document.getElementById("guesses-container");
const attemptCountEl = document.getElementById("attempt-count");
const studyModeCheckbox = document.getElementById("study-mode");
const resultCard = document.getElementById("result-card");
const giveUpBtn = document.getElementById("give-up-btn");
const newGameBtn = document.getElementById("new-game-btn");
const newRemixGameBtn = document.getElementById("new-remix-game-btn");
const practiceEndActions = document.getElementById("practice-end-actions");
const playAgainBtn = document.getElementById("play-again-btn");
const playAgainRemixBtn = document.getElementById("play-again-remix-btn");
const dailyNextInfo = document.getElementById("daily-next-info");
const dailyCountdownEl = document.getElementById("daily-countdown");
const switchOtherDailyBtn = document.getElementById("switch-other-daily-btn");

const rosterModal = document.getElementById("roster-modal");
const rosterListContent = document.getElementById("roster-list-content");
const studyDirectoryContent = document.getElementById("study-directory-content");
const studySearchInput = document.getElementById("study-search-input");
const apiSyncStatusEl = document.getElementById("api-sync-status");

const studyProfileModal = document.getElementById("study-profile-modal");
const profileModalTitle = document.getElementById("profile-modal-title");
const profileModalBody = document.getElementById("profile-modal-body");

// --- SYNCHRONISATION ET VALIDATION AVEC L'API OFFICIELLE DE LA LNH ---
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
        apiSyncStatusEl.textContent = "Données synchronisées (fichier GitHub Pages)";
      }
      if (currentView === "study") renderStudyDirectory(studySearchInput.value);
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
    if (currentView === "study") renderStudyDirectory(studySearchInput.value);
  } else if (apiSyncStatusEl) {
    apiSyncStatusEl.textContent = "Données LNH 2026-2027 intégrées actives";
  }
}

// --- CONSTRUCTION DES GRILLES DE STATISTIQUES HTML ---
function buildSeasonStatsHTML(player, compact = false) {
  const st = player.stats || {};
  if (player.posGroup === "GAR") {
    const record = `${st.w ?? 0}-${st.l ?? 0}-${st.otl ?? 0}`;
    if (compact) {
      return `
        <div class="stat-box highlight-stat"><div class="stat-label">MJ</div><div class="stat-val">${st.gp ?? 0}</div></div>
        <div class="stat-box highlight-stat"><div class="stat-label">Fiche (V-D-DP)</div><div class="stat-val">${record}</div></div>
        <div class="stat-box highlight-stat"><div class="stat-label">MOY</div><div class="stat-val">${st.gaa ?? "—"}</div></div>
        <div class="stat-box highlight-stat"><div class="stat-label">% Arrêts</div><div class="stat-val">${st.svPct ?? "—"}</div></div>
        <div class="stat-box"><div class="stat-label">Blanchissages</div><div class="stat-val">${st.so ?? 0}</div></div>
      `;
    }
    return `
      <div class="stat-box highlight-stat"><div class="stat-label">Matchs joués</div><div class="stat-val">${st.gp ?? 0}</div></div>
      <div class="stat-box"><div class="stat-label">Matchs débutés</div><div class="stat-val">${st.gs ?? 0}</div></div>
      <div class="stat-box highlight-stat"><div class="stat-label">Fiche (V-D-DP)</div><div class="stat-val">${record}</div></div>
      <div class="stat-box highlight-stat"><div class="stat-label">Moy. buts alloués</div><div class="stat-val">${st.gaa ?? "—"}</div></div>
      <div class="stat-box highlight-stat"><div class="stat-label">% d'arrêts</div><div class="stat-val">${st.svPct ?? "—"}</div></div>
      <div class="stat-box"><div class="stat-label">Blanchissages</div><div class="stat-val">${st.so ?? 0}</div></div>
      <div class="stat-box"><div class="stat-label">Arrêts</div><div class="stat-val">${st.saves ?? 0}</div></div>
      <div class="stat-box"><div class="stat-label">Tirs reçus</div><div class="stat-val">${st.shotsAgainst ?? 0}</div></div>
    `;
  }

  const diffFormatted = (st.plusMinus ?? 0) > 0 ? `+${st.plusMinus}` : `${st.plusMinus ?? 0}`;
  if (compact) {
    return `
      <div class="stat-box"><div class="stat-label">MJ</div><div class="stat-val">${st.gp ?? 0}</div></div>
      <div class="stat-box highlight-stat"><div class="stat-label">Buts</div><div class="stat-val">${st.g ?? 0}</div></div>
      <div class="stat-box highlight-stat"><div class="stat-label">Passes</div><div class="stat-val">${st.a ?? 0}</div></div>
      <div class="stat-box highlight-stat"><div class="stat-label">Points</div><div class="stat-val">${st.pts ?? 0}</div></div>
      <div class="stat-box"><div class="stat-label">+/-</div><div class="stat-val">${diffFormatted}</div></div>
      <div class="stat-box"><div class="stat-label">TG / Match</div><div class="stat-val">${st.toi ?? "—"}</div></div>
    `;
  }

  return `
    <div class="stat-box"><div class="stat-label">Matchs joués</div><div class="stat-val">${st.gp ?? 0}</div></div>
    <div class="stat-box highlight-stat"><div class="stat-label">Buts</div><div class="stat-val">${st.g ?? 0}</div></div>
    <div class="stat-box highlight-stat"><div class="stat-label">Passes</div><div class="stat-val">${st.a ?? 0}</div></div>
    <div class="stat-box highlight-stat"><div class="stat-label">Points</div><div class="stat-val">${st.pts ?? 0}</div></div>
    <div class="stat-box"><div class="stat-label">Différentiel (+/-)</div><div class="stat-val">${diffFormatted}</div></div>
    <div class="stat-box"><div class="stat-label">Punitions (PUN)</div><div class="stat-val">${st.pim ?? 0} min</div></div>
    <div class="stat-box"><div class="stat-label">Buts en AN</div><div class="stat-val">${st.ppg ?? 0}</div></div>
    <div class="stat-box"><div class="stat-label">Buts gagnants</div><div class="stat-val">${st.gwg ?? 0}</div></div>
    <div class="stat-box"><div class="stat-label">Tirs au but</div><div class="stat-val">${st.shots ?? 0}</div></div>
    <div class="stat-box"><div class="stat-label">% de tir</div><div class="stat-val">${st.shPct ?? "—"}</div></div>
    <div class="stat-box"><div class="stat-label">Temps de glace</div><div class="stat-val">${st.toi ?? "—"}</div></div>
    <div class="stat-box"><div class="stat-label">% Mises au jeu</div><div class="stat-val">${st.fowPct ?? "—"}</div></div>
  `;
}

// --- OUTILS DATE & GESTION DES DEUX DÉFIS QUOTIDIENS (CLASSIQUE ET MÉLANGÉ) ---
function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getFormattedTodayFrench() {
  return new Date().toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function getDailyPlayerForDate(dateKey) {
  let hash = 2166136261;
  for (let i = 0; i < dateKey.length; i++) {
    hash ^= dateKey.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const index = Math.abs(hash) % PLAYERS.length;
  return PLAYERS[index];
}

function getDailyRemixSetupForDate(dateKey) {
  const rng = createSeededRNG(`${dateKey}-habsle-remix`);
  const classicPlayer = getDailyPlayerForDate(dateKey);
  // On s'assure que le joueur du Défi Mélangé est différent de celui du Défi Quotidien classique
  const candidates = PLAYERS.filter(p => p.id !== classicPlayer.id);
  const secretPlayer = candidates[Math.floor(rng() * candidates.length)];
  const columns = generateRemixedColumns(rng);
  return { secretPlayer, columns };
}

function saveDailySession(modeKey) {
  const isRemixDaily = modeKey === "dailyRemix";
  const session = sessions[modeKey];
  const storageKey = isRemixDaily ? DAILY_REMIX_STORAGE_KEY : DAILY_STORAGE_KEY;

  const payload = {
    dateKey: getTodayKey(),
    guesses: session.guesses,
    gameOver: session.gameOver,
    endReason: session.endReason
  };
  localStorage.setItem(storageKey, JSON.stringify(payload));
  updateMenuDailyBadges();
}

function loadDailySession() {
  const todayKey = getTodayKey();
  sessions.daily.secretPlayer = getDailyPlayerForDate(todayKey);
  sessions.daily.isRemix = false;
  sessions.daily.columns = [...CLASSIC_COLUMNS];

  try {
    const raw = localStorage.getItem(DAILY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.dateKey === todayKey) {
        sessions.daily.guesses = Array.isArray(parsed.guesses) ? parsed.guesses : [];
        sessions.daily.gameOver = Boolean(parsed.gameOver);
        sessions.daily.endReason = parsed.endReason || null;
        return;
      }
    }
  } catch (e) {}

  sessions.daily.guesses = [];
  sessions.daily.gameOver = false;
  sessions.daily.endReason = null;
}

function loadDailyRemixSession() {
  const todayKey = getTodayKey();
  const setup = getDailyRemixSetupForDate(todayKey);
  sessions.dailyRemix.secretPlayer = setup.secretPlayer;
  sessions.dailyRemix.isRemix = true;
  sessions.dailyRemix.columns = setup.columns;

  try {
    const raw = localStorage.getItem(DAILY_REMIX_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.dateKey === todayKey) {
        sessions.dailyRemix.guesses = Array.isArray(parsed.guesses) ? parsed.guesses : [];
        sessions.dailyRemix.gameOver = Boolean(parsed.gameOver);
        sessions.dailyRemix.endReason = parsed.endReason || null;
        return;
      }
    }
  } catch (e) {}

  sessions.dailyRemix.guesses = [];
  sessions.dailyRemix.gameOver = false;
  sessions.dailyRemix.endReason = null;
}

function updateMenuDailyBadges() {
  loadDailySession();
  loadDailyRemixSession();

  // Badge du Défi Quotidien classique
  if (sessions.daily.gameOver) {
    dailyStatusBadge.textContent =
      sessions.daily.endReason === "win" ? "Classique : Réussi" : "Classique : Terminé";
    dailyStatusBadge.className = "menu-tag completed-tag";
  } else if (sessions.daily.guesses.length > 0) {
    dailyStatusBadge.textContent = `Classique : ${sessions.daily.guesses.length}/${MAX_ATTEMPTS}`;
    dailyStatusBadge.className = "menu-tag daily-tag";
  } else {
    dailyStatusBadge.textContent = "Classique : À jouer";
    dailyStatusBadge.className = "menu-tag daily-tag";
  }

  // Badge du Défi Mélangé quotidien
  if (sessions.dailyRemix.gameOver) {
    dailyRemixStatusBadge.textContent =
      sessions.dailyRemix.endReason === "win" ? "Mélangé : Réussi" : "Mélangé : Terminé";
    dailyRemixStatusBadge.className = "menu-tag completed-tag";
  } else if (sessions.dailyRemix.guesses.length > 0) {
    dailyRemixStatusBadge.textContent = `Mélangé : ${sessions.dailyRemix.guesses.length}/${MAX_ATTEMPTS}`;
    dailyRemixStatusBadge.className = "menu-tag remix-tag";
  } else {
    dailyRemixStatusBadge.textContent = "Mélangé : À jouer";
    dailyRemixStatusBadge.className = "menu-tag remix-tag";
  }
}

// --- NAVIGATION ENTRE LES VUES ---
function switchView(target, practiceRemixOption = null) {
  currentView = target;
  autocompleteEl.classList.add("hidden");

  const isGameView = target === "daily" || target === "dailyRemix" || target === "practice";
  menuView.classList.toggle("hidden", target !== "menu");
  gameView.classList.toggle("hidden", !isGameView);
  studyView.classList.toggle("hidden", target !== "study");
  modeNavbar.classList.toggle("hidden", target === "menu");

  navTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.target === target);
  });

  if (target === "menu") {
    updateMenuDailyBadges();
  } else if (target === "daily") {
    activeGameMode = "daily";
    loadDailySession();
    renderActiveGameSession();
  } else if (target === "dailyRemix") {
    activeGameMode = "dailyRemix";
    loadDailyRemixSession();
    renderActiveGameSession();
  } else if (target === "practice") {
    activeGameMode = "practice";
    if (typeof practiceRemixOption === "boolean") {
      startNewPracticeGame(practiceRemixOption);
    } else if (!sessions.practice.secretPlayer) {
      startNewPracticeGame(false);
    } else {
      renderActiveGameSession();
    }
  } else if (target === "study") {
    renderStudyDirectory(studySearchInput.value);
  }
}

function startNewPracticeGame(isRemix = false) {
  sessions.practice.secretPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
  sessions.practice.guesses = [];
  sessions.practice.gameOver = false;
  sessions.practice.endReason = null;
  sessions.practice.isRemix = isRemix;
  sessions.practice.columns = isRemix ? generateRemixedColumns() : [...CLASSIC_COLUMNS];
  renderActiveGameSession();
}

// --- RENDU DE L'EN-TÊTE DE GRILLE AVEC LES INTERVALLES DANS LES TITRES ---
function renderBoardHeader(columns) {
  boardHeaderEl.innerHTML = `<div class="header-col-cell"><span>Joueur</span></div>`;
  columns.forEach(colKey => {
    const def = CLUE_DEFINITIONS[colKey];
    const div = document.createElement("div");
    div.className = `header-col-cell ${def.isStat ? "stat-col-header" : ""}`;
    div.innerHTML = `
      <span>${def.label}</span>
      ${def.interval ? `<span class="header-interval">${def.interval}</span>` : ""}
    `;
    boardHeaderEl.appendChild(div);
  });
}

function renderActiveGameSession() {
  const session = sessions[activeGameMode];
  const isAnyDaily = activeGameMode === "daily" || activeGameMode === "dailyRemix";

  if (activeGameMode === "daily") {
    modeTitleEl.textContent = "Défi Quotidien";
    modeSubtitleEl.textContent = `Joueur mystère du ${getFormattedTodayFrench()}`;
  } else if (activeGameMode === "dailyRemix") {
    modeTitleEl.textContent = "Défi Quotidien Mélangé";
    modeSubtitleEl.textContent = `Défi mélangé du ${getFormattedTodayFrench()}`;
  } else {
    modeTitleEl.textContent = "Mode Pratique";
    modeSubtitleEl.textContent = session.isRemix
      ? "Manche mélangée (entre 2 et 4 indices normaux complétés par des statistiques)"
      : "Manches classiques illimitées pour t'entraîner";
  }

  remixActivePill.classList.toggle("hidden", !session.isRemix);

  newGameBtn.classList.toggle("hidden", isAnyDaily);
  newRemixGameBtn.classList.toggle("hidden", isAnyDaily);
  practiceEndActions.classList.toggle("hidden", isAnyDaily);
  dailyNextInfo.classList.toggle("hidden", !isAnyDaily);

  if (isAnyDaily) {
    switchOtherDailyBtn.textContent =
      activeGameMode === "daily" ? "Jouer au défi mélangé" : "Jouer au défi du jour";
  }

  renderBoardHeader(session.columns);

  attemptCountEl.textContent = String(session.guesses.length);
  guessesContainer.innerHTML = "";
  resultCard.classList.add("hidden");

  session.guesses.forEach(playerId => {
    const player = PLAYERS.find(p => p.id === playerId);
    if (player) {
      appendGuessRowDOM(player, session.secretPlayer, session.columns, false);
    }
  });

  inputEl.disabled = session.gameOver;
  giveUpBtn.disabled = session.gameOver;
  inputEl.value = "";

  if (session.gameOver) {
    showEndGameCard(session, false);
  } else {
    inputEl.focus();
  }
}

function normalizeStr(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// --- AUTOCOMPLÉTION ---
function updateAutocomplete() {
  const session = sessions[activeGameMode];
  const query = normalizeStr(inputEl.value.trim());
  autocompleteEl.innerHTML = "";

  if (!query || session.gameOver) {
    autocompleteEl.classList.add("hidden");
    return;
  }

  const guessedSet = new Set(session.guesses);
  const matches = PLAYERS.filter(
    p =>
      !guessedSet.has(p.id) &&
      (normalizeStr(p.name).includes(query) || String(p.number).startsWith(query))
  );

  if (matches.length === 0) {
    autocompleteEl.classList.add("hidden");
    return;
  }

  const showHints = studyModeCheckbox.checked;

  matches.forEach(player => {
    const item = document.createElement("div");
    item.className = "autocomplete-item";
    item.innerHTML = `
      <strong>${player.name}</strong>
      ${showHints ? `<span class="hint-pill">#${player.number} • ${player.pos} • ${player.unit}</span>` : ""}
    `;
    item.addEventListener("click", () => submitGuess(player));
    autocompleteEl.appendChild(item);
  });

  autocompleteEl.classList.remove("hidden");
}

// --- SOUMISSION D'UN ESSAI ---
function submitGuess(player) {
  const session = sessions[activeGameMode];
  if (session.gameOver || session.guesses.includes(player.id)) return;

  session.guesses.push(player.id);
  attemptCountEl.textContent = String(session.guesses.length);
  inputEl.value = "";
  autocompleteEl.classList.add("hidden");

  appendGuessRowDOM(player, session.secretPlayer, session.columns, true);

  if (player.id === session.secretPlayer.id) {
    finishSession("win");
  } else if (session.guesses.length >= MAX_ATTEMPTS) {
    finishSession("lose");
  } else if (activeGameMode === "daily" || activeGameMode === "dailyRemix") {
    saveDailySession(activeGameMode);
  }
}

function appendGuessRowDOM(player, secretPlayer, columns, animate) {
  const nameStatus = player.id === secretPlayer.id ? "exact" : "name-cell";

  const cellsData = [
    { text: player.name, status: nameStatus, sub: "" },
    ...columns.map(colKey => CLUE_DEFINITIONS[colKey].evaluate(player, secretPlayer))
  ];

  const row = document.createElement("div");
  row.className = "guess-row";

  cellsData.forEach((cellInfo, index) => {
    const cell = document.createElement("div");
    cell.className = `cell ${cellInfo.status}`;
    cell.style.animationDelay = animate ? `${index * 90}ms` : "0ms";
    cell.innerHTML = `
      <span>${cellInfo.text}</span>
      ${cellInfo.sub ? `<span class="arrow-hint">${cellInfo.sub}</span>` : ""}
    `;
    row.appendChild(cell);
  });

  guessesContainer.appendChild(row);
}

function finishSession(reason) {
  const session = sessions[activeGameMode];
  session.gameOver = true;
  session.endReason = reason;
  inputEl.disabled = true;
  giveUpBtn.disabled = true;
  autocompleteEl.classList.add("hidden");

  if (activeGameMode === "daily" || activeGameMode === "dailyRemix") {
    saveDailySession(activeGameMode);
  }

  showEndGameCard(session, reason !== "giveup");
}

function showEndGameCard(session, waitAnimation) {
  const secretPlayer = session.secretPlayer;
  const reason = session.endReason;
  const attemptsCount = session.guesses.length;

  const banner = document.getElementById("result-banner");
  banner.className = `result-banner ${reason === "win" ? "win" : "lose"}`;

  if (reason === "win") {
    banner.textContent = `Bravo ! Tu as trouvé ${secretPlayer.name} en ${attemptsCount} essai${attemptsCount > 1 ? "s" : ""} !`;
  } else if (reason === "giveup") {
    banner.textContent = `Réponse révélée : le joueur mystère était ${secretPlayer.name} (#${secretPlayer.number}).`;
  } else {
    banner.textContent = `Manche terminée ! Le joueur mystère était ${secretPlayer.name} (#${secretPlayer.number}).`;
  }

  const photoEl = document.getElementById("player-photo");
  photoEl.src =
    secretPlayer.headshotUrl ||
    `https://assets.nhle.com/mugs/nhl/20262027/MTL/${secretPlayer.id}.png`;
  photoEl.onerror = () => {
    photoEl.src = `https://assets.nhle.com/mugs/nhl/latest/${secretPlayer.id}.png`;
  };

  document.getElementById("player-jersey-badge").textContent = `#${secretPlayer.number}`;
  document.getElementById("reveal-name").textContent = secretPlayer.name;
  document.getElementById("reveal-role").textContent = secretPlayer.note;

  document.getElementById("reveal-stats").innerHTML = `
    <div class="stat-box"><div class="stat-label">Position</div><div class="stat-val">${secretPlayer.pos} (${secretPlayer.unit})</div></div>
    <div class="stat-box"><div class="stat-label">Âge</div><div class="stat-val">${secretPlayer.age} ans</div></div>
    <div class="stat-box"><div class="stat-label">Taille / Lancer</div><div class="stat-val">${secretPlayer.height} • ${secretPlayer.shoots}</div></div>
    <div class="stat-box"><div class="stat-label">Origine</div><div class="stat-val">${secretPlayer.hometown}</div></div>
  `;

  document.getElementById("reveal-season-stats").innerHTML = buildSeasonStatsHTML(secretPlayer, true);

  const delay = waitAnimation ? 650 : 40;
  setTimeout(() => {
    resultCard.classList.remove("hidden");
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, delay);
}

// --- FENÊTRE MODALE 1 : LISTE DES JOUEURS EN PARTIE ---
function openRosterModal() {
  const session = sessions[activeGameMode];
  const guessedSet = new Set(session.guesses);
  rosterListContent.innerHTML = "";

  UNITS_ORDER.forEach(unitName => {
    const unitPlayers = PLAYERS.filter(p => p.unit === unitName);
    if (unitPlayers.length === 0) return;

    const section = document.createElement("div");
    section.innerHTML = `<div class="unit-group-title">${unitName}</div>`;

    const grid = document.createElement("div");
    grid.className = "unit-players-grid";

    unitPlayers.forEach(player => {
      const isGuessed = guessedSet.has(player.id);
      const card = document.createElement("div");
      card.className = `roster-player-card ${isGuessed || session.gameOver ? "already-guessed" : ""}`;
      card.innerHTML = `
        <div class="roster-player-main">
          <span class="roster-num">#${player.number}</span>
          <span class="roster-name">${player.name}</span>
        </div>
        <span class="roster-meta">${player.pos} • ${player.age}a • ${player.country}</span>
      `;

      if (!isGuessed && !session.gameOver) {
        card.addEventListener("click", () => {
          rosterModal.classList.add("hidden");
          submitGuess(player);
        });
      }
      grid.appendChild(card);
    });

    section.appendChild(grid);
    rosterListContent.appendChild(section);
  });

  rosterModal.classList.remove("hidden");
}

// --- VUE ÉTUDE (CARTES IDENTIQUES + PROFIL CLICABLE EN GRAND) ---
function renderStudyDirectory(filterText = "") {
  const query = normalizeStr(filterText.trim());
  studyDirectoryContent.innerHTML = "";

  UNITS_ORDER.forEach(unitName => {
    const unitPlayers = PLAYERS.filter(p => {
      if (p.unit !== unitName) return false;
      if (!query) return true;
      return (
        normalizeStr(p.name).includes(query) ||
        String(p.number).includes(query) ||
        normalizeStr(p.pos).includes(query) ||
        normalizeStr(p.unit).includes(query)
      );
    });

    if (unitPlayers.length === 0) return;

    const section = document.createElement("div");
    section.innerHTML = `<div class="unit-group-title">${unitName}</div>`;

    const grid = document.createElement("div");
    grid.className = "study-cards-grid";

    unitPlayers.forEach(player => {
      const card = document.createElement("div");
      card.className = "study-player-card";
      const mugUrl =
        player.headshotUrl ||
        `https://assets.nhle.com/mugs/nhl/20262027/MTL/${player.id}.png`;
      const fallbackUrl = `https://assets.nhle.com/mugs/nhl/latest/${player.id}.png`;

      card.innerHTML = `
        <img class="study-avatar" src="${mugUrl}" alt="${player.name}" onerror="this.onerror=null;this.src='${fallbackUrl}';" />
        <div class="study-info">
          <div class="study-info-top">
            <span class="roster-num">#${player.number}</span>
            <h4>${player.name}</h4>
          </div>
          <div class="study-specs">
            ${player.pos} • ${player.age} ans • Lancer ${player.shoots} • ${player.height} • ${player.country}
          </div>
          <div class="study-note">${player.note} (${player.hometown})</div>
        </div>
      `;

      card.addEventListener("click", () => openStudyProfileModal(player));
      grid.appendChild(card);
    });

    section.appendChild(grid);
    studyDirectoryContent.appendChild(section);
  });
}

// --- FENÊTRE MODALE 2 : FICHE AGRANDIE AVEC TOUTES LES STATISTIQUES ---
function openStudyProfileModal(player) {
  const mugUrl =
    player.headshotUrl ||
    `https://assets.nhle.com/mugs/nhl/20262027/MTL/${player.id}.png`;
  const fallbackUrl = `https://assets.nhle.com/mugs/nhl/latest/${player.id}.png`;

  profileModalTitle.textContent = `Profil de ${player.name} (#${player.number})`;

  profileModalBody.innerHTML = `
    <div class="profile-hero">
      <div class="profile-hero-photo">
        <img src="${mugUrl}" alt="${player.name}" onerror="this.onerror=null;this.src='${fallbackUrl}';" />
      </div>
      <div class="profile-hero-text">
        <div class="profile-hero-title">
          <span class="roster-num">#${player.number}</span>
          <h3>${player.name}</h3>
          <span class="profile-unit-badge">${player.unit}</span>
        </div>
        <p class="profile-bio-note">${player.note}</p>
      </div>
    </div>

    <div>
      <div class="profile-section-title">Informations de base</div>
      <div class="stats-grid">
        <div class="stat-box"><div class="stat-label">Position</div><div class="stat-val">${player.pos} (${player.posGroup})</div></div>
        <div class="stat-box"><div class="stat-label">Unité</div><div class="stat-val">${player.unit}</div></div>
        <div class="stat-box"><div class="stat-label">Âge</div><div class="stat-val">${player.age} ans</div></div>
        <div class="stat-box"><div class="stat-label">Taille</div><div class="stat-val">${player.height}</div></div>
        <div class="stat-box"><div class="stat-label">Lancer</div><div class="stat-val">${player.shoots === "G" ? "Gauche (G)" : "Droite (D)"}</div></div>
        <div class="stat-box"><div class="stat-label">Origine</div><div class="stat-val">${player.hometown} (${player.country})</div></div>
      </div>
    </div>

    <div>
      <div class="profile-section-title">Statistiques complètes — Saison 2026-2027</div>
      <div class="stats-grid season-stats-grid">
        ${buildSeasonStatsHTML(player, false)}
      </div>
    </div>
  `;

  studyProfileModal.classList.remove("hidden");
}

// --- COMPTE À REBOURS DE MINUIT POUR LES DÉFIS QUOTIDIENS ---
function updateDailyCountdown() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diffMs = Math.max(0, midnight - now);

  const hours = String(Math.floor(diffMs / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((diffMs % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((diffMs % 60000) / 1000)).padStart(2, "0");

  dailyCountdownEl.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateDailyCountdown, 1000);
updateDailyCountdown();

// --- ÉVÉNEMENTS DU MENU PRINCIPAL ---
document.getElementById("menu-start-daily-btn").addEventListener("click", () => {
  switchView("daily");
});

document.getElementById("menu-start-daily-remix-btn").addEventListener("click", () => {
  switchView("dailyRemix");
});

document.getElementById("menu-start-practice-classic-btn").addEventListener("click", () => {
  switchView("practice", false);
});

document.getElementById("menu-start-practice-remix-btn").addEventListener("click", () => {
  switchView("practice", true);
});

document.getElementById("menu-card-study").addEventListener("click", () => {
  switchView("study");
});

// --- ÉVÉNEMENTS DE NAVIGATION ET BOUTONS DE PARTIE ---
navTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    switchView(tab.dataset.target);
  });
});

document.getElementById("header-home-trigger").addEventListener("click", () => {
  switchView("menu");
});

switchOtherDailyBtn.addEventListener("click", () => {
  switchView(activeGameMode === "daily" ? "dailyRemix" : "daily");
});

document.getElementById("go-practice-btn").addEventListener("click", () => {
  switchView("practice", false);
});

newGameBtn.addEventListener("click", () => startNewPracticeGame(false));
newRemixGameBtn.addEventListener("click", () => startNewPracticeGame(true));
playAgainBtn.addEventListener("click", () => startNewPracticeGame(false));
playAgainRemixBtn.addEventListener("click", () => startNewPracticeGame(true));

document.getElementById("refresh-api-btn").addEventListener("click", () => {
  syncWithNHLAPI(true);
});

studySearchInput.addEventListener("input", e => {
  renderStudyDirectory(e.target.value);
});

inputEl.addEventListener("input", updateAutocomplete);
studyModeCheckbox.addEventListener("change", updateAutocomplete);

inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const firstItem = autocompleteEl.querySelector(".autocomplete-item");
    if (firstItem) firstItem.click();
  }
});

document.addEventListener("click", e => {
  if (!e.target.closest("#search-wrapper")) {
    autocompleteEl.classList.add("hidden");
  }
});

giveUpBtn.addEventListener("click", () => {
  const session = sessions[activeGameMode];
  if (!session.gameOver) finishSession("giveup");
});

document.getElementById("roster-btn").addEventListener("click", openRosterModal);
document.getElementById("close-modal-btn").addEventListener("click", () => {
  rosterModal.classList.add("hidden");
});

rosterModal.addEventListener("click", e => {
  if (e.target === rosterModal) rosterModal.classList.add("hidden");
});

document.getElementById("close-profile-modal-btn").addEventListener("click", () => {
  studyProfileModal.classList.add("hidden");
});

studyProfileModal.addEventListener("click", e => {
  if (e.target === studyProfileModal) studyProfileModal.classList.add("hidden");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    rosterModal.classList.add("hidden");
    studyProfileModal.classList.add("hidden");
  }
});

// Au démarrage : affichage du menu et synchronisation en arrière-plan avec l'API de la LNH
switchView("menu");
syncWithNHLAPI(false);