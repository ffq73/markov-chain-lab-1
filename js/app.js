// Main Application Logic & View Controller (High Aesthetic Edition)
class MarkovApp {
  constructor() {
    this.currentView = 'graph';
    this.currentNodeId = 'thm-1-2-1';
    this.graphInstance = null;
    this.masteredNodes = new Set(JSON.parse(localStorage.getItem('markov_mastered') || '[]'));
    this.init();
  }

  init() {
    this.bindNavigation();
    this.bindSearchAndFilter();
    this.initGraph();
    this.initSimulations();
    this.renderCodexList();
    this.renderStepper(this.currentNodeId);
    this.updateGlobalProgress();
    this.typesetMath();
  }

  bindNavigation() {
    const navBtns = document.querySelectorAll('.nav-tab-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });
  }

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    const targetSec = document.getElementById(`view-${viewName}`);
    if (targetSec) targetSec.classList.remove('hidden');

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('bg-blue-600/90', 'text-white', 'shadow-md');
        btn.classList.remove('text-slate-400', 'hover:bg-slate-800/60');
      } else {
        btn.classList.remove('bg-blue-600/90', 'text-white', 'shadow-md');
        btn.classList.add('text-slate-400', 'hover:bg-slate-800/60');
      }
    });

    if (viewName === 'graph' && this.graphInstance) {
      setTimeout(() => this.graphInstance.resize(), 50);
    }

    if (viewName === 'sim') {
      setTimeout(() => {
        MarkovSimulations.polyWalk.render();
        MarkovSimulations.gambler.render();
        MarkovSimulations.tomJerry.render();
        MarkovSimulations.queueing.render();
      }, 50);
    }
  }

  initGraph() {
    this.graphInstance = new MarkovGraph('graph-canvas', 'graph-container', (nodeId) => {
      this.currentNodeId = nodeId;
      this.renderStepper(nodeId);
      this.showQuickPreview(nodeId);
    });

    document.getElementById('btn-zoom-in')?.addEventListener('click', () => this.graphInstance.zoomIn());
    document.getElementById('btn-zoom-out')?.addEventListener('click', () => this.graphInstance.zoomOut());
    document.getElementById('btn-zoom-reset')?.addEventListener('click', () => this.graphInstance.resetView());

    const secFilter = document.getElementById('filter-section');
    if (secFilter) {
      secFilter.addEventListener('change', (e) => {
        this.graphInstance.setSectionFilter(e.target.value);
        this.renderCodexList();
      });
    }

    const typeFilter = document.getElementById('filter-type');
    if (typeFilter) {
      typeFilter.addEventListener('change', (e) => {
        this.graphInstance.setTypeFilter(e.target.value);
        this.renderCodexList();
      });
    }
  }

  bindSearchAndFilter() {
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim();
        if (this.graphInstance) this.graphInstance.setSearch(q);
        this.renderCodexList(q);
      });
    }
  }

  initSimulations() {
    // 1. Pólya
    MarkovSimulations.polyWalk.init('canvas-poly');
    document.getElementById('btn-poly-start')?.addEventListener('click', () => MarkovSimulations.polyWalk.start());
    document.getElementById('btn-poly-stop')?.addEventListener('click', () => MarkovSimulations.polyWalk.stop());
    document.getElementById('btn-poly-reset')?.addEventListener('click', () => MarkovSimulations.polyWalk.reset());
    document.getElementById('select-poly-dim')?.addEventListener('change', (e) => {
      MarkovSimulations.polyWalk.setDimension(parseInt(e.target.value));
    });
    document.getElementById('input-poly-p')?.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('val-poly-p').innerText = val.toFixed(2);
      MarkovSimulations.polyWalk.setProbability(val);
    });

    // 2. Gambler
    MarkovSimulations.gambler.init('canvas-gambler');
    document.getElementById('btn-gambler-run')?.addEventListener('click', () => MarkovSimulations.gambler.runBatch(20));
    document.getElementById('btn-gambler-reset')?.addEventListener('click', () => MarkovSimulations.gambler.reset());
    const updateGamblerParams = () => {
      const x0 = document.getElementById('input-gambler-x0').value;
      const target = document.getElementById('input-gambler-target').value;
      const p = document.getElementById('input-gambler-p').value;
      document.getElementById('val-gambler-x0').innerText = x0;
      document.getElementById('val-gambler-target').innerText = target;
      document.getElementById('val-gambler-p').innerText = p;
      MarkovSimulations.gambler.setParams(x0, target, p);
    };
    ['input-gambler-x0', 'input-gambler-target', 'input-gambler-p'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', updateGamblerParams);
    });

    // 3. Tom & Jerry
    MarkovSimulations.tomJerry.init('canvas-tj');
    document.getElementById('btn-tj-start')?.addEventListener('click', () => MarkovSimulations.tomJerry.start());
    document.getElementById('btn-tj-stop')?.addEventListener('click', () => MarkovSimulations.tomJerry.stop());
    document.getElementById('select-tj-mode')?.addEventListener('change', (e) => {
      MarkovSimulations.tomJerry.setMode(e.target.value);
    });

    // 4. Queuing
    MarkovSimulations.queueing.init('canvas-queue');
    document.getElementById('btn-queue-start')?.addEventListener('click', () => MarkovSimulations.queueing.start());
    document.getElementById('btn-queue-stop')?.addEventListener('click', () => MarkovSimulations.queueing.stop());
    document.getElementById('input-queue-lambda')?.addEventListener('input', (e) => {
      const lam = parseFloat(e.target.value);
      document.getElementById('val-queue-lambda').innerText = lam.toFixed(2);
      MarkovSimulations.queueing.setLambda(lam);
    });
  }

  showQuickPreview(nodeId) {
    const node = window.MARKOV_MAP[nodeId];
    if (!node) return;
    const previewEl = document.getElementById('graph-quick-preview');
    if (!previewEl) return;

    previewEl.classList.remove('hidden');
    previewEl.innerHTML = `
      <div class="flex items-start justify-between">
        <div>
          <span class="inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-1.5">
            ${node.badge || node.type} · §${node.section}
          </span>
          <h4 class="font-bold text-slate-100 text-sm leading-snug">${node.title}</h4>
        </div>
        <button onclick="document.getElementById('graph-quick-preview').classList.add('hidden')" class="text-slate-400 hover:text-white text-base">✕</button>
      </div>
      <p class="text-xs text-slate-300 mt-2 leading-relaxed">${node.summary}</p>
      <div class="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-xs text-amber-200">
        💡 <strong>直觉：</strong> ${node.intuitiveAnalogy}
      </div>
      <div class="mt-3.5 flex items-center justify-between">
        <button id="btn-goto-stepper" class="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition shadow-md flex items-center space-x-1.5">
          <span>🔬 展开显微镜证明</span>
          <span>›</span>
        </button>
        <span class="text-[11px] text-slate-400 font-mono">${node.dependencies.length} 前置 / ${node.unlocks.length} 引申</span>
      </div>
    `;

    document.getElementById('btn-goto-stepper')?.addEventListener('click', () => {
      this.switchView('stepper');
      this.renderStepper(nodeId);
    });
  }

  toggleMastered(nodeId) {
    if (this.masteredNodes.has(nodeId)) {
      this.masteredNodes.delete(nodeId);
    } else {
      this.masteredNodes.add(nodeId);
    }
    localStorage.setItem('markov_mastered', JSON.stringify([...this.masteredNodes]));
    this.updateGlobalProgress();
    this.renderStepper(nodeId);
    this.renderCodexList();
  }

  updateGlobalProgress() {
    const total = window.MARKOV_DATA ? window.MARKOV_DATA.length : 71;
    const mastered = this.masteredNodes.size;
    const pct = Math.round((mastered / total) * 100);

    const barEl = document.getElementById('global-progress-bar');
    const txtEl = document.getElementById('global-progress-text');
    if (barEl) barEl.style.width = `${pct}%`;
    if (txtEl) txtEl.innerText = `${mastered} / ${total} (${pct}%)`;
  }

  locateInGraph(nodeId) {
    this.switchView('graph');
    if (this.graphInstance) {
      const node = this.graphInstance.nodes.find(n => n.id === nodeId);
      if (node) {
        this.graphInstance.panX = this.graphInstance.width / 2 - node.x * this.graphInstance.scale;
        this.graphInstance.panY = this.graphInstance.height / 2 - node.y * this.graphInstance.scale;
        this.graphInstance.selectNode(nodeId);
      }
    }
  }

  renderStepper(nodeId) {
    const node = window.MARKOV_MAP[nodeId];
    if (!node) return;

    this.currentNodeId = nodeId;
    const container = document.getElementById('stepper-content');
    if (!container) return;

    const isMastered = this.masteredNodes.has(nodeId);

    // Find current index, next, prev
    const currentIndex = window.MARKOV_DATA.findIndex(n => n.id === nodeId);
    const prevNode = currentIndex > 0 ? window.MARKOV_DATA[currentIndex - 1] : null;
    const nextNode = currentIndex < window.MARKOV_DATA.length - 1 ? window.MARKOV_DATA[currentIndex + 1] : null;

    // Header Card
    const headerCard = `
      <div class="bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 shadow-xl mb-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              ${node.badge || node.type}
            </span>
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-700/60 text-slate-300">
              小节 §${node.section}
            </span>
            ${(node.tags || []).map(t => `<span class="px-2 py-0.5 text-[11px] rounded bg-slate-700/40 text-sky-400 font-mono">#${t}</span>`).join('')}
          </div>

          <div class="flex items-center space-x-2">
            <button onclick="window.APP.locateInGraph('${node.id}')" class="px-3 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center space-x-1.5 border border-slate-600/40">
              <span>🌐</span>
              <span>在拓扑图中定位</span>
            </button>
            <button onclick="window.APP.toggleMastered('${node.id}')" class="px-3 py-1.5 rounded-xl ${isMastered ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' : 'bg-slate-700/60 text-slate-400 border border-slate-600/40 hover:text-white'} text-xs font-medium transition flex items-center space-x-1.5">
              <span>${isMastered ? '✓ 已掌握' : '○ 标记为已学'}</span>
            </button>
          </div>
        </div>

        <h2 class="text-2xl font-extrabold text-white mb-2 leading-snug tracking-tight">${node.title}</h2>
        <p class="text-sm text-slate-300 leading-relaxed">${node.summary}</p>
      </div>
    `;

    // Layer 1: Intuition Card
    const intuitionCard = `
      <div class="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-5 mb-6 shadow-md">
        <div class="flex items-center space-x-2 mb-2.5 text-amber-400 font-bold text-sm">
          <span class="text-base">💡</span>
          <span>Layer 1：数学白痴友好 · 生活与物理直觉隐喻</span>
        </div>
        <p class="text-sm text-amber-100/90 leading-relaxed">${node.intuitiveAnalogy}</p>
      </div>
    `;

    // Formal Math Statement Card
    const statementCard = `
      <div class="bg-slate-850 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 mb-6 shadow-sm">
        <div class="text-slate-400 font-bold text-xs uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
          <span>📜</span>
          <span>严格数学定义 / 命题陈述</span>
        </div>
        <div class="text-sm text-slate-200 overflow-x-auto py-1 leading-relaxed">
          ${node.mathStatement.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `;

    // Layer 2: Proof Blueprint Card
    const blueprintCard = `
      <div class="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5 mb-6 shadow-sm">
        <div class="flex items-center space-x-2 mb-2 text-blue-400 font-bold text-sm">
          <span class="text-base">🗺️</span>
          <span>Layer 2：证明战略路线图 (Proof Blueprint)</span>
        </div>
        <p class="text-sm text-blue-100/90 leading-relaxed font-sans">${node.blueprint || "由定义直接展开。"}</p>
      </div>
    `;

    // Layer 3: Microscopic Proof Steps
    const microSteps = (node.microProof || []).map((step, idx) => `
      <div class="border border-slate-700/60 rounded-xl p-4 bg-slate-800/50 mb-3.5 hover:border-slate-600 transition shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30 font-mono">
            Step ${step.step || idx + 1}
          </span>
          <span class="text-[11px] text-slate-400">细致公式推导</span>
        </div>
        <div class="bg-slate-950/70 rounded-lg p-3 font-mono text-sm text-sky-200 overflow-x-auto mb-2.5 border border-slate-800">
          $$${step.formula}$$
        </div>
        <p class="text-sm text-slate-300 leading-relaxed mb-2.5">${step.explanation}</p>
        <div class="bg-emerald-500/10 border-l-4 border-emerald-500 p-3 rounded-r-lg text-xs text-emerald-200">
          <strong class="text-emerald-400">🔬 为什么这一步成立？</strong> ${step.why}
        </div>
      </div>
    `).join('');

    const proofCard = `
      <div class="mb-6">
        <div class="text-slate-100 font-bold text-base mb-3 flex items-center space-x-2">
          <span>🔬</span>
          <span>Layer 3：显微镜级逐行无跳步精解 (${node.microProof ? node.microProof.length : 0} 步推导)</span>
        </div>
        <div>${microSteps}</div>
      </div>
    `;

    // Layer 4: Pitfalls Card
    const pitfallsList = (node.pitfalls || []).map(p => `
      <li class="flex items-start space-x-2 text-xs text-rose-200/90 mb-2">
        <span class="text-rose-400 font-bold mt-0.5">✕</span>
        <span class="leading-relaxed">${p}</span>
      </li>
    `).join('');

    const pitfallsCard = `
      <div class="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-5 mb-6 shadow-sm">
        <div class="flex items-center space-x-2 mb-2 text-rose-400 font-bold text-sm">
          <span class="text-base">⚠️</span>
          <span>Layer 4：易错坑点警示与反例辨析 (Pitfalls & Counterexamples)</span>
        </div>
        <ul class="list-none pl-1">${pitfallsList}</ul>
      </div>
    `;

    // Topological Dependencies & Unlocks
    const depsHtml = (node.dependencies || []).map(d => {
      const depNode = window.MARKOV_MAP[d];
      if (!depNode) return '';
      return `<button onclick="window.APP.renderStepper('${d}')" class="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium hover:bg-amber-500/30 transition">⬅️ ${depNode.title.split(':')[0]}</button>`;
    }).join(' ');

    const unlsHtml = (node.unlocks || []).map(u => {
      const unlNode = window.MARKOV_MAP[u];
      if (!unlNode) return '';
      return `<button onclick="window.APP.renderStepper('${u}')" class="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium hover:bg-emerald-500/30 transition">➡️ ${unlNode.title.split(':')[0]}</button>`;
    }).join(' ');

    const relationsCard = `
      <div class="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 mb-8">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">因果拓扑链路网络</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="text-xs font-semibold text-amber-400 mb-2">前置输入依赖 (Prerequisites)：</div>
            <div class="flex flex-wrap gap-1.5">${depsHtml || '<span class="text-xs text-slate-500">公理或第一定义（无前置依赖）</span>'}</div>
          </div>
          <div>
            <div class="text-xs font-semibold text-emerald-400 mb-2">后继解锁引申 (Unlocks Downstream)：</div>
            <div class="flex flex-wrap gap-1.5">${unlsHtml || '<span class="text-xs text-slate-500">终局应用节点</span>'}</div>
          </div>
        </div>
      </div>
    `;

    // Bottom Navigation Bar (Prev / Next)
    const navBar = `
      <div class="flex items-center justify-between pt-4 border-t border-slate-700/60 mb-12">
        ${prevNode ? `
          <button onclick="window.APP.renderStepper('${prevNode.id}')" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition border border-slate-700 flex items-center space-x-2">
            <span>‹ 上一条：</span>
            <span class="font-bold text-white">${prevNode.title.split(':')[0]}</span>
          </button>
        ` : '<div></div>'}

        ${nextNode ? `
          <button onclick="window.APP.renderStepper('${nextNode.id}')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition shadow-md flex items-center space-x-2">
            <span>下一条：</span>
            <span class="font-bold">${nextNode.title.split(':')[0]}</span>
            <span>›</span>
          </button>
        ` : '<div></div>'}
      </div>
    `;

    container.innerHTML = headerCard + intuitionCard + statementCard + blueprintCard + proofCard + pitfallsCard + relationsCard + navBar;

    // Highlight active in sidebar
    document.querySelectorAll('.stepper-nav-item').forEach(el => {
      if (el.dataset.id === nodeId) {
        el.classList.add('bg-blue-600/30', 'text-sky-300', 'border-blue-500/40');
        el.classList.remove('text-slate-400');
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        el.classList.remove('bg-blue-600/30', 'text-sky-300', 'border-blue-500/40');
        el.classList.add('text-slate-400');
      }
    });

    this.typesetMath();
  }

  renderCodexList(searchQuery = "") {
    const listContainer = document.getElementById('codex-items-list');
    if (!listContainer) return;

    const secFilter = document.getElementById('filter-section')?.value || 'all';
    const typeFilter = document.getElementById('filter-type')?.value || 'all';

    let filtered = window.MARKOV_DATA.filter(item => {
      if (secFilter !== 'all' && item.section !== secFilter) return false;
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(q) ||
               item.summary.toLowerCase().includes(q) ||
               (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));
      }
      return true;
    });

    const countEl = document.getElementById('codex-count');
    if (countEl) countEl.innerText = `${filtered.length} 个条目`;

    listContainer.innerHTML = filtered.map(item => {
      const isMastered = this.masteredNodes.has(item.id);
      return `
        <div onclick="window.APP.openFromCodex('${item.id}')" class="p-5 bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/60 rounded-2xl cursor-pointer transition shadow-md hover:shadow-xl hover:bg-slate-800/90 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
                <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-slate-700/80 text-slate-300">§${item.section}</span>
                <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">${item.badge || item.type}</span>
              </div>
              <span class="text-xs ${isMastered ? 'text-emerald-400 font-bold' : 'text-slate-500'}">
                ${isMastered ? '✓ 已掌握' : '未掌握'}
              </span>
            </div>
            <h3 class="font-bold text-white text-base mb-1.5 leading-snug">${item.title}</h3>
            <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">${item.summary}</p>
          </div>
          <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-700/40">
            ${(item.tags || []).map(t => `<span class="px-2 py-0.5 bg-slate-900/60 text-[10px] text-sky-400 rounded-md font-mono">#${t}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  openFromCodex(nodeId) {
    this.switchView('stepper');
    this.renderStepper(nodeId);
  }

  typesetMath() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.APP = new MarkovApp();
});
