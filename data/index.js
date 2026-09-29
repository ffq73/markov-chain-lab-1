// Data Index & Topological Network Assembly
(function() {
  const allSections = [
    ...(window.SECTION_1_1 || []),
    ...(window.SECTION_1_2 || []),
    ...(window.SECTION_1_3 || []),
    ...(window.SECTION_1_4 || []),
    ...(window.SECTION_1_5 || [])
  ];

  window.MARKOV_DATA = allSections;

  // Build ID-based map
  window.MARKOV_MAP = {};
  allSections.forEach(item => {
    window.MARKOV_MAP[item.id] = item;
  });

  // Build Topological Graph Model
  const sectionColors = {
    "1.1": "#3B82F6", // Blue
    "1.2": "#10B981", // Emerald
    "1.3": "#8B5CF6", // Purple
    "1.4": "#F59E0B", // Amber
    "1.5": "#EC4899"  // Pink
  };

  const typeIcons = {
    "definition": "📖",
    "theorem": "🏆",
    "lemma": "🔑",
    "proposition": "⚡",
    "corollary": "🎯",
    "example": "🌟",
    "exercise": "✏️",
    "remark": "💡"
  };

  // Compute graph nodes with initial hierarchical layout
  const nodes = allSections.map((item, index) => {
    const secNum = parseFloat(item.section);
    // Base x position by section (1.1 -> col 1, 1.2 -> col 2, etc.)
    const colIndex = Math.round((secNum - 1.1) * 10);
    return {
      id: item.id,
      title: item.title,
      section: item.section,
      type: item.type,
      badge: item.badge,
      summary: item.summary,
      color: sectionColors[item.section] || "#6B7280",
      icon: typeIcons[item.type] || "📌",
      dependencies: item.dependencies || [],
      unlocks: item.unlocks || [],
      tags: item.tags || []
    };
  });

  // Compute graph edges based on dependencies
  const edges = [];
  allSections.forEach(item => {
    if (item.dependencies && item.dependencies.length > 0) {
      item.dependencies.forEach(depId => {
        if (window.MARKOV_MAP[depId]) {
          edges.push({
            source: depId,
            target: item.id,
            type: "dependency"
          });
        }
      });
    }
  });

  window.MARKOV_GRAPH = {
    nodes: nodes,
    edges: edges,
    sectionColors: sectionColors,
    typeIcons: typeIcons
  };

  console.log(`[Markov Lab] Loaded ${allSections.length} core knowledge nodes and ${edges.length} dependency edges.`);
})();
