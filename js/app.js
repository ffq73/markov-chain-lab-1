// Main Application Logic & View Controller
class MarkovApp {
  constructor() {
    this.currentView = 'graph'; // 'graph', 'stepper', 'sim', 'codex'
    this.currentNodeId = 'thm-1-2-1'; // Default selected node
    this.graphInstance = null;
    this.init();
  }

  init() {
    this.bindNavigation();
    this.bindSearchAndFilter();
    this.initGraph();
    this.initSimulations();
    this.renderCodexList();
    this.renderStepper(this.currentNodeId);
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
        btn.classList.add('bg-blue-600', 'text-white');
        btn.classList.remove('text-gray-600', 'hover:bg-gray-100');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('text-gray-600', 'hover:bg-gray-100');
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
      // Auto open drawer or preview
      this.showQuickPreview(nodeId);
    });

    // Zoom and filter controls
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
          <span class="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800 mb-1">
            ${node.badge || node.type} · §${node.section}
          </span>
          <h4 class="font-bold text-gray-900 text-base">${node.title}</h4>
        </div>
        <button onclick="document.getElementById('graph-quick-preview').classList.add('hidden')" class="text-gray-400 hover:text-gray-600 text-sm">✕</button>
      </div>
      <p class="text-sm text-gray-600 mt-2">${node.summary}</p>
      <div class="mt-3 bg-amber-50 border border-amber-200 rounded p-2 text-xs text-amber-800">
        💡 <strong>白话隐喻：</strong> ${node.intuitiveAnalogy}
      </div>
      <div class="mt-4 flex space-x-3">
        <button id="btn-goto-stepper" class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition shadow-sm">
          🔍 查看显微镜逐行证明
        </button>
      </div>
    `;

    document.getElementById('btn-goto-stepper')?.addEventListener('click', () => {
      this.switchView('stepper');
      this.renderStepper(nodeId);
    });
  }

  renderStepper(nodeId) {
    const node = window.MARKOV_MAP[nodeId];
    if (!node) return;

    this.currentNodeId = nodeId;
    const container = document.getElementById('stepper-content');
    if (!container) return;

    // Render breadcrumbs
    const breadcrumbs = `
      <div class="flex items-center space-x-2 text-xs text-gray-500 mb-4">
        <span>第1章 离散时间马氏链</span>
        <span>›</span>
        <span>§${node.section}</span>
        <span>›</span>
        <span class="font-medium text-gray-800">${node.title.split(':')[0]}</span>
      </div>
    `;

    // Render Header Card
    const headerCard = `
      <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-600 text-white">${node.badge || node.type}</span>
          <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">小节 §${node.section}</span>
          ${(node.tags || []).map(t => `<span class="px-2 py-0.5 text-[11px] rounded bg-blue-50 text-blue-600 font-mono">#${t}</span>`).join('')}
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">${node.title}</h2>
        <p class="text-base text-gray-600 leading-relaxed">${node.summary}</p>
      </div>
    `;

    // Render Layer 1: Intuition Card
    const intuitionCard = `
      <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 mb-6 shadow-sm">
        <div class="flex items-center space-x-2 mb-2 text-amber-800 font-bold text-base">
          <span>💡</span>
          <span>Layer 1：数学白痴友好·生活与物理直觉隐喻</span>
        </div>
        <p class="text-sm text-amber-900 leading-relaxed">${node.intuitiveAnalogy}</p>
      </div>
    `;

    // Render Formal Math Statement
    const statementCard = `
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
        <div class="text-gray-700 font-bold text-sm mb-2 flex items-center space-x-1.5">
          <span>📜</span>
          <span>严格数学定义 / 命题陈述</span>
        </div>
        <div class="text-sm text-gray-800 overflow-x-auto py-2 leading-relaxed">
          ${node.mathStatement.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `;

    // Render Layer 2: Blueprint
    const blueprintCard = `
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
        <div class="flex items-center space-x-2 mb-2 text-blue-800 font-bold text-sm">
          <span>🗺️</span>
          <span>Layer 2：证明战略路线图 (Proof Blueprint)</span>
        </div>
        <p class="text-sm text-blue-900 leading-relaxed font-sans">${node.blueprint || "由定义直接展开。"}</p>
      </div>
    `;

    // Render Layer 3: Microscopic Proof
    const microSteps = (node.microProof || []).map((step, idx) => `
      <div class="border border-gray-200 rounded-lg p-4 bg-white mb-3 hover:border-blue-400 transition shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            ${step.step || idx + 1}
          </span>
          <span class="text-xs text-gray-500">步骤推导</span>
        </div>
        <div class="bg-gray-50 rounded p-3 font-mono text-sm text-gray-900 overflow-x-auto mb-2 border border-gray-100">
          $$${step.formula}$$
        </div>
        <p class="text-sm text-gray-700 leading-relaxed mb-2">${step.explanation}</p>
        <div class="bg-emerald-50 border-l-4 border-emerald-500 p-2.5 rounded-r text-xs text-emerald-900">
          <strong>🔬 为什么这一步成立？</strong> ${step.why}
        </div>
      </div>
    `).join('');

    const proofCard = `
      <div class="mb-6">
        <div class="text-gray-900 font-bold text-lg mb-3 flex items-center space-x-2">
          <span>🔬</span>
          <span>Layer 3：显微镜级逐行无跳步精解 (${node.microProof ? node.microProof.length : 0} 步)</span>
        </div>
        <div>${microSteps}</div>
      </div>
    `;

    // Render Layer 4: Pitfalls
    const pitfallsList = (node.pitfalls || []).map(p => `
      <li class="flex items-start space-x-2 text-xs text-rose-800 mb-1.5">
        <span class="text-rose-500 mt-0.5 font-bold">✕</span>
        <span class="leading-relaxed">${p}</span>
      </li>
    `).join('');

    const pitfallsCard = `
      <div class="bg-rose-50 border border-rose-200 rounded-xl p-5 mb-6 shadow-sm">
        <div class="flex items-center space-x-2 mb-2 text-rose-800 font-bold text-sm">
          <span>⚠️</span>
          <span>易错坑点警示与反例辨析 (Pitfalls & Counterexamples)</span>
        </div>
        <ul class="list-none pl-1">${pitfallsList}</ul>
      </div>
    `;

    // Render Dependencies & Unlocks
    const depsHtml = (node.dependencies || []).map(d => {
      const depNode = window.MARKOV_MAP[d];
      if (!depNode) return '';
      return `<button onclick="window.APP.renderStepper('${d}')" class="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-medium hover:bg-amber-200 transition">⬅️ ${depNode.title.split(':')[0]}</button>`;
    }).join(' ');

    const unlsHtml = (node.unlocks || []).map(u => {
      const unlNode = window.MARKOV_MAP[u];
      if (!unlNode) return '';
      return `<button onclick="window.APP.renderStepper('${u}')" class="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 text-xs font-medium hover:bg-emerald-200 transition">➡️ ${unlNode.title.split(':')[0]}</button>`;
    }).join(' ');

    const relationsCard = `
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">拓扑血缘关系网络</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="text-xs font-semibold text-amber-700 mb-1.5">前置依赖输入 (Prerequisites)：</div>
            <div class="flex flex-wrap gap-1.5">${depsHtml || '<span class="text-xs text-gray-400">无前置依赖（公理或第一定义）</span>'}</div>
          </div>
          <div>
            <div class="text-xs font-semibold text-emerald-700 mb-1.5">后继解锁引申 (Unlocks Downstream)：</div>
            <div class="flex flex-wrap gap-1.5">${unlsHtml || '<span class="text-xs text-gray-400">终局节点</span>'}</div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = breadcrumbs + headerCard + intuitionCard + statementCard + blueprintCard + proofCard + pitfallsCard + relationsCard;
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

    listContainer.innerHTML = filtered.map(item => `
      <div onclick="window.APP.openFromCodex('${item.id}')" class="p-4 bg-white border border-gray-200 hover:border-blue-500 rounded-xl cursor-pointer transition shadow-xs hover:shadow-md">
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center space-x-2">
            <span class="px-2 py-0.5 text-xs font-bold rounded bg-gray-100 text-gray-700">§${item.section}</span>
            <span class="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800">${item.badge || item.type}</span>
          </div>
          <span class="text-xs text-blue-600 font-medium">展开精讲 ›</span>
        </div>
        <h3 class="font-bold text-gray-900 text-base mb-1">${item.title}</h3>
        <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2">${item.summary}</p>
        <div class="flex flex-wrap gap-1">
          ${(item.tags || []).map(t => `<span class="px-1.5 py-0.5 bg-gray-50 border border-gray-200 text-[10px] text-gray-500 rounded">#${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
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
