// Topological Knowledge Graph Engine (Canvas & Interactive Graph)
class MarkovGraph {
  constructor(canvasId, containerId, onNodeSelect) {
    this.canvas = document.getElementById(canvasId);
    this.container = document.getElementById(containerId);
    this.ctx = this.canvas.getContext('2d');
    this.onNodeSelect = onNodeSelect;

    this.nodes = [];
    this.edges = [];
    this.selectedNodeId = null;
    this.hoveredNodeId = null;

    // Viewport transform
    this.scale = 1;
    this.panX = 40;
    this.panY = 40;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    // Filter settings
    this.activeSection = "all";
    this.activeType = "all";
    this.searchQuery = "";

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.bindEvents();
    this.loadData();
    this.layoutNodes();
    this.render();
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || 1000;
    this.height = rect.height || 650;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.render();
  }

  loadData() {
    const rawData = window.MARKOV_GRAPH;
    if (!rawData) return;
    this.nodes = rawData.nodes.map(n => ({
      ...n,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: n.type === 'theorem' ? 24 : (n.type === 'definition' ? 22 : 18)
    }));
    this.edges = rawData.edges.map(e => ({ ...e }));
  }

  layoutNodes() {
    // Hierarchical section-column layout
    const sections = ["1.1", "1.2", "1.3", "1.4", "1.5"];
    const sectionWidth = 280;
    const startX = 140;

    sections.forEach((sec, colIdx) => {
      const secNodes = this.nodes.filter(n => n.section === sec);
      const totalInSec = secNodes.length;
      const verticalGap = 72;
      const totalHeight = totalInSec * verticalGap;
      const startY = Math.max(100, (this.height - totalHeight) / 2 + 50);

      secNodes.forEach((node, rowIdx) => {
        // Stagger slightly for readability
        const jitter = (rowIdx % 2 === 0 ? 0 : 25);
        node.x = startX + colIdx * sectionWidth + jitter;
        node.y = startY + rowIdx * verticalGap;
      });
    });
  }

  bindEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - this.panX) / this.scale;
      const mouseY = (e.clientY - rect.top - this.panY) / this.scale;

      const hit = this.hitTest(mouseX, mouseY);
      if (hit) {
        this.selectNode(hit.id);
      } else {
        this.isDragging = true;
        this.dragStartX = e.clientX - this.panX;
        this.dragStartY = e.clientY - this.panY;
      }
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - this.panX) / this.scale;
      const mouseY = (e.clientY - rect.top - this.panY) / this.scale;

      if (this.isDragging) {
        this.panX = e.clientX - this.dragStartX;
        this.panY = e.clientY - this.dragStartY;
        this.render();
      } else {
        const hit = this.hitTest(mouseX, mouseY);
        if (hit && hit.id !== this.hoveredNodeId) {
          this.hoveredNodeId = hit.id;
          this.canvas.style.cursor = 'pointer';
          this.showTooltip(hit, e.clientX, e.clientY);
          this.render();
        } else if (!hit && this.hoveredNodeId) {
          this.hoveredNodeId = null;
          this.canvas.style.cursor = 'default';
          this.hideTooltip();
          this.render();
        }
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      const newScale = Math.min(Math.max(this.scale * zoomFactor, 0.4), 2.5);

      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      this.panX = mouseX - (mouseX - this.panX) * (newScale / this.scale);
      this.panY = mouseY - (mouseY - this.panY) * (newScale / this.scale);
      this.scale = newScale;
      this.render();
    });
  }

  hitTest(x, y) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i];
      if (!this.isNodeVisible(n)) continue;
      const dist = Math.hypot(n.x - x, n.y - y);
      if (dist <= n.radius + 6) {
        return n;
      }
    }
    return null;
  }

  isNodeVisible(node) {
    if (this.activeSection !== "all" && node.section !== this.activeSection) return false;
    if (this.activeType !== "all" && node.type !== this.activeType) return false;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      const match = node.title.toLowerCase().includes(q) ||
                    node.summary.toLowerCase().includes(q) ||
                    (node.tags && node.tags.some(t => t.toLowerCase().includes(q)));
      if (!match) return false;
    }
    return true;
  }

  selectNode(nodeId) {
    this.selectedNodeId = nodeId;
    this.render();
    if (this.onNodeSelect) {
      this.onNodeSelect(nodeId);
    }
  }

  getAncestors(nodeId, set = new Set()) {
    const node = window.MARKOV_MAP[nodeId];
    if (!node || !node.dependencies) return set;
    node.dependencies.forEach(dep => {
      if (!set.has(dep)) {
        set.add(dep);
        this.getAncestors(dep, set);
      }
    });
    return set;
  }

  getDescendants(nodeId, set = new Set()) {
    const node = window.MARKOV_MAP[nodeId];
    if (!node || !node.unlocks) return set;
    node.unlocks.forEach(unl => {
      if (!set.has(unl)) {
        set.add(unl);
        this.getDescendants(unl, set);
      }
    });
    return set;
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    ctx.translate(this.panX, this.panY);
    ctx.scale(this.scale, this.scale);

    // Section Columns Background Banners
    this.drawSectionBanners(ctx);

    // Get highlighted dependency sets
    const ancestors = this.selectedNodeId ? this.getAncestors(this.selectedNodeId) : new Set();
    const descendants = this.selectedNodeId ? this.getDescendants(this.selectedNodeId) : new Set();

    // 1. Draw Edges
    this.edges.forEach(edge => {
      const src = this.nodes.find(n => n.id === edge.source);
      const tgt = this.nodes.find(n => n.id === edge.target);
      if (!src || !tgt) return;

      const isSrcVis = this.isNodeVisible(src);
      const isTgtVis = this.isNodeVisible(tgt);
      if (!isSrcVis && !isTgtVis) return;

      const isHighlighted = this.selectedNodeId && (
        (edge.source === this.selectedNodeId && descendants.has(edge.target)) ||
        (ancestors.has(edge.source) && (edge.target === this.selectedNodeId || ancestors.has(edge.target)))
      );

      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      // Curved bezier curve
      const midX = (src.x + tgt.x) / 2;
      ctx.bezierCurveTo(midX, src.y, midX, tgt.y, tgt.x, tgt.y);

      if (isHighlighted) {
        ctx.strokeStyle = edge.source === this.selectedNodeId || descendants.has(edge.target) ? "#10B981" : "#F59E0B";
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
      } else if (this.selectedNodeId) {
        ctx.strokeStyle = "rgba(156, 163, 175, 0.15)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
      } else {
        ctx.strokeStyle = "rgba(156, 163, 175, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
      }
      ctx.stroke();

      // Arrow head for highlighted lines
      if (isHighlighted) {
        this.drawArrowHead(ctx, midX, (src.y + tgt.y) / 2, tgt.x, tgt.y, ctx.strokeStyle);
      }
    });

    // 2. Draw Nodes
    this.nodes.forEach(node => {
      const isVisible = this.isNodeVisible(node);
      const isSelected = node.id === this.selectedNodeId;
      const isHovered = node.id === this.hoveredNodeId;
      const isAncestor = ancestors.has(node.id);
      const isDescendant = descendants.has(node.id);

      ctx.save();
      let alpha = 1;
      if (!isVisible) {
        alpha = 0.12;
      } else if (this.selectedNodeId && !isSelected && !isAncestor && !isDescendant) {
        alpha = 0.28;
      }
      ctx.globalAlpha = alpha;

      // Outer glow for selected or hovered
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "rgba(59, 130, 246, 0.35)" : "rgba(245, 158, 11, 0.3)";
        ctx.fill();
      } else if (isAncestor) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 158, 11, 0.25)";
        ctx.fill();
      } else if (isDescendant) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
        ctx.fill();
      }

      // Main Node Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.lineWidth = isSelected ? 3.5 : 2;
      ctx.strokeStyle = isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)";
      ctx.stroke();

      // Node Icon / Type Symbol
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `${node.radius * 0.85}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.icon, node.x, node.y);

      // Node Title Label below
      ctx.fillStyle = isSelected ? "#3B82F6" : (isAncestor ? "#D97706" : (isDescendant ? "#059669" : "#374151"));
      ctx.font = isSelected ? "bold 12px sans-serif" : "11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      // Truncate long title
      let shortTitle = node.title.split(":")[0];
      if (shortTitle.length > 18) shortTitle = shortTitle.slice(0, 16) + "..";
      ctx.fillText(shortTitle, node.x, node.y + node.radius + 5);

      ctx.restore();
    });

    ctx.restore();
  }

  drawSectionBanners(ctx) {
    const sections = [
      { id: "1.1", title: "§1.1 基础概念与分类", color: "rgba(59, 130, 246, 0.06)", border: "rgba(59, 130, 246, 0.2)" },
      { id: "1.2", title: "§1.2 常返与非常返", color: "rgba(16, 185, 129, 0.06)", border: "rgba(16, 185, 129, 0.2)" },
      { id: "1.3", title: "§1.3 正常返与极限定理", color: "rgba(139, 92, 246, 0.06)", border: "rgba(139, 92, 246, 0.2)" },
      { id: "1.4", title: "§1.4 吸收概率与赌徒破产", color: "rgba(245, 158, 11, 0.06)", border: "rgba(245, 158, 11, 0.2)" },
      { id: "1.5", title: "§1.5 实用判据与排队论", color: "rgba(236, 72, 153, 0.06)", border: "rgba(236, 72, 153, 0.2)" }
    ];

    const sectionWidth = 280;
    const startX = 140;

    sections.forEach((sec, idx) => {
      const left = startX + idx * sectionWidth - 120;
      const top = 30;
      const colWidth = sectionWidth - 20;
      const colHeight = 650;

      ctx.fillStyle = sec.color;
      ctx.strokeStyle = sec.border;
      ctx.lineWidth = 1;
      this.roundRect(ctx, left, top, colWidth, colHeight, 12, true, true);

      // Section Header Tag
      ctx.fillStyle = "#4B5563";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(sec.title, left + 15, top + 15);
    });
  }

  drawArrowHead(ctx, fromX, fromY, toX, toY, color) {
    const headLen = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  showTooltip(node, screenX, screenY) {
    let tooltip = document.getElementById('graph-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'graph-tooltip';
      tooltip.className = 'fixed z-50 pointer-events-none bg-gray-900 text-white p-3 rounded-lg shadow-xl text-xs max-w-xs transition-opacity duration-150';
      document.body.appendChild(tooltip);
    }

    tooltip.innerHTML = `
      <div class="flex items-center space-x-1.5 mb-1">
        <span class="text-sm">${node.icon}</span>
        <span class="font-bold text-blue-300">${node.badge || node.type}</span>
        <span class="text-gray-400">§${node.section}</span>
      </div>
      <div class="font-semibold text-gray-100 text-sm mb-1">${node.title}</div>
      <div class="text-gray-300 leading-snug">${node.summary}</div>
      <div class="mt-2 text-blue-400 font-mono text-[10px]">👆 点击卡片进入显微镜逐行拆解</div>
    `;

    tooltip.style.left = `${screenX + 15}px`;
    tooltip.style.top = `${screenY + 15}px`;
    tooltip.style.opacity = '1';
  }

  hideTooltip() {
    const tooltip = document.getElementById('graph-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
    }
  }

  // API methods for external toolbar
  setSectionFilter(sec) {
    this.activeSection = sec;
    this.render();
  }

  setTypeFilter(type) {
    this.activeType = type;
    this.render();
  }

  setSearch(q) {
    this.searchQuery = q;
    this.render();
  }

  zoomIn() {
    this.scale = Math.min(this.scale * 1.2, 2.5);
    this.render();
  }

  zoomOut() {
    this.scale = Math.max(this.scale * 0.8, 0.4);
    this.render();
  }

  resetView() {
    this.scale = 1;
    this.panX = 40;
    this.panY = 40;
    this.render();
  }
}

window.MarkovGraph = MarkovGraph;
