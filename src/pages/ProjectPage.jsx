import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "section-intro", label: "项目介绍" },
  { id: "section-circuit", label: "线路与元件" },
  { id: "section-design", label: "项目设计" },
  { id: "section-experiment", label: "实验设计" },
  { id: "section-refs", label: "参考文献" },
];

export default function ProjectPage() {
  const [activeNav, setActiveNav] = useState("section-intro");

  useEffect(() => {
    const updateActive = () => {
      const triggerTop = 140;
      const withRect = navItems
        .map((item) => ({
          id: item.id,
          el: document.getElementById(item.id),
        }))
        .filter((s) => s.el)
        .map(({ id, el }) => {
          const r = el.getBoundingClientRect();
          return { id, top: r.top, bottom: r.bottom };
        });
      const inView = withRect.filter((r) => r.top <= triggerTop && r.bottom > triggerTop);
      const current =
        inView.length > 0
          ? inView.reduce((a, b) => (a.top > b.top ? a : b)).id
          : withRect.find((r) => r.bottom > 0)?.id ?? navItems[0].id;
      setActiveNav(current);
    };
    const observer = new IntersectionObserver(
      () => updateActive(),
      { rootMargin: "-100px 0px -40% 0px", threshold: 0 }
    );
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActive);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveNav(sectionId);
    }
  };

  return (
    <section className="relative px-6 md:px-10 lg:px-20 pt-28 pb-20 lg:pt-32 lg:pb-28 bg-white lg:bg-gradient-to-b lg:from-white lg:to-bg-light">
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-4 lg:gap-10">
        {/* Sidebar */}
        <aside className="mb-10 lg:mb-0 lg:col-span-1 lg:sticky lg:top-28 self-start">
          <div className="rounded-2xl bg-soft-cyan/60 border border-teal-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold tracking-wide text-teal-700 mb-4">
              项目导航
            </h2>
            <nav className="space-y-1 text-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${
                    activeNav === item.id
                      ? "bg-white text-teal-700 shadow-sm"
                      : "text-teal-700/70 hover:text-teal-800 hover:bg-white/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <header className="mb-10 text-center">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-teal-500 mb-3">
                Gene dancer · Project
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-title text-teal-900 mb-4">
                项目
              </h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
                搭载 AiiA 群体感应淬灭酶的工程菌智能痘痘贴，通过双输入 AND 门逻辑在痤疮毛囊微环境中精准激活，降解 CAMP 致炎因子，从根源改善痤疮。
              </p>
            </header>

            <div className="space-y-12">
              {/* 1. 项目介绍：设计主题思路 + 系统优势 */}
              <section id="section-intro" className="scroll-mt-32">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-teal-500">
                    #1
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold text-teal-700 tracking-title">
                    项目介绍
                  </h2>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-3">
                  设计主题思路
                </h3>
                <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
                  <p>
                    我们开发了一种搭载 <strong>AiiA 群体感应淬灭酶</strong>
                    的工程菌智能痘痘贴。工程菌由水凝胶包裹，避免免疫攻击，并通过
                    <strong>双输入 AND 门逻辑（油脂 + 低 pH）</strong>
                    ，仅在痤疮毛囊微环境中激活，分泌 AiiA 酶降解痤疮丙酸杆菌的
                    CAMP 致炎因子。
                  </p>
                  <p>
                    该设计可精准清除炎症信号，不破坏皮肤原生菌群，从根源改善痤疮。
                  </p>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-teal-800 mt-6 mb-3">
                  系统优势（创新点）
                </h3>
                <ul className="space-y-2 text-sm md:text-base text-gray-700 leading-relaxed list-none">
                  <li className="flex gap-2">
                    <span className="text-teal-600 font-medium shrink-0">1.</span>
                    <span>
                      <strong>双输入 AND 门</strong>：油脂 + 低 pH
                      双重验证，确保工程菌只在痤疮毛囊激活，误激活概率降到最低。
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600 font-medium shrink-0">2.</span>
                    <span>
                      <strong>抗毒力策略</strong>：不杀死任何细菌，只降解 CAMP
                      致炎因子，保护皮肤微生态。
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600 font-medium shrink-0">3.</span>
                    <span>
                      <strong>分裂 T7 RNA 聚合酶</strong>：实现物理层面的 AND
                      门逻辑，同时具备信号级联放大功能。
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-600 font-medium shrink-0">4.</span>
                    <span>
                      <strong>双重安全保障</strong>：水凝胶封装（物理隔绝）+
                      pE194ts 温控复制子（37℃ 质粒丢失），确保使用安全。
                    </span>
                  </li>
                </ul>
              </section>

              {/* 2. 线路与元件 */}
              <section id="section-circuit" className="scroll-mt-32">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-teal-500">
                    #2
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold text-teal-700 tracking-title">
                    线路与元件
                  </h2>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                  在复杂的人体皮肤微环境中，工程菌通过双输入 AND 门逻辑精准定位痤疮毛囊：
                </p>
                <ul className="space-y-1 text-sm md:text-base text-gray-700 mb-4">
                  <li>
                    <strong>输入 1：油脂</strong>——痤疮部位高油脂环境激活 P_fap 启动子
                  </li>
                  <li>
                    <strong>输入 2：低 pH</strong>——痤疮毛囊弱酸性（pH 5.5–6.0）激活
                    P_asr 启动子
                  </li>
                </ul>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                  基因线路遵循<strong>感知 → 计算 → 响应</strong>的合成生物学设计原则：
                </p>
                <div className="rounded-xl bg-soft-cyan/30 border border-teal-100 p-4 md:p-5 space-y-3 text-sm md:text-base text-gray-700">
                  <p>
                    <strong className="text-teal-800">感知模块：</strong>P_fap（油脂诱导）
                    + P_asr（低 pH 诱导）
                  </p>
                  <p>
                    <strong className="text-teal-800">计算模块：</strong>分裂 T7 RNA
                    聚合酶（实现 AND 门逻辑）
                  </p>
                  <p>
                    <strong className="text-teal-800">响应模块：</strong>AiiA
                    酶（执行功能）+ RFP（报告基因）
                  </p>
                </div>
                <div className="mt-4 space-y-3 text-sm md:text-base text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-teal-800">处理模块：</strong>
                    两个启动子分别表达 T7 RNA 聚合酶的 N 端和 C 端片段，只有两个片段同时存在才能互补组装成有活性的完整 T7 RNA 聚合酶。
                  </p>
                  <p>
                    <strong className="text-teal-800">输出模块：</strong>
                    有活性的 T7 RNA 聚合酶识别 T7 启动子，驱动 AiiA 酶和 RFP
                    的表达。AiiA 通过 SspB 信号肽分泌到胞外，降解 CAMP
                    致炎因子；RFP 用于实时监测回路激活。
                  </p>
                  <p className="text-gray-600">
                    当炎症消退、油脂和 pH
                    恢复正常时，两个信号消失，回路自动关闭，工程菌停止工作。
                  </p>
                </div>
              </section>

              {/* 3. 项目设计：水凝胶设计 */}
              <section id="section-design" className="scroll-mt-32">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-teal-500">
                    #3
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold text-teal-700 tracking-title">
                    项目设计
                  </h2>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-3">
                  水凝胶设计
                </h3>
                <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
                  <p>
                    为使工程菌能够接收皮肤表面的油脂和低 pH
                    信号并稳定表达，同时确保不对人体造成伤害，我们参考 Pluronic F127
                    水凝胶设计了一种基于海藻酸盐的水凝胶。通过
                    <strong>乌吉多组分法</strong>
                    将疏水基团和苯硼酸基团连接到海藻酸钠（Alg）骨架上，制备出两亲性苯硼酸基海藻酸盐衍生物（
                    <strong>Ugi-Alg-PBA</strong>）。
                  </p>
                  <p>
                    为同时满足工程菌的生长、与周围环境的相互作用以及抑制其过度繁殖，我们采用
                    <strong>三层结构设计</strong>：内部营养层、中间过渡层、外部抑制层。该设计确保工程菌不会从水凝胶基质中逃逸，并能与外界环境交流、接收一氧化氮信号分子，并将抗菌肽释放到水凝胶外。为防止工程菌泄漏，还额外添加一层
                    <strong>硝酸纤维素</strong>，避免工程菌污染皮肤。
                  </p>
                </div>
                <ul className="mt-4 space-y-1 text-sm md:text-base text-gray-700">
                  <li>
                    <strong className="text-teal-800">外部抑制层（硝酸纤维素）</strong>
                    → 防止逃逸
                  </li>
                  <li>
                    <strong className="text-teal-800">中间过渡层（Ugi-Alg-PBA）</strong>
                    → 信号传递、产物释放
                  </li>
                  <li>
                    <strong className="text-teal-800">内部营养层</strong> →
                    工程菌生长
                  </li>
                </ul>
                <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm md:text-base text-gray-700 leading-relaxed">
                  <p className="font-semibold text-teal-800 mb-2">联合治疗考量</p>
                  <p>
                    我们考虑与抑制炎症因子的药物联合使用，与抗菌肽的抗菌作用相结合，发挥协同抗菌效果；并计划与光疗形成联合治疗，以提高疗效。
                  </p>
                </div>
              </section>

              {/* 4. 实验设计 */}
              <section id="section-experiment" className="scroll-mt-32">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-teal-500">
                    #4
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold text-teal-700 tracking-title">
                    实验设计
                  </h2>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-3">
                  模拟克隆过程
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed mb-8">
                  <li>
                    将 P_fap、P_asr、T7 RNAP-N、T7 RNAP-C、T7 启动子、AiiA、RFP、终止子的
                    DNA 序列导入 SnapGene。
                  </li>
                  <li>
                    对所有元件进行序列驯化：检查并消除 BsaI
                    等限制性酶切位点，确保后续 Golden Gate 组装顺利进行。
                  </li>
                  <li>
                    对每个元件标注功能标签：启动子、RBS、CDS、信号肽、终止子。
                  </li>
                  <li>
                    按以下顺序组装质粒：P_fap → T7 RNAP-N；P_asr → T7
                    RNAP-C（反向插入）；T7 启动子 → SspB 信号肽 → AiiA → RFP →
                    双终止子。
                  </li>
                  <li>
                    在质粒骨架中添加：pMB1/ColE1 复制子（大肠杆菌组装用）、pE194ts
                    复制子（表皮葡萄球菌用）、Cat 抗性基因。
                  </li>
                  <li>
                    添加 BamHI、HindIII、BsaI 等酶切位点，便于后续验证和模块替换。
                  </li>
                </ol>

                <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-3">
                  实验方案
                </h3>
                <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
                  <div>
                    <p className="font-semibold text-teal-800 mb-1">
                      1. 工程菌培养与构建
                    </p>
                    <p>
                      克隆目标基因，构建含双输入 AND 门回路的质粒；电转化入表皮葡萄球菌，氯霉素筛选阳性克隆；PCR
                      和测序验证序列正确性。
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-teal-800 mb-1">
                      2. 基因表达与功能验证
                    </p>
                    <p>
                      在不同油脂浓度和 pH 条件下培养，检测 RFP 荧光；收集上清，HPLC
                      检测 CAMP 降解率；HaCaT 细胞培养，ELISA 检测 IL-8 炎症因子。
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-teal-800 mb-1">
                      3. 安全性验证
                    </p>
                    <p>
                      MTT 法检测细胞毒性；37℃ 传代培养，平板计数检测质粒丢失率；与野生型表皮葡萄球菌共培养，验证无生长抑制。
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. 参考文献 */}
              <section id="section-refs" className="scroll-mt-32">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-teal-500">
                    #5
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold text-teal-700 tracking-title">
                    参考文献
                  </h2>
                </div>
                <ol className="list-decimal list-inside space-y-3 text-xs md:text-sm text-gray-700 leading-relaxed">
                  <li>
                    Shis DL, Bennett MR. Library of synthetic transcriptional AND
                    gates built with split T7 RNA polymerase mutants. Proc Natl
                    Acad Sci U S A. 2013 Mar 26;110(13):5028-33. doi:
                    10.1073/pnas.1220157110.
                  </li>
                  <li>
                    Schaerli Y, Gili M, Isalan M. A Split Intein T7 RNA Polymerase
                    for Transcriptional AND-Logic. Nucleic Acids Res.
                    2014;42(19):12322-12328.
                  </li>
                  <li>
                    Suziedeliené E, et al. The acid-inducible asr gene in
                    Escherichia coli: transcriptional control by the phoBR
                    operon. J Bacteriol. 1999 Apr;181(7):2084-93.
                  </li>
                  <li>
                    Gao M et al. Effects of AiiA-Mediated Quorum Quenching in
                    Sinorhizobium Meliloti on Quorum-Sensing Signals, Proteome
                    Patterns, and Symbiotic Interactions. Mol Plant Microbe
                    Interact. 2007;20(7):843-856.
                  </li>
                  <li>
                    Morgan RN, El-Behery RR. Bacillus Cereus N-Acyl Homoserine
                    Lactonase and Penicillin Acylase II against Pseudomonas
                    Aeruginosa. Enzyme Microb Technol. 2025;190:110699.
                  </li>
                  <li>
                    Augustin J, Götz F. Transformation of Staphylococcus
                    Epidermidis and Other Staphylococcal Species with Plasmid
                    DNA by Electroporation. FEMS Microbiol Lett. 1989;66(1-3):203-207.
                  </li>
                  <li>
                    Costa SK et al. Bypassing the Restriction System to Improve
                    Transformation of Staphylococcus Epidermidis. J Bacteriol.
                    2017;199(16):e00271-17.
                  </li>
                </ol>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
