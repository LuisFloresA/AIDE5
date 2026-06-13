// VectorQuest - Lógica Principal del Juego
// Diseñado para 7° y 8° Básico (Chile)

// Audio Synthesizer using Web Audio API
const SoundEffects = {
  ctx: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  playBeep() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  },

  playLaser() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  },

  playRescue() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const playNote = (freq, start, duration) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.08, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.start(start);
      osc.stop(start + duration);
    };

    playNote(523.25, now, 0.15); // C5
    playNote(659.25, now + 0.1, 0.15); // E5
    playNote(783.99, now + 0.2, 0.15); // G5
    playNote(1046.50, now + 0.3, 0.3); // C6
  },

  playExplosion() {
    this.init();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.5; // 0.5s duration
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.4);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    noise.start();
    noise.stop(this.ctx.currentTime + 0.5);
  },

  playWinFanfare() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major scale ascending
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.08, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.4);
    });
  },

  playFailSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [392.00, 349.23, 311.13, 261.63]; // Descending sad tone
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.18);
      gain.gain.setValueAtTime(0.1, now + idx * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.3);
      osc.start(now + idx * 0.18);
      osc.stop(now + idx * 0.18 + 0.3);
    });
  },

  playEpicVictoryTheme() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // A majestic arpeggiated victory theme
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C Major
      [293.66, 349.23, 440.00, 587.33], // D Minor
      [349.23, 440.00, 523.25, 698.46], // F Major
      [392.00, 493.88, 587.33, 783.99, 987.77] // G Major/G7 resolving to C
    ];

    let time = now;
    chords.forEach((chord, chordIdx) => {
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        const noteStart = time + idx * 0.08;
        const noteDuration = 0.4;
        
        osc.type = chordIdx === 3 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(0.06, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDuration);
        
        osc.start(noteStart);
        osc.stop(noteStart + noteDuration);
      });
      time += 0.5;
    });

    setTimeout(() => {
      const finalChord = [523.25, 659.25, 783.99, 1046.50];
      finalChord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 1.2);
      });
    }, 2000);
  }
};

// SVG Assets Repository
const SvgAssets = {
  getShipPath(avatarType) {
    switch(avatarType) {
      case "ship-magenta":
        return `<path d="M 0 -22 L 15 12 L 6 10 L 0 20 L -6 10 L -15 12 Z" fill="#bd00ff" stroke="#fff" stroke-width="1.5"/>
                <circle cx="0" cy="-2" r="4.5" fill="#fff" opacity="0.9"/>`;
      case "ship-green":
        return `<path d="M 0 -22 L 13 -7 L 13 13 L 0 7 L -13 13 L -13 -7 Z" fill="#39ff14" stroke="#fff" stroke-width="1.5"/>
                <line x1="-10" y1="-7" x2="10" y2="-7" stroke="#fff" stroke-width="1.5"/>`;
      case "ship-orange":
        return `<path d="M 0 -22 L 14 5 L 8 13 L -8 13 L -14 5 Z" fill="#ff7700" stroke="#fff" stroke-width="1.5"/>
                <polygon points="0,-17 8,-2 -8,-2" fill="#fff" opacity="0.5"/>`;
      case "ship-blue":
      default:
        return `<path d="M 0 -22 L 14 12 L 0 4 L -14 12 Z" fill="#00f0ff" stroke="#fff" stroke-width="1.5"/>
                <polygon points="0,-12 4,4 0,2 -4,4" fill="#fff" opacity="0.8"/>`;
    }
  },
  
  getAsteroidPath() {
    return `<polygon points="0,-18 13,-12 18,3 9,16 -7,18 -16,6 -12,-12" fill="#2d3748" stroke="#ff003c" stroke-width="1.5" />
            <path d="M -5 -5 L -9 -10 M 2 5 L 10 12 M -6 8 L -12 12 M 5 -5 L 12 -3" stroke="#ff4d4d" stroke-width="1" />
            <circle cx="-12" cy="-12" r="1" fill="#ff003c" opacity="0.8"/>
            <circle cx="9" cy="16" r="1.5" fill="#ff003c" opacity="0.8"/>`;
  },
  
  getAstronautPath() {
    return `<g class="svg-astronaut">
              <!-- Helmet -->
              <circle cx="0" cy="0" r="12" fill="#e2e8f0" stroke="#bd00ff" stroke-width="1.5"/>
              <!-- Visor -->
              <ellipse cx="0" cy="-2" rx="8" ry="5" fill="#1a202c" stroke="#00f0ff" stroke-width="1"/>
              <ellipse cx="-3" cy="-4" rx="2" ry="1.2" fill="#fff" opacity="0.7"/>
              <!-- Backpack -->
              <rect x="-16" y="-8" width="5" height="16" rx="2" fill="#cbd5e0" />
              <!-- Chest piece details -->
              <rect x="-5" y="6" width="10" height="6" fill="#a0aec0" rx="1"/>
              <circle cx="-2" cy="9" r="1" fill="#ff003c"/>
              <circle cx="2" cy="9" r="1" fill="#39ff14"/>
            </g>`;
  },

  getPortalPath() {
    return `<g class="svg-portal">
              <circle cx="0" cy="0" r="18" fill="none" stroke="#39ff14" stroke-width="2.5" stroke-dasharray="8,4"/>
              <circle cx="0" cy="0" r="13" fill="none" stroke="#39ff14" stroke-width="1.5" stroke-dasharray="4,2" opacity="0.8"/>
              <circle cx="0" cy="0" r="6" fill="#39ff14" opacity="0.3"/>
              <!-- Swirl effects -->
              <path d="M-15 0 A15 15 0 0 1 15 0" stroke="#39ff14" stroke-width="1.5" fill="none" opacity="0.9"/>
              <path d="M15 0 A15 15 0 0 1 -15 0" stroke="#39ff14" stroke-width="1.5" fill="none" opacity="0.9"/>
            </g>`;
  }
};

// Core Game Controller
const Game = {
  // Game States
  player: {
    nickname: "",
    avatar: "ship-blue",
    levelsProgress: [1], // Level 1 is unlocked initially
    totalScore: 0
  },
  currentLevel: null,
  currentLevelIndex: 0,
  shipState: {
    x: 0,
    y: 0,
    rotation: 0 // Degrees, 0 is pointing up (+Y)
  },
  plannedPath: [], // Array of {x, y} vectors
  levelTimer: 0,
  timerInterval: null,
  isSimulating: false,
  score: 0,
  svgSize: 500,
  svgPadding: 45,

  init() {
    this.loadPlayerData();
    this.bindEvents();
    this.updateLeaderboard();
    this.updateLevelSelectionUI();
    this.showScreen("screen-register");
  },

  loadPlayerData() {
    const saved = localStorage.getItem("vectorquest_player");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.player.nickname = parsed.nickname || "";
        this.player.avatar = parsed.avatar || "ship-blue";
        this.player.levelsProgress = parsed.levelsProgress || [1];
        this.player.totalScore = parsed.totalScore || 0;

        document.getElementById("player-nickname").value = this.player.nickname;
        const avatars = document.querySelectorAll(".avatar-option");
        avatars.forEach(av => {
          av.classList.remove("active");
          if (av.dataset.avatar === this.player.avatar) {
            av.classList.add("active");
          }
        });
      } catch (e) {
        console.error("Failed to load player data", e);
      }
    }
  },

  savePlayerData() {
    localStorage.setItem("vectorquest_player", JSON.stringify(this.player));
  },

  bindEvents() {
    // 1. Welcome Screen
    const avatars = document.querySelectorAll(".avatar-option");
    avatars.forEach(av => {
      av.addEventListener("click", () => {
        SoundEffects.playBeep();
        avatars.forEach(a => a.classList.remove("active"));
        av.classList.add("active");
        this.player.avatar = av.dataset.avatar;
      });
    });

    document.getElementById("btn-start-game").addEventListener("click", () => {
      let nick = document.getElementById("player-nickname").value.trim();
      if (!nick) {
        nick = "Piloto Alfa";
      }
      this.player.nickname = nick;
      this.savePlayerData();
      SoundEffects.playBeep();
      this.showScreen("screen-levels");
      this.updateLevelSelectionUI();
    });

    document.getElementById("btn-back-to-register").addEventListener("click", () => {
      SoundEffects.playBeep();
      this.showScreen("screen-register");
    });

    // 2. Level selection
    document.querySelectorAll(".btn-level").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const lvlId = parseInt(btn.dataset.level);
        if (this.player.levelsProgress.includes(lvlId)) {
          SoundEffects.playBeep();
          this.loadLevel(lvlId - 1);
        }
      });
    });

    document.getElementById("btn-to-levels").addEventListener("click", () => {
      if (this.isSimulating) return;
      SoundEffects.playBeep();
      this.stopTimer();
      this.showScreen("screen-levels");
      this.updateLevelSelectionUI();
    });

    // 3. Control Panel Inputs
    const dxInput = document.getElementById("vector-x");
    const dyInput = document.getElementById("vector-y");

    const updateFormulaPreview = () => {
      const dx = parseInt(dxInput.value) || 0;
      const dy = parseInt(dyInput.value) || 0;
      document.getElementById("formula-preview-math").innerText = `\\vec{v} = (${dx}, ${dy})`;
      
      // Update directions
      const dirX = document.getElementById("direction-x");
      const dirY = document.getElementById("direction-y");

      if (dx > 0) { dirX.innerText = `➡ ${dx} Derecha`; dirX.className = "input-direction-text dir-pos"; }
      else if (dx < 0) { dirX.innerText = `⬅ ${Math.abs(dx)} Izquierda`; dirX.className = "input-direction-text dir-neg"; }
      else { dirX.innerText = "Estacionario"; dirX.className = "input-direction-text dir-zero"; }

      if (dy > 0) { dirY.innerText = `⬆ ${dy} Arriba`; dirY.className = "input-direction-text dir-pos"; }
      else if (dy < 0) { dirY.innerText = `⬇ ${Math.abs(dy)} Abajo`; dirY.className = "input-direction-text dir-neg"; }
      else { dirY.innerText = "Estacionario"; dirY.className = "input-direction-text dir-zero"; }
    };

    dxInput.addEventListener("input", updateFormulaPreview);
    dyInput.addEventListener("input", updateFormulaPreview);

    // Spinner buttons
    document.querySelectorAll(".btn-spin").forEach(btn => {
      btn.addEventListener("click", () => {
        SoundEffects.playBeep();
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        let val = parseInt(input.value) || 0;
        const min = parseInt(input.min);
        const max = parseInt(input.max);

        if (btn.classList.contains("btn-spin-up")) {
          if (val < max) val++;
        } else {
          if (val > min) val--;
        }
        input.value = val;
        updateFormulaPreview();
      });
    });

    // Add Vector button
    document.getElementById("btn-add-vector").addEventListener("click", () => {
      if (this.isSimulating) return;
      SoundEffects.playBeep();
      
      const dx = parseInt(dxInput.value) || 0;
      const dy = parseInt(dyInput.value) || 0;
      
      if (dx === 0 && dy === 0) {
        alert("¡Ingresa un vector con al menos una componente distinta de cero!");
        return;
      }

      // Check bounds
      const projected = this.getProjectedCoordinates();
      const nextX = projected.x + dx;
      const nextY = projected.y + dy;
      const limit = this.currentLevel.gridSize;

      if (Math.abs(nextX) > limit || Math.abs(nextY) > limit) {
        alert(`¡Alerta de Navegación! Ese vector sacará tu nave del rango del radar (rango permitido: de -${limit} a ${limit}).`);
        return;
      }

      this.plannedPath.push({ x: dx, y: dy });
      this.updateQueueUI();
      this.drawMap();
      
      // Reset inputs
      dxInput.value = 0;
      dyInput.value = 0;
      updateFormulaPreview();
    });

    // Clear route button
    document.getElementById("btn-clear-route").addEventListener("click", () => {
      if (this.isSimulating) return;
      SoundEffects.playBeep();
      this.plannedPath = [];
      this.updateQueueUI();
      this.drawMap();
    });

    // Run Simulation button
    document.getElementById("btn-run-simulation").addEventListener("click", () => {
      if (this.isSimulating) return;
      if (this.plannedPath.length === 0) {
        alert("¡Primero agrega al menos un vector para trazar tu ruta!");
        return;
      }
      this.runSimulation();
    });

    // Hints
    document.getElementById("btn-show-hint").addEventListener("click", () => {
      SoundEffects.playBeep();
      this.showHintModal(this.currentLevel.hint);
    });

    document.getElementById("btn-close-hint").addEventListener("click", () => {
      SoundEffects.playBeep();
      this.closeModal("modal-hint");
    });

    // Fail Modal
    document.getElementById("btn-fail-hint").addEventListener("click", () => {
      SoundEffects.playBeep();
      this.closeModal("modal-fail");
      this.showHintModal(this.currentLevel.hint);
    });

    document.getElementById("btn-fail-retry").addEventListener("click", () => {
      SoundEffects.playBeep();
      this.closeModal("modal-fail");
      this.resetLevelState();
    });

    // Success Modal
    document.getElementById("btn-success-retry").addEventListener("click", () => {
      SoundEffects.playBeep();
      this.closeModal("modal-success");
      this.resetLevelState();
    });

    document.getElementById("btn-success-next").addEventListener("click", () => {
      SoundEffects.playBeep();
      this.closeModal("modal-success");
      if (this.currentLevelIndex + 1 < LEVELS.length) {
        this.loadLevel(this.currentLevelIndex + 1);
      } else {
        this.showScreen("screen-levels");
        this.updateLevelSelectionUI();
      }
    });

    // Epic Victory Modal Buttons
    document.getElementById("btn-epic-restart").addEventListener("click", () => {
      SoundEffects.playBeep();
      this.closeModal("modal-epic-victory");
      
      // Clear stars
      for (let i = 1; i <= LEVELS.length; i++) {
        localStorage.removeItem(`vectorquest_level_stars_${i}`);
      }
      
      this.player.levelsProgress = [1];
      this.player.totalScore = 0;
      this.savePlayerData();
      
      this.showScreen("screen-levels");
      this.updateLevelSelectionUI();
    });

    document.getElementById("btn-epic-leaderboard").addEventListener("click", () => {
      SoundEffects.playBeep();
      this.closeModal("modal-epic-victory");
      this.showScreen("screen-register");
      this.updateLeaderboard();
    });

    // Close modals on clicking background
    document.querySelectorAll(".modal").forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal && (modal.id === "modal-hint" || modal.id === "modal-epic-victory")) {
          this.closeModal(modal.id);
        }
      });
    });

    // Initialize formula preview on load
    updateFormulaPreview();
  },

  showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
  },

  updateLevelSelectionUI() {
    const cards = document.querySelectorAll(".level-card");
    cards.forEach(card => {
      const lvlId = parseInt(card.dataset.level);
      const btn = card.querySelector(".btn-level");
      const starsDiv = card.querySelector(".level-stars");

      if (this.player.levelsProgress.includes(lvlId)) {
        card.classList.remove("locked");
        btn.disabled = false;
        btn.innerText = "Iniciar";
        
        // Show stars if saved
        const rating = localStorage.getItem(`vectorquest_level_stars_${lvlId}`);
        if (rating) {
          starsDiv.innerHTML = "⭐".repeat(parseInt(rating));
        } else {
          starsDiv.innerHTML = "";
        }
      } else {
        card.classList.add("locked");
        btn.disabled = true;
        btn.innerText = "Bloqueado 🔒";
        starsDiv.innerHTML = "";
      }
    });
  },

  loadLevel(index) {
    this.currentLevelIndex = index;
    this.currentLevel = LEVELS[index];
    this.resetLevelState();
    this.showScreen("screen-game");
    this.startTimer();
  },

  resetLevelState() {
    this.isSimulating = false;
    this.plannedPath = [];
    
    // Copy targets to avoid modifying raw levels object
    this.currentLevel.targets.forEach(t => t.rescued = false);
    
    this.shipState.x = this.currentLevel.startPos.x;
    this.shipState.y = this.currentLevel.startPos.y;
    this.shipState.rotation = 0; // Default pointing UP

    document.getElementById("hud-level-name").innerText = this.currentLevel.name;
    document.getElementById("hud-player-name").innerText = this.player.nickname;
    document.getElementById("hud-score").innerText = String(this.player.totalScore).padStart(4, "0");
    document.getElementById("hud-coords").innerText = `(${this.shipState.x}, ${this.shipState.y})`;
    document.getElementById("level-description").innerText = this.currentLevel.description;

    this.updateQueueUI();
    this.drawMap();
    
    // Enable/disable inputs
    document.getElementById("btn-add-vector").disabled = false;
    document.getElementById("btn-run-simulation").disabled = false;
    document.getElementById("btn-clear-route").disabled = false;
  },

  // Coordinate Conversion Helpers
  toSvgX(mathX) {
    const range = this.currentLevel.gridSize;
    return this.svgPadding + ((mathX + range) / (2 * range)) * (this.svgSize - 2 * this.svgPadding);
  },

  toSvgY(mathY) {
    const range = this.currentLevel.gridSize;
    // Math Y goes up, SVG Y goes down
    return this.svgPadding + ((range - mathY) / (2 * range)) * (this.svgSize - 2 * this.svgPadding);
  },

  getProjectedCoordinates() {
    let currX = this.currentLevel.startPos.x;
    let currY = this.currentLevel.startPos.y;
    this.plannedPath.forEach(v => {
      currX += v.x;
      currY += v.y;
    });
    return { x: currX, y: currY };
  },

  updateQueueUI() {
    const list = document.getElementById("vector-queue-list");
    list.innerHTML = "";

    if (this.plannedPath.length === 0) {
      list.innerHTML = `<div class="empty-queue-msg">Ningún vector ingresado. Ingresa coordenadas abajo.</div>`;
      document.getElementById("projected-coords").innerText = `(${this.currentLevel.startPos.x}, ${this.currentLevel.startPos.y})`;
      return;
    }

    let tempX = this.currentLevel.startPos.x;
    let tempY = this.currentLevel.startPos.y;

    this.plannedPath.forEach((v, idx) => {
      tempX += v.x;
      tempY += v.y;

      const card = document.createElement("div");
      card.className = "vector-card";
      card.innerHTML = `
        <span class="vector-index">\\vec{v}_{${idx+1}}</span>
        <span class="vector-value">(${v.x >= 0 ? '+' : ''}${v.x}, ${v.y >= 0 ? '+' : ''}${v.y})</span>
        <button class="btn-delete-vector" data-index="${idx}">&times;</button>
      `;

      card.querySelector(".btn-delete-vector").addEventListener("click", (e) => {
        if (this.isSimulating) return;
        SoundEffects.playBeep();
        const index = parseInt(e.target.dataset.index);
        this.plannedPath.splice(index, 1);
        this.updateQueueUI();
        this.drawMap();
      });

      list.appendChild(card);
    });

    document.getElementById("projected-coords").innerText = `(${tempX}, ${tempY})`;
  },

  drawMap() {
    const svg = document.getElementById("cartesian-svg");
    svg.innerHTML = ""; // Clear SVG
    
    const range = this.currentLevel.gridSize;

    // 1. Draw Grid Lines
    for (let i = -range; i <= range; i++) {
      // Vertical line
      const vx1 = this.toSvgX(i);
      const vy1 = this.toSvgY(-range);
      const vy2 = this.toSvgY(range);
      
      const vLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      vLine.setAttribute("x1", vx1);
      vLine.setAttribute("y1", vy1);
      vLine.setAttribute("x2", vx1);
      vLine.setAttribute("y2", vy2);
      vLine.setAttribute("class", "grid-line");
      svg.appendChild(vLine);

      // Horizontal line
      const hy = this.toSvgY(i);
      const hx1 = this.toSvgX(-range);
      const hx2 = this.toSvgX(range);

      const hLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      hLine.setAttribute("x1", hx1);
      hLine.setAttribute("y1", hy);
      hLine.setAttribute("x2", hx2);
      hLine.setAttribute("y2", hy);
      hLine.setAttribute("class", "grid-line");
      svg.appendChild(hLine);
    }

    // 2. Draw Main Axes
    const origX = this.toSvgX(0);
    const origY = this.toSvgY(0);

    // X Axis
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", this.toSvgX(-range - 0.5));
    xAxis.setAttribute("y1", origY);
    xAxis.setAttribute("x2", this.toSvgX(range + 0.5));
    xAxis.setAttribute("y2", origY);
    xAxis.setAttribute("class", "grid-axis");
    svg.appendChild(xAxis);

    // Y Axis
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", origX);
    yAxis.setAttribute("y1", this.toSvgY(-range - 0.5));
    yAxis.setAttribute("x2", origX);
    yAxis.setAttribute("y2", this.toSvgY(range + 0.5));
    yAxis.setAttribute("class", "grid-axis");
    svg.appendChild(yAxis);

    // Markers / Arrowheads on axes
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <marker id="axis-arrow-x" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#00f0ff" />
      </marker>
    `;
    svg.appendChild(defs);
    xAxis.setAttribute("marker-end", "url(#axis-arrow-x)");
    yAxis.setAttribute("marker-start", "url(#axis-arrow-x)"); // Starts negative, ends positive. Y is upside down in SVG, so marker-start is top (+Y).

    // 3. Draw Axis Labels (Numbers)
    for (let i = -range; i <= range; i++) {
      if (i === 0) continue; // Skip origin number to look cleaner

      // X Labels
      const xText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      xText.setAttribute("x", this.toSvgX(i));
      xText.setAttribute("y", origY + 16);
      xText.setAttribute("class", "axis-text");
      xText.textContent = i;
      svg.appendChild(xText);

      // Y Labels
      const yText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      yText.setAttribute("x", origX - 12);
      yText.setAttribute("y", this.toSvgY(i) + 4);
      yText.setAttribute("class", "axis-text");
      yText.setAttribute("text-anchor", "end");
      yText.textContent = i;
      svg.appendChild(yText);
    }

    // Origin (0,0) text label
    const originText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    originText.setAttribute("x", origX - 8);
    originText.setAttribute("y", origY + 12);
    originText.setAttribute("class", "axis-text");
    originText.textContent = "0";
    svg.appendChild(originText);

    // Axis titles
    const xTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    xTitle.setAttribute("x", this.toSvgX(range + 0.6));
    xTitle.setAttribute("y", origY - 6);
    xTitle.setAttribute("class", "axis-title");
    xTitle.textContent = "X";
    svg.appendChild(xTitle);

    const yTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    yTitle.setAttribute("x", origX + 10);
    yTitle.setAttribute("y", this.toSvgY(range + 0.6));
    yTitle.setAttribute("class", "axis-title");
    yTitle.textContent = "Y";
    svg.appendChild(yTitle);

    // 4. Draw Obstacles (Asteroids)
    this.currentLevel.obstacles.forEach(obs => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("transform", `translate(${this.toSvgX(obs.x)}, ${this.toSvgY(obs.y)})`);
      
      const innerG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      innerG.setAttribute("class", "svg-asteroid");
      innerG.innerHTML = SvgAssets.getAsteroidPath();
      
      g.appendChild(innerG);
      svg.appendChild(g);
    });

    // 5. Draw Targets (Astronauts)
    this.currentLevel.targets.forEach(t => {
      if (!t.rescued) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("transform", `translate(${this.toSvgX(t.x)}, ${this.toSvgY(t.y)})`);
        g.innerHTML = SvgAssets.getAstronautPath();
        svg.appendChild(g);
      }
    });

    // 6. Draw Exit Portal (unless target level doesn't have it separate, level 1 target is portal)
    if (this.currentLevel.portal) {
      const gp = document.createElementNS("http://www.w3.org/2000/svg", "g");
      gp.setAttribute("transform", `translate(${this.toSvgX(this.currentLevel.portal.x)}, ${this.toSvgY(this.currentLevel.portal.y)})`);
      gp.innerHTML = SvgAssets.getPortalPath();
      svg.appendChild(gp);
    }

    // 7. Draw Projected Route Line (Dashed cyan)
    if (this.plannedPath.length > 0 && !this.isSimulating) {
      const pPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      let dStr = `M ${this.toSvgX(this.currentLevel.startPos.x)} ${this.toSvgY(this.currentLevel.startPos.y)}`;
      let curX = this.currentLevel.startPos.x;
      let curY = this.currentLevel.startPos.y;
      
      this.plannedPath.forEach(v => {
        curX += v.x;
        curY += v.y;
        dStr += ` L ${this.toSvgX(curX)} ${this.toSvgY(curY)}`;
      });

      pPath.setAttribute("d", dStr);
      pPath.setAttribute("class", "projected-path-line");
      svg.appendChild(pPath);
    }

    // 8. Draw Realized Path Line (Solid green during animation)
    if (this.isSimulating) {
      this.drawRealizedPath(svg);
    }

    // 9. Draw Spaceship (always drawn at shipState.x, shipState.y with shipState.rotation)
    const shipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    shipG.setAttribute("id", "svg-spaceship-elem");
    shipG.setAttribute("transform", `translate(${this.toSvgX(this.shipState.x)}, ${this.toSvgY(this.shipState.y)}) rotate(${this.shipState.rotation})`);
    shipG.setAttribute("class", "svg-ship");
    
    // Add thrust effect flame if simulating
    let flame = "";
    if (this.isSimulating) {
      flame = `<polygon points="-5,14 0,26 5,14" fill="${this.player.avatar === 'ship-magenta' ? '#00f0ff' : '#bd00ff'}" opacity="0.8">
                 <animate attributeName="points" values="-5,14 0,26 5,14; -4,14 0,20 4,14; -5,14 0,26 5,14" dur="0.15s" repeatCount="indefinite" />
               </polygon>
               <polygon points="-3,14 0,20 3,14" fill="#fff" opacity="0.9">
                 <animate attributeName="points" values="-3,14 0,20 3,14; -2,14 0,16 2,14; -3,14 0,20 3,14" dur="0.1s" repeatCount="indefinite" />
               </polygon>`;
    }

    shipG.innerHTML = flame + SvgAssets.getShipPath(this.player.avatar);
    svg.appendChild(shipG);
  },

  drawRealizedPath(svg) {
    const rPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let dStr = `M ${this.toSvgX(this.currentLevel.startPos.x)} ${this.toSvgY(this.currentLevel.startPos.y)}`;
    
    for (let i = 0; i < this.simState.visitedPoints.length; i++) {
      const pt = this.simState.visitedPoints[i];
      dStr += ` L ${this.toSvgX(pt.x)} ${this.toSvgY(pt.y)}`;
    }
    
    // Line to current animated position
    dStr += ` L ${this.toSvgX(this.shipState.x)} ${this.toSvgY(this.shipState.y)}`;

    rPath.setAttribute("d", dStr);
    rPath.setAttribute("class", "realized-path-line");
    svg.appendChild(rPath);
  },

  // Leaderboard logic
  updateLeaderboard() {
    let board = localStorage.getItem("vectorquest_leaderboard");
    if (!board) {
      // Default initial Leaderboard
      const defaults = [
        { nickname: "Comandante Cósmico", score: 4800, levels: 5, date: "12/06/2026" },
        { nickname: "Cadete Estelar", score: 3200, levels: 4, date: "13/06/2026" },
        { nickname: "Nova Explorer", score: 2100, levels: 3, date: "11/06/2026" },
        { nickname: "Sputnik Chile", score: 1100, levels: 2, date: "10/06/2026" },
        { nickname: "Gabriela Mistral Space", score: 500, levels: 1, date: "13/06/2026" }
      ];
      localStorage.setItem("vectorquest_leaderboard", JSON.stringify(defaults));
      board = JSON.stringify(defaults);
    }

    const entries = JSON.parse(board);
    
    // Sort entries by score desc
    entries.sort((a, b) => b.score - a.score);

    // Build Preview Table (landing screen)
    const previewTbody = document.querySelector("#leaderboard-table-preview tbody");
    previewTbody.innerHTML = "";
    
    entries.slice(0, 5).forEach((entry, idx) => {
      const tr = document.createElement("tr");
      let rankClass = "";
      if (idx === 0) rankClass = "rank-gold";
      else if (idx === 1) rankClass = "rank-silver";
      else if (idx === 2) rankClass = "rank-bronze";

      tr.innerHTML = `
        <td class="${rankClass}">${idx + 1}</td>
        <td><strong>${entry.nickname}</strong></td>
        <td>${entry.levels}</td>
        <td>${entry.score} pts</td>
      `;
      previewTbody.appendChild(tr);
    });
  },

  saveToLeaderboard(nickname, score, levelsCompleted) {
    let board = localStorage.getItem("vectorquest_leaderboard");
    let entries = board ? JSON.parse(board) : [];
    
    // Check if player already exists
    const existingIdx = entries.findIndex(e => e.nickname.toLowerCase() === nickname.toLowerCase());
    
    const dateStr = new Date().toLocaleDateString("es-CL");

    if (existingIdx !== -1) {
      // Update score only if it is higher
      if (score > entries[existingIdx].score) {
        entries[existingIdx].score = score;
        entries[existingIdx].levels = levelsCompleted;
        entries[existingIdx].date = dateStr;
      }
    } else {
      entries.push({
        nickname: nickname,
        score: score,
        levels: levelsCompleted,
        date: dateStr
      });
    }

    localStorage.setItem("vectorquest_leaderboard", JSON.stringify(entries));
    this.updateLeaderboard();
  },

  // Timer functions
  startTimer() {
    this.levelTimer = 0;
    this.updateTimerDisplay();
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.levelTimer++;
      this.updateTimerDisplay();
    }, 1000);
  },

  stopTimer() {
    clearInterval(this.timerInterval);
  },

  updateTimerDisplay() {
    const mins = String(Math.floor(this.levelTimer / 60)).padStart(2, "0");
    const secs = String(this.levelTimer % 60).padStart(2, "0");
    document.getElementById("hud-timer").innerText = `${mins}:${secs}`;
  },

  // Simulation Running Physics & Logic
  runSimulation() {
    this.isSimulating = true;
    
    // Disable inputs
    document.getElementById("btn-add-vector").disabled = true;
    document.getElementById("btn-run-simulation").disabled = true;
    document.getElementById("btn-clear-route").disabled = true;

    // Simulation states
    this.simState = {
      vectorIndex: 0,
      stepProgress: 0, // 0 to 1
      startX: this.currentLevel.startPos.x,
      startY: this.currentLevel.startPos.y,
      endX: 0,
      endY: 0,
      speed: 0.02, // Progress increment per frame (about 50 frames per vector = 0.8s)
      visitedPoints: [{ x: this.currentLevel.startPos.x, y: this.currentLevel.startPos.y }]
    };

    SoundEffects.playLaser();
    this.animateFrame();
  },

  animateFrame() {
    if (!this.isSimulating) return;

    const idx = this.simState.vectorIndex;
    if (idx >= this.plannedPath.length) {
      // Finished all vectors successfully
      this.isSimulating = false;
      this.checkLevelCompletion();
      return;
    }

    const vector = this.plannedPath[idx];
    this.simState.endX = this.simState.startX + vector.x;
    this.simState.endY = this.simState.startY + vector.y;

    // Rotate ship to vector direction
    this.shipState.rotation = this.calculateAngle(vector.x, vector.y);

    // Linear interpolation of coordinates
    this.simState.stepProgress += this.simState.speed;
    if (this.simState.stepProgress > 1) this.simState.stepProgress = 1;

    // Ship math position
    const oldShipX = this.shipState.x;
    const oldShipY = this.shipState.y;

    this.shipState.x = this.simState.startX + (this.simState.endX - this.simState.startX) * this.simState.stepProgress;
    this.shipState.y = this.simState.startY + (this.simState.endY - this.simState.startY) * this.simState.stepProgress;

    // Redraw screen
    this.drawMap();
    document.getElementById("hud-coords").innerText = `(${Math.round(this.shipState.x)}, ${Math.round(this.shipState.y)})`;

    // 1. Check Collisions with obstacles on the flying segment
    const collisionNode = this.checkCollisionAlongSegment(
      this.simState.startX, 
      this.simState.startY, 
      this.shipState.x, 
      this.shipState.y
    );

    if (collisionNode) {
      this.isSimulating = false;
      this.handleCollision(collisionNode);
      return;
    }

    // 2. Check Astronaut collections (rescue)
    this.checkAstronautRescues(
      this.simState.startX, 
      this.simState.startY, 
      this.shipState.x, 
      this.shipState.y
    );

    if (this.simState.stepProgress >= 1) {
      // Step complete, move to next vector
      this.simState.visitedPoints.push({ x: this.simState.endX, y: this.simState.endY });
      this.simState.startX = this.simState.endX;
      this.simState.startY = this.simState.endY;
      this.simState.stepProgress = 0;
      this.simState.vectorIndex++;
    }

    // Loop
    requestAnimationFrame(() => this.animateFrame());
  },

  calculateAngle(dx, dy) {
    // 0 degrees is UP (+Y in mathematics). SVG Y is down, so we flip dy or use Math.atan2(dx, dy)
    // dx = x, dy = y
    // If dx = 0, dy = 1 (UP) -> atan2(0, 1) = 0 degrees
    // If dx = 1, dy = 0 (RIGHT) -> atan2(1, 0) = 90 degrees
    // If dx = -1, dy = 0 (LEFT) -> atan2(-1, 0) = -90 (270 degrees)
    // If dx = 0, dy = -1 (DOWN) -> atan2(0, -1) = 180 degrees
    return Math.atan2(dx, dy) * 180 / Math.PI;
  },

  // Segment-Obstacle intersection check
  checkCollisionAlongSegment(x1, y1, x2, y2) {
    // Check all level obstacles
    for (let i = 0; i < this.currentLevel.obstacles.length; i++) {
      const obs = this.currentLevel.obstacles[i];
      if (this.isPointOnSegment(obs.x, obs.y, x1, y1, x2, y2, 0.45)) { // 0.45 threshold represents obstacle hit radius
        return obs;
      }
    }
    return null;
  },

  checkAstronautRescues(x1, y1, x2, y2) {
    this.currentLevel.targets.forEach(t => {
      if (!t.rescued) {
        if (this.isPointOnSegment(t.x, t.y, x1, y1, x2, y2, 0.5)) { // 0.5 threshold radius for astronaut rescue
          t.rescued = true;
          SoundEffects.playRescue();
          // Visual feedback - temporarily recreate map to hide rescued
          this.drawMap();
        }
      }
    });
  },

  isPointOnSegment(px, py, x1, y1, x2, y2, radius = 0.4) {
    // Calculate distance from point P(px, py) to line segment AB( (x1, y1) -> (x2, y2) )
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    
    if (len_sq !== 0) { // in case of 0 length segment
      param = dot / len_sq;
    }

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= radius;
  },

  handleCollision(obstacle) {
    this.stopTimer();
    SoundEffects.playExplosion();
    
    // Draw explosion on SVG
    const svg = document.getElementById("cartesian-svg");
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${this.toSvgX(obstacle.x)}, ${this.toSvgY(obstacle.y)})`);
    
    const burst = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // Draw star burst
    burst.setAttribute("d", `M 0 -15 L 4 -4 L 15 -7 L 7 2 L 12 12 L 2 7 L -5 15 L -5 5 L -15 2 L -5 -3 Z`);
    burst.setAttribute("class", "svg-collision-burst");
    
    g.appendChild(burst);
    svg.appendChild(g);

    setTimeout(() => {
      document.getElementById("fail-reason").innerText = `Tu nave colisionó con un asteroide en la coordenada (${obstacle.x}, ${obstacle.y}).`;
      
      // Educational hint about movement
      const startX = this.currentLevel.startPos.x;
      const startY = this.currentLevel.startPos.y;
      document.getElementById("fail-math-feedback").innerHTML = `
        <strong>Análisis de Vuelo:</strong> Tu punto de origen fue (${startX}, ${startY}). 
        Los asteroides son obstáculos físicos. Para esquivar la coordenada (${obstacle.x}, ${obstacle.y}), debes planificar 
        una secuencia de vectores que rodee este punto, en lugar de una sola traslación directa.
      `;

      SoundEffects.playFailSound();
      this.openModal("modal-fail");
    }, 600);
  },

  checkLevelCompletion() {
    this.stopTimer();
    
    // 1. Did we reach the portal?
    const finalPos = { x: Math.round(this.shipState.x), y: Math.round(this.shipState.y) };
    const portal = this.currentLevel.portal;
    const reachedPortal = (finalPos.x === portal.x && finalPos.y === portal.y);

    // 2. Are all astronauts rescued?
    const allRescued = this.currentLevel.targets.every(t => t.rescued);

    if (reachedPortal && allRescued) {
      // SUCCESS!
      SoundEffects.playWinFanfare();
      
      // Calculate scores
      const timeTaken = this.levelTimer;
      const vectorsCount = this.plannedPath.length;
      const minVectors = this.currentLevel.minVectors;
      
      // Math formula for score: 1000 base + efficiency + time
      const efficiencyBonus = Math.max(100, (3 - (vectorsCount - minVectors)) * 250);
      const timeBonus = Math.max(50, 500 - timeTaken * 2);
      const levelScore = 1000 + efficiencyBonus + timeBonus;

      this.player.totalScore += levelScore;

      // Determine Star Rating
      let stars = 1;
      if (vectorsCount <= minVectors) stars = 3;
      else if (vectorsCount <= minVectors + 1) stars = 2;

      // Save level stars rating
      const oldStars = parseInt(localStorage.getItem(`vectorquest_level_stars_${this.currentLevel.id}`)) || 0;
      if (stars > oldStars) {
        localStorage.setItem(`vectorquest_level_stars_${this.currentLevel.id}`, stars);
      }

      // Unlock next level
      const nextLvlId = this.currentLevel.id + 1;
      if (nextLvlId <= LEVELS.length && !this.player.levelsProgress.includes(nextLvlId)) {
        this.player.levelsProgress.push(nextLvlId);
      }
      this.savePlayerData();

      // Save score to leaderboard
      const completedCount = this.player.levelsProgress.length - 1; // Number of completed levels (since levelsProgress contains the active/unlocked levels)
      // Actually count how many levels are completed (have stars)
      let completed = 0;
      for (let i = 1; i <= LEVELS.length; i++) {
        if (localStorage.getItem(`vectorquest_level_stars_${i}`)) completed++;
      }
      this.saveToLeaderboard(this.player.nickname, this.player.totalScore, completed);

      // Display results in modal
      document.getElementById("success-level-score").innerText = levelScore;
      
      const mins = String(Math.floor(timeTaken / 60)).padStart(2, "0");
      const secs = String(timeTaken % 60).padStart(2, "0");
      document.getElementById("success-time").innerText = `${mins}:${secs}`;
      document.getElementById("success-vectors-count").innerText = vectorsCount;
      document.getElementById("success-stars").innerText = "⭐".repeat(stars);

      // Math Feedback: Total Vector sum (Composición de vectores)
      let totalVectorX = 0;
      let totalVectorY = 0;
      this.plannedPath.forEach(v => {
        totalVectorX += v.x;
        totalVectorY += v.y;
      });

      const start = this.currentLevel.startPos;
      document.getElementById("success-math-feedback").innerHTML = `
        <strong>Composición Vectorial:</strong> Has sumado ${vectorsCount} vector(es): 
        ${this.plannedPath.map((v, i) => `\\vec{v}_{${i+1}}=(${v.x}, ${v.y})`).join(" + ")}. 
        La resultante es el vector de traslación total <strong>\\vec{v}_{T} = (${totalVectorX}, ${totalVectorY})</strong>. 
        ¡Esto trasladó tu nave desde (${start.x}, ${start.y}) hasta (${finalPos.x}, ${finalPos.y}) de forma equivalente!
      `;

      // Check if this was the last level
      if (this.currentLevel.id === LEVELS.length) {
        setTimeout(() => {
          SoundEffects.playEpicVictoryTheme();
          document.getElementById("epic-player-name").innerText = this.player.nickname;
          document.getElementById("epic-total-score").innerText = this.player.totalScore;
          this.openModal("modal-epic-victory");
        }, 600);
      } else {
        this.openModal("modal-success");
      }

    } else if (reachedPortal && !allRescued) {
      // Reached portal but missed astronauts
      alert("¡Alerta! Llegaste al portal de escape pero dejaste astronautas perdidos. Debes trazar una ruta que pase por ellos primero.");
      this.resetLevelState();
    } else {
      // Finished path but didn't reach portal
      alert(`La trayectoria terminó en la coordenada (${finalPos.x}, ${finalPos.y}), pero el portal de escape está en (${portal.x}, ${portal.y}). ¡Modifica tu ruta e intenta de nuevo!`);
      this.resetLevelState();
    }
  },

  // Modal Control
  openModal(modalId) {
    document.getElementById(modalId).classList.add("active");
  },

  closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
  },

  showHintModal(hintHtml) {
    document.getElementById("hint-text").innerHTML = hintHtml;
    this.openModal("modal-hint");
  }
};

// Start Game on load
window.addEventListener("DOMContentLoaded", () => {
  Game.init();
});
