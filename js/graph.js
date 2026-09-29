// Topological Knowledge Graph Engine (High-Aesthetic Canvas with Neon Glow & Starfield Grid)
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
    this.scale = 0.88;
    this.panX = 60;
    this.panY = 40;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    // Animation timer for pulsing halo
    this.animTime = 0;
    this.animFrame = null;

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
    this.startAnimationLoop();
  }

  startAnimationLoop() {
    const loop = () => {
      this.animTime += 0.04;
      this.render();
      this.animFrame = requestAnimationFrame(loop);
    };
    this.animFrame = requestAnimationFrame(loop);
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || 1100;
    this.height = rect.height || 680;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  loadData() {
    const rawData = window.MARKOV_GRAPH;
    if (!rawData) return;
    this.nodes = rawData.nodes.map(n => ({
      ...n,
      x: 0,
      y: 0,
      radius: n.type === 'theorem' ? 26 : (n.type === 'definition' ? 24 : 20)
    }));
    this.edges = rawData.edges.map(e => ({ ...e }));
  }

  layoutNodes() {
    // Hierarchical section-column layout
    const sections = ["1.1", "1.2", "1.3", "1.4", "1.5"];
    const sectionWidth = 300;
    const startX = 160;

    sections.forEach((sec, colIdx) => {
      const secNodes = this.nodes.filter(n => n.section === sec);
      const totalInSec = secNodes.length;
      const verticalGap = 76;
      const totalHeight = totalInSec * verticalGap;
      const startY = Math.max(90, (this.height - totalHeight) / 2 + 40);

      secNodes.forEach((node, rowIdx) => {
        const jitter = (rowIdx % 2 === 0 ? 0 : 35);
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
      } else {
        const hit = this.hitTest(mouseX, mouseY);
        if (hit && hit.id !== this.hoveredNodeId) {
          this.hoveredNodeId = hit.id;
          this.canvas.style.cursor = 'pointer';
          this.showTooltip(hit, e.clientX, e.clientY);
        } else if (!hit && this.hoveredNodeId) {
          this.hoveredNodeId = null;
          this.canvas.style.cursor = 'default';
          this.hideTooltip();
        }
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      const newScale = Math.min(Math.max(this.scale * zoomFactor, 0.35), 2.8);

      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      this.panX = mouseX - (mouseX - this.panX) * (newScale / this.scale);
      this.panY = mouseY - (mouseY - this.panY) * (newScale / this.scale);
      this.scale = newScale;
    });
  }

  hitTest(x, y) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i];
      if (!this.isNodeVisible(n)) continue;
      const dist = Math.hypot(n.x - x, n.y - y);
      if (dist <= n.radius + 8) {
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

    // 1. Draw subtle background coordinate dot-grid
    this.drawBackgroundGrid(ctx);

    ctx.save();
    ctx.translate(this.panX, this.panY);
    ctx.scale(this.scale, this.scale);

    // 2. Section Columns Background Glass Panels
    this.drawSectionBanners(ctx);

    // Get highlighted dependency sets
    const ancestors = this.selectedNodeId ? this.getAncestors(this.selectedNodeId) : new Set();
    const descendants = this.selectedNodeId ? this.getDescendants(this.selectedNodeId) : new Set();

    // 3. Draw Edges with Neon Glow
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

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      const midX = (src.x + tgt.x) / 2;
      ctx.bezierCurveTo(midX, src.y, midX, tgt.y, tgt.x, tgt.y);

      if (isHighlighted) {
        const isDownstream = edge.source === this.selectedNodeId || descendants.has(edge.target);
        ctx.strokeStyle = isDownstream ? "#10B981" : "#F59E0B";
        ctx.lineWidth = 3.5;
        ctx.shadowColor = isDownstream ? "rgba(16, 185, 129, 0.8)" : "rgba(245, 158, 11, 0.8)";
        ctx.shadowBlur = 12;
        ctx.setLineDash([]);
        ctx.stroke();

        this.drawArrowHead(ctx, midX, (src.y + tgt.y) / 2, tgt.x, tgt.y, ctx.strokeStyle);
      } else if (this.selectedNodeId) {
        ctx.strokeStyle = "rgba(100, 116, 139, 0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
      } else {
        ctx.strokeStyle = "rgba(148, 163, 184, 0.28)";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      ctx.restore();
    });

    // 4. Draw Nodes with Quantum Pulse Effect
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

      // Pulsing Neon Halo for Active Selection
      if (isSelected) {
        const pulse = 8 + Math.sin(this.animTime * 3) * 4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.3)";
        ctx.shadowColor = "#3B82F6";
        ctx.shadowBlur = 18;
        ctx.fill();
      } else if (isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 158, 11, 0.25)";
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = 14;
        ctx.fill();
      } else if (isAncestor) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 158, 11, 0.2)";
        ctx.fill();
      } else if (isDescendant) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
        ctx.fill();
      }

      // Outer Ring
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? "#60A5FA" : (isAncestor ? "#FBBF24" : (isDescendant ? "#34D399" : "rgba(255, 255, 255, 0.15)"));
      ctx.lineWidth = isSelected ? 2.5 : 1.2;
      ctx.stroke();

      // Main Node Circle with Radial Gradient
      const grad = ctx.createRadialGradient(node.x - 4, node.y - 4, 2, node.x, node.y, node.radius);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, node.color);
      grad.addColorStop(1, this.darkenColor(node.color, 0.3));

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Node Icon
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `bold ${node.radius * 0.85}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.icon, node.x, node.y + 1);

      // Node Label (Glowing and crisp)
      ctx.font = isSelected ? "bold 12px sans-serif" : "11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = isSelected ? "#93C5FD" : (isAncestor ? "#FDE68A" : (isDescendant ? "#A7F3D0" : "#E2E8F0"));
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 4;

      let shortTitle = node.title.split(":")[0];
      if (shortTitle.length > 18) shortTitle = shortTitle.slice(0, 16) + "..";
      ctx.fillText(shortTitle, node.x, node.y + node.radius + 7);

      ctx.restore();
    });

    ctx.restore();
  }

  drawBackgroundGrid(ctx) {
    const spacing = 32;
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    for (let x = 0; x < this.width; x += spacing) {
      for (let y = 0; y < this.height; y += spacing) {
        ctx.fillRect(x, y, 1.2, 1.2);
      }
    }
    ctx.restore();
  }

  drawSectionBanners(ctx) {
    const sections = [
      { id: "1.1", title: "§1.1 基础概念与分类", color: "rgba(59, 130, 246, 0.04)", border: "rgba(59, 130, 246, 0.2)" },
      { id: "1.2", title: "§1.2 常返与非常返", color: "rgba(16, 185, 129, 0.04)", border: "rgba(16, 185, 129, 0.2)" },
      { id: "1.3", title: "§1.3 正常返与极限定理", color: "rgba(139, 92, 246, 0.04)", border: "rgba(139, 92, 246, 0.2)" },
      { id: "1.4", title: "§1.4 吸收概率与破产", color: "rgba(245, 158, 11, 0.04)", border: "rgba(245, 158, 11, 0.2)" },
      { id: "1.5", title: "§1.5 实用判据与排队论", color: "rgba(236, 72, 153, 0.04)", border: "rgba(236, 72, 153, 0.2)" }
    ];

    const sectionWidth = 300;
    const startX = 160;

    sections.forEach((sec, idx) => {
      const left = startX + idx * sectionWidth - 130;
      const top = 30;
      const colWidth = sectionWidth - 24;
      const colHeight = 720;

      ctx.fillStyle = sec.color;
      ctx.strokeStyle = sec.border;
      ctx.lineWidth = 1;
      this.roundRect(ctx, left, top, colWidth, colHeight, 14, true, true);

      // Section Header Tag
      ctx.fillStyle = "#94A3B8";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(sec.title, left + 16, top + 16);
    });
  }

  darkenColor(hex, amount) {
    let num = parseInt(hex.replace("#", ""), 16);
    let r = Math.max(0, (num >> 16) - Math.round(255 * amount));
    let g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(255 * amount));
    let b = Math.max(0, (num & 0x0000FF) - Math.round(255 * amount));
    return `rgb(${r}, ${g}, ${b})`;
  }

  drawArrowHead(ctx, fromX, fromY, toX, toY, color) {
    const headLen = 11;
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
      tooltip.className = 'fixed z-50 pointer-events-none bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-xl shadow-2xl border border-slate-700/60 text-xs max-w-sm transition-opacity duration-150';
      document.body.appendChild(tooltip);
    }

    tooltip.innerHTML = `
      <div class="flex items-center space-x-2 mb-1.5">
        <span class="text-base">${node.icon}</span>
        <span class="font-bold text-sky-400">${node.badge || node.type}</span>
        <span class="text-slate-400 text-[11px]">§${node.section}</span>
      </div>
      <div class="font-bold text-slate-100 text-sm mb-1 leading-snug">${node.title}</div>
      <div class="text-slate-300 text-xs leading-relaxed">${node.summary}</div>
      <div class="mt-2.5 pt-2 border-t border-slate-800 text-sky-400 font-mono text-[10px] flex items-center justify-between">
        <span>👆 点击卡片进入显微镜逐行拆解</span>
        <span>${node.dependencies.length} 前置 / ${node.unlocks.length} 引申</span>
      </div>
    `;

    tooltip.style.left = `${screenX + 18}px`;
    tooltip.style.top = `${screenY + 15}px`;
    tooltip.style.opacity = '1';
  }

  hideTooltip() {
    const tooltip = document.getElementById('graph-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
    }
  }

  setSectionFilter(sec) {
    this.activeSection = sec;
  }

  setTypeFilter(type) {
    this.activeType = type;
  }

  setSearch(q) {
    this.searchQuery = q;
  }

  zoomIn() {
    this.scale = Math.min(this.scale * 1.2, 2.8);
  }

  zoomOut() {
    this.scale = Math.max(this.scale * 0.8, 0.35);
  }

  resetView() {
    this.scale = 0.88;
    this.panX = 60;
    this.panY = 40;
  }
}

window.MarkovGraph = MarkovGraph;
