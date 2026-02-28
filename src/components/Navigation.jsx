import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'project', label: '项目' },
  { id: 'tech', label: '技术' },
  { id: 'hp', label: '人类实践' },
  { id: 'team', label: '团队' },
]

export default function Navigation({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav
        className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-4 rounded-b-2xl mx-4 mt-2 md:mx-8 md:mt-4"
        style={{
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        <a href="#" className="text-xl font-semibold tracking-title text-gray-800">
          Gene dancer
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate && onNavigate(item.id)}
              className={`text-base font-semibold tracking-title transition-colors ${
                currentPage === item.id ? 'text-healing-teal' : 'text-black hover:text-healing-teal'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            className={`hidden md:inline-flex items-center px-4 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
              currentPage === 'home'
                ? 'bg-healing-teal text-white shadow-md shadow-healing-teal/25'
                : 'bg-healing-teal text-white hover:shadow-lg hover:shadow-healing-teal/30'
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Home
          </motion.button>
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[72px] left-4 right-4 rounded-xl overflow-hidden shadow-xl border border-gray-100"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="p-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate && onNavigate(item.id)
                    setMobileOpen(false)
                  }}
                  className={`block w-full text-left text-base font-semibold tracking-title py-2 ${
                    currentPage === item.id
                      ? 'text-healing-teal'
                      : 'text-black hover:text-healing-teal'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  onNavigate && onNavigate('home')
                  setMobileOpen(false)
                }}
                className="mt-2 flex justify-center items-center w-full py-3 rounded-full bg-healing-teal text-white text-sm font-semibold"
                whileTap={{ scale: 0.98 }}
              >
                Home
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
