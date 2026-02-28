import { motion } from 'framer-motion'
import { Target, Flame, Clock } from 'lucide-react'

const ITEMS = [
  {
    icon: Target,
    title: '缺乏精准性',
    description: '传统治疗难以做到空间精准，易波及健康皮肤，且无法仅在痤疮微环境中起效。',
  },
  {
    icon: Flame,
    title: '刺激与损伤',
    description: '广谱药物或酸类易导致干燥、敏感与皮肤屏障受损，影响长期依从性。',
  },
  {
    icon: Clock,
    title: '被动给药',
    description: '固定剂量无法随炎症实时变化调节，易造成过量或不足，难以从根源改善痤疮。',
  },
]

export default function Problem() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-bg-light">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-semibold tracking-title text-center text-gray-900 mb-4"
      >
        我们面对的问题
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-center text-gray-600 max-w-2xl mx-auto mb-16"
      >
        传统痤疮疗法的局限
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-healing-teal/20 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-soft-cyan flex items-center justify-center text-healing-teal mb-4">
              <item.icon className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 tracking-title mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
