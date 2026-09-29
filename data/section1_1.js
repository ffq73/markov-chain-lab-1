// Section 1.1: 基础概念、C-K方程、互通与周期性 (pp. 35 - 40)
window.SECTION_1_1 = [
  {
    id: "def-1-1-1",
    section: "1.1",
    type: "definition",
    title: "定义 1.1.1: 离散时间马尔科夫链 (Markov Chain)",
    badge: "核心定义",
    tags: ["马氏性", "无记忆性", "条件概率"],
    summary: "未来只取决于当下，与过去走过的路径条件独立。",
    intuitiveAnalogy: "就像玩掷骰子跳格子游戏：你下一步能跳到哪里、概率是多少，完全取决于你『当前站在哪一格』，跟你之前是怎么绕过来的没有半点关系。过去的历史被浓缩在了当前的状态中。",
    mathStatement: `设 $(\\Omega, \\mathcal{F}, P)$ 为概率空间，$S$ 为有限或可数状态空间。离散时间随机过程 $X = (X_n: \\Omega \\to S \\mid n = 0, 1, 2, \\dots)$ 称为**马尔科夫链 (Markov Chain)**，若对任意时刻 $0 \\le n_1 < n_2 < \\dots < n_k < n$ 及任意状态 $i_1, \\dots, i_k, j \\in S$，只要条件概率有意义（即 $P(X_{n_1}=i_1, \\dots, X_{n_k}=i_k) > 0$），均满足：
$$P\\{X_n = j \\mid X_{n_1} = i_1, \\dots, X_{n_k} = i_k\\} = P\\{X_n = j \\mid X_{n_k} = i_k\\}$$`,
    blueprint: "将复杂的历史条件概率简化为仅由最近时刻状态决定的单点条件概率。",
    microProof: [
      {
        step: 1,
        formula: "P\\{X_n = j \\mid X_0 = i_0, X_1 = i_1, \\dots, X_{n-1} = i_{n-1}\\} = P\\{X_n = j \\mid X_{n-1} = i_{n-1}\\}",
        explanation: "这是马氏性质的标准形式（当下取 $n-1$，未来取 $n$）。",
        why: "定义直接规定：给定全部过去信息时，除了最近的当下 $X_{n-1}$ 之外，其余更早的历史信息在预测下一步时都是多余的。"
      }
    ],
    pitfalls: [
      "马氏链的『无记忆性』不等于随机变量之间相互独立！$X_n$ 与 $X_{n-1}$ 显然强相关，只是给定 $X_{n-1}$ 后，$X_n$ 不再依赖 $X_{n-2}, \\dots, X_0$。",
      "状态空间 $S$ 赋离散拓扑，意味着单个状态集合 $\{s\}$ 都是可测的，单点事件测度有定义。"
    ],
    dependencies: [],
    unlocks: ["ex-1-p35", "concept-trans-matrix", "ex-1-1-3"]
  },
  {
    id: "ex-1-p35",
    section: "1.1",
    type: "exercise",
    title: "习题 (p.35): 多步未来马氏性",
    badge: "基础习题",
    tags: ["马氏性扩展", "联合分布"],
    summary: "不仅一步未来由当下决定，整个未来的有限步轨迹作为一个整体，也仅由当下决定。",
    intuitiveAnalogy: "如果你想预测接下来连续5天每天的天气序列，在已知『今天天气』的情况下，查阅『前天、大前天的天气预报』对预测这一串未来没有任何额外帮助。",
    mathStatement: `若 $X$ 是马尔科夫链，证明对任意 $0 \\le n_1 < \\dots < n_k < n$ 及 $m \\ge 1$：
$$P\\{X_n = j, X_{n+1} = j_1, \\dots, X_{n+m} = j_m \\mid X_{n_1} = i_1, \\dots, X_{n_k} = i_k\\} = P\\{X_n = j, X_{n+1} = j_1, \\dots, X_{n+m} = j_m \\mid X_{n_k} = i_k\\}$$`,
    blueprint: "利用条件概率的乘法公式，将联合未来分解为从当下一路向前的一步转移之积，再逐级应用马氏性消去旧历史。",
    microProof: [
      {
        step: 1,
        formula: "P(A_n \\cap A_{n+1} \\cap \\dots \\cap A_{n+m} \\mid H_k) = P(A_n \\mid H_k) \\cdot P(A_{n+1} \\mid H_k \\cap A_n) \\cdots P(A_{n+m} \\mid H_k \\cap A_n \\cap \\dots \\cap A_{n+m-1})",
        explanation: "利用概率链式法则（乘法公式）展开分子条件概率，记 $H_k = \\{X_{n_1}=i_1, \\dots, X_{n_k}=i_k\\}$ 为过去历史，记 $A_r = \\{X_r = j_r\\}$ 为未来事件。",
        why: "初等概率恒等式：$P(E_1 \\dots E_p \\mid C) = P(E_1 \\mid C)P(E_2 \\mid C E_1)\\dots P(E_p \\mid C E_1 \\dots E_{p-1})$。"
      },
      {
        step: 2,
        formula: "P(A_{n+r} \\mid H_k \\cap A_n \\cap \\dots \\cap A_{n+r-1}) = P(A_{n+r} \\mid A_{n+r-1})",
        explanation: "对乘积中的每一项应用马氏性，由于条件中包含最靠近 $n+r$ 的时刻 $n+r-1$ 的状态，所有更早的时刻（包括 $H_k$）全部被抹去！",
        why: "马氏链定义 1.1.1：时间点序列递增时，条件概率只取决于条件集中最晚时刻的状态。"
      },
      {
        step: 3,
        formula: "P(A_n \\dots A_{n+m} \\mid H_k) = P(A_n \\mid X_{n_k}=i_k) \\cdot \\prod_{r=1}^m P(A_{n+r} \\mid A_{n+r-1}) = P(A_n \\dots A_{n+m} \\mid X_{n_k}=i_k)",
        explanation: "右端式子只含有 $X_{n_k}=i_k$ 与未来状态转移，与 $H_k$ 中 $n_k$ 之前的历史全然无关，合并还原即得结论。",
        why: "两端对相同的因子链重新用乘法公式打包，左边条件只剩 $X_{n_k}=i_k$。"
      }
    ],
    pitfalls: [
      "展开乘积项时注意每个因子中『条件集的最晚时刻』是哪一个，避免未对齐时刻就随意抹去历史。"
    ],
    dependencies: ["def-1-1-1"],
    unlocks: ["ex-1-1-3"]
  },
  {
    id: "concept-trans-matrix",
    section: "1.1",
    type: "definition",
    title: "定义: 转移概率矩阵与 Chapman-Kolmogorov 方程",
    badge: "核心工具",
    tags: ["转移矩阵", "C-K方程", "齐次性"],
    summary: "用矩阵乘法精准刻画随机过程在空间上的流动演变。",
    intuitiveAnalogy: "如果把状态想象成城市，转移矩阵就是城市间的客流比例表。今天从A市到B市的比例乘明天从B市到C市的比例，穷举中间所有经转城市加起来，就是两天后从A到C的总客流比例——这就是矩阵乘法的精髓！",
    mathStatement: `设 $P(X_n=i) > 0$，定义一步转移概率：
$$p_{ij}^{(n, +1)} = P\\{X_{n+1} = j \\mid X_n = i\\}$$
其构成的矩阵 $P^{(n,+1)} = [p_{ij}^{(n,+1)}]_{S \\times S}$ 称为**马氏矩阵 (Markov Matrix)**，满足非负性 $p_{ij} \\ge 0$ 及行和为 1：$\\sum_{j \\in S} p_{ij} = 1$。
若转移概率与当前时间 $n$ 无关，称过程为**时间齐次 (time-homogeneous)**，记 $P = [p_{ij}]$，则 $\\ell$ 步转移矩阵满足 **Chapman-Kolmogorov 方程**：
$$P^{(\\ell)} = P^\\ell, \\quad P^{(m+n)} = P^m P^n, \\quad \\text{即 } p_{ij}^{(m+n)} = \\sum_{k \\in S} p_{ik}^{(m)} p_{kj}^{(n)}$$`,
    blueprint: "利用全概率公式在中间时刻 $m$ 插入切片状态，求和即对应矩阵的乘法规则。",
    microProof: [
      {
        step: 1,
        formula: "p_{ij}^{(m+n)} = P\\{X_{m+n} = j \\mid X_0 = i\\} = \\sum_{k \\in S} P\\{X_{m+n} = j, X_m = k \\mid X_0 = i\\}",
        explanation: "按中间时刻 $m$ 的所有可能状态 $k \\in S$ 构成样本空间的分割，利用全概率公式展开。",
        why: "事件分解：$\\{X_{m+n}=j\\} = \\bigcup_{k \\in S} (\\{X_{m+n}=j\\} \\cap \\{X_m=k\\})$，且互不相交。"
      },
      {
        step: 2,
        formula: "= \\sum_{k \\in S} P\\{X_m = k \\mid X_0 = i\\} \\cdot P\\{X_{m+n} = j \\mid X_m = k, X_0 = i\\}",
        explanation: "条件概率乘法公式：$P(A \\cap B \\mid C) = P(B \\mid C) P(A \\mid B \\cap C)$。",
        why: "恒等变形，为应用马氏性质作准备。"
      },
      {
        step: 3,
        formula: "= \\sum_{k \\in S} p_{ik}^{(m)} \\cdot P\\{X_{m+n} = j \\mid X_m = k\\} = \\sum_{k \\in S} p_{ik}^{(m)} p_{kj}^{(n)} = (P^m P^n)_{ij}",
        explanation: "利用马氏性消去 $X_0=i$，再利用时间齐次性，$m$ 到 $m+n$ 的转移等同于 $0$ 到 $n$ 的转移，正是矩阵乘法的行乘列定义！",
        why: "齐次性保证了转移概率只依赖时间差 $n$。"
      }
    ],
    pitfalls: [
      "若状态空间 $S$ 是无穷的，级数 $\\sum_{k \\in S} p_{ik}^{(m)} p_{kj}^{(n)}$ 是否绝对收敛？是的！因为各项非负且小于等于1，部分和单调有界，收敛性天然保证。"
    ],
    dependencies: ["def-1-1-1"],
    unlocks: ["ex-a-iid", "example-b-rw", "concept-communication"]
  },
  {
    id: "ex-a-iid",
    section: "1.1",
    type: "example",
    title: "例子 1.1.2-A: 由独立同分布变量生成的马氏链",
    badge: "经典模型",
    tags: ["i.i.d.", "求和过程", "Toeplitz矩阵"],
    summary: "包含两个极端典型：纯独立采样（行完全相同）与累加和过程（上三角带状）。",
    intuitiveAnalogy: "(i) 每秒抛一枚硬币看朝向：无论刚才出正面还是反面，下一秒正面的概率永远是相同的一行数据；(ii) 存钱罐：今天罐里的钱 = 昨天的钱 + 今天投的零钱，因此矩阵转移只取决于『差值』，形成沿着对角线平移的阶梯。",
    mathStatement: `设 $\\xi$ 是 $\\mathbb{Z}_+$ 上的随机变量，$P\\{\\xi = i\\} = a_i, a_i \\ge 0, \\sum a_i = 1$。$\\xi_1, \\xi_2, \\dots$ 为独立样本。
(i) 定义 $X_0 = \\xi, X_n = \\xi_n (n \\ge 1)$，则 $X$ 是马氏链，转移矩阵各行相同：
$$P = \\begin{bmatrix} a_0 & a_1 & a_2 & \\dots \\\\ a_0 & a_1 & a_2 & \\dots \\\\ a_0 & a_1 & a_2 & \\dots \\end{bmatrix}$$
(ii) 定义 $\\eta_0 = 0, \\eta_n = \\sum_{k=1}^n \\xi_k (n \\ge 1)$，则 $\\eta$ 是马氏链，转移概率 $p_{ij} = a_{j-i} (j \\ge i)$，其余为 0。`,
    blueprint: "对(i)利用独立性直接验证条件等于边缘分布；对(ii)利用独立增量将条件化简为差值概率。",
    microProof: [
      {
        step: 1,
        formula: "P(X_n = j \\mid X_{n-1} = i, \\dots, X_0 = i_0) = P(\\xi_n = j \\mid \\dots) = P(\\xi_n = j) = a_j",
        explanation: "(i)中 $X_n = \\xi_n$ 与过去的所有 $\\xi_k (k < n)$ 相互独立，所以条件直接褪去，恒等于 $a_j$。",
        why: "独立随机变量的条件概率等于无条件概率。"
      },
      {
        step: 2,
        formula: "P(\\eta_{n+1} = j \\mid \\eta_n = i) = P(\\eta_n + \\xi_{n+1} = j \\mid \\eta_n = i) = P(\\xi_{n+1} = j - i \\mid \\eta_n = i)",
        explanation: "在已知 $\\eta_n = i$ 的条件下，将 $\\eta_n$ 替换为数值 $i$。",
        why: "条件变量代换性质。"
      },
      {
        step: 3,
        formula: "= P(\\xi_{n+1} = j - i) = \\begin{cases} a_{j-i} & j \\ge i \\\\ 0 & j < i \\end{cases}",
        explanation: "由于 $\\xi_{n+1}$ 独立于 $\\eta_n = \\xi_1 + \\dots + \\xi_n$，条件再次抹去，得到上三角矩阵。",
        why: "增量非负，不可能转移到更小的状态 $j < i$。"
      }
    ],
    pitfalls: [
      "注意 (i) 的马氏性是一种平凡的退化情况，它反映了完全独立序列当然也是马氏链。"
    ],
    dependencies: ["concept-trans-matrix"],
    unlocks: ["ex-1-1-1"]
  },
  {
    id: "ex-1-1-1",
    section: "1.1",
    type: "exercise",
    title: "习题 1.1.1: $\\mathbb{Z}$ 上的独立增量过程",
    badge: "基础习题",
    tags: ["双向游走", "Toeplitz矩阵"],
    summary: "将和过程的状态空间推广到全体整数 $\\mathbb{Z}$，允许左右双向游动。",
    intuitiveAnalogy: "存钱罐现在允许透支欠债，状态可以变成负数，转移矩阵向左右两个方向无穷延伸。",
    mathStatement: `设 $\\xi \\in \\mathbb{Z}$ 且 $P\\{\\xi = i\\} = a_i, a_i > 0, \\sum_{i \\in \\mathbb{Z}} a_i = 1$。分析和过程 $\\eta_n = \\sum_{k=1}^n \\xi_k$ 的转移矩阵。`,
    blueprint: "转移矩阵由单向半无穷变成双向无穷 Toeplitz 矩阵，$p_{ij} = a_{j-i}$ 对所有 $i, j \\in \\mathbb{Z}$ 均成立。",
    microProof: [
      {
        step: 1,
        formula: "p_{ij} = P\\{\\eta_{n+1}=j \\mid \\eta_n=i\\} = P\\{\\xi_{n+1} = j - i\\} = a_{j-i}",
        explanation: "由于 $\\xi$ 在全整数集上取值，$j-i$ 可以为负数，因此 $p_{ij}$ 对任何 $i, j \\in \\mathbb{Z}$ 均有定义且等于 $a_{j-i}$。",
        why: "每一步的位移分布在全空间一致平移。"
      }
    ],
    pitfalls: ["双向无穷矩阵不再是上三角，可向上也可向下转移。"],
    dependencies: ["ex-a-iid"],
    unlocks: ["example-b-rw"]
  },
  {
    id: "example-b-rw",
    section: "1.1",
    type: "example",
    title: "例子 1.1.2-B: 一维随机游走与赌徒破产模型",
    badge: "经典模型",
    tags: ["随机游走", "赌徒破产", "吸收壁"],
    summary: "物理与概率论最经典的基石模型：相邻移动与边界吸收。",
    intuitiveAnalogy: "赌徒手握 $k$ 元钱跟赌场玩游戏，赢了+1元，输了-1元。如果资金降到0元就被赌场扫地出门（吸收壁），再也无法翻身；如果赢率 $p \\le q$，无论初始资金多少，长远看注定倾家荡产！",
    mathStatement: `一维随机游走状态在 $\\mathbb{Z}_+$，每一步只在相邻状态转移：$p_{i, i-1} + p_{i, i} + p_{i, i+1} = 1$。
转移矩阵为三对角形式：
$$P = \\begin{bmatrix} r_0 & p_0 & 0 & 0 & \\dots \\\\ q_1 & r_1 & p_1 & 0 & \\dots \\\\ 0 & q_2 & r_2 & p_2 & \\dots \\end{bmatrix}$$
若 $r_0=1$（状态0为吸收态），且对 $k \\ge 1, p_k=p, q_k=q=1-p$：
(i) 当 $p > q$ 时，初始本金为 $x_0$ 的赌徒最终破产概率为 $(q/p)^{x_0} < 1$，有正概率财富无限增长；
(ii) 当 $p \\le q$ 时，破产概率恒为 $1$。`,
    blueprint: "写出递推差分方程，利用特征方程求解破产概率，在第1.4节中将给出严格的极限与吸收解法。",
    microProof: [
      {
        step: 1,
        formula: "p_{i, j} = 0 \\quad (\\forall |i - j| > 1)",
        explanation: "一步之内质点最多只能移动到相邻位置，不允许跳格。",
        why: "模型物理定义的限制。"
      },
      {
        step: 2,
        formula: "p_{00} = r_0 = 1 \\implies p_{0j} = 0 (\\forall j \\ne 0)",
        explanation: "一旦进入状态0（本金归零），此后永远停留在0，称为吸收壁 (Absorbing Barrier)。",
        why: "行和为1的约束使得从0转移出去的概率全为0。"
      }
    ],
    pitfalls: [
      "公平赌局 $p=q=1/2$ 虽然没有任何劣势，但面对无限本金的赌场依然必定破产！这是随机游走在零常返下的必然宿命。"
    ],
    dependencies: ["concept-trans-matrix"],
    unlocks: ["concept-communication", "sec-1-4-gambler"]
  },
  {
    id: "concept-communication",
    section: "1.1",
    type: "definition",
    title: "定义: 状态的可达 (Accessibility)、互通 (Communication) 与等价类",
    badge: "核心概念",
    tags: ["可达", "互通", "等价关系", "不可约"],
    summary: "用通路的联通性对状态空间做拓扑划分，将复杂大系统切分为独立子系统。",
    intuitiveAnalogy: "若城市A有路能开到B，叫A可达B；如果B也能开回A，就叫双向互通。所有相互能来回通达的城市圈成一个『朋友圈』（等价类）。如果整个世界只有一个朋友圈，说明路网完全联通，叫『不可约』。",
    mathStatement: `1. **可达 ($i \\leadsto j$)**：若存在整数 $n \\ge 0$ 使得 $p_{ij}^{(n)} > 0$。
2. **互通 ($i \\leftrightsquigarrow j$)**：若 $i \\leadsto j$ 且 $j \\leadsto i$。互通是等价关系：
   - 自反性：$i \\leftrightsquigarrow i$（取 $n=0, p_{ii}^{(0)} = 1 > 0$）；
   - 对称性：$i \\leftrightsquigarrow j \\implies j \\leftrightsquigarrow i$；
   - 传递性：$i \\leftrightsquigarrow j, j \\leftrightsquigarrow k \\implies i \\leftrightsquigarrow k$（由 C-K 方程 $p_{ik}^{(n+m)} \\ge p_{ij}^{(n)} p_{jk}^{(m)} > 0$）。
3. **等价类 $C(i)$**：所有与 $i$ 互通的状态集合。若只有一个等价类（$S = C(i)$），称马氏链是**不可约的 (Irreducible)**。`,
    blueprint: "利用 C-K 方程证明传递性，利用等价关系分解全集。",
    microProof: [
      {
        step: 1,
        formula: "p_{ik}^{(n+m)} = \\sum_{r \\in S} p_{ir}^{(n)} p_{rk}^{(m)} \\ge p_{ij}^{(n)} p_{jk}^{(m)}",
        explanation: "由于每一项非负，全求和必然大于等于其中某一项（取中间状态 $r=j$）。",
        why: "非负项求和的平凡放缩。"
      },
      {
        step: 2,
        formula: "p_{ij}^{(n)} > 0 \\text{ 且 } p_{jk}^{(m)} > 0 \\implies p_{ik}^{(n+m)} > 0 \\implies i \\leadsto k",
        explanation: "两正数相乘仍为正，从而在 $n+m$ 步内可达，传递性得证！",
        why: "完成了互通关系是等价关系的证明。"
      }
    ],
    pitfalls: [
      "注意可以从类 $C(i)$ 走向类 $C(k)$，但若能走出来，就绝对不可能再从 $C(k)$ 走回 $C(i)$！否则两者必互通，合并为一个大类。"
    ],
    dependencies: ["concept-trans-matrix"],
    unlocks: ["ex-1-1-2", "ex-1-1-4", "def-period"]
  },
  {
    id: "ex-1-1-2",
    section: "1.1",
    type: "exercise",
    title: "习题 1.1.2: 互通状态的往返通路联合概率严格大于零",
    badge: "基础习题",
    tags: ["互通", "联合概率", "乘法公式"],
    summary: "两状态互通意味着不仅各自步数存在，而且可以一次性观测到完整回路。",
    intuitiveAnalogy: "从家去公司有车，从公司回家也有车，那么『今天从家出发到公司、下班又准时回到家』这一完整行程发生的概率一定是正数。",
    mathStatement: `若不同状态 $i, j$ 互通 ($i \\leftrightsquigarrow j$)，证明存在 $n, m > 0$ 使得：
$$P\\{X_0 = i, X_n = j, X_{n+m} = i\\} > 0$$`,
    blueprint: "使用乘法公式分解为初始概率、前向转移与返回转移的乘积。",
    microProof: [
      {
        step: 1,
        formula: "P(X_0 = i, X_n = j, X_{n+m} = i) = P(X_0 = i) \\cdot P(X_n = j \\mid X_0 = i) \\cdot P(X_{n+m} = i \\mid X_0 = i, X_n = j)",
        explanation: "三事件交集概率公式：$P(ABC) = P(A) P(B \\mid A) P(C \\mid AB)$。",
        why: "概率论基础展开。"
      },
      {
        step: 2,
        formula: "= p_i \\cdot p_{ij}^{(n)} \\cdot P(X_{n+m} = i \\mid X_n = j) = p_i \\cdot p_{ij}^{(n)} \\cdot p_{ji}^{(m)}",
        explanation: "由马氏性，$X_{n+m}$ 在给定 $X_n=j$ 和 $X_0=i$ 时只取决于 $X_n=j$；再由时间齐次性即为 $p_{ji}^{(m)}$。",
        why: "马氏性消除历史依赖。"
      },
      {
        step: 3,
        formula: "p_i > 0, \\quad p_{ij}^{(n)} > 0, \\quad p_{ji}^{(m)} > 0 \\implies P(X_0=i, X_n=j, X_{n+m}=i) > 0",
        explanation: "因为 $i \\leftrightsquigarrow j$，必存在正概率转移步数 $n, m$，三正数相乘必大于0。",
        why: "完成证明。"
      }
    ],
    pitfalls: ["前提需要初始分布对状态 $i$ 赋予正概率 $P(X_0=i) > 0$。"],
    dependencies: ["concept-communication"],
    unlocks: ["concept-recurrence"]
  },
  {
    id: "ex-1-1-3",
    section: "1.1",
    type: "exercise",
    title: "习题 1.1.3: 马氏链的条件独立性 (Conditional Independence)",
    badge: "核心理论",
    tags: ["条件独立", "对称性", "过去与未来"],
    summary: "在已知当下的条件下，『历史』与『未来』相互独立，体现了马氏性的本质几何对称性。",
    intuitiveAnalogy: "两道门：你目前被锁在门厅（当下）。前门里走过的迷宫（过去）和后门将要面对的花园（未来），在门厅这个中转站被物理隔断，彼此不再能隔空产生感应。",
    mathStatement: `设 $m \\ge 1$。对任意过去事件 $A \\in \\sigma(X_l \\mid l < m)$ 及未来事件 $B \\in \\sigma(X_l \\mid l > m)$，均有：
$$P\\{A \\cap B \\mid X_m = i\\} = P\\{A \\mid X_m = i\\} \\cdot P\\{B \\mid X_m = i\\}$$`,
    blueprint: "利用 $\\pi-\\lambda$ 定理，先在圆柱集上验证，通过条件期望的平滑性质消去历史项。",
    microProof: [
      {
        step: 1,
        formula: "P(A \\cap B \\mid X_m = i) = \\frac{P(A \\cap \\{X_m = i\\} \\cap B)}{P(X_m = i)} = \\frac{P(B \\mid A \\cap \\{X_m = i\\}) P(A \\cap \\{X_m = i\\})}{P(X_m = i)}",
        explanation: "利用条件概率的初等定义式展开。",
        why: "定义 $P(E \\mid F) = P(EF)/P(F)$。"
      },
      {
        step: 2,
        formula: "P(B \\mid A \\cap \\{X_m = i\\}) = P(B \\mid X_m = i)",
        explanation: "这正是习题 (p.35) 证明的多步未来马氏性：只要条件集包含当前时刻 $m$，所有比 $m$ 早的事件 $A$ 对未来 $B$ 均无影响！",
        why: "直接调用习题 1 (p.35) 的多步马氏性结论。"
      },
      {
        step: 3,
        formula: "= P(B \\mid X_m = i) \\cdot \\frac{P(A \\cap \\{X_m = i\\})}{P(X_m = i)} = P(B \\mid X_m = i) \\cdot P(A \\mid X_m = i)",
        explanation: "将 $P(B \\mid X_m=i)$ 提出来，剩余部分按定义正好是 $P(A \\mid X_m = i)$，证毕！",
        why: "乘积因式分解完成。"
      }
    ],
    pitfalls: [
      "很多人以为马氏性只是『过去不影响未来』，这道题表明在以『当下』为条件时，『未来也不影响过去』，在条件概率意义下是对称的！"
    ],
    dependencies: ["def-1-1-1", "ex-1-p35"],
    unlocks: ["thm-1-2-11"]
  },
  {
    id: "ex-1-1-4",
    section: "1.1",
    type: "exercise",
    title: "习题 1.1.4: 有限不可约链的转移矩阵必为不可约矩阵",
    badge: "代数联系",
    tags: ["矩阵不可约", "Perron-Frobenius"],
    summary: "概率状态的图连通性与线性代数中非负矩阵的不可约性完美等价。",
    intuitiveAnalogy: "如果一个棋盘上每个格子都能走到任意其他格子，那么这个转移矩阵绝对不可能被重新排列成右上角的三角分块，没有任何封闭的孤岛。",
    mathStatement: `若有限状态马氏链是不可约的，则其转移矩阵 $P$ 是不可约矩阵（即对任意 $i, j \\in S$，存在 $n(i, j) \\ge 1$ 使得 $p_{ij}^{(n)} > 0$）。`,
    blueprint: "直接由不可约链的定义 $S = C(i)$ 出发，对任意 $i \\ne j$ 有 $i \\leadsto j$，从而 $p_{ij}^{(n)} > 0$。",
    microProof: [
      {
        step: 1,
        formula: "S = C(i) \\implies \\forall j \\in S, \\ i \\leftrightsquigarrow j \\implies i \\leadsto j",
        explanation: "由马氏链不可约的定义，所有状态都在同一个互通类中。",
        why: "不可约定义直接蕴含两两互通。"
      },
      {
        step: 2,
        formula: "\\exists n = n(i, j) \\ge 1 \\text{ s.t. } p_{ij}^{(n)} > 0",
        explanation: "当 $i \\ne j$ 时，步数 $n$ 必须 $\\ge 1$；当 $i = j$ 时，由互通存在 $k \\ne i$ 满足 $i \\leadsto k$ 与 $k \\leadsto i$，相乘得到 $n \\ge 2$ 步回访正概率。",
        why: "符合线性代数中不可约非负矩阵的标准充要定义。"
      }
    ],
    pitfalls: ["注意矩阵不可约要求 $n \\ge 1$，而可达定义 $i \\leadsto i$ 允许 $n=0$。若状态互通，必存在 $\\ge 1$ 步的回访路径。"],
    dependencies: ["concept-communication"],
    unlocks: ["cor-1-3-10"]
  },
  {
    id: "def-period",
    section: "1.1",
    type: "definition",
    title: "定义: 状态的周期 (Period) 与非周期性 (Aperiodicity)",
    badge: "核心概念",
    tags: ["周期", "最大公约数", "非周期"],
    summary: "质点回访某状态所花费步数的最大公约数，刻画了系统节律性的脉搏。",
    intuitiveAnalogy: "像一个每隔偶数小时才允许你进门的车站。如果你只能在第 2, 4, 6, 8... 小时回到原点，周期的最大公约数就是 2。若周期为 1，说明步数不再受任何固定节拍锁死，可以随时回归。",
    mathStatement: `状态 $i$ 的**周期 (Period)** $d_i$ 定义为所有使其自身回访概率大于零的步数 $n \\ge 1$ 的最大公约数 (greatest common divisor)：
$$d_i = \\gcd\\{n \\ge 1 \\mid p_{ii}^{(n)} > 0\\}$$
若对所有 $n \\ge 1$ 均有 $p_{ii}^{(n)} = 0$，则定义 $d_i = \\infty$。
若一个马氏链中所有状态的周期均为 1，则称该马氏链为**非周期的 (Aperiodic)**。`,
    blueprint: "刻画自回访步长集合的算术整除特征。",
    microProof: [
      {
        step: 1,
        formula: "P = \\begin{bmatrix} 0 & 1 & 0 & \\dots & 0 \\\\ 0 & 0 & 1 & \\dots & 0 \\\\ \\vdots & & & \\ddots & \\vdots \\\\ 1 & 0 & 0 & \\dots & 0 \\end{bmatrix} \\implies d_i = n \\quad (\\forall i)",
        explanation: "如原书例子：循环置换矩阵 $1 \\to 2 \\to \\dots \\to n \\to 1$，必须整整走 $n$ 步的整数倍才能回来，周期为 $n$。",
        why: "最典型的纯周期循环系统。"
      }
    ],
    pitfalls: [
      "周期 $d_i$ 绝不等于能够回到自身的最小步数！详见接下来的 Footnote 4 习题。"
    ],
    dependencies: ["concept-trans-matrix"],
    unlocks: ["fn-4-period", "thm-1-1-5", "thm-1-1-6"]
  },
  {
    id: "fn-4-period",
    section: "1.1",
    type: "exercise",
    title: "Footnote 4 习题: 周期的深入反例与半群结构",
    badge: "经典反例",
    tags: ["反例", "半群", "周期精细性质"],
    summary: "揭示两大致命误区：周期不是最小回访时间；正步数集合构成加法半群。",
    intuitiveAnalogy: "你能坐2小时或3小时的航班回国，最小回访时间是2，但 $\\gcd(2, 3) = 1$，所以周期是1而不是2！",
    mathStatement: `(1) 证明 $d_i$ 一般不等于 $\\min\\{n \\ge 1 \\mid p_{ii}^{(n)} > 0\\}$；
(2) 证明集合 $J = \\{n \\ge 1 \\mid p_{ii}^{(n)} > 0\\}$ 在自然数加法下构成一个**半群 (Semigroup)**（即若 $a, b \\in J$，则 $a+b \\in J$）。`,
    blueprint: "构造一个3状态的反例矩阵证明(1)；利用 C-K 方程证明(2)。",
    microProof: [
      {
        step: 1,
        formula: "P = \\begin{bmatrix} 0 & + & + \\\\ + & a & + \\\\ + & b & c \\end{bmatrix} \\implies p_{00}^{(1)} = 0, \\ p_{00}^{(2)} > 0, \\ p_{00}^{(3)} > 0",
        explanation: "对状态 0，一步回不来（$p_{00}=0$）。但 $0 \\to 1 \\to 0$ 需 2 步，$0 \\to 1 \\to 1 \\to 0$ 需 3 步。故正步数集包含 2 和 3。",
        why: "原书提供的反例构造。"
      },
      {
        step: 2,
        formula: "d_0 = \\gcd\\{2, 3, \\dots\\} = 1 \\ne \\min\\{n \\ge 1 \\mid p_{00}^{(n)} > 0\\} = 2",
        explanation: "最小回访步数是 2，但最大公约数是 1！故周期为 1，第(1)问得证。",
        why: "2 与 3 互质。"
      },
      {
        step: 3,
        formula: "p_{ii}^{(a+b)} \\ge p_{ii}^{(a)} p_{ii}^{(b)} > 0 \\implies a+b \\in J",
        explanation: "由 C-K 方程，质点可以先走 $a$ 步回到 $i$，再走 $b$ 步回到 $i$。两者乘积严格大于零，说明 $a+b$ 也是可行的回访步数。",
        why: "非负矩阵乘积的平凡性质，确立半群闭合性。"
      }
    ],
    pitfalls: [
      "切记：非周期不是说每一步都能回访，而是回访时间集合的公约数为1。"
    ],
    dependencies: ["def-period"],
    unlocks: ["thm-1-1-5"]
  },
  {
    id: "thm-1-1-5",
    section: "1.1",
    type: "theorem",
    title: "定理 1.1.5: 充分大周期倍数必然可达定理",
    badge: "核心定理",
    tags: ["数论半群", "舒尔定理", "大数性"],
    summary: "只要周期有限，当步数是周期的倍数且倍数足够大时，回访概率必定严格大于零。",
    intuitiveAnalogy: "若硬币面额只有 5 块和 7 块（公约数为 1），小钱凑不出，但只要钱数超过某个门槛（如 24 块以上），每一块钱都能用 5 和 7 凑出来！",
    mathStatement: `设状态 $i$ 的周期 $d_i < \\infty$，则存在自然数 $N$（仅依赖于状态 $i$），使得对所有 $n \\ge N$，均有：
$$p_{ii}^{(n d_i)} > 0$$`,
    blueprint: "利用数论中的半群引理（Frobenius 硬币问题/Schur 半群定理）：由公约数为 $d$ 的半群，其元素最终必定覆盖所有充分大的 $d$ 的倍数。",
    microProof: [
      {
        step: 1,
        formula: "J' = \\{m \\ge 1 \\mid m = n/d_i, \\text{ 其中 } n \\in J\\} \\subseteq \\mathbb{Z}_+",
        explanation: "将正回访步数集 $J$ 中的元素全体除以最大公约数 $d_i$，得到的新集合 $J'$ 仍是加法半群，且 $\\gcd(J') = 1$。",
        why: "提取最大公约数后的必然性质。"
      },
      {
        step: 2,
        formula: "\\gcd(J') = 1 \\implies \\exists m_1, \\dots, m_r \\in J' \\text{ 及整数 } c_k \\text{ s.t. } \\sum_{k=1}^r c_k m_k = 1",
        explanation: "由裴蜀定理 (Bézout's identity)，互质数组必可线性整数组合出 1。",
        why: "数论基本定理。"
      },
      {
        step: 3,
        formula: "\\exists N \\text{ s.t. } \\forall n \\ge N, \\ n \\in J' \\implies n d_i \\in J \\implies p_{ii}^{(n d_i)} > 0",
        explanation: "结合半群的加法封闭性，可知充分大的任何整数 $n \\ge N$ 都能由 $J'$ 中的正整数线性相加生成，还原乘以 $d_i$ 即证！",
        why: "经典数值半群引理（Sylvester / Schur 定理）。"
      }
    ],
    pitfalls: [
      "必须是充分大的倍数 $n \\ge N$ 才能保证大于零，小倍数时可能依然为 0。"
    ],
    dependencies: ["fn-4-period", "def-period"],
    unlocks: ["thm-1-1-6", "cor-1-1-7"]
  },
  {
    id: "thm-1-1-6",
    section: "1.1",
    type: "theorem",
    title: "定理 1.1.6: 周期是互通类性质 (Period is a Class Property)",
    badge: "核心定理",
    tags: ["类性质", "整除性", "周期守恒"],
    summary: "同甘共苦的朋友圈：只要两个状态互通，它们的周期必定一模一样。",
    intuitiveAnalogy: "同一个旋转木马上的两个人，无论一人坐在龙头，另一人坐在龙尾，两个人转回原位的周期节拍必定是完全相同的。",
    mathStatement: `若状态 $i$ 与状态 $j$ 互通 ($i \\leftrightsquigarrow j$)，则它们的周期相等：
$$d_i = d_j$$`,
    blueprint: "通过双向通道拼成回访环，利用整除关系推导 $d_i \\mid d_j$ 且 $d_j \\mid d_i$，从而相等。",
    microProof: [
      {
        step: 1,
        formula: "\\exists m_1, m_2 > 0 \\text{ s.t. } p_{ij}^{(m_1)} > 0, \\ p_{ji}^{(m_2)} > 0",
        explanation: "因为 $i \\leftrightsquigarrow j$，由互通定义存在正概率往返步数。",
        why: "互通的定义。"
      },
      {
        step: 2,
        formula: "p_{ii}^{(m_1 + m_2)} \\ge p_{ij}^{(m_1)} p_{ji}^{(m_2)} > 0 \\implies d_i \\mid (m_1 + m_2)",
        explanation: "先从 $i$ 到 $j$，再从 $j$ 到 $i$，构成一条长为 $m_1+m_2$ 的 $i \\to i$ 回路，因此总步数必被周期 $d_i$ 整除。",
        why: "周期定义：所有回访步数必是周期的倍数。"
      },
      {
        step: 3,
        formula: "p_{ii}^{(m_1 + n d_j + m_2)} \\ge p_{ij}^{(m_1)} p_{jj}^{(n d_j)} p_{ji}^{(m_2)} > 0 \\quad (\\forall n \\ge N)",
        explanation: "在 $j$ 处停留空转 $n d_j$ 步（由定理 1.1.5，当 $n$ 充分大时 $p_{jj}^{(n d_j)} > 0$），构成另一条长为 $m_1 + n d_j + m_2$ 的回访路径。",
        why: "C-K 不等式分段放缩。"
      },
      {
        step: 4,
        formula: "d_i \\mid (m_1 + n d_j + m_2) \\text{ 且 } d_i \\mid (m_1 + m_2) \\implies d_i \\mid n d_j",
        explanation: "两式相减：$(m_1 + n d_j + m_2) - (m_1 + m_2) = n d_j$，故 $d_i$ 必须整除 $n d_j$ 对所有充分大的 $n$ 成立，这推出 $d_i \\mid d_j$！",
        why: "整除运算的线性性质。"
      },
      {
        step: 5,
        formula: "\\text{交换 } i \\text{ 和 } j \\text{ 的角色，同理可得 } d_j \\mid d_i \\implies d_i = d_j",
        explanation: "两正整数互相整除，唯一的可能就是二者完全相等！",
        why: "正整数整除关系的自反与反对称性。"
      }
    ],
    pitfalls: [
      "很多教材省略了此处 $p_{jj}^{(n d_j)} > 0$ 需要调用定理 1.1.5 的前提，直觉上误以为任意一步周期都能走通。"
    ],
    dependencies: ["thm-1-1-5", "concept-communication"],
    unlocks: ["cor-1-1-7", "lemma-1-3-9"]
  },
  {
    id: "cor-1-1-7",
    section: "1.1",
    type: "corollary",
    title: "推论 1.1.7: 跨状态的大步周期转移正概率",
    badge: "实用推论",
    tags: ["大步转移", "通畅性"],
    summary: "只要一旦能到，再加上足够多轮周期循环后，也必定都能走到。",
    intuitiveAnalogy: "公交车只要有一班能带你从A到B，那么等线路跑通充分多圈后，每一班正点周期车次都能顺利把你送到B。",
    mathStatement: `若 $p_{ij}^{(m)} > 0$ 且 $d_j < \\infty$，则对所有充分大的 $n$，均有：
$$p_{ij}^{(m + n d_j)} > 0$$`,
    blueprint: "利用 $p_{ij}^{(m+nd_j)} \\ge p_{ij}^{(m)} p_{jj}^{(nd_j)}$ 和定理 1.1.5 即可秒证。",
    microProof: [
      {
        step: 1,
        formula: "p_{ij}^{(m + n d_j)} \\ge p_{ij}^{(m)} p_{jj}^{(n d_j)}",
        explanation: "从 $i$ 出发先用 $m$ 步到达 $j$，再在 $j$ 点循环 $n d_j$ 步回到 $j$。",
        why: "C-K 不等式。"
      },
      {
        step: 2,
        formula: "p_{ij}^{(m)} > 0, \\quad p_{jj}^{(n d_j)} > 0 (\\forall n \\ge N) \\implies p_{ij}^{(m + n d_j)} > 0",
        explanation: "由定理 1.1.5，第二项对充分大 $n$ 恒正，正数相乘为正，得证！",
        why: "定理 1.1.5 的直接应用。"
      }
    ],
    pitfalls: ["注意是目标点 $j$ 的周期 $d_j$。若 $i, j$ 互通则 $d_i=d_j$。"],
    dependencies: ["thm-1-1-5"],
    unlocks: ["ex-1-1-8", "lemma-1-3-9"]
  },
  {
    id: "ex-1-1-8",
    section: "1.1",
    type: "exercise",
    title: "习题 1.1.8: 有限不可约非周期矩阵必有某次幂严格全正 ($P^n > 0$)",
    badge: "进阶习题",
    tags: ["严格正矩阵", "本原矩阵", "全通达"],
    summary: "不可约与非周期的威力：演化足够多步之后，从任何起点都能以非零概率到达任何终点！",
    intuitiveAnalogy: "在一座四通八达且班次非整齐划一的现代化换乘地铁网中，只要时间足够长，从全城任何一个车站出发，你都有可能到达任何另一个车站，没有任何死角盲区。",
    mathStatement: `若有限状态马氏链是不可约且非周期的，则其转移概率矩阵 $P$ 是不可约且非周期的，即存在某个 $n \\ge 1$ 使得矩阵的每一个元素都严格大于零：$P^n > 0$。`,
    blueprint: "对有限状态的所有点对 $(i, j)$，利用推论 1.1.7 找到各自满足全正的阈值 $N(i, j)$，取有限集合的最大值作为全局步数。",
    microProof: [
      {
        step: 1,
        formula: "\\forall i, j \\in S, \\ \\exists m(i, j) \\ge 1 \\text{ s.t. } p_{ij}^{(m(i, j))} > 0",
        explanation: "因为链是不可约的，所有状态互通，步数必存在。",
        why: "不可约定义。"
      },
      {
        step: 2,
        formula: "d_j = 1 \\implies \\exists N(i, j) \\text{ s.t. } \\forall n \\ge N(i, j), \\ p_{ij}^{(m(i, j) + n)} > 0",
        explanation: "因为链是非周期的（$d_j = 1$），调用推论 1.1.7，步数只要大于阈值，每一步都有正概率！",
        why: "推论 1.1.7 在 $d_j=1$ 时的特化。"
      },
      {
        step: 3,
        formula: "N^* = \\max_{i, j \\in S} \\{m(i, j) + N(i, j)\\} < \\infty",
        explanation: "因为状态空间 $S$ 是**有限集合**，点对 $(i, j)$ 只有有限多个，有限个数的最大值必然是有限数！",
        why: "有限集的极大值存在原理（无限集此步不成立！）。"
      },
      {
        step: 4,
        formula: "\\forall n \\ge N^*, \\quad P^n > 0",
        explanation: "对该全局步数 $N^*$，所有坐标位置的概率同时严格大于零，矩阵严格全正！",
        why: "构造完成。"
      }
    ],
    pitfalls: [
      "必须死死扣住『状态空间有限』这个前提！若是无穷状态空间，取最大值可能得到无穷大，结论不再成立。"
    ],
    dependencies: ["thm-1-1-6", "cor-1-1-7", "ex-1-1-4"],
    unlocks: ["cor-1-3-10"]
  }
];
