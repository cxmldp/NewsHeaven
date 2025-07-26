"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSessionStore } from '@/stores/useSessionStore'
import { Header } from './header'
import { NavSidebar } from './NavSidebar'
import { Footer } from './footer'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useSessionStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo */}
      <Header 
        user={user} 
        onLogout={logout}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex">
        {/* NavSidebar */}
        <NavSidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Contenido principal */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] pt-24">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
