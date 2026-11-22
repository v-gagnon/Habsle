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
  return sortColumnsInCanonicalOrder([...keptBase, ...pickedStats]);
}

function generateExpertColumns(rng = Math.random) {
  const normalCount = Math.floor(rng() * 2);
  const statCount = 5 - normalCount;
  const keptBase = shuffleArray(CLASSIC_COLUMNS, rng).slice(0, normalCount);
  const pickedStats = shuffleArray(STAT_POOL_COLUMNS, rng).slice(0, statCount);
  return sortColumnsInCanonicalOrder([...keptBase, ...pickedStats]);
}

function pickRandomPlayablePlayer(excludeId = null) {
  const pool = getPlayablePlayers();
  if (pool.length <= 1 || excludeId === null) {
    return pool[Math.floor(Math.random() * pool.length)];
  }
  const filtered = pool.filter(p => p.id !== excludeId);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// --- PALIERS DU MODE SURVIE ---
function getSurvivalMaxAttempts(variant, roundNumber) {
  const r = Math.max(1, roundNumber);

  if (variant === "image") {
    if (r <= 2) return 6;
    if (r <= 5) return 5;
    if (r <= 12) return 4;
    if (r <= 30) return 3;
    return 2;
  }

  if (variant === "remix") {
    if (r <= 1) return 8;
    if (r <= 3) return 7;
    if (r <= 5) return 6;
    if (r <= 10) return 5;
    if (r <= 20) return 4;
    if (r <= 40) return 3;
    return 2;
  }

  if (variant === "expert") {
    if (r <= 2) return 8;
    if (r <= 5) return 7;
    if (r <= 10) return 6;
    if (r <= 25) return 5;
    if (r <= 40) return 4;
    return 3;
  }

  // Standard (classic)
  if (r <= 1) return 8;
  if (r <= 3) return 7;
  if (r <= 5) return 6;
  if (r <= 8) return 5;
  if (r <= 12) return 4;
  if (r <= 25) return 3;
  return 2;
}

function formatSpeedrunTime(ms) {
  const totalTenths = Math.floor(Math.max(0, ms) / 100);
  const tenths = totalTenths % 10;
  const totalSecs = Math.floor(totalTenths / 10);
  const secs = totalSecs % 60;
  const mins = Math.floor(totalSecs / 60);
  return `${mins}:${String(secs).padStart(2, "0")}.${tenths}`;
}

// --- RECORDS (LOCALSTORAGE) ---
function createEmptyRecords() {
  return {
    survival: { classic: null, remix: null, expert: null, image: null },
    speedrun: { classic: null, remix: null, expert: null, image: null }
  };
}

function loadRecords() {
  const base = createEmptyRecords();
  try {
    const raw = localStorage.getItem(RECORDS_STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    ["survival", "speedrun"].forEach(mode => {
      if (parsed && parsed[mode] && typeof parsed[mode] === "object") {
        ["classic", "remix", "expert", "image"].forEach(v => {
          const val = parsed[mode][v];
          if (typeof val === "number" && Number.isFinite(val)) {
            base[mode][v] = val;
          }
        });
      }
    });
  } catch (e) {}
  return base;
}

let modeRecords = loadRecords();

function saveRecords() {
  try {
    localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(modeRecords));
  } catch (e) {}
}

function getRecord(mode, variant) {
  return modeRecords[mode]?.[variant] ?? null;
}

function updateRecordIfBetter(mode, variant, value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return false;
  const currentBest = getRecord(mode, variant);

  if (mode === "survival") {
    if (value <= 0) return false;
    if (currentBest === null || value > currentBest) {
      modeRecords.survival[variant] = value;
      saveRecords();
      return true;
    }
    return false;
  }

  if (mode === "speedrun") {
    if (currentBest === null || value < currentBest) {
      modeRecords.speedrun[variant] = value;
      saveRecords();
      return true;
    }
    return false;
  }

  return false;
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
        if (valid.length >= 1) customSelectedColumns = sortColumnsInCanonicalOrder(valid);
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

let practiceImageRounds = 6;
let pendingImageRounds = 6;

let currentView = "menu"; // "menu" | "daily" | "dailyRemix" | "dailyExpert" | "dailyImage" | "practice" | "custom" | "study" | "survival" | "speedrun"
let activeGameMode = "daily"; // "daily" | "dailyRemix" | "dailyExpert" | "dailyImage" | "practice" | "custom" | "survival" | "speedrun"

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
  },
  survival: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    variant: "classic", // "classic" | "remix" | "expert" | "image"
    hideArrows: false,
    columns: [...CLASSIC_COLUMNS],
    roundNumber: 1,
    score: 0,
    maxAttempts: MAX_ATTEMPTS,
    runOver: false,
    endedManually: false,
    isNewRecord: false,
    previousRecord: null
  },
  speedrun: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null,
    variant: "classic", // "classic" | "remix" | "expert" | "image"
    hideArrows: false,
    columns: [...CLASSIC_COLUMNS],
    roundNumber: 1,
    score: 0,
    targetScore: 5,
    startTime: null,
    elapsedMs: 0,
    runOver: false,
    isNewRecord: false,
    previousRecord: null
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

function isChallengeMode(modeKey) {
  return modeKey === "survival" || modeKey === "speedrun";
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
  const pool = getPlayablePlayers();
  let hash = 2166136261;
  for (let i = 0; i < dateKey.length; i++) {
    hash ^= dateKey.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const index = Math.abs(hash) % pool.length;
  return pool[index];
}

function getDailyRemixSetupForDate(dateKey) {
  const rng = createSeededRNG(`${dateKey}-habsle-remix-v2`);
  const classicPlayer = getDailyPlayerForDate(dateKey);
  const candidates = getPlayablePlayers().filter(p => p.id !== classicPlayer.id);
  const secretPlayer = candidates[Math.floor(rng() * candidates.length)];
  const columns = generateRemixedColumns(rng);
  return { secretPlayer, columns };
}

function getDailyExpertSetupForDate(dateKey) {
  const rng = createSeededRNG(`${dateKey}-habsle-expert-v1`);
  const classicPlayer = getDailyPlayerForDate(dateKey);
  const remixSetup = getDailyRemixSetupForDate(dateKey);
  const candidates = getPlayablePlayers().filter(
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
  const candidates = getPlayablePlayers().filter(p => !excludedIds.has(p.id));
  return candidates[Math.floor(rng() * candidates.length)];
}

function getStorageKeyForDailyMode(modeKey) {
  if (modeKey === "dailyRemix") return DAILY_REMIX_STORAGE_KEY;
  if (modeKey === "dailyExpert") return DAILY_EXPERT_STORAGE_KEY;
  if (modeKey === "dailyImage") return DAILY_IMAGE_STORAGE_KEY;
  return DAILY_STORAGE_KEY;
}

function isDailyModeCompletedToday(modeKey) {
  const todayKey = getTodayKey();
  const session = sessions[modeKey];
  if (session && session.dateKey === todayKey && session.gameOver) {
    return true;
  }
  try {
    const raw = localStorage.getItem(getStorageKeyForDailyMode(modeKey));
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed.dateKey === todayKey && Boolean(parsed.gameOver);
  } catch (e) {
    return false;
  }
}

function saveDailySession(modeKey) {
  const session = sessions[modeKey];
  const storageKey = getStorageKeyForDailyMode(modeKey);
  const todayKey = getTodayKey();
  session.dateKey = todayKey;

  const payload = {
    dateKey: todayKey,
    guesses: session.guesses,
    gameOver: session.gameOver,
    endReason: session.endReason
  };
  localStorage.setItem(storageKey, JSON.stringify(payload));
}

function loadDailySession() {
  const todayKey = getTodayKey();
  sessions.daily.dateKey = todayKey;
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
  sessions.dailyRemix.dateKey = todayKey;
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
  const setup = getDailyExpertSetupForDate(todayKey);
  sessions.dailyExpert.dateKey = todayKey;
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
  sessions.dailyImage.dateKey = todayKey;
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