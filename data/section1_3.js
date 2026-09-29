// Section 1.3: 正常返与零常返状态 (pp. 52 - 62)
window.SECTION_1_3 = [
  {
    id: "def-1-3-1",
    section: "1.3",
    type: "definition",
    title: "定义 1.3.1: 正常返 (Positive Recurrent) 与 零常返 (Null Recurrent)",
    badge: "核心分水岭",
    tags: ["正常返", "零常返", "强遍历", "弱遍历", "平均回访时间"],
    summary: "回访概率虽然都是100%，但『等待回访的平均时间』是有限的还是无穷大？由此分化出繁荣与虚无的两个世界。",
    intuitiveAnalogy: "两个人都承诺『一定会回来看你』。第一位平均每隔3天就回来看你一次（正常返/强遍历）；第二位虽然每次也确实都回来了，但他每次回来的平均间隔是『无穷多天』（零常返/弱遍历）！随着时间流逝，你看到第二位在身边的概率被无限稀释趋于0。",
    mathStatement: `设 $i$ 是常返状态。
1. **零常返 (Null Recurrent / Weakly Ergodic)**：若 $\\lim_{n \\to \\infty} p_{ij}^{(n)} = 0$ 对某个（等价地，对所有）$j \\in C(i)$ 成立。
2. **正常返 (Positive Recurrent / Strongly Ergodic)**：若不满足上述条件，即存在 $j \\in C(i)$ 使得 $\\limsup_{n \\to \\infty} p_{ij}^{(n)} > 0$。
（注：一维和二维对称随机游走虽然是常返的，但由于 $p_{00}^{(2n)} \\to 0$，它们全都是**零常返**的！）。`,
    blueprint: "用极限概率是否为 0 作为动态遍历性的分界线。",
    microProof: [
      {
        step: 1,
        formula: "\\text{一维对称游走：} p_{00}^{(2n)} \\sim \\frac{1}{\\sqrt{\\pi n}} \\to 0 \\quad (n \\to \\infty)",
        explanation: "虽然求和 $\\sum p_{00}^{(2n)} = \\infty$（常返），但单项概率在无限稀释趋于 0！",
        why: "典型零常返代表。"
      }
    ],
    pitfalls: [
      "切勿认为『常返就一定有平稳分布』！零常返链在无穷远处概率全部消散，无法沉淀出任何合法的平稳概率分布！"
    ],
    dependencies: ["thm-1-2-1", "thm-1-2-10"],
    unlocks: ["thm-1-3-2", "thm-1-3-3", "thm-1-3-8"]
  },
  {
    id: "fn-9-finite-pos",
    section: "1.3",
    type: "exercise",
    title: "Footnote 9 习题: 有限不可约马氏链必为正常返",
    badge: "基础结论",
    tags: ["有限状态", "全概率守恒", "反证法"],
    summary: "在有限个格子里跳跃的不可约粒子，绝不可能发生零常返，必定是正常返！",
    intuitiveAnalogy: "有限个房间内总人数守恒（总概率为1）。如果每个房间里的人数比例在长远看都趋于0，那么有限个0加起来还是0，总人数凭空蒸发了，这在有限世界是绝对不可能的！",
    mathStatement: `设 $P$ 为有限状态 $N \\times N$ ($N < \\infty$) 的不可约马氏矩阵，证明该马氏链必为正常返。`,
    blueprint: "若反设为零常返，所有转移极限均为0，有限项求和导致 $1 = 0$ 的直接算术矛盾。",
    microProof: [
      {
        step: 1,
        formula: "\\sum_{j=1}^N p_{ij}^{(n)} = 1 \\quad (\\forall n \\ge 1, \\forall i \\in S)",
        explanation: "马氏矩阵每行元素之和恒等于 1。",
        why: "全概率公式。"
      },
      {
        step: 2,
        formula: "\\text{反设链为零常返 } \\implies \\forall j \\in S, \\ \\lim_{n \\to \\infty} p_{ij}^{(n)} = 0",
        explanation: "零常返按定义要求所有单点极限为 0。",
        why: "定义 1.3.1。"
      },
      {
        step: 3,
        formula: "1 = \\lim_{n \\to \\infty} \\sum_{j=1}^N p_{ij}^{(n)} = \\sum_{j=1}^N \\lim_{n \\to \\infty} p_{ij}^{(n)} = \\sum_{j=1}^N 0 = 0",
        explanation: "因为求和项只有**有限个 $N$ 项**，极限符号与求和号可以自由交换，得到 $1 = 0$ 荒谬矛盾！",
        why: "有限项和的极限等于极限的和。"
      },
      {
        step: 4,
        formula: "\\therefore \\text{有限不可约马氏链不可能零常返，必为正常返！}",
        explanation: "反证法完毕。",
        why: "逻辑结论。"
      }
    ],
    pitfalls: [
      "无限状态空间为什么不矛盾？因为无限项时 $\\lim \\sum \\ne \\sum \\lim$！沙子漏向了无穷远处。"
    ],
    dependencies: ["def-1-3-1", "ex-1-1-4"],
    unlocks: ["cor-1-3-10"]
  },
  {
    id: "fn-10-limit-class",
    section: "1.3",
    type: "exercise",
    title: "Footnote 10 习题: 互通类中转移极限的全局一致性",
    badge: "类性质",
    tags: ["互通类", "夹逼放缩", "C-K不等式"],
    summary: "同一互通类中的状态同生共死：只要有一对状态之间的转移概率衰减为0，整个类内所有状态对之间的转移概率全部衰减为0！",
    intuitiveAnalogy: "联通的管道系统：只要水管某处彻底干涸，由于处处相通，整套水循环在远期必然全部枯竭。",
    mathStatement: `设 $k \\in S$。若对某个状态对 $i, j \\in C(k)$ 有 $\\lim_{n \\to \\infty} p_{ij}^{(n)} = 0$，证明对类内任意状态对 $i', j' \\in C(k)$，亦必有：
$$\\lim_{n \\to \\infty} p_{i'j'}^{(n)} = 0$$`,
    blueprint: "利用双向可达路径将 $p_{i'j'}^{(n+m+\\ell)}$ 从下方放缩出含有 $p_{ij}^{(m)}$ 的项，再用反向夹逼完成证明。",
    microProof: [
      {
        step: 1,
        formula: "i', i \\in C(k) \\implies \\exists u \\text{ s.t. } p_{i'i}^{(u)} > 0; \\quad j, j' \\in C(k) \\implies \\exists v \\text{ s.t. } p_{jj'}^{(v)} > 0",
        explanation: "由互通类的定义，存在从 $i'$ 到 $i$ 的通路和从 $j$ 到 $j'$ 的通路。",
        why: "互通定义。"
      },
      {
        step: 2,
        formula: "p_{i'j'}^{(u + n + v)} \\ge p_{i'i}^{(u)} \\cdot p_{ij}^{(n)} \\cdot p_{jj'}^{(v)}",
        explanation: "由 C-K 方程，走 $u+n+v$ 步的全部路径中，包含先走 $u$ 步到 $i$，再走 $n$ 步到 $j$，最后走 $v$ 步到 $j'$ 的子路径集合。",
        why: "C-K 不等式。"
      },
      {
        step: 3,
        formula: "\\text{交换两端关系对逆向状态放缩，结合夹逼定理，迫使所有转移极限具有相同的敛散行为。}",
        explanation: "若某一极限为0，任意其他位置的极限若不为0就会通过固定系数传递矛盾。",
        why: "夹逼定理与反证法。"
      }
    ],
    pitfalls: ["此性质再次确立了『零常返』也是一个互通类性质。"],
    dependencies: ["concept-communication", "def-1-3-1"],
    unlocks: ["thm-1-3-8"]
  },
  {
    id: "thm-1-3-2",
    section: "1.3",
    type: "theorem",
    title: "定理 1.3.2: 基础更新极限定理 (Basic Renewal Limit Theorem)",
    badge: "数学引擎",
    tags: ["更新理论", "卷积方程", "Erdos-Feller-Pollard"],
    summary: "整个马尔科夫链遍历极限的数学底座：更新卷积方程的渐近极限比值公式！",
    intuitiveAnalogy: "水库水位 $u_n$ 每周期受到补水 $b_n$ 与历史回流 $\\sum a_{n-k} u_k$ 共同影响。在经过无数轮迭代后，最终的稳定水位等于：外源输入的总量 $\\sum b_k$，除以系统自我更新一次的平均周期 $\\sum k a_k$！",
    mathStatement: `设数列 $\\{a_n\\}_{n \\ge 0}$ 满足 $a_n \\ge 0, \\sum_{n=0}^\\infty a_n = 1$，且最大公约数 $\\gcd\\{n \\mid a_n > 0\\} = 1$（非周期）。
数列 $\\{b_n\\}_{n \\ge 0}$ 绝对可和：$\\sum_{k=0}^\\infty |b_k| < \\infty$。
若有界实数列 $\\{u_n\\}_{n \\ge 0}$ 满足更新方程：
$$u_n = \\sum_{k=0}^n a_{n-k} u_k + b_n \\quad (\\forall n \\ge 0)$$
则极限必存在，且精确等于两级数之比：
$$\\lim_{n \\to +\\infty} u_n = \\frac{\\sum_{k=0}^\\infty b_k}{\\sum_{k=0}^\\infty k a_k}$$
（约定：若分母 $\\sum k a_k = \\infty$，则极限为 0）。`,
    blueprint: "此定理为经典 Erdös-Feller-Pollard 更新定理，在马氏链中令 $a_n = f_{jj}^{(n)}, u_n = p_{jj}^{(n)}$ 即能瞬间击穿转移极限。",
    microProof: [
      {
        step: 1,
        formula: "\\text{令 } \\mu = \\sum_{k=0}^\\infty k a_k \\quad (\\text{平均更新间隔})",
        explanation: "这是系统两次更新之间的期望时间差。",
        why: "一阶加权矩定义。"
      },
      {
        step: 2,
        formula: "B = \\sum_{k=0}^\\infty b_k \\quad (\\text{总扰动输入量})",
        explanation: "外生项的累积贡献值。",
        why: "级数和定义。"
      },
      {
        step: 3,
        formula: "\\lim_{n \\to \\infty} u_n = \\frac{B}{\\mu}",
        explanation: "由更新论的核心极限定理，非周期性保证了周期性震荡被完全平滑，极限收敛到稳态流动比例。",
        why: "Erdös-Feller-Pollard 更新定理应用。"
      }
    ],
    pitfalls: [
      "条件中 $\\gcd = 1$ 绝不可少！若公约数 $d \\ge 2$，序列会在周期模下发生震荡，单项极限不存在，只能求时间平均（Cesàro 和）。"
    ],
    dependencies: ["lemma-1-2-6"],
    unlocks: ["thm-1-3-3", "prop-1-3-13"]
  },
  {
    id: "thm-1-3-3",
    section: "1.3",
    type: "theorem",
    title: "定理 1.3.3: 基础极限定理 (Markov 1906 - Kolmogorov 1936)",
    badge: "全章核心",
    tags: ["大极限定理", "遍历性", "平均回访时间", "稳态概率"],
    summary: "不可约常返非周期马氏链的终极宿命：长期转移概率精确等于平均回访时间的倒数！",
    intuitiveAnalogy: "如果你回家的平均间隔是 5 天，那么在无限漫长的日子里，任何随机抽查的一天，你在家里的概率就精确等于 1/5！而且这个概率完全不依赖你当年是从哪座城市出发的！",
    mathStatement: `设 $X$ 为不可约、常返、非周期的马氏链。则对任意状态 $i, j \\in S$：
$$\\lim_{n \\to +\\infty} p_{ij}^{(n)} = \\pi_j = \\frac{1}{m_{jj}} = \\frac{1}{\\sum_{n=1}^\\infty n f_{jj}^{(n)}}$$
其中 $m_{jj} = E_j[T_j]$ 是状态 $j$ 的平均第一回访时间：
- 若 $j$ 是正常返态，则 $m_{jj} < \\infty$，极限 $\\pi_j > 0$；
- 若 $j$ 是零常返态，则 $m_{jj} = \\infty$，极限 $\\pi_j = 0$。`,
    blueprint: "第一步先证 $i=j$：将更新卷积公式映射到定理 1.3.2；第二步证明 $i \\ne j$：利用戴雄平定理 $f_{ij}^* = 1$ 与控制收敛定理消除初始状态偏差。",
    microProof: [
      {
        step: 1,
        formula: "\\text{【第一部分：} i = j \\text{】由引理 1.2.6：} p_{jj}^{(n)} = \\sum_{k=0}^n f_{jj}^{(n-k)} p_{jj}^{(k)} + b_n, \\quad \\text{其中 } b_0=1, b_n=0 (n>0)",
        explanation: "因为 $f_{jj}^{(0)} = 0$，上式正好将 $p_{jj}^{(n)}$ 与更新方程 $u_n = \\sum a_{n-k} u_k + b_n$ 完全对齐！其中 $u_n = p_{jj}^{(n)}, a_n = f_{jj}^{(n)}$。",
        why: "完全匹配更新方程标准型。"
      },
      {
        step: 2,
        formula: "\\sum_{k=0}^\\infty b_k = 1, \\quad \\sum_{k=0}^\\infty k a_k = \\sum_{k=1}^\\infty k f_{jj}^{(k)} = m_{jj}",
        explanation: "直接计算分子与分母：输入项之和为 1，更新间隔加权和正好是平均回访时间 $m_{jj}$！",
        why: "代入数值。"
      },
      {
        step: 3,
        formula: "\\lim_{n \\to \\infty} p_{jj}^{(n)} = \\frac{1}{m_{jj}} =: \\pi_j",
        explanation: "由定理 1.3.2 基础更新极限定理，直接导出对角线自转移极限等于 $1/m_{jj}$！第一部分得证！",
        why: "定理 1.3.2。"
      },
      {
        step: 4,
        formula: "\\text{【第二部分：} i \\ne j \\text{】由戴雄平定理 (定理 1.2.11)，} f_{ij}^* = \\sum_{m=0}^\\infty f_{ij}^{(m)} = 1",
        explanation: "因为链不可约且常返，从 $i$ 击中 $j$ 的总概率必为 1！",
        why: "定理 1.2.11。"
      },
      {
        step: 5,
        formula: "p_{ij}^{(n)} - \\pi_j = \\sum_{k=0}^n f_{ij}^{(n-k)} p_{jj}^{(k)} - \\pi_j \\sum_{m=0}^\\infty f_{ij}^{(m)} = \\sum_{k=0}^n f_{ij}^{(n-k)} (p_{jj}^{(k)} - \\pi_j) - \\pi_j \\sum_{m=n+1}^\\infty f_{ij}^{(m)}",
        explanation: "在 $\\pi_j$ 后面配上 $1 = \\sum f_{ij}^{(m)}$，拆成前 $n$ 项与 $n$ 项之后的尾巴。",
        why: "恒等配凑代数技巧。"
      },
      {
        step: 6,
        formula: "\\lim_{n \\to \\infty} \\sum_{m=n+1}^\\infty f_{ij}^{(m)} = 0 \\quad (\\text{收敛级数尾部})",
        explanation: "因为级数和为 1 收敛，其远端残差尾和必定趋于 0。",
        why: "级数收敛性质。"
      },
      {
        step: 7,
        formula: "\\lim_{n \\to \\infty} \\sum_{k=0}^n f_{ij}^{(n-k)} (p_{jj}^{(k)} - \\pi_j) = 0",
        explanation: "因为 $p_{jj}^{(k)} \\to \\pi_j$，由类似 Stolz-Cesàro 卷积性质或控制收敛定理，该卷积和在 $n \\to \\infty$ 时严格趋向 0！",
        why: "微积分卷积极限引理。"
      },
      {
        step: 8,
        formula: "\\therefore \\lim_{n \\to \\infty} p_{ij}^{(n)} = \\pi_j = \\frac{1}{m_{jj}} \\quad (\\forall i \\in S)",
        explanation: "两项全部消去，极限完全独立于起点 $i$！全定理证毕！",
        why: "完成证明。"
      }
    ],
    pitfalls: [
      "请深刻领悟为什么极限与初始起点 $i$ 完全无关：在经历了无穷多次随机转移后，系统彻底洗刷掉了起点的先验记忆，进入统计平衡！"
    ],
    dependencies: ["thm-1-3-2", "lemma-1-2-6", "thm-1-2-11"],
    unlocks: ["thm-1-3-6", "thm-1-3-8", "prop-1-3-14"]
  },
  {
    id: "fn-11-gcd",
    section: "1.3",
    type: "exercise",
    title: "Footnote 11 习题: 首次回访步长与转移步长最大公约数恒等证明",
    badge: "数论严密性",
    tags: ["最大公约数", "集合整除", "周期一致"],
    summary: "证明集合 $\\{m > 0 \\mid f_{jj}^{(m)} > 0\\}$ 与 $\\{n > 0 \\mid p_{jj}^{(n)} > 0\\}$ 的最大公约数完全相同！",
    intuitiveAnalogy: "任何一条回访路径，拆开看都只是一连串『第一次回访』的首尾拼接。因此全部回访步数的公因子，和首次回访步数的公因子必定同一源头。",
    mathStatement: `对任意状态 $j$，证明两个正整数集合：
$$J_f = \\{m > 0 \\mid f_{jj}^{(m)} > 0\\} \\quad \\text{与} \\quad J_p = \\{n > 0 \\mid p_{jj}^{(n)} > 0\\}$$
拥有完全相同的最大公约数 $d_j$。`,
    blueprint: "由 $f_{jj}^{(m)} \\le p_{jj}^{(m)}$ 得 $J_f \\subseteq J_p$ 得一边不等式；由路径拆解 $n = m_1 + \\dots + m_r$ 得反向整除。",
    microProof: [
      {
        step: 1,
        formula: "f_{jj}^{(m)} > 0 \\implies p_{jj}^{(m)} \\ge f_{jj}^{(m)} > 0 \\implies J_f \\subseteq J_p",
        explanation: "首次回访本身就是一种可能的回访，概率包含关系显然成立。",
        why: "子事件包含关系。"
      },
      {
        step: 2,
        formula: "d := \\gcd(J_f) \\implies \\forall m \\in J_f, \\ d \\mid m \\implies d \\ge \\gcd(J_p) = d_j",
        explanation: "较小子集的公约数必然大于等于较大超集的公约数。",
        why: "最大公约数单调性。"
      },
      {
        step: 3,
        formula: "\\forall n \\in J_p \\ (n \\ge 2), \\quad \\exists n = m_1 + m_2 + \\dots + m_r \\text{ s.t. } f_{jj}^{(m_k)} > 0",
        explanation: "任一包含中间回访的路径，都可以按每次回访 $j$ 的时刻切断，分解为 $r$ 段互不相交的首次回访循环！每一段长度 $m_k \\in J_f$！",
        why: "回访路径的时序唯一分解。"
      },
      {
        step: 4,
        formula: "d \\mid m_k (\\forall k) \\implies d \\mid \\sum_{k=1}^r m_k = n \\implies d \\mid n (\\forall n \\in J_p) \\implies d \\le d_j",
        explanation: "既然 $d$ 能整除每一个小分段，就必定能整除总步数 $n$。故 $d$ 也是 $J_p$ 的公约数，因此 $d \\le d_j$！",
        why: "整除的可加性。"
      },
      {
        step: 5,
        formula: "d \\ge d_j \\text{ 且 } d \\le d_j \\implies d = d_j",
        explanation: "两边夹紧，两者最大公约数绝对恒等！证毕！",
        why: "反对称性。"
      }
    ],
    pitfalls: ["确保了在更新极限定理中直接用转移周期 $d_j$ 替代首次回访周期的严密性。"],
    dependencies: ["thm-1-3-3", "def-period"],
    unlocks: ["remark-1-3-5"]
  },
  {
    id: "remark-1-3-5",
    section: "1.3",
    type: "remark",
    title: "注记 1.3.5: 周期常返态的时间平均 (Cesàro) 极限与周期子步跳跃",
    badge: "周期遍历",
    tags: ["Cesaro平均", "时间平均", "周期震荡"],
    summary: "周期性会导致单步极限震荡不存在，但平滑的时间平均依然稳如泰山地收敛到 $1/m_{ii}$！",
    intuitiveAnalogy: "四季变换周期为4：你不能问『无穷远处的某一天是夏天还是冬天』（无法收敛），但如果你统计一生中夏天的总天数占全部天数的比例，这个平均值永远是精确的 1/4！",
    mathStatement: `若状态 $i$ 属于周期为 $d \\ge 2$ 的常返类 $C$：
(1) 单子步沿周期倍数跳跃极限：
$$\\lim_{n \\to +\\infty} p_{ii}^{(n d)} = \\frac{d}{m_{ii}} = d \\pi_i$$
（其余非整除步数 $p_{ii}^{(m)} = 0$）；
(2) **时间平均 (Cesàro 平均) 极限恒成立**：
$$\\lim_{n \\to +\\infty} \\frac{1}{n} \\sum_{k=1}^n p_{ii}^{(k)} = \\frac{1}{m_{ii}} = \\pi_i \\quad (\\forall i \\in C)$$`,
    blueprint: "将时间按 $n d$ 抽取子序列，应用定理 1.3.3 到跳步链 $Y_n = X_{nd}$，再通过求和平均将周期系数 $d$ 平滑抹平。",
    microProof: [
      {
        step: 1,
        formula: "Y_n = X_{nd} \\implies \\text{转移矩阵为 } P^d, \\quad \\text{且 } Y \\text{ 是非周期的！}",
        explanation: "按周期 $d$ 抽样后，新过程 $Y$ 的步长全部被 $d$ 整除，其周期变为 $d/d = 1$（非周期）！",
        why: "周期消除变换。"
      },
      {
        step: 2,
        formula: "m_{ii}(Y) = \\frac{m_{ii}(X)}{d} \\implies \\lim_{n \\to \\infty} p_{ii}^{(nd)}(X) = \\lim_{n \\to \\infty} p_{ii}^{(n)}(Y) = \\frac{1}{m_{ii}(Y)} = \\frac{d}{m_{ii}(X)}",
        explanation: "将基本极限定理应用到新链 $Y$，单点极限为 $d/m_{ii}$，(1)得证！",
        why: "定理 1.3.3 应用到子链。"
      },
      {
        step: 3,
        formula: "\\frac{1}{n} \\sum_{k=1}^n p_{ii}^{(k)} = \\frac{1}{n} \\sum_{r \\le n/d} p_{ii}^{(rd)} \\approx \\frac{1}{n} \\left( \\frac{n}{d} \\cdot \\frac{d}{m_{ii}} \\right) = \\frac{1}{m_{ii}} = \\pi_i",
        explanation: "在 $n$ 项求和中，非零项只有 $n/d$ 个，每一项极限为 $d/m_{ii}$，相乘除以 $n$，因子 $d$ 被精确消去！(2)得证！",
        why: "Cesàro 求和平均。"
      }
    ],
    pitfalls: [
      "牢记：周期链的单步极限 $\\lim p_{ii}^{(n)}$ 不存在，必须写成 Cesàro 时间平均，或者沿子序列 $nd$ 取极限。"
    ],
    dependencies: ["thm-1-3-3", "fn-11-gcd"],
    unlocks: ["prop-1-3-13", "thm-1-3-8"]
  },
  {
    id: "def-1-3-7",
    section: "1.3",
    type: "definition",
    title: "定义 1.3.7: 平稳分布 / 不变分布 (Stationary / Invariant Distribution)",
    badge: "系统不动点",
    tags: ["平稳分布", "特征向量", "平衡态"],
    summary: "马尔科夫链的动力学不动点：一旦系统达到该概率分布，无论怎么随时间转移，宏观分布永恒不变！",
    intuitiveAnalogy: "各城市间的人口动态迁移平衡：虽然每天都有成千上万人坐火车在城市间奔波，但每个城市每天迁入的人数刚好等于迁出的人数，使得全省每个城市的人口总数始终保持恒定！",
    mathStatement: `概率向量 $\\pi = (\\pi_i)_{i \\in S}$ 称为马氏链 $P$ 的**平稳分布 (Stationary / Invariant Distribution)**，若满足：
$$\\pi \\ge 0, \\quad \\sum_{i \\in S} \\pi_i = 1, \\quad \\text{且 } \\pi = \\pi P$$
展开即对每个状态 $j$：$\\pi_j = \\sum_{i \\in S} \\pi_i p_{ij}$。
若初始分布取为平稳分布 $P_{X_0} = \\pi$，则对所有未来时刻 $n \\ge 1$ 均有 $P_{X_n} = \\pi$（各时刻同分布）。`,
    blueprint: "作为概率测度转移算子 $T(\\mu) = \\mu P$ 的代数不动点定义。",
    microProof: [
      {
        step: 1,
        formula: "P\\{X_1 = j\\} = \\sum_i P(X_0=i) p_{ij} = \\sum_i \\pi_i p_{ij} = (\\pi P)_j = \\pi_j",
        explanation: "一步转移后，边际分布仍然是 $\\pi$。",
        why: "全概率公式。"
      },
      {
        step: 2,
        formula: "P_{X_n} = \\pi P^n = (\\dots((\\pi P)P)\\dots) = \\pi",
        explanation: "由数学归纳法，任意有限时刻边际分布恒等于 $\\pi$。",
        why: "归纳法。"
      }
    ],
    pitfalls: [
      "一定要注意是行向量左乘矩阵：$\\pi = \\pi P$（左特征向量），绝对不是列向量右乘 $P \\pi = \\pi$！"
    ],
    dependencies: ["concept-trans-matrix"],
    unlocks: ["thm-1-3-6", "thm-1-3-8"]
  },
  {
    id: "thm-1-3-6",
    section: "1.3",
    type: "theorem",
    title: "定理 1.3.6: 正常返非周期类的平稳分布存在唯一性定理",
    badge: "遍历核心",
    tags: ["存在唯一性", "控制收敛", "不动点"],
    summary: "在正常返非周期的常返类中，极限向量 $\\pi = (1/m_{ii})$ 不仅存在，而且恰恰是全系统唯一的平稳分布！",
    intuitiveAnalogy: "不管系统从什么样的初始状态混乱起跑，万流归海，时间的终局必将以唯一的平稳分布 $\\pi$ 为唯一归宿。",
    mathStatement: `在 $P$ 的正常返非周期类 $C$ 中：
(1) 极限向量 $\\pi_j = \\lim_{n \\to \\infty} p_{jj}^{(n)} > 0$ 满足平稳方程 $\\pi_j = \\sum_{i \\in C} \\pi_i p_{ij}$ 且 $\\sum_{j \\in C} \\pi_j = 1$；
(2) 平稳分布是**唯一的**，即方程组 $x \\ge 0, \\sum x_j = 1, x = xP$ 仅有唯一的正解 $x = \\pi$。`,
    blueprint: "第一步证明存在性与归一化：利用 Fatou 引理与 Lebesgue 控制收敛定理证明和为 1；第二步证明唯一性：用任意解左乘 $P^n$ 取极限由控制收敛完成锁定。",
    microProof: [
      {
        step: 1,
        formula: "1 = \\sum_{j \\in C} p_{ij}^{(n)} \\ge \\sum_{0 \\le j \\le M} p_{ij}^{(n)} \\xrightarrow{n \\to \\infty} \\sum_{0 \\le j \\le M} \\pi_j \\implies \\sum_{j \\in C} \\pi_j \\le 1",
        explanation: "有限项截断 $M$，两端令 $n \\to \\infty$，再令 $M \\to \\infty$，由单调性得到总和不超过 1。",
        why: "非负级数取极限不等式。"
      },
      {
        step: 2,
        formula: "p_{ik}^{(n+1)} \\ge \\sum_{j \\le M} p_{ij}^{(n)} p_{jk} \\xrightarrow{n \\to \\infty} \\pi_k \\ge \\sum_{j \\le M} \\pi_j p_{jk} \\xrightarrow{M \\to \\infty} \\pi_k \\ge \\sum_{j \\in C} \\pi_j p_{jk}",
        explanation: "由 C-K 方程下界截断取极限，得到 $\\pi \\ge \\pi P$。",
        why: "C-K 方程截断。"
      },
      {
        step: 3,
        formula: "\\text{若严格不等式对某 } k \\text{ 成立 } \\implies 1 = \\sum \\pi_k > \\sum_k \\sum_j \\pi_j p_{jk} = \\sum \\pi_j \\cdot 1 = 1 \\implies \\text{矛盾！}",
        explanation: "两边对 $k$ 求和，由于 $\\sum_k p_{jk} = 1$，如果有一处严格大于，总和就会产生 $1 > 1$ 的荒谬矛盾！因此处处严格取等号：$\\pi = \\pi P$！",
        why: "全概率求和反证。"
      },
      {
        step: 4,
        formula: "\\pi_j = \\sum_{k \\in C} \\pi_k p_{kj}^{(n)} \\xrightarrow{n \\to \\infty} \\sum_{k \\in C} \\pi_k \\pi_j = \\pi_j \\left( \\sum_{k \\in C} \\pi_k \\right)",
        explanation: "因为 $\\pi_k$ 可和且 $p_{kj}^{(n)} \\le 1$，由 **Lebesgue 控制收敛定理**，可以将极限放进无穷求和号内！",
        why: "Lebesgue 控制收敛定理 (Theorem 0.2.7)。"
      },
      {
        step: 5,
        formula: "\\pi_j > 0 \\implies \\sum_{k \\in C} \\pi_k = 1",
        explanation: "两端约去正数 $\\pi_j$，严格证明了极限分布总和精确为 1！平稳性得证！",
        why: "初等消去律。"
      },
      {
        step: 6,
        formula: "\\text{设另有解 } x = xP \\implies x_j = \\sum_k x_k p_{kj}^{(n)} \\xrightarrow{n \\to \\infty} \\sum_k x_k \\pi_j = \\pi_j \\sum x_k = \\pi_j \\cdot 1 = \\pi_j",
        explanation: "再次应用控制收敛定理，任意平稳解 $x_j$ 在时间推移下必须恒等于 $\\pi_j$，证明了解的唯一性！",
        why: "控制收敛与唯一性证明完成。"
      }
    ],
    pitfalls: [
      "这一证明中两次关键应用了 Lebesgue 控制收敛定理，是实分析与概率论结合的最高典范，避免了初学者胡乱调换求和与极限顺序的毛病。"
    ],
    dependencies: ["thm-1-3-3", "def-1-3-7"],
    unlocks: ["thm-1-3-8"]
  },
  {
    id: "lemma-1-3-9",
    section: "1.3",
    type: "lemma",
    title: "引理 1.3.9: 周期马氏链的循环子类分解定理 (Cyclic Decomposition)",
    badge: "拓扑拆分",
    tags: ["周期分解", "循环子类", "周期结构"],
    summary: "周期为 $d$ 的系统内部暗藏玄机：整个状态空间可以被精确剖分为 $d$ 个子集，粒子像接力赛一样轮流传递！",
    intuitiveAnalogy: "一个周期为 3 的红绿灯系统：红灯区全部跳向黄灯区，黄灯区全部跳向绿灯区，绿灯区全部跳回红灯区。粒子绝不可能越级或者留在原地，只能严格按顺序在 $d$ 个子区域间循环转圈！",
    mathStatement: `设 $P$ 为不可约马氏矩阵，周期 $d \\ge 2$。则存在状态空间的唯一剖分 $S = C_0 \\cup C_1 \\cup \\dots \\cup C_{d-1}$ 使得：
(a) **确定性轮转转移**：
$$P\\{X_{n+1} \\in C_r \\mid X_n \\in C_{r-1}\\} = 1 \\quad (1 \\le r \\le d, \\text{ 约定 } C_d = C_0)$$
即：$C_0 \\to C_1 \\to \\dots \\to C_{d-1} \\to C_0$；
(b) 对任意 $j, k \\in C_r$，充分大 $n$ 时 $p_{jk}^{(nd)} > 0$，且若 $d \\nmid m$ 则 $p_{jk}^{(m)} = 0$。
（结论：每个子类 $C_r$ 都是 $d$ 步跳跃链 $Y_n = X_{nd}$ 的**非周期不可约类**）。`,
    blueprint: "以某固定参考状态 $i$ 为基准，按到达该状态的步数除以 $d$ 的余数构造同余等价类集合 $C_r$，利用互质反证法证明无交性。",
    microProof: [
      {
        step: 1,
        formula: "C_r = \\{k \\in S \\mid \\exists n \\ge 0 \\text{ s.t. } p_{ik}^{(nd+r)} > 0\\}, \\quad r = 0, 1, \\dots, d-1",
        explanation: "定义 $C_r$ 为从 $i$ 出发以 $nd+r$ 步可达的全部状态集合。",
        why: "按模 $d$ 同余分类。"
      },
      {
        step: 2,
        formula: "\\text{反设 } j \\in C_{r_1} \\cap C_{r_2} \\ (r_1 < r_2) \\implies p_{ij}^{(n_1 d + r_1)} > 0, \\ p_{ij}^{(n_2 d + r_2)} > 0",
        explanation: "假设存在某个元素跨越两个不同的余数子集。",
        why: "反证法交集非空。"
      },
      {
        step: 3,
        formula: "j \\leadsto i \\implies \\exists m > 0 \\text{ s.t. } p_{ji}^{(m)} > 0 \\implies d \\mid (n_1 d + r_1 + m) \\text{ 且 } d \\mid (n_2 d + r_2 + m)",
        explanation: "从 $j$ 接上一段回 $i$ 的路径，得到回到 $i$ 的两个回路步数，都必须是周期 $d$ 的倍数！",
        why: "周期定义整除性。"
      },
      {
        step: 4,
        formula: "d \\mid (r_2 - r_1) \\quad \\text{与 } 1 \\le r_2 - r_1 < d \\text{ 产生严重矛盾！}",
        explanation: "两个相差小于 $d$ 的正整数之差竟然能被 $d$ 整除，只有可能差为 0，与 $r_1 < r_2$ 矛盾！故 $C_r$ 互不相交！",
        why: "初等数论余数唯一性。"
      },
      {
        step: 5,
        formula: "j \\in C_{r-1}, p_{jk} > 0 \\implies p_{ik}^{(nd + r - 1 + 1)} = p_{ik}^{(nd+r)} > 0 \\implies k \\in C_r",
        explanation: "从余数 $r-1$ 走一步，步数余数增加 1 变成 $r$，必然掉进下一个集合 $C_r$！轮转性质 (a) 获证！",
        why: "同余自增规律。"
      }
    ],
    pitfalls: [
      "注意 $C_r$ 不是原马氏链 $X$ 的互通类（因为 $X$ 是不可约的，全集 $S$ 就是一个大互通类）；$C_r$ 是子抽样链 $Y_n = X_{nd}$ 的独立互通类！"
    ],
    dependencies: ["thm-1-1-6", "cor-1-1-7"],
    unlocks: ["thm-1-3-8", "thm-1-3-11"]
  },
  {
    id: "thm-1-3-8",
    section: "1.3",
    type: "theorem",
    title: "定理 1.3.8: 不可约马氏链正常返的四大等价判据",
    badge: "全章纲领",
    tags: ["等价判据", "平稳分布", "正常返充要", "Fatou引理"],
    summary: "四大门派的终极合流：正常返定义、任意状态平均回访时间有限、存在唯一平稳分布——三者完全等价！",
    intuitiveAnalogy: "这就像一个人身体健康的四个等价指征：(1) 体检显示活力充足；(2) 疲劳后心率总能在有限时间内恢复；(3) 甚至只要查出哪怕一个器官能有限时间恢复；(4) 体内存在一套自动平衡的稳态代谢系统！",
    mathStatement: `设 $P$ 为不可约马氏矩阵。则下列四个命题相互等价：
(1) $P$ 是正常返的（即 $\\limsup_{n \\to \\infty} p_{ij}^{(n)} > 0$ 对某个/所有对成立）；
(2) $P$ 常返，且对所有状态 $i \\in S$，平均回访时间有限：$m_{ii} = \\sum_{n \\ge 1} n f_{ii}^{(n)} < \\infty$；
(3) $P$ 常返，且存在至少一个状态 $i \\in S$ 满足 $m_{ii} < \\infty$；
(4) $P$ 存在唯一的平稳分布 $\\pi = (\\pi_j)_{j \\in S}$，且每个分量严格全正 $\\pi_j = \\frac{1}{m_{jj}} > 0$。`,
    blueprint: "环形证明链：(1) $\\Rightarrow$ (2) $\\Rightarrow$ (3) $\\Rightarrow$ (1) 完成三者闭环；(4) $\\Rightarrow$ (1) 用反证法与控制收敛；非周期时 (2) $\\Rightarrow$ (4) 由定理 1.3.6；周期时利用引理 1.3.9 循环分解与 Fatou 引理构造平稳向量。",
    microProof: [
      {
        step: 1,
        formula: "\\text{(1)} \\implies \\text{(2)}: \\limsup p_{jj}^{(n)} = d_j \\pi_j = \\frac{d_j}{m_{jj}} > 0 \\implies m_{jj} < \\infty",
        explanation: "由注记 1.3.5，上极限恰好等于 $d_j/m_{jj}$，上极限大于 0 强迫分母 $m_{jj}$ 必须为有限数！",
        why: "上极限公式与注记 1.3.5。"
      },
      {
        step: 2,
        formula: "\\text{(2)} \\implies \\text{(3)}: \\text{显然（全称命题自然蕴含特称命题）。}",
        explanation: "对所有成立，当然对某一个成立。",
        why: "形式逻辑直接蕴含。"
      },
      {
        step: 3,
        formula: "\\text{(3)} \\implies \\text{(1)}: \\exists i, m_{ii} < \\infty \\implies \\lim p_{ii}^{(nd)} = \\frac{d}{m_{ii}} > 0 \\implies \\limsup p_{ii}^{(n)} > 0",
        explanation: "子序列极限大于 0，上极限必然严格大于 0，(1)得证！完成 (1)-(2)-(3) 三角等价闭环！",
        why: "上极限大于等于子序列极限。"
      },
      {
        step: 4,
        formula: "\\text{(4)} \\implies \\text{(1)}: \\text{反设 } P \\text{ 为零常返或非常返 } \\implies \\lim_{n \\to \\infty} p_{kj}^{(n)} = 0 (\\forall k, j)",
        explanation: "若非正常返，单步转移在无穷远处全部衰减至 0。",
        why: "定义 1.3.1 与定理 1.2.10。"
      },
      {
        step: 5,
        formula: "x_j = \\sum_{k \\in S} x_k p_{kj}^{(n)} \\xrightarrow{n \\to \\infty} \\sum_{k \\in S} x_k \\cdot 0 = 0 \\implies \\sum x_j = 0 \\ne 1 \\implies \\text{矛盾！}",
        explanation: "由控制收敛定理，平稳向量 $x_j$ 只能全为 0，这与平稳向量和为 1 严重冲突！故必为正常返！",
        why: "控制收敛定理 (Theorem 0.2.7)。"
      },
      {
        step: 6,
        formula: "\\text{周期情形下 (2)} \\implies \\text{(4)}: \\text{设 } \\pi^{(r)}(Y) \\text{ 为子链 } Y \\text{ 在 } C_r \\text{ 上的平稳向量}",
        explanation: "由引理 1.3.9，$Y_n = X_{nd}$ 在每个块 $C_r$ 上是正常返非周期的，具有局部平稳分布。",
        why: "定理 1.3.6 应用于子链。"
      },
      {
        step: 7,
        formula: "\\pi := \\frac{1}{d} (\\pi^{(0)}, \\dots, \\pi^{(d-1)}) \\implies \\sum_{j \\in S} \\pi_j = 1",
        explanation: "将 $d$ 个互不相交块的平稳分布按 $1/d$ 权重拼装成全空间的概率向量。",
        why: "概率凸组合。"
      },
      {
        step: 8,
        formula: "\\pi P = \\pi \\quad \\text{【方法一：块循环乘法；方法二：Fatou引理】}",
        explanation: "利用矩阵乘法展开，由于粒子严格从 $C_{r-1}$ 映射到 $C_r$，左右乘积轮转抵消，或者利用 Fatou 引理对极限不等式求和，直接得到 $\\pi P = \\pi$！全定理彻底得证！",
        why: "讲义第58-59页两种精妙推导。"
      }
    ],
    pitfalls: [
      "这一定理是整个随机过程最重要的分水岭！在工程中判断系统是否有稳态，只需要找到唯一的平稳分布解即可，不需要费劲算极限。"
    ],
    dependencies: ["thm-1-3-6", "lemma-1-3-9", "remark-1-3-5"],
    unlocks: ["cor-1-3-10", "thm-1-3-11", "thm-1-5-6"]
  },
  {
    id: "cor-1-3-10",
    section: "1.3",
    type: "corollary",
    title: "推论 1.3.10: 有限状态不可约马氏链必为正常返",
    badge: "实用推论",
    tags: ["有限状态", "正常返", "Perron-Frobenius"],
    summary: "有限不可约马氏链必定存在唯一的正平稳分布，且平均回访时间处处有限！",
    intuitiveAnalogy: "有限状态不可约链是概率论中最听话的优等生：没有逃逸（常返）、没有无限等待（正常返）、拥有唯一的永恒平衡态！",
    mathStatement: `若马氏链 $X$ 拥有有限个状态且不可约，则它必定是**正常返的 (Positive Recurrent)**。`,
    blueprint: "由 Footnote 9 的反证法或 Perron-Frobenius 定理结合定理 1.3.8 秒推。",
    microProof: [
      {
        step: 1,
        formula: "S \\text{ 有限且不可约 } \\implies \\text{不存在非常返态，也不存在零常返态}",
        explanation: "定理 1.2.10 与 Footnote 9 已经分别排除了非常返态和零常返态的可能。",
        why: "全概率和为 1 且项数有限。"
      },
      {
        step: 2,
        formula: "\\therefore \\text{必定为正常返态，且由定理 1.3.8 存在唯一的平稳分布 } \\pi > 0",
        explanation: "直接代入定理 1.3.8 的等价判定。",
        why: "定理 1.3.8。"
      }
    ],
    pitfalls: ["无穷状态空间不可约链可以零常返（如1D对称游走）甚至非常返（如3D对称游走）。"],
    dependencies: ["thm-1-3-8", "fn-9-finite-pos"],
    unlocks: ["sec-1-5-criteria"]
  },
  {
    id: "thm-1-3-11",
    section: "1.3",
    type: "theorem",
    title: "定理 1.3.11: 柯尔莫哥洛夫一般极限定理 (General Limit Theorem)",
    badge: "集大成者",
    tags: ["大极限定理", "全景分类", "Kolmogorov"],
    summary: "集大成的大一统公式：不管目标状态是非常返、非周期常返还是周期常返，所有转移概率极限全部纳入这同一个终极公式！",
    intuitiveAnalogy: "马氏链的极限地图：如果你想去一个瞬时城市，概率归零；如果你想去一个周期城市，你只能在特定节拍的班次到达，到达的概率等于所有能打进该节拍的首次突破概率之和！",
    mathStatement: `设 $X$ 为任意马氏链，转移矩阵为 $P$：
(1) 若 $j$ 是非常返态，则对任意起点 $i \\in S$：$\\lim_{n \\to \\infty} p_{ij}^{(n)} = 0$；
(2) 若 $j$ 是常返态且周期为 $d = d_j$，则对任意起点 $i \\in S$ 及整数 $0 \\le r < d$：
$$\\lim_{n \\to +\\infty} p_{ij}^{(nd + r)} = \\frac{d}{m_{jj}} \\sum_{m=0}^\\infty f_{ij}^{(md + r)}$$
特别地，若 $i, j$ 互通且同属一个常返类，则只有与同余类匹配的 $r$ 才有非零极限，极限为 $d / m_{jj}$。`,
    blueprint: "将步数分解为模 $d$ 的余数切片，结合首次击中卷积展开与定理 1.3.3 完成极限合并。",
    microProof: [
      {
        step: 1,
        formula: "p_{ij}^{(nd+r)} = \\sum_{v=0}^{nd+r} f_{ij}^{(nd+r-v)} p_{jj}^{(v)} = \\sum_{k=0}^n f_{ij}^{(nd+r-kd)} p_{jj}^{(kd)}",
        explanation: "因为周期为 $d$，中间所有不能被 $d$ 整除的自回访项 $p_{jj}^{(v)} = 0$ 全被自动过滤，只留下 $v = kd$ 的项！",
        why: "引理 1.2.6 卷积公式与周期性。"
      },
      {
        step: 2,
        formula: "= \\sum_{m=0}^n f_{ij}^{(md+r)} p_{jj}^{((n-m)d)}",
        explanation: "令换元指标 $m = n-k$，求和项变成逆序排列。",
        why: "换元。"
      },
      {
        step: 3,
        formula: "p_{jj}^{((n-m)d)} \\xrightarrow{n \\to \\infty} \\frac{d}{m_{jj}}, \\quad \\sum_{m=0}^\\infty f_{ij}^{(md+r)} \\le f_{ij}^* \\le 1",
        explanation: "自转移项收敛到 $d/m_{jj}$，首次击中级数收敛，由控制收敛定理极限与求和号对调，公式得证！",
        why: "定理 1.3.3 与控制收敛定理。"
      }
    ],
    pitfalls: [
      "若 $j$ 是零常返态，$m_{jj} = \\infty$，公式右端分母为无穷大，极限自动给出 0，公式依然精确有效！"
    ],
    dependencies: ["thm-1-3-3", "lemma-1-3-9", "thm-1-2-10"],
    unlocks: ["prop-1-3-13", "prop-1-3-14", "sec-1-4-absorption"]
  },
  {
    id: "prop-1-3-13",
    section: "1.3",
    type: "proposition",
    title: "命题 1.3.13 & 1.3.14: 任意状态间的 Cesàro 极限与非周期极限",
    badge: "计算利器",
    tags: ["Cesaro极限", "任意两点", "击中与平稳结合"],
    summary: "从任意点 $i$ 到任意点 $j$ 的长期时间占比，等于先到达 $j$ 的概率 $f_{ij}^*$ 乘以 $j$ 自身的平稳稳态概率 $\\pi_j$！",
    intuitiveAnalogy: "你在一个遥远的孤岛（$i$），远方有一座繁华大都市（$j$）。你在大都市度过的长期时间比例是多少？等于：『你这辈子能渡海到达这座都市的概率』，乘以『这座都市自身的黄金时间占比 $\\pi_j$』！两件事链式相乘！",
    mathStatement: `设 $i, j$ 为任意两状态：
(1) **Cesàro 时间平均极限 (对所有周期均成立)**：
$$\\lim_{n \\to +\\infty} \\frac{1}{n} \\sum_{m=1}^n p_{ij}^{(m)} = f_{ij}^* \\pi_j = \\frac{f_{ij}^*}{m_{jj}}$$
(2) **非周期情形的单点极限**（若 $j$ 是非周期的）：
$$\\lim_{n \\to +\\infty} p_{ij}^{(n)} = f_{ij}^* \\pi_j = \\frac{f_{ij}^*}{m_{jj}}$$`,
    blueprint: "利用柯尔莫哥洛夫一般极限定理对所有同余余数 $r=0, \\dots, d-1$ 求和平均，结合级数和 $\\sum_r \\sum_m f_{ij}^{(md+r)} = f_{ij}^*$。",
    microProof: [
      {
        step: 1,
        formula: "\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{m=1}^n p_{ij}^{(m)} = \\frac{1}{d} \\sum_{r=0}^{d-1} \\lim_{n \\to \\infty} p_{ij}^{(nd+r)}",
        explanation: "将全部项分成 $d$ 个交错的周期子序列求平均。",
        why: "Cesàro 平均的周期拆分。"
      },
      {
        step: 2,
        formula: "= \\frac{1}{d} \\sum_{r=0}^{d-1} \\left( \\frac{d}{m_{jj}} \\sum_{m=0}^\\infty f_{ij}^{(md+r)} \\right) = \\frac{1}{m_{jj}} \\sum_{r=0}^{d-1} \\sum_{m=0}^\\infty f_{ij}^{(md+r)}",
        explanation: "代入定理 1.3.11 的极限结果，外面的 $1/d$ 与里面的 $d$ 完美抵消！",
        why: "代数消去。"
      },
      {
        step: 3,
        formula: "\\sum_{r=0}^{d-1} \\sum_{m=0}^\\infty f_{ij}^{(md+r)} = \\sum_{k=1}^\\infty f_{ij}^{(k)} = f_{ij}^* \\implies \\text{极限} = \\frac{f_{ij}^*}{m_{jj}} = f_{ij}^* \\pi_j",
        explanation: "所有余数的切片合起来，正好把所有正整数步数 $k$ 滴水不漏地全部拼全，还原为总击中概率 $f_{ij}^*$！证毕！",
        why: "级数完全拼合。"
      }
    ],
    pitfalls: [
      "若 $i, j$ 不在同一个互通类中，这个极限不仅依赖于终点 $j$，还深度依赖于起点 $i$（通过系数 $f_{ij}^*$）！"
    ],
    dependencies: ["thm-1-3-11"],
    unlocks: ["sec-1-4-absorption"]
  },
  {
    id: "example-rw-reflection",
    section: "1.3",
    type: "example",
    title: "经典实例 5: 带反射壁的 $\\mathbb{Z}_+$ 随机游走全相变分析",
    badge: "物理实战",
    tags: ["反射壁", "差分方程", "相变全景"],
    summary: "当质点碰到0号边界时被强行弹回，三对角系统在 $p < 1/2$ 时正常返，$p=1/2$ 零常返，$p>1/2$ 非常返！",
    intuitiveAnalogy: "质点被一堵带弹簧的墙壁挡在左边（0号反射壁）：若向左吹风（$p < 1/2$），质点被风压向墙角，紧贴着墙角附近跳动（正常返）；若无风（$p = 1/2$），质点漫无边际地向右游荡，平均需要无穷久才能弹回来一次（零常返）；若向右吹狂风（$p > 1/2$），质点乘风破浪彻底离开，一去不回（非常返）。",
    mathStatement: `在 $\\mathbb{Z}_+$ 上的游走，转移矩阵在 $0$ 处为反射态：$p_{01}=1$；对 $i \\ge 1$，$p_{i, i+1}=p, p_{i, i-1}=q=1-p$。周期 $d = 2$。
求解平稳方程 $\\pi = \\pi P$ 得到分量递推：
$$\\pi_n = \\pi_0 \\prod_{k=0}^{n-1} \\frac{p_k}{q_{k+1}} = \\frac{\\pi_0}{q} \\left( \\frac{p}{q} \\right)^{n-1} \\quad (n \\ge 1)$$
由归一化条件 $\\sum_{n=0}^\\infty \\pi_n = 1$，求和级数 $\\sum (p/q)^n$ 仅当 $p < q$（即 $p < 1/2$）时收敛！
**结论**：
- $p < 1/2$：正常返 (Positive Recurrent)；
- $p = 1/2$：零常返 (Null Recurrent)；
- $p > 1/2$：非常返 (Transient)。`,
    blueprint: "将平稳矩阵方程拆解为差分递推关系，用归一化条件判断级数敛散性，结合定理 1.3.8 完成三相分类。",
    microProof: [
      {
        step: 1,
        formula: "\\pi_0 = q_1 \\pi_1 = q \\pi_1 \\implies \\pi_1 = \\frac{1}{q} \\pi_0",
        explanation: "由平稳方程第 0 列：$\\pi_0 = \\sum \\pi_j p_{j0} = \\pi_1 q$。",
        why: "第 0 列不动点平衡。"
      },
      {
        step: 2,
        formula: "\\pi_n = p_{n-1} \\pi_{n-1} + q_{n+1} \\pi_{n+1} = p \\pi_{n-1} + q \\pi_{n+1} \\implies q(\\pi_{n+1} - \\pi_n) = p(\\pi_n - \\pi_{n-1})",
        explanation: "对内点列写出二阶常系数齐次差分方程。",
        why: "局部概率守恒流平衡。"
      },
      {
        step: 3,
        formula: "\\pi_n = \\frac{\\pi_0}{q} \\left(\\frac{p}{q}\\right)^{n-1} \\quad (n \\ge 1)",
        explanation: "由等比数列递推直接得到显式通项公式！",
        why: "等比数列求通项。"
      },
      {
        step: 4,
        formula: "\\sum_{n=0}^\\infty \\pi_n = \\pi_0 \\left[ 1 + \\frac{1}{q} \\sum_{n=1}^\\infty \\left(\\frac{p}{q}\\right)^{n-1} \\right] = \\pi_0 \\left[ 1 + \\frac{1}{q} \\frac{1}{1 - p/q} \\right]",
        explanation: "几何级数仅当公比 $p/q < 1 \\iff p < 1/2$ 时收敛出正解 $\\pi_0 > 0$！",
        why: "几何级数求和公式。"
      },
      {
        step: 5,
        formula: "\\pi_0 = \\frac{1 - 2p}{2(1 - p)} > 0 \\iff p < \\frac{1}{2}",
        explanation: "当且仅当 $p < 1/2$ 时存在合法平稳分布，由定理 1.3.8 等价于正常返！证毕！",
        why: "定理 1.3.8 判据(4)。"
      }
    ],
    pitfalls: [
      "当 $p=1/2$ 时，虽然不存在平稳分布（级数发散，算出的 $\\pi_0 = 0$），但它依然是常返的（零常返）！常返性将在 1.5 节用 Foster 判据给出最简洁的二次证明。"
    ],
    dependencies: ["thm-1-3-8", "def-1-3-7"],
    unlocks: ["sec-1-4-absorption", "sec-1-5-criteria"]
  }
];
