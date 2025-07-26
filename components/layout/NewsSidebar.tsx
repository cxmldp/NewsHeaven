"use client"

import { motion } from 'framer-motion'
import { useNewsStore, type Summary } from '@/stores/useNewsStore'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// Configurar dayjs con el plugin de tiempo relativo
dayjs.extend(relativeTime)

interface NewsSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function NewsSidebar({ isOpen, onClose }: NewsSidebarProps) {
  const { history, activeSummaryId, setActiveSummary } = useNewsStore()

  const handleSummaryClick = (summary: Summary) => {
    setActiveSummary(summary.id)
    onClose()
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 bg-white border-r border-gray-200 p-4">
        <div className="mb-6">
          <h2 className="font-heading font-semibold text-lg text-gray-900 mb-2">Historias</h2>
          <p className="text-sm text-gray-600">Tus resúmenes personalizados</p>
        </div>

        <div className="space-y-3">
          {history.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <button
                onClick={() => handleSummaryClick(summary)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  activeSummaryId === summary.id
                    ? 'border-blue-200 bg-blue-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium text-gray-900 line-clamp-1 mb-2">
                  {summary.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{dayjs(summary.date).isValid() ? dayjs(summary.date).fromNow() : 'Reciente'}</span>
                  <div className="flex items-center space-x-1">
                    {summary.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                    {summary.topics.length > 2 && (
                      <span className="text-xs text-gray-400">
                        +{summary.topics.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-80 bg-white shadow-xl md:hidden"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-heading font-semibold text-lg">Historias</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full">
          <div className="space-y-3">
            {history.map((summary, index) => (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <button
                  onClick={() => handleSummaryClick(summary)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    activeSummaryId === summary.id
                      ? 'border-blue-200 bg-blue-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-medium text-gray-900 line-clamp-1 mb-2">
                    {summary.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{dayjs(summary.date).isValid() ? dayjs(summary.date).fromNow() : 'Reciente'}</span>
                    <div className="flex items-center space-x-1">
                      {summary.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                      {summary.topics.length > 2 && (
                        <span className="text-xs text-gray-400">
                          +{summary.topics.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  )
}
