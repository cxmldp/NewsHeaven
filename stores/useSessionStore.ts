import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface SessionState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        
        // Simulación de login para demo
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (email === 'demo@newshaven.com' && password === 'demo123') {
          const user: User = {
            id: '1',
            name: 'Usuario Demo',
            email: 'demo@newshaven.com',
            avatar: '/placeholder-user.jpg'
          }
          set({ user, isAuthenticated: true, isLoading: false })
          return true
        }
        
        set({ isLoading: false })
        return false
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      }
    }),
    {
      name: 'session-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
)
