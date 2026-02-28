import { useState, useEffect } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { motion } from "framer-motion";
import {
  codeQuenchPython,
  codeCarbonPython,
  codeCycleScanMatlab,
  codeMulticycleMatlab,
} from "../data/modelCode";
import { highlightCode, PDF_THEME } from "../utils/codeHighlight";

/** 技术页代码展示块（深色背景 + 语法高亮） */
function CodeBlock({ title, language, code }) {
  return (
    <div
      className="mt-4 rounded-xl border border-gray-200 overflow-hidden shadow-sm"
      style={{ backgroundColor: PDF_THEME.background }}
    >
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <span className="text-xs font-medium text-teal-300">{title}</span>
        <span className="text-xs text-gray-500">{language}</span>
      </div>
      <pre
        className="p-4 overflow-x-auto text-left text-sm font-mono leading-relaxed"
        style={{ color: PDF_THEME.plain, minHeight: "1.5em" }}
      >
        <code>{highlightCode(code, language)}</code>
      </pre>
    </div>
  );
}

const experiments = [
  {
    id: "colonization",
    title: "1. Engineered bacteria colonization and activation",
    content:
      "Engineered bacteria are encapsulated in hydrogel patches and placed on agar plates or 3D skin models that mimic the skin microenvironment. We assess survival, stability in a confined space, and activation under inflammation-like stimuli via reporter gene signals.",
    expected:
      "Stable colonization within the hydrogel without escape to the medium; reporter signal increases significantly when pH drops or inflammation-related molecules are present, with low background under baseline conditions.",
  },
  {
    id: "targeting",
    title: "2. Targeting acne-causing bacteria",
    content:
      "In co-culture with Cutibacterium acnes, Gene dancer hydrogel patches and control patches are placed near the colony. We monitor zones of inhibition, bacterial load, and inflammatory markers to evaluate targeted suppression by engineered secreted factors.",
    expected:
      "Clear inhibition zones around Gene dancer patches, significant reduction in C. acnes load and inflammatory markers (e.g. ROS or specific cytokines), with minimal change in controls.",
  },
  {
    id: "release",
    title: "3. Hydrogel release and temporal control",
    content:
      "Fluorescent or colorimetric tracers simulate therapeutic factors (either as engineered outputs or loaded into the hydrogel). Time-course sampling of the surrounding medium and varying crosslinking and pore size are used to evaluate release rate and duration.",
    expected:
      "Under inflammation-like stimuli, tracer concentration rises smoothly to a plateau, yielding a controllable release profile; tuning the hydrogel formulation yields predictable changes in rate and total release for dose design.",
  },
];

const TECH_SECTION_IDS = [
  { id: "section-experiment", nav: "experiment" },
  { id: "section-modeling", nav: "modeling" },
];

export default function TechnologyPage() {
  const [activeNav, setActiveNav] = useState("experiment");
  // PID 控制器公式（注意：JS 字符串里每个 LaTeX 反斜杠写成 \\）
  const pidFormula =
    "u(t) = K_P (C_{set} - C) + K_I \\int_{0}^{t} (C_{set} - C)\\, d\\tau + K_D \\frac{d}{dt}(C_{set} - C)";

  useEffect(() => {
    const updateActive = () => {
      const triggerTop = 140;
      const sections = TECH_SECTION_IDS.map(({ id, nav }) => ({
        nav,
        el: document.getElementById(id),
      })).filter((s) => s.el);
      const withRect = sections.map(({ nav, el }) => ({
        nav,
        top: el.getBoundingClientRect().top,
        bottom: el.getBoundingClientRect().bottom,
      }));
      const inView = withRect.filter((r) => r.top <= triggerTop && r.bottom > triggerTop);
      const current = inView.length > 0
        ? inView.reduce((a, b) => (a.top > b.top ? a : b)).nav
        : withRect.find((r) => r.bottom > 0)?.nav ?? TECH_SECTION_IDS[0].nav;
      setActiveNav(current);
    };
    const observer = new IntersectionObserver(
      () => updateActive(),
      { rootMargin: "-100px 0px -40% 0px", threshold: 0 }
    );
    TECH_SECTION_IDS.forEach(({ id }) => {
      const el = document.getElementById(id);
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
      setActiveNav(sectionId === "section-experiment" ? "experiment" : "modeling");
    }
  };

  return (
    <section className="relative px-6 md:px-10 lg:px-20 pt-28 pb-20 lg:pt-32 lg:pb-28 bg-white lg:bg-gradient-to-b lg:from-white lg:to-bg-light">
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-4 lg:gap-10">
        {/* Sidebar */}
        <aside className="mb-10 lg:mb-0 lg:col-span-1 lg:sticky lg:top-28 self-start">
          <div className="rounded-2xl bg-soft-cyan/60 border border-teal-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold tracking-wide text-teal-700 mb-4">
              技术导航
            </h2>
            <nav className="space-y-1 text-sm">
              <button
                type="button"
                onClick={() => scrollToSection("section-experiment")}
                className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${
                  activeNav === "experiment"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-teal-700/70 hover:text-teal-800 hover:bg-white/70"
                }`}
              >
                实验
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("section-modeling")}
                className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${
                  activeNav === "modeling"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-teal-700/70 hover:text-teal-800 hover:bg-white/70"
                }`}
              >
                建模
              </button>
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
                Gene dancer · Technology
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-title text-teal-900 mb-3">
                技术
              </h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
                本页聚焦 Gene dancer
                智能痘痘贴背后的实验设计与验证逻辑，帮助评委快速了解从工程菌到水凝胶贴片的关键技术路径。
              </p>
            </header>

            <section id="section-experiment" className="mb-8 scroll-mt-32">
              <h2 className="text-xl md:text-2xl font-semibold text-teal-700 tracking-title text-center">
                实验设计与预期结果
              </h2>
            </section>

            <div className="space-y-8">
              {experiments.map((exp) => (
                <article
                  key={exp.id}
                  className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6 md:p-7"
                >
                  <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-3">
                    {exp.title}
                  </h3>
                  <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700">
                    <p>
                      <span className="font-semibold text-teal-800">
                        实验内容：
                      </span>
                      {exp.content}
                    </p>
                    <p>
                      <span className="font-semibold text-teal-800">
                        预期结果：
                      </span>
                      {exp.expected}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Modeling section */}
            <section id="section-modeling" className="mt-14 space-y-6 scroll-mt-32">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-semibold text-teal-700 tracking-title mb-2">
                  建模：疗效预测与环境影响评估
                </h2>
                <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
                  为了量化 Gene dancer
                  智能痘痘贴的治疗效果与环境价值，我们构建了从微观反应速率到碳足迹评估、再到多周期闭环控制的系列数学模型。
                </p>
              </div>

              <div className="space-y-6">
                {/* 1. 淬灭酶反应动力学模型 */}
                <article className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6 md:p-7">
                  <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-3">
                    1. 淬灭酶反应动力学模型：疗效预测系统
                  </h3>
                  <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700">
                    <p>
                      <span className="font-semibold text-teal-800">
                        模型思路：
                      </span>
                      基于 Michaelis–Menten
                      方程，将酶促反应速率视作“疗效强度”，底物浓度对应痤疮病情严重程度，最大反应速率
                      Vmax 代表工程菌贴片或传统药物的有效酶活，Km
                      代表系统对病灶信号的敏感度。
                    </p>
                    <p>
                      <span className="font-semibold text-teal-800">
                        关键结论：
                      </span>
                      与传统抗生素和维 A 酸相比，工程菌贴片的 Vmax 更高、Km
                      更低，意味着在轻中重各级病情下都能提供更强、响应更快的治疗输出。
                      在重度痤疮模拟条件下，工程菌贴片预测疗效约为
                      48.3%，是传统抗生素 10.8% 的 4.5
                      倍；在中度病情下疗效提升约 326%。
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      （详细推导中，我们使用不同底物浓度扫描得到疗效曲线，用于指导贴片中的有效载量与使用频次设计。）
                    </p>
                    <p className="mt-3 text-xs md:text-sm text-gray-500 leading-relaxed">
                      模型显示，在轻、中、重度痤疮条件下，工程菌贴片均能在有限时间内将 CAMP 浓度压低至阈值以下，
                      且病情越重，贴片疗效相对传统疗法提升越明显。
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs md:text-sm text-gray-500 mb-2">
                      图：不同痤疮严重程度下 CAMP 浓度随时间的衰减曲线，虚线为治疗阈值（初始浓度的 10%）。
                    </p>
                    <img
                      src="/model/camp-degradation-curve.png"
                      alt="Engineered bacterial patch for CAMP degradation in different acne severities"
                      className="w-full rounded-xl border border-gray-100 shadow-sm"
                    />
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-gray-500">
                    相关实现代码（Python）：
                  </p>
                  <CodeBlock
                    title="淬灭酶促反应动力学模型"
                    language="Python"
                    code={codeQuenchPython}
                  />
                </article>

                {/* 2. 碳足迹模型 */}
                <article className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6 md:p-7">
                  <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-3">
                    2. 碳足迹模型：环境影响对比分析
                  </h3>
                  <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700">
                    <p>
                      <span className="font-semibold text-teal-800">
                        模型思路：
                      </span>
                      采用生命周期评估（LCA）框架，将一次完整疗程拆分为 API
                      生产、制剂生产、包装与运输等环节，并结合中国电网碳排放因子（0.581
                      kg CO₂e/kWh）估算不同治疗方案的总碳足迹。
                    </p>
                    <p>
                      <span className="font-semibold text-teal-800">
                        关键结论：
                      </span>
                      工程菌贴片疗法的总碳足迹约为 0.21 kg
                      CO₂/疗程，而传统抗生素约为 1.34 kg CO₂/疗程，整体减排
                      84.3%。在同等疗效下，工程菌贴片还可将治疗周期从 28
                      天缩短至 7 天，并将 MCF 环境风险评级从 HIGH 降至
                      MEDIUM，实现疗效与环境双赢。
                    </p>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      从生命周期视角看，工程菌贴片疗法在保证更高疗效的同时，将每疗程总碳足迹显著降低，
                      MCF 风险评级由 HIGH 降至 MEDIUM，治疗周期由 28 天缩短到 7 天，
                      在疗效、环境与成本三个维度上形成多重优势。
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs md:text-sm text-gray-500 mb-2">
                      图：传统抗生素疗法与工程菌贴片疗法的每疗程碳足迹与 MCF 评级对比。
                    </p>
                    <img
                      src="/model/carbon-footprint-comparison.png"
                      alt="Carbon footprint comparison between traditional antibiotics and engineered bacterial patch"
                      className="w-full rounded-xl border border-gray-100 shadow-sm"
                    />
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-gray-500">
                    相关实现代码（Python）：
                  </p>
                  <CodeBlock
                    title="碳足迹模型：LCA 与 MCF 评级"
                    language="Python"
                    code={codeCarbonPython}
                  />
                </article>

                {/* 3. 多周期闭环给药模型 */}
                <article className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6 md:p-7">
                  <h3 className="text-base md:text-lg font-semibold text-teal-800 mb-3">
                    3. 多周期给药稳态控制：工程菌闭环系统
                  </h3>
                  <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700">
                    <p>
                      <span className="font-semibold text-teal-800">
                        模型思路：
                      </span>
                      以炎症相关 CAMP 浓度为核心状态变量，构建“CAMP
                      产生–单宁酸淬灭”动力学方程，并引入 PID
                      控制器调整单宁酸释放速率，使 CAMP 浓度稳定在 0.2–0.5 μM
                      的有效治疗区间。
                    </p>
                    <p>
                      <span className="font-semibold text-teal-800">
                        参数设置：
                      </span>
                      目标 CAMP 浓度设定为 0.35
                      μM（痤疮淬灭黄金值），扫描不同给药周期长度以及 PID
                      参数后，选取每 3
                      小时调节一次释放速率，使系统在多周期内保持稳定、不过冲。
                    </p>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      <span className="font-semibold text-teal-800">
                        周期扫描：
                      </span>
                      通过改变给药周期长度（1–12 小时），比较闭环系统下 CAMP 平均值、最大值与疗效比例，
                      寻找既能保证充分控制又具有实际可操作性的周期方案。
                    </p>
                    <div className="mt-3">
                      <img
                        src="/model/cycle-length-scan.png"
                        alt="Effect of cycle length on CAMP control performance"
                        className="w-full rounded-xl border border-gray-100 shadow-sm"
                      />
                    </div>
                    <p className="mt-2 text-xs md:text-sm text-gray-500 leading-relaxed">
                      模型表明，当周期长度为 3 小时时，CAMP 平均值已足够接近稳态，疗效保持在 100% 左右，
                      因此被选为后续多周期模拟的推荐给药周期。
                    </p>
                    <p className="mt-3 text-xs md:text-sm text-gray-500">
                      周期扫描相关实现代码（Matlab）：
                    </p>
                    <CodeBlock
                      title="周期长度扫描"
                      language="Matlab"
                      code={codeCycleScanMatlab}
                    />
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-4">
                      <span className="font-semibold text-teal-800">
                        核心方程：
                      </span>
                      CAMP 浓度动态方程（治疗核心）：
                    </p>
                    <div className="mt-1">
                      <BlockMath
                        math={"\\frac{dC}{dt} = k_{CAMP} X - k_{quench} T C"}
                      />
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-3">
                      单宁酸释放速率控制（闭环关键）：
                    </p>
                    <div className="mt-1">
                      <BlockMath
                        math={
                          "k_{release} = k_{release,base} + PID(C, \\Delta t)"
                        }
                      />
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-3">
                      其中 PID 控制器输出为：
                    </p>
                    <div className="mt-1">
                      <BlockMath math={pidFormula} />
                    </div>
                  </div>

                  {/* 参数表 */}
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full text-xs md:text-sm text-left text-gray-700 border-separate border-spacing-y-1">
                      <thead className="bg-soft-cyan/60 text-teal-800">
                        <tr>
                          <th className="px-3 py-2 rounded-l-xl">参数</th>
                          <th className="px-3 py-2">符号</th>
                          <th className="px-3 py-2">值</th>
                          <th className="px-3 py-2">单位</th>
                          <th className="px-3 py-2 rounded-r-xl">临床意义</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white/70">
                        <tr>
                          <td className="px-3 py-2">目标 CAMP 浓度</td>
                          <td className="px-3 py-2">
                            <InlineMath math="C_{set}" />
                          </td>
                          <td className="px-3 py-2">0.35</td>
                          <td className="px-3 py-2">μM</td>
                          <td className="px-3 py-2">痤疮淬灭黄金值</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2">治疗区间</td>
                          <td className="px-3 py-2">–</td>
                          <td className="px-3 py-2">0.2–0.5</td>
                          <td className="px-3 py-2">μM</td>
                          <td className="px-3 py-2">痤疮菌抑制有效范围</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2">CAMP 产生速率</td>
                          <td className="px-3 py-2">
                            <InlineMath math="k_{CAMP}" />
                          </td>
                          <td className="px-3 py-2">0.25</td>
                          <td className="px-3 py-2">μM/h·cells/mL</td>
                          <td className="px-3 py-2">细菌 CAMP 合成能力</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2">CAMP 淬灭速率</td>
                          <td className="px-3 py-2">
                            <InlineMath math="k_{quench}" />
                          </td>
                          <td className="px-3 py-2">0.07</td>
                          <td className="px-3 py-2">mL/μM·h</td>
                          <td className="px-3 py-2">单宁酸淬灭效率</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2">基础释放速率</td>
                          <td className="px-3 py-2">
                            <InlineMath math="k_{release,base}" />
                          </td>
                          <td className="px-3 py-2">0.12</td>
                          <td className="px-3 py-2">h⁻¹</td>
                          <td className="px-3 py-2">无控制时单宁酸释放</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2">PID 比例增益</td>
                          <td className="px-3 py-2">
                            <InlineMath math="K_P" />
                          </td>
                          <td className="px-3 py-2">0.12</td>
                          <td className="px-3 py-2">-</td>
                          <td className="px-3 py-2">控制响应速度</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2">PID 积分增益</td>
                          <td className="px-3 py-2">
                            <InlineMath math="K_I" />
                          </td>
                          <td className="px-3 py-2">0.02</td>
                          <td className="px-3 py-2">h⁻¹</td>
                          <td className="px-3 py-2">消除稳态误差</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2">PID 微分增益</td>
                          <td className="px-3 py-2">
                            <InlineMath math="K_D" />
                          </td>
                          <td className="px-3 py-2">0.05</td>
                          <td className="px-3 py-2">h</td>
                          <td className="px-3 py-2">抑制系统震荡</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2">单宁酸最大浓度</td>
                          <td className="px-3 py-2">
                            <InlineMath math="T_{max}" />
                          </td>
                          <td className="px-3 py-2">1.2</td>
                          <td className="px-3 py-2">mg/mL</td>
                          <td className="px-3 py-2">释放上限</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6">
                    <p className="text-xs md:text-sm text-gray-500 mb-2">
                      图：闭环控制与开环控制在 10 个给药周期（每周期 3 小时）下的 CAMP 浓度、淬灭酶浓度与分泌速率等动态对比。
                    </p>
                    <img
                      src="/model/multicycle-control.png"
                      alt="Closed-loop vs open-loop multicycle control dynamics"
                      className="w-full rounded-xl border border-gray-100 shadow-sm"
                    />
                  </div>
                  <p className="mt-2 text-xs md:text-sm text-gray-500 leading-relaxed">
                    在闭环控制下，CAMP 浓度始终低于 0.5 μM 阈值，最终稳定在约 0.167 μM，
                    而开环控制最终升高到 1.675 μM；闭环策略显著抑制了浓度震荡与累积误差，
                    更符合安全与舒适性的要求。
                  </p>
                  <p className="mt-3 text-xs md:text-sm text-gray-500">
                    多周期闭环/开环控制相关实现代码（Matlab）：
                  </p>
                  <CodeBlock
                    title="多周期给药稳态控制"
                    language="Matlab"
                    code={codeMulticycleMatlab}
                  />
                </article>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
