"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Newspaper, BarChart3, Settings } from "lucide-react"

const navigation = [
  { name: "Noticias", href: "/app/news", icon: Newspaper },
  { name: "Dashboard", href: "/app/dashboard", icon: BarChart3 },
  { name: "Configuración", href: "/app/settings", icon: Settings },
]

interface NavSidebarProps {
  isOpen: boolean
  onClose: () => void
  onItemClick?: () => void
}

export function NavSidebar({ isOpen, onClose, onItemClick }: NavSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:block w-64 h-full bg-white border-r border-gray-200 p-4 pt-24">
      <div className="space-y-2">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <Link
                href={item.href}
                onClick={onItemClick}
                className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
        className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl"
      >
        <h3 className="font-heading font-semibold text-sm text-gray-900 mb-2">Resumen Rápido</h3>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Noticias hoy</span>
            <span className="font-medium">24</span>
          </div>
          <div className="flex justify-between">
            <span>Tiempo ahorrado</span>
            <span className="font-medium text-green-600">2.5h</span>
          </div>
          <div className="flex justify-between">
            <span>Sesgo promedio</span>
            <span className="font-medium text-blue-600">3.2/10</span>
          </div>
        </div>
      </motion.div>
    </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-70 bg-white shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-heading font-semibold text-lg">Navegación</span>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          delay: index * 0.1,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => {
                            onClose()
                            onItemClick?.()
                          }}
                          className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isActive ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
