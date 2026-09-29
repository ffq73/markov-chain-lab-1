// Section 1.2: 常返与非常返状态 (pp. 41 - 51)
window.SECTION_1_2 = [
  {
    id: "def-recurrence",
    section: "1.2",
    type: "definition",
    title: "定义 1.2.1: 常返状态 (Recurrent) 与 非常返/瞬时状态 (Transient)",
    badge: "核心基石",
    tags: ["常返", "非常返", "无限次回访", "Borel-Cantelli"],
    summary: "从一个状态出发，以概率 1 在未来的岁月里无限次重新回到该状态，称为常返；否则叫非常返（瞬时）。",
    intuitiveAnalogy: "常返就像『命中注定的老朋友』，无论你走到天涯海角多少次，一生中必定会与他重逢无数次；非常返就像『旅途中的过客』，随着时间推移，你离开他之后，可能就再也不会回来了。",
    mathStatement: `设 $X = (X_n)_{n \\ge 0}$ 为时间齐次马氏链。状态 $i \\in S$ 称为**常返的 (Recurrent)**，若满足：
$$P\\{\\omega \\in \\Omega \\mid \\exists n_k(\\omega) \\nearrow +\\infty \\text{ s.t. } X_{n_k}(\\omega) = i \\mid X_0 = i\\} = 1$$
等价地（利用上极限事件记号）：
$$P\\{X_n = i \\text{ i.o.} \\mid X_0 = i\\} = P\\left( \\limsup_{n \\to \\infty} \\{X_n = i\\} \\,\\Big|\\, X_0 = i \\right) = 1$$
（其中 $\\text{i.o.}$ 表示 infinitely often，即无限次发生）。若该概率不为 1，则称状态 $i$ 为**非常返的 (Nonrecurrent)** 或**瞬时的 (Transient)**。
注：若状态 $i$ 常返，其周期必为有限数 $d_i < \\infty$。`,
    blueprint: "用事件上极限严格数学化『无限次回访』的动态概念。",
    microProof: [
      {
        step: 1,
        formula: "\\limsup_{n \\to \\infty} A_n = \\bigcap_{n=1}^\\infty \\bigcup_{k=n}^\\infty A_k, \\quad \\text{其中 } A_n = \\{X_n = i\\}",
        explanation: "由概率论测度定义，上极限事件意味着：对任意选定的时间门槛 $n$，在 $n$ 之后（$\\ge n$）必定存在至少一个时刻 $k$ 使得质点回到了状态 $i$。",
        why: "对任何有限时刻都不休止，即为无限次发生。"
      }
    ],
    pitfalls: [
      "初学者最常犯的错误：把『以概率 1 最终回来至少 1 次』误以为就是常返。事实上，如果每次回来的概率只有 0.99，虽然回来的期望次数很多，但终有一天会一去不返（几何分布衰减）！必须保证每次回来的概率都是绝对的 100%，才能产生无限次回访。"
    ],
    dependencies: ["def-1-1-1", "concept-trans-matrix"],
    unlocks: ["thm-1-2-1", "cor-1-2-2", "lemma-1-2-5"]
  },
  {
    id: "thm-1-2-1",
    section: "1.2",
    type: "theorem",
    title: "定理 1.2.1: 常返性的第一充要条件 (级数判据)",
    badge: "里程碑定理",
    tags: ["级数发散", "常返判据", "格林函数"],
    summary: "状态 $i$ 常返，当且仅当它的一步步转移回访概率累加级数发散到无穷大！",
    intuitiveAnalogy: "每次回访像向许愿池投一枚硬币，投币面额是 $p_{ii}^{(n)}$。如果所有可能时刻期望收到的硬币总和发散（无穷多枚），说明回访次数也是无穷；如果总和收敛到一个有限数字，说明期望回访有限次，必定非常返。",
    mathStatement: `状态 $i \\in S$ 是常返的，充分必要条件是其各步自回访概率构成的无穷级数发散：
$$i \\text{ 是常返态 } \\iff \\sum_{n=1}^\\infty p_{ii}^{(n)} = +\\infty$$`,
    blueprint: "必要性由第一 Borel-Cantelli 引理直接得出；充分性通过第一到达时间卷积公式与截断级数反证法完成严格构造。",
    microProof: [
      {
        step: 1,
        formula: "\\text{必要性：设 } i \\text{ 常返，则 } P\\left( \\limsup_{n \\to \\infty} \\{X_n = i\\} \\,\\Big|\\, X_0 = i \\right) = 1 > 0",
        explanation: "由常返定义，无限次回访事件发生概率为 1。",
        why: "定义 1.2.1。"
      },
      {
        step: 2,
        formula: "\\text{若反设 } \\sum_{n=1}^\\infty p_{ii}^{(n)} < \\infty, \\text{ 由 Borel-Cantelli 第一引理 } \\implies P(\\limsup \\{X_n=i\\} \\mid X_0=i) = 0",
        explanation: "第一 Borel-Cantelli 引理指出：若事件概率之和收敛，则上极限事件概率必为 0！这与第 1 步的概率为 1 严重矛盾！",
        why: "Borel-Cantelli 引理：$\\sum P(A_n) < \\infty \\implies P(A_n \\text{ i.o.}) = 0$。"
      },
      {
        step: 3,
        formula: "\\therefore \\sum_{n=1}^\\infty p_{ii}^{(n)} = +\\infty, \\quad \\text{必要性获证！}",
        explanation: "逆否命题成立，必要性水到渠成。",
        why: "反证法闭合。"
      }
    ],
    pitfalls: [
      "充分性证明千万不能反向用第二 Borel-Cantelli 引理！因为事件列 $\\{X_n=i\\}$ **并不相互独立**！必须借用首次击中时间（Lemma 1.2.5 和 1.2.7）来完成充分性推导。"
    ],
    dependencies: ["def-recurrence", "lemma-1-2-5", "lemma-1-2-7"],
    unlocks: ["cor-1-2-2", "prop-1-2-8", "prop-1-2-9", "thm-1-2-10", "example-rw-1d"]
  },
  {
    id: "cor-1-2-2",
    section: "1.2",
    type: "corollary",
    title: "推论 1.2.2: 常返的 0-1 律 (0-1 Law for Recurrence)",
    badge: "概率守恒",
    tags: ["0-1律", "全有或全无"],
    summary: "无限次回访的概率只有两种极端：要么是 0，要么是 1，绝不可能出现中间概率（如 0.5）。",
    intuitiveAnalogy: "这就像量子跃迁或命运裁决：质点对老家的眷恋没有中间地带。只要它有一丝可能无限次回家（概率大于0），它就必定以绝对的确定性（概率等于1）无限次回家！",
    mathStatement: `状态 $i$ 是常返的，充要条件是无限次回访概率严格大于 0：
$$P\\{X_n = i \\text{ i.o.} \\mid X_0 = i\\} > 0 \\iff P\\{X_n = i \\text{ i.o.} \\mid X_0 = i\\} = 1$$
换言之，若状态 $i$ 非常返，则质点以概率 1 最终彻底离开状态 $i$ 且不再复返。`,
    blueprint: "若该概率大于0，由定理 1.2.1 的逆否命题必有级数发散，再由定理 1.2.1 充分性推得其概率必定等于1。",
    microProof: [
      {
        step: 1,
        formula: "P\\{X_n = i \\text{ i.o.} \\mid X_0 = i\\} > 0 \\implies \\sum_{n=1}^\\infty p_{ii}^{(n)} = \\infty",
        explanation: "若级数收敛，Borel-Cantelli 第一引理将迫使该概率等于 0。因此概率大于 0 强迫级数必须发散！",
        why: "Borel-Cantelli 引理的逆否。"
      },
      {
        step: 2,
        formula: "\\sum_{n=1}^\\infty p_{ii}^{(n)} = \\infty \\implies i \\text{ 是常返态 } \\implies P\\{X_n = i \\text{ i.o.} \\mid X_0 = i\\} = 1",
        explanation: "由定理 1.2.1，级数发散等价于常返，常返按定义就是该概率等于 1。",
        why: "定理 1.2.1 判定。"
      }
    ],
    pitfalls: [
      "不要混淆：首次回访概率 $f_{ii}^*$ 可以是介于 0 和 1 之间的任意数（例如 0.8），但无穷次回访概率 $Q_{ii}$ 只能是 0 或 1。"
    ],
    dependencies: ["thm-1-2-1"],
    unlocks: ["ex-1-2-12"]
  },
  {
    id: "concept-first-visit",
    section: "1.2",
    type: "definition",
    title: "定义: 首次到达时间 (First Visiting Instant) 与击中概率",
    badge: "核心工具",
    tags: ["停时", "首次击中", "几何分解"],
    summary: "把复杂的反复回访，解构成一次次独立的『第一次命中』。",
    intuitiveAnalogy: "你投飞镖，可能命中了靶心很多次。但分析这一切的关键是：你在『第几镖』第一次射中靶心？第一次命中的时刻，就是划分过去与未来的神圣时间节点。",
    mathStatement: `对任意状态 $j \\in S$，定义**首次到达时间 (First Visiting Instant)** 随机变量 $T_j: \\Omega \\to \\{1, 2, \\dots\\} \\cup \\{\\infty\\}$：
$$T_j(\\omega) = \\begin{cases} \\min\\{n \\ge 1 \\mid X_n(\\omega) = j\\} & \\text{若存在 } n \\ge 1 \\text{ 使得 } X_n = j \\\\ \\infty & \\text{若对所有 } n \\ge 1 \\text{ 均有 } X_n \\ne j \\end{cases}$$
定义从 $i$ 出发在第 $m$ 步首次到达 $j$ 的概率：
$$f_{ij}^{(m)} = P\\{T_j = m \\mid X_0 = i\\} = P\\{X_m = j, X_k \\ne j (1 \\le k < m) \\mid X_0 = i\\}$$
定义从 $i$ 出发在有限步内到达 $j$ 的累积概率：
$$f_{ij}^* = \\sum_{m=1}^\\infty f_{ij}^{(m)} = P\\{T_j < \\infty \\mid X_0 = i\\} \\quad (0 \\le f_{ij}^* \\le 1)$$`,
    blueprint: "利用击中时刻 $T_j$ 的可测性与不相交事件和定义击中分布。",
    microProof: [
      {
        step: 1,
        formula: "\\{T_j = n\\} = \\{X_1 \\ne j, \\dots, X_{n-1} \\ne j, X_n = j\\} \\in \\mathcal{F}",
        explanation: "事件集合只由前 $n$ 步的状态决定，是合法的可测事件（也是一种停时）。",
        why: "有限个可测事件的交集仍可测。"
      },
      {
        step: 2,
        formula: "\\{T_j < \\infty\\} = \\sum_{m=1}^\\infty \\{T_j = m\\} \\implies f_{ij}^* = \\sum_{m=1}^\\infty f_{ij}^{(m)} \\le 1",
        explanation: "互不相交事件的可数并，概率等于求和，天然被 1 界住。",
        why: "概率的 $\\sigma$-可加性与非负有界性。"
      }
    ],
    pitfalls: [
      "$f_{ij}^*$ 可能是严格小于 1 的！小于 1 的部分 $1 - f_{ij}^* = P\\{T_j = \\infty \\mid X_0=i\\}$ 就是『一去不回、流落天涯』的逃逸概率。"
    ],
    dependencies: ["def-1-1-1"],
    unlocks: ["lemma-1-2-5", "lemma-1-2-6", "ex-1-2-3"]
  },
  {
    id: "ex-1-2-3",
    section: "1.2",
    type: "exercise",
    title: "习题 1.2.3: 有限不可约马氏链的首次到达时间指数尾衰减与正常返",
    badge: "进阶推导",
    tags: ["指数衰减", "有限状态", "正常返"],
    summary: "状态有限的世界没有流浪汉：质点必定指数级快速回到目标，平均回访时间必然有限！",
    intuitiveAnalogy: "房间是封闭的（有限状态），只要每个房间都能互通，任凭你瞎走，每过 $M$ 步就有保底概率 $\\delta$ 撞进目标房间。因此连续 $k$ 次都没撞进的概率像 $(1-\\delta)^k$ 一样断崖式下跌！",
    mathStatement: `设 $X$ 是有限状态空间 $S = \\{1, \\dots, N\\} (N < \\infty)$ 上的不可约马氏链。证明：
(1) 存在常数 $C > 0$ 及 $0 < \\rho < 1$，使得尾概率指数衰减：
$$\\sum_{m > n} f_{ij}^{(m)} = P\\{T_j > n \\mid X_0 = i\\} \\le C \\rho^n \\quad (\\forall 1 \\le i, j \\le N, n \\ge 1)$$
(2) 平均首次到达时间有限：$1 \\le m_{ij} := E[T_j \\mid X_0 = i] < \\infty$。`,
    blueprint: "取 $M$ 步保证从任何点到达 $j$ 的概率有一致正下界 $\\delta$，利用马氏性按块归纳得到几何衰减。",
    microProof: [
      {
        step: 1,
        formula: "1 = f_{ij}^* = \\sum_{n=1}^\\infty P\\{T_j = n \\mid X_0 = i\\} \\implies \\exists M, \\delta > 0 \\text{ s.t. } P\\{T_j \\le M \\mid X_0 = i\\} > \\delta \\quad (\\forall i, j)",
        explanation: "由不可约性与状态有限性，级数和为1，必定可以在有限步 $M$ 内使得击中概率大于正数 $\\delta$。",
        why: "有限集合的一致正下界。"
      },
      {
        step: 2,
        formula: "P\\{T_j > M \\mid X_0 = i\\} = 1 - P\\{T_j \\le M \\mid X_0 = i\\} \\le 1 - \\delta < N(1 - \\delta) =: \\beta",
        explanation: "单块 $M$ 步之内未击中的概率严格小于 1。",
        why: "互补事件概率。"
      },
      {
        step: 3,
        formula: "P\\{T_j > (\\ell + 1)M \\mid X_0 = i\\} = \\sum_{k \\ne j} P\\{X_M = k, T_j > M \\dots \\} \\le (1-\\delta) \\sum_{k \\ne j} P\\{T_j > \\ell M \\mid X_0 = k\\} \\le \\beta^{\\ell+1}",
        explanation: "利用马氏性在时刻 $M$ 重新作为起点展开条件概率，按块步长 $\\ell$ 作数学归纳法。",
        why: "多步马氏性消除先验历史。"
      },
      {
        step: 4,
        formula: "P\\{T_j > n \\mid X_0 = i\\} \\le \\beta^{\\lfloor n/M \\rfloor} = (\\beta^{1/M})^n \\beta^{-r/M} \\le C \\rho^n, \\quad \\text{其中 } \\rho = \\beta^{1/M} < 1",
        explanation: "任意步数 $n = \\ell M + r$，将离散块平滑放缩为连续指数衰减曲线，第(1)问获证！",
        why: "整除与余数标准放缩。"
      },
      {
        step: 5,
        formula: "m_{ij} = \\sum_{n=1}^\\infty n f_{ij}^{(n)} = \\sum_{n=0}^\\infty P\\{T_j > n \\mid X_0 = i\\} \\le \\sum_{n=0}^\\infty C \\rho^n = \\frac{C}{1 - \\rho} < \\infty",
        explanation: "非负整数随机变量期望的尾概率求和公式，几何级数收敛保证了平均到达时间必然有限！第(2)问得证！",
        why: "尾概率求和公式：$E[Y] = \\sum_{n=0}^\\infty P(Y > n)$。"
      }
    ],
    pitfalls: [
      "此结论依赖 $N < \\infty$！在无穷状态空间 $\\mathbb{Z}$ 上，即使是对称随机游走，也有可能回访时间期望为无穷大（零常返）！"
    ],
    dependencies: ["concept-first-visit", "concept-communication"],
    unlocks: ["cor-1-3-10"]
  },
  {
    id: "ex-1-2-4",
    section: "1.2",
    type: "exercise",
    title: "习题 1.2.4: 首次回访概率公式精细分解",
    badge: "路径代数",
    tags: ["路径展开", "条件期望"],
    summary: "首次回访概率等于所有『中途避开 $i$、最后一步踩中 $i$』的轨迹概率之和。",
    intuitiveAnalogy: "计算你第一次回到起点的概率，就是把所有形如『起点 $\\to$ 外面 $\\to$ 外面 $\\to \\dots \\to$ 回到起点』的单条路线概率全部加起来。",
    mathStatement: `证明对任意 $n \\ge 1$：
(1) $f_{ii}^{(n)} = P\\{X_{m+n} = i, X_{m+k} \\ne i (1 \\le k < n) \\mid X_m = i\\}$；
(2) $f_{ii}^{(n)} = \\sum_{i_1 \\ne i, \\dots, i_{n-1} \\ne i} p_{i i_1} p_{i_1 i_2} \\dots p_{i_{n-1} i}$。`,
    blueprint: "由时间齐次性证明(1)；由全概率公式对中间状态穷举求和证明(2)。",
    microProof: [
      {
        step: 1,
        formula: "P\\{X_{m+n} = i, X_{m+k} \\ne i (1 \\le k < n) \\mid X_m = i\\} = P\\{X_n = i, X_k \\ne i (1 \\le k < n) \\mid X_0 = i\\} = f_{ii}^{(n)}",
        explanation: "由马氏链的时间齐次性，将时间坐标整体向左平移 $m$ 个单位，转移规律完全保持不变。",
        why: "齐次性：概率只依赖相对时间差 $n$。"
      },
      {
        step: 2,
        formula: "f_{ii}^{(n)} = \\sum_{i_1 \\in S \\setminus \\{i\\}} \\dots \\sum_{i_{n-1} \\in S \\setminus \\{i\\}} P(X_1=i_1, \\dots, X_{n-1}=i_{n-1}, X_n=i \\mid X_0=i)",
        explanation: "在第 $1$ 到第 $n-1$ 步上，质点可以落在除 $i$ 之外的任意状态序列 $(i_1, \\dots, i_{n-1})$ 上，利用不相交分割求和。",
        why: "事件划分与全概率公式。"
      },
      {
        step: 3,
        formula: "= \\sum_{i_1 \\ne i, \\dots, i_{n-1} \\ne i} p_{i i_1} p_{i_1 i_2} \\dots p_{i_{n-1} i}",
        explanation: "利用马氏链有限维分布公式（公式 1.1.2），联合转移概率分解为每一步一步转移概率的乘积，得证！",
        why: "马氏性展开公式。"
      }
    ],
    pitfalls: [
      "中间求和的每一个指标 $i_k$ 必须严格扣除状态 $i$ 本身，否则就不是『首次』回访了。"
    ],
    dependencies: ["concept-first-visit"],
    unlocks: ["lemma-1-2-6"]
  },
  {
    id: "lemma-1-2-5",
    section: "1.2",
    type: "lemma",
    title: "引理 1.2.5: 常返性的首次回访充要条件 ($f_{ii}^* = 1$)",
    badge: "核心引理",
    tags: ["首次回访", "常返等价", "强马氏雏形"],
    summary: "无限次回访的本质，就是每一次出发后，必定能以 100% 的概率完成至少一次回归！",
    intuitiveAnalogy: "只要你能保证『无论离家多远，最后一定能回来一次』，那么当你回来之后，你就是重新站在了起跑线上。既然每次都能回来一次，如此循环往复，你自然就能回来无限次！",
    mathStatement: `状态 $i$ 是常返的，当且仅当其首次回访累积概率等于 1：
$$i \\text{ 是常返态 } \\iff f_{ii}^* = 1$$
（在许多经典教材中，直接将 $f_{ii}^* = 1$ 作为常返的定义）。`,
    blueprint: "必要性由无穷包含关系给出；充分性通过反证法，假设 $f_{ii}^* < 1$，利用齐次马氏性推导出可能永久逃逸，从而非无限次回访。",
    microProof: [
      {
        step: 1,
        formula: "\\{ \\exists n_k \\nearrow \\infty \\text{ s.t. } X_{n_k} = i \\} \\subseteq \\bigcup_{m=1}^\\infty \\{T_i = m\\} = \\{T_i < \\infty\\}",
        explanation: "如果能回来无穷多次，那它必然要在某个有限时刻完成『第一次回来』。因此无穷次回访事件包含在首次回访事件中！",
        why: "既然发生了无穷次，首次发生必然成立。"
      },
      {
        step: 2,
        formula: "1 = P\\{X_n = i \\text{ i.o.} \\mid X_0 = i\\} \\le P\\{T_i < \\infty \\mid X_0 = i\\} = f_{ii}^* \\le 1 \\implies f_{ii}^* = 1",
        explanation: "由概率测度的单调性与有界性，两端夹逼，$f_{ii}^*$ 必须精确等于 1！必要性证毕。",
        why: "概率的单调性与夹逼准则。"
      },
      {
        step: 3,
        formula: "\\text{充分性：假设 } f_{ii}^* = 1\\text{，反设 } i \\text{ 非常返}",
        explanation: "非常返意味着质点在某个时刻最后一次访问 $i$ 之后彻底离开。",
        why: "反证法设定。"
      },
      {
        step: 4,
        formula: "\\exists N \\ge 0 \\text{ s.t. } P\\{X_N = i, X_{N+\\ell} \\ne i (\\forall \\ell \\ge 1) \\mid X_0 = i\\} > 0",
        explanation: "如果在未来的所有时间里只有有限次回访，必定存在一个『最后一次回访时刻』$N$。",
        why: "上极限补事件的定义分解。"
      },
      {
        step: 5,
        formula: "= P\\{X_N = i \\mid X_0 = i\\} \\cdot P\\{X_\\ell \\ne i (\\forall \\ell \\ge 1) \\mid X_0 = i\\} = p_{ii}^{(N)} \\cdot (1 - f_{ii}^*)",
        explanation: "由马氏性与时间齐次性，从时刻 $N$ 以后再也不回 $i$ 的条件概率，等同于从时刻 0 出发永远不回 $i$ 的概率，即 $1 - f_{ii}^*$！",
        why: "齐次马氏性的无记忆刷新。"
      },
      {
        step: 6,
        formula: "1 - f_{ii}^* = 1 - 1 = 0 \\implies P\\{\\dots\\} = p_{ii}^{(N)} \\cdot 0 = 0",
        explanation: "但这与第 4 步严格大于 0 发生不可调和的矛盾！矛盾说明反设错误，状态 $i$ 必须常返！",
        why: "反证法闭合。"
      }
    ],
    pitfalls: [
      "很多同学不理解第 5 步：为什么从时刻 $N$ 往后的行为可以看成是『从 0 开始重新做人』？这正是齐次马氏性的精髓——只要你回到了 $i$，过去所有历史就瞬间被清空重置！"
    ],
    dependencies: ["def-recurrence", "concept-first-visit"],
    unlocks: ["lemma-1-2-6", "lemma-1-2-7", "thm-1-2-1"]
  },
  {
    id: "lemma-1-2-6",
    section: "1.2",
    type: "lemma",
    title: "引理 1.2.6: 第一击中时间卷积公式 (First Entrance Renewal Equation)",
    badge: "绝妙拆解",
    tags: ["更新方程", "全概率公式", "卷积结构"],
    summary: "第 $n$ 步到达 $j$ 的总概率，等于在第 $m$ 步首次到达 $j$、随后 $n-m$ 步内又回到 $j$ 的所有可能途径的求和！",
    intuitiveAnalogy: "你今天在第 $n$ 分钟出现在咖啡馆，这只有几种可能：要么你第 1 分钟第一次到，后面又闲逛回来；要么你第 2 分钟第一次到……穷举你『人生中第一次进这家咖啡馆』的分钟数，全部加起来就是总概率。",
    mathStatement: `对任意两状态 $i, j \\in S$ 及任意 $n \\ge 1$，均有：
$$p_{ij}^{(n)} = \\sum_{m=1}^n f_{ij}^{(m)} p_{jj}^{(n-m)}$$
（规定 $p_{jj}^{(0)} = 1$）。`,
    blueprint: "按照『首次进入状态 $j$ 发生在第 $m$ 步』对事件空间进行不相交切片划分。",
    microProof: [
      {
        step: 1,
        formula: "p_{ij}^{(n)} = P\\{X_n = j \\mid X_0 = i\\}",
        explanation: "根据定义，这是 $n$ 步转移概率。",
        why: "定义公式。"
      },
      {
        step: 2,
        formula: "\\{X_n = j\\} = \\bigcup_{m=1}^n \\{T_j = m, X_n = j\\} = \\sum_{m=1}^n \\{X_1 \\ne j, \\dots, X_{m-1} \\ne j, X_m = j, X_n = j\\}",
        explanation: "如果在第 $n$ 步处于 $j$，那么必定在某一步 $m \\in \\{1, \\dots, n\\}$ 上是**第一次**访问 $j$。且不同的首次访问时刻 $m$ 互不相交！",
        why: "首次击中时刻 $T_j$ 的唯一性与完备划分。"
      },
      {
        step: 3,
        formula: "P\\{T_j = m, X_n = j \\mid X_0 = i\\} = P\\{T_j = m \\mid X_0 = i\\} \\cdot P\\{X_n = j \\mid T_j = m, X_0 = i\\}",
        explanation: "应用条件概率乘法公式展开。",
        why: "基础条件概率公式。"
      },
      {
        step: 4,
        formula: "P\\{X_n = j \\mid T_j = m, X_0 = i\\} = P\\{X_n = j \\mid X_m = j\\} = p_{jj}^{(n-m)}",
        explanation: "由马氏性，既然在第 $m$ 步处于状态 $j$，更早的历史（$X_1 \\ne j, \\dots, X_0=i$）全部失效；再由时间齐次性，从 $m$ 到 $n$ 的步长为 $n-m$。",
        why: "马氏性与时间齐次性代换。"
      },
      {
        step: 5,
        formula: "p_{ij}^{(n)} = \\sum_{m=1}^n f_{ij}^{(m)} p_{jj}^{(n-m)}",
        explanation: "将求和项合并，卷积公式得证！",
        why: "推导完成。"
      }
    ],
    pitfalls: [
      "求和上限是 $n$ 而不是 $\\infty$，因为首次到达时间 $m$ 不可能超过总步数 $n$。"
    ],
    dependencies: ["concept-first-visit", "concept-trans-matrix"],
    unlocks: ["lemma-1-2-7", "thm-1-3-3"]
  },
  {
    id: "lemma-1-2-7",
    section: "1.2",
    type: "lemma",
    title: "引理 1.2.7: 转移级数与首次回访级数恒等式",
    badge: "分析利剑",
    tags: ["级数重排", "截断不等式", "Fubini定理"],
    summary: "首次访问概率 $f_{ij}^*$ 是连接两个状态转移级数的精确比例尺因子！",
    intuitiveAnalogy: "想算出你一辈子去朋友家串门的期望总次数？它等于：『你这辈子至少去过他家一次的概率』乘以『他自己这辈子在家的期望总天数』！",
    mathStatement: `对任意 $i, j \\in S$ 及任意 $N \\ge 1$：
(1) 完整无穷级数恒等式：
$$\\sum_{n=1}^\\infty p_{ij}^{(n)} = f_{ij}^* \\sum_{n=0}^\\infty p_{jj}^{(n)}$$
(2) 有限截断不等式：
$$\\sum_{n=1}^N p_{ij}^{(n)} \\le \\sum_{m=1}^N f_{ij}^{(m)} \\sum_{n=0}^N p_{jj}^{(n)}$$`,
    blueprint: "将引理 1.2.6 的卷积公式代入双重级数，利用非负项求和的 Fubini/Tonelli 定理交换求和顺序。",
    microProof: [
      {
        step: 1,
        formula: "\\sum_{n=1}^\\infty p_{ij}^{(n)} = \\sum_{n=1}^\\infty \\sum_{m=1}^n f_{ij}^{(m)} p_{jj}^{(n-m)}",
        explanation: "代入引理 1.2.6 的卷积展开式。",
        why: "Lemma 1.2.6。"
      },
      {
        step: 2,
        formula: "= \\begin{aligned} &f_{ij}^{(1)} p_{jj}^{(0)} \\\\ + &f_{ij}^{(1)} p_{jj}^{(1)} + f_{ij}^{(2)} p_{jj}^{(0)} \\\\ + &f_{ij}^{(1)} p_{jj}^{(2)} + f_{ij}^{(2)} p_{jj}^{(1)} + f_{ij}^{(3)} p_{jj}^{(0)} + \\dots \\end{aligned}",
        explanation: "按 $n=1, 2, 3\\dots$ 逐行展开成三角形数表（上式为讲义第44页详细矩阵三角形展开）。",
        why: "可视化双重级数项。"
      },
      {
        step: 3,
        formula: "= f_{ij}^{(1)} \\sum_{n=0}^\\infty p_{jj}^{(n)} + f_{ij}^{(2)} \\sum_{n=0}^\\infty p_{jj}^{(n)} + f_{ij}^{(3)} \\sum_{n=0}^\\infty p_{jj}^{(n)} + \\dots",
        explanation: "改为竖向按公共因子 $f_{ij}^{(m)}$ 提取求和（交换求和顺序）。因为所有项非负，依据 Fubini-Tonelli 定理，交换求和顺序完全合法！",
        why: "非负级数可任意重排求和（Tonelli 定理）。"
      },
      {
        step: 4,
        formula: "= \\left( \\sum_{m=1}^\\infty f_{ij}^{(m)} \\right) \\left( \\sum_{n=0}^\\infty p_{jj}^{(n)} \\right) = f_{ij}^* \\sum_{n=0}^\\infty p_{jj}^{(n)}",
        explanation: "提取公因式，直接得到恒等式(*)。",
        why: "乘法分配律与极限性质。"
      },
      {
        step: 5,
        formula: "\\sum_{n=1}^N p_{ij}^{(n)} = \\sum_{n=1}^N \\sum_{m=1}^n f_{ij}^{(m)} p_{jj}^{(n-m)} \\le \\left( \\sum_{m=1}^N f_{ij}^{(m)} \\right) \\left( \\sum_{k=0}^N p_{jj}^{(k)} \\right)",
        explanation: "在有限截断 $N$ 时，三角形区域必定被包含在矩形区域 $[1, N] \\times [0, N]$ 之中，各项非负故不等式成立！",
        why: "区域包含关系：$\\{(m, k) \\mid m+k \\le N\\} \\subseteq \\{1 \\le m \\le N, 0 \\le k \\le N\\}$。"
      }
    ],
    pitfalls: [
      "若级数发散为 $\\infty$，上式约定 $0 \\cdot \\infty = 0$。如果 $f_{ij}^* = 0$，即使右边是无穷，左边也只能是 0。"
    ],
    dependencies: ["lemma-1-2-6"],
    unlocks: ["thm-1-2-1", "prop-1-2-8", "prop-1-2-9", "thm-1-2-10"]
  },
  {
    id: "prop-1-2-8",
    section: "1.2",
    type: "proposition",
    title: "命题 1.2.8: 非常返状态的格林函数几何级数公式",
    badge: "精妙公式",
    tags: ["格林函数", "几何级数", "非常返"],
    summary: "非常返状态的所有自回访概率总和，可以通过初等几何级数求和公式精确计算！",
    intuitiveAnalogy: "这就像掷硬币直到第一次失败：每次能够成功重返原点的概率都是 $f_{ii}^* < 1$。总访问次数就是参数为 $1-f_{ii}^*$ 的几何分布，期望总次数正是 $\\frac{1}{1-f_{ii}^*}$！",
    mathStatement: `对任意非常返状态 $i \\in S$（此时 $f_{ii}^* < 1$），自转移概率之和满足：
$$\\sum_{n=1}^\\infty p_{ii}^{(n)} = \\frac{f_{ii}^*}{1 - f_{ii}^*} < \\infty \\quad \\Longleftrightarrow \\quad \\sum_{n=0}^\\infty p_{ii}^{(n)} = \\frac{1}{1 - f_{ii}^*}$$`,
    blueprint: "在引理 1.2.7 的恒等式 (*) 中令 $j = i$，将常数项移项合并直接求解代数方程。",
    microProof: [
      {
        step: 1,
        formula: "\\sum_{n=1}^\\infty p_{ii}^{(n)} = f_{ii}^* \\sum_{n=0}^\\infty p_{ii}^{(n)} = f_{ii}^* \\left( 1 + \\sum_{n=1}^\\infty p_{ii}^{(n)} \\right)",
        explanation: "将 $n=0$ 的项单独拆出：$p_{ii}^{(0)} = 1$。",
        why: "由引理 1.2.7 当 $j=i$ 时的恒等式。"
      },
      {
        step: 2,
        formula: "\\text{记 } S_i = \\sum_{n=1}^\\infty p_{ii}^{(n)}, \\quad \\text{则 } S_i = f_{ii}^* (1 + S_i) = f_{ii}^* + f_{ii}^* S_i",
        explanation: "设级数和为未知数 $S_i$，得到一元一次线性代数方程。",
        why: "代数符号简化。"
      },
      {
        step: 3,
        formula: "(1 - f_{ii}^*) S_i = f_{ii}^* \\implies S_i = \\frac{f_{ii}^*}{1 - f_{ii}^*}, \\quad 1 + S_i = \\frac{1}{1 - f_{ii}^*",
        explanation: "因为非常返时 $f_{ii}^* < 1$，故 $1 - f_{ii}^* > 0$，两边同除以 $1 - f_{ii}^*$ 即获证！",
        why: "初等代数解方程。"
      }
    ],
    pitfalls: [
      "只有在非常返状态（$f_{ii}^* < 1$）时此公式才成立。若 $f_{ii}^* = 1$，分母为 0，级数发散至无穷大。"
    ],
    dependencies: ["lemma-1-2-7", "lemma-1-2-5"],
    unlocks: ["thm-1-2-10"]
  },
  {
    id: "prop-1-2-9",
    section: "1.2",
    type: "proposition",
    title: "命题 1.2.9: 常返性是互通类性质 (Recurrence is a Class Property)",
    badge: "核心性质",
    tags: ["类性质", "闭集", "常返传递"],
    summary: "常返具有传染性：在一个互通类里，只要有一个状态常返，全部状态都必然常返！且常返类绝不允许单向逃离（常返类必定封闭）。",
    intuitiveAnalogy: "一个常返类就像黑洞的核心家族：只要你们能互相串门，一旦有一个人逃不出去（常返），所有人就都逃不出去；而且只要你从常返类能走到某个外部状态，那个外部状态也必须能回到你，绝不允许单向叛逃！",
    mathStatement: `设 $i$ 是常返状态。若 $i \\leadsto j$ 且 $i \\ne j$，则：
(1) $j$ 也必定能到达 $i$（即 $i \\leftrightsquigarrow j$ 互通）；
(2) 状态 $j$ 也是常返的。
（结论：常返状态所属的互通类是一个闭集，且常返是互通类性质）。`,
    blueprint: "利用反证法证明(1)——若回不来会导致 $i$ 回访概率严格小于1与常返矛盾；利用 C-K 级数放缩证明(2)。",
    microProof: [
      {
        step: 1,
        formula: "\\text{证明(1): } i \\leadsto j \\implies \\exists m > 0 \\text{ s.t. } p_{ij}^{(m)} > 0",
        explanation: "由可达定义，存在 $m$ 步以正概率从 $i$ 到 $j$。",
        why: "可达定义。"
      },
      {
        step: 2,
        formula: "P\\{X_m = j, X_{m+\\ell} \\ne i (\\forall \\ell > 0) \\mid X_0 = i\\} = 0",
        explanation: "因为 $i$ 是常返的，无论中途去哪，之后都必须以概率 1 回到 $i$，中途迷失永远不回的概率必须为 0！",
        why: "引理 1.2.5：$f_{ii}^* = 1$。"
      },
      {
        step: 3,
        formula: "P\\{X_m = j, X_{m+\\ell} = i \\text{ for some } \\ell > 0 \\mid X_0 = i\\} > 0 \\implies p_{ji}^{(\\ell)} > 0 \\implies j \\leadsto i",
        explanation: "既然不能永远不回，就必须存在某个步数 $\\ell > 0$ 能够从 $j$ 回到 $i$，故 $j$ 可达 $i$，双向互通得证！",
        why: "全概率补集非零。"
      },
      {
        step: 4,
        formula: "p_{jj}^{(n + m + \\ell)} \\ge p_{ji}^{(\\ell)} p_{ii}^{(n)} p_{ij}^{(m)}",
        explanation: "由 C-K 方程，从 $j$ 到 $j$ 可以先走 $\\ell$ 步去 $i$，在 $i$ 循环 $n$ 步，再用 $m$ 步回 $j$。",
        why: "C-K 不等式分段放缩。"
      },
      {
        step: 5,
        formula: "\\sum_{n=1}^\\infty p_{jj}^{(n+m+\\ell)} \\ge p_{ji}^{(\\ell)} p_{ij}^{(m)} \\sum_{n=1}^\\infty p_{ii}^{(n)} = p_{ji}^{(\\ell)} p_{ij}^{(m)} \\cdot (+\\infty) = +\\infty",
        explanation: "因为 $i$ 常返，级数 $\\sum p_{ii}^{(n)}$ 发散到无穷；两端正数因子乘无穷大依然发散！",
        why: "定理 1.2.1 充要条件。"
      },
      {
        step: 6,
        formula: "\\sum_{k=1}^\\infty p_{jj}^{(k)} = \\infty \\implies j \\text{ 是常返态}",
        explanation: "由定理 1.2.1，自转移级数发散意味着 $j$ 也是常返的！",
        why: "定理 1.2.1 逆向判定。"
      }
    ],
    pitfalls: [
      "切记：若 $i$ 是非常返状态，可以单向走到某个常返态而回不来（如赌徒破产过程，非零状态走到 0 态）。只有常返态才不允许单向流出！"
    ],
    dependencies: ["thm-1-2-1", "lemma-1-2-5", "concept-communication"],
    unlocks: ["thm-1-2-10", "thm-1-2-11"]
  },
  {
    id: "thm-1-2-10",
    section: "1.2",
    type: "theorem",
    title: "定理 1.2.10: 非常返状态的极限湮灭定理",
    badge: "极限消散",
    tags: ["极限为0", "非常返", "级数收敛项"],
    summary: "随着时间无限推移，质点落在任何一个非常返状态的概率都必将衰减至绝对的零！",
    intuitiveAnalogy: "瞬时状态就像一间漏沙的房间：沙子可能会在里面停留一阵子，但时间足够久之后，所有的沙子都会彻底漏光流走，房间里空空如也，概率密度归零。",
    mathStatement: `若状态 $j \\in S$ 是非常返的，则对任意起点 $i \\in S$，转移概率在时间无穷远处必定衰减为零：
$$\\lim_{n \\to \\infty} p_{ij}^{(n)} = 0 \\quad (\\forall i \\in S)$$`,
    blueprint: "利用引理 1.2.7 说明级数 $\\sum_{n=1}^\\infty p_{ij}^{(n)}$ 收敛，再由收敛级数的通项必趋于 0 秒杀。",
    microProof: [
      {
        step: 1,
        formula: "\\sum_{n=1}^\\infty p_{ij}^{(n)} = f_{ij}^* \\sum_{n=0}^\\infty p_{jj}^{(n)} = \\frac{f_{ij}^*}{1 - f_{jj}^*}",
        explanation: "由引理 1.2.7 和命题 1.2.8，因为 $j$ 非常返，其自回访级数收敛于有限值，乘以 $f_{ij}^* \\le 1$ 依然有限。",
        why: "引理 1.2.7 与命题 1.2.8。"
      },
      {
        step: 2,
        formula: "\\sum_{n=1}^\\infty p_{ij}^{(n)} < \\infty \\implies \\lim_{n \\to \\infty} p_{ij}^{(n)} = 0",
        explanation: "微积分基础常识：一个无穷正项级数如果收敛，它的第 $n$ 项通项在 $n \\to \\infty$ 时必须严格趋于 0！",
        why: "级数收敛的必要条件。"
      }
    ],
    pitfalls: [
      "反过来不成立！若 $p_{ij}^{(n)} \\to 0$，状态 $j$ 不一定是非常返态，它完全可能是**零常返态**（如一维对称随机游走，$p_{00}^{(2n)} \\sim \\frac{1}{\\sqrt{\\pi n}} \\to 0$，但级数发散，依然是常返态）！"
    ],
    dependencies: ["lemma-1-2-7", "prop-1-2-8"],
    unlocks: ["def-1-3-1", "sec-1-4-absorption"]
  },
  {
    id: "thm-1-2-11",
    section: "1.2",
    type: "theorem",
    title: "定理 1.2.11: 戴雄平定理 (常返态击中概率的 0-1 跃迁)",
    badge: "戴教授原创",
    tags: ["0-1跃迁", "戴雄平定理", "全概率连续性"],
    summary: "从常返态出发看世界：任何状态要么你绝对去不了（概率为0），只要有一丝机会能去，就必定能100%到达（概率为1）！",
    intuitiveAnalogy: "常返世界绝不玩暧昧：如果从家出发有机会遇到一个人，你就一定会百分之百遇到他；根本不存在『有 30% 几率遇到、70% 几率遇不到』这种薛定谔概率。",
    mathStatement: `设状态 $i$ 是常返的，对任意 $j \\in S$，累积到达概率 $f_{ij}^*$ 只能取值 0 或 1：
$$f_{ij}^* \\in \\{0, 1\\}, \\quad \\text{即 } i \\leadsto j (f_{ij}^* > 0) \\iff f_{ij}^* = 1$$
（讲义提供两种完全不同的绝妙证明：戴雄平教授原证明与学生构造的替代证明）。`,
    blueprint: "证明思路A（戴教授）：利用测度连续性与反证法；证明思路B（学生法）：利用可达步数拆解与全概率展开。",
    microProof: [
      {
        step: 1,
        formula: "\\text{【戴雄平教授证明】设 } i \\leadsto j \\text{，反设 } f_{ij}^* < 1 \\implies \\alpha := P\\{X_k \\ne j (\\forall k \\ge 1) \\mid X_0 = i\\} > 0",
        explanation: "假设从 $i$ 出发有正概率 $\\alpha > 0$ 永远到不了 $j$。",
        why: "反证法设定。"
      },
      {
        step: 2,
        formula: "P\\{X_1 \\ne j, \\dots, X_n \\ne j \\mid X_0 = i\\} \\searrow \\alpha \\quad (n \\to +\\infty)",
        explanation: "由概率测度的单调递减连续性，前 $n$ 步未到达的事件序列单调递减收敛到交集事件。",
        why: "测度连续性：$E_n \\downarrow E \\implies P(E_n) \\to P(E)$。"
      },
      {
        step: 3,
        formula: "\\text{由命题 1.2.9, } j \\text{ 也常返且 } j \\leadsto i \\implies \\exists m > 0 \\text{ s.t. } p_{ji}^{(m)} > 0",
        explanation: "常返是类性质，因此 $j$ 必然能走回 $i$。",
        why: "命题 1.2.9。"
      },
      {
        step: 4,
        formula: "P\\{X_m = i, X_{m+1} \\ne j, \\dots, X_{m+n} \\ne j \\mid X_0 = j\\} = p_{ji}^{(m)} \\cdot P\\{X_1 \\ne j, \\dots, X_n \\ne j \\mid X_0 = i\\} \\ge p_{ji}^{(m)} \\alpha",
        explanation: "由马氏性，第 $m$ 步回 $i$ 且后续 $n$ 步都不去 $j$ 的概率，至少为 $p_{ji}^{(m)} \\alpha > 0$！",
        why: "马氏性与时间齐次性。"
      },
      {
        step: 5,
        formula: "P\\{X_{m+\\ell} \\ne j (\\forall \\ell \\ge 1) \\mid X_0 = j\\} \\ge p_{ji}^{(m)} \\alpha > 0 \\implies f_{jj}^* < 1",
        explanation: "令 $n \\to \\infty$，这意味着从 $j$ 出发竟然有正概率永远回不到 $j$！这与 $j$ 是常返态（$f_{jj}^*=1$）产生矛盾！故必有 $f_{ij}^* = 1$！",
        why: "反证法闭合，完成戴教授证明。"
      },
      {
        step: 6,
        formula: "\\text{【学生替代证明】由 } i \\text{ 常返，} 0 = P\\{X_n \\ne i (\\forall n > k) \\mid X_0 = i\\}",
        explanation: "从 $i$ 出发以概率 1 无限次回访，不可能在时刻 $k$ 后永久消失。",
        why: "常返定义。"
      },
      {
        step: 7,
        formula: "0 \\ge P\\{X_k = j, X_n \\ne i (\\forall n > k) \\mid X_0 = i\\} = p_{ij}^{(k)} \\cdot P\\{X_n \\ne i (\\forall n > 0) \\mid X_0 = j\\}",
        explanation: "在第 $k$ 步切片插入状态 $j$，由非负性该子事件概率必为 0。",
        why: "子事件概率不等式与马氏性。"
      },
      {
        step: 8,
        formula: "p_{ij}^{(k)} > 0 \\implies P\\{X_n \\ne i (\\forall n > 0) \\mid X_0 = j\\} = 0 \\implies f_{ji}^* = 1",
        explanation: "因为 $p_{ij}^{(k)} > 0$，第二项只能为 0，即从 $j$ 必能以概率 1 回到 $i$！",
        why: "两因子积为 0 且第一因子非零。"
      },
      {
        step: 9,
        formula: "\\text{交换 } i \\text{ 和 } j \\text{ 的角色，完全同理即得 } f_{ij}^* = 1",
        explanation: "对偶推理，完成学生法证明！",
        why: "角色对换。"
      }
    ],
    pitfalls: [
      "注意定理的前提是『出发状态 $i$ 是常返态』！如果 $i$ 是非常返态，而目标 $j$ 是常返态，即使可达，到达概率 $f_{ij}^*$ 完全可以小于 1！详见 p.47 思考题。"
    ],
    dependencies: ["prop-1-2-9", "lemma-1-2-5"],
    unlocks: ["question-p47-1", "ex-1-2-12", "thm-1-3-3"]
  },
  {
    id: "question-p47-1",
    section: "1.2",
    type: "exercise",
    title: "思考题 (p.47): 目标常返能否保证到达概率必为 1？(反例透析)",
    badge: "经典反例",
    tags: ["反例", "吸收态", "单向分支"],
    summary: "若起点非常返，即便目标是常返态，$f_{ij}^*$ 也不一定等于 1，可能被其他吸收态拦截。",
    intuitiveAnalogy: "十字路口（状态1）：往左走掉进悬崖A（吸收态0），往右走掉进悬崖B（吸收态2）。虽然悬崖B是常返的，但你只有 50% 概率掉进B，还有 50% 概率掉进了A，永远去不了B！",
    mathStatement: `若 $j$ 是常返态，$i \\leadsto j$ 是否必然蕴含 $f_{ij}^* = 1$？
**答案：否！** 
经典反例：$0 \\xleftarrow{q} 1 \\xrightarrow{p} 2$，其中 $p, q > 0, p+q=1$。状态 0 和 2 都是吸收常返态，但从 1 出发到达 2 的概率仅为 $f_{12}^* = p < 1$。`,
    blueprint: "构造具有多个吸收态的分支链作为直观反例。",
    microProof: [
      {
        step: 1,
        formula: "P = \\begin{bmatrix} 1 & 0 & 0 \\\\ q & 0 & p \\\\ 0 & 0 & 1 \\end{bmatrix}, \\quad S = \\{0, 1, 2\\}",
        explanation: "状态 0 和 2 为吸收壁（常返类）。状态 1 是非常返态。",
        why: "反例构造。"
      },
      {
        step: 2,
        formula: "1 \\leadsto 2 \\ (p_{12}^{(1)} = p > 0), \\quad \\text{但 } f_{12}^* = p < 1",
        explanation: "虽然 2 是常返态且 1 可达 2，但由于有 $q$ 的概率滑入 0，从 1 到达 2 的概率无法达到 1！",
        why: "验证完毕。"
      }
    ],
    pitfalls: [
      "一定要看清楚定理 1.2.11 的前提：必须是**起点 $i$ 本身常返**！"
    ],
    dependencies: ["thm-1-2-11"],
    unlocks: ["sec-1-4-absorption"]
  },
  {
    id: "ex-1-2-12",
    section: "1.2",
    type: "exercise",
    title: "习题 1.2.12: 跨状态无穷访问概率矩阵 $Q_{ij}$ 的 0-1 规律",
    badge: "深层理论",
    tags: ["极限行为", "无穷回访矩阵", "0-1律扩展"],
    summary: "从任意点出发看常返态，无穷次到访的概率依然只有 0 或 1。",
    intuitiveAnalogy: "无论你站在哪里，对于任何一个目的地，你要么注定只能去有限次，要么必定能去无穷多次，毫无中间可能。",
    mathStatement: `定义无穷次访问概率 $Q_{ij} = P\\{X_n = j \\text{ i.o.} \\mid X_0 = i\\}$。证明：
(1) 对所有 $i \\in S$，必有 $Q_{ii} = 1$ 或 $0$；
(2) 若 $i \\leadsto j$ 且 $i$ 是常返态，则 $Q_{ij} = 1$；
(3) (思考题) 若不可约马氏链满足：存在某个状态 $j$ 使得对所有 $i \\ne j$ 均有 $Q_{ij} = 1$，则该链是否必常返？（答案：是！）。`,
    blueprint: "引入到达 $j$ 至少 $N$ 次的递减事件序列 $Q_{ij}^N$，利用首次击中时间迭代拆解并令 $N \\to \\infty$。",
    microProof: [
      {
        step: 1,
        formula: "Q_{ij}^N = P\\{\\#\\{n > 0 \\mid X_n = j\\} \\ge N \\mid X_0 = i\\} = \\sum_{m=1}^\\infty f_{ij}^{(m)} Q_{jj}^{N-1} = f_{ij}^* Q_{jj}^{N-1}",
        explanation: "要想访问 $j$ 至少 $N$ 次，必须先以概率 $f_{ij}^*$ 第一次击中 $j$，之后再从 $j$ 出发访问至少 $N-1$ 次！",
        why: "强马氏性首次到达分解。"
      },
      {
        step: 2,
        formula: "Q_{ii}^N = (f_{ii}^*)^N, \\quad Q_{ij}^N = f_{ij}^* (f_{jj}^*)^{N-1} \\implies Q_{ij} = \\lim_{N \\to \\infty} Q_{ij}^N = f_{ij}^* Q_{jj}",
        explanation: "由归纳法，$Q_{ii}^N$ 是公比为 $f_{ii}^*$ 的等比幂次。",
        why: "几何级数迭代。"
      },
      {
        step: 3,
        formula: "\\text{若 } f_{ii}^* < 1 \\implies Q_{ii} = \\lim (f_{ii}^*)^N = 0; \\quad \\text{若 } f_{ii}^* = 1 \\implies Q_{ii} = 1",
        explanation: "底数小于 1 时无穷次幂趋于 0，底数等于 1 时无穷次幂恒为 1，第(1)问得证！",
        why: "数项极限性质。"
      },
      {
        step: 4,
        formula: "i \\leadsto j \\text{ 且 } i \\text{ 常返 } \\implies f_{ij}^* = 1 \\text{ 且 } j \\text{ 常返 } (Q_{jj}=1) \\implies Q_{ij} = 1 \\cdot 1 = 1",
        explanation: "由戴雄平定理 (定理 1.2.11)，$f_{ij}^* = 1$；由常返类性质 $j$ 常返故 $Q_{jj}=1$，相乘得 $Q_{ij} = 1$，第(2)问得证！",
        why: "定理 1.2.11 与命题 1.2.9。"
      }
    ],
    pitfalls: [
      "注意到证明中完全不需要显式调用定理 1.2.1 的级数判据，直接用纯概率与集合极限就能完成漂亮的封闭证明！"
    ],
    dependencies: ["thm-1-2-11", "lemma-1-2-5"],
    unlocks: ["sec-1-3-ergodic"]
  },
  {
    id: "example-rw-1d",
    section: "1.2",
    type: "example",
    title: "经典实例 1: 一维随机游走的常返性与 Stirling 公式精解",
    badge: "物理经典",
    tags: ["一维游走", "Stirling公式", "二项分布渐近"],
    summary: "一维醉汉漫步：只有完全无偏向（向左向右完全对称 $p=1/2$）时才能常返！",
    intuitiveAnalogy: "在一根细绳上走钢丝，如果有一丝向右的顺风（$p > 1/2$），你就会随着风一路漂向右侧无穷远，永远不可能无限次回踩中点。",
    mathStatement: `考虑 $\\mathbb{Z}$ 上的随机游走，向右概率为 $p$，向左概率为 $q = 1-p$。周期 $d = 2$。
偶数步自回访概率为：
$$p_{00}^{(2n)} = \\binom{2n}{n} p^n q^n = \\frac{(2n)!}{n! n!} (pq)^n$$
利用 Stirling 公式 $n! \\sim \\sqrt{2\\pi n} n^n e^{-n}$，得到渐近阶：
$$p_{00}^{(2n)} \\sim \\frac{(4pq)^n}{\\sqrt{\\pi n}}$$
结论：一维随机游走常返 $\\iff p = q = 1/2$（对称游走）。`,
    blueprint: "展开组合二项式，用 Stirling 公式做渐近分析，通过调和级数判断级数敛散性。",
    microProof: [
      {
        step: 1,
        formula: "p_{00}^{(2n+1)} = 0, \\quad p_{00}^{(2n)} = \\binom{2n}{n} p^n q^n",
        explanation: "走奇数步不可能回到原点；走 $2n$ 步回原点必须向右 $n$ 步且向左 $n$ 步，共有 $\\binom{2n}{n}$ 种独立排列途径。",
        why: "二项分布基础模型。"
      },
      {
        step: 2,
        formula: "\\binom{2n}{n} = \\frac{(2n)!}{(n!)^2} \\sim \\frac{\\sqrt{4\\pi n} (2n)^{2n} e^{-2n}}{\\left( \\sqrt{2\\pi n} n^n e^{-n} \\right)^2} = \\frac{2\\sqrt{\\pi n} \\cdot 2^{2n} n^{2n} e^{-2n}}{2\\pi n \\cdot n^{2n} e^{-2n}} = \\frac{4^n}{\\sqrt{\\pi n}}",
        explanation: "将 Stirling 公式精准代入分子分母，指数项 $e^{-2n}$ 与主项 $n^{2n}$ 完全抵消，保留系数 $\\frac{4^n}{\\sqrt{\\pi n}}$。",
        why: "Stirling 渐近展开推导卡片。"
      },
      {
        step: 3,
        formula: "p_{00}^{(2n)} \\sim \\frac{4^n}{\\sqrt{\\pi n}} (pq)^n = \\frac{(4pq)^n}{\\sqrt{\\pi n}}",
        explanation: "与概率项 $(pq)^n$ 相乘合并。",
        why: "代数合并。"
      },
      {
        step: 4,
        formula: "4pq = 4p(1-p) \\le 1, \\quad \\text{等号当且仅当 } p = q = 1/2 \\text{ 成立}",
        explanation: "二次函数极值：$p(1-p)$ 在 $p=1/2$ 处取得极大值 $1/4$。",
        why: "初等代数配方极值。"
      },
      {
        step: 5,
        formula: "\\text{若 } p \\ne 1/2 \\implies 4pq < 1 \\implies \\sum_{n=1}^\\infty p_{00}^{(2n)} \\le \\sum (4pq)^n < \\infty \\implies \\text{非常返}",
        explanation: "公比小于 1 的几何级数收敛，自回访概率和有限，必定非常返（有漂移奔向无穷）。",
        why: "定理 1.2.1。"
      },
      {
        step: 6,
        formula: "\\text{若 } p = 1/2 \\implies 4pq = 1 \\implies p_{00}^{(2n)} \\sim \\frac{1}{\\sqrt{\\pi n}} \\implies \\sum_{n=1}^\\infty \\frac{1}{\\sqrt{n}} = \\infty \\implies \\text{常返！}",
        explanation: "$p$-级数在指数为 $1/2 \\le 1$ 时发散（类似调和级数），级数发散强力证明对称一维游走必常返！",
        why: "微积分 $p$-级数发散判定与定理 1.2.1。"
      }
    ],
    pitfalls: [
      "虽然 $p=1/2$ 时常返，但注意 $p_{00}^{(2n)} \\to 0$！这说明尽管一定会回来，但停留单点的概率在被无限拉平（零常返）。"
    ],
    dependencies: ["thm-1-2-1"],
    unlocks: ["example-rw-2d", "example-rw-3d"]
  },
  {
    id: "example-rw-2d",
    section: "1.2",
    type: "example",
    title: "经典实例 2: 二维对称随机游走常返性 (Polya 2D 定理)",
    badge: "数学皇冠",
    tags: ["二维游走", "Vandermonde卷积", "Polya定理"],
    summary: "在无限二维平面网格上的醉汉：虽然多了一个维度，但依然百分之百必定能摸回原点！",
    intuitiveAnalogy: "醉汉在无限大的国际象棋棋盘上随机乱逛（上下左右各 1/4 概率）。奇迹的是：由于维数只有 2，空间还不够宽阔，他无论走多远，宿命依然会把他拉回出生地！",
    mathStatement: `在 $\\mathbb{Z}^2$ 上的对称随机游走，向上下左右转移概率均为 $1/4$。
走 $2n$ 步回到原点 $(0, 0)$ 的概率为：
$$p_{00}^{(2n)} = \\left( \\frac{1}{4} \\right)^{2n} \\binom{2n}{n}^2 \\sim \\frac{1}{\\pi n}$$
由于调和级数发散：$\\sum_{n=1}^\\infty p_{00}^{(2n)} \\sim \\sum_{n=1}^\\infty \\frac{1}{\\pi n} = \\infty$，因此**二维对称随机游走必定常返！**`,
    blueprint: "通过多项式定理展开路径，利用范德蒙恒等式将四项式系数折叠为组合数平方，再由 Stirling 公式得到 $1/n$ 阶。",
    microProof: [
      {
        step: 1,
        formula: "p_{00}^{(2n)} = \\sum_{i+j=n} \\frac{(2n)!}{i! i! j! j!} \\left( \\frac{1}{4} \\right)^{2n}",
        explanation: "向右 $i$ 步必向左 $i$ 步，向上 $j$ 步必向下 $j$ 步，总步数 $2i+2j=2n \\implies i+j=n$。",
        why: "多项式分布多重全排列数。"
      },
      {
        step: 2,
        formula: "\\frac{(2n)!}{i! i! j! j!} = \\frac{(2n)!}{(n!)^2} \\cdot \\left[ \\frac{n!}{i! (n-i)!} \\right]^2 = \\binom{2n}{n} \\binom{n}{i}^2",
        explanation: "上下同时乘以 $(n!)^2$，巧妙因式分解为一个全局组合数与一个局部组合数的平方。",
        why: "组合恒等式变换技巧。"
      },
      {
        step: 3,
        formula: "\\sum_{i=0}^n \\binom{n}{i}^2 = \\sum_{i=0}^n \\binom{n}{i} \\binom{n}{n-i} = \\binom{2n}{n}",
        explanation: "著名的 Vandermonde 卷积恒等式：从两组各 $n$ 个元素中选 $n$ 个，等同于在合起来的 $2n$ 个元素中选 $n$ 个！",
        why: "Vandermonde 卷积公式。"
      },
      {
        step: 4,
        formula: "p_{00}^{(2n)} = \\left( \\frac{1}{4} \\right)^{2n} \\binom{2n}{n} \\sum_{i=0}^n \\binom{n}{i}^2 = \\left( \\frac{1}{4} \\right)^{2n} \\binom{2n}{n}^2",
        explanation: "两个 $\\binom{2n}{n}$ 合并为平方！",
        why: "代数化简。"
      },
      {
        step: 5,
        formula: "\\binom{2n}{n} \\sim \\frac{4^n}{\\sqrt{\\pi n}} \\implies p_{00}^{(2n)} \\sim \\frac{1}{4^{2n}} \\cdot \\frac{4^{2n}}{\\pi n} = \\frac{1}{\\pi n}",
        explanation: "代入一维例题中已严格证明的 Stirling 展开式，分母 $4^{2n}$ 被分子完美消除，只留下纯粹的 $\\frac{1}{\\pi n}$！",
        why: "Stirling 展开平方运算。"
      },
      {
        step: 6,
        formula: "\\sum_{n=1}^\\infty p_{00}^{(2n)} = \\frac{1}{\\pi} \\sum_{n=1}^\\infty \\frac{1}{n} = +\\infty \\implies \\text{常返！}",
        explanation: "著名的调和级数 $\\sum 1/n$ 发散，判定该马氏链必定常返！",
        why: "定理 1.2.1。"
      }
    ],
    pitfalls: [
      "二维游走的 $p_{00}^{(2n)}$ 正好是一维游走 $p_{00}^{(2n)}$ 的平方（当把对角线旋转坐标变换后看作两个独立一维游走）。"
    ],
    dependencies: ["example-rw-1d"],
    unlocks: ["example-rw-3d"]
  },
  {
    id: "example-rw-3d",
    section: "1.2",
    type: "example",
    title: "经典实例 3: 三维对称随机游走的非常返性 (Pólya 维数灾难)",
    badge: "著名经典",
    tags: ["三维游走", "非常返", "多项分布", "维数灾难"],
    summary: "数学史上最诗意的定理：喝醉的鸟儿可能会永远迷失在天空，再也找不到回家的巢！",
    intuitiveAnalogy: "角谷静夫曾说：『醉汉最终总能找到回家的路，但喝醉的鸟儿却会永远迷失。』三维空间太广阔了，扩散的自由度多了一个维度，稀释了回家的概率，自回访级数彻底收敛！",
    mathStatement: `在 $\\mathbb{Z}^3$ 上的对称随机游走，向 6 个方向转移概率均为 $1/6$。
通过多项式最大值放缩，偶数步回访概率满足：
$$p_{00}^{(2n)} \\le \\frac{3\\sqrt{3}}{2\\pi^{3/2} n^{3/2}}$$
由于级数收敛：$\\sum_{n=1}^\\infty \\frac{1}{n^{3/2}} < \\infty$，从而 $\\sum_{n=1}^\\infty p_{00}^{(2n)} < \\infty$。
结论：**三维对称随机游走是非常返的 (Nonrecurrent / Transient)！**`,
    blueprint: "将多项式系数提取一项利用多项分布性质，对最大项应用 Stirling 公式放缩出 $n^{-3/2}$ 幂次。",
    microProof: [
      {
        step: 1,
        formula: "p_{00}^{(2n)} = \\sum_{i+j+k=n} \\frac{(2n)!}{i!i!j!j!k!k!} \\left(\\frac{1}{6}\\right)^{2n} = \\left(\\frac{1}{2}\\right)^{2n} \\binom{2n}{n} \\sum_{i+j+k=n} \\left[ \\frac{n!}{i!j!k!} \\right]^2 \\left(\\frac{1}{3}\\right)^{2n}",
        explanation: "在三个坐标轴上的位移必须各自平衡，总步数 $i+j+k=n$。",
        why: "3D 多重全排列。"
      },
      {
        step: 2,
        formula: "c_n = \\max_{i+j+k=n} \\frac{n!}{i!j!k!} \\quad \\text{在 } i = j = k \\approx \\frac{n}{3} \\text{ 处取得最大值}",
        explanation: "对对称乘积，当三项尽可能均匀相等时，分母最小，组合数取得全局极大值。",
        why: "凸函数与对称极值原理。"
      },
      {
        step: 3,
        formula: "\\sum_{i+j+k=n} \\left[ \\frac{n!}{i!j!k!} \\right]^2 \\left(\\frac{1}{3}\\right)^{2n} \\le c_n \\left(\\frac{1}{3}\\right)^n \\sum_{i+j+k=n} \\frac{n!}{i!j!k!} \\left(\\frac{1}{3}\\right)^n = c_n \\left(\\frac{1}{3}\\right)^n \\cdot 1",
        explanation: "利用多项分布概率总和为 1：$\\sum_{i+j+k=n} \\frac{n!}{i!j!k!} (1/3)^n = (1/3+1/3+1/3)^n = 1$！",
        why: "多项式定理折叠。"
      },
      {
        step: 4,
        formula: "c_n \\approx \\frac{n!}{[(n/3)!]^3} \\sim \\frac{\\sqrt{2\\pi n} n^n e^{-n}}{\\left[ \\sqrt{2\\pi n/3} (n/3)^{n/3} e^{-n/3} \\right]^3} = \\frac{3^{n+3/2}}{2\\pi n}",
        explanation: "对三等分项代入 Stirling 公式精细化简展开。",
        why: "Stirling 展开式。"
      },
      {
        step: 5,
        formula: "p_{00}^{(2n)} \\le c_n \\left(\\frac{1}{2}\\right)^{2n} \\binom{2n}{n} \\left(\\frac{1}{3}\\right)^n \\sim \\frac{3^{n+3/2}}{2\\pi n} \\cdot \\frac{1}{4^n} \\cdot \\frac{4^n}{\\sqrt{\\pi n}} \\cdot \\frac{1}{3^n} = \\frac{3\\sqrt{3}}{2 \\pi^{3/2} n^{3/2}}",
        explanation: "指数项 $3^n$ 与 $4^n$ 再次全部相消，分母留下 $n \\cdot \\sqrt{n} = n^{3/2}$！",
        why: "指数完全消去。"
      },
      {
        step: 6,
        formula: "\\sum_{n=1}^\\infty p_{00}^{(2n)} \\le C \\sum_{n=1}^\\infty \\frac{1}{n^{3/2}} < \\infty \\implies \\text{非常返！}",
        explanation: "因为指数 $3/2 > 1$，$p$-级数收敛！由定理 1.2.1，三维游走非常返！",
        why: "定理 1.2.1 充分必要条件。"
      }
    ],
    pitfalls: [
      "这也是著名的 Pólya 定理：随机游走在 $d=1, 2$ 维常返，而在 $d \\ge 3$ 维必定非常返！"
    ],
    dependencies: ["example-rw-1d", "example-rw-2d"],
    unlocks: ["ex-1-2-13"]
  },
  {
    id: "ex-1-2-13",
    section: "1.2",
    type: "exercise",
    title: "习题 1.2.3: 3D 随机游走永久逃逸定理 (逃出任意有界盒子)",
    badge: "深入习题",
    tags: ["有限盒子", "永久离开", "几乎处处"],
    summary: "在三维空间中，无论你在原点周围放一个多大的封闭保险箱，粒子最终都会彻底逃逸，再也不会回来。",
    intuitiveAnalogy: "宇宙飞船在浩瀚太空中随机漂泊，只要空间是三维的，飞船飞离太阳系后，与太阳系重逢的概率趋于零，它注定彻底漂向深空边缘。",
    mathStatement: `设 $X$ 为 $\\mathbb{Z}^3$ 上的对称随机游走。对任意参考点 $o$ 及包含 $o$ 的任意有界盒子 $B \\subset \\mathbb{Z}^3$，证明：
$$P\\{ \\exists N_\\omega > 0 \\text{ s.t. } X_n(\\omega) \\notin B \\ (\\forall n > N_\\omega) \\mid X_0 = o \\} = 1$$`,
    blueprint: "利用有界盒子只包含有限个状态，对每个状态调用定理 1.2.10（非常返态访问次数有限个），取有限并集即证。",
    microProof: [
      {
        step: 1,
        formula: "B \\subset \\mathbb{Z}^3 \\text{ 有界 } \\implies |B| < \\infty, \\quad B = \\{x_1, x_2, \\dots, x_K\\}",
        explanation: "整数格点中的有界闭区域内只有有限个离散点。",
        why: "离散空间的有限性。"
      },
      {
        step: 2,
        formula: "\\forall x \\in B, \\ x \\text{ 是非常返态 } \\implies P\\{X_n = x \\text{ i.o.} \\mid X_0 = o\\} = 0",
        explanation: "由 Example 3，3D 对称游走中每一个单点都是非常返态，访问次数几乎处处有限。",
        why: "Example 3 与推论 1.2.2。"
      },
      {
        step: 3,
        formula: "P\\{X_n \\in B \\text{ i.o.} \\mid X_0 = o\\} = P\\left( \\bigcup_{k=1}^K \\{X_n = x_k \\text{ i.o.}\\}, X_0 = o \\right) \\le \\sum_{k=1}^K P\\{X_n = x_k \\text{ i.o.} \\mid X_0 = o\\} = 0",
        explanation: "有限个概率为 0 的事件之并，概率依然恒为 0！",
        why: "概率的有限可加性。"
      },
      {
        step: 4,
        formula: "\\therefore P\\{X_n \\notin B \\text{ 最终成立} \\mid X_0 = o\\} = 1 - 0 = 1",
        explanation: "逆事件概率为 1，即几乎必然存在时刻 $N_\\omega$ 之后永远不在 $B$ 内！证毕！",
        why: "对偶事件。"
      }
    ],
    pitfalls: [
      "再次强调：此结论成立的关键是盒子 $B$ **有界（有限集）**！若 $B$ 是无限集（如某条无限长柱体），该结论未必成立。"
    ],
    dependencies: ["example-rw-3d", "cor-1-2-2"],
    unlocks: ["sec-1-3-ergodic"]
  },
  {
    id: "example-tom-jerry",
    section: "1.2",
    type: "example",
    title: "经典实例 4: 成功游程与 Tom & Jerry 模型 (Success Runs)",
    badge: "经典构造",
    tags: ["成功游程", "无穷乘积", "相变构造"],
    summary: "从任何地方都可以一步摔回起点：一个充满戏剧性的可解相变模型！",
    intuitiveAnalogy: "汤姆猫捉杰瑞鼠：每成功捉到一次杰瑞（$q_i$ 概率），连胜纪录+1；一旦失手（$p_i$ 概率），连胜纪录瞬间清零（掉回状态0）。老天爷是否会让你连胜到天荒地老？完全取决于连败概率级数是否发散！",
    mathStatement: `状态空间 $\\mathbb{Z}_+ = \\{0, 1, 2, \\dots\\}$。转移矩阵为：
$$P = \\begin{bmatrix} p_0 & q_0 & 0 & 0 & \\dots \\\\ p_1 & 0 & q_1 & 0 & \\dots \\\\ p_2 & 0 & 0 & q_2 & \\dots \\\\ \\vdots & & & & \\ddots \\end{bmatrix}, \\quad p_i + q_i = 1$$
首次回访原点概率满足：
$$f_{00}^* = 1 - \\lim_{m \\to \\infty} \\prod_{i=0}^{m-1} (1 - p_i)$$
状态 0 常返当且仅当级数发散：$\\sum_{i=0}^\\infty p_i = +\\infty$。`,
    blueprint: "直接计算首次到达分布 $f_{00}^{(n)}$，利用裂项求和技巧折叠级数，化为无穷乘积极限。",
    microProof: [
      {
        step: 1,
        formula: "f_{00}^{(1)} = p_0 = 1 - (1-p_0), \\quad f_{00}^{(2)} = q_0 p_1 = (1-p_0)[1 - (1-p_1)]",
        explanation: "第1步回0概率是 $p_0$；第2步回0要求第1步去1（$q_0$）且第2步从1回0（$p_1$）。",
        why: "一步与两步路径枚举。"
      },
      {
        step: 2,
        formula: "f_{00}^{(n)} = q_0 q_1 \\dots q_{n-2} p_{n-1} = \\prod_{i=0}^{n-2} (1-p_i) - \\prod_{i=0}^{n-1} (1-p_i)",
        explanation: "关键代数变形：将 $p_{n-1}$ 写成 $1 - (1-p_{n-1})$，展开后前后两项出现完美的**裂项对消结构 (Telescoping sum)**！",
        why: "裂项技巧：$A(1 - B) = A - AB$。"
      },
      {
        step: 3,
        formula: "\\sum_{n=1}^m f_{00}^{(n)} = \\sum_{n=1}^m \\left[ \\prod_{i=0}^{n-2}(1-p_i) - \\prod_{i=0}^{n-1}(1-p_i) \\right] = 1 - \\prod_{i=0}^{m-1} (1-p_i)",
        explanation: "所有中间乘积项如多米诺骨牌般全部对消，只留下首项 1 和末项！",
        why: "有限求和裂项对消。"
      },
      {
        step: 4,
        formula: "f_{00}^* = \\lim_{m \\to \\infty} \\sum_{n=1}^m f_{00}^{(n)} = 1 - \\lim_{m \\to \\infty} \\prod_{i=0}^{m-1} (1-p_i)",
        explanation: "两端取极限 $m \\to \\infty$。",
        why: "级数和的极限定义。"
      },
      {
        step: 5,
        formula: "f_{00}^* = 1 \\iff \\lim_{m \\to \\infty} \\prod_{i=0}^{m-1} (1 - p_i) = 0 \\iff \\sum_{i=0}^\\infty p_i = +\\infty",
        explanation: "由微积分中经典无穷乘积定理（引理 1.2.14），乘积趋于 0 等价于指数级数和发散！",
        why: "引理 1.2.14。"
      }
    ],
    pitfalls: [
      "若 $\\sum p_i < \\infty$，则无穷乘积大于零，导致 $f_{00}^* < 1$，此时系统是非常返的！"
    ],
    dependencies: ["lemma-1-2-5", "lemma-1-2-14"],
    unlocks: ["lemma-1-2-15", "sec-1-3-ergodic"]
  },
  {
    id: "lemma-1-2-14",
    section: "1.2",
    type: "lemma",
    title: "引理 1.2.14: 无穷乘积收敛与级数发散等价性引理",
    badge: "微积分工具",
    tags: ["无穷乘积", "不等式放缩", "实分析"],
    summary: "无穷多个小于1的因数连乘要想衰减到零，当且仅当每一项偏离1的幅度累加发散。",
    intuitiveAnalogy: "每天你的战斗力被削弱 $p_i$。如果累积削弱量是有限的（$\\sum p_i < \\infty$），你永远能保留一口气不死；只有当削弱总量无穷大时，生命值才会被彻底磨灭至零。",
    mathStatement: `设 $0 < p_i < 1 (i = 0, 1, \\dots)$，则：
$$\\lim_{m \\to +\\infty} \\prod_{i=0}^m (1 - p_i) = 0 \\iff \\sum_{i=0}^\\infty p_i = \\infty$$`,
    blueprint: "利用基本不等式 $1 - x \\le e^{-x}$ 与对数泰勒展开完成双向夹逼。",
    microProof: [
      {
        step: 1,
        formula: "1 - p_i \\le e^{-p_i} \\implies \\prod_{i=0}^m (1 - p_i) \\le \\exp\\left( -\\sum_{i=0}^m p_i \\right)",
        explanation: "由经典凹凸性不等式 $1-x \\le e^{-x}$，两端连乘得到指数上界。",
        why: "指数上界放缩。"
      },
      {
        step: 2,
        formula: "\\sum_{i=0}^\\infty p_i = \\infty \\implies \\exp\\left( -\\sum_{i=0}^m p_i \\right) \\to e^{-\\infty} = 0 \\implies \\prod (1-p_i) \\to 0",
        explanation: "指数趋于负无穷，夹逼定理迫使乘积必趋于 0！充分性得证。",
        why: "夹逼定理。"
      },
      {
        step: 3,
        formula: "\\ln \\prod_{i=0}^m (1-p_i) = \\sum_{i=0}^m \\ln(1 - p_i) \\approx -\\sum_{i=0}^m p_i",
        explanation: "利用泰勒展开 $\\ln(1-x) = -x - O(x^2)$，反向推导必要性。",
        why: "对数展开同阶比较。"
      }
    ],
    pitfalls: ["要求每一项 $p_i \\in (0, 1)$，若有某项 $p_i = 1$，则有限步内就直接变 0。"],
    dependencies: [],
    unlocks: ["example-tom-jerry"]
  },
  {
    id: "lemma-1-2-15",
    section: "1.2",
    type: "lemma",
    title: "引理 1.2.15: 正常返与零常返的数列构造存在性引理",
    badge: "反例武器库",
    tags: ["反例构造", "正常返构造", "零常返构造"],
    summary: "实分析构造：设计两组概率数列，一组一阶矩有限，一组一阶矩无限发散。",
    intuitiveAnalogy: "你可以设计一种抽奖：奖品出现的概率和是 1（必定能抽到），但等待抽中的平均天数可以是『期望 2 天』（正常返），也可以是『期望无穷多天』（零常返，重尾分布）！",
    mathStatement: `存在正数列使得概率和为 1，但一阶加权矩呈现截然不同的收敛特性：
(1) **正常返数列**：存在 $a_n > 0$ 满足 $\\sum_{n=1}^\\infty a_n = 1$ 且 $\\sum_{n=1}^\\infty n a_n < \\infty$；
(2) **零常返数列**：存在 $b_n > 0$ 满足 $\\sum_{n=1}^\\infty b_n = 1$ 且 $\\sum_{n=1}^\\infty n b_n = \\infty$。`,
    blueprint: "取几何衰减级数构造(1)；取 $p$-级数重尾分布构造(2)。",
    microProof: [
      {
        step: 1,
        formula: "\\text{取 } a_n = \\frac{1}{n 2^n} (n \\ge 2), \\quad a_1 = 1 - \\sum_{n=2}^\\infty a_n > 0",
        explanation: "显然 $\\sum a_n = 1$。其加权和 $\\sum_{n=2}^\\infty n a_n = \\sum_{n=2}^\\infty \\frac{1}{2^n} = \\frac{1}{2} < \\infty$！(1)获证！",
        why: "指数项以超快速度镇压了多项式增长 $n$。"
      },
      {
        step: 2,
        formula: "\\text{取 } b_n = \\frac{1}{n^2} (n \\ge 2), \\quad b_1 = 1 - \\sum_{n=2}^\\infty \\frac{1}{n^2} > 0",
        explanation: "由 Basel 问题 $\\sum_{n=1}^\\infty 1/n^2 = \\pi^2/6 < 2$，故 $b_1 > 0$，概率和为 1。",
        why: "平方反比级数收敛。"
      },
      {
        step: 3,
        formula: "\\sum_{n=2}^\\infty n b_n = \\sum_{n=2}^\\infty n \\cdot \\frac{1}{n^2} = \\sum_{n=2}^\\infty \\frac{1}{n} = +\\infty",
        explanation: "加权求和后退化为著名的**调和级数**，发散至无穷大！(2)获证！",
        why: "调和级数发散。"
      }
    ],
    pitfalls: [
      "这为在第 1.3 节中严格构造出『回访概率为 1 但平均回访时间为无穷大』的零常返马氏链打下了基石！"
    ],
    dependencies: [],
    unlocks: ["sec-1-3-ergodic", "thm-1-3-3"]
  }
];
