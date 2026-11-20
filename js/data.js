// Alignement et statistiques 2026-2027 des Canadiens de Montréal
// Sources : NHL.com (nhl.com/canadiens/stats), Hockey-Reference & Daily Faceoff (nov. 2026)
const PLAYERS = [
  // --- TRIO 1 ---
  {
    id: 8480018, name: "Nick Suzuki", number: 14, pos: "C", posGroup: "ATT", unit: "Trio 1", unitGroup: "ATT",
    specialTeams: ["SN 1", "IN 2"],
    age: 27, shoots: "D", country: "CAN", height: "5'11\"", weight: 207, hometown: "London, ON",
    note: "Capitaine du CH, centre du 1er trio",
    stats: { gp: 10, g: 6, a: 9, pts: 15, plusMinus: 8, pim: 2, ppg: 1, gwg: 0, shots: 30, shPct: "20.0%", toi: "21:37", fowPct: "53.9%" },
    careerStats: { gp: 465, g: 144, a: 247, pts: 391, plusMinus: -62, pim: 149, ppg: 46, gwg: 22, shots: 975, shPct: "14.8%", toi: "20:08", fowPct: "50.2%" }
  },
  {
    id: 8481540, name: "Cole Caufield", number: 13, pos: "AD", posGroup: "ATT", unit: "Trio 1", unitGroup: "ATT",
    specialTeams: ["SN 1"],
    age: 25, shoots: "D", country: "USA", height: "5'8\"", weight: 175, hometown: "Mosinee, WI",
    note: "Franc-tireur de 1er trio et 1re vague d'avantage numérique",
    stats: { gp: 16, g: 11, a: 4, pts: 15, plusMinus: 5, pim: 8, ppg: 2, gwg: 3, shots: 54, shPct: "20.4%", toi: "18:39", fowPct: "60.0%" },
    careerStats: { gp: 303, g: 129, a: 105, pts: 234, plusMinus: -46, pim: 62, ppg: 39, gwg: 24, shots: 965, shPct: "13.4%", toi: "18:10", fowPct: "42.9%" }
  },
  {
    id: 8483515, name: "Juraj Slafkovský", number: 20, pos: "AG", posGroup: "ATT", unit: "Trio 1", unitGroup: "ATT",
    specialTeams: ["SN 1"],
    age: 22, shoots: "G", country: "SVK", height: "6'3\"", weight: 225, hometown: "Košice, SVK",
    note: "1er choix au total en 2022, ailier de puissance du 1er trio",
    stats: { gp: 16, g: 2, a: 10, pts: 12, plusMinus: 0, pim: 14, ppg: 0, gwg: 0, shots: 39, shPct: "5.1%", toi: "18:14", fowPct: "31.3%" },
    careerStats: { gp: 216, g: 44, a: 79, pts: 123, plusMinus: -34, pim: 137, ppg: 13, gwg: 6, shots: 372, shPct: "11.8%", toi: "16:48", fowPct: "36.5%" }
  },

  // --- TRIO 2 ---
  {
    id: 8481618, name: "Alex Newhook", number: 15, pos: "AG", posGroup: "ATT", unit: "Trio 2", unitGroup: "ATT",
    specialTeams: ["SN 2"],
    age: 25, shoots: "G", country: "CAN", height: "5'11\"", weight: 200, hometown: "St. John's, NL",
    note: "Attaquant rapide polyvalent (centre / ailier gauche)",
    stats: { gp: 16, g: 3, a: 4, pts: 7, plusMinus: -3, pim: 12, ppg: 0, gwg: 0, shots: 15, shPct: "20.0%", toi: "16:30", fowPct: "50.3%" },
    careerStats: { gp: 312, g: 60, a: 73, pts: 133, plusMinus: -28, pim: 94, ppg: 12, gwg: 11, shots: 495, shPct: "12.1%", toi: "15:12", fowPct: "44.8%" }
  },
  {
    id: 8482775, name: "Oliver Kapanen", number: 91, pos: "C", posGroup: "ATT", unit: "Trio 2", unitGroup: "ATT",
    specialTeams: ["IN 2"],
    age: 23, shoots: "D", country: "FIN", height: "6'2\"", weight: 194, hometown: "Timrå, SWE",
    note: "Centre intelligent repêché au 2e tour en 2021",
    stats: { gp: 9, g: 1, a: 0, pts: 1, plusMinus: -1, pim: 2, ppg: 0, gwg: 0, shots: 8, shPct: "12.5%", toi: "11:40", fowPct: "47.5%" },
    careerStats: { gp: 27, g: 1, a: 2, pts: 3, plusMinus: -5, pim: 6, ppg: 0, gwg: 0, shots: 21, shPct: "4.8%", toi: "11:32", fowPct: "46.8%" }
  },
  {
    id: 8481523, name: "Kirby Dach", number: 77, pos: "AD", posGroup: "ATT", unit: "Trio 2", unitGroup: "ATT",
    specialTeams: ["SN 2"],
    age: 25, shoots: "D", country: "CAN", height: "6'4\"", weight: 221, hometown: "Fort Saskatchewan, AB",
    note: "Attaquant format géant évoluant au centre et à l'aile droite",
    stats: { gp: 14, g: 1, a: 4, pts: 5, plusMinus: 0, pim: 6, ppg: 1, gwg: 0, shots: 11, shPct: "9.1%", toi: "10:48", fowPct: "43.8%" },
    careerStats: { gp: 283, g: 44, a: 87, pts: 131, plusMinus: -52, pim: 167, ppg: 13, gwg: 6, shots: 442, shPct: "10.0%", toi: "16:54", fowPct: "38.6%" }
  },
  {
    id: 8484984, name: "Ivan Demidov", number: 93, pos: "AD", posGroup: "ATT", unit: "Trio 2", unitGroup: "ATT",
    specialTeams: ["SN 2"],
    age: 20, shoots: "G", country: "RUS", height: "6'1\"", weight: 192, hometown: "Sergiyev Posad, RUS",
    note: "5e choix au total en 2024, ailier créatif électrisant",
    stats: { gp: 2, g: 1, a: 1, pts: 2, plusMinus: 0, pim: 2, ppg: 0, gwg: 0, shots: 4, shPct: "25.0%", toi: "15:37", fowPct: "—" },
    careerStats: { gp: 4, g: 2, a: 2, pts: 4, plusMinus: 1, pim: 2, ppg: 0, gwg: 0, shots: 8, shPct: "25.0%", toi: "16:10", fowPct: "—" }
  },

  // --- TRIO 3 ---
  {
    id: 8482737, name: "Zachary Bolduc", number: 76, pos: "AD", posGroup: "ATT", unit: "Trio 3", unitGroup: "ATT",
    specialTeams: ["SN 2"],
    age: 23, shoots: "G", country: "CAN", height: "6'0\"", weight: 187, hometown: "Trois-Rivières, QC",
    note: "Ailier québécois acquis de Saint-Louis en juillet 2025",
    stats: { gp: 16, g: 5, a: 2, pts: 7, plusMinus: 1, pim: 4, ppg: 2, gwg: 1, shots: 27, shPct: "18.5%", toi: "13:58", fowPct: "—" },
    careerStats: { gp: 113, g: 29, a: 23, pts: 52, plusMinus: 16, pim: 47, ppg: 8, gwg: 5, shots: 169, shPct: "17.2%", toi: "13:05", fowPct: "41.7%" }
  },
  {
    id: 8476479, name: "Phillip Danault", number: 24, pos: "C", posGroup: "ATT", unit: "Trio 3", unitGroup: "ATT",
    specialTeams: ["IN 1"],
    age: 33, shoots: "G", country: "CAN", height: "6'1\"", weight: 200, hometown: "Victoriaville, QC",
    note: "Spécialiste défensif et des mises au jeu revenu à Montréal",
    stats: { gp: 16, g: 1, a: 5, pts: 6, plusMinus: 4, pim: 0, ppg: 0, gwg: 0, shots: 22, shPct: "4.5%", toi: "17:05", fowPct: "54.7%" },
    careerStats: { gp: 736, g: 126, a: 268, pts: 394, plusMinus: 83, pim: 330, ppg: 13, gwg: 20, shots: 1260, shPct: "10.0%", toi: "17:42", fowPct: "54.5%" }
  },
  {
    id: 8480074, name: "Alexandre Texier", number: 85, pos: "AG", posGroup: "ATT", unit: "Trio 3", unitGroup: "ATT",
    specialTeams: ["Aucune"],
    age: 27, shoots: "G", country: "FRA", height: "6'1\"", weight: 196, hometown: "Saint-Martin-d'Hères, FRA",
    note: "Attaquant français agile sur le 3e trio",
    stats: { gp: 16, g: 2, a: 3, pts: 5, plusMinus: -2, pim: 10, ppg: 0, gwg: 0, shots: 22, shPct: "9.1%", toi: "13:14", fowPct: "—" },
    careerStats: { gp: 248, g: 42, a: 54, pts: 96, plusMinus: -26, pim: 102, ppg: 4, gwg: 7, shots: 368, shPct: "11.4%", toi: "14:25", fowPct: "43.1%" }
  },

  // --- TRIO 4 & ATTAQUANTS DE PROFONDEUR ---
  {
    id: 8475184, name: "Chris Kreider", number: 22, pos: "AG", posGroup: "ATT", unit: "Trio 4", unitGroup: "ATT",
    specialTeams: ["SN 1"],
    age: 35, shoots: "G", country: "USA", height: "6'3\"", weight: 232, hometown: "Boxford, MA",
    note: "Vétéran expérimenté redoutable devant le filet",
    stats: { gp: 16, g: 2, a: 6, pts: 8, plusMinus: 4, pim: 6, ppg: 0, gwg: 0, shots: 17, shPct: "11.8%", toi: "13:46", fowPct: "33.3%" },
    careerStats: { gp: 901, g: 328, a: 262, pts: 590, plusMinus: 118, pim: 594, ppg: 116, gwg: 50, shots: 2150, shPct: "15.3%", toi: "17:20", fowPct: "45.2%" }
  },
  {
    id: 8478133, name: "Jake Evans", number: 71, pos: "C", posGroup: "ATT", unit: "Trio 4", unitGroup: "ATT",
    specialTeams: ["IN 1"],
    age: 30, shoots: "D", country: "CAN", height: "6'0\"", weight: 190, hometown: "Toronto, ON",
    note: "Pilier du désavantage numérique au centre du 4e trio",
    stats: { gp: 16, g: 2, a: 4, pts: 6, plusMinus: 5, pim: 2, ppg: 0, gwg: 1, shots: 12, shPct: "16.7%", toi: "15:24", fowPct: "54.8%" },
    careerStats: { gp: 366, g: 42, a: 82, pts: 124, plusMinus: -12, pim: 112, ppg: 1, gwg: 7, shots: 412, shPct: "10.2%", toi: "14:52", fowPct: "52.1%" }
  },
  {
    id: 8483424, name: "Owen Beck", number: 62, pos: "C", posGroup: "ATT", unit: "Trio 4", unitGroup: "ATT",
    specialTeams: ["Aucune"],
    age: 22, shoots: "D", country: "CAN", height: "6'0\"", weight: 199, hometown: "Port Hope, ON",
    note: "Jeune centre fiable dans les deux sens de la patinoire",
    stats: { gp: 5, g: 1, a: 2, pts: 3, plusMinus: 0, pim: 5, ppg: 0, gwg: 0, shots: 6, shPct: "16.7%", toi: "08:42", fowPct: "57.1%" },
    careerStats: { gp: 18, g: 1, a: 3, pts: 4, plusMinus: -2, pim: 7, ppg: 0, gwg: 0, shots: 17, shPct: "5.9%", toi: "09:48", fowPct: "51.4%" }
  },
  {
    id: 8476981, name: "Josh Anderson", number: 17, pos: "AD", posGroup: "ATT", unit: "Trio 4", unitGroup: "ATT",
    specialTeams: ["IN 2"],
    age: 32, shoots: "D", country: "CAN", height: "6'3\"", weight: 226, hometown: "Burlington, ON",
    note: "Ailier droit robuste et très rapide en transition",
    stats: { gp: 16, g: 7, a: 3, pts: 10, plusMinus: 8, pim: 16, ppg: 0, gwg: 1, shots: 33, shPct: "21.2%", toi: "14:28", fowPct: "33.3%" },
    careerStats: { gp: 641, g: 155, a: 114, pts: 269, plusMinus: -55, pim: 572, ppg: 18, gwg: 24, shots: 1385, shPct: "11.2%", toi: "15:56", fowPct: "41.8%" }
  },
  {
    id: 8484403, name: "Florian Xhekaj", number: 63, pos: "AG", posGroup: "ATT", unit: "Trio 4", unitGroup: "ATT",
    specialTeams: ["Aucune"],
    age: 22, shoots: "G", country: "CAN", height: "6'3\"", weight: 195, hometown: "Hamilton, ON",
    note: "Frère cadet d'Arber, attaquant robuste et énergique",
    stats: { gp: 7, g: 1, a: 2, pts: 3, plusMinus: -1, pim: 13, ppg: 0, gwg: 0, shots: 9, shPct: "11.1%", toi: "07:53", fowPct: "20.0%" },
    careerStats: { gp: 7, g: 1, a: 2, pts: 3, plusMinus: -1, pim: 13, ppg: 0, gwg: 0, shots: 9, shPct: "11.1%", toi: "07:53", fowPct: "20.0%" }
  },

  // --- DÉFENSEURS (PAIRES 1 À 3) ---
  {
    id: 8483457, name: "Lane Hutson", number: 48, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "DEF",
    specialTeams: ["SN 1"],
    age: 22, shoots: "G", country: "USA", height: "5'9\"", weight: 162, hometown: "Holland, MI",
    note: "Quart-arrière offensif ultra-mobile à la ligne bleue",
    stats: { gp: 16, g: 3, a: 13, pts: 16, plusMinus: 8, pim: 8, ppg: 1, gwg: 0, shots: 29, shPct: "10.3%", toi: "24:59", fowPct: "—" },
    careerStats: { gp: 100, g: 9, a: 75, pts: 84, plusMinus: 4, pim: 44, ppg: 2, gwg: 1, shots: 156, shPct: "5.8%", toi: "23:12", fowPct: "—" }
  },
  {
    id: 8480865, name: "Noah Dobson", number: 53, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "DEF",
    specialTeams: ["SN 2", "IN 2"],
    age: 26, shoots: "D", country: "CAN", height: "6'4\"", weight: 200, hometown: "Summerside, PE",
    note: "Défenseur droitier numéro un sur la première paire",
    stats: { gp: 16, g: 0, a: 8, pts: 8, plusMinus: 1, pim: 12, ppg: 0, gwg: 0, shots: 34, shPct: "0.0%", toi: "20:56", fowPct: "—" },
    careerStats: { gp: 405, g: 50, a: 188, pts: 238, plusMinus: 8, pim: 166, ppg: 14, gwg: 10, shots: 912, shPct: "5.5%", toi: "21:45", fowPct: "—" }
  },
  {
    id: 8482087, name: "Kaiden Guhle", number: 21, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "DEF",
    specialTeams: ["IN 1"],
    age: 24, shoots: "G", country: "CAN", height: "6'3\"", weight: 202, hometown: "Edmonton, AB",
    note: "Défenseur complet affrontant les meilleurs trios adverses",
    stats: { gp: 12, g: 2, a: 3, pts: 5, plusMinus: 3, pim: 10, ppg: 0, gwg: 1, shots: 14, shPct: "14.3%", toi: "23:03", fowPct: "—" },
    careerStats: { gp: 181, g: 18, a: 45, pts: 63, plusMinus: -18, pim: 140, ppg: 1, gwg: 3, shots: 282, shPct: "6.4%", toi: "21:08", fowPct: "—" }
  },
  {
    id: 8478851, name: "Alexandre Carrier", number: 45, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "DEF",
    specialTeams: ["IN 2"],
    age: 30, shoots: "D", country: "CAN", height: "5'11\"", weight: 174, hometown: "Québec, QC",
    note: "Défenseur droitier québécois fiable en relance",
    stats: { gp: 16, g: 1, a: 5, pts: 6, plusMinus: 5, pim: 12, ppg: 0, gwg: 1, shots: 14, shPct: "7.1%", toi: "20:36", fowPct: "—" },
    careerStats: { gp: 310, g: 14, a: 84, pts: 98, plusMinus: 26, pim: 176, ppg: 1, gwg: 3, shots: 335, shPct: "4.2%", toi: "19:34", fowPct: "—" }
  },
  {
    id: 8476875, name: "Mike Matheson", number: 8, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "DEF",
    specialTeams: ["SN 2", "IN 1"],
    age: 32, shoots: "G", country: "CAN", height: "6'2\"", weight: 196, hometown: "Pointe-Claire, QC",
    note: "Vétéran originaire de Pointe-Claire au coup de patin élite",
    stats: { gp: 8, g: 1, a: 3, pts: 4, plusMinus: 1, pim: 6, ppg: 0, gwg: 0, shots: 15, shPct: "6.7%", toi: "23:45", fowPct: "—" },
    careerStats: { gp: 635, g: 74, a: 205, pts: 279, plusMinus: -42, pim: 382, ppg: 19, gwg: 13, shots: 1290, shPct: "5.7%", toi: "21:38", fowPct: "—" }
  },
  {
    id: 8482964, name: "Arber Xhekaj", number: 72, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "DEF",
    specialTeams: ["Aucune"],
    age: 25, shoots: "G", country: "CAN", height: "6'4\"", weight: 240, hometown: "Hamilton, ON",
    note: "Surnommé le Shérif, défenseur physique au tir frappé lourd",
    stats: { gp: 15, g: 1, a: 2, pts: 3, plusMinus: -1, pim: 30, ppg: 0, gwg: 0, shots: 11, shPct: "9.1%", toi: "11:51", fowPct: "—" },
    careerStats: { gp: 180, g: 10, a: 22, pts: 32, plusMinus: -16, pim: 330, ppg: 1, gwg: 1, shots: 198, shPct: "5.1%", toi: "14:46", fowPct: "—" }
  },
  {
    id: 8483686, name: "Adam Engström", number: 42, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "DEF",
    specialTeams: ["Aucune"],
    age: 22, shoots: "G", country: "SWE", height: "6'2\"", weight: 193, hometown: "Järna, SWE",
    note: "Défenseur suédois fluide repêché en 2022",
    stats: { gp: 10, g: 1, a: 1, pts: 2, plusMinus: 5, pim: 0, ppg: 0, gwg: 0, shots: 11, shPct: "9.1%", toi: "11:25", fowPct: "—" },
    careerStats: { gp: 10, g: 1, a: 1, pts: 2, plusMinus: 5, pim: 0, ppg: 0, gwg: 0, shots: 11, shPct: "9.1%", toi: "11:25", fowPct: "—" }
  },

  // --- GARDIENS ---
  {
    id: 8484170, name: "Jacob Fowler", number: 32, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "GAR",
    specialTeams: ["Aucune"],
    age: 21, shoots: "G", country: "USA", height: "6'1\"", weight: 223, hometown: "Melbourne, FL",
    note: "Jeune gardien calme et technique devant le filet",
    stats: { gp: 9, gs: 9, w: 7, l: 1, otl: 1, gaa: "2.17", svPct: ".925", so: 2, saves: 247, shotsAgainst: 267 },
    careerStats: { gp: 9, gs: 9, w: 7, l: 1, otl: 1, gaa: "2.17", svPct: ".925", so: 2, saves: 247, shotsAgainst: 267 }
  },
  {
    id: 8482487, name: "Jakub Dobeš", number: 75, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "GAR",
    specialTeams: ["Aucune"],
    age: 25, shoots: "G", country: "CZE", height: "6'4\"", weight: 215, hometown: "Ostrava, CZE",
    note: "Gardien tchèque imposant de 6 pieds 4 pouces",
    stats: { gp: 7, gs: 7, w: 3, l: 2, otl: 2, gaa: "4.04", svPct: ".860", so: 0, saves: 172, shotsAgainst: 200 },
    careerStats: { gp: 23, gs: 21, w: 10, l: 8, otl: 4, gaa: "3.12", svPct: ".896", so: 1, saves: 565, shotsAgainst: 631 }
  },
  {
    id: 8478470, name: "Samuel Montembeault", number: 35, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "GAR",
    specialTeams: ["Aucune"],
    age: 30, shoots: "G", country: "CAN", height: "6'3\"", weight: 218, hometown: "Bécancour, QC",
    note: "Gardien québécois vétéran devant le filet du Tricolore",
    stats: { gp: 0, gs: 0, w: 0, l: 0, otl: 0, gaa: "—", svPct: "—", so: 0, saves: 0, shotsAgainst: 0 },
    careerStats: { gp: 206, gs: 189, w: 80, l: 84, otl: 28, gaa: "3.20", svPct: ".899", so: 5, saves: 5620, shotsAgainst: 6251 }
  }
];

const MAX_ATTEMPTS = 8;
const DAILY_STORAGE_KEY = "habsle_daily_state_v2";
const DAILY_REMIX_STORAGE_KEY = "habsle_daily_remix_state_v2";
const DAILY_EXPERT_STORAGE_KEY = "habsle_daily_expert_state_v1";
const DAILY_IMAGE_STORAGE_KEY = "habsle_daily_image_state_v1";
const CUSTOM_PREFS_STORAGE_KEY = "habsle_custom_prefs_v1";
const NHL_CACHE_KEY = "habsle_nhl_api_cache_v2";

const INJURED_UNIT = "Hors alignement";
const UNITS_ORDER = [
  "Trio 1",
  "Trio 2",
  "Trio 3",
  "Trio 4",
  "Paire 1",
  "Paire 2",
  "Paire 3",
  "Gardien",
  INJURED_UNIT
];

const UNIT_SECTION_TITLES = {
  "Trio 1": "Trio 1",
  "Trio 2": "Trio 2",
  "Trio 3": "Trio 3",
  "Trio 4": "Trio 4",
  "Paire 1": "Paire 1",
  "Paire 2": "Paire 2",
  "Paire 3": "Paire 3",
  "Gardien": "Gardiens",
  [INJURED_UNIT]: "Blessés / Hors de l'alignement"
};

const CLASSIC_COLUMNS = ["number", "pos", "unit", "shoots", "age"];
const STAT_POOL_COLUMNS = [
  "specialTeams",
  "country",
  "gp",
  "g",
  "a",
  "pts",
  "plusMinus",
  "pim",
  "shots",
  "toi",
  "height",
  "weight"
];
const ALL_AVAILABLE_COLUMNS = [...CLASSIC_COLUMNS, ...STAT_POOL_COLUMNS];

// Identifiants des 25 joueurs de base éligibles aux défis et parties
const CORE_PLAYER_IDS = new Set(PLAYERS.map(p => p.id));
PLAYERS.forEach(p => {
  p.isPlayable = true;
});

function isPlayablePlayer(player) {
  return Boolean(player && player.isPlayable !== false);
}

function getPlayablePlayers() {
  return PLAYERS.filter(isPlayablePlayer);
}

// État des services pour le tableau #admin
const SERVICE_STATUS = {
  source: "Données locales intégrées (data.js)",
  lastUpdated: null,
  nhlRoster: { ok: false, detail: "En attente de synchronisation" },
  nhlStats: { ok: false, detail: "En attente de synchronisation" },
  nhlCareer: { ok: false, detail: "En attente de synchronisation" },
  dailyFaceoff: { ok: false, detail: "En attente de synchronisation" }
};

function formatSpecialTeams(player) {
  const list = Array.isArray(player.specialTeams) && player.specialTeams.length > 0
    ? player.specialTeams
    : ["Aucune"];
  return list.join(" • ");
}

function getPlayerOutStatus(player) {
  if (!player || player.unit !== INJURED_UNIT) return null;
  return player.outStatus || "Laissé de côté";
}

function getSpecialTeamsList(player) {
  return Array.isArray(player.specialTeams) && player.specialTeams.length > 0
    ? player.specialTeams
    : ["Aucune"];
}

function getPlayerPhotoUrl(player) {
  return player.headshotUrl || `https://assets.nhle.com/mugs/nhl/20262027/MTL/${player.id}.png`;
}

function getPlayerFallbackPhotoUrl(player) {
  if (player && typeof player.id === "number" && player.id >= 8000000) {
    return `https://assets.nhle.com/mugs/nhl/latest/${player.id}.png`;
  }
  return "https://assets.nhle.com/mugs/nhl/default-skater.png";
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
      // Un joueur "Hors alignement" garde son unitGroup LNH (ATT, DEF ou GAR).
      // Ainsi, un ATT blessé comparé à un joueur du Trio 1 (ATT) donne "close" (jaune).
      const sameExactUnit =
        player.unit === secret.unit && player.unitGroup === secret.unitGroup;
      const status = sameExactUnit
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
  specialTeams: {
    label: "Unités spéc.",
    fullName: "Unités spéciales",
    interval: "(SN/IN)",
    isStat: true,
    evaluate(player, secret) {
      const gList = getSpecialTeamsList(player);
      const sList = getSpecialTeamsList(secret);
      const gText = formatSpecialTeams(player);

      const isExact =
        gList.length === sList.length && gList.every(u => sList.includes(u));
      if (isExact) {
        return { text: gText, status: "exact", sub: "" };
      }

      const sharesExactUnit = gList.some(u => u !== "Aucune" && sList.includes(u));
      const gHasSN = gList.some(u => u.startsWith("SN"));
      const sHasSN = sList.some(u => u.startsWith("SN"));
      const gHasIN = gList.some(u => u.startsWith("IN"));
      const sHasIN = sList.some(u => u.startsWith("IN"));

      const isClose = sharesExactUnit || (gHasSN && sHasSN) || (gHasIN && sHasIN);
      return {
        text: gText,
        status: isClose ? "close" : "wrong",
        sub: ""
      };
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

// --- SYNCHRONISATION AVEC L'API LNH ET DAILY FACEOFF ---
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

function normalizeLookupKey(nameStr) {
  return (nameStr || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-'.]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function formatInchesToHeight(inches) {
  if (typeof inches !== "number" || inches <= 0) return "—";
  return `${Math.floor(inches / 12)}'${inches % 12}"`;
}

function formatHometownFromRoster(entry) {
  if (!entry) return "—";
  const city = entry.birthCity?.default;
  const region = entry.birthStateProvince?.default || entry.birthCountry;
  if (city && region) return `${city}, ${region}`;
  return city || region || "—";
}

function matchesNormalizedNames(keyA, keyB) {
  if (!keyA || !keyB) return false;
  if (keyA === keyB) return true;
  const partsA = keyA.split(" ");
  const partsB = keyB.split(" ");
  if (partsA.length < 2 || partsB.length < 2) return false;
  return (
    partsA[0][0] === partsB[0][0] &&
    partsA[partsA.length - 1] === partsB[partsB.length - 1]
  );
}

function findLineEntryForPlayer(player, linesData, usedKeys = null) {
  if (!player || !linesData) return null;

  const fullKey = normalizeLookupKey(player.name);
  if (linesData[fullKey] && (!usedKeys || !usedKeys.has(fullKey))) {
    return { key: fullKey, info: linesData[fullKey] };
  }

  for (const [dfKey, dfInfo] of Object.entries(linesData)) {
    if (usedKeys && usedKeys.has(dfKey)) continue;
    if (matchesNormalizedNames(fullKey, dfKey)) {
      return { key: dfKey, info: dfInfo };
    }
  }

  return null;
}

function findLineInfoForPlayer(player, linesData) {
  const match = findLineEntryForPlayer(player, linesData);
  return match ? match.info : null;
}

function createDefaultStatsForGroup(posGroup) {
  if (posGroup === "GAR") {
    return { gp: 0, gs: 0, w: 0, l: 0, otl: 0, gaa: "—", svPct: "—", so: 0, saves: 0, shotsAgainst: 0 };
  }
  return { gp: 0, g: 0, a: 0, pts: 0, plusMinus: 0, pim: 0, ppg: 0, gwg: 0, shots: 0, shPct: "0.0%", toi: "—", fowPct: "—" };
}

function buildDynamicPlayerFromDailyFaceoff(dfKey, dfInfo, allRosterEntries, allStatsEntries, indexSeed) {
  const rosterEntry = allRosterEntries.find(e => {
    if (dfInfo.id && e.id === dfInfo.id) return true;
    const eName = `${e.firstName?.default || ""} ${e.lastName?.default || ""}`;
    return matchesNormalizedNames(normalizeLookupKey(eName), dfKey);
  });

  const statsEntry = allStatsEntries.find(s => {
    if (rosterEntry && s.playerId === rosterEntry.id) return true;
    if (dfInfo.id && s.playerId === dfInfo.id) return true;
    const sName = `${s.firstName?.default || ""} ${s.lastName?.default || ""}`;
    return matchesNormalizedNames(normalizeLookupKey(sName), dfKey);
  });

  const posCode = rosterEntry?.positionCode || statsEntry?.positionCode;
  const mappedPos = posCode && NHL_POS_CODE_MAP[posCode] ? NHL_POS_CODE_MAP[posCode] : null;

  const pos = dfInfo.pos || mappedPos?.pos || "C";
  const posGroup = mappedPos?.group || (pos === "G" ? "GAR" : pos === "D" ? "DEF" : "ATT");

  const fullName = rosterEntry?.firstName?.default && rosterEntry?.lastName?.default
    ? `${rosterEntry.firstName.default} ${rosterEntry.lastName.default}`
    : statsEntry?.firstName?.default && statsEntry?.lastName?.default
    ? `${statsEntry.firstName.default} ${statsEntry.lastName.default}`
    : dfInfo.name || dfKey;

  const roleLabel =
    posGroup === "GAR" ? "Gardien" : posGroup === "DEF" ? "Défenseur" : "Attaquant";

  const resolvedUnit = dfInfo.unit && dfInfo.unit !== INJURED_UNIT ? dfInfo.unit : INJURED_UNIT;

  return {
    id: rosterEntry?.id || statsEntry?.playerId || dfInfo.id || (1000000 + indexSeed),
    name: fullName,
    number: rosterEntry?.sweaterNumber ?? dfInfo.number ?? "—",
    pos,
    posGroup,
    unit: resolvedUnit,
    unitGroup: posGroup,
    outStatus:
      resolvedUnit === INJURED_UNIT
        ? (dfInfo.outStatus || (dfInfo.injured ? "Blessé" : "Laissé de côté"))
        : null,
    specialTeams: Array.isArray(dfInfo.specialTeams) && dfInfo.specialTeams.length > 0
      ? dfInfo.specialTeams
      : ["Aucune"],
    age: calculateAgeFromBirthDate(rosterEntry?.birthDate) ?? dfInfo.age ?? "—",
    shoots: rosterEntry?.shootsCatches ? (rosterEntry.shootsCatches === "L" ? "G" : "D") : (dfInfo.shoots || "—"),
    country: rosterEntry?.birthCountry || dfInfo.country || "—",
    height: formatInchesToHeight(rosterEntry?.heightInInches) !== "—"
      ? formatInchesToHeight(rosterEntry?.heightInInches)
      : (dfInfo.height || "—"),
    weight: rosterEntry?.weightInPounds ?? dfInfo.weight ?? "—",
    hometown: formatHometownFromRoster(rosterEntry) !== "—"
      ? formatHometownFromRoster(rosterEntry)
      : (dfInfo.hometown || "—"),
    note: `${roleLabel} de réserve des Canadiens`,
    headshotUrl: rosterEntry?.headshot || statsEntry?.headshot || dfInfo.headshotUrl || null,
    stats: createDefaultStatsForGroup(posGroup),
    careerStats: createDefaultStatsForGroup(posGroup),
    isPlayable: false
  };
}

function applyCareerRegularSeasonObj(player, reg) {
  if (!player || !reg) return;

  if (player.posGroup === "GAR") {
    player.careerStats = {
      gp: reg.gamesPlayed ?? 0,
      gs: reg.gamesStarted ?? 0,
      w: reg.wins ?? 0,
      l: reg.losses ?? 0,
      otl: reg.otLosses ?? 0,
      gaa: typeof reg.goalsAgainstAvg === "number" ? reg.goalsAgainstAvg.toFixed(2) : "—",
      svPct: typeof reg.savePctg === "number" ? reg.savePctg.toFixed(3).replace(/^0/, "") : "—",
      so: reg.shutouts ?? 0,
      saves: reg.saves ?? Math.max(0, (reg.shotsAgainst ?? 0) - (reg.goalsAgainst ?? 0)),
      shotsAgainst: reg.shotsAgainst ?? 0
    };
  } else {
    player.careerStats = {
      gp: reg.gamesPlayed ?? 0,
      g: reg.goals ?? 0,
      a: reg.assists ?? 0,
      pts: reg.points ?? 0,
      plusMinus: reg.plusMinus ?? 0,
      pim: reg.pim ?? 0,
      ppg: reg.powerPlayGoals ?? 0,
      gwg: reg.gameWinningGoals ?? 0,
      shots: reg.shots ?? 0,
      shPct: typeof reg.shootingPctg === "number" ? `${(reg.shootingPctg * 100).toFixed(1)}%` : "0.0%",
      toi: reg.avgToi || "—",
      fowPct: typeof reg.faceoffWinningPctg === "number" && reg.faceoffWinningPctg > 0
        ? `${(reg.faceoffWinningPctg * 100).toFixed(1)}%`
        : "—"
    };
  }
  player._careerSynced = true;
}

const NHL_POS_CODE_MAP = {
  C: { pos: "C", group: "ATT" },
  L: { pos: "AG", group: "ATT" },
  R: { pos: "AD", group: "ATT" },
  D: { pos: "D", group: "DEF" },
  G: { pos: "G", group: "GAR" }
};

function applyNHLAPIData(rosterData, statsData, careerData = null, linesData = null, metaData = null) {
  const allRosterEntries = rosterData
    ? [
        ...(rosterData.forwards || []),
        ...(rosterData.defensemen || []),
        ...(rosterData.goalies || [])
      ]
    : [];

  const allStatsEntries = statsData
    ? [
        ...(statsData.skaters || []),
        ...(statsData.goalies || [])
      ]
    : [];

  // 0. Ajout propre des joueurs présents sur Daily Faceoff mais absents des 25 joueurs de base
  if (linesData && typeof linesData === "object" && Object.keys(linesData).length >= 15) {
    for (let i = PLAYERS.length - 1; i >= 0; i--) {
      if (!CORE_PLAYER_IDS.has(PLAYERS[i].id)) {
        PLAYERS.splice(i, 1);
      }
    }

    const matchedDfKeys = new Set();
    PLAYERS.forEach(corePlayer => {
      const match = findLineEntryForPlayer(corePlayer, linesData, matchedDfKeys);
      if (match) matchedDfKeys.add(match.key);
    });

    let extraIndex = 1;
    for (const [dfKey, dfInfo] of Object.entries(linesData)) {
      if (matchedDfKeys.has(dfKey)) continue;
      const dynamicPlayer = buildDynamicPlayerFromDailyFaceoff(
        dfKey,
        dfInfo,
        allRosterEntries,
        allStatsEntries,
        extraIndex++
      );
      PLAYERS.push(dynamicPlayer);
    }
  }

  // 1. Alignement et positions depuis le fichier de la LNH
  const rosterCount = allRosterEntries.length;
  allRosterEntries.forEach(entry => {
    const player = PLAYERS.find(p => p.id === entry.id);
    if (!player) return;

    if (entry.positionCode && NHL_POS_CODE_MAP[entry.positionCode]) {
      const mapped = NHL_POS_CODE_MAP[entry.positionCode];
      player.pos = mapped.pos;
      player.posGroup = mapped.group;
      player.unitGroup = mapped.group;
    }

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
    if (typeof entry.heightInInches === "number" && (!player.height || player.height === "—")) {
      player.height = formatInchesToHeight(entry.heightInInches);
    }
    if (!player.hometown || player.hometown === "—") {
      player.hometown = formatHometownFromRoster(entry);
    }
  });

  // 2. Statistiques de la saison actuelle LNH
  let statsCount = 0;
  if (statsData) {
    if (Array.isArray(statsData.skaters)) {
      statsCount += statsData.skaters.length;
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
      statsCount += statsData.goalies.length;
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

  // 3. Statistiques en carrière LNH
  let careerCount = 0;
  if (careerData && typeof careerData === "object") {
    careerCount = Object.keys(careerData).length;
    PLAYERS.forEach(player => {
      const reg = careerData[String(player.id)] || careerData[player.id];
      if (reg) {
        applyCareerRegularSeasonObj(player, reg);
      }
    });
  }

  // 4. Trios, Blessés / Hors alignement et Unités spéciales depuis Daily Faceoff
  let dfCount = 0;
  if (linesData && typeof linesData === "object") {
    const dfKeys = Object.keys(linesData);
    dfCount = dfKeys.length;

    if (dfCount >= 15) {
      const usedKeys = new Set();
      PLAYERS.forEach(player => {
        const match = findLineEntryForPlayer(player, linesData, usedKeys);
        const info = match ? match.info : null;
        if (match) usedKeys.add(match.key);

        player.unitGroup = player.posGroup;

        if (info) {
          if (info.pos) {
            player.pos = info.pos;
          }

          if (info.unit && info.unit !== INJURED_UNIT) {
            player.unit = info.unit;
            player.outStatus = null;
          } else {
            player.unit = INJURED_UNIT;
            player.outStatus =
              info.outStatus || (info.injured ? "Blessé" : "Laissé de côté");
          }

          if (Array.isArray(info.specialTeams) && info.specialTeams.length > 0) {
            player.specialTeams = info.specialTeams;
          } else {
            player.specialTeams = ["Aucune"];
          }
        } else {
          player.unit = INJURED_UNIT;
          player.outStatus = "Laissé de côté";
          player.specialTeams = ["Aucune"];
        }
      });
    }
  }

  // 5. Mise à jour du rapport d'état pour #admin
  if (metaData && metaData.updatedAt) {
    SERVICE_STATUS.lastUpdated = metaData.updatedAt;
  }

  if (metaData && metaData.services) {
    const sv = metaData.services;
    if (sv.nhlRoster) SERVICE_STATUS.nhlRoster = sv.nhlRoster;
    if (sv.nhlStats) SERVICE_STATUS.nhlStats = sv.nhlStats;
    if (sv.nhlCareer) SERVICE_STATUS.nhlCareer = sv.nhlCareer;
    if (sv.dailyFaceoff) SERVICE_STATUS.dailyFaceoff = sv.dailyFaceoff;
  } else {
    SERVICE_STATUS.nhlRoster = {
      ok: rosterCount > 0,
      detail: rosterCount > 0 ? `Opérationnel (${rosterCount} joueurs LNH)` : "Non disponible (fallback local)"
    };
    SERVICE_STATUS.nhlStats = {
      ok: statsCount > 0,
      detail: statsCount > 0 ? `Opérationnel (${statsCount} fiches saison)` : "Non disponible (fallback local)"
    };
    SERVICE_STATUS.nhlCareer = {
      ok: careerCount > 0,
      detail: careerCount > 0 ? `Opérationnel (${careerCount} fiches carrière)` : "Préchargé dans data.js / À la demande"
    };
    SERVICE_STATUS.dailyFaceoff = {
      ok: dfCount > 0,
      detail: dfCount > 0 ? `Opérationnel (${dfCount} joueurs extraits)` : "Non disponible (trios par défaut actifs)"
    };
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

async function fetchPlayerCareerFromAPI(player) {
  if (!player || player._careerSynced || typeof player.id !== "number" || player.id < 8000000) {
    return false;
  }
  const data = await fetchViaCORSFallback(`https://api-web.nhle.com/v1/player/${player.id}/landing`);
  const reg = data?.careerTotals?.regularSeason;
  if (!reg) return false;

  applyCareerRegularSeasonObj(player, reg);
  return true;
}

async function syncWithNHLAPI(forceRefresh = false) {
  const apiSyncStatusEl = document.getElementById("api-sync-status");

  if (!forceRefresh) {
    try {
      const cached = JSON.parse(localStorage.getItem(NHL_CACHE_KEY) || "null");
      if (cached && Date.now() - cached.timestamp < 6 * 3600 * 1000) {
        SERVICE_STATUS.source = "Cache navigateur (localStorage)";
        applyNHLAPIData(cached.roster, cached.stats, cached.career, cached.lines, cached.meta);
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
      SERVICE_STATUS.source = "nhl-data.json (GitHub Actions)";
      applyNHLAPIData(
        localData.roster,
        localData.stats,
        localData.career,
        localData.lines,
        localData.meta
      );
      if (apiSyncStatusEl) {
        apiSyncStatusEl.textContent = "Données synchronisées (LNH + Daily Faceoff)";
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
    SERVICE_STATUS.source = "Direct via proxy CORS (api-web.nhle.com)";
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
    SERVICE_STATUS.source = "Données locales de secours (data.js)";
    apiSyncStatusEl.textContent = "Données LNH 2026-2027 intégrées actives";
  }
}

// --- DÉCLENCHEMENT GITHUB ACTIONS (#admin) & MISE À JOUR RAPIDE ---
const GITHUB_REPO_OWNER = "v-gagnon";
const GITHUB_REPO_NAME = "Habsle";
const GITHUB_WORKFLOW_FILE = "update-nhl.yml";
const GITHUB_BRANCH = "main";
const GITHUB_PAT_STORAGE_KEY = "habsle_github_pat_v1";

function getStoredGitHubToken() {
  try {
    return (localStorage.getItem(GITHUB_PAT_STORAGE_KEY) || "").trim();
  } catch (e) {
    return "";
  }
}

function saveStoredGitHubToken(token) {
  const clean = (token || "").trim();
  if (clean) {
    localStorage.setItem(GITHUB_PAT_STORAGE_KEY, clean);
  } else {
    localStorage.removeItem(GITHUB_PAT_STORAGE_KEY);
  }
}

function buildGitHubHeaders(token = "") {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function loadLatestDataFromGitHubRaw(token = getStoredGitHubToken()) {
  const commitsUrl =
    `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}` +
    `/commits?sha=${GITHUB_BRANCH}&path=nhl-data.json&per_page=1`;

  const commitsResp = await fetch(commitsUrl, {
    headers: buildGitHubHeaders(token),
    cache: "no-store"
  });

  if (!commitsResp.ok) {
    throw new Error(`Impossible de lire le dernier commit (HTTP ${commitsResp.status})`);
  }

  const commits = await commitsResp.json();
  const latestSha = Array.isArray(commits) && commits[0]?.sha ? commits[0].sha : GITHUB_BRANCH;

  // Aucun en-tête personnalisé sur raw.githubusercontent.com pour éviter un blocage CORS preflight
  const rawUrl = `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/${latestSha}/nhl-data.json`;
  const rawResp = await fetch(rawUrl, { cache: "no-store" });
  if (!rawResp.ok) {
    throw new Error(`Impossible de télécharger nhl-data.json (HTTP ${rawResp.status})`);
  }

  const freshData = await rawResp.json();
  SERVICE_STATUS.source = `nhl-data.json (GitHub Raw • ${latestSha.slice(0, 7)})`;

  applyNHLAPIData(
    freshData.roster,
    freshData.stats,
    freshData.career,
    freshData.lines,
    freshData.meta
  );

  // Sauvegarde dans le cache local pour conserver les données fraîches si la page est rechargée
  // avant la fin du déploiement GitHub Pages
  try {
    localStorage.setItem(
      NHL_CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        roster: freshData.roster,
        stats: freshData.stats,
        career: freshData.career,
        lines: freshData.lines,
        meta: freshData.meta
      })
    );
  } catch (e) {}

  const apiSyncStatusEl = document.getElementById("api-sync-status");
  if (apiSyncStatusEl) {
    apiSyncStatusEl.textContent = "Données actualisées en direct depuis GitHub";
  }

  if (typeof renderStudyDirectory === "function" && typeof currentView !== "undefined" && currentView === "study") {
    renderStudyDirectory(document.getElementById("study-search-input")?.value || "");
  }

  return { sha: latestSha, updatedAt: freshData.meta?.updatedAt || null };
}

async function triggerGitHubWorkflowUpdate(onProgress = () => {}) {
  const token = getStoredGitHubToken();
  if (!token) {
    throw new Error("Enregistre d'abord ton jeton GitHub (Fine-grained PAT) ci-dessus.");
  }

  const baseRunsUrl =
    `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}` +
    `/actions/workflows/${GITHUB_WORKFLOW_FILE}/runs?event=workflow_dispatch&per_page=5`;

  // 1. Repère le dernier run manuel existant pour éviter tout souci de décalage d'horloge
  let previousRunId = 0;
  try {
    const prevResp = await fetch(baseRunsUrl, {
      headers: buildGitHubHeaders(token),
      cache: "no-store"
    });
    if (prevResp.ok) {
      const prevJson = await prevResp.json();
      previousRunId = prevJson.workflow_runs?.[0]?.id || 0;
    }
  } catch (e) {}

  // 2. Déclenche le workflow via POST workflow_dispatch
  onProgress("Envoi de la requête POST à GitHub Actions...");
  const dispatchUrl =
    `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}` +
    `/actions/workflows/${GITHUB_WORKFLOW_FILE}/dispatches`;

  const dispatchResp = await fetch(dispatchUrl, {
    method: "POST",
    headers: {
      ...buildGitHubHeaders(token),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ref: GITHUB_BRANCH })
  });

  if (dispatchResp.status === 401 || dispatchResp.status === 403) {
    throw new Error("Jeton refusé (HTTP " + dispatchResp.status + "). Vérifie la permission Actions : Read and write.");
  }
  if (!dispatchResp.ok) {
    throw new Error(`Échec du déclenchement (HTTP ${dispatchResp.status})`);
  }

  onProgress("Action déclenchée (HTTP 204). Attente du démarrage du runner...");

  // 3. Suivi en direct du run (toutes les 4 secondes, max ~2 min)
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  let trackedRun = null;

  for (let attempt = 1; attempt <= 30; attempt++) {
    await sleep(4000);

    const pollResp = await fetch(baseRunsUrl, {
      headers: buildGitHubHeaders(token),
      cache: "no-store"
    });
    if (!pollResp.ok) continue;

    const pollData = await pollResp.json();
    const runs = pollData.workflow_runs || [];
    const found = trackedRun
      ? runs.find(r => r.id === trackedRun.id)
      : runs.find(r => r.id > previousRunId);

    if (!found) {
      onProgress(`En attente de création du run GitHub (${attempt * 4} s)...`);
      continue;
    }

    trackedRun = found;

    if (found.status === "queued" || found.status === "waiting" || found.status === "requested") {
      onProgress(`Run #${found.run_number} en file d'attente...`);
    } else if (found.status === "in_progress") {
      onProgress(`Run #${found.run_number} en cours (LNH + Daily Faceoff)...`);
    } else if (found.status === "completed") {
      if (found.conclusion !== "success") {
        throw new Error(`Run #${found.run_number} terminé avec le statut « ${found.conclusion} ».`);
      }

      // 4. Mise à jour rapide immédiate sans attendre GitHub Pages
      onProgress(`Run #${found.run_number} réussi ! Téléchargement rapide de nhl-data.json...`);
      const loaded = await loadLatestDataFromGitHubRaw(token);
      return { runNumber: found.run_number, ...loaded };
    }
  }

  throw new Error("Délai dépassé (2 min). Vérifie l'onglet Actions sur GitHub.");
}