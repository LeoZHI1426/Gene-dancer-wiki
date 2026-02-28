import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HP_NAV_ITEMS = [
  { id: "section-experts", label: "通信/专家访谈" },
  { id: "section-survey", label: "社区调研" },
];

const experts = [
  {
    id: "dermatologist",
    name: "皮肤科临床专家",
    title: "Expert · Dermatology",
    takeaway:
      "专家强调，痤疮治疗不仅要关注短期炎症消退，更要兼顾皮肤屏障长期稳定。相比大范围涂抹药膏，一种能够在局部、温和地调节炎症的智能贴片，有望减少红斑、干燥等不良反应，同时提高依从性。",
  },
  {
    id: "synbio",
    name: "合成生物学研究者",
    title: "Expert · Synthetic Biology",
    takeaway:
      "在与合成生物学专家的讨论中，我们确认了将工程菌封装在水凝胶中的策略能够在一定程度上降低环境释放风险，并通过合理设计感应模块和安全开关，实现“只在需要时激活”的生物回路，有助于提升项目的可行性与社会接受度。",
  },
  {
    id: "regulation",
    name: "法规与伦理顾问",
    title: "Expert · Bioethics & Regulation",
    takeaway:
      "法规顾问提醒我们，在面向真实用户前，需要充分考虑工程菌产品在化妆品与医疗器械之间的监管定位，以及对用户知情同意、使用场景说明和风险沟通的要求。因此，我们在设计中加入了更明确的封装策略与使用说明，以响应潜在监管框架。",
  },
];

const SURVEY_TOTAL = 48;

/** 单选题格式：{ question, options: [{ label, count, pct }] }；多选题 pct 可为超过 100% */
const surveyQuestions = [
  {
    id: "q1",
    question: "您的性别是？",
    options: [
      { label: "男", count: 16, pct: 33.3 },
      { label: "女", count: 32, pct: 66.7 },
    ],
  },
  {
    id: "q2",
    question: "您的年龄段是？",
    options: [
      { label: "18岁以下", count: 4, pct: 8.3 },
      { label: "18-25岁", count: 31, pct: 64.6 },
      { label: "26-35岁", count: 10, pct: 20.8 },
      { label: "36-45岁", count: 2, pct: 4.2 },
      { label: "45岁以上", count: 1, pct: 2.1 },
    ],
  },
  {
    id: "q3",
    question: "您的职业是？",
    options: [
      { label: "学生", count: 31, pct: 64.6 },
      { label: "医护人员", count: 2, pct: 4.2 },
      { label: "教师", count: 2, pct: 4.2 },
      { label: "企事业员工", count: 7, pct: 14.6 },
      { label: "自由职业者", count: 2, pct: 4.2 },
      { label: "其他", count: 4, pct: 8.3 },
    ],
  },
  {
    id: "q4",
    question: "您是否曾患有痤疮（青春痘、痘痘、粉刺等）？",
    options: [
      { label: "是", count: 41, pct: 85.4 },
      { label: "否", count: 7, pct: 14.6 },
    ],
  },
  {
    id: "q5",
    question: "您如何评价自己的痤疮状况？",
    options: [
      { label: "轻度", count: 19, pct: 39.6 },
      { label: "中度", count: 19, pct: 39.6 },
      { label: "重度", count: 5, pct: 10.4 },
      { label: "从未有过", count: 5, pct: 10.4 },
    ],
  },
  {
    id: "q6",
    question: "您曾采取过哪些方式治疗或改善痤疮？（多选）",
    options: [
      { label: "药物治疗（口服/外用）", count: 29, pct: 60.4 },
      { label: "医美手段（激光、果酸换肤等）", count: 15, pct: 31.3 },
      { label: "护肤品（祛痘、控油等）", count: 41, pct: 85.4 },
      { label: "饮食调理", count: 22, pct: 45.8 },
      { label: "生活习惯改善", count: 19, pct: 39.6 },
      { label: "其他", count: 2, pct: 4.2 },
    ],
  },
  {
    id: "q7",
    question: "您认为治疗痤疮最有效的方式是？",
    options: [
      { label: "药物治疗（口服/外用）", count: 22, pct: 45.8 },
      { label: "医美手段（激光、果酸换肤等）", count: 12, pct: 25.0 },
      { label: "护肤品（祛痘、控油等）", count: 29, pct: 60.4 },
      { label: "饮食调理", count: 19, pct: 39.6 },
      { label: "生活习惯改善", count: 14, pct: 29.2 },
      { label: "其他", count: 2, pct: 4.2 },
    ],
  },
  {
    id: "q8",
    question: "您认为导致痤疮的主要原因有哪些？（多选）",
    options: [
      { label: "遗传因素", count: 17, pct: 35.4 },
      { label: "内分泌失调", count: 34, pct: 70.8 },
      { label: "饮食不当", count: 29, pct: 60.4 },
      { label: "细菌感染", count: 19, pct: 39.6 },
      { label: "压力过大", count: 24, pct: 50.0 },
      { label: "清洁不当", count: 22, pct: 45.8 },
      { label: "其他", count: 1, pct: 2.1 },
    ],
  },
  {
    id: "q9",
    question: "您是否了解过合成生物学相关知识？",
    options: [
      { label: "是", count: 14, pct: 29.2 },
      { label: "否", count: 34, pct: 70.8 },
    ],
  },
  {
    id: "q10",
    question: "如果有一种利用合成生物学技术研发的生物凝胶可用于治疗痤疮，您是否会考虑使用？",
    options: [
      { label: "会", count: 31, pct: 64.6 },
      { label: "不会", count: 2, pct: 4.2 },
      { label: "持观望态度", count: 15, pct: 31.3 },
    ],
  },
  {
    id: "q11",
    question: "您认为利用合成生物学技术治疗痤疮的优势是什么？（多选）",
    options: [
      { label: "靶向性强", count: 26, pct: 54.2 },
      { label: "副作用小", count: 36, pct: 75.0 },
      { label: "治疗效果好", count: 29, pct: 60.4 },
      { label: "创新性强", count: 19, pct: 39.6 },
      { label: "其他", count: 0, pct: 0.0 },
    ],
  },
  {
    id: "q12",
    question: "您对合成生物学技术应用于医疗领域持何种态度？",
    options: [
      { label: "支持", count: 34, pct: 70.8 },
      { label: "中立", count: 12, pct: 25.0 },
      { label: "反对", count: 2, pct: 4.2 },
    ],
  },
];

function SurveyBar({ label, count, pct, maxPct = 100 }) {
  const widthPct = maxPct > 0 ? Math.min(100, (pct / maxPct) * 100) : 0;
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-full max-w-[200px] md:max-w-[280px] text-sm text-gray-700 shrink-0">
        {label}
      </span>
      <div className="flex-1 min-w-0 h-6 bg-gray-100 rounded-md overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-md transition-all duration-500"
          style={{ width: `${widthPct}%` }}
        />
      </div>
      <span className="text-xs md:text-sm text-gray-600 shrink-0 tabular-nums">
        {count} 人（{pct}%）
      </span>
    </div>
  );
}

export default function HumanPracticesPage() {
  const [activeNav, setActiveNav] = useState("section-experts");

  useEffect(() => {
    const updateActive = () => {
      const triggerTop = 140;
      const withRect = HP_NAV_ITEMS.map((item) => ({
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
          : withRect.find((r) => r.bottom > 0)?.id ?? HP_NAV_ITEMS[0].id;
      setActiveNav(current);
    };
    const observer = new IntersectionObserver(
      () => updateActive(),
      { rootMargin: "-100px 0px -40% 0px", threshold: 0 }
    );
    HP_NAV_ITEMS.forEach((item) => {
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
              人类实践
            </h2>
            <nav className="space-y-1 text-sm">
              {HP_NAV_ITEMS.map((item) => (
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
                Gene dancer · Human Practices
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-title text-teal-900 mb-3">
                人类实践
              </h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
                我们通过与皮肤科医生、合成生物学学者以及法规与伦理专家的对话，并开展社区问卷调研，不断修正
                Gene dancer 的技术路径与应用场景，确保项目同时回应真实患者需求与社会关切。
              </p>
            </header>

            {/* 专家访谈 */}
            <section id="section-experts" className="scroll-mt-32 mb-12">
              <h2 className="text-xl md:text-2xl font-semibold text-teal-700 tracking-title mb-6">
                通信 / 专家访谈
              </h2>
              <div className="space-y-6">
                {experts.map((expert) => (
                  <article
                    key={expert.id}
                    className="rounded-2xl bg-white shadow-sm border border-teal-50 hover:border-teal-200/70 hover:shadow-md transition-shadow transition-colors duration-200 p-5 md:p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                      <div className="w-20 h-20 rounded-2xl bg-soft-cyan/70 flex-shrink-0 flex items-center justify-center text-teal-700 text-sm font-semibold">
                        Avatar
                      </div>
                      <div className="flex-1">
                        <div className="mb-2">
                          <h3 className="text-base md:text-lg font-semibold text-teal-900">
                            {expert.name}
                          </h3>
                          <p className="text-xs md:text-sm text-teal-600 mt-0.5">
                            {expert.title}
                          </p>
                        </div>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          <span className="font-semibold text-teal-800 mr-1">
                            Takeaway：
                          </span>
                          {expert.takeaway}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* 社区调研问卷 */}
            <section id="section-survey" className="scroll-mt-32">
              <h2 className="text-xl md:text-2xl font-semibold text-teal-700 tracking-title mb-2">
                社区调研
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                为了解公众对痤疮认知、治疗方式及对合成生物学应用于痤疮治疗的态度，我们开展了社区问卷调查，共回收有效问卷{" "}
                <strong className="text-teal-700">{SURVEY_TOTAL}</strong> 份。以下为各题统计结果。
              </p>
              <div className="space-y-8">
                {surveyQuestions.map((q, idx) => {
                  const maxPct = Math.max(...q.options.map((o) => o.pct), 1);
                  return (
                    <article
                      key={q.id}
                      className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 md:p-6"
                    >
                      <h3 className="text-sm md:text-base font-semibold text-teal-800 mb-4">
                        {idx + 1}. {q.question}
                      </h3>
                      <div className="space-y-0">
                        {q.options.map((opt) => (
                          <SurveyBar
                            key={opt.label}
                            label={opt.label}
                            count={opt.count}
                            pct={opt.pct}
                            maxPct={maxPct}
                          />
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
