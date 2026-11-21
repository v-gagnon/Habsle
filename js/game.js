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

const navSurvivalDropdown = document.getElementById("nav-dropdown-survival");
const navSurvivalTrigger = document.getElementById("nav-survival-trigger");
const navSurvivalLabel = document.getElementById("nav-survival-label");
const navSurvivalMenu = document.getElementById("nav-survival-menu");

const navSpeedrunDropdown = document.getElementById("nav-dropdown-speedrun");
const navSpeedrunTrigger = document.getElementById("nav-speedrun-trigger");
const navSpeedrunLabel = document.getElementById("nav-speedrun-label");
const navSpeedrunMenu = document.getElementById("nav-speedrun-menu");

const modeTitleEl = document.getElementById("current-mode-title");
const modeActivePill = document.getElementById("mode-active-pill");
const challengeHud = document.getElementById("challenge-hud");
const hudScoreVal = document.getElementById("hud-score-val");
const hudTimerPill = document.getElementById("hud-timer-pill");
const hudTimerVal = document.getElementById("hud-timer-val");
const hudRecordVal = document.getElementById("hud-record-val");
const challengeEndSummary = document.getElementById("challenge-end-summary");
const challengeSummaryStats = document.getElementById("challenge-summary-stats");
const challengeNewRecordSlot = document.getElementById("challenge-new-record-slot");
const challengePlayAgainBtn = document.getElementById("challenge-play-again-btn");
const challengeBackToMenuBtn = document.getElementById("challenge-back-to-menu-btn");

const topControlsEl = document.getElementById("top-controls");
const searchWrapperEl = document.getElementById("search-wrapper");
const gameBoardEl = document.getElementById("game-board");
const resultContentEl = document.getElementById("result-content");

const boardHeaderEl = document.getElementById("board-header");
const boardLegendEl = document.getElementById("board-legend");

const imageClueStage = document.getElementById("image-clue-stage");
const mysteryPlayerImg = document.getElementById("mystery-player-img");
const blurLevelText = document.getElementById("blur-level-text");

const revealStatsHeading = document.getElementById("reveal-stats-heading");
const revealStatsToggle = document.getElementById("reveal-stats-toggle");

const imageConfigPanel = document.getElementById("image-config-panel");
const imageRoundsGrid = document.getElementById("image-rounds-grid");
const imageRoundsBadge = document.getElementById("image-rounds-badge");
const applyImageGameBtn = document.getElementById("apply-image-game-btn");
const cancelImageConfigBtn = document.getElementById("cancel-image-config-btn");
const customizeRoundsBtn = document.getElementById("customize-rounds-btn");
const endCustomizeRoundsBtn = document.getElementById("end-customize-rounds-btn");

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
const studyModeToggleEl = studyModeCheckbox.closest(".study-toggle");
const rosterBtn = document.getElementById("roster-btn");
const topActionButtonsEl = topControlsEl.querySelector(".action-buttons");
const resultCard = document.getElementById("result-card");
const giveUpBtn = document.getElementById("give-up-btn");
const newGameBtn = document.getElementById("new-game-btn");
const practiceEndActions = document.getElementById("practice-end-actions");
const nextRoundBtn = document.getElementById("next-round-btn");
const endSurvivalBtn = document.getElementById("end-survival-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const backToMenuBtn = document.getElementById("back-to-menu-btn");
const dailyNextInfo = document.getElementById("daily-next-info");
const dailyBackToMenuBtn = document.getElementById("daily-back-to-menu-btn");

const rosterModal = document.getElementById("roster-modal");
const studyProfileModal = document.getElementById("study-profile-modal");
const studySearchInput = document.getElementById("study-search-input");

const confirmEndSurvivalModal = document.getElementById("confirm-end-survival-modal");
const confirmSurvivalMessage = document.getElementById("confirm-survival-message");
const closeConfirmSurvivalBtn = document.getElementById("close-confirm-survival-btn");
const cancelEndSurvivalBtn = document.getElementById("cancel-end-survival-btn");
const confirmEndSurvivalBtn = document.getElementById("confirm-end-survival-btn");

// --- CALCUL DU FLOU POUR LE MODE IMAGE ---
const INITIAL_BLUR_PX = 17.5;
const IMAGE_MAX_ATTEMPTS = 6;

function getMaxAttempts(session) {
  if (session === sessions.survival) {
    return session.maxAttempts || getSurvivalMaxAttempts(session.variant, session.roundNumber || 1);
  }
  if (isImageSession(session)) {
    if (session === sessions.practice) {
      return session.imageMaxAttempts || practiceImageRounds || IMAGE_MAX_ATTEMPTS;
    }
    return IMAGE_MAX_ATTEMPTS;
  }
  return MAX_ATTEMPTS;
}

function getImageBlurPct(session) {
  if (session.gameOver) return 0;
  // En mode Survie Visuel : on reste dans la partie la plus floue (paliers fixes de -20 % : 100 %, 80 %, 60 %...)
  if (session === sessions.survival) {
    return Math.max(0, 100 - session.guesses.length * 20);
  }
  const totalMaxSteps = IMAGE_MAX_ATTEMPTS - 1; // 5 paliers de 20%
  const sessionMaxAttempts = getMaxAttempts(session);
  const remainingSteps = Math.max(0, (sessionMaxAttempts - 1) - session.guesses.length);
  return Math.round((remainingSteps / totalMaxSteps) * 100);
}

function getImageBlurPx(session) {
  return (getImageBlurPct(session) / 100) * INITIAL_BLUR_PX;
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

  const blurPct = getImageBlurPct(session);
  const blurPx = getImageBlurPx(session);
  mysteryPlayerImg.style.filter = `blur(${blurPx}px)`;
  mysteryPlayerImg.style.transform = blurPx > 0 ? "scale(1.08)" : "scale(1)";

  blurLevelText.textContent = `Flou : ${blurPct}%`;
}

// --- CHRONOMÈTRE ET HUD (SURVIE / CONTRE-LA-MONTRE) ---
let speedrunTimerInterval = null;

function stopSpeedrunTimer() {
  if (speedrunTimerInterval) {
    clearInterval(speedrunTimerInterval);
    speedrunTimerInterval = null;
  }
}

function startSpeedrunTimer() {
  stopSpeedrunTimer();
  speedrunTimerInterval = setInterval(() => {
    const session = sessions.speedrun;
    if (activeGameMode !== "speedrun" || session.runOver || session.startTime === null) {
      stopSpeedrunTimer();
      return;
    }
    session.elapsedMs = performance.now() - session.startTime;
    hudTimerVal.textContent = formatSpeedrunTime(session.elapsedMs);
  }, 50);
}

function resetSurvivalSession() {
  sessions.survival.secretPlayer = null;
  sessions.survival.guesses = [];
  sessions.survival.gameOver = false;
  sessions.survival.endReason = null;
  sessions.survival.roundNumber = 1;
  sessions.survival.score = 0;
  sessions.survival.runOver = false;
  sessions.survival.endedManually = false;
  sessions.survival.isNewRecord = false;
  sessions.survival.previousRecord = null;
}

function resetSpeedrunSession() {
  stopSpeedrunTimer();
  sessions.speedrun.secretPlayer = null;
  sessions.speedrun.guesses = [];
  sessions.speedrun.gameOver = false;
  sessions.speedrun.endReason = null;
  sessions.speedrun.roundNumber = 1;
  sessions.speedrun.score = 0;
  sessions.speedrun.startTime = null;
  sessions.speedrun.elapsedMs = 0;
  sessions.speedrun.runOver = false;
  sessions.speedrun.isNewRecord = false;
  sessions.speedrun.previousRecord = null;
}

function updateChallengeHUD() {
  if (!isChallengeMode(activeGameMode)) {
    challengeHud.classList.add("hidden");
    return;
  }

  challengeHud.classList.remove("hidden");

  if (activeGameMode === "survival") {
    const session = sessions.survival;
    const best = getRecord("survival", session.variant);
    hudScoreVal.textContent = `${session.score}`;
    hudTimerPill.classList.add("hidden");
    hudRecordVal.textContent = best !== null ? `${best}` : "—";
  } else if (activeGameMode === "speedrun") {
    const session = sessions.speedrun;
    const best = getRecord("speedrun", session.variant);
    hudScoreVal.textContent = `${session.score} / ${session.targetScore}`;
    hudTimerPill.classList.remove("hidden");
    hudTimerVal.textContent = formatSpeedrunTime(session.elapsedMs);
    hudRecordVal.textContent = best !== null ? formatSpeedrunTime(best) : "—";
  }
}

function buildColumnsForVariant(variant) {
  if (variant === "remix") return generateRemixedColumns();
  if (variant === "expert") return generateExpertColumns();
  if (variant === "image") return [];
  return [...CLASSIC_COLUMNS];
}

// --- MENUS DÉROULANTS DE LA BARRE DE NAVIGATION ---
function closeAllNavDropdowns() {
  [
    [navDailyDropdown, navDailyMenu, navDailyTrigger],
    [navPracticeDropdown, navPracticeMenu, navPracticeTrigger],
    [navSurvivalDropdown, navSurvivalMenu, navSurvivalTrigger],
    [navSpeedrunDropdown, navSpeedrunMenu, navSpeedrunTrigger]
  ].forEach(([dropdownEl, menuEl, triggerEl]) => {
    if (!dropdownEl) return;
    dropdownEl.classList.remove("open");
    menuEl.classList.add("hidden");
    triggerEl.setAttribute("aria-expanded", "false");
  });
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

function updateDailyMenuButtons() {
  const dailyButtons = [
    { id: "menu-start-daily-btn", mode: "daily" },
    { id: "menu-start-daily-remix-btn", mode: "dailyRemix" },
    { id: "menu-start-daily-expert-btn", mode: "dailyExpert" },
    { id: "menu-start-daily-image-btn", mode: "dailyImage" }
  ];

  dailyButtons.forEach(({ id, mode }) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.classList.toggle("daily-completed", isDailyModeCompletedToday(mode));
  });
}

function updateNavbarActiveState() {
  const variantNames = {
    classic: "Standard",
    remix: "Mélangé",
    expert: "Expert",
    image: "Portrait"
  };

  const challengeVariantNames = {
    classic: "Standard",
    remix: "Mélangé",
    expert: "Expert",
    image: "Visuel"
  };

  document.querySelectorAll(".nav-tab[data-target]").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.target === currentView);
  });

  // Quotidien
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

  // Pratique
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

  // Survie
  const isSurvivalActive = currentView === "survival";
  navSurvivalTrigger.classList.toggle("active", isSurvivalActive);
  if (isSurvivalActive) {
    const v = sessions.survival.variant || "classic";
    navSurvivalLabel.textContent = `Survie : ${challengeVariantNames[v] || "Standard"}`;
  } else {
    navSurvivalLabel.textContent = "Survie";
  }
  navSurvivalMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
    item.classList.toggle(
      "selected-variant",
      isSurvivalActive && item.dataset.survivalVariant === sessions.survival.variant
    );
  });

  // Contre-la-montre
  const isSpeedrunActive = currentView === "speedrun";
  navSpeedrunTrigger.classList.toggle("active", isSpeedrunActive);
  if (isSpeedrunActive) {
    const v = sessions.speedrun.variant || "classic";
    navSpeedrunLabel.textContent = `Contre-la-montre : ${challengeVariantNames[v] || "Standard"}`;
  } else {
    navSpeedrunLabel.textContent = "Contre-la-montre";
  }
  navSpeedrunMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
    item.classList.toggle(
      "selected-variant",
      isSpeedrunActive && item.dataset.speedrunVariant === sessions.speedrun.variant
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
    const rawOpt = option === "image-configure" ? "image" : option;
    const v = typeof rawOpt === "string" ? rawOpt : (sessions.practice.variant || "classic");
    return `#practice-${v}`;
  }
  if (target === "survival") {
    const v = typeof option === "string" ? option : (sessions.survival.variant || "classic");
    return `#survival-${v}`;
  }
  if (target === "speedrun") {
    const v = typeof option === "string" ? option : (sessions.speedrun.variant || "classic");
    return `#speedrun-${v}`;
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
  if (clean.startsWith("survival-")) {
    const variant = clean.replace("survival-", "");
    if (["classic", "remix", "expert", "image"].includes(variant)) {
      return { target: "survival", option: variant };
    }
    return { target: "survival", option: "classic" };
  }
  if (clean.startsWith("speedrun-")) {
    const variant = clean.replace("speedrun-", "");
    if (["classic", "remix", "expert", "image"].includes(variant)) {
      return { target: "speedrun", option: variant };
    }
    return { target: "speedrun", option: "classic" };
  }
  if (clean === "custom") return { target: "custom", option: null };
  if (clean === "study") return { target: "study", option: null };
  return { target: "menu", option: null };
}

// --- NAVIGATION ENTRE LES VUES ---
function switchView(target, option = null, pushHistory = true) {
  const prevView = currentView;
  closeAllNavDropdowns();
  confirmEndSurvivalModal.classList.add("hidden");
  rosterModal.classList.add("hidden");

  // Aucune sauvegarde d'état pour Survie et Contre-la-montre : quitter = partie perdue
  if (prevView === "survival" && target !== "survival") {
    resetSurvivalSession();
  }
  if (prevView === "speedrun" && target !== "speedrun") {
    resetSpeedrunSession();
  }

  currentView = target;
  autocompleteEl.classList.add("hidden");

  const isGameView =
    isDailyMode(target) ||
    target === "practice" ||
    target === "custom" ||
    target === "survival" ||
    target === "speedrun";

  menuView.classList.toggle("hidden", target !== "menu");
  gameView.classList.toggle("hidden", !isGameView);
  studyView.classList.toggle("hidden", target !== "study");
  modeNavbar.classList.toggle("hidden", target === "menu");

  if (target === "daily") {
    activeGameMode = "daily";
    customConfigPanel.classList.add("hidden");
    imageConfigPanel.classList.add("hidden");
    loadDailySession();
    renderActiveGameSession();
  } else if (target === "dailyRemix") {
    activeGameMode = "dailyRemix";
    customConfigPanel.classList.add("hidden");
    imageConfigPanel.classList.add("hidden");
    loadDailyRemixSession();
    renderActiveGameSession();
  } else if (target === "dailyExpert") {
    activeGameMode = "dailyExpert";
    customConfigPanel.classList.add("hidden");
    imageConfigPanel.classList.add("hidden");
    loadDailyExpertSession();
    renderActiveGameSession();
  } else if (target === "dailyImage") {
    activeGameMode = "dailyImage";
    customConfigPanel.classList.add("hidden");
    imageConfigPanel.classList.add("hidden");
    loadDailyImageSession();
    renderActiveGameSession();
  } else if (target === "practice") {
    activeGameMode = "practice";
    customConfigPanel.classList.add("hidden");
    const wantImageConfig = option === "image-configure";
    const variantOpt = wantImageConfig ? "image" : option;

    if (typeof variantOpt === "string") {
      if (!sessions.practice.secretPlayer || sessions.practice.variant !== variantOpt) {
        startNewPracticeGame(variantOpt);
      } else {
        renderActiveGameSession();
      }
    } else if (!sessions.practice.secretPlayer) {
      startNewPracticeGame("classic");
    } else {
      renderActiveGameSession();
    }

    if (wantImageConfig) {
      openImageConfigPanel();
    } else {
      imageConfigPanel.classList.add("hidden");
    }
  } else if (target === "custom") {
    activeGameMode = "custom";
    imageConfigPanel.classList.add("hidden");
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
  } else if (target === "survival") {
    activeGameMode = "survival";
    customConfigPanel.classList.add("hidden");
    imageConfigPanel.classList.add("hidden");
    const variant = typeof option === "string" ? option : (sessions.survival.variant || "classic");
    const sameActiveRun =
      prevView === "survival" &&
      sessions.survival.secretPlayer &&
      sessions.survival.variant === variant &&
      !sessions.survival.runOver;

    if (!sameActiveRun) {
      startNewSurvivalGame(variant);
    } else {
      renderActiveGameSession();
    }
  } else if (target === "speedrun") {
    activeGameMode = "speedrun";
    customConfigPanel.classList.add("hidden");
    imageConfigPanel.classList.add("hidden");
    const variant = typeof option === "string" ? option : (sessions.speedrun.variant || "classic");
    const sameActiveRun =
      prevView === "speedrun" &&
      sessions.speedrun.secretPlayer &&
      sessions.speedrun.variant === variant &&
      !sessions.speedrun.runOver;

    if (!sameActiveRun) {
      startNewSpeedrunGame(variant);
    } else {
      renderActiveGameSession();
    }
  } else if (target === "study") {
    renderStudyDirectory(studySearchInput.value);
  }

  updateDailyMenuButtons();
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
  confirmEndSurvivalModal.classList.add("hidden");
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

function renderImageConfigUI() {
  imageRoundsGrid.innerHTML = "";
  const totalSteps = IMAGE_MAX_ATTEMPTS - 1; // 5 paliers de 20%

  for (let r = 1; r <= IMAGE_MAX_ATTEMPTS; r++) {
    const startBlurPct = Math.round(((r - 1) / totalSteps) * 100);
    const isSelected = r === pendingImageRounds;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `custom-clue-option ${isSelected ? "selected" : ""}`;
    btn.innerHTML = `
      <div class="clue-opt-top">
        <span class="clue-opt-label">${r} ronde${r > 1 ? "s" : ""}</span>
        ${isSelected ? `<span class="clue-opt-order">✓</span>` : ""}
      </div>
      <span class="clue-opt-meta">Flou initial : ${startBlurPct}%</span>
    `;

    btn.addEventListener("click", () => {
      pendingImageRounds = r;
      renderImageConfigUI();
    });

    imageRoundsGrid.appendChild(btn);
  }

  const badgeBlur = Math.round(((pendingImageRounds - 1) / totalSteps) * 100);
  imageRoundsBadge.textContent = `${pendingImageRounds} ronde${pendingImageRounds > 1 ? "s" : ""} • Flou ${badgeBlur}%`;
  applyImageGameBtn.textContent = `Lancer la partie (${pendingImageRounds} ronde${pendingImageRounds > 1 ? "s" : ""})`;
  cancelImageConfigBtn.classList.toggle("hidden", !sessions.practice.secretPlayer);
}

function openImageConfigPanel() {
  pendingImageRounds = practiceImageRounds;
  renderImageConfigUI();
  imageConfigPanel.classList.remove("hidden");
  imageConfigPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// --- DÉMARRAGE DES DIFFÉRENTS MODES ---
function startNewPracticeGame(variant = sessions.practice.variant || "classic") {
  const prevId = sessions.practice.secretPlayer?.id ?? null;
  sessions.practice.secretPlayer = pickRandomPlayablePlayer(prevId);
  sessions.practice.guesses = [];
  sessions.practice.gameOver = false;
  sessions.practice.endReason = null;
  sessions.practice.variant = variant;
  sessions.practice.hideArrows = variant === "expert" || variant === "image";
  sessions.practice.imageMaxAttempts = practiceImageRounds;
  sessions.practice.columns = buildColumnsForVariant(variant);

  updateNavbarActiveState();
  renderActiveGameSession();
}

function startNewCustomGame(hideConfigPanel = true) {
  if (customSelectedColumns.length < 1) {
    customSelectedColumns = [...CLASSIC_COLUMNS];
  }
  saveCustomPrefs();

  const prevId = sessions.custom.secretPlayer?.id ?? null;
  sessions.custom.secretPlayer = pickRandomPlayablePlayer(prevId);
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

function startNewSurvivalGame(variant = sessions.survival.variant || "classic") {
  const s = sessions.survival;
  s.variant = variant;
  s.roundNumber = 1;
  s.score = 0;
  s.runOver = false;
  s.endedManually = false;
  s.isNewRecord = false;
  s.previousRecord = getRecord("survival", variant);
  s.secretPlayer = pickRandomPlayablePlayer();
  s.guesses = [];
  s.gameOver = false;
  s.endReason = null;
  s.hideArrows = variant === "expert" || variant === "image";
  s.columns = buildColumnsForVariant(variant);
  s.maxAttempts = getSurvivalMaxAttempts(variant, 1);

  activeGameMode = "survival";
  updateNavbarActiveState();
  renderActiveGameSession();
}

function advanceSurvivalRound() {
  const s = sessions.survival;
  if (s.runOver || !s.gameOver) return;

  const prevId = s.secretPlayer?.id ?? null;
  s.roundNumber += 1;
  s.secretPlayer = pickRandomPlayablePlayer(prevId);
  s.guesses = [];
  s.gameOver = false;
  s.endReason = null;
  s.columns = buildColumnsForVariant(s.variant);
  s.maxAttempts = getSurvivalMaxAttempts(s.variant, s.roundNumber);

  renderActiveGameSession();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function endSurvivalRunManually() {
  const s = sessions.survival;
  if (activeGameMode !== "survival" || s.runOver || !s.gameOver) return;

  s.runOver = true;
  s.endedManually = true;
  s.previousRecord = getRecord("survival", s.variant);
  s.isNewRecord = s.score > 0 && updateRecordIfBetter("survival", s.variant, s.score);

  newGameBtn.classList.remove("hidden");
  updateChallengeHUD();
  showEndGameCard(s, false);
}

function startNewSpeedrunGame(variant = sessions.speedrun.variant || "classic") {
  stopSpeedrunTimer();
  const s = sessions.speedrun;
  s.variant = variant;
  s.roundNumber = 1;
  s.score = 0;
  s.targetScore = SPEEDRUN_TARGETS[variant] || 5;
  s.startTime = performance.now();
  s.elapsedMs = 0;
  s.runOver = false;
  s.isNewRecord = false;
  s.previousRecord = getRecord("speedrun", variant);
  s.secretPlayer = pickRandomPlayablePlayer();
  s.guesses = [];
  s.gameOver = false;
  s.endReason = null;
  s.hideArrows = variant === "expert" || variant === "image";
  s.columns = buildColumnsForVariant(variant);

  activeGameMode = "speedrun";
  updateNavbarActiveState();
  renderActiveGameSession();
  startSpeedrunTimer();
}

function advanceSpeedrunRound() {
  const s = sessions.speedrun;
  if (s.runOver || !s.gameOver) return;

  const prevId = s.secretPlayer?.id ?? null;
  s.roundNumber += 1;
  s.secretPlayer = pickRandomPlayablePlayer(prevId);
  s.guesses = [];
  s.gameOver = false;
  s.endReason = null;
  s.columns = buildColumnsForVariant(s.variant);

  renderActiveGameSession();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function restartCurrentGameSameType() {
  if (activeGameMode === "practice") {
    startNewPracticeGame(sessions.practice.variant);
  } else if (activeGameMode === "custom") {
    startNewCustomGame(true);
  } else if (activeGameMode === "survival") {
    startNewSurvivalGame(sessions.survival.variant);
  } else if (activeGameMode === "speedrun") {
    startNewSpeedrunGame(sessions.speedrun.variant);
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

function applyVariantPill(variant, imageLabel = "Visuel") {
  if (variant === "remix") {
    modeActivePill.textContent = "Mélangé";
    modeActivePill.className = "mode-pill remix-pill";
  } else if (variant === "expert") {
    modeActivePill.textContent = "Expert";
    modeActivePill.className = "mode-pill expert-pill";
  } else if (variant === "image") {
    modeActivePill.textContent = imageLabel;
    modeActivePill.className = "mode-pill image-pill";
  } else {
    modeActivePill.textContent = "Standard";
    modeActivePill.className = "mode-pill classic-pill";
  }
}

function setChallengeEndScreenVisibility(isEndScreen) {
  const session = sessions[activeGameMode];
  const imageMode = isImageSession(session);

  topControlsEl.classList.toggle("hidden", isEndScreen);
  searchWrapperEl.classList.toggle("hidden", isEndScreen);
  gameBoardEl.classList.toggle("hidden", isEndScreen);
  resultContentEl.classList.toggle("hidden", isEndScreen);
  resultCard.classList.toggle("challenge-final-card", isEndScreen);

  if (isEndScreen) {
    imageClueStage.classList.add("hidden");
    boardLegendEl.classList.add("hidden");
  } else {
    imageClueStage.classList.toggle("hidden", !imageMode);
    boardLegendEl.classList.toggle("hidden", imageMode);
  }
}

let resultCardTimer = null;

function renderActiveGameSession() {
  if (resultCardTimer) {
    clearTimeout(resultCardTimer);
    resultCardTimer = null;
  }

  const session = sessions[activeGameMode];
  const isAnyDaily = isDailyMode(activeGameMode);
  const isCustom = activeGameMode === "custom";
  const isChallenge = isChallengeMode(activeGameMode);
  const imageMode = isImageSession(session);
  const isSurvival = activeGameMode === "survival";

  // Titres et bannières
  if (activeGameMode === "daily") {
    modeTitleEl.textContent = "Défi Quotidien";
    applyVariantPill("classic");
  } else if (activeGameMode === "dailyRemix") {
    modeTitleEl.textContent = "Défi Quotidien";
    applyVariantPill("remix");
  } else if (activeGameMode === "dailyExpert") {
    modeTitleEl.textContent = "Défi Quotidien";
    applyVariantPill("expert");
  } else if (activeGameMode === "dailyImage") {
    modeTitleEl.textContent = "Défi Quotidien";
    applyVariantPill("image", "Portrait");
  } else if (activeGameMode === "practice") {
    modeTitleEl.textContent = "Mode Pratique";
    applyVariantPill(session.variant, "Image");
  } else if (activeGameMode === "custom") {
    modeTitleEl.textContent = "Partie Personnalisée";
    modeActivePill.textContent = "Personnalisé";
    modeActivePill.className = "mode-pill custom-pill";
  } else if (activeGameMode === "survival") {
    modeTitleEl.textContent = "Mode Survie";
    applyVariantPill(session.variant, "Visuel");
  } else if (activeGameMode === "speedrun") {
    modeTitleEl.textContent = "Contre-la-montre";
    applyVariantPill(session.variant, "Visuel");
  }

  updateChallengeHUD();

  // Barre de contrôle du haut : en Survie / Contre-la-montre, on enlève "Donner la réponse"
  // et "Nouvelle partie" tant que la partie n'est pas terminée (on garde la Liste des joueurs)
  giveUpBtn.classList.toggle("hidden", isChallenge);
  newGameBtn.classList.toggle("hidden", isAnyDaily || (isChallenge && !session.runOver));
  customizeCluesBtn.classList.toggle("hidden", !isCustom);
  endCustomizeCluesBtn.classList.toggle("hidden", !isCustom);
  const isPracticeImage = activeGameMode === "practice" && imageMode;
  customizeRoundsBtn.classList.toggle("hidden", !isPracticeImage);
  endCustomizeRoundsBtn.classList.toggle("hidden", !isPracticeImage);
  practiceEndActions.classList.toggle("hidden", isAnyDaily);
  dailyNextInfo.classList.toggle("hidden", !isAnyDaily);
  studyModeToggleEl.classList.toggle("hidden", isSurvival);
  rosterBtn.classList.toggle("hidden", isSurvival);
  topActionButtonsEl.classList.toggle("hidden", isSurvival);

  setChallengeEndScreenVisibility(false);
  boardHeaderEl.classList.toggle("hidden", imageMode);

  if (imageMode) {
    boardHeaderEl.parentElement.style.setProperty("--board-min-width", "100%");
    updateImageStageDOM(session);
  } else {
    renderBoardHeader(session.columns);
  }

  attemptCountEl.textContent = `${session.guesses.length} / ${getMaxAttempts(session)}`;
  guessesContainer.innerHTML = "";
  resultCard.classList.add("hidden");
  challengeEndSummary.classList.add("hidden");

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
  } else if (
    customConfigPanel.classList.contains("hidden") &&
    imageConfigPanel.classList.contains("hidden")
  ) {
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

  const showHints = activeGameMode !== "survival" && studyModeCheckbox.checked;

  matches.forEach(player => {
    const playable = isPlayablePlayer(player);
    const item = document.createElement("div");
    item.className = `autocomplete-item ${playable ? "" : "disabled"}`;
    item.innerHTML = `
      <strong>${player.name}</strong>
      ${showHints ? `<span class="hint-pill">#${player.number} • ${player.pos} • ${player.unit}</span>` : ""}
    `;
    if (playable) {
      item.addEventListener("click", () => submitGuess(player));
    }
    autocompleteEl.appendChild(item);
  });

  autocompleteEl.classList.remove("hidden");
}

// --- SOUMISSION D'UN ESSAI ---
function submitGuess(player) {
  const session = sessions[activeGameMode];
  if (!isPlayablePlayer(player) || session.gameOver || session.guesses.includes(player.id)) return;

  session.guesses.push(player.id);
  const attemptNumber = session.guesses.length;
  const maxAttempts = getMaxAttempts(session);
  attemptCountEl.textContent = `${attemptNumber} / ${maxAttempts}`;
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
  } else if (session.guesses.length >= maxAttempts) {
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

  if (activeGameMode === "survival") {
    if (reason === "win") {
      session.score += 1;
      session.runOver = false;
    } else {
      session.runOver = true;
      session.previousRecord = getRecord("survival", session.variant);
      session.isNewRecord =
        session.score > 0 && updateRecordIfBetter("survival", session.variant, session.score);
      newGameBtn.classList.remove("hidden");
    }
    updateChallengeHUD();
  } else if (activeGameMode === "speedrun") {
    if (reason === "win") {
      session.score += 1;
      if (session.score >= session.targetScore) {
        session.elapsedMs = performance.now() - session.startTime;
        stopSpeedrunTimer();
        session.runOver = true;
        session.previousRecord = getRecord("speedrun", session.variant);
        session.isNewRecord = updateRecordIfBetter("speedrun", session.variant, session.elapsedMs);
        newGameBtn.classList.remove("hidden");
      } else {
        session.runOver = false;
      }
    } else {
      // Mauvaise réponse : le score n'augmente pas et on passe à la prochaine ronde normalement
      session.runOver = false;
    }
    updateChallengeHUD();
  }

  if (isImageSession(session)) {
    updateImageStageDOM(session);
  }

  if (isDailyMode(activeGameMode)) {
    saveDailySession(activeGameMode);
    updateDailyMenuButtons();
  }

  showEndGameCard(session, reason !== "giveup" && !isImageSession(session));
}

function renderChallengeEndSummary(session) {
  if (!isChallengeMode(activeGameMode) || !session.runOver) {
    challengeEndSummary.classList.add("hidden");
    challengeSummaryStats.innerHTML = "";
    challengeNewRecordSlot.innerHTML = "";
    return;
  }

  challengeNewRecordSlot.innerHTML = session.isNewRecord
    ? `<span class="new-record-badge">★ Nouveau record !</span>`
    : "";

  if (activeGameMode === "survival") {
    const best = getRecord("survival", session.variant);
    challengeSummaryStats.innerHTML = `
      <div class="challenge-summary-box">
        <div class="challenge-summary-label">Score final</div>
        <div class="challenge-summary-val">${session.score}</div>
      </div>
      <div class="challenge-summary-box record-box">
        <div class="challenge-summary-label">Record</div>
        <div class="challenge-summary-val">${best !== null ? best : "—"}</div>
      </div>
    `;
  } else if (activeGameMode === "speedrun") {
    const best = getRecord("speedrun", session.variant);
    challengeSummaryStats.innerHTML = `
      <div class="challenge-summary-box">
        <div class="challenge-summary-label">Temps final</div>
        <div class="challenge-summary-val">${formatSpeedrunTime(session.elapsedMs)}</div>
      </div>
      <div class="challenge-summary-box record-box">
        <div class="challenge-summary-label">Record</div>
        <div class="challenge-summary-val">${best !== null ? formatSpeedrunTime(best) : "—"}</div>
      </div>
    `;
  }

  challengeEndSummary.classList.remove("hidden");
}

function showEndGameCard(session, waitAnimation) {
  const secretPlayer = session.secretPlayer;
  const reason = session.endReason;
  const attemptsCount = session.guesses.length;
  const isChallenge = isChallengeMode(activeGameMode);
  const isChallengeFinal = isChallenge && session.runOver;

  const banner = document.getElementById("result-banner");

  if (activeGameMode === "survival" && session.runOver) {
    if (session.endedManually) {
      banner.className = "result-banner win";
      banner.textContent = "Partie de survie terminée !";
    } else {
      banner.className = "result-banner lose";
      banner.textContent = `Survie terminée ! Le joueur mystère était ${secretPlayer.name} (#${secretPlayer.number}).`;
    }
  } else if (activeGameMode === "speedrun" && session.runOver) {
    banner.className = "result-banner win";
    banner.textContent = `Contre-la-montre terminé en ${formatSpeedrunTime(session.elapsedMs)} !`;
  } else {
    banner.className = `result-banner ${reason === "win" ? "win" : "lose"}`;
    if (reason === "win") {
      banner.textContent = `Bravo ! Tu as trouvé ${secretPlayer.name} en ${attemptsCount} essai${attemptsCount > 1 ? "s" : ""} !`;
    } else if (reason === "giveup") {
      banner.textContent = `Réponse révélée : le joueur mystère était ${secretPlayer.name} (#${secretPlayer.number}).`;
    } else {
      banner.textContent = `Manche terminée ! Le joueur mystère était ${secretPlayer.name} (#${secretPlayer.number}).`;
    }
  }

  // Résumé final (record, score, temps) si la série est terminée
  renderChallengeEndSummary(session);

  if (!isChallengeFinal) {
    // Boutons d'action de la fiche entre les rondes ou dans les autres modes
    if (isChallenge && !session.runOver) {
      nextRoundBtn.classList.remove("hidden");
      endSurvivalBtn.classList.toggle("hidden", activeGameMode !== "survival");
      playAgainBtn.classList.add("hidden");
      backToMenuBtn.classList.add("hidden");
    } else {
      nextRoundBtn.classList.add("hidden");
      endSurvivalBtn.classList.add("hidden");
      playAgainBtn.classList.remove("hidden");
      backToMenuBtn.classList.remove("hidden");
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

    const outStatus = getPlayerOutStatus(secretPlayer);
    const outStatusBoxHTML = outStatus
      ? `<div class="stat-box ${outStatus === "Blessé" ? "status-injured-box" : "status-scratched-box"}"><div class="stat-label">Statut</div><div class="stat-val">${outStatus}</div></div>`
      : "";

    document.getElementById("reveal-stats").innerHTML = `
      <div class="stat-box"><div class="stat-label">Position</div><div class="stat-val">${secretPlayer.pos} (${secretPlayer.unit})</div></div>
      ${outStatusBoxHTML}
      <div class="stat-box"><div class="stat-label">Unités spéc.</div><div class="stat-val">${formatSpecialTeams(secretPlayer)}</div></div>
      <div class="stat-box"><div class="stat-label">Âge</div><div class="stat-val">${secretPlayer.age} ans</div></div>
      <div class="stat-box"><div class="stat-label">Taille / Lancer</div><div class="stat-val">${secretPlayer.height} • ${secretPlayer.shoots}</div></div>
      <div class="stat-box"><div class="stat-label">Origine</div><div class="stat-val">${secretPlayer.hometown}</div></div>
    `;

    const revealSeasonStatsEl = document.getElementById("reveal-season-stats");
    if (revealStatsHeading) {
      revealStatsHeading.textContent = "Statistiques — Saison 2026-2027";
    }
    if (revealStatsToggle) {
      revealStatsToggle.querySelectorAll(".scope-toggle-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.scope === "season");
      });
    }
    revealSeasonStatsEl.innerHTML = buildSeasonStatsHTML(secretPlayer, true, "season");
  }

  if (resultCardTimer) {
    clearTimeout(resultCardTimer);
  }

  const revealCardNow = () => {
    resultCardTimer = null;
    if (isChallengeFinal) {
      setChallengeEndScreenVisibility(true);
    }
    resultCard.classList.remove("hidden");

    if (isChallengeFinal) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    let focusTarget = dailyBackToMenuBtn;
    if (!isDailyMode(activeGameMode)) {
      if (isChallengeFinal) {
        focusTarget = challengePlayAgainBtn;
      } else if (isChallenge && !session.runOver) {
        focusTarget = nextRoundBtn;
      } else {
        focusTarget = playAgainBtn;
      }
    }
    if (focusTarget && !focusTarget.classList.contains("hidden")) {
      focusTarget.focus({ preventScroll: true });
    }
  };

  if (!waitAnimation && isChallengeFinal) {
    revealCardNow();
  } else {
    const delay = activeGameMode === "speedrun"
      ? (waitAnimation ? 180 : 40)
      : (waitAnimation ? 650 : 60);
    resultCardTimer = setTimeout(revealCardNow, delay);
  }
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
  switchView("practice", "image-configure");
});

document.getElementById("menu-card-study").addEventListener("click", () => switchView("study"));
document.getElementById("menu-start-custom-btn").addEventListener("click", () => switchView("custom", "configure"));

document.getElementById("menu-start-survival-classic-btn").addEventListener("click", () => switchView("survival", "classic"));
document.getElementById("menu-start-survival-remix-btn").addEventListener("click", () => switchView("survival", "remix"));
document.getElementById("menu-start-survival-expert-btn").addEventListener("click", () => switchView("survival", "expert"));
document.getElementById("menu-start-survival-image-btn").addEventListener("click", () => switchView("survival", "image"));

document.getElementById("menu-start-speedrun-classic-btn").addEventListener("click", () => switchView("speedrun", "classic"));
document.getElementById("menu-start-speedrun-remix-btn").addEventListener("click", () => switchView("speedrun", "remix"));
document.getElementById("menu-start-speedrun-expert-btn").addEventListener("click", () => switchView("speedrun", "expert"));
document.getElementById("menu-start-speedrun-image-btn").addEventListener("click", () => switchView("speedrun", "image"));

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

navSurvivalTrigger.addEventListener("click", e => {
  e.stopPropagation();
  toggleNavDropdown(navSurvivalDropdown, navSurvivalMenu, navSurvivalTrigger);
});

navSpeedrunTrigger.addEventListener("click", e => {
  e.stopPropagation();
  toggleNavDropdown(navSpeedrunDropdown, navSpeedrunMenu, navSpeedrunTrigger);
});

navDailyMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    switchView(item.dataset.mode);
  });
});

navPracticeMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    const variant = item.dataset.practiceVariant;
    if (variant === "image") {
      switchView("practice", "image-configure");
      return;
    }
    if (sessions.practice.variant !== variant || !sessions.practice.secretPlayer) {
      startNewPracticeGame(variant);
    }
    switchView("practice", variant);
  });
});

navSurvivalMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    switchView("survival", item.dataset.survivalVariant);
  });
});

navSpeedrunMenu.querySelectorAll(".nav-dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    switchView("speedrun", item.dataset.speedrunVariant);
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
challengePlayAgainBtn.addEventListener("click", restartCurrentGameSameType);
challengeBackToMenuBtn.addEventListener("click", () => switchView("menu"));

nextRoundBtn.addEventListener("click", () => {
  if (activeGameMode === "survival") {
    advanceSurvivalRound();
  } else if (activeGameMode === "speedrun") {
    advanceSpeedrunRound();
  }
});

endSurvivalBtn.addEventListener("click", () => {
  const score = sessions.survival.score;
  confirmSurvivalMessage.textContent =
    `Veux-tu vraiment terminer cette partie de survie ? Ton score actuel (${score}) sera enregistré comme résultat final.`;
  confirmEndSurvivalModal.classList.remove("hidden");
});

closeConfirmSurvivalBtn.addEventListener("click", () => confirmEndSurvivalModal.classList.add("hidden"));
cancelEndSurvivalBtn.addEventListener("click", () => confirmEndSurvivalModal.classList.add("hidden"));
confirmEndSurvivalModal.addEventListener("click", e => {
  if (e.target === confirmEndSurvivalModal) confirmEndSurvivalModal.classList.add("hidden");
});
confirmEndSurvivalBtn.addEventListener("click", () => {
  confirmEndSurvivalModal.classList.add("hidden");
  endSurvivalRunManually();
});

studySearchInput.addEventListener("input", e => renderStudyDirectory(e.target.value));

inputEl.addEventListener("input", updateAutocomplete);
studyModeCheckbox.addEventListener("change", updateAutocomplete);

inputEl.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.repeat) {
    const firstItem = autocompleteEl.querySelector(".autocomplete-item:not(.disabled)");
    if (firstItem) {
      e.preventDefault();
      firstItem.click();
    }
  }
});

giveUpBtn.addEventListener("click", () => {
  if (isChallengeMode(activeGameMode)) return;
  const session = sessions[activeGameMode];
  if (!session.gameOver) finishSession("giveup");
});

rosterBtn.addEventListener("click", () => {
  if (activeGameMode === "survival") return;
  openRosterModal();
});
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
    confirmEndSurvivalModal.classList.add("hidden");
  }
});

applyImageGameBtn.addEventListener("click", () => {
  practiceImageRounds = pendingImageRounds;
  imageConfigPanel.classList.add("hidden");
  startNewPracticeGame("image");
});

cancelImageConfigBtn.addEventListener("click", () => {
  imageConfigPanel.classList.add("hidden");
});

customizeRoundsBtn.addEventListener("click", openImageConfigPanel);
endCustomizeRoundsBtn.addEventListener("click", openImageConfigPanel);

// Bascule Saison 26-27 / Carrière dans la carte de fin de partie
if (revealStatsToggle) {
  revealStatsToggle.querySelectorAll(".scope-toggle-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const session = sessions[activeGameMode];
      if (!session || !session.secretPlayer) return;
      const scope = btn.dataset.scope;

      revealStatsToggle.querySelectorAll(".scope-toggle-btn").forEach(b => {
        b.classList.toggle("active", b === btn);
      });

      if (revealStatsHeading) {
        revealStatsHeading.textContent =
          scope === "career"
            ? "Statistiques — Carrière LNH"
            : "Statistiques — Saison 2026-2027";
      }

      const revealSeasonStatsEl = document.getElementById("reveal-season-stats");
      revealSeasonStatsEl.innerHTML = buildSeasonStatsHTML(session.secretPlayer, true, scope);

      if (scope === "career" && typeof fetchPlayerCareerFromAPI === "function") {
        const updated = await fetchPlayerCareerFromAPI(session.secretPlayer);
        if (updated && btn.classList.contains("active")) {
          revealSeasonStatsEl.innerHTML = buildSeasonStatsHTML(session.secretPlayer, true, "career");
        }
      }
    });
  });
}

const statusModal = document.getElementById("status-modal");
const closeStatusModalBtn = document.getElementById("close-status-modal-btn");

function closeAdminModal() {
  if (statusModal) statusModal.classList.add("hidden");
  if (window.location.hash === "#admin") {
    window.history.replaceState(null, "", buildHashForRoute(currentView, null));
  }
}

if (closeStatusModalBtn) {
  closeStatusModalBtn.addEventListener("click", closeAdminModal);
}
if (statusModal) {
  statusModal.addEventListener("click", e => {
    if (e.target === statusModal) closeAdminModal();
  });
}

function checkAdminHash() {
  if (window.location.hash === "#admin") {
    openServiceStatusModal();
  }
}

window.addEventListener("hashchange", checkAdminHash);

// Initialisation au chargement
const isInitialAdmin = window.location.hash === "#admin";
const initialRoute = parseRouteFromHash(isInitialAdmin ? "#menu" : window.location.hash);
if (!isInitialAdmin) {
  window.history.replaceState(initialRoute, "", buildHashForRoute(initialRoute.target, initialRoute.option));
}
switchView(initialRoute.target, initialRoute.option, false);
if (isInitialAdmin) {
  openServiceStatusModal();
}

syncWithNHLAPI(false).then(() => {
  if (window.location.hash === "#admin" || (statusModal && !statusModal.classList.contains("hidden"))) {
    openServiceStatusModal();
  }
});