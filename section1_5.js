// Section 1.5: 常返性与正常返性的实用判据 (pp. 66 - 76)
window.SECTION_1_5 = [
  {
    id: "lemma-1-5-1",
    section: "1.5",
    type: "lemma",
    title: "引理 1.5.1: 常返性单点击中引理",
    badge: "判据先锋",
    tags: ["单点击中", "全进必常返", "强马氏"],
    summary: "天下归心：如果全宇宙所有其他状态都能百分之百走到状态 $j$（$f_{ij}^* = 1$），那么 $j$ 自己必定是常返态！",
    intuitiveAnalogy: "这就像罗马城：如果从全世界任意一座城市出发，条条大路通罗马，人人最终都能走到罗马（$f_{i \\text{罗马}}^* = 1$），那么即便你从罗马城门走出去，你也必然会被滚滚人流裹挟着再次回到罗马（常返）！",
    mathStatement: `设 $P$ 为任意马尔科夫链（无需事先假定不可约），$j \\in S$。
若对所有 $i \\ne j$ 均有 $f_{ij}^* = 1$，则状态 $j$ 必为常返态。
（讲义在第75页给出两种极富启发性的严格证明：代数方程法与反证法）。`,
    blueprint: "方法一：展开 $f_{jj}^*$ 的全概率一步迭代方程，利用 $f_{ij}^* = 1$ 将条件概率消去；方法二：反证法，假设 $j$ 非常返，利用有界停时找到最终逃逸事件的矛盾。",
    microProof: [
      {
        step: 1,
        formula: "\\text{【证明方法一：代数方程法】由首次击中全概率分解：} f_{jj}^* = p_{jj} + \\sum_{i \\ne j} p_{ji} f_{ij}^*",
        explanation: "从 $j$ 出发首次回访 $j$：要么第 1 步直接回到 $j$（概率 $p_{jj}$）；要么第 1 步跳到其他某个点 $i \\ne j$（概率 $p_{ji}$），随后再从 $i$ 最终到达 $j$（概率 $f_{ij}^*$）。",
        why: "全概率分解公式。"
      },
      {
        step: 2,
        formula: "\\forall i \\ne j, \\ f_{ij}^* = 1 \\implies f_{jj}^* = p_{jj} + \\sum_{i \\ne j} p_{ji} \\cdot 1 = p_{jj} + \\sum_{i \\ne j} p_{ji} = \\sum_{i \\in S} p_{ji} = 1",
        explanation: "将 $f_{ij}^* = 1$ 直接代入，所有项的系数合并，正好是转移矩阵第 $j$ 行的行和，恒等于 1！",
        why: "马氏矩阵行和为 1：$\\sum_{i \\in S} p_{ji} = 1$。"
      },
      {
        step: 3,
        formula: "f_{jj}^* = 1 \\implies j \\text{ 是常返态}",
        explanation: "由引理 1.2.5，$f_{jj}^* = 1$ 充要等价于 $j$ 常返！方法一仅用两行秒杀！",
        why: "引理 1.2.5。"
      },
      {
        step: 4,
        formula: "\\text{【证明方法二：反证法】反设 } j \\text{ 非常返 } \\implies \\exists M \\ge 1 \\text{ s.t. } P\\{X_m \\ne j (\\forall m \\ge M) \\mid X_0 = j\\} > 0",
        explanation: "非常返意味着存在某个时刻 $M$ 之后永远不回 $j$。",
        why: "非常返定义。"
      },
      {
        step: 5,
        formula: "\\exists i \\ne j \\text{ s.t. } P\\{X_M = i, X_m \\ne j (\\forall m \\ge M+1) \\mid X_0 = j\\} = P\\{X_m \\ne j (\\forall m \\ge 1) \\mid X_0 = i\\} \\cdot p_{ji}^{(M)} > 0",
        explanation: "在时刻 $M$ 必定踩在某个非 $j$ 的状态 $i$，由马氏性从时刻 $M$ 往后等价于从 $i$ 出发永不到达 $j$。",
        why: "马氏性与时间齐次性。"
      },
      {
        step: 6,
        formula: "P\\{X_m \\ne j (\\forall m \\ge 1) \\mid X_0 = i\\} = 1 - f_{ij}^* = 1 - 1 = 0 \\implies 0 > 0 \\text{ (矛盾！)}",
        explanation: "因为已知 $f_{ij}^* = 1$，从 $i$ 永远到不了 $j$ 的概率只能是 0，与第 5 步严格大于 0 矛盾！方法二证毕！",
        why: "反证法闭合。"
      }
    ],
    pitfalls: [
      "方法一的优雅体现了代数化简的极致美感，方法二展现了马氏性在停时切片上的威力。二者对比，初学者能极深刻体会全概率公式。"
    ],
    dependencies: ["lemma-1-2-5", "thm-1-2-11"],
    unlocks: ["thm-1-5-2", "thm-1-5-4"]
  },
  {
    id: "thm-1-5-2",
    section: "1.5",
    type: "theorem",
    title: "定理 1.5.2: 非常返性的调和方程判据 (Harmonic Equation Criterion)",
    badge: "实战利剑",
    tags: ["调和方程", "非常返判据", "吸收改造", "控制收敛"],
    summary: "判断一个复杂链是否非常返，不需要算无限步极限，只需要找一个有界非负非常数的调和函数解！",
    intuitiveAnalogy: "寻找逃逸电压：如果在一个电路网格中，固定 0 号接地元为 1 伏特，你能在这个网格上建立一套处处满足基尔霍夫电流定律（调和方程）、且电位始终有界但各处不相等的平滑电压分布，就证明电荷有通路一路逃向无限远处！",
    mathStatement: `设 $P$ 为不可约马氏矩阵，$H \\subset \\mathbb{Z}_+$ 为**单点集**（不失一般性设 $H = \\{0\\}$）。
则 $P$ 是**非常返的 (Nonrecurrent)**，充分必要条件是调和方程组：
$$\\sum_{j=0}^\\infty p_{ij} y_j = y_i \\quad (\\forall i \\notin H)$$
存在一个**有界、非负且非常数 (bounded, nonnegative, nonconstant)** 的解 $y = (y_i)_{i \\in \\mathbb{Z}_+}$。
（注：若 $H$ 不是单点集，该定理不成立！反例见讲义第72页脚注20）。`,
    blueprint: "必要性：若链非常返，显式构造 $y_0=1, y_i = f_{i0}^*$，由引理 1.5.1 证明其必非常数；充分性：把 0 点强行改造成吸收壁 $\\tilde{X}$，利用 $\\tilde{P}^n y = y$ 和控制收敛定理反证若常返则必迫使 $y$ 退化为常数。",
    microProof: [
      {
        step: 1,
        formula: "\\text{【必要性】设 } P \\text{ 非常返。构造 } y_0 = 1, \\quad y_i = f_{i0}^* \\le 1 \\ (i \\ge 1)",
        explanation: "由击中概率定义，各分量显然在 $[0, 1]$ 之间，天然非负且有界。",
        why: "构造候选解。"
      },
      {
        step: 2,
        formula: "\\exists i \\ge 1 \\text{ s.t. } y_i = f_{i0}^* < 1",
        explanation: "若对所有 $i \\ge 1$ 都有 $f_{i0}^* = 1$，则由引理 1.5.1 状态 0 将被迫成为常返态，导致全链常返矛盾！因此必存在某个分量小于 1，保证了 $y$ 是**非常数解**！",
        why: "引理 1.5.1 逆否。"
      },
      {
        step: 3,
        formula: "y_i = f_{i0}^* = p_{i0} + \\sum_{j \\ne 0} p_{ij} f_{j0}^* = p_{i0} y_0 + \\sum_{j \\ne 0} p_{ij} y_j = \\sum_{j=0}^\\infty p_{ij} y_j \\quad (\\forall i \\ne 0)",
        explanation: "由第一步分析法，击中概率天然满足去除 0 后的调和方程！必要性彻底获证！",
        why: "首次到达全概率分解。"
      },
      {
        step: 4,
        formula: "\\text{【充分性】设 } y \\text{ 是有界非负非常数解。改造转移矩阵 } \\tilde{P}: \\tilde{p}_{00}=1, \\tilde{p}_{0j}=0 (j \\ne 0), \\tilde{p}_{ij}=p_{ij} (i \\ge 1)",
        explanation: "将 0 态强行封闭为吸收壁，其余点转移规则完全不变。",
        why: "吸收马氏链构造。"
      },
      {
        step: 5,
        formula: "(\\tilde{P} y)_i = \\sum_j \\tilde{p}_{ij} y_j = \\begin{cases} 1 \\cdot y_0 = y_0 & i = 0 \\\\ \\sum p_{ij} y_j = y_i & i \\ge 1 \\end{cases} \\implies \\tilde{P} y = y \\implies \\tilde{P}^n y = y \\ (\\forall n)",
        explanation: "由调和性质，向量 $y$ 是改造链 $\\tilde{P}$ 的全局调和向量，任意多次方作用保持不变！",
        why: "归纳法。"
      },
      {
        step: 6,
        formula: "\\text{反设 } P \\text{ 是常返的 } \\implies \\tilde{f}_{i0}^* = f_{i0}^* = 1 (\\forall i) \\implies \\lim_{n \\to \\infty} \\tilde{p}_{i0}^{(n)} = \\frac{\\tilde{f}_{i0}^*}{\\tilde{m}_{00}} = \\frac{1}{1} = 1",
        explanation: "若原链常返，由定理 1.2.11 击中概率为 1；改造链中 0 是吸收态，其平均回访时间为 1，故由命题 1.3.14 长期吸收概率极限为 1！",
        why: "定理 1.2.11 与命题 1.3.14。"
      },
      {
        step: 7,
        formula: "j \\ne 0 \\text{ 在 } \\tilde{P} \\text{ 中是非常返态 } \\implies \\lim_{n \\to \\infty} \\tilde{p}_{ij}^{(n)} = 0 \\quad (\\forall j \\ge 1)",
        explanation: "除 0 外所有点都成了瞬时态，概率全部漏进 0，其余位置单点极限全为 0！",
        why: "定理 1.2.10。"
      },
      {
        step: 8,
        formula: "y_i = \\lim_{n \\to \\infty} \\sum_{j=0}^\\infty \\tilde{p}_{ij}^{(n)} y_j = \\lim_{n \\to \\infty} \\left[ \\tilde{p}_{i0}^{(n)} y_0 + \\sum_{j \\ne 0} \\tilde{p}_{ij}^{(n)} y_j \\right] = 1 \\cdot y_0 + 0 = y_0 \\quad (\\forall i \\ge 1)",
        explanation: "因为 $y$ 有界，由控制收敛定理极限穿透求和号，得出对任意 $i$ 均有 $y_i = y_0$！这意味着 $y$ 必须是常数向量！",
        why: "控制收敛定理与有界性。"
      },
      {
        step: 9,
        formula: "\\text{这与假设 } y \\text{ 是非常数解产生致命矛盾！故 } P \\text{ 绝不可能常返，必为非常返态！}",
        explanation: "反证法闭合，充分性获证！",
        why: "全定理证毕。"
      }
    ],
    pitfalls: [
      "为什么必须强调『有界解』？因为即使在常返链中（如无偏游走），调和方程 $y_i = \\frac{1}{2}y_{i-1} + \\frac{1}{2}y_{i+1}$ 也有线性无界解 $y_i = i$！必须是有界解才能判定非常返！"
    ],
    dependencies: ["lemma-1-5-1", "thm-1-2-10", "thm-1-2-11", "prop-1-3-14"],
    unlocks: ["ex-1-5-3", "thm-1-5-4", "example-1-5-2-a"]
  },
  {
    id: "ex-1-5-3",
    section: "1.5",
    type: "exercise",
    title: "习题 1.5.3: 全局调和方程有界非平凡解的非常返判定",
    badge: "定理拓展",
    tags: ["调和方程", "非常返", "整体不变"],
    summary: "如果 $Py = y$ 在全空间上存在有界非负非常数解，该不可约马氏链必为非常返。",
    intuitiveAnalogy: "如果一个没有外部边界的封闭系统竟然能维持非均匀的稳定势能，说明系统内部有漏洞，粒子在往无穷远处泄漏。",
    mathStatement: `若不可约马氏链的方程 $Py = y$ 拥有一个有界、非负且非常数的解 $y = (y_i)_{i \\in \\mathbb{Z}_+}$，证明 $P$ 必为非常返。`,
    blueprint: "若 $Py=y$ 在全空间成立，当然对挖去单点 $H=\\{0\\}$ 也成立，直接调用定理 1.5.2 获证。",
    microProof: [
      {
        step: 1,
        formula: "Py = y \\implies \\sum_{j \\in S} p_{ij} y_j = y_i \\quad (\\forall i \\in S)",
        explanation: "在所有点上均满足调和性，自然对子集 $i \\notin H = \\{0\\}$ 亦成立。",
        why: "全集包含关系。"
      },
      {
        step: 2,
        formula: "y \\text{ 有界、非负、非常数且满足 } \\sum p_{ij} y_j = y_i (i \\ne 0) \\implies P \\text{ 非常返}",
        explanation: "完全满足定理 1.5.2 的充分性条件，直接调用即可！",
        why: "定理 1.5.2。"
      }
    ],
    pitfalls: [
      "注意与定理 1.3.8 对比：定理 1.3.8 的平稳方程是行向量 $\\pi = \\pi P$；而此处的调和方程是列向量 $Py = y$！初学者极易混淆左右乘法。"
    ],
    dependencies: ["thm-1-5-2"],
    unlocks: ["thm-1-5-4"]
  },
  {
    id: "thm-1-5-4",
    section: "1.5",
    type: "theorem",
    title: "定理 1.5.4: Foster 常返性漂移判据 (Foster's Recurrence Criterion)",
    badge: "现代精髓",
    tags: ["Foster判据", "Lyapunov函数", "超调和", "常返性充要"],
    summary: "常返性的现代物理画卷：只要能找到一个朝无穷远处凸起的势能函数（Lyapunov 函数），使得质点处处感受到向内的引力，系统就必定常返！",
    intuitiveAnalogy: "碗状引力场：想象一个大瓷碗，碗底是原点 0，碗壁向外无限升高（$y_i \\to \\infty$）。在碗壁任意位置，粒子的平均下一步势能不高于当前势能（$\\sum p_{ij} y_j \\le y_i$ 超调和性），说明重力一直在把它往碗底拉拽，因此粒子绝不可能逃到碗外面去，必回原点（常返）！",
    mathStatement: `设 $P$ 为不可约马氏矩阵，$H \\subset \\mathbb{Z}_+$ 为非空有限子集。
则 $P$ 是**常返的 (Recurrent)**，充分必要条件是存在正实数列 $y = (y_i)_{i \\in \\mathbb{Z}_+}$ 满足：
$$\\sum_{j=0}^\\infty p_{ij} y_j \\le y_i \\quad (\\forall i \\notin H) \\quad \\text{且} \\quad \\lim_{i \\to +\\infty} y_i = +\\infty$$`,
    blueprint: "充分性：取有界截断 $M$，将势能拆分为内部与尾部，用无穷远处 $y_r \\to \\infty$ 逼迫逃逸概率为 0；必要性：利用 $n$-级概率 $\\tilde{\eta}_i(n)$ 和对角线子序列挑选，通过 Fatou 引理构造出趋于无穷的超调和序列。",
    microProof: [
      {
        step: 1,
        formula: "\\text{【充分性】不妨设 } H = \\{0\\}。\\tilde{P} y \\le y \\implies \\tilde{P}^m y \\le y \\ (\\forall m > 0)",
        explanation: "在改造吸收链 $\\tilde{P}$ 下，超调和不等式对任意迭代步数 $m$ 保持成立。",
        why: "矩阵正定性与单调性保持。"
      },
      {
        step: 2,
        formula: "\\sum_{j=0}^{M-1} \\tilde{p}_{ij}^{(m)} y_j + \\sum_{j=M}^\\infty \\tilde{p}_{ij}^{(m)} y_j \\le y_i \\implies \\sum_{j=0}^{M-1} \\tilde{p}_{ij}^{(m)} y_j + \\left( \\min_{r \\ge M} y_r \\right) \\left( 1 - \\sum_{j=0}^{M-1} \\tilde{p}_{ij}^{(m)} \\right) \\le y_i",
        explanation: "截断门槛 $M$：把求和拆为前 $M-1$ 项和 $M$ 之后的尾巴。尾巴上的每个 $y_j$ 均大于等于下确界 $\\min_{r \\ge M} y_r$！",
        why: "经典截断下确界放缩。"
      },
      {
        step: 3,
        formula: "m \\to +\\infty \\implies \\lim \\tilde{p}_{ij}^{(m)} = 0 \\ (\\forall j \\ne 0), \\quad \\lim \\tilde{p}_{i0}^{(m)} = \\tilde{f}_{i0}^*",
        explanation: "令步数 $m \\to \\infty$，除 0 态外所有单点极限全为 0，只有 0 态极限为到达概率 $\\tilde{f}_{i0}^*$！",
        why: "定理 1.2.10 与命题 1.3.14。"
      },
      {
        step: 4,
        formula: "\\tilde{f}_{i0}^* y_0 + \\left( \\min_{r \\ge M} y_r \\right) (1 - \\tilde{f}_{i0}^*) \\le y_i",
        explanation: "对上述不等式取极限后得到关于截断 $M$ 的静态不等式。",
        why: "极限保序性。"
      },
      {
        step: 5,
        formula: "M \\to +\\infty \\implies \\min_{r \\ge M} y_r \\to +\\infty \\implies 1 - \\tilde{f}_{i0}^* = 0 \\implies f_{i0}^* = 1",
        explanation: "若 $1 - \\tilde{f}_{i0}^* > 0$，令 $M \\to \\infty$ 左边将变成无穷大，与右边有限的 $y_i$ 矛盾！因此必须 $1 - \\tilde{f}_{i0}^* = 0$，即 $f_{i0}^* = 1$！由引理 1.5.1，状态 0 必常返！充分性获证！",
        why: "反证与夹逼。"
      },
      {
        step: 6,
        formula: "\\text{【必要性】定义 } n\\text{-级概率: } \\tilde{\\eta}_i(n) = P\\{ \\exists m \\ge 0 \\text{ s.t. } \\tilde{X}_m \\ge n \\mid \\tilde{X}_0 = i \\}",
        explanation: "这是在 0 点吸收链下，粒子曾经达到或超过高度 $n$ 的极值穿透概率。",
        why: "构造候选 Lyapunov 势能。"
      },
      {
        step: 7,
        formula: "\\lim_{n \\to \\infty} \\tilde{\\eta}_i(n) = 0 \\quad (\\forall i \\ge 0)",
        explanation: "因为链常返，质点最终必然掉进 0 号黑洞被吸收，能无限逃逸到高等级 $n$ 的概率衰减至 0（详见 Footnote 21 习题 1 证明）！",
        why: "Footnote 21 Exercise 1。"
      },
      {
        step: 8,
        formula: "\\text{选取足够快趋于无穷的步数 } n_{i,k} \\nearrow \\infty \\text{ 使得 } \\tilde{\\eta}_i(n_{i,k}) < 2^{-k}，\\text{并定义 } y_i = \\sum_{k \\ge 1} \\tilde{\\eta}_i(n_{k,k})",
        explanation: "用几何级数 $2^{-k}$ 压制级数使其收敛出有限值，同时通过对角线选取使得当 $i \\to \\infty$ 时各项趋向 1。",
        why: "实分析对角线构造法。"
      },
      {
        step: 9,
        formula: "\\liminf_{i \\to \\infty} y_i \\ge \\sum_{k \\ge 1} \\liminf_{i \\to \\infty} \\tilde{\\eta}_i(n_{k,k}) = \\sum_{k \\ge 1} 1 = +\\infty \\quad (\\text{由 Fatou 引理})",
        explanation: "由 Fatou 引理，下极限进求和号，每一项因 $i \\ge n_{k,k}$ 恒为 1，无穷个 1 相加发散至无穷！势能发散条件获证！",
        why: "Fatou 引理 (Theorem 0.2.5)。"
      },
      {
        step: 10,
        formula: "\\tilde{\\eta}_i(n) \\ge \\sum_j \\tilde{p}_{ij} \\tilde{\\eta}_j(n) \\implies y_i \\ge \\sum_j p_{ij} y_j \\quad (\\forall i \\ne 0)",
        explanation: "由第一步马氏性，各层级概率天然具有超调和性，求和后依然保持超调和性！必要性彻底得证！",
        why: "凸锥保序性质。"
      }
    ],
    pitfalls: [
      "这是全章最具有现代马氏链分析风格的证明！掌握了这个判据，面对复杂的排队论、粒子系统，只需猜一个二次函数或线性函数 $y_i$ 验证单步漂移 $\\sum p_{ij} y_j - y_i \\le 0$，即可秒判常返性！"
    ],
    dependencies: ["lemma-1-5-1", "thm-1-5-2", "thm-1-2-11"],
    unlocks: ["fn-21-ex-1-3", "ex-1-5-5", "thm-1-5-6", "example-1-5-2-c"]
  },
  {
    id: "fn-21-ex-1-3",
    section: "1.5",
    type: "exercise",
    title: "Footnote 21 习题 1-3: $n$-级穿透概率性质与控制收敛陷阱",
    badge: "实分析显微镜",
    tags: ["计数测度", "控制收敛反例", "极限进求和号"],
    summary: "深度剖析实分析陷阱：为什么在离散无穷求和中，绝不能不加检查就让极限穿透求和号？",
    intuitiveAnalogy: "每个人都保证『在无穷远的时间后自己会还清债务（极限为0）』，但这并不意味着『在无穷远处大家欠你的总债款是0』！如果欠债人数是无限的，总债款完全可以依然是天文数字！",
    mathStatement: `深入分析定理 1.5.4 证明中的核心引理：
(1) 证明在吸收链 $\\tilde{X}$ 下：$\\lim_{n \\to \\infty} \\tilde{\\eta}_i(n) = 0$ 对所有 $i \\ge 0$ 成立；
(2) 证明在原不可约常返链 $X$ 下：$\\lim_{n \\to \\infty} \\eta_i(n) = 1$ 对所有 $i \\ge 0$ 成立；
(3) 【反思题】Exercise 3 中给出的基于计数测度下『直接交换极限与积分号』的证明是否正确？为什么？`,
    blueprint: "用有限项切片分解证明(1)；由常返到达概率为1证明(2)；揭露(3)中缺少一致可积控制函数的致命漏洞。",
    microProof: [
      {
        step: 1,
        formula: "\\tilde{\\eta}_i(n) \\le \\varepsilon + \\sum_{m=0}^N \\sum_{j \\ge n} \\tilde{p}_{ij}^{(m)}",
        explanation: "(1)的证明：由常返性，粒子在有限步 $N$ 内到达 0 的概率超过 $1-\\varepsilon$。在剩余 $N$ 步内，粒子能跑到的最大状态是有界的，当门槛 $n \\to \\infty$ 时后项为 0，故极限被 $\\varepsilon$ 控制，得出极限严格为 0！",
        why: "截断放缩与有限步界。"
      },
      {
        step: 2,
        formula: "\\eta_i(n) \\ge f_{in}^* = 1 \\implies \\lim_{n \\to \\infty} \\eta_i(n) = 1",
        explanation: "(2)的证明：由定理 1.2.11，原链不可约常返，从 $i$ 到达任意远方状态 $n$ 的累积概率恒为 1，故曾经 $\\ge n$ 的概率恒为 1！",
        why: "定理 1.2.11。"
      },
      {
        step: 3,
        formula: "\\text{【Exercise 3 判决：错误！】} \\lim_{n \\to \\infty} \\sum_{m \\ge 0} \\tilde{g}_{i,n}(m) \\stackrel{?}{=} \\sum_{m \\ge 0} \\lim_{n \\to \\infty} \\tilde{g}_{i,n}(m)",
        explanation: "在计数测度下，要应用 Lebesgue 控制收敛定理，必须存在一个与 $n$ 无关且绝对可和的被积控制函数 $G(m)$（即 $\\sum G(m) < \\infty$）。但此处 $\\tilde{g}_{i,n}(m) \\le \\sum_{j \\ge n} \\tilde{p}_{ij}^{(m)}$ 严重依赖 $n$，求和可能发散，缺乏一致控制，因此直接调换极限号是不合法的伪证！",
        why: "控制收敛定理的必要前提审查。"
      }
    ],
    pitfalls: [
      "这是实分析初学者最容易犯的大忌：看到单项极限为 0 就想当然把求和号搬到外面。必须找到一致控制函数！"
    ],
    dependencies: ["thm-1-5-4"],
    unlocks: ["thm-1-5-6"]
  },
  {
    id: "ex-1-5-5",
    section: "1.5",
    type: "exercise",
    title: "习题 1.5.5: 全局超调和函数的常返判定",
    badge: "判据特例",
    tags: ["超调和", "Lyapunov", "常返性"],
    summary: "如果在全状态空间上处处势能单步不增且发散，系统必常返。",
    intuitiveAnalogy: "全空间处处都是下坡路（$Py \\le y$），且海拔在无穷远处无限升高（$y_i \\to \\infty$）。粒子像顺水滑梯一样只能往低处滑，绝不可能逃向高山，必常返！",
    mathStatement: `若实数列 $y = (y_i)_{i \\in \\mathbb{Z}_+}$ 满足 $Py \\le y$ 且 $\\lim_{i \\to \\infty} y_i = +\\infty$，证明马氏链 $P$ 是常返的。`,
    blueprint: "取有限集 $H = \\emptyset$ 或 $H = \\{0\\}$，直接套用定理 1.5.4。",
    microProof: [
      {
        step: 1,
        formula: "Py \\le y \\implies \\sum_{j=0}^\\infty p_{ij} y_j \\le y_i \\quad (\\forall i \\in \\mathbb{Z}_+)",
        explanation: "由于对所有点都成立，当然对挖去 $H=\\{0\\}$ 之后的点也成立。",
        why: "全集包含关系。"
      },
      {
        step: 2,
        formula: "y_i \\to +\\infty \\implies \\text{完全满足定理 1.5.4 的条件 } \\implies P \\text{ 常返！}",
        explanation: "直接由定理 1.5.4 充分性完成判定！",
        why: "定理 1.5.4。"
      }
    ],
    pitfalls: ["注意势能函数 $y_i$ 必须是向无穷发散的，常数函数 $y_i = 1$ 虽然满足 $Py \\le y$，但无法判定常返。"],
    dependencies: ["thm-1-5-4"],
    unlocks: ["thm-1-5-6"]
  },
  {
    id: "thm-1-5-6",
    section: "1.5",
    type: "theorem",
    title: "定理 1.5.6: Foster 正常返性强漂移判据 (Foster's Criterion for Positive Recurrence)",
    badge: "王牌定理",
    tags: ["Foster正常返", "负漂移", "平均回访有限", "排队论"],
    summary: "只要单步平均向内衰减至少有保底的步长 1（$\\Delta y \\le -1$），质点不仅能回家，而且回家的期望时间必定有限（正常返）！",
    intuitiveAnalogy: "强力弹簧回拉：在常返判据中，只要不向外走（漂移 $\\le 0$）就能常返；但如果你想保证『有限时间必须回家』（正常返），就必须有强劲的吸力——每走一步，势能平均至少要往下掉 1 个单位（$\\Delta y \\le -1$）！这样从高度 $y_i$ 跌回原点的时间期望绝不会超过 $y_i$ 步！",
    mathStatement: `设 $P$ 为不可约、非周期的马氏矩阵，$H \\subset \\mathbb{Z}_+$ 为有限子集。
则 $P$ 是**正常返的 (Positive Recurrent)**，充分必要条件是不等式组：
$$\\begin{cases} \\sum_{j=0}^\\infty p_{ij} y_j \\le y_i - 1 & (\\forall i \\notin H) \\\\ \\sum_{i \\in H} \\sum_{j=0}^\\infty p_{ij} y_j < \\infty & \\end{cases}$$
存在一个**非负实数解** $y = (y_i)_{i \\in \\mathbb{Z}_+}$。`,
    blueprint: "利用 Dynkin 公式或停时可选停止定理，对势能做期望差分递推，得到 $E_i[T_H] \\le y_i < \\infty$，进而锁定平均回访时间有限。",
    microProof: [
      {
        step: 1,
        formula: "E[y(X_{n+1}) - y(X_n) \\mid X_n = i] = \\sum_{j=0}^\\infty p_{ij} y_j - y_i \\le -1 \\quad (\\forall i \\notin H)",
        explanation: "在中心区域 $H$ 之外，势能的单步条件增量（条件漂移 Drift）严格小于等于 $-1$。",
        why: "Foster 判据核心假设。"
      },
      {
        step: 2,
        formula: "y(X_{n \\wedge T_H}) + (n \\wedge T_H) \\quad \\text{构成关于历史的超鞅 (Supermartingale)}",
        explanation: "每走一步时间增加 1，势能至少下降 1，两相抵消使得总和只减不增！",
        why: "超鞅构造性质。"
      },
      {
        step: 3,
        formula: "E[n \\wedge T_H \\mid X_0 = i] \\le y_i \\xrightarrow{n \\to \\infty} E[T_H \\mid X_0 = i] \\le y_i < \\infty",
        explanation: "由单调收敛定理令 $n \\to \\infty$，首次到达核心集合 $H$ 的平均时间被初始势能 $y_i$ 死死压住，必为有限数！",
        why: "单调收敛定理。"
      },
      {
        step: 4,
        formula: "m_{ii} < \\infty \\implies P \\text{ 是正常返态}",
        explanation: "从有限集 $H$ 回访状态自身的期望时间亦有限，由定理 1.3.8 判定全系统正常返！",
        why: "定理 1.3.8。"
      }
    ],
    pitfalls: [
      "对比定理 1.5.4 与 1.5.6：\n- 常返性判据只需 $\\sum p_{ij} y_j \\le y_i$（非正漂移，防逃逸）；\n- 正常返判据必须 $\\sum p_{ij} y_j \\le y_i - 1$（严格负漂移，保证快速回拉）！"
    ],
    dependencies: ["thm-1-3-8", "thm-1-5-4"],
    unlocks: ["example-1-5-2-c"]
  },
  {
    id: "example-1-5-2-a",
    section: "1.5",
    type: "example",
    title: "判据应用实战 a: 带反射壁随机游走在判据下的极速重判",
    badge: "实战对比",
    tags: ["反射壁", "差分方程求解", "判据实战"],
    summary: "用调和方程与 Foster 判据，两分钟彻底秒杀带反射壁游走的常返性分类！",
    intuitiveAnalogy: "不再需要算恶心的组合数和 Stirling 展开，直接解一个中学生都会的小差分方程，立刻得到常返边界线！",
    mathStatement: `在 $\\mathbb{Z}_+$ 上，0 为反射壁，对 $i \\ge 1$：$p_{i, i+1}=p, p_{i, i-1}=q$。
考察单点挖洞调和方程：$y_i = q y_{i-1} + p y_{i+1} (i \\ge 1)$。
通解为：$y_i = c_1 + c_2 (q/p)^i$。
- 若 $p \\le 1/2$：$q \\ge p$，选 $y_i = i$ 满足 $Py \\le y$ 且 $y_i \\to \\infty$，由定理 1.5.4 **常返**；
- 若 $p > 1/2$：$q < p$，取 $c_1=0, c_2=1$ 得到有界非负解 $y_i = (q/p)^i < 1$，由定理 1.5.2 **非常返**！
**结论**：该游走常返 $\\iff p \\le 1/2$。`,
    blueprint: "求齐次差分方程通解，利用 $q/p$ 的数值范围分别匹配定理 1.5.4 与定理 1.5.2。",
    microProof: [
      {
        step: 1,
        formula: "p r^2 - r + q = 0 \\implies r_1 = 1, \\ r_2 = \\frac{q}{p} \\implies y_i = c_1 + c_2 \\left(\\frac{q}{p}\\right)^i",
        explanation: "二阶常系数差分方程标准通解。",
        why: "特征根法。"
      },
      {
        step: 2,
        formula: "\\text{若 } q < p (p > 1/2): \\text{取 } y_0 = 1, \\ y_i = (q/p)^i \\implies 0 < y_i < 1 \\ (\\forall i \\ge 1)",
        explanation: "公比 $q/p < 1$，解是严格有界且非常数的，完全符合定理 1.5.2，瞬间断定非常返！",
        why: "定理 1.5.2。"
      },
      {
        step: 3,
        formula: "\\text{若 } q \\ge p (p \\le 1/2): \\sum_{j} p_{ij} j = q(i-1) + p(i+1) = i + (p - q) \\le i",
        explanation: "代入简单的线性测试函数 $y_i = i$，漂移项 $p-q \\le 0$，处处满足 $Py \\le y$，且 $y_i = i \\to \\infty$，由定理 1.5.4 瞬间断定常返！",
        why: "定理 1.5.4。"
      }
    ],
    pitfalls: [
      "思考题：若 $p > 1/2$，首次回访累积概率 $f_{00}^*$ 等于多少？答案：$f_{00}^* = \\frac{q}{p} < 1$。"
    ],
    dependencies: ["thm-1-5-2", "thm-1-5-4"],
    unlocks: ["ex-1-5-7"]
  },
  {
    id: "ex-1-5-7",
    section: "1.5",
    type: "exercise",
    title: "习题 1.5.7: 无反射壁 $\\mathbb{Z}_+$ 随机游走的常返与正常返判定",
    badge: "进阶习题",
    tags: ["非反射边界", "平稳分布", "常返分类"],
    summary: "在 0 处不强制全反射（$r_0, p_0 > 0$），整个系统的常返性分类依然与内部漂移完全绑定。",
    intuitiveAnalogy: "哪怕 0 号门口装了一扇半透膜（允许停留在0），只要远处的风向没有变，整个大系统的宏观常返命运就不会改变。",
    mathStatement: `转移矩阵在 0 处满足 $p_{00}=r_0 > 0, p_{01}=p_0 > 0, r_0+p_0=1$；内部仍然 $p_{i, i+1}=p, p_{i, i-1}=q$。证明：
(1) $P$ 是常返的 $\\iff p \\le 1/2$；
(2) $P$ 是正常返的 $\\iff p < 1/2$。`,
    blueprint: "(1)同样应用定理 1.5.4 与 1.5.2；(2)写出平稳方程求解显式解，由级数收敛判定。",
    microProof: [
      {
        step: 1,
        formula: "x_0 = r_0 x_0 + q x_1 \\implies x_1 = \\frac{p_0}{q} x_0",
        explanation: "由平稳分布第 0 列条件：$x_0(1 - r_0) = x_0 p_0 = q x_1$。",
        why: "第 0 列平衡。"
      },
      {
        step: 2,
        formula: "x_n = \\frac{p_0}{q} \\left( \\frac{p}{q} \\right)^{n-1} x_0 \\quad (n \\ge 1)",
        explanation: "内部递推与有反射壁情形完全一致，依然是公比为 $p/q$ 的等比级数！",
        why: "等比数列求通项。"
      },
      {
        step: 3,
        formula: "\\sum_{n=0}^\\infty x_n = x_0 \\left[ 1 + \\frac{p_0}{q} \\sum_{n=1}^\\infty \\left(\\frac{p}{q}\\right)^{n-1} \\right] < \\infty \\iff \\frac{p}{q} < 1 \\iff p < \\frac{1}{2}",
        explanation: "几何级数收敛充要条件是公比小于 1，由定理 1.3.8，存在平稳分布等价于正常返！证毕！",
        why: "定理 1.3.8 判据(4)。"
      }
    ],
    pitfalls: ["边界处的数值变化只影响平稳分布的具体常数因子，不改变级数收敛的临界阈值 $p = 1/2$。"],
    dependencies: ["example-1-5-2-a", "thm-1-3-8"],
    unlocks: ["example-1-5-2-c"]
  },
  {
    id: "example-1-5-2-c",
    section: "1.5",
    type: "example",
    title: "经典实例 8: 离散排队论马氏链 (M/D/1 型) 与服务强度相变",
    badge: "工业级经典",
    tags: ["排队论", "M/D/1", "服务强度", "母函数凸性"],
    summary: "银行排队模型：每分钟只办完 1 个业务，新增顾客服从泊松分布，平均到达率 $\\lambda = \\sum j a_j$ 是主宰生死的唯一参数！",
    intuitiveAnalogy: "柜台只有一个办事员，每分钟只能送走 1 个人。如果每分钟平均涌入的顾客 $\\lambda < 1$，队伍稳定在有限长度（正常返）；若 $\\lambda = 1$，队伍漫无边际地波动但终能清空（零常返）；若 $\\lambda > 1$，涌入速度超过处理能力，队伍必定彻底排到大街上去，永不复原（非常返）！",
    mathStatement: `状态 $X_n$ 表示第 $n$ 时刻排队等待的顾客总数。在单位时间内恰好有 1 名顾客接受完服务离开。
新到达的顾客数分布为 $P\\{\\xi = j\\} = a_j$，定义**服务强度** $\\lambda = E[\\xi] = \\sum_{j \\ge 0} j a_j$。
转移矩阵为：
$$P = \\begin{bmatrix} a_0 & a_1 & a_2 & a_3 & \\dots \\\\ a_0 & a_1 & a_2 & a_3 & \\dots \\\\ 0 & a_0 & a_1 & a_2 & \\dots \\\\ 0 & 0 & a_0 & a_1 & \\dots \\end{bmatrix}$$
**全景相变判决**：
(1) 该链是不可约非周期的；
(2) 若 $\\lambda > 1$，则 $P$ 是**非常返的**；
(3) 若 $0 < \\lambda \\le 1$，则 $P$ 是**常返的**；
(4) 若 $0 < \\lambda < 1$，则 $P$ 是**正常返的**；
(5) 若 $\\lambda = 1$，则 $P$ 是**零常返的**。`,
    blueprint: "利用概率母函数 $f(c) = \\sum a_k c^k$ 的凸性证明 $\\lambda > 1$ 时存在有界解 $y_i = c_0^i$ 应用定理 1.5.2；利用线性测试函数 $y_i = i$ 应用定理 1.5.4 证明常返；利用 $y_i = \\frac{i}{1-\\lambda}$ 应用定理 1.5.6 证明正常返。",
    microProof: [
      {
        step: 1,
        formula: "\\text{【(2) } \\lambda > 1 \\text{ 非常返】设解 } y_i = c^i \\implies c^i = \\sum_{j \\ge i-1} a_{j-i+1} c^j \\implies c = \\sum_{k=0}^\\infty a_k c^k =: f(c)",
        explanation: "寻找指数形式解，将调和方程两边同除以 $c^{i-1}$，化简为极其优美的概率母函数不动点方程 $c = f(c)$！",
        why: "平移不变性与母函数化简。"
      },
      {
        step: 2,
        formula: "f(0) = a_0 > 0, \\quad f(1) = \\sum a_k = 1, \\quad f'(1) = \\sum k a_k = \\lambda > 1, \\quad f''(c) > 0",
        explanation: "因为母函数在 $(0, 1)$ 上严格凸且 $f'(1) > 1$，曲线 $f(c)$ 在 $c=1$ 处的切线斜率大于割线，根据中值定理，必在区间 $(0, 1)$ 内部与对角线 $y=c$ 有且仅有一个互异交点 $c_0 \\in (0, 1)$！",
        why: "严格凸函数图象交点定理。"
      },
      {
        step: 3,
        formula: "y_i = c_0^i \\in (0, 1) \\implies y \\text{ 是有界、非负、非常数解 } \\implies P \\text{ 非常返！}",
        explanation: "底数 $c_0 < 1$，完全满足定理 1.5.2 的所有要求，直接宣布 $\\lambda > 1$ 时排队链非常返！",
        why: "定理 1.5.2。"
      },
      {
        step: 4,
        formula: "\\text{【(3) } 0 < \\lambda \\le 1 \\text{ 常返】取测试函数 } y_i = i \\ (i \\ge 0)",
        explanation: "尝试最简单的线性势能函数。",
        why: "构造 Lyapunov 候选势能。"
      },
      {
        step: 5,
        formula: "\\sum_{j=0}^\\infty p_{ij} y_j = \\sum_{k=0}^\\infty (k + i - 1) a_k = \\lambda + i - 1 \\le 1 + i - 1 = i = y_i \\quad (\\forall i \\ge 1)",
        explanation: "当 $\\lambda \\le 1$ 时，单步平均势能 $\\lambda + i - 1 \\le i = y_i$！满足超调和性且 $y_i = i \\to \\infty$，由定理 1.5.4 判定必常返！",
        why: "定理 1.5.4 充分性。"
      },
      {
        step: 6,
        formula: "\\text{【(4) } 0 < \\lambda < 1 \\text{ 正常返】取测试函数 } y_i = \\frac{i}{1 - \\lambda}",
        explanation: "对线性势能按松弛因子放大。",
        why: "构造 Foster 强负漂移势能。"
      },
      {
        step: 7,
        formula: "\\sum_{j=0}^\\infty p_{ij} y_j = \\frac{\\lambda + i - 1}{1 - \\lambda} = \\frac{i}{1 - \\lambda} - \\frac{1 - \\lambda}{1 - \\lambda} = y_i - 1 \\quad (\\forall i \\ge 1)",
        explanation: "单步漂移精确等于 $-1$！处处满足 $\\sum p_{ij} y_j \\le y_i - 1$！",
        why: "Foster 强漂移条件。"
      },
      {
        step: 8,
        formula: "\\sum_{j=0}^\\infty p_{0j} y_j = \\sum_{j=0}^\\infty a_j \\frac{j}{1 - \\lambda} = \\frac{\\lambda}{1 - \\lambda} < \\infty",
        explanation: "原点边界跳跃和有限，完全符合定理 1.5.6，铁证如山判定正常返！全相变推导圆满完成！",
        why: "定理 1.5.6 充分性。"
      }
    ],
    pitfalls: [
      "请注意当 $\\lambda = 1$ 时：它既常返（由第5步），又不能满足正常返方程（第7步分母不能为0），故必为零常返！这解释了为什么现实中负载率达到 100% 的系统必定产生无限排队等待。"
    ],
    dependencies: ["thm-1-5-2", "thm-1-5-4", "thm-1-5-6"],
    unlocks: ["ex-1-5-8"]
  },
  {
    id: "ex-1-5-8",
    section: "1.5",
    type: "exercise",
    title: "习题 1.5.8: 离散无服务泊松流过程的非常返性证明 (四种绝妙解法)",
    badge: "大展拳脚",
    tags: ["无服务泊松", "上三角矩阵", "多角度证明"],
    summary: "只有顾客进门、没有服务员办事的极端排队：提供调和方程法、首次到达法、级数收敛法、类性质矛盾法四种解法！",
    intuitiveAnalogy: "只进不出的单向旋转门：人越来越多，排队人数只能增加不能减少，系统显然一去不回！讲义展示了如何用四种不同的理论工具严谨证明这一直觉事实。",
    mathStatement: `设转移矩阵为严格上三角带状矩阵：$p_{ij} = a_{j-i} (j \\ge i), p_{ij}=0 (j < i)$，其中 $a_j > 0, \\sum a_j = 1$。
证明该马氏链是非纯可约的非常返链。
（讲义在第73-74页给出四种不同视角的完整证明）。`,
    blueprint: "方法一：构造有界非平凡调和解；方法二：由单向性直接计算首次到达概率 $f_{ji}^*=0$；方法三：自转移级数收敛；方法四：假设常返推导类性质矛盾。",
    microProof: [
      {
        step: 1,
        formula: "\\text{【方法一：调和方程法】取 } y_0 = 2, \\quad y_i = 1 \\ (i \\ge 1)",
        explanation: "对 $i \\ge 1$：$\\sum_{j \\ge i} a_{j-i} y_j = \\sum_{k \\ge 0} a_k \\cdot 1 = 1 = y_i$。该解非负、有界且非常数，由定理 1.5.2 直接判定非常返！",
        why: "定理 1.5.2。"
      },
      {
        step: 2,
        formula: "\\text{【方法二：首次到达法】对任意 } j > i, \\quad p_{ji} = 0 \\implies f_{ji}^* = 0",
        explanation: "因为矩阵是上三角，状态只能变大，绝不可能变小，故从较大状态 $j$ 回到较小状态 $i$ 的概率恒为 0！",
        why: "上三角矩阵单向性。"
      },
      {
        step: 3,
        formula: "f_{ii}^* \\le 1 - p_{ij} < 1 \\implies i \\text{ 是非常返态}",
        explanation: "一旦跳到 $j$，就再也回不来了，首次回访概率严格小于 1，由引理 1.2.5 判定非常返！",
        why: "引理 1.2.5。"
      },
      {
        step: 4,
        formula: "\\text{【方法三：自转移级数法】} p_{ii}^{(n)} = a_0^n \\implies \\sum_{n=1}^\\infty p_{ii}^{(n)} = \\sum_{n=1}^\\infty a_0^n = \\frac{a_0}{1 - a_0} < \\infty",
        explanation: "要留在原地，必须连续 $n$ 步都恰好没有新顾客到来（概率 $a_0^n$）。几何级数收敛，由定理 1.2.1 充要条件判定非常返！",
        why: "定理 1.2.1。"
      },
      {
        step: 5,
        formula: "\\text{【方法四：类性质反证法】若 } i \\text{ 常返，由 } i \\leadsto j \\implies j \\text{ 也常返且 } f_{ji}^* = 1",
        explanation: "由戴雄平定理 1.2.11，常返可达必以概率 1 互通。但这与 $f_{ji}^* = 0$ 产生不可调和的矛盾！故必非常返！",
        why: "定理 1.2.11 与命题 1.2.9。"
      }
    ],
    pitfalls: [
      "四种证明如同从四个维度围剿同一个数学命题，完美展示了本章知识体系的严密闭环与多工具互通！"
    ],
    dependencies: ["thm-1-5-2", "lemma-1-2-5", "thm-1-2-1", "thm-1-2-11"],
    unlocks: []
  }
];
