function normalizeStr(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

const POS_SORT_ORDER = { AG: 1, C: 2, AD: 3, D: 4, G: 5 };
const SHOOTS_SORT_ORDER = { G: 1, D: 2 };
const GROUP_SORT_ORDER = { ATT: 1, DEF: 2, GAR: 3 };

function sortPlayersForUnit(players) {
  return [...players].sort((a, b) => {
    const groupDiff = (GROUP_SORT_ORDER[a.posGroup] || 9) - (GROUP_SORT_ORDER[b.posGroup] || 9);
    if (groupDiff !== 0) return groupDiff;

    const numA = typeof a.number === "number" ? a.number : 999;
    const numB = typeof b.number === "number" ? b.number : 999;

    if (a.posGroup === "DEF") {
      const shootDiff = (SHOOTS_SORT_ORDER[a.shoots] || 9) - (SHOOTS_SORT_ORDER[b.shoots] || 9);
      if (shootDiff !== 0) return shootDiff;
      return numA - numB;
    }

    if (a.posGroup === "ATT") {
      const posDiff = (POS_SORT_ORDER[a.pos] || 9) - (POS_SORT_ORDER[b.pos] || 9);
      if (posDiff !== 0) return posDiff;
      const shootDiff = (SHOOTS_SORT_ORDER[a.shoots] || 9) - (SHOOTS_SORT_ORDER[b.shoots] || 9);
      if (shootDiff !== 0) return shootDiff;
      return numA - numB;
    }

    return numA - numB;
  });
}

// --- CONSTRUCTION DES GRILLES DE STATISTIQUES HTML ---
function buildSeasonStatsHTML(player, compact = false, scope = "season") {
  const st = (scope === "career" ? player.careerStats : player.stats) || player.stats || {};
  if (player.posGroup === "GAR") {
    const record = `${st.w ?? 0}-${st.l ?? 0}-${st.otl ?? 0}`;
    if (compact) {
      return `
        <div class="stat-box highlight-stat"><div class="stat-label">MJ</div><div class="stat-val">${st.gp ?? 0}</div></div>
        <div class="stat-box highlight-stat"><div class="stat-label">Fiche (V-D-DP)</div><div class="stat-val">${record}</div></div>
        <div class="stat-box highlight-stat"><div class="stat-label">MOY</div><div class="stat-val">${st.gaa ?? "—"}</div></div>
        <div class="stat-box highlight-stat"><div class="stat-label">% Arrêts</div><div class="stat-val">${st.svPct ?? "—"}</div></div>
        <div class="stat-box"><div class="stat-label">Blanchis&shy;sages</div><div class="stat-val">${st.so ?? 0}</div></div>
      `;
    }
    return `
      <div class="stat-box highlight-stat"><div class="stat-label">Matchs joués</div><div class="stat-val">${st.gp ?? 0}</div></div>
      <div class="stat-box"><div class="stat-label">Matchs débutés</div><div class="stat-val">${st.gs ?? 0}</div></div>
      <div class="stat-box highlight-stat"><div class="stat-label">Fiche (V-D-DP)</div><div class="stat-val">${record}</div></div>
      <div class="stat-box highlight-stat"><div class="stat-label">Moy. buts alloués</div><div class="stat-val">${st.gaa ?? "—"}</div></div>
      <div class="stat-box highlight-stat"><div class="stat-label">% d'arrêts</div><div class="stat-val">${st.svPct ?? "—"}</div></div>
      <div class="stat-box"><div class="stat-label">Blanchis&shy;sages</div><div class="stat-val">${st.so ?? 0}</div></div>
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

  const edgeSpeedsHTML = scope === "season"
    ? `
      <div class="stat-box"><div class="stat-label">Vitesse patinage</div><div class="stat-val">${st.skatingSpeed ?? "—"}</div></div>
      <div class="stat-box"><div class="stat-label">Vitesse de tir</div><div class="stat-val">${st.shotSpeed ?? "—"}</div></div>
    `
    : "";

  return `
    <div class="stat-box"><div class="stat-label">Matchs joués</div><div class="stat-val">${st.gp ?? 0}</div></div>
    <div class="stat-box highlight-stat"><div class="stat-label">Buts</div><div class="stat-val">${st.g ?? 0}</div></div>
    <div class="stat-box highlight-stat"><div class="stat-label">Passes</div><div class="stat-val">${st.a ?? 0}</div></div>
    <div class="stat-box highlight-stat"><div class="stat-label">Points</div><div class="stat-val">${st.pts ?? 0}</div></div>
    <div class="stat-box"><div class="stat-label">Différentiel (+/-)</div><div class="stat-val">${diffFormatted}</div></div>
    <div class="stat-box"><div class="stat-label">Punitions (PUN)</div><div class="stat-val">${st.pim ?? 0} min</div></div>
    <div class="stat-box"><div class="stat-label">Buts en AN</div><div class="stat-val">${st.ppg ?? 0}</div></div>
    <div class="stat-box"><div class="stat-label">Tirs au but</div><div class="stat-val">${st.shots ?? 0}</div></div>
    <div class="stat-box"><div class="stat-label">% de tir</div><div class="stat-val">${st.shPct ?? "—"}</div></div>
    <div class="stat-box"><div class="stat-label">Temps de glace</div><div class="stat-val">${st.toi ?? "—"}</div></div>
    <div class="stat-box"><div class="stat-label">% Mises au jeu</div><div class="stat-val">${st.fowPct ?? "—"}</div></div>
    <div class="stat-box"><div class="stat-label">Mises en échec</div><div class="stat-val">${st.hits ?? "—"}</div></div>
    <div class="stat-box"><div class="stat-label">Tirs bloqués</div><div class="stat-val">${st.blocks ?? "—"}</div></div>
    <div class="stat-box"><div class="stat-label">Revirements</div><div class="stat-val">${st.takeaways ?? "—"}</div></div>
    ${edgeSpeedsHTML}
  `;
}

// --- FENÊTRE MODALE 1 : LISTE DES JOUEURS EN PARTIE ---
function openRosterModal() {
  const rosterModal = document.getElementById("roster-modal");
  const rosterListContent = document.getElementById("roster-list-content");
  const modalHeaderTitle = rosterModal.querySelector(".modal-header h2");
  if (modalHeaderTitle) {
    modalHeaderTitle.textContent = `Alignement des Canadiens (${PLAYERS.length} joueurs)`;
  }

  const session = sessions[activeGameMode];
  const guessedSet = new Set(session.guesses);
  rosterListContent.innerHTML = "";

  UNITS_ORDER.forEach(unitName => {
    const unitPlayers = sortPlayersForUnit(PLAYERS.filter(p => p.unit === unitName));
    if (unitPlayers.length === 0) return;

    const sectionTitle = UNIT_SECTION_TITLES[unitName] || unitName;
    const section = document.createElement("div");
    section.innerHTML = `<div class="unit-group-title">${sectionTitle}</div>`;

    const grid = document.createElement("div");
    grid.className = "unit-players-grid";

    unitPlayers.forEach(player => {
      const isGuessed = guessedSet.has(player.id);
      const isSelectable = isPlayablePlayer(player) && !isGuessed && !session.gameOver;
      const ageLabel = typeof player.age === "number" ? `${player.age}a` : player.age;

      const card = document.createElement("div");
      card.className = `roster-player-card ${isSelectable ? "" : "already-guessed"}`;
      card.innerHTML = `
        <div class="roster-player-main">
          <span class="roster-num">#${player.number}</span>
          <span class="roster-name">${player.name}</span>
        </div>
        <span class="roster-meta">${player.pos} • ${ageLabel} • ${player.country}</span>
      `;

      if (isSelectable) {
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

// --- VUE ÉTUDE ---
function renderStudyDirectory(filterText = "") {
  const studyDirectoryContent = document.getElementById("study-directory-content");
  const query = normalizeStr(filterText.trim());
  studyDirectoryContent.innerHTML = "";

  UNITS_ORDER.forEach(unitName => {
    const unitPlayers = sortPlayersForUnit(
      PLAYERS.filter(p => {
        if (p.unit !== unitName) return false;
        if (!query) return true;
        const specStr = formatSpecialTeams(p);
        const outStatusStr = getPlayerOutStatus(p) || "";
        return (
          normalizeStr(p.name).includes(query) ||
          String(p.number).includes(query) ||
          normalizeStr(p.pos).includes(query) ||
          normalizeStr(p.unit).includes(query) ||
          normalizeStr(specStr).includes(query) ||
          normalizeStr(outStatusStr).includes(query)
        );
      })
    );

    if (unitPlayers.length === 0) return;

    const sectionTitle = UNIT_SECTION_TITLES[unitName] || unitName;
    const section = document.createElement("div");
    section.innerHTML = `<div class="unit-group-title">${sectionTitle}</div>`;

    const grid = document.createElement("div");
    grid.className = "study-cards-grid";

    unitPlayers.forEach(player => {
      const card = document.createElement("div");
      card.className = "study-player-card";
      const mugUrl = getPlayerPhotoUrl(player);
      const fallbackUrl = getPlayerFallbackPhotoUrl(player);
      const specText = formatSpecialTeams(player);
      const outStatus = getPlayerOutStatus(player);
      const outBadgeHTML = outStatus
        ? `<div class="study-status-row"><span class="out-status-badge ${outStatus === "Blessé" ? "injured" : "scratched"}">${outStatus}</span></div>`
        : "";

      card.innerHTML = `
        <img class="study-avatar" src="${mugUrl}" alt="${player.name}" onerror="this.onerror=null;this.src='${fallbackUrl}';" />
        <div class="study-info">
          <div class="study-info-top">
            <span class="roster-num">#${player.number}</span>
            <h4>${player.name}</h4>
          </div>
          ${outBadgeHTML}
          <div class="study-specs">
            ${player.pos} • ${player.age} ans • Lancer ${player.shoots} • Unités spéc. : ${specText}
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
  const studyProfileModal = document.getElementById("study-profile-modal");
  const profileModalTitle = document.getElementById("profile-modal-title");
  const profileModalBody = document.getElementById("profile-modal-body");

  const mugUrl = getPlayerPhotoUrl(player);
  const fallbackUrl = getPlayerFallbackPhotoUrl(player);
  const specText = formatSpecialTeams(player);

  const outStatus = getPlayerOutStatus(player);
  const unitBadgeClass = outStatus
    ? (outStatus === "Blessé" ? "status-injured" : "status-scratched")
    : "";
  const unitBadgeText = outStatus || player.unit;
  const unitDetailText = outStatus ? `${player.unit} • ${outStatus}` : player.unit;

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
          <span class="profile-unit-badge ${unitBadgeClass}">${unitBadgeText}</span>
        </div>
        <p class="profile-bio-note">${player.note}</p>
      </div>
    </div>

    <div>
      <div class="profile-section-title">Informations de base</div>
      <div class="stats-grid">
        <div class="stat-box"><div class="stat-label">Position</div><div class="stat-val">${player.pos} (${player.posGroup})</div></div>
        <div class="stat-box"><div class="stat-label">Unité (${player.unitGroup})</div><div class="stat-val">${unitDetailText}</div></div>
        <div class="stat-box highlight-stat"><div class="stat-label">Unités spéciales</div><div class="stat-val">${specText}</div></div>
        <div class="stat-box"><div class="stat-label">Âge</div><div class="stat-val">${player.age} ans</div></div>
        <div class="stat-box"><div class="stat-label">Taille / Poids</div><div class="stat-val">${player.height} • ${player.weight} lb</div></div>
        <div class="stat-box"><div class="stat-label">Lancer</div><div class="stat-val">${player.shoots === "G" ? "Gauche (G)" : "Droite (D)"}</div></div>
        <div class="stat-box"><div class="stat-label">Origine</div><div class="stat-val">${player.hometown} (${player.country})</div></div>
      </div>
    </div>

    <div>
      <div class="profile-section-header-row">
        <div class="profile-section-title" id="profile-stats-heading">Statistiques complètes — Saison 2026-2027</div>
        <div class="stats-scope-toggle" id="profile-stats-toggle" role="group" aria-label="Période des statistiques">
          <button type="button" class="scope-toggle-btn active" data-scope="season">Saison 26-27</button>
          <button type="button" class="scope-toggle-btn" data-scope="career">Carrière</button>
        </div>
      </div>
      <div class="stats-grid season-stats-grid" id="profile-season-stats-grid">
        ${buildSeasonStatsHTML(player, false, "season")}
      </div>
    </div>
  `;

  const toggleContainer = profileModalBody.querySelector("#profile-stats-toggle");
  const statsHeading = profileModalBody.querySelector("#profile-stats-heading");
  const statsGrid = profileModalBody.querySelector("#profile-season-stats-grid");

  toggleContainer.querySelectorAll(".scope-toggle-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const scope = btn.dataset.scope;
      toggleContainer.querySelectorAll(".scope-toggle-btn").forEach(b => {
        b.classList.toggle("active", b === btn);
      });
      statsHeading.textContent =
        scope === "career"
          ? "Statistiques complètes — Carrière LNH"
          : "Statistiques complètes — Saison 2026-2027";
      statsGrid.innerHTML = buildSeasonStatsHTML(player, false, scope);

      if (scope === "career" && typeof fetchPlayerCareerFromAPI === "function") {
        const updated = await fetchPlayerCareerFromAPI(player);
        if (updated && btn.classList.contains("active")) {
          statsGrid.innerHTML = buildSeasonStatsHTML(player, false, "career");
        }
      }
    });
  });

  const heroPhotoContainer = profileModalBody.querySelector(".profile-hero-photo");
  setupXhekajEasterEgg(heroPhotoContainer, player);

  studyProfileModal.classList.remove("hidden");
}

// --- FENÊTRE MODALE 3 : TABLEAU DE BORD #ADMIN ---
const adminDispatchState = {
  running: false,
  message: "",
  tone: "neutral" // "neutral" | "ok" | "err"
};

function setAdminDispatchMessage(message, tone = "neutral") {
  adminDispatchState.message = message;
  adminDispatchState.tone = tone;

  const statusEl = document.getElementById("admin-dispatch-status");
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = `admin-dispatch-status ${tone}`;
  statusEl.classList.toggle("hidden", !message);
}

function openServiceStatusModal() {
  const statusModal = document.getElementById("status-modal");
  const statusModalBody = document.getElementById("status-modal-body");
  if (!statusModal || !statusModalBody) return;

  const renderBadge = ok =>
    ok
      ? `<span class="status-pill ok">● Opérationnel</span>`
      : `<span class="status-pill err">● Hors ligne / Fallback</span>`;

  const formattedDate = SERVICE_STATUS.lastUpdated
    ? new Date(SERVICE_STATUS.lastUpdated).toLocaleString("fr-CA")
    : "Non disponible (données locales)";

  const injuredPlayers = PLAYERS
    .filter(p => p.unit === INJURED_UNIT)
    .map(p => `${p.name} (${getPlayerOutStatus(p)})`);
  const storedToken = typeof getStoredGitHubToken === "function" ? getStoredGitHubToken() : "";
  const hasToken = Boolean(storedToken);
  const maskedHint = hasToken ? `Jeton enregistré (••••${storedToken.slice(-4)})` : "Colle ton Fine-grained PAT GitHub";

  statusModalBody.innerHTML = `
    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-label">Source de données active</div>
        <div class="stat-val">${SERVICE_STATUS.source}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Dernière mise à jour (GitHub Actions)</div>
        <div class="stat-val">${formattedDate}</div>
      </div>
    </div>

    <div class="admin-dispatch-panel">
      <div class="admin-dispatch-header">
        <div class="stat-label">Mise à jour manuelle — GitHub Actions (update-nhl.yml)</div>
        <span class="status-pill ${hasToken ? "ok" : "err"}">
          ${hasToken ? "● Jeton configuré" : "● Jeton requis"}
        </span>
      </div>

      <div class="admin-token-row">
        <input
          type="password"
          id="admin-github-token-input"
          class="admin-token-input"
          placeholder="${maskedHint}"
          autocomplete="off"
          spellcheck="false"
        />
        <button type="button" id="admin-save-token-btn" class="secondary-btn">Enregistrer</button>
        ${hasToken ? `<button type="button" id="admin-clear-token-btn" class="danger-btn">Effacer</button>` : ""}
      </div>

      <div class="admin-dispatch-actions">
        <button
          type="button"
          id="admin-trigger-action-btn"
          class="primary-btn"
          ${!hasToken || adminDispatchState.running ? "disabled" : ""}
        >
          ${adminDispatchState.running ? "Mise à jour en cours..." : "Déclencher la mise à jour GitHub"}
        </button>
        <button
          type="button"
          id="admin-fast-reload-btn"
          class="secondary-btn"
          ${adminDispatchState.running ? "disabled" : ""}
          title="Télécharge immédiatement le dernier nhl-data.json commité sans attendre GitHub Pages"
        >
          Recharger depuis GitHub
        </button>
      </div>

      <div id="admin-dispatch-status" class="admin-dispatch-status hidden"></div>
    </div>

    <table class="status-table">
      <thead>
        <tr>
          <th>Service / Source</th>
          <th>État</th>
          <th>Détails</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>API LNH — Alignement & Positions</strong><br><small>api-web.nhle.com/v1/roster/MTL/current</small></td>
          <td>${renderBadge(SERVICE_STATUS.nhlRoster?.ok)}</td>
          <td>${SERVICE_STATUS.nhlRoster?.detail || "—"}</td>
        </tr>
        <tr>
          <td><strong>API LNH — Statistiques Saison</strong><br><small>api-web.nhle.com/v1/club-stats/MTL/now</small></td>
          <td>${renderBadge(SERVICE_STATUS.nhlStats?.ok)}</td>
          <td>${SERVICE_STATUS.nhlStats?.detail || "—"}</td>
        </tr>
        <tr>
          <td><strong>API LNH — Statistiques Carrière</strong><br><small>api-web.nhle.com/v1/player/{id}/landing</small></td>
          <td>${renderBadge(SERVICE_STATUS.nhlCareer?.ok)}</td>
          <td>${SERVICE_STATUS.nhlCareer?.detail || "—"}</td>
        </tr>
        <tr>
          <td><strong>API LNH — Stats temps réel</strong><br><small>api.nhle.com/stats/rest/en/skater/realtime</small></td>
          <td>${renderBadge(SERVICE_STATUS.nhlRealtime?.ok)}</td>
          <td>${SERVICE_STATUS.nhlRealtime?.detail || "—"}</td>
        </tr>
        <tr>
          <td><strong>API LNH — NHL EDGE (Vitesses)</strong><br><small>api-web.nhle.com/v1/edge/skater-detail/{id}/now</small></td>
          <td>${renderBadge(SERVICE_STATUS.nhlEdge?.ok)}</td>
          <td>${SERVICE_STATUS.nhlEdge?.detail || "—"}</td>
        </tr>
        <tr>
          <td><strong>Daily Faceoff — Trios, SN/IN & Blessés</strong><br><small>dailyfaceoff.com/.../line-combinations</small></td>
          <td>${renderBadge(SERVICE_STATUS.dailyFaceoff?.ok)}</td>
          <td>${SERVICE_STATUS.dailyFaceoff?.detail || "—"}</td>
        </tr>
      </tbody>
    </table>

    <div class="stat-box">
      <div class="stat-label">Joueurs actuellement dans « Blessés / Hors de l'alignement » (${injuredPlayers.length})</div>
      <div class="stat-val">${injuredPlayers.length > 0 ? injuredPlayers.join(", ") : "Aucun joueur hors alignement"}</div>
    </div>
  `;

  if (adminDispatchState.message) {
    setAdminDispatchMessage(adminDispatchState.message, adminDispatchState.tone);
  }

  const tokenInput = document.getElementById("admin-github-token-input");
  const saveTokenBtn = document.getElementById("admin-save-token-btn");
  const clearTokenBtn = document.getElementById("admin-clear-token-btn");
  const triggerBtn = document.getElementById("admin-trigger-action-btn");
  const fastReloadBtn = document.getElementById("admin-fast-reload-btn");

  if (saveTokenBtn && tokenInput) {
    saveTokenBtn.addEventListener("click", () => {
      const val = tokenInput.value.trim();
      if (!val) {
        setAdminDispatchMessage("Colle un jeton valide avant d'enregistrer.", "err");
        return;
      }
      saveStoredGitHubToken(val);
      adminDispatchState.message = "Jeton enregistré localement dans ce navigateur.";
      adminDispatchState.tone = "ok";
      openServiceStatusModal();
    });
  }

  if (clearTokenBtn) {
    clearTokenBtn.addEventListener("click", () => {
      saveStoredGitHubToken("");
      adminDispatchState.message = "Jeton supprimé de ce navigateur.";
      adminDispatchState.tone = "neutral";
      openServiceStatusModal();
    });
  }

  if (triggerBtn) {
    triggerBtn.addEventListener("click", async () => {
      if (adminDispatchState.running) return;
      adminDispatchState.running = true;
      triggerBtn.disabled = true;
      if (fastReloadBtn) fastReloadBtn.disabled = true;
      triggerBtn.textContent = "Mise à jour en cours...";

      try {
        const res = await triggerGitHubWorkflowUpdate(msg => {
          setAdminDispatchMessage(msg, "neutral");
        });
        adminDispatchState.running = false;
        adminDispatchState.message =
          `Mise à jour terminée (run #${res.runNumber}, commit ${res.sha.slice(0, 7)}). Données chargées immédiatement.`;
        adminDispatchState.tone = "ok";
        openServiceStatusModal();
      } catch (err) {
        adminDispatchState.running = false;
        adminDispatchState.message = err?.message || "Erreur inconnue lors du déclenchement.";
        adminDispatchState.tone = "err";
        openServiceStatusModal();
      }
    });
  }

  if (fastReloadBtn) {
    fastReloadBtn.addEventListener("click", async () => {
      if (adminDispatchState.running) return;
      adminDispatchState.running = true;
      if (triggerBtn) triggerBtn.disabled = true;
      fastReloadBtn.disabled = true;
      setAdminDispatchMessage("Téléchargement rapide de nhl-data.json depuis GitHub...", "neutral");

      try {
        const res = await loadLatestDataFromGitHubRaw();
        adminDispatchState.running = false;
        adminDispatchState.message =
          `Dernier nhl-data.json chargé depuis GitHub (commit ${res.sha.slice(0, 7)}).`;
        adminDispatchState.tone = "ok";
        openServiceStatusModal();
      } catch (err) {
        adminDispatchState.running = false;
        adminDispatchState.message = err?.message || "Impossible de recharger depuis GitHub.";
        adminDispatchState.tone = "err";
        openServiceStatusModal();
      }
    });
  }

  statusModal.classList.remove("hidden");
}

// --- COMPTE À REBOURS DE MINUIT ---
function updateDailyCountdown() {
  const dailyCountdownEl = document.getElementById("daily-countdown");
  if (!dailyCountdownEl) return;

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

// --- EASTER EGG ARBER XHEKAJ (#72) ---
const ARBER_XHEKAJ_ID = 8482964;
const XHEKAJ_UNLOCK_CLICKS = 11;
const CH_RED_RGB = { r: 175, g: 30, b: 45 };
const TARGET_PINK_RGB = { r: 255, g: 92, b: 168 };

function getInterpolatedPink(step, maxSteps) {
  const ratio = Math.min(1, Math.max(0, step / maxSteps));
  const r = Math.round(CH_RED_RGB.r + (TARGET_PINK_RGB.r - CH_RED_RGB.r) * ratio);
  const g = Math.round(CH_RED_RGB.g + (TARGET_PINK_RGB.g - CH_RED_RGB.g) * ratio);
  const b = Math.round(CH_RED_RGB.b + (TARGET_PINK_RGB.b - CH_RED_RGB.b) * ratio);
  return { css: `rgb(${r}, ${g}, ${b})`, ratio };
}

function spawnXhekajHearts(containerEl, clickEvent) {
  const rect = containerEl.getBoundingClientRect();
  const originX = clickEvent?.clientX || rect.left + rect.width / 2;
  const originY = clickEvent?.clientY || rect.top + rect.height / 2;

  const shades = ["#ff5ca8", "#ff7eb9", "#ff3b94", "#ff9ec9", "#ff4da6"];
  const heartCount = 7 + Math.floor(Math.random() * 4);

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.className = "xhekaj-heart-particle";

    const size = 14 + Math.random() * 12;
    const color = shades[Math.floor(Math.random() * shades.length)];

    heart.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;

    document.body.appendChild(heart);

    let x = originX - size / 2 + (Math.random() - 0.5) * 50;
    let y = originY - size / 2 + (Math.random() - 0.5) * 30;

    let vx = (Math.random() - 0.5) * 2.2;
    let vy = -1.2 - Math.random() * 2.0;
    const gravity = 0.065 + Math.random() * 0.025;
    const swaySpeed = 0.04 + Math.random() * 0.03;
    const swayAmp = 0.45 + Math.random() * 0.55;
    const swayPhase = Math.random() * Math.PI * 2;

    let rotation = (Math.random() - 0.5) * 30;
    const rotationSpeed = (Math.random() - 0.5) * 1.4;

    const maxOpacity = 0.65 + Math.random() * 0.2;
    const duration = 1600 + Math.random() * 700;
    const startTime = performance.now();
    let frame = 0;

    function animateHeart(now) {
      const elapsed = now - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        heart.remove();
        return;
      }

      frame++;
      vy += gravity;
      x += vx + Math.sin(frame * swaySpeed + swayPhase) * swayAmp;
      y += vy;
      rotation += rotationSpeed;

      const opacity =
        progress < 0.65
          ? maxOpacity
          : maxOpacity * (1 - (progress - 0.65) / 0.35);

      heart.style.opacity = String(Math.max(0, opacity));
      heart.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      heart.style.left = "0px";
      heart.style.top = "0px";

      requestAnimationFrame(animateHeart);
    }

    requestAnimationFrame(animateHeart);
  }
}

function setupXhekajEasterEgg(photoContainer, player) {
  if (!photoContainer) return;

  if (photoContainer._xhekajFadeTimer) {
    clearTimeout(photoContainer._xhekajFadeTimer);
  }
  photoContainer.classList.remove("xhekaj-photo-interactive", "xhekaj-pink-locked");
  photoContainer.style.borderColor = "";
  photoContainer.style.boxShadow = "";
  photoContainer.style.transition = "";
  photoContainer.onclick = null;

  if (!player || player.id !== ARBER_XHEKAJ_ID) return;

  let clickCount = 0;
  photoContainer.classList.add("xhekaj-photo-interactive");

  photoContainer.onclick = e => {
    clickCount++;

    if (photoContainer._xhekajFadeTimer) {
      clearTimeout(photoContainer._xhekajFadeTimer);
    }

    if (clickCount < XHEKAJ_UNLOCK_CLICKS) {
      const { css, ratio } = getInterpolatedPink(clickCount, XHEKAJ_UNLOCK_CLICKS);

      photoContainer.style.transition = "border-color 0.06s ease, box-shadow 0.06s ease, transform 0.1s ease";
      photoContainer.style.borderColor = css;
      photoContainer.style.boxShadow = `0 0 ${6 + clickCount}px rgba(255, 92, 168, ${(ratio * 0.55).toFixed(2)})`;

      photoContainer._xhekajFadeTimer = setTimeout(() => {
        photoContainer.style.transition = "border-color 0.55s ease, box-shadow 0.55s ease, transform 0.12s ease";
        photoContainer.style.borderColor = "";
        photoContainer.style.boxShadow = "";
      }, 260);
    } else {
      photoContainer.style.transition = "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.12s ease";
      photoContainer.classList.add("xhekaj-pink-locked");
      spawnXhekajHearts(photoContainer, e);
    }
  };
}