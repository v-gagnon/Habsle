// Alignement 2026-2027 des Canadiens de Montréal (Sources : NHL.com & Daily Faceoff, nov. 2026)
const PLAYERS = [
  // --- TRIO 1 ---
  { id: 8480018, name: "Nick Suzuki", number: 14, pos: "C", posGroup: "ATT", unit: "Trio 1", unitGroup: "Trio", age: 27, shoots: "D", country: "CAN", height: "5'11\"", hometown: "London, ON", note: "Capitaine du CH, centre du 1er trio" },
  { id: 8481540, name: "Cole Caufield", number: 13, pos: "AD", posGroup: "ATT", unit: "Trio 1", unitGroup: "Trio", age: 25, shoots: "D", country: "USA", height: "5'8\"", hometown: "Mosinee, WI", note: "Franc-tireur de 1er trio et 1re vague d'avantage numérique" },
  { id: 8483515, name: "Juraj Slafkovský", number: 20, pos: "AG", posGroup: "ATT", unit: "Trio 1", unitGroup: "Trio", age: 22, shoots: "G", country: "SVK", height: "6'3\"", hometown: "Košice, SVK", note: "1er choix au total en 2022, ailier de puissance du 1er trio" },

  // --- TRIO 2 ---
  { id: 8481618, name: "Alex Newhook", number: 15, pos: "AG", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio", age: 25, shoots: "G", country: "CAN", height: "5'11\"", hometown: "St. John's, NL", note: "Attaquant rapide polyvalent (centre / ailier gauche)" },
  { id: 8482775, name: "Oliver Kapanen", number: 91, pos: "C", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio", age: 23, shoots: "D", country: "FIN", height: "6'2\"", hometown: "Timrå, SWE", note: "Centre intelligent repêché au 2e tour en 2021" },
  { id: 8481523, name: "Kirby Dach", number: 77, pos: "AD", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio", age: 25, shoots: "D", country: "CAN", height: "6'4\"", hometown: "Fort Saskatchewan, AB", note: "Attaquant format géant évoluant au centre et à l'aile droite" },
  { id: 8484984, name: "Ivan Demidov", number: 93, pos: "AD", posGroup: "ATT", unit: "Trio 2", unitGroup: "Trio", age: 20, shoots: "G", country: "RUS", height: "6'1\"", hometown: "Sergiyev Posad, RUS", note: "5e choix au total en 2024, ailier créatif électrisant" },

  // --- TRIO 3 ---
  { id: 8482737, name: "Zachary Bolduc", number: 76, pos: "AD", posGroup: "ATT", unit: "Trio 3", unitGroup: "Trio", age: 23, shoots: "G", country: "CAN", height: "6'0\"", hometown: "Trois-Rivières, QC", note: "Ailier québécois acquis de Saint-Louis en juillet 2025" },
  { id: 8476479, name: "Phillip Danault", number: 24, pos: "C", posGroup: "ATT", unit: "Trio 3", unitGroup: "Trio", age: 33, shoots: "G", country: "CAN", height: "6'1\"", hometown: "Victoriaville, QC", note: "Spécialiste défensif et des mises au jeu revenu à Montréal" },
  { id: 8480074, name: "Alexandre Texier", number: 85, pos: "AG", posGroup: "ATT", unit: "Trio 3", unitGroup: "Trio", age: 27, shoots: "G", country: "FRA", height: "6'1\"", hometown: "Saint-Martin-d'Hères, FRA", note: "Attaquant français agile sur le 3e trio" },

  // --- TRIO 4 & ATTAQUANTS DE PROFONDEUR ---
  { id: 8475184, name: "Chris Kreider", number: 22, pos: "AG", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio", age: 35, shoots: "G", country: "USA", height: "6'3\"", hometown: "Boxford, MA", note: "Vétéran expérimenté redoutable devant le filet" },
  { id: 8478133, name: "Jake Evans", number: 71, pos: "C", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio", age: 30, shoots: "D", country: "CAN", height: "6'0\"", hometown: "Toronto, ON", note: "Pilier du désavantage numérique au centre du 4e trio" },
  { id: 8483424, name: "Owen Beck", number: 62, pos: "C", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio", age: 22, shoots: "D", country: "CAN", height: "6'0\"", hometown: "Port Hope, ON", note: "Jeune centre fiable dans les deux sens de la patinoire" },
  { id: 8476981, name: "Josh Anderson", number: 17, pos: "AD", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio", age: 32, shoots: "D", country: "CAN", height: "6'3\"", hometown: "Burlington, ON", note: "Ailier droit robuste et très rapide en transition" },
  { id: 8484403, name: "Florian Xhekaj", number: 63, pos: "AG", posGroup: "ATT", unit: "Trio 4", unitGroup: "Trio", age: 22, shoots: "G", country: "CAN", height: "6'3\"", hometown: "Hamilton, ON", note: "Frère cadet d'Arber, attaquant robuste et énergique" },

  // --- DÉFENSEURS (PAIRES 1 À 3) ---
  { id: 8483457, name: "Lane Hutson", number: 48, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "Paire", age: 22, shoots: "G", country: "USA", height: "5'9\"", hometown: "Holland, MI", note: "Quart-arrière offensif ultra-mobile à la ligne bleue" },
  { id: 8480865, name: "Noah Dobson", number: 53, pos: "D", posGroup: "DEF", unit: "Paire 1", unitGroup: "Paire", age: 26, shoots: "D", country: "CAN", height: "6'4\"", hometown: "Summerside, PE", note: "Défenseur droitier numéro un sur la première paire" },
  { id: 8482087, name: "Kaiden Guhle", number: 21, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "Paire", age: 24, shoots: "G", country: "CAN", height: "6'3\"", hometown: "Edmonton, AB", note: "Défenseur complet affrontant les meilleurs trios adverses" },
  { id: 8478851, name: "Alexandre Carrier", number: 45, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "Paire", age: 30, shoots: "D", country: "CAN", height: "5'11\"", hometown: "Québec, QC", note: "Défenseur droitier québécois fiable en relance" },
  { id: 8476875, name: "Mike Matheson", number: 8, pos: "D", posGroup: "DEF", unit: "Paire 2", unitGroup: "Paire", age: 32, shoots: "G", country: "CAN", height: "6'2\"", hometown: "Pointe-Claire, QC", note: "Vétéran originaire de Pointe-Claire au coup de patin élite" },
  { id: 8482964, name: "Arber Xhekaj", number: 72, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "Paire", age: 25, shoots: "G", country: "CAN", height: "6'4\"", hometown: "Hamilton, ON", note: "Surnommé le Shérif, défenseur physique au tir frappé lourd" },
  { id: 8483686, name: "Adam Engström", number: 42, pos: "D", posGroup: "DEF", unit: "Paire 3", unitGroup: "Paire", age: 22, shoots: "G", country: "SWE", height: "6'2\"", hometown: "Järna, SWE", note: "Défenseur suédois fluide repêché en 2022" },

  // --- GARDIENS ---
  { id: 8484170, name: "Jacob Fowler", number: 32, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "Gardien", age: 21, shoots: "G", country: "USA", height: "6'1\"", hometown: "Melbourne, FL", note: "Jeune gardien calme et technique devant le filet" },
  { id: 8482487, name: "Jakub Dobeš", number: 75, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "Gardien", age: 25, shoots: "G", country: "CZE", height: "6'4\"", hometown: "Ostrava, CZE", note: "Gardien tchèque imposant de 6 pieds 4 pouces" },
  { id: 8478470, name: "Samuel Montembeault", number: 35, pos: "G", posGroup: "GAR", unit: "Gardien", unitGroup: "Gardien", age: 30, shoots: "G", country: "CAN", height: "6'3\"", hometown: "Bécancour, QC", note: "Gardien québécois vétéran devant le filet du Tricolore" }
];

const MAX_ATTEMPTS = 8;
const DAILY_STORAGE_KEY = "habsle_daily_state_v1";
const UNITS_ORDER = ["Trio 1", "Trio 2", "Trio 3", "Trio 4", "Paire 1", "Paire 2", "Paire 3", "Gardien"];

let currentView = "menu"; // "menu" | "daily" | "practice" | "study"
let activeGameMode = "daily"; // "daily" | "practice"

// États séparés pour que le joueur puisse passer du Défi Quotidien à Pratique sans perdre sa partie
const sessions = {
  daily: {
    secretPlayer: null,
    guesses: [], // Liste des IDs essayés dans l'ordre
    gameOver: false,
    endReason: null // "win" | "lose" | "giveup"
  },
  practice: {
    secretPlayer: null,
    guesses: [],
    gameOver: false,
    endReason: null
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
const dailyStatusBadge = document.getElementById("daily-status-badge");

const inputEl = document.getElementById("player-input");
const autocompleteEl = document.getElementById("autocomplete-list");
const guessesContainer = document.getElementById("guesses-container");
const attemptCountEl = document.getElementById("attempt-count");
const studyModeCheckbox = document.getElementById("study-mode");
const resultCard = document.getElementById("result-card");
const giveUpBtn = document.getElementById("give-up-btn");
const newGameBtn = document.getElementById("new-game-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const dailyNextInfo = document.getElementById("daily-next-info");
const dailyCountdownEl = document.getElementById("daily-countdown");

const rosterModal = document.getElementById("roster-modal");
const rosterListContent = document.getElementById("roster-list-content");
const studyDirectoryContent = document.getElementById("study-directory-content");
const studySearchInput = document.getElementById("study-search-input");

// --- OUTILS DATE & SÉLECTION DU JOUEUR DU JOUR ---
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
  // Hachage déterministe basé sur la chaîne YYYY-MM-DD
  let hash = 2166136261;
  for (let i = 0; i < dateKey.length; i++) {
    hash ^= dateKey.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const index = Math.abs(hash) % PLAYERS.length;
  return PLAYERS[index];
}

function saveDailySession() {
  const payload = {
    dateKey: getTodayKey(),
    guesses: sessions.daily.guesses,
    gameOver: sessions.daily.gameOver,
    endReason: sessions.daily.endReason
  };
  localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(payload));
  updateMenuDailyBadge();
}

function loadDailySession() {
  const todayKey = getTodayKey();
  sessions.daily.secretPlayer = getDailyPlayerForDate(todayKey);

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
  } catch (e) {
    // Si localStorage est indisponible, on repart à neuf
  }

  sessions.daily.guesses = [];
  sessions.daily.gameOver = false;
  sessions.daily.endReason = null;
}

function updateMenuDailyBadge() {
  loadDailySession();
  if (sessions.daily.gameOver) {
    dailyStatusBadge.textContent =
      sessions.daily.endReason === "win" ? "Complété aujourd'hui" : "Terminé aujourd'hui";
    dailyStatusBadge.className = "menu-tag completed-tag";
  } else if (sessions.daily.guesses.length > 0) {
    dailyStatusBadge.textContent = `En cours (${sessions.daily.guesses.length}/${MAX_ATTEMPTS})`;
    dailyStatusBadge.className = "menu-tag daily-tag";
  } else {
    dailyStatusBadge.textContent = "Joueur du jour";
    dailyStatusBadge.className = "menu-tag daily-tag";
  }
}

// --- NAVIGATION ENTRE LES VUES ---
function switchView(target) {
  currentView = target;
  autocompleteEl.classList.add("hidden");

  menuView.classList.toggle("hidden", target !== "menu");
  gameView.classList.toggle("hidden", target !== "daily" && target !== "practice");
  studyView.classList.toggle("hidden", target !== "study");
  modeNavbar.classList.toggle("hidden", target === "menu");

  navTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.target === target);
  });

  if (target === "menu") {
    updateMenuDailyBadge();
  } else if (target === "daily") {
    activeGameMode = "daily";
    loadDailySession();
    renderActiveGameSession();
  } else if (target === "practice") {
    activeGameMode = "practice";
    if (!sessions.practice.secretPlayer) {
      startNewPracticeGame();
    } else {
      renderActiveGameSession();
    }
  } else if (target === "study") {
    renderStudyDirectory(studySearchInput.value);
  }
}

function startNewPracticeGame() {
  sessions.practice.secretPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
  sessions.practice.guesses = [];
  sessions.practice.gameOver = false;
  sessions.practice.endReason = null;
  renderActiveGameSession();
}

// --- RENDU D'UNE SESSION DE JEU (DAILY OU PRATIQUE) ---
function renderActiveGameSession() {
  const session = sessions[activeGameMode];
  const isDaily = activeGameMode === "daily";

  modeTitleEl.textContent = isDaily ? "Défi Quotidien" : "Mode Pratique";
  modeSubtitleEl.textContent = isDaily
    ? `Joueur mystère du ${getFormattedTodayFrench()}`
    : "Manches illimitées tirées au hasard pour t'entraîner";

  newGameBtn.classList.toggle("hidden", isDaily);
  playAgainBtn.classList.toggle("hidden", isDaily);
  dailyNextInfo.classList.toggle("hidden", !isDaily);

  attemptCountEl.textContent = String(session.guesses.length);
  guessesContainer.innerHTML = "";
  resultCard.classList.add("hidden");

  session.guesses.forEach(playerId => {
    const player = PLAYERS.find(p => p.id === playerId);
    if (player) {
      appendGuessRowDOM(player, session.secretPlayer, false);
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

  appendGuessRowDOM(player, session.secretPlayer, true);

  if (player.id === session.secretPlayer.id) {
    finishSession("win");
  } else if (session.guesses.length >= MAX_ATTEMPTS) {
    finishSession("lose");
  } else if (activeGameMode === "daily") {
    saveDailySession();
  }
}

function appendGuessRowDOM(player, secretPlayer, animate) {
  const numDiff = secretPlayer.number - player.number;
  const numStatus = numDiff === 0 ? "exact" : Math.abs(numDiff) <= 5 ? "close" : "wrong";
  const numArrow = numDiff === 0 ? "" : numDiff > 0 ? "▲ Plus haut" : "▼ Plus bas";

  const posStatus =
    player.pos === secretPlayer.pos
      ? "exact"
      : player.posGroup === secretPlayer.posGroup
      ? "close"
      : "wrong";

  const unitStatus =
    player.unit === secretPlayer.unit
      ? "exact"
      : player.unitGroup === secretPlayer.unitGroup
      ? "close"
      : "wrong";

  const ageDiff = secretPlayer.age - player.age;
  const ageStatus = ageDiff === 0 ? "exact" : Math.abs(ageDiff) <= 2 ? "close" : "wrong";
  const ageArrow = ageDiff === 0 ? "" : ageDiff > 0 ? "▲ Plus vieux" : "▼ Plus jeune";

  const shootsStatus = player.shoots === secretPlayer.shoots ? "exact" : "wrong";
  const countryStatus = player.country === secretPlayer.country ? "exact" : "wrong";
  const nameStatus = player.id === secretPlayer.id ? "exact" : "name-cell";

  const cellsData = [
    { text: player.name, status: nameStatus, sub: "" },
    { text: `#${player.number}`, status: numStatus, sub: numArrow },
    { text: player.pos, status: posStatus, sub: "" },
    { text: player.unit, status: unitStatus, sub: "" },
    { text: `${player.age} ans`, status: ageStatus, sub: ageArrow },
    { text: player.shoots, status: shootsStatus, sub: "" },
    { text: player.country, status: countryStatus, sub: "" }
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

  if (activeGameMode === "daily") {
    saveDailySession();
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
  photoEl.src = `https://assets.nhle.com/mugs/nhl/20262027/MTL/${secretPlayer.id}.png`;
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

  const delay = waitAnimation ? 650 : 40;
  setTimeout(() => {
    resultCard.classList.remove("hidden");
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, delay);
}

// --- FENÊTRE MODALE : LISTE DES JOUEURS EN PARTIE ---
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

// --- VUE ÉTUDE (HORS DU JEU AVEC PHOTOS ET DÉTAILS COMPLETS) ---
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
      const mugUrl = `https://assets.nhle.com/mugs/nhl/20262027/MTL/${player.id}.png`;
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
      grid.appendChild(card);
    });

    section.appendChild(grid);
    studyDirectoryContent.appendChild(section);
  });
}

// --- COMPTE À REBOURS DE MINUIT POUR LE DÉFI QUOTIDIEN ---
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

// --- ÉVÉNEMENTS ---
document.querySelectorAll(".menu-card").forEach(card => {
  card.addEventListener("click", () => {
    switchView(card.dataset.mode);
  });
});

navTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    switchView(tab.dataset.target);
  });
});

document.getElementById("header-home-trigger").addEventListener("click", () => {
  switchView("menu");
});

document.getElementById("go-practice-btn").addEventListener("click", () => {
  switchView("practice");
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

newGameBtn.addEventListener("click", startNewPracticeGame);
playAgainBtn.addEventListener("click", startNewPracticeGame);

// Au démarrage, on affiche le menu principal avec l'état à jour du Défi Quotidien
switchView("menu");