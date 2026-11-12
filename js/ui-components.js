function normalizeStr(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
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

// --- FENÊTRE MODALE 1 : LISTE DES JOUEURS EN PARTIE ---
function openRosterModal() {
  const rosterModal = document.getElementById("roster-modal");
  const rosterListContent = document.getElementById("roster-list-content");
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

// --- VUE ÉTUDE ---
function renderStudyDirectory(filterText = "") {
  const studyDirectoryContent = document.getElementById("study-directory-content");
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
      const mugUrl = getPlayerPhotoUrl(player);
      const fallbackUrl = getPlayerFallbackPhotoUrl(player);

      card.innerHTML = `
        <img class="study-avatar" src="${mugUrl}" alt="${player.name}" onerror="this.onerror=null;this.src='${fallbackUrl}';" />
        <div class="study-info">
          <div class="study-info-top">
            <span class="roster-num">#${player.number}</span>
            <h4>${player.name}</h4>
          </div>
          <div class="study-specs">
            ${player.pos} • ${player.age} ans • Lancer ${player.shoots} • ${player.height} • ${player.weight} lb • ${player.country}
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
        <div class="stat-box"><div class="stat-label">Poids</div><div class="stat-val">${player.weight} lb</div></div>
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

  const heroPhotoContainer = profileModalBody.querySelector(".profile-hero-photo");
  setupXhekajEasterEgg(heroPhotoContainer, player);

  studyProfileModal.classList.remove("hidden");
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