// Section 1.2 - 1.4 Masterclass Lecture (白痴级降维通关讲义)
window.MASTERCLASS_HTML = `
<div class="space-y-10 max-w-5xl mx-auto pb-16">

  <!-- Hero Header -->
  <div class="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
    <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="flex items-center space-x-2.5 text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
      <span>🎓 随机过程极简大师课</span>
      <span>·</span>
      <span>数学初学者保姆级精读指南</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
      马尔科夫链三部曲：§1.2 至 §1.4 终极透析
    </h1>
    <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
      这一部分是整本教材<strong>最精妙、定理最密集、因果咬合最严密</strong>的核心骨架。我们将抛弃枯燥难懂的符号黑话，用<strong>『粒子漫步三问』</strong>把全部 40 多个定理、引理、习题与例子串成一部跌宕起伏的逻辑大戏！
    </p>

    <!-- Quick Mental Model Roadmap -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div class="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 shadow-sm">
        <div class="text-xs font-bold text-emerald-400 mb-1 flex items-center space-x-1">
          <span>🌱 第一幕 §1.2</span>
          <span>·</span>
          <span>生死存亡</span>
        </div>
        <div class="font-bold text-white text-base mb-1">你能不能回家？</div>
        <div class="text-xs text-slate-400">常返 vs 非常返 · 级数判据 · 0-1跃迁 · 维度诅咒</div>
      </div>
      <div class="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 shadow-sm">
        <div class="text-xs font-bold text-purple-400 mb-1 flex items-center space-x-1">
          <span>⚡ 第二幕 §1.3</span>
          <span>·</span>
          <span>岁月长短</span>
        </div>
        <div class="font-bold text-white text-base mb-1">你回家的速度有多快？</div>
        <div class="text-xs text-slate-400">正常返 vs 零常返 · 更新定理 · 平稳分布 · 周期分解</div>
      </div>
      <div class="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 shadow-sm">
        <div class="text-xs font-bold text-amber-400 mb-1 flex items-center space-x-1">
          <span>🍂 第三幕 §1.4</span>
          <span>·</span>
          <span>魂归何处</span>
        </div>
        <div class="font-bold text-white text-base mb-1">回不去时，你会掉进谁的怀抱？</div>
        <div class="text-xs text-slate-400">吸收概率 · 调和方程 · 赌徒破产通解 · 必破产定理</div>
      </div>
    </div>
  </div>

  <!-- ACT 1: Section 1.2 -->
  <section class="space-y-6">
    <div class="flex items-center space-x-3 border-b border-slate-800 pb-3">
      <span class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">1</span>
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-white">第一幕：常返与非常返 (§1.2) —— 终极追问：你能不能回家？</h2>
        <p class="text-xs text-slate-400">核心使命：用严格数学刻画『无限次回访』，建立级数判据与 0-1 律</p>
      </div>
    </div>

    <!-- 1.1 Intuitive Problem -->
    <div class="glass-card rounded-2xl p-6 border-l-4 border-l-emerald-500 shadow-lg">
      <h3 class="text-base font-bold text-emerald-400 mb-2 flex items-center space-x-2">
        <span>💡</span>
        <span>白话直觉：常返 (Recurrent) 与非常返 (Transient) 到底在争论什么？</span>
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed mb-3">
        设想你是一个被蒙上眼睛、扔进迷宫的粒子。你在状态 $i$（你的家乡）。随着时钟滴答滴答走到无穷远，只有两种命运：
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div class="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5">
          <strong class="text-emerald-300 block text-sm mb-1">命运 A：常返态 (Recurrent)</strong>
          无论你在外面迷路多久、走得多远，你<strong>以 100% 的概率（概率为 1）在未来无限次回访家乡</strong>！你和家乡是一辈子的羁绊。
          <div class="text-slate-400 mt-1 font-mono">数学符号: $P(X_n = i \\text{ i.o.} \\mid X_0 = i) = 1$</div>
        </div>
        <div class="bg-rose-950/40 border border-rose-500/30 rounded-xl p-3.5">
          <strong class="text-rose-300 block text-sm mb-1">命运 B：非常返态 / 瞬时态 (Transient)</strong>
          你在家乡只是个匆匆过客。虽然你中途可能会回来几次，但<strong>总有一天，你一脚踏出家门之后，就再也回不来了</strong>！
          <div class="text-slate-400 mt-1 font-mono">数学符号: $P(X_n = i \\text{ i.o.} \\mid X_0 = i) < 1$</div>
        </div>
      </div>
    </div>

    <!-- 1.2 The Core Machinery -->
    <div class="glass-card rounded-2xl p-6 shadow-lg space-y-4">
      <h3 class="text-base font-bold text-sky-400 flex items-center space-x-2">
        <span>🔑</span>
        <span>核心破局钥匙：把『无数次回访』拆成『第一次回访』</span>
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        直接算“会不会回访无穷多次”太复杂了，戴老师在讲义中引入了一个天才变量：<strong>首次到达时间 $T_i$</strong>（First Visiting Instant）与<strong>首次回访概率 $f_{ii}^{(n)}$</strong>。
      </p>

      <!-- Lemma 1.2.5 -->
      <div class="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
        <div class="flex items-center justify-between mb-1">
          <span class="font-bold text-white text-sm">引理 1.2.5：常返的首次回访充要条件</span>
          <span class="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Lemma 1.2.5</span>
        </div>
        <div class="text-xs text-sky-300 font-mono py-1">状态 $i$ 是常返态 $\\iff f_{ii}^* = \\sum_{n=1}^\\infty f_{ii}^{(n)} = 1$</div>
        <p class="text-xs text-slate-400 leading-relaxed mt-1">
          <strong>白话秒懂：</strong>只要你能保证『每次出门后，<strong>100% 肯定能回来至少 1 次</strong>』，由于每次回到起点后系统就由于马氏性“失忆重置”，既然能回第 1 次，就能回第 2 次、第 3 次……进而回无穷多次！如果 $f_{ii}^* < 1$（哪怕是 0.99），出门 100 次不回家的概率就会指数累积，总有一天流落天涯！
        </p>
      </div>

      <!-- Lemma 1.2.6 & 1.2.7 -->
      <div class="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
        <div class="flex items-center justify-between mb-1">
          <span class="font-bold text-white text-sm">引理 1.2.6 & 1.2.7：更新卷积与级数恒等式</span>
          <span class="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Renewal Convolution</span>
        </div>
        <div class="text-xs text-sky-300 font-mono py-1">
          $p_{ij}^{(n)} = \\sum_{m=1}^n f_{ij}^{(m)} p_{jj}^{(n-m)} \\quad \\Longrightarrow \\quad \\sum_{n=1}^\\infty p_{ij}^{(n)} = f_{ij}^* \\sum_{n=0}^\\infty p_{jj}^{(n)}$
        </div>
        <p class="text-xs text-slate-400 leading-relaxed mt-1">
          <strong>白话秒懂：</strong>“你第 $n$ 步在咖啡馆，只有可能是你在第 $m$ 步<strong>第一次进店</strong>，随后的 $n-m$ 步又闲逛回店”。两边求和、利用 Fubini 交换求和号后，神奇的<strong>比例尺公式</strong>诞生了：<strong>访问 $j$ 的总期望步数，等于『去过 $j$ 的门票概率 $f_{ij}^*$』乘以『$j$ 点自身的自回访总期望步数』</strong>！
        </p>
      </div>

      <!-- Theorem 1.2.1 -->
      <div class="bg-gradient-to-r from-emerald-500/10 to-transparent rounded-xl p-4 border border-emerald-500/40">
        <div class="flex items-center justify-between mb-1">
          <span class="font-bold text-emerald-300 text-sm">定理 1.2.1：常返性的级数判据 (Recurrence Criterion)</span>
          <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Thm 1.2.1</span>
        </div>
        <div class="text-sm text-emerald-200 font-mono py-1 font-bold">
          状态 $i$ 是常返态 $\\iff \\sum_{n=1}^\\infty p_{ii}^{(n)} = +\\infty$
        </div>
        <p class="text-xs text-slate-300 leading-relaxed mt-1">
          <strong>为什么这个定理封神？</strong>因为定义里的『无穷次回访概率』根本没法算，但转移矩阵的 $n$ 次方 $p_{ii}^{(n)}$ 是纯代数矩阵乘法！只要把对角线元素加起来，看这个级数是发散到 $\\infty$ 还是收敛到一个数，就能瞬间宣判常返还是非常返！
        </p>
        <div class="mt-2 text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg">
          📌 <strong>推论 1.2.2 (0-1律)：</strong> 回访无限次的概率没有 0.3、0.8 这种中间态！要么等于 0（非常返），要么等于 1（常返）！<br/>
          📌 <strong>定理 1.2.10 (非常返消散)：</strong> 若 $j$ 非常返，则 $\\lim_{n \\to \\infty} p_{ij}^{(n)} = 0$。瞬时态在时间尽头必定概率归零。
        </div>
      </div>
    </div>

    <!-- 1.3 Dai's Theorem & Communication -->
    <div class="glass-card rounded-2xl p-6 shadow-lg space-y-4">
      <h3 class="text-base font-bold text-amber-400 flex items-center space-x-2">
        <span>🏆</span>
        <span>常返状态的社交法则与戴雄平定理 (0-1跃迁)</span>
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        常返状态不是孤立存在的，它们在群聚关系中表现出极度霸道的“黑洞闭合”特征：
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
          <div class="font-bold text-white text-xs mb-1">命题 1.2.9：常返性是互通类性质 (闭集定理)</div>
          <p class="text-xs text-slate-400 leading-relaxed">
            若 $i$ 常返且 $i \\leadsto j$，则 $j$ 也必定能回到 $i$（$i \\leftrightsquigarrow j$ 互通），且 $j$ 也必常返！<br/>
            <strong>白话：</strong>常返类是个“许进不许出”的黑洞家族。只要从常返态能走到 $j$，$j$ 就必须是家里人，绝不允许单向叛逃！
          </p>
        </div>
        <div class="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
          <div class="font-bold text-amber-300 text-xs mb-1">定理 1.2.11：戴雄平定理 (0-1 跃迁)</div>
          <p class="text-xs text-slate-400 leading-relaxed">
            若出发点 $i$ 是常返态，则对任意目标 $j$，$f_{ij}^*$ 只能等于 0 或 1！即 $i \\leadsto j \\iff f_{ij}^* = 1$。<br/>
            <strong>白话：</strong>从常返态看世界绝不含糊：只要有一丝可能到达 $j$，你就必定 100% 铁定能到达 $j$！
          </p>
        </div>
      </div>

      <!-- Footnote p.47 Trap -->
      <div class="bg-rose-950/30 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-200">
        ⚠️ <strong>白痴避坑指南 (讲义 p.47 思考题)：</strong><br/>
        反过来对不对？如果“目标 $j$ 是常返态”，能否保证从 $i$ 到 $j$ 的概率也是 1？<br/>
        <strong>答案：绝对不对！</strong>比如 $0 \\leftarrow 1 \\to 2$，0 和 2 都是常返吸收态，从 1 出发去 2 的概率只有 50%，因为你还有 50% 掉进 0！所以戴雄平定理的前提必须是：<strong>出发点 $i$ 自己常返！</strong>
      </div>
    </div>

    <!-- 1.4 The Four Mythical Beasts -->
    <div class="glass-card rounded-2xl p-6 shadow-lg space-y-4">
      <h3 class="text-base font-bold text-purple-400 flex items-center space-x-2">
        <span>🦁</span>
        <span>四大经典检验台：Pólya 维度诅咒与 Tom & Jerry</span>
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        有了定理 1.2.1 的级数判据，我们可以彻底解密物理学上著名的四大模型：
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <!-- 1D Walk -->
        <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div class="font-bold text-sky-300 mb-1">1D 游走：$p_{00}^{(2n)} \\sim \\frac{(4pq)^n}{\\sqrt{\\pi n}}$</div>
          <p class="text-slate-400 leading-relaxed">
            利用 Stirling 公式 $n! \\sim \\sqrt{2\\pi n}(n/e)^n$ 展开。$4pq \\le 1$，仅当无偏向 $p = q = 1/2$ 时 $4pq=1$。<br/>
            此时 $\\sum \\frac{1}{\\sqrt{n}} = \\infty$（$p$-级数指数 $1/2 \\le 1$ 发散），<strong>对称一维游走必常返！</strong>若有风偏向（$p \\ne 1/2$），几何级数收敛，非常返。
          </p>
        </div>

        <!-- 2D Walk -->
        <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div class="font-bold text-emerald-300 mb-1">2D 游走：$p_{00}^{(2n)} \\sim \\frac{1}{\\pi n}$ (Vandermonde 卷积)</div>
          <p class="text-slate-400 leading-relaxed">
            利用组合数恒等式 $\\sum \\binom{n}{i}^2 = \\binom{2n}{n}$，二项式系数平方化简。代入 Stirling 展开正好剩下 $\\frac{1}{\\pi n}$！<br/>
            由于调和级数 $\\sum \\frac{1}{n} = \\infty$ 依然发散，<strong>二维对称游走依然常返！</strong>
          </p>
        </div>

        <!-- 3D Walk -->
        <div class="bg-slate-900/80 p-4 rounded-xl border border-rose-500/40">
          <div class="font-bold text-rose-300 mb-1">3D 游走：$p_{00}^{(2n)} \\sim \\frac{3\\sqrt{3}}{2\\pi^{3/2} n^{3/2}}$ (Pólya 维数灾难)</div>
          <p class="text-slate-400 leading-relaxed">
            多项式最大项放缩，分母激增为 $n \\sqrt{n} = n^{3/2}$！<br/>
            由于指数 $3/2 > 1$，$p$-级数 $\\sum \\frac{1}{n^{1.5}} < \\infty$ <strong>收敛了</strong>！由定理 1.2.1，<strong>三维对称游走必定非常返！</strong>醉汉在三维太空中以概率 1 永远逃逸（习题 1.2.13）。
          </p>
        </div>

        <!-- Tom & Jerry -->
        <div class="bg-slate-900/80 p-4 rounded-xl border border-amber-500/40">
          <div class="font-bold text-amber-300 mb-1">Tom & Jerry 成功游程：$f_{00}^* = 1 - \\lim \\prod (1 - p_i)$</div>
          <p class="text-slate-400 leading-relaxed">
            汤姆猫抓杰瑞鼠，连胜失败即归 0。利用裂项相消，首次回访概率化为无穷乘积！<br/>
            由引理 1.2.14，$\\prod(1-p_i) = 0 \\iff \\sum p_i = \\infty$。失手率累加发散则常返；失手率收敛则连胜逃逸至无穷大！
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ACT 2: Section 1.3 -->
  <section class="space-y-6 pt-6">
    <div class="flex items-center space-x-3 border-b border-slate-800 pb-3">
      <span class="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-lg">2</span>
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-white">第二幕：正常返与零常返 (§1.3) —— 终极追问：你回家的速度有多快？</h2>
        <p class="text-xs text-slate-400">核心使命：剖析“概率为1”背后的时间深渊，确立马氏大极限定理与平稳分布</p>
      </div>
    </div>

    <!-- 2.1 The Shocking Paradox -->
    <div class="glass-card rounded-2xl p-6 border-l-4 border-l-purple-500 shadow-lg space-y-3">
      <h3 class="text-base font-bold text-purple-300 flex items-center space-x-2">
        <span>😱</span>
        <span>震撼事实：明明百分之百能回家，为什么平均回访时间是无穷大？</span>
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        在第一幕中，我们证明了一维和二维对称游走是常返的（$f_{00}^* = 1$）。但是当你去算它回原点的<strong>平均第一回访时间 $m_{ii} = E[T_i] = \\sum n f_{ii}^{(n)}$</strong> 时，你会惊骇地发现：<strong>$m_{ii} = +\\infty$！</strong>
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div class="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3.5">
          <strong class="text-amber-300 block text-sm mb-1">零常返 (Null Recurrent / 弱遍历)</strong>
          $f_{ii}^* = 1$，但平均回访时间 $m_{ii} = \\infty$。<br/>
          <strong>白话：</strong>他每一次虽然都真真切切回来看你了，但他平均每次要出门“一万亿年”。在任意时刻抽查，他在你身边的概率被无限稀释为 0（$\\lim_{n \\to \\infty} p_{ii}^{(n)} = 0$）。
        </div>
        <div class="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5">
          <strong class="text-emerald-300 block text-sm mb-1">正常返 (Positive Recurrent / 强遍历)</strong>
          $f_{ii}^* = 1$，且平均回访时间 $m_{ii} < \\infty$ 有限！<br/>
          <strong>白话：</strong>他平均每隔 3 天就回来看你一次。系统在长河中具有非零的稳态概率，永不消亡！
        </div>
      </div>
    </div>

    <!-- 2.2 The Master Limit Theorems -->
    <div class="glass-card rounded-2xl p-6 shadow-lg space-y-4">
      <h3 class="text-base font-bold text-sky-400 flex items-center space-x-2">
        <span>👑</span>
        <span>王牌核心：马尔科夫-柯尔莫哥洛夫极限定理 (定理 1.3.3)</span>
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        不可约非周期常返链的长期概率到底去向何方？戴老师借用基础更新极限定理（定理 1.3.2 Erdös-Feller-Pollard）给出了全书最震撼的结论：
      </p>

      <div class="bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent rounded-2xl p-5 border border-purple-500/30">
        <div class="text-base text-purple-200 font-mono font-bold mb-2">
          $$\\lim_{n \\to +\\infty} p_{ij}^{(n)} = \\pi_j = \\frac{1}{m_{jj}} = \\frac{1}{\\sum_{n=1}^\\infty n f_{jj}^{(n)}}$$
        </div>
        <div class="text-xs text-slate-300 leading-relaxed space-y-1">
          <p>🎯 <strong>一句话终极口诀：长期概率 = 1 / 循环周期！</strong></p>
          <p>• 如果状态 $j$ 是零常返态，$m_{jj} = \\infty$，则长期概率 $\\pi_j = 1/\\infty = 0$（虚无消散）；</p>
          <p>• 如果状态 $j$ 是正常返态，$m_{jj} < \\infty$，则长期概率 $\\pi_j > 0$（稳定常存）！</p>
          <p>• 而且这个极限<strong>与起点 $i$ 完全无关</strong>！经历漫长演化后，最初的起点记忆被完全洗刷抹平！</p>
        </div>
      </div>

      <!-- Theorem 1.3.8 Four Equivalent Criteria -->
      <div class="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <span class="font-bold text-white text-sm">定理 1.3.8：不可约链正常返的四大等价判据</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold">全章总纲</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span class="text-sky-400 font-bold block mb-1">(1) 正常返定义</span>
            $\\limsup_{n \\to \\infty} p_{ij}^{(n)} > 0$
          </div>
          <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span class="text-emerald-400 font-bold block mb-1">(2) 全体平均时间有限</span>
            $P$ 常返且对所有 $i$，$m_{ii} < \\infty$
          </div>
          <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span class="text-amber-400 font-bold block mb-1">(3) 局部单点时间有限</span>
            $P$ 常返且存在某个 $i$，$m_{ii} < \\infty$
          </div>
          <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span class="text-purple-400 font-bold block mb-1">(4) 存在唯一平稳分布</span>
            方程组 $x = xP, \\sum x_j = 1$ 有唯一正解
          </div>
        </div>
        <p class="text-xs text-slate-400 mt-1">
          💡 <strong>白话秒杀：</strong>只要在全链中找到哪怕一个状态平均能有限时间回家，或者能解出一个合法的平稳分布 $\\pi = \\pi P$，全链所有状态立刻全部晋升为正常返！
        </p>
      </div>

      <!-- Lemma 1.3.9 Cyclic Decomposition -->
      <div class="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
        <div class="flex items-center justify-between mb-1">
          <span class="font-bold text-white text-sm">引理 1.3.9 & 命题 1.3.13：周期性恶作剧与 Cesàro 时间平均</span>
          <span class="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Cyclic Decomposition</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed mt-1">
          如果周期 $d \\ge 2$ 怎么办？引理 1.3.9 证明状态空间会分裂为 $d$ 个同余类 $C_0 \\to C_1 \\to \\dots \\to C_{d-1} \\to C_0$ 轮流转圈。此时单步极限不收敛，但只要做<strong>时间平均 (Cesàro 极限)</strong>：
        </p>
        <div class="text-xs text-sky-300 font-mono py-1">$$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{m=1}^n p_{ij}^{(m)} = f_{ij}^* \\pi_j = \\frac{f_{ij}^*}{m_{jj}}$$</div>
        <p class="text-xs text-slate-400">
          通过时间平均，周期的节拍震荡被完全抹平！无论周期多古怪，长期时间占比依然精确等于 $f_{ij}^* \\pi_j$！
        </p>
      </div>
    </div>
  </section>

  <!-- ACT 3: Section 1.4 -->
  <section class="space-y-6 pt-6">
    <div class="flex items-center space-x-3 border-b border-slate-800 pb-3">
      <span class="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-lg">3</span>
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-white">第三幕：吸收概率与赌徒破产 (§1.4) —— 终极追问：回不去时，你会掉进谁的怀抱？</h2>
        <p class="text-xs text-slate-400">核心使命：破解瞬时流沙区 $S_{tr}$ 的生存方程，解析经典破产差分方程</p>
      </div>
    </div>

    <!-- 3.1 The Flow of Souls -->
    <div class="glass-card rounded-2xl p-6 border-l-4 border-l-amber-500 shadow-lg space-y-4">
      <h3 class="text-base font-bold text-amber-300 flex items-center space-x-2">
        <span>⚖️</span>
        <span>流沙区挣扎：生存调和方程 $x = P_{S_{tr}} x$ 与吸收方程组</span>
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        假设全系统被划分为两部分：非常返态流沙区 $S_{tr}$，以及若干个封闭的安全区（常返互通类 $C_1, C_2, \\dots$）。
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div class="font-bold text-sky-300 mb-1">生存调和方程：$x = P_{S_{tr}} x$</div>
          <p class="text-slate-400 leading-relaxed">
            $x_i$ 是从 $i \\in S_{tr}$ 出发“永远流浪在流沙区、永不被吸收”的概率。如果全空间有限，调和方程的有界非负解只能是 0！这意味着：<strong>粒子以 100% 的确定性最终必然被某个常返类吸收！</strong>
          </p>
        </div>

        <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div class="font-bold text-emerald-300 mb-1">吸收方程组：$\\pi(C) = \\pi^{(1)}(C) + P_{S_{tr}} \\pi(C)$</div>
          <p class="text-slate-400 leading-relaxed">
            “第一步分析法”：从 $i$ 出发掉进常返类 $C$ 的概率 $\\pi_i(C)$，等于第一步直接掉进去的概率 $\\pi_i^{(1)}$，加上第一步跳到其他流沙点 $j$ 再掉进去的概率 $\\sum p_{ij} \\pi_j(C)$！
          </p>
        </div>
      </div>

      <!-- Theorem 1.4.2 Master Product -->
      <div class="bg-gradient-to-r from-amber-500/10 to-transparent rounded-2xl p-4 border border-amber-500/30">
        <div class="text-sm text-amber-200 font-mono font-bold mb-1">
          定理 1.4.2 (宏观大统一极限): $\\lim_{n \\to \\infty} p_{ij}^{(n)} = \\pi_i(C) \\cdot \\pi_j \\quad (\\text{若 } C \\text{ 非周期})$
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">
          <strong>白话大白话：</strong>从外乡流浪汉（$i$）到安全岛名店（$j$）的长期概率 = <strong>（你有多大几率搬进这个安全岛 $\\pi_i(C)$）$\\times$（这个名店在安全岛内部的黄金比例 $\\pi_j$）</strong>！直觉与严密数学在此完美合一！
        </p>
      </div>
    </div>

    <!-- 3.2 Gambler's Ruin -->
    <div class="glass-card rounded-2xl p-6 shadow-lg space-y-4">
      <h3 class="text-base font-bold text-rose-400 flex items-center space-x-2">
        <span>💰</span>
        <span>经典破产模型精解：特征方程与必破产定理</span>
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        赌徒初始本金 $i$ 元，胜率 $p$、负率 $q=1-p$。第一步分析得到二阶常系数齐次差分方程：
      </p>
      <div class="bg-slate-900/90 rounded-xl p-4 border border-slate-800 font-mono text-xs text-sky-200">
        $u_i = q u_{i-1} + p u_{i+1} \\quad \\Longleftrightarrow \\quad p r^2 - r + q = 0 \\implies r_1 = 1, \\ r_2 = \\frac{q}{p}$
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <strong class="text-white block mb-1">1. 有限状态对手 (目标 $n$ 元离场，0 元破产)</strong>
          代入边界 $u_0=1, u_n=0$ 求解待定系数：
          <div class="text-sky-300 font-mono my-1.5">
            $u_i = \\begin{cases} \\frac{(q/p)^n - (q/p)^i}{(q/p)^n - 1} & p \\ne q \\\\ 1 - \\frac{i}{n} & p = q = 1/2 \\end{cases}$
          </div>
          胜出离场概率 $v_i = 1 - u_i$。两者之和为 1，绝不会永续平局。
        </div>

        <div class="bg-slate-900/60 p-4 rounded-xl border border-rose-500/30">
          <strong class="text-rose-300 block mb-1">2. 无限财富对手 (对手本金 $n \\to \\infty$)</strong>
          令 $n \\to \\infty$，惊人的必破产定理浮出水面：
          <div class="text-rose-200 font-mono my-1.5">
            $u_i = \\begin{cases} 1 & \\text{若 } q \\ge p \\ (p \\le 1/2) \\\\ (q/p)^i & \\text{若 } p > 1/2 \\end{cases}$
          </div>
          <strong>警世名理：</strong>即便赌局完全公平（$p=1/2$），由于对手拥有无限弹药，你的破产概率仍然是 <strong>100%</strong>！只有当你胜率严格占优（$p > 1/2$）且本金突破对数红线 $i > \\frac{\\ln 2}{\\ln p - \\ln q}$ 时，破产概率才能压在 50% 以下！
        </div>
      </div>
    </div>
  </section>

  <!-- Mnemonic & Quick Action Bar -->
  <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl text-center space-y-4">
    <h3 class="text-lg font-extrabold text-white">✨ 1.2 至 1.4 全局记忆四句口诀</h3>
    <div class="inline-block bg-slate-950/80 border border-blue-500/30 rounded-2xl px-6 py-4 text-sm text-sky-200 font-mono leading-loose shadow-inner">
      级数发散即常返，出门必回概率全；<br/>
      周期倒数是稳态，平均无穷零常返；<br/>
      流沙挣扎终被吞，类内吸收乘份额；<br/>
      公平单挑无限富，纵使无偏亦破产！
    </div>
    <div class="pt-2 flex flex-wrap justify-center gap-3">
      <button onclick="window.APP.switchView('stepper'); window.APP.renderStepper('thm-1-2-1');" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center space-x-1.5">
        <span>🔬 进入显微镜逐行验证证明</span>
        <span>›</span>
      </button>
      <button onclick="window.APP.switchView('sim');" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center space-x-1.5">
        <span>🎲 进入动态沙盒实测验证</span>
        <span>›</span>
      </button>
      <button onclick="window.APP.switchView('graph');" class="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5">
        <span>🌐 查看全景拓扑因果网</span>
      </button>
    </div>
  </div>

</div>
`;
