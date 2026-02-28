import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Cpu, Droplets } from 'lucide-react'

const STAGES = [
  {
    id: 'sense',
    label: '感知',
    icon: Activity,
    description:
      '水凝胶贴片与皮肤微环境接触。感知模块：P_fap（油脂诱导）与 P_asr（低 pH 诱导）分别响应痤疮部位的高油脂与弱酸性（pH 5.5–6.0），实现双输入环境信号读取，确保仅在痤疮毛囊微环境中被激活。',
  },
  {
    id: 'process',
    label: '计算',
    icon: Cpu,
    description:
      '两个启动子分别表达 T7 RNA 聚合酶的 N 端与 C 端片段，只有油脂与低 pH 两个信号同时存在时，两段才互补组装成有活性的完整 T7 RNA 聚合酶，实现物理层面的 AND 门逻辑与信号级联放大。',
  },
  {
    id: 'release',
    label: '响应',
    icon: Droplets,
    description:
      '有活性的 T7 RNA 聚合酶识别 T7 启动子，驱动 AiiA 酶与 RFP 的表达。AiiA 通过 SspB 信号肽分泌到胞外，降解痤疮丙酸杆菌的 CAMP 致炎因子；RFP 用于实时监测回路激活。炎症消退、油脂与 pH 恢复正常时，回路自动关闭。',
  },
]

export default function HowItWorks() {
  const [activeId, setActiveId] = useState('sense')
  const active = STAGES.find((s) => s.id === activeId) || STAGES[0]

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-semibold tracking-title text-center text-gray-900 mb-4"
      >
        生物学回路：感知 → 计算 → 响应
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-center text-gray-600 max-w-2xl mx-auto mb-14"
      >
        点击各阶段了解从感知到响应的设计原理
      </motion.p>

      {/* Progress bar + stages */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start gap-2 md:gap-4 mb-12">
          {STAGES.map((stage, i) => (
            <motion.button
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              onClick={() => setActiveId(stage.id)}
              className={`flex-1 flex flex-col items-center group transition-colors ${
                activeId === stage.id ? 'text-healing-teal' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                  activeId === stage.id
                    ? 'bg-healing-teal text-white shadow-lg shadow-healing-teal/30'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-soft-cyan'
                }`}
              >
                <stage.icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium tracking-wide">{stage.label}</span>
              {i < STAGES.length - 1 && (
                <div className="hidden md:block flex-1 min-w-[40px] h-0.5 mt-6 mx-1 bg-gray-200 rounded" />
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="relative min-h-[160px] md:min-h-[140px] p-6 rounded-2xl border border-gray-100 bg-bg-light"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-4"
            >
              <active.icon className="w-8 h-8 text-healing-teal shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-gray-700 leading-relaxed">{active.description}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
