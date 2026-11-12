// Références DOM principales
const menuView = document.getElementById("menu-view");
const gameView = document.getElementById("game-view");
const studyView = document.getElementById("study-view");
const modeNavbar = document.getElementById("mode-navbar");

const navDailyDropdown = document.getElementById("nav-dropdown-daily");
const navDailyTrigger = document.getElementById("nav-daily-trigger");
const navDailyLabel = document.getElementById("nav-daily-label");
const navDailyMenu = document.getElementById("nav-daily-menu");

const navPracticeDropdown = document.getElementById("nav-dropdown-practice");
const navPracticeTrigger = document.getElementById("nav-practice-trigger");
const navPracticeLabel = document.getElementById("nav-practice-label");
const navPracticeMenu = document.getElementById("nav-practice-menu");

const modeTitleEl = document.getElementById("current-mode-title");
const modeActivePill = document.getElementById("mode-active-pill");
const boardHeaderEl = document.getElementById("board-header");
const boardLegendEl = document.getElementById("board-legend");

const imageClueStage = document.getElementById("image-clue-stage");
const mysteryPlayerImg = document.getElementById("mystery-player-img");
const blurLevelText = document.getElementById("blur-level-text");

const customConfigPanel = document.getElementById("custom-config-panel");
const customCluesGrid = document.getElementById("custom-clues-grid");
const customCountBadge = document.getElementById("custom-count-badge");
const customArrowsToggle = document.getElementById("custom-arrows-toggle");
const applyCustomGameBtn = document.getElementById("apply-custom-game-btn");
const cancelCustomConfigBtn = document.getElementById("cancel-custom-config-btn");
const customizeCluesBtn = document.getElementById("customize-clues-btn");
const endCustomizeCluesBtn = document.getElementById("end-customize-clues-btn");

const inputEl = document.getElementById("player-input");
const autocompleteEl = document.getElementById("autocomplete-list");
const guessesContainer = document.getElementById("guesses-container");
const attemptCountEl = document.getElementById("attempt-count");
const studyModeCheckbox = document.getElementById("study-mode");
const resultCard = document.getElementById("result-card");
const giveUpBtn = document.getElementById("give-up-btn");
const newGameBtn = document.getElementById("new-game-btn");
const practiceEndActions = document.getElementById("practice-end-actions");
const playAgainBtn = document.getElementById("play-again-btn");
const backToMenuBtn = document.getElementById("back-to-menu-btn");
const dailyNextInfo = document.getElementById("daily-next-info");
const dailyBackToMenuBtn = document.getElementById("daily-back-to-menu-btn");

const rosterModal = document.getElementById("roster-modal");
const studyProfileModal = document.getElementById("study-profile-modal");
const studySearchInput = document.getElementById("study-search-input");

// --- CALCUL DU FLOU POUR LE MODE IMAGE ---
const INITIAL_BLUR_PX = 28;

function getImageBlurPx(session) {
  if (session.gameOver) return 0;
  const remainingStepsBeforeLast = Math.max(0, (MAX_ATTEMPTS - 1) - session.guesses.length);
  return Math.round((remainingStepsBeforeLast / (MAX_ATTEMPTS - 1)) * INITIAL_BLUR_PX);
}

function updateImageStageDOM(session) {
  const secret = session.secretPlayer;
  if (!secret) return;

  const mugUrl = getPlayerPhotoUrl(secret);
  const fallbackUrl = getPlayerFallbackPhotoUrl(secret);

  if (mysteryPlayerImg.dataset.playerId !== String(secret.id)) {
    mysteryPlayerImg.dataset.playerId = String(secret.id);
    mysteryPlayerImg.src = mugUrl;
    mysteryPlayerImg.onerror = () => {
      mysteryPlayerImg.src = fallbackUrl;
    };
  }

  const blurPx = getImageBlurPx(session);
  const blurPct = Math.round((blurPx / INITIAL_BLUR_PX) * 100);
  mysteryPlayerImg.style.filter = `blur(${blurPx}px)`;
  mysteryPlayerImg.style.transform = blurPx > 0 ? "scale(1.08)" : "scale(1)";

  if (session.gameOver || blurPx === 0) {
    blurLevelText.textContent = "Flou : 0%";
  } else {
    blurLevelText.textContent = `Flou : ${blurPct}%`;
  }
}

// --- MENUS DÉROULANTS DE LA BARRE DE NAVIGATION ---
function closeAllNavDropdowns() {
  navDailyDropdown.classList.remove("open");
  navDailyMenu.classList.add("hidden");
  navDailyTrigger.setAttribute("aria-expanded", "false");

  navPracticeDropdown.classList.remove("open");
  navPracticeMenu.classList.add("hidden");
  navPracticeTrigger.setAttribute("aria-expanded", "false");
}

function toggleNavDropdown(dropdownEl, menuEl, triggerEl) {
  const isOpen = dropdownEl.classList.contains("open");
  closeAllNavDropdowns();
  if (!isOpen) {
    dropdownEl.classList.add("open");
    menuEl.classList.remove("hidden");
    triggerEl.setAttribute("aria-expanded", "true");
  }
}

function updateNavbarActiveState() {
  const variantNames = {
    classic: "Standard",
    remix: "Mélangé",
    expert: "Expert",
    image: "Image"
  };

  document.querySelectorAll(".nav-tab[data-target]").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.target === currentView);
  });

  const isDailyActive = isDailyMode(currentView);
  navDailyTrigger.classList.toggle("active", isDailyActive);
  if (isDailyActive) {
    const v = sessions[currentView]?.variant || "classic";
    navDailyLabel.textContent = `Quotidien : ${variantNames[v] || "Standard"}`;
  } else {
    navDailyLabel.textContent = "Quotidien";
  }

  navDailyMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
    item.classList.toggle("selected-variant", item.dataset.mode === currentView);
  });

  const isPracticeActive = currentView === "practice";
  navPracticeTrigger.classList.toggle("active", isPracticeActive);
  if (isPracticeActive) {
    const v = sessions.practice.variant || "classic";
    navPracticeLabel.textContent = `Pratique : ${variantNames[v] || "Standard"}`;
  } else {
    navPracticeLabel.textContent = "Pratique";
  }

  navPracticeMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
    item.classList.toggle(
      "selected-variant",
      isPracticeActive && item.dataset.practiceVariant === sessions.practice.variant
    );
  });
}

// --- GESTION DE L'HISTORIQUE DU NAVIGATEUR ---
function buildHashForRoute(target, option) {
  if (target === "menu") return "#menu";
  if (target === "daily") return "#daily-standard";
  if (target === "dailyRemix") return "#daily-remix";
  if (target === "dailyExpert") return "#daily-expert";
  if (target === "dailyImage") return "#daily-image";
  if (target === "practice") {
    const v = typeof option === "string" ? option : (sessions.practice.variant || "classic");
    return `#practice-${v}`;
  }
  if (target === "custom") return "#custom";
  if (target === "study") return "#study";
  return "#menu";
}

function parseRouteFromHash(hashStr) {
  const clean = (hashStr || "").replace(/^#/, "");
  if (clean === "daily-standard" || clean === "daily") return { target: "daily", option: null };
  if (clean === "daily-remix") return { target: "dailyRemix", option: null };
  if (clean === "daily-expert") return { target: "dailyExpert", option: null };
  if (clean === "daily-image") return { target: "dailyImage", option: null };
  if (clean.startsWith("practice-")) {
    const variant = clean.replace("practice-", "");
    if (["classic", "remix", "expert", "image"].includes(variant)) {
      return { target: "practice", option: variant };
    }
    return { target: "practice", option: "classic" };
  }
  if (clean === "custom") return { target: "custom", option: null };
  if (clean === "study") return { target: "study", option: null };
  return { target: "menu", option: null };
}

// --- NAVIGATION ENTRE LES VUES ---
function switchView(target, option = null, pushHistory = true) {
  closeAllNavDropdowns();
  currentView = target;
  autocompleteEl.classList.add("hidden");

  const isGameView =
    isDailyMode(target) ||
    target === "practice" ||
    target === "custom";

  menuView.classList.toggle("hidden", target !== "menu");
  gameView.classList.toggle("hidden", !isGameView);
  studyView.classList.toggle("hidden", target !== "study");
  modeNavbar.classList.toggle("hidden", target === "menu");

  if (target === "daily") {
    activeGameMode = "daily";
    customConfigPanel.classList.add("hidden");
    loadDailySession();
    renderActiveGameSession();
  } else if (target === "dailyRemix") {
    activeGameMode = "dailyRemix";
    customConfigPanel.classList.add("hidden");
    loadDailyRemixSession();
    renderActiveGameSession();
  } else if (target === "dailyExpert") {
    activeGameMode = "dailyExpert";
    customConfigPanel.classList.add("hidden");
    loadDailyExpertSession();
    renderActiveGameSession();
  } else if (target === "dailyImage") {
    activeGameMode = "dailyImage";
    customConfigPanel.classList.add("hidden");
    loadDailyImageSession();
    renderActiveGameSession();
  } else if (target === "practice") {
    activeGameMode = "practice";
    customConfigPanel.classList.add("hidden");
    if (typeof option === "string") {
      if (!sessions.practice.secretPlayer || sessions.practice.variant !== option) {
        startNewPracticeGame(option);
      } else {
        renderActiveGameSession();
      }
    } else if (!sessions.practice.secretPlayer) {
      startNewPracticeGame("classic");
    } else {
      renderActiveGameSession();
    }
  } else if (target === "custom") {
    activeGameMode = "custom";
    if (!sessions.custom.secretPlayer) {
      startNewCustomGame(false);
      openCustomConfigPanel();
    } else {
      renderActiveGameSession();
      if (option === "configure") {
        openCustomConfigPanel();
      } else {
        customConfigPanel.classList.add("hidden");
      }
    }
  } else if (target === "study") {
    renderStudyDirectory(studySearchInput.value);
  }

  updateNavbarActiveState();

  if (pushHistory) {
    const newHash = buildHashForRoute(target, option);
    if (window.location.hash !== newHash) {
      window.history.pushState({ target, option }, "", newHash);
    }
  }
}

window.addEventListener("popstate", () => {
  rosterModal.classList.add("hidden");
  studyProfileModal.classList.add("hidden");
  const route = parseRouteFromHash(window.location.hash);
  switchView(route.target, route.option, false);
});

// --- INTERFACE DU CONSTRUCTEUR DE PARTIE PERSONNALISÉE ---
function renderCustomConfigUI() {
  customCluesGrid.innerHTML = "";
  customArrowsToggle.checked = customShowArrows;

  ALL_AVAILABLE_COLUMNS.forEach(colKey => {
    const def = CLUE_DEFINITIONS[colKey];
    const selectedIdx = customSelectedColumns.indexOf(colKey);
    const isSelected = selectedIdx !== -1;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `custom-clue-option ${isSelected ? "selected" : ""} ${def.isStat ? "stat-option" : ""}`;
    btn.innerHTML = `
      <div class="clue-opt-top">
        <span class="clue-opt-label">${def.fullName}</span>
        ${isSelected ? `<span class="clue-opt-order">${selectedIdx + 1}</span>` : ""}
      </div>
      <span class="clue-opt-meta">${def.isStat ? "Statistique / Secondaire" : "Indice standard"} ${def.interval}</span>
    `;

    btn.addEventListener("click", () => {
      const idx = customSelectedColumns.indexOf(colKey);
      if (idx !== -1) {
        customSelectedColumns.splice(idx, 1);
      } else if (customSelectedColumns.length < 6) {
        customSelectedColumns.push(colKey);
      }
      renderCustomConfigUI();
    });

    customCluesGrid.appendChild(btn);
  });

  const count = customSelectedColumns.length;
  customCountBadge.textContent = `${count} / 6`;
  applyCustomGameBtn.disabled = count < 1 || count > 6;
  cancelCustomConfigBtn.classList.toggle("hidden", !sessions.custom.secretPlayer);
}

function openCustomConfigPanel() {
  renderCustomConfigUI();
  customConfigPanel.classList.remove("hidden");
  customConfigPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function startNewPracticeGame(variant = sessions.practice.variant || "classic") {
  sessions.practice.secretPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
  sessions.practice.guesses = [];
  sessions.practice.gameOver = false;
  sessions.practice.endReason = null;
  sessions.practice.variant = variant;
  sessions.practice.hideArrows = variant === "expert" || variant === "image";

  if (variant === "remix") {
    sessions.practice.columns = generateRemixedColumns();
  } else if (variant === "expert") {
    sessions.practice.columns = generateExpertColumns();
  } else if (variant === "image") {
    sessions.practice.columns = [];
  } else {
    sessions.practice.columns = [...CLASSIC_COLUMNS];
  }

  updateNavbarActiveState();
  renderActiveGameSession();
}

function startNewCustomGame(hideConfigPanel = true) {
  if (customSelectedColumns.length < 1) {
    customSelectedColumns = [...CLASSIC_COLUMNS];
  }
  saveCustomPrefs();

  sessions.custom.secretPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
  sessions.custom.guesses = [];
  sessions.custom.gameOver = false;
  sessions.custom.endReason = null;
  sessions.custom.variant = "custom";
  sessions.custom.hideArrows = !customShowArrows;
  sessions.custom.columns = [...customSelectedColumns];

  if (hideConfigPanel) {
    customConfigPanel.classList.add("hidden");
  }
  renderActiveGameSession();
}

function restartCurrentGameSameType() {
  if (activeGameMode === "practice") {
    startNewPracticeGame(sessions.practice.variant);
  } else if (activeGameMode === "custom") {
    startNewCustomGame(true);
  }
}

// --- RENDU DE L'EN-TÊTE DE GRILLE DYNAMIQUE ---
function renderBoardHeader(columns) {
  const colCount = columns.length;
  const boardEl = boardHeaderEl.parentElement;
  boardEl.style.setProperty("--col-count", String(colCount));
  boardEl.style.setProperty("--board-min-width", `${175 + colCount * 85}px`);

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
  const isAnyDaily = isDailyMode(activeGameMode);
  const isCustom = activeGameMode === "custom";
  const imageMode = isImageSession(session);

  // Titres et bannières épurés (sans sous-titres explicatifs)
  if (activeGameMode === "daily") {
    modeTitleEl.textContent = "Défi Quotidien";
    modeActivePill.textContent = "Standard";
    modeActivePill.className = "mode-pill classic-pill";
  } else if (activeGameMode === "dailyRemix") {
    modeTitleEl.textContent = "Défi Quotidien";
    modeActivePill.textContent = "Mélangé";
    modeActivePill.className = "mode-pill remix-pill";
  } else if (activeGameMode === "dailyExpert") {
    modeTitleEl.textContent = "Défi Quotidien";
    modeActivePill.textContent = "Expert";
    modeActivePill.className = "mode-pill expert-pill";
  } else if (activeGameMode === "dailyImage") {
    modeTitleEl.textContent = "Défi Quotidien";
    modeActivePill.textContent = "Image";
    modeActivePill.className = "mode-pill image-pill";
  } else if (activeGameMode === "practice") {
    modeTitleEl.textContent = "Mode Pratique";
    if (session.variant === "remix") {
      modeActivePill.textContent = "Mélangé";
      modeActivePill.className = "mode-pill remix-pill";
    } else if (session.variant === "expert") {
      modeActivePill.textContent = "Expert";
      modeActivePill.className = "mode-pill expert-pill";
    } else if (session.variant === "image") {
      modeActivePill.textContent = "Image";
      modeActivePill.className = "mode-pill image-pill";
    } else {
      modeActivePill.textContent = "Standard";
      modeActivePill.className = "mode-pill classic-pill";
    }
  } else if (activeGameMode === "custom") {
    modeTitleEl.textContent = "Partie Personnalisée";
    modeActivePill.textContent = "Personnalisé";
    modeActivePill.className = "mode-pill custom-pill";
  }

  newGameBtn.classList.toggle("hidden", isAnyDaily);
  customizeCluesBtn.classList.toggle("hidden", !isCustom);
  endCustomizeCluesBtn.classList.toggle("hidden", !isCustom);
  practiceEndActions.classList.toggle("hidden", isAnyDaily);
  dailyNextInfo.classList.toggle("hidden", !isAnyDaily);

  imageClueStage.classList.toggle("hidden", !imageMode);
  boardLegendEl.classList.toggle("hidden", imageMode);
  boardHeaderEl.classList.toggle("hidden", imageMode);

  if (imageMode) {
    boardHeaderEl.parentElement.style.setProperty("--board-min-width", "100%");
    updateImageStageDOM(session);
  } else {
    renderBoardHeader(session.columns);
  }

  attemptCountEl.textContent = String(session.guesses.length);
  guessesContainer.innerHTML = "";
  resultCard.classList.add("hidden");

  session.guesses.forEach((playerId, index) => {
    const player = PLAYERS.find(p => p.id === playerId);
    if (!player) return;
    if (imageMode) {
      appendImageGuessRowDOM(player, session.secretPlayer, index + 1);
    } else {
      appendGuessRowDOM(player, session.secretPlayer, session.columns, false, session.hideArrows);
    }
  });

  inputEl.disabled = session.gameOver;
  giveUpBtn.disabled = session.gameOver;
  inputEl.value = "";

  if (session.gameOver) {
    showEndGameCard(session, false);
  } else if (customConfigPanel.classList.contains("hidden")) {
    inputEl.focus();
  }
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
  const attemptNumber = session.guesses.length;
  attemptCountEl.textContent = String(attemptNumber);
  inputEl.value = "";
  autocompleteEl.classList.add("hidden");

  const imageMode = isImageSession(session);

  if (imageMode) {
    appendImageGuessRowDOM(player, session.secretPlayer, attemptNumber);
  } else {
    appendGuessRowDOM(player, session.secretPlayer, session.columns, true, session.hideArrows);
  }

  if (player.id === session.secretPlayer.id) {
    finishSession("win");
  } else if (session.guesses.length >= MAX_ATTEMPTS) {
    finishSession("lose");
  } else {
    if (imageMode) {
      updateImageStageDOM(session);
    }
    if (isDailyMode(activeGameMode)) {
      saveDailySession(activeGameMode);
    }
  }
}

function appendImageGuessRowDOM(player, secretPlayer, attemptNumber) {
  const isCorrect = player.id === secretPlayer.id;
  const row = document.createElement("div");
  row.className = `image-guess-row ${isCorrect ? "exact" : "wrong"}`;
  row.innerHTML = `
    <div class="image-guess-left">
      <span class="image-attempt-badge">Essai #${attemptNumber}</span>
      <span>${player.name}</span>
    </div>
    <span class="image-guess-status">${isCorrect ? "✓ Bonne réponse" : "✕ Incorrect"}</span>
  `;
  guessesContainer.appendChild(row);
}

function appendGuessRowDOM(player, secretPlayer, columns, animate, hideArrows = false) {
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
    const arrowText = !hideArrows && cellInfo.sub ? cellInfo.sub : "";
    cell.innerHTML = `
      <span>${cellInfo.text}</span>
      ${arrowText ? `<span class="arrow-hint">${arrowText}</span>` : ""}
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

  if (isImageSession(session)) {
    updateImageStageDOM(session);
  }

  if (isDailyMode(activeGameMode)) {
    saveDailySession(activeGameMode);
  }

  showEndGameCard(session, reason !== "giveup" && !isImageSession(session));
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
  photoEl.src = getPlayerPhotoUrl(secretPlayer);
  photoEl.onerror = () => {
    photoEl.src = getPlayerFallbackPhotoUrl(secretPlayer);
  };

  setupXhekajEasterEgg(photoEl.closest(".photo-wrapper"), secretPlayer);

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

  const delay = waitAnimation ? 650 : 60;
  setTimeout(() => {
    resultCard.classList.remove("hidden");
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, delay);
}

// --- ÉVÉNEMENTS DU MENU PRINCIPAL ---
document.getElementById("menu-start-daily-btn").addEventListener("click", () => switchView("daily"));
document.getElementById("menu-start-daily-remix-btn").addEventListener("click", () => switchView("dailyRemix"));
document.getElementById("menu-start-daily-expert-btn").addEventListener("click", () => switchView("dailyExpert"));
document.getElementById("menu-start-daily-image-btn").addEventListener("click", () => switchView("dailyImage"));

document.getElementById("menu-start-practice-classic-btn").addEventListener("click", () => {
  startNewPracticeGame("classic");
  switchView("practice", "classic");
});
document.getElementById("menu-start-practice-remix-btn").addEventListener("click", () => {
  startNewPracticeGame("remix");
  switchView("practice", "remix");
});
document.getElementById("menu-start-practice-expert-btn").addEventListener("click", () => {
  startNewPracticeGame("expert");
  switchView("practice", "expert");
});
document.getElementById("menu-start-practice-image-btn").addEventListener("click", () => {
  startNewPracticeGame("image");
  switchView("practice", "image");
});

document.getElementById("menu-start-custom-btn").addEventListener("click", () => switchView("custom", "configure"));
document.getElementById("menu-card-study").addEventListener("click", () => switchView("study"));

// --- ÉVÉNEMENTS DE LA BARRE DE NAVIGATION ET MENUS DÉROULANTS ---
document.querySelectorAll(".nav-tab[data-target]").forEach(tab => {
  tab.addEventListener("click", () => {
    switchView(tab.dataset.target);
  });
});

navDailyTrigger.addEventListener("click", e => {
  e.stopPropagation();
  toggleNavDropdown(navDailyDropdown, navDailyMenu, navDailyTrigger);
});

navPracticeTrigger.addEventListener("click", e => {
  e.stopPropagation();
  toggleNavDropdown(navPracticeDropdown, navPracticeMenu, navPracticeTrigger);
});

navDailyMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    switchView(item.dataset.mode);
  });
});

navPracticeMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    const variant = item.dataset.practiceVariant;
    if (sessions.practice.variant !== variant || !sessions.practice.secretPlayer) {
      startNewPracticeGame(variant);
    }
    switchView("practice", variant);
  });
});

document.addEventListener("click", e => {
  if (!e.target.closest(".nav-dropdown")) {
    closeAllNavDropdowns();
  }
  if (!e.target.closest("#search-wrapper")) {
    autocompleteEl.classList.add("hidden");
  }
});

// --- ÉVÉNEMENTS DE LA PARTIE PERSONNALISÉE ---
customArrowsToggle.addEventListener("change", e => {
  customShowArrows = e.target.checked;
});

document.querySelectorAll(".preset-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const preset = chip.dataset.preset;
    if (preset === "classic") {
      customSelectedColumns = [...CLASSIC_COLUMNS];
    } else if (preset === "offense") {
      customSelectedColumns = ["g", "a", "pts", "shots", "toi"];
    } else if (preset === "physical") {
      customSelectedColumns = ["pos", "height", "weight", "pim", "plusMinus"];
    } else if (preset === "random") {
      const randomCount = 3 + Math.floor(Math.random() * 4);
      customSelectedColumns = shuffleArray(ALL_AVAILABLE_COLUMNS).slice(0, randomCount);
    } else if (preset === "clear") {
      customSelectedColumns = [];
    }
    renderCustomConfigUI();
  });
});

applyCustomGameBtn.addEventListener("click", () => {
  if (customSelectedColumns.length >= 1 && customSelectedColumns.length <= 6) {
    startNewCustomGame(true);
  }
});

cancelCustomConfigBtn.addEventListener("click", () => {
  customConfigPanel.classList.add("hidden");
});

customizeCluesBtn.addEventListener("click", openCustomConfigPanel);
endCustomizeCluesBtn.addEventListener("click", openCustomConfigPanel);

// --- BOUTONS D'ACTION EN PARTIE ---
document.getElementById("header-home-trigger").addEventListener("click", () => switchView("menu"));
newGameBtn.addEventListener("click", restartCurrentGameSameType);
playAgainBtn.addEventListener("click", restartCurrentGameSameType);
backToMenuBtn.addEventListener("click", () => switchView("menu"));
dailyBackToMenuBtn.addEventListener("click", () => switchView("menu"));

document.getElementById("refresh-api-btn").addEventListener("click", () => syncWithNHLAPI(true));
studySearchInput.addEventListener("input", e => renderStudyDirectory(e.target.value));

inputEl.addEventListener("input", updateAutocomplete);
studyModeCheckbox.addEventListener("change", updateAutocomplete);

inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const firstItem = autocompleteEl.querySelector(".autocomplete-item");
    if (firstItem) firstItem.click();
  }
});

giveUpBtn.addEventListener("click", () => {
  const session = sessions[activeGameMode];
  if (!session.gameOver) finishSession("giveup");
});

document.getElementById("roster-btn").addEventListener("click", openRosterModal);
document.getElementById("close-modal-btn").addEventListener("click", () => rosterModal.classList.add("hidden"));
rosterModal.addEventListener("click", e => {
  if (e.target === rosterModal) rosterModal.classList.add("hidden");
});

document.getElementById("close-profile-modal-btn").addEventListener("click", () => studyProfileModal.classList.add("hidden"));
studyProfileModal.addEventListener("click", e => {
  if (e.target === studyProfileModal) studyProfileModal.classList.add("hidden");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeAllNavDropdowns();
    rosterModal.classList.add("hidden");
    studyProfileModal.classList.add("hidden");
  }
});

// Initialisation au chargement
const initialRoute = parseRouteFromHash(window.location.hash);
window.history.replaceState(initialRoute, "", buildHashForRoute(initialRoute.target, initialRoute.option));
switchView(initialRoute.target, initialRoute.option, false);
syncWithNHLAPI(false);