// Alignement et statistiques 2026-2027 des Canadiens de Montréal
const PLAYERS = [
  // --- TRIO 1 ---
  {
    id: 8481540, name: "Cole Caufield", number: 13, pos: "AG", posGroup: "ATT", unit: "Trio 1", unitGroup: "ATT",
    specialTeams: ["SN 1"],
    birthDate: "2001-01-02", shoots: "D", country: "USA", height: "5'8\"", weight: 175, hometown: "Mosinee, WI",
    note: "Buteur naturel au tir sur réception rapide, choisi 15e en 2019",
    stats: { gp: 24, g: 12, a: 8, pts: 20, plusMinus: 5, pim: 10, ppg: 2, gwg: 3, shots: 79, shPct: "15.2%", toi: "18:33", fowPct: "71.4%", hits: 21, blocks: 3, takeaways: 6, skatingSpeed: "35.1 km/h", shotSpeed: "138.2 km/h" },
    careerStats: { gp: 392, g: 181, a: 146, pts: 327, plusMinus: 4, pim: 68, ppg: 44, gwg: 38, shots: 1267, shPct: "14.3%", toi: "18:04", fowPct: "43.9%", hits: 232, blocks: 96, takeaways: 138 }
  },
  {
    id: 8480018, name: "Nick Suzuki", number: 14, pos: "C", posGroup: "ATT", unit: "Trio 1", unitGroup: "ATT",
    specialTeams: ["SN 1", "IN 2"],
    birthDate: "1999-08-10", shoots: "D", country: "CAN", height: "5'11\"", weight: 207, hometown: "London, ON",
    note: "Capitaine du CH depuis 2022, premier centre et principal fabricant de jeu",
    stats: { gp: 18, g: 9, a: 11, pts: 20, plusMinus: 9, pim: 2, ppg: 2, gwg: 0, shots: 47, shPct: "19.1%", toi: "20:47", fowPct: "53.8%", hits: 25, blocks: 12, takeaways: 8, skatingSpeed: "35.5 km/h", shotSpeed: "134.8 km/h" },
    careerStats: { gp: 555, g: 176, a: 320, pts: 496, plusMinus: -11, pim: 169, ppg: 55, gwg: 20, shots: 1183, shPct: "14.9%", toi: "19:53", fowPct: "49.5%", hits: 492, blocks: 381, takeaways: 262 }
  },
  {
    id: 8480074, name: "Alexandre Texier", number: 85, pos: "AD", posGroup: "ATT", unit: "Trio 1", unitGroup: "ATT",
    specialTeams: ["SN 2", "IN 2"],
    birthDate: "1999-09-13", shoots: "G", country: "FRA", height: "6'1\"", weight: 196, hometown: "Saint-Martin-d'Hères, FRA",
    note: "Ailier français passé par Columbus et Saint-Louis avant Montréal",
    stats: { gp: 24, g: 2, a: 3, pts: 5, plusMinus: -3, pim: 14, ppg: 0, gwg: 0, shots: 45, shPct: "4.4%", toi: "14:04", fowPct: "—", hits: 27, blocks: 11, takeaways: 6, skatingSpeed: "35.2 km/h", shotSpeed: "143.8 km/h" },
    careerStats: { gp: 307, g: 50, a: 66, pts: 116, plusMinus: -9, pim: 132, ppg: 1, gwg: 4, shots: 467, shPct: "10.7%", toi: "14:18", fowPct: "35.0%", hits: 253, blocks: 112, takeaways: 94 }
  },

  // --- TRIO 2 ---
  {
    id: 8481618, name: "Alex Newhook", number: 15, pos: "AG", posGroup: "ATT", unit: "Trio 2", unitGroup: "ATT",
    specialTeams: ["SN 2"],
    birthDate: "2001-01-28", shoots: "G", country: "CAN", height: "5'11\"", weight: 200, hometown: "St. John's, NL",
    note: "Patineur rapide acquis du Colorado en 2023, à l'aise au centre et à l'aile",
    stats: { gp: 24, g: 6, a: 6, pts: 12, plusMinus: -4, pim: 14, ppg: 0, gwg: 0, shots: 29, shPct: "20.7%", toi: "16:24", fowPct: "50.2%", hits: 22, blocks: 17, takeaways: 2, skatingSpeed: "36.5 km/h", shotSpeed: "133.8 km/h" },
    careerStats: { gp: 362, g: 76, a: 87, pts: 163, plusMinus: -11, pim: 102, ppg: 9, gwg: 15, shots: 530, shPct: "14.3%", toi: "14:49", fowPct: "43.2%", hits: 298, blocks: 160, takeaways: 88 }
  },
  {
    id: 8477946, name: "Dylan Larkin", number: 71, pos: "C", posGroup: "ATT", unit: "Trio 2", unitGroup: "ATT",
    specialTeams: ["SN 1"],
    birthDate: "1996-07-30", shoots: "G", country: "USA", height: "6'1\"", weight: 198, hometown: "Waterford, MI",
    note: "Ex-capitaine des Red Wings acquis en novembre 2026 pour épauler Suzuki au centre",
    stats: { gp: 10, g: 2, a: 4, pts: 6, plusMinus: 3, pim: 4, ppg: 0, gwg: 0, shots: 32, shPct: "6.3%", toi: "21:41", fowPct: "53.4%", hits: 5, blocks: 6, takeaways: 4, skatingSpeed: "35.5 km/h", shotSpeed: "133.0 km/h" },
    careerStats: { gp: 818, g: 278, a: 371, pts: 649, plusMinus: -97, pim: 503, ppg: 86, gwg: 40, shots: 2447, shPct: "11.4%", toi: "19:33", fowPct: "52.8%", hits: 640, blocks: 350, takeaways: 484 }
  },
  {
    id: 8483515, name: "Juraj Slafkovský", number: 20, pos: "AD", posGroup: "ATT", unit: "Trio 2", unitGroup: "ATT",
    specialTeams: ["SN 1"],
    birthDate: "2004-03-30", shoots: "G", country: "SVK", height: "6'3\"", weight: 225, hometown: "Košice, SVK",
    note: "1er choix au total en 2022, ailier slovaque lourd à déloger le long des rampes",
    stats: { gp: 24, g: 2, a: 12, pts: 14, plusMinus: 0, pim: 18, ppg: 0, gwg: 0, shots: 54, shPct: "3.7%", toi: "18:26", fowPct: "35.0%", hits: 21, blocks: 24, takeaways: 3, skatingSpeed: "37.2 km/h", shotSpeed: "147.3 km/h" },
    careerStats: { gp: 306, g: 74, a: 124, pts: 198, plusMinus: -19, pim: 203, ppg: 27, gwg: 7, shots: 561, shPct: "13.2%", toi: "17:15", fowPct: "36.2%", hits: 525, blocks: 259, takeaways: 81 }
  },
  {
    id: 8484984, name: "Ivan Demidov", number: 93, pos: "AD", posGroup: "ATT", unit: "Hors alignement", unitGroup: "ATT",
    specialTeams: ["Aucune"],
    birthDate: "2005-12-10", shoots: "G", country: "RUS", height: "6'1\"", weight: 192, hometown: "Sergiyev Posad, RUS",
    note: "5e choix en 2024 et finaliste au Calder en 2026, ailier russe aux mains rapides",
    stats: { gp: 2, g: 1, a: 1, pts: 2, plusMinus: 0, pim: 2, ppg: 0, gwg: 0, shots: 4, shPct: "25.0%", toi: "15:37", fowPct: "—", hits: 3, blocks: 0, takeaways: 0, skatingSpeed: "32.9 km/h", shotSpeed: "137.4 km/h" },
    careerStats: { gp: 86, g: 21, a: 45, pts: 66, plusMinus: 4, pim: 36, ppg: 7, gwg: 4, shots: 136, shPct: "15.4%", toi: "15:28", fowPct: "—", hits: 33, blocks: 26, takeaways: 22 }
  },

  // --- TRIO 3 ---
  {
    id: 8482737, name: "Zachary Bolduc", number: 76, pos: "AG", posGroup: "ATT", unit: "Trio 3", unitGroup: "ATT",
    specialTeams: ["SN 2"],
    birthDate: "2003-02-24", shoots: "G", country: "CAN", height: "6'0\"", weight: 187, hometown: "Trois-Rivières, QC",
    note: "Ailier de Trois-Rivières acquis des Blues en juillet 2025, doté d'un bon tir",
    stats: { gp: 23, g: 7, a: 3, pts: 10, plusMinus: 1, pim: 4, ppg: 4, gwg: 1, shots: 37, shPct: "18.9%", toi: "14:26", fowPct: "—", hits: 35, blocks: 8, takeaways: 2, skatingSpeed: "36.0 km/h", shotSpeed: "136.0 km/h" },
    careerStats: { gp: 198, g: 43, a: 42, pts: 85, plusMinus: 15, pim: 75, ppg: 14, gwg: 4, shots: 296, shPct: "14.5%", toi: "13:13", fowPct: "43.1%", hits: 325, blocks: 99, takeaways: 52 }
  },
  {
    id: 8476479, name: "Phillip Danault", number: 24, pos: "C", posGroup: "ATT", unit: "Trio 3", unitGroup: "ATT",
    specialTeams: ["IN 1"],
    birthDate: "1993-02-24", shoots: "G", country: "CAN", height: "6'1\"", weight: 200, hometown: "Victoriaville, QC",
    note: "Spécialiste des mises au jeu et du travail défensif, revenu à Montréal en 2025-2026",
    stats: { gp: 24, g: 3, a: 6, pts: 9, plusMinus: 1, pim: 0, ppg: 0, gwg: 0, shots: 36, shPct: "8.3%", toi: "17:10", fowPct: "56.1%", hits: 16, blocks: 13, takeaways: 3, skatingSpeed: "34.9 km/h", shotSpeed: "132.3 km/h" },
    careerStats: { gp: 810, g: 134, a: 286, pts: 420, plusMinus: 80, pim: 349, ppg: 10, gwg: 20, shots: 1392, shPct: "9.6%", toi: "17:03", fowPct: "53.3%", hits: 870, blocks: 553, takeaways: 313 }
  },
  {
    id: 8482775, name: "Oliver Kapanen", number: 91, pos: "AD", posGroup: "ATT", unit: "Trio 3", unitGroup: "ATT",
    specialTeams: ["SN 2"],
    birthDate: "2003-07-29", shoots: "D", country: "SWE", height: "6'2\"", weight: 194, hometown: "Timrå, SWE",
    note: "Choix de 2e tour en 2021, attaquant finlandais né en Suède et fiable sans la rondelle",
    stats: { gp: 17, g: 2, a: 2, pts: 4, plusMinus: 5, pim: 6, ppg: 0, gwg: 0, shots: 20, shPct: "10.0%", toi: "11:14", fowPct: "48.9%", hits: 4, blocks: 6, takeaways: 2, skatingSpeed: "34.2 km/h", shotSpeed: "137.8 km/h" },
    careerStats: { gp: 117, g: 24, a: 19, pts: 43, plusMinus: 4, pim: 30, ppg: 1, gwg: 2, shots: 167, shPct: "14.4%", toi: "13:27", fowPct: "45.7%", hits: 37, blocks: 82, takeaways: 17 }
  },

  // --- TRIO 4 ---
  {
    id: 8484403, name: "Florian Xhekaj", number: 63, pos: "AG", posGroup: "ATT", unit: "Trio 4", unitGroup: "ATT",
    specialTeams: ["Aucune"],
    birthDate: "2004-06-27", shoots: "G", country: "CAN", height: "6'3\"", weight: 195, hometown: "Hamilton, ON",
    note: "Frère cadet d'Arber, repêché au 4e tour en 2023 pour son jeu physique",
    stats: { gp: 10, g: 1, a: 2, pts: 3, plusMinus: -1, pim: 15, ppg: 0, gwg: 0, shots: 11, shPct: "9.1%", toi: "7:50", fowPct: "20.0%", hits: 31, blocks: 5, takeaways: 0, skatingSpeed: "34.6 km/h", shotSpeed: "131.7 km/h" },
    careerStats: { gp: 15, g: 1, a: 3, pts: 4, plusMinus: -2, pim: 22, ppg: 0, gwg: 0, shots: 15, shPct: "6.7%", toi: "8:25", fowPct: "20.0%", hits: 40, blocks: 9, takeaways: 0 }
  },
  {
    id: 8478133, name: "Jake Evans", number: 71, pos: "C", posGroup: "ATT", unit: "Trio 4", unitGroup: "ATT",
    specialTeams: ["IN 1"],
    birthDate: "1996-06-02", shoots: "D", country: "CAN", height: "6'0\"", weight: 190, hometown: "Toronto, ON",
    note: "Choix de 7e tour en 2014, spécialiste du désavantage numérique et des mises au jeu",
    stats: { gp: 24, g: 4, a: 6, pts: 10, plusMinus: 5, pim: 2, ppg: 0, gwg: 3, shots: 21, shPct: "19.0%", toi: "15:54", fowPct: "55.0%", hits: 16, blocks: 12, takeaways: 12, skatingSpeed: "35.8 km/h", shotSpeed: "127.2 km/h" },
    careerStats: { gp: 442, g: 56, a: 106, pts: 162, plusMinus: -10, pim: 143, ppg: 1, gwg: 11, shots: 505, shPct: "11.1%", toi: "14:57", fowPct: "52.5%", hits: 525, blocks: 296, takeaways: 144 }
  },
  {
    id: 8483424, name: "Owen Beck", number: 62, pos: "AD", posGroup: "ATT", unit: "Trio 4", unitGroup: "ATT",
    specialTeams: ["Aucune"],
    birthDate: "2004-02-03", shoots: "D", country: "CAN", height: "6'0\"", weight: 199, hometown: "Port Hope, ON",
    note: "Choix de 2e tour en 2022, centre efficace aux mises au jeu et rarement hors position",
    stats: { gp: 10, g: 2, a: 2, pts: 4, plusMinus: 1, pim: 7, ppg: 0, gwg: 0, shots: 7, shPct: "28.6%", toi: "8:49", fowPct: "50.0%", hits: 23, blocks: 8, takeaways: 2, skatingSpeed: "36.6 km/h", shotSpeed: "138.0 km/h" },
    careerStats: { gp: 38, g: 3, a: 3, pts: 6, plusMinus: 2, pim: 13, ppg: 0, gwg: 0, shots: 28, shPct: "10.7%", toi: "9:21", fowPct: "55.8%", hits: 70, blocks: 25, takeaways: 5 }
  },
  {
    id: 8476981, name: "Josh Anderson", number: 17, pos: "AD", posGroup: "ATT", unit: "Hors alignement", unitGroup: "ATT",
    specialTeams: ["Aucune"],
    birthDate: "1994-05-07", shoots: "D", country: "CAN", height: "6'3\"", weight: 226, hometown: "Burlington, ON",
    note: "Ailier droit massif et rapide en ligne droite, souvent utilisé pour brasser la cage",
    stats: { gp: 19, g: 8, a: 4, pts: 12, plusMinus: 6, pim: 22, ppg: 0, gwg: 1, shots: 35, shPct: "22.9%", toi: "14:05", fowPct: "33.3%", hits: 42, blocks: 8, takeaways: 3, skatingSpeed: "36.8 km/h", shotSpeed: "138.0 km/h" },
    careerStats: { gp: 707, g: 168, a: 117, pts: 285, plusMinus: -34, pim: 663, ppg: 11, gwg: 27, shots: 1435, shPct: "11.7%", toi: "15:29", fowPct: "46.1%", hits: 1549, blocks: 362, takeaways: 257 }
  },
  {
    id: 8475184, name: "Chris Kreider", number: 22, pos: "AG", posGroup: "ATT", unit: "Hors alignement", unitGroup: "ATT",
    outStatus: "Blessé",
    specialTeams: ["Aucune"],
    birthDate: "1991-04-30", shoots: "G", country: "USA", height: "6'3\"", weight: 232, hometown: "Boxford, MA",
    note: "Vétéran de près de 1000 matchs signé en septembre 2026, reconnu pour ses déviations devant le filet",
    stats: { gp: 19, g: 3, a: 6, pts: 9, plusMinus: 4, pim: 6, ppg: 0, gwg: 1, shots: 22, shPct: "13.6%", toi: "13:21", fowPct: "33.3%", hits: 21, blocks: 8, takeaways: 2, skatingSpeed: "35.4 km/h", shotSpeed: "138.4 km/h" },
    careerStats: { gp: 977, g: 351, a: 290, pts: 641, plusMinus: 121, pim: 615, ppg: 124, gwg: 54, shots: 2321, shPct: "15.1%", toi: "16:52", fowPct: "42.2%", hits: 1683, blocks: 391, takeaways: 285 }
  },

  // --- DÉFENSEURS (PAIRES 1 À 3) ---
  {
    id: 8482087, name: "Kaiden Guhle", number: 21, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "DEF",
    specialTeams: ["IN 1"],
    birthDate: "2002-01-18", shoots: "G", country: "CAN", height: "6'3\"", weight: 202, hometown: "Edmonton, AB",
    note: "16e choix en 2020, défenseur robuste chargé de neutraliser les meilleurs trios adverses",
    stats: { gp: 20, g: 2, a: 4, pts: 6, plusMinus: 3, pim: 19, ppg: 0, gwg: 1, shots: 23, shPct: "8.7%", toi: "22:26", fowPct: "—", hits: 46, blocks: 37, takeaways: 11, skatingSpeed: "36.5 km/h", shotSpeed: "149.0 km/h" },
    careerStats: { gp: 228, g: 20, a: 55, pts: 75, plusMinus: -13, pim: 190, ppg: 0, gwg: 5, shots: 277, shPct: "7.2%", toi: "20:46", fowPct: "—", hits: 436, blocks: 479, takeaways: 94 }
  },
  {
    id: 8480865, name: "Noah Dobson", number: 53, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "DEF",
    specialTeams: ["SN 2", "IN 2"],
    birthDate: "2000-01-07", shoots: "D", country: "CAN", height: "6'4\"", weight: 200, hometown: "Summerside, PE",
    note: "Défenseur droitier de 6'4\" arrivé des Islanders en 2025, capable d'avaler de grosses minutes",
    stats: { gp: 24, g: 0, a: 9, pts: 9, plusMinus: -6, pim: 16, ppg: 0, gwg: 0, shots: 47, shPct: "0.0%", toi: "21:02", fowPct: "—", hits: 25, blocks: 31, takeaways: 9, skatingSpeed: "35.3 km/h", shotSpeed: "147.0 km/h" },
    careerStats: { gp: 492, g: 62, a: 224, pts: 286, plusMinus: -4, pim: 168, ppg: 12, gwg: 12, shots: 1077, shPct: "5.8%", toi: "21:09", fowPct: "—", hits: 431, blocks: 873, takeaways: 200 }
  },
  {
    id: 8483457, name: "Lane Hutson", number: 48, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "DEF",
    specialTeams: ["SN 1"],
    birthDate: "2004-02-14", shoots: "G", country: "USA", height: "5'9\"", weight: 162, hometown: "Holland, MI",
    note: "Gagnant du trophée Calder en 2025, défenseur créatif qui dicte le jeu de la ligne bleue",
    stats: { gp: 24, g: 5, a: 19, pts: 24, plusMinus: 6, pim: 12, ppg: 1, gwg: 1, shots: 47, shPct: "10.6%", toi: "25:26", fowPct: "—", hits: 8, blocks: 35, takeaways: 10, skatingSpeed: "35.8 km/h", shotSpeed: "148.9 km/h" },
    careerStats: { gp: 190, g: 23, a: 147, pts: 170, plusMinus: 38, pim: 80, ppg: 4, gwg: 4, shots: 265, shPct: "8.7%", toi: "23:31", fowPct: "—", hits: 80, blocks: 295, takeaways: 112 }
  },
  {
    id: 8478851, name: "Alexandre Carrier", number: 45, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "DEF",
    specialTeams: ["IN 1"],
    birthDate: "1996-10-08", shoots: "D", country: "CAN", height: "5'11\"", weight: 174, hometown: "Québec, QC",
    note: "Défenseur droitier de Québec acquis de Nashville, calme en relance et généreux sur les tirs bloqués",
    stats: { gp: 24, g: 1, a: 6, pts: 7, plusMinus: 4, pim: 14, ppg: 0, gwg: 1, shots: 17, shPct: "5.9%", toi: "20:37", fowPct: "—", hits: 23, blocks: 47, takeaways: 6, skatingSpeed: "34.0 km/h", shotSpeed: "134.9 km/h" },
    careerStats: { gp: 393, g: 21, a: 95, pts: 116, plusMinus: 35, pim: 219, ppg: 1, gwg: 4, shots: 411, shPct: "5.1%", toi: "19:36", fowPct: "—", hits: 370, blocks: 731, takeaways: 123 }
  },
  {
    id: 8476875, name: "Mike Matheson", number: 8, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "DEF",
    specialTeams: ["Aucune"],
    birthDate: "1994-02-27", shoots: "G", country: "CAN", height: "6'2\"", weight: 196, hometown: "Pointe-Claire, QC",
    note: "Vétéran de Pointe-Claire au patin fluide, utilisé dans toutes les situations",
    stats: { gp: 9, g: 1, a: 4, pts: 5, plusMinus: 4, pim: 6, ppg: 0, gwg: 0, shots: 16, shPct: "6.3%", toi: "23:28", fowPct: "—", hits: 5, blocks: 16, takeaways: 3, skatingSpeed: "35.9 km/h", shotSpeed: "151.2 km/h" },
    careerStats: { gp: 714, g: 82, a: 225, pts: 307, plusMinus: -19, pim: 400, ppg: 8, gwg: 17, shots: 1401, shPct: "5.9%", toi: "22:08", fowPct: "50.0%", hits: 606, blocks: 1162, takeaways: 448 }
  },
  {
    id: 8482964, name: "Arber Xhekaj", number: 72, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "DEF",
    specialTeams: ["IN 2"],
    birthDate: "2001-01-30", shoots: "G", country: "CAN", height: "6'4\"", weight: 240, hometown: "Hamilton, ON",
    note: "Surnommé le Shérif, défenseur non repêché connu pour sa robustesse et son lancer frappé",
    stats: { gp: 23, g: 1, a: 4, pts: 5, plusMinus: 3, pim: 34, ppg: 0, gwg: 0, shots: 20, shPct: "5.0%", toi: "12:25", fowPct: "—", hits: 52, blocks: 16, takeaways: 2, skatingSpeed: "35.7 km/h", shotSpeed: "160.0 km/h" },
    careerStats: { gp: 253, g: 11, a: 27, pts: 38, plusMinus: -21, pim: 450, ppg: 2, gwg: 0, shots: 265, shPct: "4.2%", toi: "13:57", fowPct: "—", hits: 694, blocks: 217, takeaways: 38 }
  },
  {
    id: 8483686, name: "Adam Engström", number: 42, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "DEF",
    specialTeams: ["Aucune"],
    birthDate: "2003-11-17", shoots: "G", country: "SWE", height: "6'2\"", weight: 193, hometown: "Järna, SWE",
    note: "Défenseur suédois repêché au 3e tour en 2022, bon patineur propre dans ses sorties de zone",
    stats: { gp: 16, g: 1, a: 1, pts: 2, plusMinus: 6, pim: 2, ppg: 0, gwg: 0, shots: 14, shPct: "7.1%", toi: "11:26", fowPct: "—", hits: 3, blocks: 8, takeaways: 1, skatingSpeed: "34.8 km/h", shotSpeed: "136.0 km/h" },
    careerStats: { gp: 31, g: 1, a: 2, pts: 3, plusMinus: 8, pim: 10, ppg: 0, gwg: 0, shots: 25, shPct: "4.0%", toi: "12:13", fowPct: "—", hits: 10, blocks: 16, takeaways: 3 }
  },

  // --- GARDIENS ---
  {
    id: 8484170, name: "Jacob Fowler", number: 32, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "GAR",
    specialTeams: ["Aucune"],
    birthDate: "2004-11-24", shoots: "G", country: "USA", height: "6'1\"", weight: 223, hometown: "Melbourne, FL",
    note: "Choix de 3e tour en 2023 issu de Boston College, gardien posé qui s'impose devant le filet",
    stats: { gp: 15, gs: 15, w: 10, l: 3, otl: 2, gaa: "2.31", svPct: ".918", so: 2, saves: 390, shotsAgainst: 425 },
    careerStats: { gp: 32, gs: 32, w: 19, l: 9, otl: 4, gaa: "2.38", svPct: ".913", so: 3, saves: 797, shotsAgainst: 873 }
  },
  {
    id: 8482487, name: "Jakub Dobeš", number: 75, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "GAR",
    specialTeams: ["Aucune"],
    birthDate: "2001-05-27", shoots: "G", country: "CZE", height: "6'4\"", weight: 215, hometown: "Ostrava, CZE",
    note: "Gardien tchèque de 6'4\" repêché au 5e tour en 2020, imposant devant son filet",
    stats: { gp: 9, gs: 9, w: 4, l: 3, otl: 2, gaa: "3.60", svPct: ".864", so: 0, saves: 204, shotsAgainst: 236 },
    careerStats: { gp: 68, gs: 66, w: 40, l: 17, otl: 9, gaa: "2.88", svPct: ".899", so: 1, saves: 1674, shotsAgainst: 1863 }
  }
];

const MAX_ATTEMPTS = 8;
const DAILY_STORAGE_KEY = "habsle_daily_state_v2";
const DAILY_REMIX_STORAGE_KEY = "habsle_daily_remix_state_v2";
const DAILY_EXPERT_STORAGE_KEY = "habsle_daily_expert_state_v1";
const DAILY_IMAGE_STORAGE_KEY = "habsle_daily_image_state_v1";
const CUSTOM_PREFS_STORAGE_KEY = "habsle_custom_prefs_v1";
const NHL_CACHE_KEY = "habsle_nhl_api_cache_v3";
const RECORDS_STORAGE_KEY = "habsle_records_v1";

const SPEEDRUN_TARGETS = {
  classic: 5,
  remix: 3,
  expert: 3,
  image: 10
};

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
  "height",
  "weight",
  "gp",
  "g",
  "a",
  "pts",
  "plusMinus",
  "pim",
  "shots",
  "toi",
  "hits",
  "blocks",
  "takeaways"
];

// Ordre constant d'affichage des colonnes d'indices :
// i. Standard (avec Unités spéciales juste après Unité)
// ii. Autres infos permanentes (origine, taille, poids)
// iii. Autres statistiques (ordre du mode Étude)
const COLUMN_DISPLAY_ORDER = [
  "number",
  "pos",
  "unit",
  "specialTeams",
  "shoots",
  "age",
  "country",
  "height",
  "weight",
  "gp",
  "g",
  "a",
  "pts",
  "plusMinus",
  "pim",
  "shots",
  "toi",
  "hits",
  "blocks",
  "takeaways"
];

const ALL_AVAILABLE_COLUMNS = [...COLUMN_DISPLAY_ORDER];

function sortColumnsInCanonicalOrder(columns) {
  return [...columns].sort((a, b) => {
    const idxA = COLUMN_DISPLAY_ORDER.indexOf(a);
    const idxB = COLUMN_DISPLAY_ORDER.indexOf(b);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });
}

function calculateAgeFromBirthDate(birthDateStr) {
  if (!birthDateStr || typeof birthDateStr !== "string") return null;
  const match = birthDateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  let birthYear, birthMonth, birthDay;

  if (match) {
    birthYear = parseInt(match[1], 10);
    birthMonth = parseInt(match[2], 10);
    birthDay = parseInt(match[3], 10);
  } else {
    const birth = new Date(birthDateStr);
    if (isNaN(birth.getTime())) return null;
    birthYear = birth.getFullYear();
    birthMonth = birth.getMonth() + 1;
    birthDay = birth.getDate();
  }

  const today = new Date();
  let age = today.getFullYear() - birthYear;
  const currentMonth = today.getMonth() + 1;
  if (currentMonth < birthMonth || (currentMonth === birthMonth && today.getDate() < birthDay)) {
    age--;
  }
  return age;
}

function getPlayerAge(player) {
  if (!player) return null;
  const computed = calculateAgeFromBirthDate(player.birthDate);
  if (typeof computed === "number") return computed;
  return typeof player._fallbackAge === "number" ? player._fallbackAge : null;
}

function attachDynamicAge(player, fallbackAge = "—") {
  if (!player) return player;
  if (typeof fallbackAge === "number") {
    player._fallbackAge = fallbackAge;
  }
  Object.defineProperty(player, "age", {
    enumerable: true,
    configurable: true,
    get() {
      const computed = getPlayerAge(this);
      return computed !== null ? computed : fallbackAge;
    }
  });
  return player;
}

// Identifiants des joueurs de base éligibles aux défis et parties
const CORE_PLAYER_IDS = new Set(PLAYERS.map(p => p.id));
PLAYERS.forEach(p => {
  p.isPlayable = true;
  attachDynamicAge(p);
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
  nhlRealtime: { ok: false, detail: "En attente de synchronisation" },
  nhlEdge: { ok: false, detail: "En attente de synchronisation" },
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
      const status = player.unit === secret.unit
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
      const gAge = getPlayerAge(player);
      const sAge = getPlayerAge(secret);
      return compareNumericClue(
        gAge,
        sAge,
        2,
        gAge !== null ? `${gAge} ans` : "—",
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
  },
  hits: {
    label: "Mises en éch.",
    fullName: "Mises en échec",
    interval: "(±5)",
    isStat: true,
    evaluate(player, secret) {
      const gIsGoalie = player.posGroup === "GAR";
      const sIsGoalie = secret.posGroup === "GAR";
      if (gIsGoalie || sIsGoalie) {
        const gVal = gIsGoalie ? null : (typeof player.stats?.hits === "number" ? player.stats.hits : null);
        return {
          text: gVal === null ? "—" : `${gVal}`,
          status: gIsGoalie && sIsGoalie ? "exact" : "wrong",
          sub: ""
        };
      }
      const gVal = typeof player.stats?.hits === "number" ? player.stats.hits : null;
      const sVal = typeof secret.stats?.hits === "number" ? secret.stats.hits : null;
      return compareNumericClue(gVal, sVal, 5, gVal === null ? "—" : `${gVal}`);
    }
  },
  blocks: {
    label: "Tirs bloqués",
    fullName: "Tirs bloqués",
    interval: "(±4)",
    isStat: true,
    evaluate(player, secret) {
      const gIsGoalie = player.posGroup === "GAR";
      const sIsGoalie = secret.posGroup === "GAR";
      if (gIsGoalie || sIsGoalie) {
        const gVal = gIsGoalie ? null : (typeof player.stats?.blocks === "number" ? player.stats.blocks : null);
        return {
          text: gVal === null ? "—" : `${gVal}`,
          status: gIsGoalie && sIsGoalie ? "exact" : "wrong",
          sub: ""
        };
      }
      const gVal = typeof player.stats?.blocks === "number" ? player.stats.blocks : null;
      const sVal = typeof secret.stats?.blocks === "number" ? secret.stats.blocks : null;
      return compareNumericClue(gVal, sVal, 4, gVal === null ? "—" : `${gVal}`);
    }
  },
  takeaways: {
    label: "Revirements",
    fullName: "Revirements",
    interval: "(±2)",
    isStat: true,
    evaluate(player, secret) {
      const gIsGoalie = player.posGroup === "GAR";
      const sIsGoalie = secret.posGroup === "GAR";
      if (gIsGoalie || sIsGoalie) {
        const gVal = gIsGoalie ? null : (typeof player.stats?.takeaways === "number" ? player.stats.takeaways : null);
        return {
          text: gVal === null ? "—" : `${gVal}`,
          status: gIsGoalie && sIsGoalie ? "exact" : "wrong",
          sub: ""
        };
      }
      const gVal = typeof player.stats?.takeaways === "number" ? player.stats.takeaways : null;
      const sVal = typeof secret.stats?.takeaways === "number" ? secret.stats.takeaways : null;
      return compareNumericClue(gVal, sVal, 2, gVal === null ? "—" : `${gVal}`);
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

function formatSpeedKmh(val) {
  return typeof val === "number" && Number.isFinite(val) && val > 0
    ? `${val.toFixed(1)} km/h`
    : "—";
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
  return {
    gp: 0, g: 0, a: 0, pts: 0, plusMinus: 0, pim: 0, ppg: 0, shots: 0,
    shPct: "0.0%", toi: "—", fowPct: "—",
    hits: null, blocks: null, takeaways: null,
    skatingSpeed: "—", shotSpeed: "—"
  };
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

  return attachDynamicAge(
    {
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
      birthDate: rosterEntry?.birthDate || dfInfo.birthDate || null,
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
    },
    dfInfo.age ?? "—"
  );
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
      shots: reg.shots ?? 0,
      shPct: typeof reg.shootingPctg === "number" ? `${(reg.shootingPctg * 100).toFixed(1)}%` : "0.0%",
      toi: reg.avgToi || "—",
      fowPct: typeof reg.faceoffWinningPctg === "number" && reg.faceoffWinningPctg > 0
        ? `${(reg.faceoffWinningPctg * 100).toFixed(1)}%`
        : "—",
      hits: player.careerStats?.hits ?? null,
      blocks: player.careerStats?.blocks ?? null,
      takeaways: player.careerStats?.takeaways ?? null
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

function applyNHLAPIData(
  rosterData,
  statsData,
  careerData = null,
  linesData = null,
  metaData = null,
  realtimeData = null,
  edgeData = null
) {
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
      player.birthDate = entry.birthDate;
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
          shots: s.shots ?? 0,
          shPct: typeof s.shootingPctg === "number" ? `${(s.shootingPctg * 100).toFixed(1)}%` : "0.0%",
          toi: formatSecondsToMMSS(s.avgTimeOnIcePerGame),
          fowPct: typeof s.faceoffWinPctg === "number" && s.faceoffWinPctg > 0
            ? `${(s.faceoffWinPctg * 100).toFixed(1)}%`
            : "—",
          hits: null,
          blocks: null,
          takeaways: null,
          skatingSpeed: "—",
          shotSpeed: "—"
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

  // 3b. Statistiques temps réel (mises en échec, tirs bloqués, revirements)
  const rtSeasonMap = realtimeData?.season && typeof realtimeData.season === "object" ? realtimeData.season : null;
  const rtCareerMap = realtimeData?.career && typeof realtimeData.career === "object" ? realtimeData.career : null;
  const rtSeasonCount = rtSeasonMap ? Object.keys(rtSeasonMap).length : 0;

  if (rtSeasonMap || rtCareerMap) {
    PLAYERS.forEach(player => {
      if (player.posGroup === "GAR") return;
      const key = String(player.id);

      if (rtSeasonMap) {
        const rt = rtSeasonMap[key] || rtSeasonMap[player.id];
        if (rt) {
          player.stats.hits = rt.hits ?? 0;
          player.stats.blocks = rt.blockedShots ?? 0;
          player.stats.takeaways = rt.takeaways ?? 0;
        } else if (rtSeasonCount > 0 && (player.stats?.gp ?? 0) === 0) {
          player.stats.hits = 0;
          player.stats.blocks = 0;
          player.stats.takeaways = 0;
        }
      }

      if (rtCareerMap) {
        const rtc = rtCareerMap[key] || rtCareerMap[player.id];
        if (rtc) {
          player.careerStats.hits = rtc.hits ?? 0;
          player.careerStats.blocks = rtc.blockedShots ?? 0;
          player.careerStats.takeaways = rtc.takeaways ?? 0;
        }
      }
    });
  }

  // 3c. Vitesses NHL EDGE (patinage et tir)
  let edgeCount = 0;
  if (edgeData && typeof edgeData === "object") {
    edgeCount = Object.keys(edgeData).length;
    PLAYERS.forEach(player => {
      if (player.posGroup === "GAR") return;
      const edge = edgeData[String(player.id)] || edgeData[player.id];
      if (!edge) return;
      player.stats.skatingSpeed = formatSpeedKmh(edge.skatingSpeedKmh);
      player.stats.shotSpeed = formatSpeedKmh(edge.shotSpeedKmh);
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
    if (sv.nhlRealtime) SERVICE_STATUS.nhlRealtime = sv.nhlRealtime;
    if (sv.nhlEdge) SERVICE_STATUS.nhlEdge = sv.nhlEdge;
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
    SERVICE_STATUS.nhlRealtime = {
      ok: rtSeasonCount > 0,
      detail: rtSeasonCount > 0 ? `Opérationnel (${rtSeasonCount} fiches temps réel)` : "Non disponible"
    };
    SERVICE_STATUS.nhlEdge = {
      ok: edgeCount > 0,
      detail: edgeCount > 0 ? `Opérationnel (${edgeCount} fiches EDGE)` : "Non disponible"
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
  let cached = null;
  if (!forceRefresh) {
    try {
      const parsed = JSON.parse(localStorage.getItem(NHL_CACHE_KEY) || "null");
      if (parsed && Date.now() - parsed.timestamp < 6 * 3600 * 1000) {
        cached = parsed;
      }
    } catch (e) {}
  }

  let localData = null;
  try {
    const localResp = await fetch("./nhl-data.json", { cache: "no-store" });
    if (localResp.ok) {
      localData = await localResp.json();
    }
  } catch (e) {}

  const cachedTime = cached?.meta?.updatedAt ? (Date.parse(cached.meta.updatedAt) || 0) : 0;
  const localTime = localData?.meta?.updatedAt ? (Date.parse(localData.meta.updatedAt) || 0) : 0;

  if (cached && (!localData || cachedTime > localTime)) {
    SERVICE_STATUS.source = "Cache navigateur (localStorage)";
    applyNHLAPIData(
      cached.roster, cached.stats, cached.career, cached.lines,
      cached.meta, cached.realtime, cached.edge
    );
    if (typeof renderStudyDirectory === "function" && currentView === "study") {
      renderStudyDirectory(document.getElementById("study-search-input")?.value || "");
    }
    return;
  }

  if (localData) {
    SERVICE_STATUS.source = "nhl-data.json (GitHub Actions)";
    applyNHLAPIData(
      localData.roster, localData.stats, localData.career, localData.lines,
      localData.meta, localData.realtime, localData.edge
    );
    if (typeof renderStudyDirectory === "function" && currentView === "study") {
      renderStudyDirectory(document.getElementById("study-search-input")?.value || "");
    }
    return;
  }

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

    if (typeof renderStudyDirectory === "function" && currentView === "study") {
      renderStudyDirectory(document.getElementById("study-search-input")?.value || "");
    }
  } else {
    SERVICE_STATUS.source = "Données locales de secours (data.js)";
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
  let latestSha = GITHUB_BRANCH;

  try {
    const commitsUrl =
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}` +
      `/commits?sha=${GITHUB_BRANCH}&path=nhl-data.json&per_page=1`;

    const commitsResp = await fetch(commitsUrl, {
      headers: buildGitHubHeaders(token),
      cache: "no-store"
    });

    if (commitsResp.ok) {
      const commits = await commitsResp.json();
      if (Array.isArray(commits) && commits[0]?.sha) {
        latestSha = commits[0].sha;
      }
    }
  } catch (e) {}

  const cacheBuster = latestSha === GITHUB_BRANCH ? `?t=${Date.now()}` : "";
  const rawUrl = `https://raw.githubusercontent.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/${latestSha}/nhl-data.json${cacheBuster}`;
  const rawResp = await fetch(rawUrl, { cache: "no-store" });
  if (!rawResp.ok) {
    throw new Error(`Impossible de télécharger nhl-data.json (HTTP ${rawResp.status})`);
  }

  const freshData = await rawResp.json();
  const shaLabel = latestSha === GITHUB_BRANCH ? "main" : latestSha.slice(0, 7);
  SERVICE_STATUS.source = `nhl-data.json (GitHub Raw • ${shaLabel})`;

  applyNHLAPIData(
    freshData.roster,
    freshData.stats,
    freshData.career,
    freshData.lines,
    freshData.meta,
    freshData.realtime,
    freshData.edge
  );

  try {
    localStorage.setItem(
      NHL_CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        roster: freshData.roster,
        stats: freshData.stats,
        career: freshData.career,
        lines: freshData.lines,
        meta: freshData.meta,
        realtime: freshData.realtime,
        edge: freshData.edge
      })
    );
  } catch (e) {}  

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