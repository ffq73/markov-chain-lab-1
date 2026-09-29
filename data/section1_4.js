// Section 1.4: 吸收概率 (pp. 63 - 66)
window.SECTION_1_4 = [
  {
    id: "concept-absorption",
    section: "1.4",
    type: "definition",
    title: "概念: 非常返态集 $S_{tr}$ 与生存调和方程 $x = P_{S_{tr}} x$",
    badge: "逃逸与吸收",
    tags: ["非常返态集", "生存概率", "调和方程", "吸收壁"],
    summary: "粒子在瞬时状态区域内挣扎：要么最终被某个常返类永久捕获（吸收），要么在瞬时区游荡至死。",
    intuitiveAnalogy: "流沙陷阱：$S_{tr}$ 就像流沙区域，周围有几个安全岛（常返类）。你在流沙里挣扎第 $n$ 步还没掉进安全岛的概率是 $x_i^{(n)}$。这个概率随着时间单调递减，极限 $x_i$ 就是你『永生游荡于流沙、永远不被吸收』的悲壮概率。",
    mathStatement: `设 $S_{tr}$ 为全体非常返状态的集合。对 $i \\in S_{tr}$，定义粒子连续 $n$ 步未被任何常返类吸收的**生存概率**：
$$x_i^{(n)} = P\\{X_n \\in S_{tr}, \\dots, X_1 \\in S_{tr} \\mid X_0 = i\\} = \\sum_{j \\in S_{tr}} p_{ij} x_j^{(n-1)} \\quad (n \\ge 1)$$
由于 $0 \\le x_i^{(n)} \\le 1$ 关于 $n$ 单调递减，由 Lebesgue 控制收敛定理，极限 $x_i = \\lim_{n \\to \\infty} x_i^{(n)}$ 存在且满足**齐次调和方程**：
$$x_i = \\sum_{j \\in S_{tr}} p_{ij} x_j \\quad (\\forall i \\in S_{tr}), \\quad \\text{即矩阵形式 } x = P_{S_{tr}} x$$
若该方程的唯一有界非负解为零向量 $x = 0$，则表明从任意非常返态出发，**以概率 1 必定会被某个常返类吸收**！`,
    blueprint: "利用单调有界原理证明极限存在性，代入全概率递推式取极限得到矩阵方程。",
    microProof: [
      {
        step: 1,
        formula: "\\{X_{n+1} \\in S_{tr}, \\dots, X_1 \\in S_{tr}\\} \\subseteq \\{X_n \\in S_{tr}, \\dots, X_1 \\in S_{tr}\\}",
        explanation: "要求多活一步的事件集显然包含在少活一步的事件集内。",
        why: "集合包含关系。"
      },
      {
        step: 2,
        formula: "0 \\le x_i^{(n+1)} \\le x_i^{(n)} \\le 1 \\implies x_i := \\lim_{n \\to \\infty} x_i^{(n)} \\text{ 极限存在且有界}",
        explanation: "实数单调有界定理保证序列点态收敛。",
        why: "单调收敛定理。"
      },
      {
        step: 3,
        formula: "x_i = \\lim_{n \\to \\infty} \\sum_{j \\in S_{tr}} p_{ij} x_j^{(n-1)} = \\sum_{j \\in S_{tr}} p_{ij} \\lim_{n \\to \\infty} x_j^{(n-1)} = \\sum_{j \\in S_{tr}} p_{ij} x_j",
        explanation: "因为项被 1 控制，且 $\\sum p_{ij} \\le 1$，由 Lebesgue 控制收敛定理，极限与求和号对调，矩阵方程得证！",
        why: "Lebesgue 控制收敛定理 (Theorem 0.2.7)。"
      }
    ],
    pitfalls: [
      "若全空间全是非常返态（如三维随机游走 $S_{tr} = \\mathbb{Z}^3$），此时没有任何常返类可供吸收，恒有 $x_i = 1$。"
    ],
    dependencies: ["thm-1-2-10"],
    unlocks: ["ex-p63-harmonic", "concept-recurrent-class-absorption"]
  },
  {
    id: "ex-p63-harmonic",
    section: "1.4",
    type: "exercise",
    title: "习题 (p.63): 调和方程有限可和解必全为零 (反例：3D 随机游走)",
    badge: "分析深度",
    tags: ["控制收敛", "反例", "调和方程零解"],
    summary: "如果未吸收概率在空间中总和有限，那么处处的未吸收概率其实就是绝对的零！",
    intuitiveAnalogy: "若全空间流浪汉的期望总人口是有限的，由于流沙不断耗散，每个单点滞留的流浪汉概率必须完全归零。",
    mathStatement: `设 $x = P_{S_{tr}} x$ 且 $x \\ge 0$。若满足 $\\sum_{i \\in S_{tr}} x_i < \\infty$，证明对所有 $i \\in S_{tr}$ 均有 $x_i = 0$。
（注：反例为 $\\mathbb{Z}^3$ 上的对称随机游走，此时 $S_{tr} = \\mathbb{Z}^3, x_i \\equiv 1$，虽然 $x = P x$，但 $\\sum x_i = \\infty$）。`,
    blueprint: "多次迭代 $x = P_{S_{tr}}^n x$，将通项放缩并由控制收敛定理取极限 $n \\to \\infty$。",
    microProof: [
      {
        step: 1,
        formula: "x_i = \\sum_{j \\in S_{tr}} p_{ij}^{(n)} x_j \\quad (\\forall n \\ge 1)",
        explanation: "将调和方程迭代 $n$ 次，得到 $n$ 步转移核作用。",
        why: "矩阵幂次性质。"
      },
      {
        step: 2,
        formula: "j \\in S_{tr} \\implies \\lim_{n \\to \\infty} p_{ij}^{(n)} = 0 \\quad (\\forall i \\in S)",
        explanation: "由定理 1.2.10，非常返态的转移概率在时间无穷远处必定湮灭为 0！",
        why: "定理 1.2.10。"
      },
      {
        step: 3,
        formula: "p_{ij}^{(n)} x_j \\le x_j \\quad \\text{且 } \\sum_{j \\in S_{tr}} x_j < \\infty",
        explanation: "因为假设了解是绝对可和的，找到了一致可积的控制被积函数！",
        why: "题目假设条件。"
      },
      {
        step: 4,
        formula: "x_i = \\lim_{n \\to \\infty} \\sum_{j \\in S_{tr}} p_{ij}^{(n)} x_j = \\sum_{j \\in S_{tr}} \\left( \\lim_{n \\to \\infty} p_{ij}^{(n)} \\right) x_j = \\sum_{j \\in S_{tr}} 0 \\cdot x_j = 0",
        explanation: "由 Lebesgue 控制收敛定理，极限直接穿透求和号，得出 $x_i = 0$ 对所有 $i$ 成立！证毕！",
        why: "Lebesgue 控制收敛定理。"
      }
    ],
    pitfalls: [
      "请深刻领会为什么 3D 随机游走中 $x_i = 1$ 不会变成 0：因为在 3D 游走中 $\\sum_{j \\in \\mathbb{Z}^3} 1 = \\infty$，条件不满足，控制收敛无法应用！"
    ],
    dependencies: ["concept-absorption", "thm-1-2-10"],
    unlocks: ["concept-recurrent-class-absorption"]
  },
  {
    id: "concept-recurrent-class-absorption",
    section: "1.4",
    type: "definition",
    title: "概念: 吸收进入常返类的概率方程组 $\\pi(C) = \\pi^{(1)}(C) + P_{S_{tr}} \\pi(C)$",
    badge: "第一步分析法",
    tags: ["吸收概率", "第一步分析", "非齐次线性方程组"],
    summary: "利用『第一步全概率分析』建立吸收概率的联立线性方程组，是求解所有撞墙破产问题的通用解法。",
    intuitiveAnalogy: "你身处险境（$i$），想知道掉进安全区 $C$ 的概率有多大？看第一步：要么你运气爆棚一步直接踩进安全区（$\\pi_i^{(1)}$）；要么你一步踩到了其他险境 $j$，然后再从 $j$ 继续计算掉进安全区的概率。所有分支加权求和，列出联立方程！",
    mathStatement: `设 $C$ 为一个常返类。定义从瞬时态 $i \\in S_{tr}$ 出发最终被 $C$ 吸收的**吸收概率**：
$$\\pi_i(C) = P\\{ \\exists n \\ge 1 \\text{ s.t. } X_n \\in C \\mid X_0 = i \\}$$
令 $\\pi_i^{(1)}(C) = \\sum_{j \\in C} p_{ij}$ 为一步直接掉入 $C$ 的概率，则向量 $\\pi(C) = (\\pi_i(C))_{i \\in S_{tr}}$ 满足非齐次线性方程组：
$$\\pi_i(C) = \\pi_i^{(1)}(C) + \\sum_{j \\in S_{tr}} p_{ij} \\pi_j(C) \\quad (\\forall i \\in S_{tr})$$
写为紧凑矩阵形式即：
$$\\pi(C) = \\pi^{(1)}(C) + P_{S_{tr}} \\pi(C)$$`,
    blueprint: "按第一步转移的所有可能去向划分：要么去常返类 $C$，要么留在瞬时态集合 $S_{tr}$，应用全概率公式展开。",
    microProof: [
      {
        step: 1,
        formula: "\\pi_i(C) = \\sum_{n=1}^\\infty \\pi_i^{(n)}(C), \\quad \\text{其中 } \\pi_i^{(n)}(C) = P\\{X_n \\in C, X_k \\notin C (k < n) \\mid X_0 = i\\}",
        explanation: "按『首次进入常返类 $C$ 发生在第 $n$ 步』进行不相交分割。",
        why: "首次击中时间分割。"
      },
      {
        step: 2,
        formula: "\\pi_i^{(1)}(C) = P\\{X_1 \\in C \\mid X_0 = i\\} = \\sum_{j \\in C} p_{ij}",
        explanation: "一步进入的概率等于一步转移到 $C$ 中各状态的概率之和。",
        why: "一步转移定义。"
      },
      {
        step: 3,
        formula: "\\pi_i^{(n)}(C) = \\sum_{j \\in S_{tr}} p_{ij} \\pi_j^{(n-1)}(C) \\quad (\\forall n \\ge 2)",
        explanation: "若第 1 步未进入 $C$，它必然落在某个瞬时态 $j \\in S_{tr}$（因为进入其他常返类就永远出不来了，去 $C$ 概率为 0），由马氏性从 $j$ 还需 $n-1$ 步进入 $C$。",
        why: "马氏性与常返类的封闭性。"
      },
      {
        step: 4,
        formula: "\\pi_i(C) = \\pi_i^{(1)}(C) + \\sum_{n=2}^\\infty \\sum_{j \\in S_{tr}} p_{ij} \\pi_j^{(n-1)}(C) = \\pi_i^{(1)}(C) + \\sum_{j \\in S_{tr}} p_{ij} \\pi_j(C)",
        explanation: "非负级数交换求和号，立刻闭合成关于 $\\pi_i(C)$ 的线性方程组！证毕！",
        why: "Tonelli 定理交换求和号。"
      }
    ],
    pitfalls: [
      "若存在多个不同的常返吸收类 $C_1, C_2, \\dots$，必须分别求解各个类的吸收方程组，各吸收概率之和 $\\sum_k \\pi_i(C_k)$ 加上永久流浪概率等于 1。"
    ],
    dependencies: ["concept-absorption", "concept-trans-matrix"],
    unlocks: ["thm-1-4-2", "ex-1-4-3", "example-gambler-finite"]
  },
  {
    id: "thm-1-4-2",
    section: "1.4",
    type: "theorem",
    title: "定理 1.4.2: 瞬时态到常返类的转移极限分解定理",
    badge: "结构分解",
    tags: ["吸收极限定理", "遍历结合", "Kolmogorov"],
    summary: "从瞬时态 $i$ 走到常返态 $j$ 的长期概率，精确等于『被它所在的常返家族吸收的概率 $\\pi_i(C)$』乘上『$j$ 在该家族内部的稳态份额 $\\pi_j$』！",
    intuitiveAnalogy: "想知道你这个外乡人（$i$）未来长期留在某家茶馆（$j$）的概率？看两步：第一，你有多大几率搬家到这家茶馆所在的繁华城市（吸收概率 $\\pi_i(C)$）；第二，该城市的居民平时泡这家茶馆的平均时间比例（稳态概率 $\\pi_j$）。二者相乘即是全部！",
    mathStatement: `设 $C = C(j)$ 为常返互通类，$i \\in S_{tr}$ 为瞬时态。则：
$$\\lim_{n \\to +\\infty} \\frac{1}{n} \\sum_{m=1}^n p_{ij}^{(m)} = \\pi_i(C) \\cdot \\pi_j = f_{ij}^* \\cdot \\pi_j$$
特别地，若常返类 $C$ 是非周期的，则单步转移极限存在且恒等于：
$$\\lim_{n \\to +\\infty} p_{ij}^{(n)} = \\pi_i(C) \\cdot \\pi_j$$`,
    blueprint: "按首次进入常返类 $C$ 时的入口状态 $k \\in C$ 与时刻 $\\ell$ 进行全概率展开，利用控制收敛与定理 1.3.3 / 命题 1.3.13 证明极限。",
    microProof: [
      {
        step: 1,
        formula: "p_{ij}^{(n)} = \\sum_{k \\in C} \\sum_{\\ell=1}^\\infty \\pi_{ik}^{(\\ell)}(C) p_{kj}^{(n-\\ell)}",
        explanation: "按『在第 $\\ell$ 步从入口 $k \\in C$ 首次破门进入常返类 $C$』展开全概率。",
        why: "破门时刻与入口状态的双重唯一划分。"
      },
      {
        step: 2,
        formula: "\\sum_{\\ell=1}^\\infty \\pi_{ik}^{(\\ell)}(C) = \\pi_{ik}(C), \\quad \\sum_{k \\in C} \\pi_{ik}(C) = \\pi_i(C)",
        explanation: "对进入时刻求和得到从入口 $k$ 进入的概率，再对所有可能入口求和即为总吸收概率。",
        why: "吸收概率的层级分解。"
      },
      {
        step: 3,
        formula: "\\lim_{n \\to \\infty} p_{kj}^{(n-\\ell)} = \\pi_j \\quad (\\text{若 } C \\text{ 非周期})",
        explanation: "因为 $k, j \\in C$ 同属于常返非周期类，由定理 1.3.3，其转移极限与入口 $k$ 无关，恒为 $\\pi_j$！",
        why: "定理 1.3.3。"
      },
      {
        step: 4,
        formula: "\\lim_{n \\to \\infty} p_{ij}^{(n)} = \\sum_{k \\in C} \\pi_{ik}(C) \\pi_j = \\pi_j \\sum_{k \\in C} \\pi_{ik}(C) = \\pi_i(C) \\pi_j",
        explanation: "由控制收敛定理极限穿透求和号，提取公共极限 $\\pi_j$，剩余部分总和正是 $\\pi_i(C)$！非周期情形获证！",
        why: "控制收敛定理 (Theorem 0.2.7)。"
      },
      {
        step: 5,
        formula: "\\text{对周期情形，同样通过 Cesàro 求和平均代入命题 1.3.13 即得平均极限同样为 } \\pi_i(C) \\pi_j",
        explanation: "周期性在 Cesàro 平均下自动抚平，完全一致。",
        why: "命题 1.3.13。"
      }
    ],
    pitfalls: [
      "必须意识到：如果 $i \\notin C$，即使 $C$ 内部是非周期的，极限也不再只由 $j$ 决定，前置系数 $\\pi_i(C)$ 深刻刻画了初始点 $i$ 的偏好程度！"
    ],
    dependencies: ["thm-1-3-3", "prop-1-3-13", "concept-recurrent-class-absorption"],
    unlocks: ["ex-1-4-3"]
  },
  {
    id: "ex-1-4-3",
    section: "1.4",
    type: "exercise",
    title: "习题 1.4.3: 击中单点概率与整类吸收概率的恒等性",
    badge: "精妙等价",
    tags: ["击中概率", "吸收概率", "单点即全类"],
    summary: "只要常返类是正常返的，击中该类中任意单个状态的累积概率，恒等于被该类吸收的总概率！",
    intuitiveAnalogy: "进了这个村，就是这个村的人。只要你被这个大家族捕获了（吸收），在无穷的时光里你必然会把村里的每一个老乡家里都坐一遍（$f_{ij}^* = \\pi_i(C)$）！",
    mathStatement: `设 $C = C(j)$ 是正常返互通类，$i \\in S_{tr}$。证明：
$$f_{ij}^* = \\pi_i(C)$$`,
    blueprint: "对比命题 1.3.13 的极限式 $\\lim \\frac{1}{n} \\sum p_{ij}^{(m)} = f_{ij}^* \\pi_j$ 与定理 1.4.2 的极限式 $\\pi_i(C) \\pi_j$，两边约去 $\\pi_j > 0$ 秒杀！",
    microProof: [
      {
        step: 1,
        formula: "\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{m=1}^n p_{ij}^{(m)} = f_{ij}^* \\pi_j \\quad (\\text{由命题 1.3.13})",
        explanation: "这是用首次到达时间推导出来的普遍时间平均极限。",
        why: "命题 1.3.13。"
      },
      {
        step: 2,
        formula: "\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{m=1}^n p_{ij}^{(m)} = \\pi_i(C) \\pi_j \\quad (\\text{由定理 1.4.2})",
        explanation: "这是用常返类吸收分析推导出来的等价时间平均极限。",
        why: "定理 1.4.2。"
      },
      {
        step: 3,
        formula: "f_{ij}^* \\pi_j = \\pi_i(C) \\pi_j",
        explanation: "同一极限的两种表达式必然完全相等。",
        why: "极限唯一性。"
      },
      {
        step: 4,
        formula: "C \\text{ 正常返 } \\implies \\pi_j = \\frac{1}{m_{jj}} > 0 \\implies f_{ij}^* = \\pi_i(C)",
        explanation: "因为是正常返，平稳概率 $\\pi_j$ 严格大于 0，两端同除以正数 $\\pi_j$，恒等式彻底获证！",
        why: "正数消去律。"
      }
    ],
    pitfalls: [
      "如果类 $C$ 是零常返的，$\\pi_j = 0$，此时 $0 = 0$ 无法约去，结论需要更深入的强马氏性补充。"
    ],
    dependencies: ["thm-1-4-2", "prop-1-3-13"],
    unlocks: ["sec-1-5-criteria"]
  },
  {
    id: "example-gambler-finite",
    section: "1.4",
    type: "example",
    title: "经典实例 6: 有限状态赌徒破产问题差分方程完全解",
    badge: "经典不朽",
    tags: ["赌徒破产", "二阶差分方程", "特征方程", "吸收概率"],
    summary: "手握筹码在两个悬崖之间走钢丝：两端吸收壁差分方程的特征根完全显式解！",
    intuitiveAnalogy: "赌徒初始资本 $i$ 元，目标赢到 $n$ 元离场，输到 0 元破产。每轮赢率 $p$、输率 $q$。用常系数差分方程把中间所有转移链条联立，算出破产概率的闭式解。",
    mathStatement: `状态空间 $S = \\{0, 1, \\dots, n\\}$，其中 $0$ 和 $n$ 为吸收壁（常返类），$S_{tr} = \\{1, \\dots, n-1\\}$。
设破产概率 $u_i = \\pi_i(\\{0\\})$ 满足第二阶差分方程：
$$u_i = q u_{i-1} + p u_{i+1} \\quad (1 \\le i \\le n-1), \\quad u_0 = 1, \\ u_n = 0$$
**通解公式**：
$$u_i = \\begin{cases} \\frac{(q/p)^n - (q/p)^i}{(q/p)^n - 1} & \\text{若 } p \\ne q \\\\ 1 - \\frac{i}{n} & \\text{若 } p = q = \\frac{1}{2} \\end{cases}$$
赢得全部本金离场的概率为 $v_i = \\pi_i(\\{n\\}) = 1 - u_i$。`,
    blueprint: "利用第一步全概率法列出差分方程，通过特征多项式求通解，代入边界条件 $u_0=1, u_n=0$ 确定待定系数。",
    microProof: [
      {
        step: 1,
        formula: "u_i = P(X_1=i+1 \\mid X_0=i) u_{i+1} + P(X_1=i-1 \\mid X_0=i) u_{i-1} = p u_{i+1} + q u_{i-1}",
        explanation: "由第一步分析法，第 1 步若赢（概率 $p$），本金变 $i+1$，此后破产概率为 $u_{i+1}$；若输（概率 $q$），本金变 $i-1$，破产概率为 $u_{i-1}$。",
        why: "全概率公式。"
      },
      {
        step: 2,
        formula: "p u_{i+1} - u_i + q u_{i-1} = 0, \\quad \\text{特征方程: } p r^2 - r + q = 0",
        explanation: "因 $p+q=1$，特征方程因式分解：$(pr - q)(r - 1) = 0$。",
        why: "差分方程特征根法。"
      },
      {
        step: 3,
        formula: "r_1 = 1, \\quad r_2 = \\frac{q}{p}",
        explanation: "当 $p \\ne q$ 时有两个互异实根 1 和 $q/p$；当 $p = q = 1/2$ 时有重根 1。",
        why: "求根公式。"
      },
      {
        step: 4,
        formula: "\\text{若 } p \\ne q: u_i = c_1 \\cdot 1^i + c_2 \\left( \\frac{q}{p} \\right)^i = c_1 + c_2 \\left( \\frac{q}{p} \\right)^i",
        explanation: "互异特征根对应的差分方程齐次通解形式。",
        why: "线性齐次差分方程通解定理。"
      },
      {
        step: 5,
        formula: "\\begin{cases} u_0 = c_1 + c_2 = 1 \\\\ u_n = c_1 + c_2 (q/p)^n = 0 \\end{cases} \\implies c_2 = \\frac{-1}{(q/p)^n - 1}, \\quad c_1 = \\frac{(q/p)^n}{(q/p)^n - 1}",
        explanation: "代入两端边界条件：在 0 处已破产（$u_0=1$），在 $n$ 处已胜出离场无需破产（$u_n=0$）。",
        why: "代数二元一次方程组求解。"
      },
      {
        step: 6,
        formula: "u_i = \\frac{(q/p)^n - (q/p)^i}{(q/p)^n - 1}, \\quad \\text{非对称公式得证！}",
        explanation: "代入系数整理即得！",
        why: "代数化简。"
      },
      {
        step: 7,
        formula: "\\text{若 } p = q = 1/2: u_i = c_1 + c_2 i \\implies u_0 = c_1 = 1, \\ u_n = 1 + c_2 n = 0 \\implies c_2 = -\\frac{1}{n} \\implies u_i = 1 - \\frac{i}{n}",
        explanation: "重根情形通解带线性因子 $i$，代入边界即得完美的斜线分布！证毕！",
        why: "重根通解与待定系数求解。"
      }
    ],
    pitfalls: [
      "注意到 $u_i + v_i = 1$！这说明粒子绝对不会在中间区域永无休止地转下去，最终被两端吸收的概率之和恰恰是 100%！"
    ],
    dependencies: ["concept-recurrent-class-absorption"],
    unlocks: ["example-gambler-infinite"]
  },
  {
    id: "example-gambler-infinite",
    section: "1.4",
    type: "example",
    title: "经典实例 7: 无限对手赌徒破产模型与资金安全红线",
    badge: "警世名理",
    tags: ["无限对手", "必破产定理", "安全对数红线"],
    summary: "和无限财富的对手赌博：哪怕规则完全公平，你也注定以 100% 的概率破产！",
    intuitiveAnalogy: "普通散户跟拥有无限筹码的做市商单挑：做市商输得起无穷多轮，而散户只要中间有一瞬间运气不济资金归零，就会立即离场被吸收。因此在公平与劣势规则下，最终破产概率恒为 1！",
    mathStatement: `设赌徒在 $S = \\mathbb{Z}_+$ 玩游戏，状态 0 为破产吸收态，对手拥有无限财富（无右边界 $n$）：
$$u_i = \\begin{cases} 1 & \\text{若 } q \\ge p \\ (\\text{即 } q \\ge 1/2) \\\\ \\left( \\frac{q}{p} \\right)^i & \\text{若 } q < p \\ (\\text{即 } p > 1/2) \\end{cases}$$
在占优赌局 $p > 1/2$ 中，若赌徒希望自己的破产风险控制在 $1/2$ 以下（$u_i < 1/2$），其初始本金必须跨过**安全红线**：
$$i > \\frac{\\ln 2}{\\ln p - \\ln q}$$`,
    blueprint: "令有限赌徒公式中的右边界 $n \\to \\infty$，利用有界解与 $u_0=1$ 的极限性质完成定解。",
    microProof: [
      {
        step: 1,
        formula: "\\text{若 } q > p \\implies \\frac{q}{p} > 1 \\implies \\lim_{n \\to \\infty} \\left(\\frac{q}{p}\\right)^n = \\infty",
        explanation: "公比大于 1 时，指数发散到无穷大。",
        why: "实数极限。"
      },
      {
        step: 2,
        formula: "u_i = \\lim_{n \\to \\infty} \\frac{(q/p)^n - (q/p)^i}{(q/p)^n - 1} = \\lim_{n \\to \\infty} \\frac{1 - (q/p)^{i-n}}{1 - (q/p)^{-n}} = \\frac{1 - 0}{1 - 0} = 1",
        explanation: "分子分母同时除以 $(q/p)^n$，极限精确等于 1！必破产！",
        why: "抓大头求极限。"
      },
      {
        step: 3,
        formula: "\\text{若 } p = q = 1/2 \\implies u_i = \\lim_{n \\to \\infty} \\left( 1 - \\frac{i}{n} \\right) = 1 - 0 = 1",
        explanation: "哪怕是完全公平的赌博，由于 $n \\to \\infty$，破产概率依然铁定为 1！",
        why: "初等数项极限。"
      },
      {
        step: 4,
        formula: "\\text{若 } q < p \\implies \\frac{q}{p} < 1 \\implies \\lim_{n \\to \\infty} \\left(\\frac{q}{p}\\right)^n = 0 \\implies u_i = \\frac{0 - (q/p)^i}{0 - 1} = \\left(\\frac{q}{p}\\right)^i",
        explanation: "当赌徒有明确优势时，破产概率以指数形式 $(q/p)^i < 1$ 随本金增加而迅速衰减！",
        why: "代数化简。"
      },
      {
        step: 5,
        formula: "u_i = \\left( \\frac{q}{p} \\right)^i < \\frac{1}{2} \\iff i \\ln\\left(\\frac{q}{p}\\right) < -\\ln 2 \\iff i > \\frac{\\ln 2}{\\ln p - \\ln q}",
        explanation: "两边取自然对数，由于 $\\ln(q/p) = \\ln q - \\ln p < 0$，不等号方向调转，得到本金安全阈值！证毕！",
        why: "对数不等式求解。"
      }
    ],
    pitfalls: [
      "很多人以为『公平赌局两不相欠』，但『期望净收益为零』并不阻止『几乎必然破产』！这是因为边界具有不对称的吸收性。"
    ],
    dependencies: ["example-gambler-finite"],
    unlocks: ["sec-1-5-criteria"]
  }
];
