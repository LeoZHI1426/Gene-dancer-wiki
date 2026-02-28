import { motion } from 'framer-motion'

const members = [
  {
    id: 'liuchang',
    name: '刘畅',
    role: '基因线路设计 · 实验设计',
    avatar: '/team/liuchang.png',
  },
  {
    id: 'wuhaozhi',
    name: '吴浩轾',
    role: '网页制作 · 交互设计',
    avatar: '/team/wuhaozhi.png',
  },
  {
    id: 'wanggeyang',
    name: '王葛阳',
    role: '数学建模 · 数据分析',
    avatar: '/team/wanggeyang.png',
  },
]

const contributions = [
  {
    name: '刘畅',
    items: ['负责工程菌基因线路整体设计与优化', '搭建关键实验流程与对照组方案', '参与撰写项目生物学背景与设计思路'],
  },
  {
    name: '吴浩轾',
    items: ['主导 Gene dancer Wiki 整体架构与前端实现', '根据人类实践反馈迭代页面内容与交互细节', '协同完成图形素材与可视化呈现'],
  },
  {
    name: '王葛阳',
    items: ['构建痤疮炎症与治疗闭环的数学模型', '对水凝胶释放和工程菌响应进行参数分析', '输出建模结果与不确定性评估用于指导实验设计'],
  },
]

export default function TeamPage() {
  return (
    <section
      className="relative min-h-screen px-6 md:px-10 lg:px-20 pt-28 pb-20 lg:pt-32 lg:pb-28 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 0% 0%, rgba(129, 230, 217, 0.24), transparent 55%), radial-gradient(circle at 100% 20%, rgba(190, 227, 248, 0.26), transparent 55%), radial-gradient(circle at 50% 100%, rgba(252, 246, 189, 0.26), transparent 60%), linear-gradient(to bottom, #F9FAFB, #FFFFFF)',
      }}
    >
      {/* subtle blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-32 top-10 w-64 h-64 bg-soft-cyan/40 blur-3xl rounded-full" />
        <div className="absolute right-0 top-40 w-72 h-72 bg-teal-100/50 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-amber-50/70 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-teal-500 mb-3">
            Gene dancer · Team
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-title text-teal-900 mb-3">
            团队
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
            Gene dancer 团队由合成生物学、材料科学、建模与人类实践等多个方向的成员组成，我们希望用一枚小小的智能痘痘贴，连接实验室与真实生活。
          </p>
        </header>

        {/* Members row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-stretch gap-6 sm:flex-row sm:justify-center sm:gap-8"
        >
          {members.map((member, index) => {
            const orderClass =
              member.id === 'liuchang'
                ? 'sm:order-2'
                : member.id === 'wuhaozhi'
                ? 'sm:order-1'
                : 'sm:order-3'

            return (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
                className={`relative rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md shadow-sm px-4 pt-5 pb-6 flex flex-col items-center text-center sm:w-60 ${orderClass}`}
              >
              {/* avatar */}
              {member.avatar ? (
                <div className="w-20 h-20 mb-4 rounded-2xl overflow-hidden bg-soft-cyan/60 flex items-center justify-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 mb-4 rounded-2xl bg-soft-cyan/70 flex items-center justify-center text-teal-700 text-sm font-semibold">
                  Avatar
                </div>
              )}
              <h2 className="text-base md:text-lg font-semibold text-teal-900 mb-1">
                {member.name}
              </h2>
              <p className="text-xs md:text-sm text-teal-700/90 leading-relaxed">
                {member.role}
              </p>
                {/* speech bubble tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-white/50 backdrop-blur-md border border-white/50 rounded-md rotate-45 shadow-sm" />
              </motion.article>
            )
          })}
        </motion.div>

        {/* Contributions card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md shadow-md px-6 py-7 md:px-10 md:py-9"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-teal-900 tracking-title mb-4 md:mb-6 text-center">
            团队贡献
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-sm md:text-base">
            {contributions.map((block) => (
              <div key={block.name}>
                <h3 className="text-base font-semibold text-teal-800 mb-2">{block.name}</h3>
                <ul className="list-disc list-inside space-y-1.5 text-gray-800 leading-relaxed">
                  {block.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  )
}

