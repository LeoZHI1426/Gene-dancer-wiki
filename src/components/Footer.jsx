import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-12 md:py-16 px-6 md:px-10 lg:px-20 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <div
            className="w-12 h-12 rounded-xl bg-soft-cyan flex items-center justify-center text-healing-teal font-semibold text-lg"
            aria-hidden
          >
            GD
          </div>
          <span className="font-semibold text-gray-800 tracking-title">Gene dancer</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-500 text-center md:text-right max-w-xl"
        >
          This project was developed as part of the International Genetically Engineered Machine (iGEM) competition.
          The information on this wiki is for educational and project presentation purposes. 2026 iGEM — Official
          Disclaimer applies.
        </motion.p>
      </div>
    </footer>
  )
}
