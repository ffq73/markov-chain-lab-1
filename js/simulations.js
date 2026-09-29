// High-Aesthetic Dynamic Simulation Sandboxes (Neon Canvas Monte Carlo Engines)
window.MarkovSimulations = {
  // 1. Pólya Random Walk Sandbox (1D / 2D / 3D)
  polyWalk: {
    canvas: null,
    ctx: null,
    dimension: 1,
    p: 0.5,
    steps: 0,
    returns: 0,
    trajectory: [],
    timer: null,
    isRunning: false,
    speed: 30,
    rotAngle: 0.5, // 3D camera rotation angle

    init(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.reset();
    },

    setDimension(dim) {
      this.dimension = dim;
      this.reset();
    },

    setProbability(pVal) {
      this.p = pVal;
      this.reset();
    },

    reset() {
      this.stop();
      this.steps = 0;
      this.returns = 0;
      if (this.dimension === 1) {
        this.trajectory = [{ x: 0, t: 0 }];
      } else if (this.dimension === 2) {
        this.trajectory = [{ x: 0, y: 0 }];
      } else {
        this.trajectory = [{ x: 0, y: 0, z: 0 }];
      }
      this.updateStats();
      this.render();
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.timer = setInterval(() => this.step(4), this.speed);
    },

    stop() {
      this.isRunning = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    step(numSteps = 1) {
      for (let s = 0; s < numSteps; s++) {
        this.steps++;
        const last = this.trajectory[this.trajectory.length - 1];

        if (this.dimension === 1) {
          const move = Math.random() < this.p ? 1 : -1;
          const nextX = last.x + move;
          if (nextX === 0) this.returns++;
          this.trajectory.push({ x: nextX, t: this.steps });
          if (this.trajectory.length > 350) this.trajectory.shift();
        } else if (this.dimension === 2) {
          const rand = Math.random();
          let dx = 0, dy = 0;
          if (rand < 0.25) dx = 1;
          else if (rand < 0.5) dx = -1;
          else if (rand < 0.75) dy = 1;
          else dy = -1;
          const next = { x: last.x + dx, y: last.y + dy };
          if (next.x === 0 && next.y === 0) this.returns++;
          this.trajectory.push(next);
          if (this.trajectory.length > 500) this.trajectory.shift();
        } else {
          // 3D
          const rand = Math.random();
          let dx = 0, dy = 0, dz = 0;
          if (rand < 1/6) dx = 1;
          else if (rand < 2/6) dx = -1;
          else if (rand < 3/6) dy = 1;
          else if (rand < 4/6) dy = -1;
          else if (rand < 5/6) dz = 1;
          else dz = -1;
          const next = { x: last.x + dx, y: last.y + dy, z: last.z + dz };
          if (next.x === 0 && next.y === 0 && next.z === 0) this.returns++;
          this.trajectory.push(next);
          if (this.trajectory.length > 500) this.trajectory.shift();
          this.rotAngle += 0.005; // slowly rotate 3D camera
        }
      }
      this.updateStats();
      this.render();
    },

    updateStats() {
      const stepEl = document.getElementById('poly-steps');
      const retEl = document.getElementById('poly-returns');
      const distEl = document.getElementById('poly-dist');
      if (stepEl) stepEl.innerText = this.steps;
      if (retEl) retEl.innerText = this.returns;
      if (distEl && this.trajectory.length > 0) {
        const cur = this.trajectory[this.trajectory.length - 1];
        let d = 0;
        if (this.dimension === 1) d = Math.abs(cur.x);
        else if (this.dimension === 2) d = Math.hypot(cur.x, cur.y).toFixed(1);
        else d = Math.hypot(cur.x, cur.y, cur.z).toFixed(1);
        distEl.innerText = d;
      }
    },

    render() {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;

      // Dark Sci-Fi background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      if (this.dimension === 1) {
        // 1D Time-Trajectory view with glowing neon line
        const midY = h / 2;

        // Zero line
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, midY); ctx.lineTo(w, midY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#EF4444';
        ctx.font = '10px sans-serif';
        ctx.fillText('原点 0', 12, midY - 6);

        if (this.trajectory.length > 1) {
          const startT = this.trajectory[0].t;
          const endT = this.trajectory[this.trajectory.length - 1].t || 1;
          const spanT = Math.max(endT - startT, 50);

          // Gradient fill under trajectory
          const grad = ctx.createLinearGradient(0, 0, 0, h);
          grad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
          grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)');
          grad.addColorStop(1, 'rgba(6, 182, 212, 0.25)');

          ctx.beginPath();
          ctx.moveTo(20, midY);
          this.trajectory.forEach((pt) => {
            const px = ((pt.t - startT) / spanT) * (w - 40) + 20;
            const py = midY - pt.x * 6;
            ctx.lineTo(px, py);
          });
          const lastPt = this.trajectory[this.trajectory.length - 1];
          const lastPx = ((lastPt.t - startT) / spanT) * (w - 40) + 20;
          ctx.lineTo(lastPx, midY);
          ctx.closePath();
          ctx.fillStyle = grad;
          ctx.fill();

          // Neon stroke
          ctx.save();
          ctx.strokeStyle = '#06B6D4';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#06B6D4';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          this.trajectory.forEach((pt, i) => {
            const px = ((pt.t - startT) / spanT) * (w - 40) + 20;
            const py = midY - pt.x * 6;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          });
          ctx.stroke();

          // Particle Head
          const headY = midY - lastPt.x * 6;
          ctx.beginPath();
          ctx.arc(lastPx, headY, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#38BDF8';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.restore();
        }
      } else if (this.dimension === 2) {
        // 2D Lattice Grid view
        const cx = w / 2;
        const cy = h / 2;
        const scale = 5.5;

        // Faint grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        const gridStep = scale * 5;
        for (let x = cx % gridStep; x < w; x += gridStep) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = cy % gridStep; y < h; y += gridStep) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Origin beacon
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#EF4444';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.restore();

        // Path with gradient fade
        if (this.trajectory.length > 1) {
          ctx.save();
          ctx.lineWidth = 1.8;
          ctx.shadowColor = '#10B981';
          ctx.shadowBlur = 6;
          for (let i = 1; i < this.trajectory.length; i++) {
            const alpha = 0.15 + 0.85 * (i / this.trajectory.length);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(cx + this.trajectory[i - 1].x * scale, cy - this.trajectory[i - 1].y * scale);
            ctx.lineTo(cx + this.trajectory[i].x * scale, cy - this.trajectory[i].y * scale);
            ctx.stroke();
          }

          // Current particle
          const last = this.trajectory[this.trajectory.length - 1];
          ctx.beginPath();
          ctx.arc(cx + last.x * scale, cy - last.y * scale, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#60A5FA';
          ctx.shadowColor = '#60A5FA';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        }
      } else {
        // 3D Isometric View with Dynamic Rotation
        const cx = w / 2;
        const cy = h / 2 + 20;
        const scale = 4.2;

        const theta = this.rotAngle;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        const phi = 0.55; // vertical tilt

        const project = (x, y, z) => {
          const rx = x * cosT - y * sinT;
          const ry = x * sinT + y * cosT;
          const px = cx + rx * scale;
          const py = cy + ry * Math.sin(phi) * scale - z * Math.cos(phi) * scale;
          return { px, py, depth: ry };
        };

        // 3D Bounding Cube wireframe
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        const b = 25;
        const corners = [
          project(-b, -b, -b), project(b, -b, -b), project(b, b, -b), project(-b, b, -b),
          project(-b, -b, b), project(b, -b, b), project(b, b, b), project(-b, b, b)
        ];
        // Connect bottom
        ctx.beginPath();
        ctx.moveTo(corners[0].px, corners[0].py);
        ctx.lineTo(corners[1].px, corners[1].py);
        ctx.lineTo(corners[2].px, corners[2].py);
        ctx.lineTo(corners[3].px, corners[3].py);
        ctx.closePath();
        ctx.stroke();

        // Connect pillars & top
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(corners[i].px, corners[i].py);
          ctx.lineTo(corners[i + 4].px, corners[i + 4].py);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(corners[4].px, corners[4].py);
        ctx.lineTo(corners[5].px, corners[5].py);
        ctx.lineTo(corners[6].px, corners[6].py);
        ctx.lineTo(corners[7].px, corners[7].py);
        ctx.closePath();
        ctx.stroke();

        // Origin Beacon
        const o = project(0, 0, 0);
        ctx.save();
        ctx.beginPath();
        ctx.arc(o.px, o.py, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#EF4444';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();

        // 3D Path
        if (this.trajectory.length > 1) {
          ctx.save();
          ctx.lineWidth = 1.4;
          for (let i = 1; i < this.trajectory.length; i++) {
            const p1 = project(this.trajectory[i - 1].x, this.trajectory[i - 1].y, this.trajectory[i - 1].z);
            const p2 = project(this.trajectory[i].x, this.trajectory[i].y, this.trajectory[i].z);
            const alpha = 0.2 + 0.8 * (i / this.trajectory.length);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }

          // Head
          const last = this.trajectory[this.trajectory.length - 1];
          const pr = project(last.x, last.y, last.z);
          ctx.beginPath();
          ctx.arc(pr.px, pr.py, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#F472B6';
          ctx.shadowColor = '#F472B6';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }
      }
    }
  },

  // 2. Gambler's Ruin Simulator
  gambler: {
    canvas: null,
    ctx: null,
    x0: 10,
    target: 25,
    p: 0.48,
    simCount: 0,
    ruinCount: 0,
    currentPaths: [],

    init(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.reset();
    },

    setParams(x0, target, p) {
      this.x0 = parseInt(x0);
      this.target = parseInt(target);
      this.p = parseFloat(p);
      this.reset();
    },

    reset() {
      this.simCount = 0;
      this.ruinCount = 0;
      this.currentPaths = [];
      this.updateDisplay();
      this.render();
    },

    runBatch(batchSize = 20) {
      for (let b = 0; b < batchSize; b++) {
        let fortune = this.x0;
        const path = [fortune];
        while (fortune > 0 && fortune < this.target && path.length < 350) {
          fortune += Math.random() < this.p ? 1 : -1;
          path.push(fortune);
        }
        this.simCount++;
        if (fortune === 0) this.ruinCount++;
        this.currentPaths.push({ path, ruined: fortune === 0 });
        if (this.currentPaths.length > 35) this.currentPaths.shift();
      }
      this.updateDisplay();
      this.render();
    },

    updateDisplay() {
      const simEl = document.getElementById('gambler-sims');
      const empEl = document.getElementById('gambler-emp-ruin');
      const theoEl = document.getElementById('gambler-theo-ruin');

      if (simEl) simEl.innerText = this.simCount;
      const empRate = this.simCount > 0 ? (this.ruinCount / this.simCount).toFixed(3) : "0.000";
      if (empEl) empEl.innerText = empRate;

      const p = this.p;
      const q = 1 - p;
      let theo = 0;
      if (Math.abs(p - 0.5) < 1e-5) {
        theo = (1 - this.x0 / this.target).toFixed(3);
      } else {
        const ratio = q / p;
        const num = Math.pow(ratio, this.target) - Math.pow(ratio, this.x0);
        const den = Math.pow(ratio, this.target) - 1;
        theo = (num / den).toFixed(3);
      }
      if (theoEl) theoEl.innerText = theo;
    },

    render() {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;

      // Dark Fintech Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      const topY = 32;
      const botY = h - 32;
      const rangeY = botY - topY;

      // Winning Zone Glow
      const winGrad = ctx.createLinearGradient(0, 0, 0, topY + 40);
      winGrad.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
      winGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = winGrad;
      ctx.fillRect(0, 0, w, topY + 40);

      // Ruin Zone Glow
      const ruinGrad = ctx.createLinearGradient(0, botY - 40, 0, h);
      ruinGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
      ruinGrad.addColorStop(1, 'rgba(239, 68, 68, 0.15)');
      ctx.fillStyle = ruinGrad;
      ctx.fillRect(0, botY - 40, w, 40);

      // Boundaries
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#EF4444';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, botY); ctx.lineTo(w, botY);
      ctx.stroke();

      ctx.strokeStyle = '#10B981';
      ctx.shadowColor = '#10B981';
      ctx.beginPath();
      ctx.moveTo(0, topY); ctx.lineTo(w, topY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Labels
      ctx.fillStyle = '#F87171';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('⚡ 破产深渊 (0元)', 15, botY - 8);

      ctx.fillStyle = '#34D399';
      ctx.fillText(`🏆 胜出离场 (${this.target}元)`, 15, topY + 16);

      // Initial line
      const initY = botY - (this.x0 / this.target) * rangeY;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, initY); ctx.lineTo(w, initY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px sans-serif';
      ctx.fillText(`起跑本金 (${this.x0}元)`, 15, initY - 5);

      // Draw paths
      this.currentPaths.forEach(item => {
        ctx.save();
        ctx.strokeStyle = item.ruined ? 'rgba(248, 113, 113, 0.45)' : 'rgba(52, 211, 153, 0.55)';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        const maxSteps = Math.max(item.path.length, 50);
        item.path.forEach((val, step) => {
          const px = (step / maxSteps) * (w - 70) + 35;
          const py = botY - (val / this.target) * rangeY;
          if (step === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.restore();
      });
    }
  },

  // 3. Tom & Jerry Success Runs Simulator
  tomJerry: {
    canvas: null,
    ctx: null,
    mode: 'positive',
    pValues: [],
    runLength: 0,
    history: [],
    infiniteProduct: 1,
    timer: null,
    isRunning: false,

    init(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.setMode('positive');
    },

    setMode(m) {
      this.mode = m;
      this.stop();
      this.runLength = 0;
      this.history = [{ step: 0, run: 0, prod: 1 }];
      this.infiniteProduct = 1;

      this.pValues = [];
      for (let i = 0; i < 200; i++) {
        if (m === 'positive') {
          this.pValues.push(0.35);
        } else if (m === 'null') {
          this.pValues.push(1 / (i + 2));
        } else {
          this.pValues.push(1 / Math.pow(i + 2, 2));
        }
      }
      this.updateDisplay();
      this.render();
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.timer = setInterval(() => this.step(), 60);
    },

    stop() {
      this.isRunning = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    step() {
      const pFail = this.pValues[Math.min(this.runLength, this.pValues.length - 1)];
      const rand = Math.random();

      if (rand < pFail) {
        this.runLength = 0;
      } else {
        this.runLength++;
      }

      let prod = 1;
      for (let i = 0; i <= this.runLength; i++) {
        prod *= (1 - this.pValues[i]);
      }
      this.infiniteProduct = prod;

      this.history.push({
        step: this.history.length,
        run: this.runLength,
        prod: prod
      });
      if (this.history.length > 200) this.history.shift();

      this.updateDisplay();
      this.render();
    },

    updateDisplay() {
      const runEl = document.getElementById('tj-run');
      const prodEl = document.getElementById('tj-prod');
      const regimeEl = document.getElementById('tj-regime');

      if (runEl) runEl.innerText = this.runLength;
      if (prodEl) prodEl.innerText = this.infiniteProduct.toFixed(4);
      if (regimeEl) {
        if (this.mode === 'positive') {
          regimeEl.innerText = "正常返 (Positive Recurrent) · 平均回访步数有限";
          regimeEl.className = "font-bold text-emerald-400";
        } else if (this.mode === 'null') {
          regimeEl.innerText = "零常返 (Null Recurrent) · 必回访但平均时间无穷";
          regimeEl.className = "font-bold text-amber-400";
        } else {
          regimeEl.innerText = "非常返 (Transient) · 连胜逃逸，回访概率 < 1";
          regimeEl.className = "font-bold text-rose-400";
        }
      }
    },

    render() {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      const maxRun = Math.max(16, ...this.history.map(d => d.run));
      const padL = 40, padR = 20, padB = 30, padT = 20;
      const chartW = w - padL - padR;
      const chartH = h - padT - padB;

      // Coordinate axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB);
      ctx.lineTo(w - padR, h - padB);
      ctx.stroke();

      ctx.fillStyle = '#64748B';
      ctx.font = '10px sans-serif';
      ctx.fillText(`连胜长度 (max: ${maxRun})`, padL + 8, padT + 12);

      // Area fill
      const grad = ctx.createLinearGradient(0, padT, 0, h - padB);
      grad.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
      grad.addColorStop(1, 'rgba(245, 158, 11, 0.02)');

      ctx.beginPath();
      ctx.moveTo(padL, h - padB);
      this.history.forEach((d, i) => {
        const px = padL + (i / this.history.length) * chartW;
        const py = (h - padB) - (d.run / maxRun) * chartH;
        ctx.lineTo(px, py);
      });
      ctx.lineTo(padL + chartW, h - padB);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Glowing Line
      ctx.save();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      this.history.forEach((d, i) => {
        const px = padL + (i / this.history.length) * chartW;
        const py = (h - padB) - (d.run / maxRun) * chartH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.restore();
    }
  },

  // 4. M/D/1 Queuing System Simulator (Foster Criterion)
  queueing: {
    canvas: null,
    ctx: null,
    lambda: 0.8,
    queue: 0,
    history: [],
    timer: null,
    isRunning: false,

    init(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.setLambda(0.8);
    },

    setLambda(val) {
      this.lambda = parseFloat(val);
      this.stop();
      this.queue = 0;
      this.history = [{ step: 0, q: 0 }];
      this.updateDisplay();
      this.render();
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.timer = setInterval(() => this.step(), 70);
    },

    stop() {
      this.isRunning = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    poissonSample(lam) {
      const L = Math.exp(-lam);
      let k = 0;
      let p = 1;
      do {
        k++;
        p *= Math.random();
      } while (p > L);
      return k - 1;
    },

    step() {
      const arrivals = this.poissonSample(this.lambda);
      if (this.queue === 0) {
        this.queue = arrivals;
      } else {
        this.queue = this.queue - 1 + arrivals;
      }

      this.history.push({ step: this.history.length, q: this.queue });
      if (this.history.length > 200) this.history.shift();

      this.updateDisplay();
      this.render();
    },

    updateDisplay() {
      const qEl = document.getElementById('queue-len');
      const driftEl = document.getElementById('queue-drift');
      const statusEl = document.getElementById('queue-status');

      if (qEl) qEl.innerText = this.queue;
      const drift = (this.lambda - 1).toFixed(2);
      if (driftEl) driftEl.innerText = `${drift} (单步期望增量)`;

      if (statusEl) {
        if (this.lambda < 0.99) {
          statusEl.innerText = "正常返 (λ < 1) · 强负漂移，队列快速清空";
          statusEl.className = "font-bold text-emerald-400";
        } else if (this.lambda <= 1.01) {
          statusEl.innerText = "零常返 (λ = 1) · 零漂移临界态，长程游走";
          statusEl.className = "font-bold text-amber-400";
        } else {
          statusEl.innerText = "非常返 (λ > 1) · 正漂移失控，队列向无穷大爆炸！";
          statusEl.className = "font-bold text-rose-400";
        }
      }
    },

    render() {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      // Top: Animated Customer Queue visual buffer
      const bufferY = 28;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(30, bufferY, w - 60, 24);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeRect(30, bufferY, w - 60, 24);

      // Customer beads
      const beadCount = Math.min(this.queue, 40);
      for (let i = 0; i < beadCount; i++) {
        ctx.beginPath();
        ctx.arc(42 + i * 11, bufferY + 12, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.lambda > 1 ? '#F43F5E' : '#38BDF8';
        ctx.fill();
      }

      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px sans-serif';
      ctx.fillText(`服务台排队视窗 (现有人数: ${this.queue})`, 32, bufferY - 8);

      // Bottom: Chart
      const maxQ = Math.max(16, ...this.history.map(d => d.q));
      const padL = 40, padR = 20, padB = 26, padT = 75;
      const chartW = w - padL - padR;
      const chartH = h - padT - padB;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB);
      ctx.lineTo(w - padR, h - padB);
      ctx.stroke();

      // Chart area
      ctx.save();
      const grad = ctx.createLinearGradient(0, padT, 0, h - padB);
      const isBurst = this.lambda > 1;
      grad.addColorStop(0, isBurst ? 'rgba(244, 63, 94, 0.35)' : 'rgba(56, 189, 248, 0.35)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.moveTo(padL, h - padB);
      this.history.forEach((d, i) => {
        const px = padL + (i / this.history.length) * chartW;
        const py = (h - padB) - (d.q / maxQ) * chartH;
        ctx.lineTo(px, py);
      });
      ctx.lineTo(padL + chartW, h - padB);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke
      ctx.strokeStyle = isBurst ? '#F43F5E' : '#38BDF8';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = isBurst ? '#F43F5E' : '#38BDF8';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      this.history.forEach((d, i) => {
        const px = padL + (i / this.history.length) * chartW;
        const py = (h - padB) - (d.q / maxQ) * chartH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.restore();
    }
  }
};
