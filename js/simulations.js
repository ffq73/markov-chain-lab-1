// Dynamic Simulation Sandboxes (Canvas Monte Carlo Engines)
window.MarkovSimulations = {
  // 1. Pólya Random Walk Sandbox (1D / 2D / 3D)
  polyWalk: {
    canvas: null,
    ctx: null,
    dimension: 1, // 1, 2, or 3
    p: 0.5, // forward prob for 1D
    steps: 0,
    returns: 0,
    trajectory: [],
    timer: null,
    isRunning: false,
    speed: 30, // ms per tick

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
      this.timer = setInterval(() => this.step(5), this.speed);
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
          if (this.trajectory.length > 500) this.trajectory.shift();
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
          if (this.trajectory.length > 800) this.trajectory.shift();
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
          if (this.trajectory.length > 800) this.trajectory.shift();
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
      ctx.clearRect(0, 0, w, h);

      if (this.dimension === 1) {
        // 1D Time-Trajectory view
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();

        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const startT = this.trajectory[0].t;
        const endT = this.trajectory[this.trajectory.length - 1].t || 1;
        const spanT = Math.max(endT - startT, 50);

        this.trajectory.forEach((pt, i) => {
          const px = ((pt.t - startT) / spanT) * (w - 40) + 20;
          const py = h / 2 - pt.x * 6;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Origin label
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '11px sans-serif';
        ctx.fillText('原点 0', 10, h / 2 - 5);
      } else if (this.dimension === 2) {
        // 2D Lattice Grid view
        const cx = w / 2;
        const cy = h / 2;
        const scale = 5;

        // Grid axes
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
        ctx.moveTo(0, cy); ctx.lineTo(w, cy);
        ctx.stroke();

        // Origin marker
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#EF4444';
        ctx.fill();

        // Path
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        this.trajectory.forEach((pt, i) => {
          const px = cx + pt.x * scale;
          const py = cy - pt.y * scale;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Current particle
        if (this.trajectory.length > 0) {
          const last = this.trajectory[this.trajectory.length - 1];
          ctx.beginPath();
          ctx.arc(cx + last.x * scale, cy - last.y * scale, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#3B82F6';
          ctx.fill();
        }
      } else {
        // 3D Isometric View
        const cx = w / 2;
        const cy = h / 2 + 30;
        const scale = 4;

        // Isometric projection: isoX = (x - y) * cos(30), isoY = (x + y) * sin(30) - z
        const cos30 = Math.cos(Math.PI / 6);
        const sin30 = Math.sin(Math.PI / 6);

        const project = (x, y, z) => ({
          px: cx + (x - y) * cos30 * scale,
          py: cy + (x + y) * sin30 * scale - z * scale
        });

        // Axes
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1;
        const o = project(0, 0, 0);
        const axX = project(25, 0, 0);
        const axY = project(0, 25, 0);
        const axZ = project(0, 0, 25);

        ctx.beginPath();
        ctx.moveTo(o.px, o.py); ctx.lineTo(axX.px, axX.py);
        ctx.moveTo(o.px, o.py); ctx.lineTo(axY.px, axY.py);
        ctx.moveTo(o.px, o.py); ctx.lineTo(axZ.px, axZ.py);
        ctx.stroke();

        ctx.fillStyle = '#9CA3AF';
        ctx.font = '10px sans-serif';
        ctx.fillText('+X', axX.px + 4, axX.py);
        ctx.fillText('+Y', axY.px + 4, axY.py);
        ctx.fillText('+Z', axZ.px, axZ.py - 4);

        // Origin marker
        ctx.beginPath();
        ctx.arc(o.px, o.py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#EF4444';
        ctx.fill();

        // 3D Path
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        this.trajectory.forEach((pt, i) => {
          const pr = project(pt.x, pt.y, pt.z);
          if (i === 0) ctx.moveTo(pr.px, pr.py);
          else ctx.lineTo(pr.px, pr.py);
        });
        ctx.stroke();

        if (this.trajectory.length > 0) {
          const last = this.trajectory[this.trajectory.length - 1];
          const pr = project(last.x, last.y, last.z);
          ctx.beginPath();
          ctx.arc(pr.px, pr.py, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#EC4899';
          ctx.fill();
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
    timer: null,
    isRunning: false,

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
      this.stop();
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
        while (fortune > 0 && fortune < this.target && path.length < 400) {
          fortune += Math.random() < this.p ? 1 : -1;
          path.push(fortune);
        }
        this.simCount++;
        if (fortune === 0) this.ruinCount++;
        this.currentPaths.push({ path, ruined: fortune === 0 });
        if (this.currentPaths.length > 40) this.currentPaths.shift();
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

      // Calculate Theoretical
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
      ctx.clearRect(0, 0, w, h);

      // Boundaries: 0 (ruin) at bottom, target at top
      const topY = 30;
      const botY = h - 30;
      const rangeY = botY - topY;

      // Draw horizontal barrier lines
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, botY); ctx.lineTo(w, botY);
      ctx.stroke();

      ctx.strokeStyle = '#10B981';
      ctx.beginPath();
      ctx.moveTo(0, topY); ctx.lineTo(w, topY);
      ctx.stroke();

      // Labels
      ctx.fillStyle = '#EF4444';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('破产线 (0元)', 15, botY - 8);

      ctx.fillStyle = '#10B981';
      ctx.fillText(`胜利线 (${this.target}元)`, 15, topY + 16);

      // Initial line
      const initY = botY - (this.x0 / this.target) * rangeY;
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, initY); ctx.lineTo(w, initY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#6B7280';
      ctx.fillText(`初始本金 (${this.x0}元)`, 15, initY - 5);

      // Draw paths
      this.currentPaths.forEach(item => {
        ctx.strokeStyle = item.ruined ? 'rgba(239, 68, 68, 0.45)' : 'rgba(16, 185, 129, 0.5)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const maxSteps = Math.max(item.path.length, 60);
        item.path.forEach((val, step) => {
          const px = (step / maxSteps) * (w - 60) + 30;
          const py = botY - (val / this.target) * rangeY;
          if (step === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      });
    }
  },

  // 3. Tom & Jerry Success Runs Simulator
  tomJerry: {
    canvas: null,
    ctx: null,
    mode: 'positive', // 'positive', 'null', 'transient'
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

      // Precompute 100 values of p_i
      this.pValues = [];
      for (let i = 0; i < 200; i++) {
        if (m === 'positive') {
          // p_i = 0.3 constant (positive recurrent)
          this.pValues.push(0.35);
        } else if (m === 'null') {
          // p_i = 1 / (i + 2) (null recurrent, sum diverges, mean time infinite)
          this.pValues.push(1 / (i + 2));
        } else {
          // p_i = 1 / (i + 2)^2 (transient, sum converges, infinite product > 0)
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
        // Failed! Drop back to 0
        this.runLength = 0;
      } else {
        // Success! Run grows by 1
        this.runLength++;
      }

      // Update infinite product up to current run
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
      if (this.history.length > 250) this.history.shift();

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
          regimeEl.innerText = "正常返 (Positive Recurrent) - 期望回访时间有限";
          regimeEl.className = "font-bold text-emerald-600";
        } else if (this.mode === 'null') {
          regimeEl.innerText = "零常返 (Null Recurrent) - 必回访但平均时间无穷";
          regimeEl.className = "font-bold text-amber-600";
        } else {
          regimeEl.innerText = "非常返 (Transient) - 连胜无限逃逸，回访概率 < 1";
          regimeEl.className = "font-bold text-rose-600";
        }
      }
    },

    render() {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Plot run lengths as bar / line
      const maxRun = Math.max(15, ...this.history.map(d => d.run));
      const padL = 40, padR = 20, padB = 30, padT = 20;
      const chartW = w - padL - padR;
      const chartH = h - padT - padB;

      // Axes
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB);
      ctx.lineTo(w - padR, h - padB);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '10px sans-serif';
      ctx.fillText(`连胜长度 max: ${maxRun}`, padL + 10, padT + 12);
      ctx.fillText('时间步 (Steps)', w - 80, h - 10);

      // Line path
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      this.history.forEach((d, i) => {
        const px = padL + (i / this.history.length) * chartW;
        const py = (h - padB) - (d.run / maxRun) * chartH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
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

    // Sample from Poisson(lambda)
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
        // 1 customer served, new arrivals added
        this.queue = this.queue - 1 + arrivals;
      }

      this.history.push({ step: this.history.length, q: this.queue });
      if (this.history.length > 250) this.history.shift();

      this.updateDisplay();
      this.render();
    },

    updateDisplay() {
      const qEl = document.getElementById('queue-len');
      const driftEl = document.getElementById('queue-drift');
      const statusEl = document.getElementById('queue-status');

      if (qEl) qEl.innerText = this.queue;
      const drift = (this.lambda - 1).toFixed(2);
      if (driftEl) driftEl.innerText = `${drift} (每步平均增量)`;

      if (statusEl) {
        if (this.lambda < 0.99) {
          statusEl.innerText = "正常返 (λ < 1) - 负漂移，队伍快速自我清空";
          statusEl.className = "font-bold text-emerald-600";
        } else if (this.lambda <= 1.01) {
          statusEl.innerText = "零常返 (λ = 1) - 零漂移，队伍漫游但最终会回0";
          statusEl.className = "font-bold text-amber-600";
        } else {
          statusEl.innerText = "非常返 (λ > 1) - 正漂移，队伍向无穷大爆炸逃逸！";
          statusEl.className = "font-bold text-rose-600";
        }
      }
    },

    render() {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;
      ctx.clearRect(0, 0, w, h);

      const maxQ = Math.max(15, ...this.history.map(d => d.q));
      const padL = 40, padR = 20, padB = 30, padT = 20;
      const chartW = w - padL - padR;
      const chartH = h - padT - padB;

      // Axes
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB);
      ctx.lineTo(w - padR, h - padB);
      ctx.stroke();

      ctx.fillStyle = '#9CA3AF';
      ctx.font = '10px sans-serif';
      ctx.fillText(`排队人数 (max: ${maxQ})`, padL + 10, padT + 12);

      // Area fill
      ctx.fillStyle = this.lambda > 1 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)';
      ctx.beginPath();
      ctx.moveTo(padL, h - padB);
      this.history.forEach((d, i) => {
        const px = padL + (i / this.history.length) * chartW;
        const py = (h - padB) - (d.q / maxQ) * chartH;
        ctx.lineTo(px, py);
      });
      ctx.lineTo(padL + chartW, h - padB);
      ctx.closePath();
      ctx.fill();

      // Line
      ctx.strokeStyle = this.lambda > 1 ? '#EF4444' : '#3B82F6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      this.history.forEach((d, i) => {
        const px = padL + (i / this.history.length) * chartW;
        const py = (h - padB) - (d.q / maxQ) * chartH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }
  }
};
