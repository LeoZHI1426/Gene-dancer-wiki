import { motion } from 'framer-motion'
import { Droplets, Dna, ShieldCheck } from 'lucide-react'

const BENTO_ITEMS = [
  {
    id: 'hydrogel',
    title: '水凝胶三层结构',
    subtitle: '材料创新',
    description: '基于海藻酸盐的 Ugi-Alg-PBA 水凝胶：内部营养层支持工程菌生长，中间过渡层负责信号传递与产物释放，外部抑制层（硝酸纤维素）防止工程菌逃逸，确保与外界交流的同时不污染皮肤。',
    icon: Droplets,
    className: 'md:col-span-2',
  },
  {
    id: 'circuit',
    title: '双输入 AND 门',
    subtitle: '生物学编程',
    description: '油脂 + 低 pH 双重验证，仅在两信号同时存在时激活；分裂 T7 RNA 聚合酶实现物理层面 AND 门逻辑与信号级联放大；抗毒力策略只降解 CAMP 致炎因子，不杀死细菌，保护皮肤微生态。',
    icon: Dna,
    className: 'md:col-span-1',
  },
  {
    id: 'biocontainment',
    title: '双重安全保障',
    subtitle: '安全设计',
    description: '水凝胶封装实现物理隔绝；pE194ts 温控复制子在 37℃ 下质粒丢失，确保工程菌在使用后不持久残留。从材料与遗传双重维度保障使用安全。',
    icon: ShieldCheck,
    className: 'md:col-span-2',
  },
]

export default function Innovation() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-bg-light">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-semibold tracking-title text-center text-gray-900 mb-4"
      >
        核心创新
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-center text-gray-600 max-w-2xl mx-auto mb-16"
      >
        智能痘痘贴设计的三大支柱
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
        {BENTO_ITEMS.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * i, duration: 0.5 }}
            className={`rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm hover:shadow-md hover:border-healing-teal/20 transition-all duration-300 ${item.className}`}
          >
            <div className="w-12 h-12 rounded-xl bg-soft-cyan flex items-center justify-center text-healing-teal mb-4">
              <item.icon className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-medium tracking-wide text-healing-teal uppercase mb-1">{item.subtitle}</p>
            <h3 className="text-lg font-semibold text-gray-900 tracking-title mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
