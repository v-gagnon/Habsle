// Générateur pseudo-aléatoire déterministe pour les défis quotidiens
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

function generateRemixedColumns(rng = Math.random) {
  const normalCount = 2 + Math.floor(rng() * 2);
  const statCount = 5 - normalCount;
  const keptBase = shuffleArray(CLASSIC_COLUMNS, rng).slice(0, normalCount);
  const pickedStats = shuffleArray(STAT_POOL_COLUMNS, rng).slice(0, statCount);
  return shuffleArray([...keptBase, ...pickedStats], rng);
}

function generateExpertColumns(rng = Math.random) {
  const normalCount = Math.floor(rng() * 2);
  const statCount = 4 - normalCount;
  const keptBase = shuffleArray(CLASSIC_COLUMNS, rng).slice(0, normalCount);
  const pickedStats = shuffleArray(STAT_POOL_COLUMNS, rng).slice(0, statCount);
  return shuffleArray([...keptBase, ...pickedStats], rng);
}

// Préférences de la Partie Personnalisée
let customSelectedColumns = [...CLASSIC_COLUMNS];
let customShowArrows = true;

function loadCustomPrefs() {
  try {
    const raw = localStorage.getItem(CUSTOM_PREFS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.columns)) {
        const valid = parsed.columns.filter(c => CLUE_DEFINITIONS[c]).slice(0, 6);
        if (valid.length >= 1) customSelectedColumns = valid;
      }
      if (typeof parsed.showArrows === "boolean") {
        customShowArrows = parsed.showArrows;
      }
    }
  } catch (e) {}
}

function saveCustomPrefs() {
  try {
    localStorage.setItem(
      CUSTOM_PREFS_STORAGE_KEY,
      JSON.stringify({ columns: customSelectedColumns, showArrows: customShowArrows })
    );
  } catch (e) {}
}

loadCustomPrefs();

let currentView = "menu"; // "menu" | "daily" | "dailyRemix" | "dailyExpert" | "dailyImage" | "practice" | "custom" | "study"
let activeGameMode = "daily"; // "daily" | "dailyRemix" | "dailyExpert" | "dailyImage" | "practice" | "custom"

const sessions = {
  daily: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    variant: "classic",
    hideArrows: false,
    columns: [...CLASSIC_COLUMNS]
  },
  dailyRemix: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    variant: "remix",
    hideArrows: false,
    columns: []
  },
  dailyExpert: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    variant: "expert",
    hideArrows: true,
    columns: []
  },
  dailyImage: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    variant: "image",
    hideArrows: true,
    columns: []
  },
  practice: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    variant: "classic", // "classic" | "remix" | "expert" | "image"
    hideArrows: false,
    columns: [...CLASSIC_COLUMNS]
  },
  custom: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    variant: "custom",
    hideArrows: !customShowArrows,
    columns: [...customSelectedColumns]
  }
};

function isDailyMode(modeKey) {
  return (
    modeKey === "daily" ||
    modeKey === "dailyRemix" ||
    modeKey === "dailyExpert" ||
    modeKey === "dailyImage"
  );
}

function isImageSession(session) {
  return session && session.variant === "image";
}

function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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
  const rng = createSeededRNG(`${dateKey}-habsle-remix-v2`);
  const classicPlayer = getDailyPlayerForDate(dateKey);
  const candidates = PLAYERS.filter(p => p.id !== classicPlayer.id);
  const secretPlayer = candidates[Math.floor(rng() * candidates.length)];
  const columns = generateRemixedColumns(rng);
  return { secretPlayer, columns };
}

function getDailyExpertSetupForDate(dateKey) {
  const rng = createSeededRNG(`${dateKey}-habsle-expert-v1`);
  const classicPlayer = getDailyPlayerForDate(dateKey);
  const remixSetup = getDailyRemixSetupForDate(dateKey);
  const candidates = PLAYERS.filter(
    p => p.id !== classicPlayer.id && p.id !== remixSetup.secretPlayer.id
  );
  const secretPlayer = candidates[Math.floor(rng() * candidates.length)];
  const columns = generateExpertColumns(rng);
  return { secretPlayer, columns };
}

function getDailyImagePlayerForDate(dateKey) {
  const rng = createSeededRNG(`${dateKey}-habsle-image-v1`);
  const classicPlayer = getDailyPlayerForDate(dateKey);
  const remixSetup = getDailyRemixSetupForDate(dateKey);
  const expertSetup = getDailyExpertSetupForDate(dateKey);
  const excludedIds = new Set([
    classicPlayer.id,
    remixSetup.secretPlayer.id,
    expertSetup.secretPlayer.id
  ]);
  const candidates = PLAYERS.filter(p => !excludedIds.has(p.id));
  return candidates[Math.floor(rng() * candidates.length)];
}

function getStorageKeyForDailyMode(modeKey) {
  if (modeKey === "dailyRemix") return DAILY_REMIX_STORAGE_KEY;
  if (modeKey === "dailyExpert") return DAILY_EXPERT_STORAGE_KEY;
  if (modeKey === "dailyImage") return DAILY_IMAGE_STORAGE_KEY;
  return DAILY_STORAGE_KEY;
}

function saveDailySession(modeKey) {
  const session = sessions[modeKey];
  const storageKey = getStorageKeyForDailyMode(modeKey);

  const payload = {
    dateKey: getTodayKey(),
    guesses: session.guesses,
    gameOver: session.gameOver,
    endReason: session.endReason
  };
  localStorage.setItem(storageKey, JSON.stringify(payload));
}

function loadDailySession() {
  const todayKey = getTodayKey();
  sessions.daily.secretPlayer = getDailyPlayerForDate(todayKey);
  sessions.daily.variant = "classic";
  sessions.daily.hideArrows = false;
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
  sessions.dailyRemix.variant = "remix";
  sessions.dailyRemix.hideArrows = false;
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

function loadDailyExpertSession() {
  const todayKey = getTodayKey();
  const setup = getDailyExpertSetupForDate(dateKey = todayKey);
  sessions.dailyExpert.secretPlayer = setup.secretPlayer;
  sessions.dailyExpert.variant = "expert";
  sessions.dailyExpert.hideArrows = true;
  sessions.dailyExpert.columns = setup.columns;

  try {
    const raw = localStorage.getItem(DAILY_EXPERT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.dateKey === todayKey) {
        sessions.dailyExpert.guesses = Array.isArray(parsed.guesses) ? parsed.guesses : [];
        sessions.dailyExpert.gameOver = Boolean(parsed.gameOver);
        sessions.dailyExpert.endReason = parsed.endReason || null;
        return;
      }
    }
  } catch (e) {}

  sessions.dailyExpert.guesses = [];
  sessions.dailyExpert.gameOver = false;
  sessions.dailyExpert.endReason = null;
}

function loadDailyImageSession() {
  const todayKey = getTodayKey();
  sessions.dailyImage.secretPlayer = getDailyImagePlayerForDate(todayKey);
  sessions.dailyImage.variant = "image";
  sessions.dailyImage.hideArrows = true;
  sessions.dailyImage.columns = [];

  try {
    const raw = localStorage.getItem(DAILY_IMAGE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.dateKey === todayKey) {
        sessions.dailyImage.guesses = Array.isArray(parsed.guesses) ? parsed.guesses : [];
        sessions.dailyImage.gameOver = Boolean(parsed.gameOver);
        sessions.dailyImage.endReason = parsed.endReason || null;
        return;
      }
    }
  } catch (e) {}

  sessions.dailyImage.guesses = [];
  sessions.dailyImage.gameOver = false;
  sessions.dailyImage.endReason = null;
}