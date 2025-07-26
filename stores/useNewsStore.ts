import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import dayjs from 'dayjs'

export interface Summary {
  id: string
  title: string
  content: string
  date: string
  topics: string[]
  language: string
  podcastUrl?: string
  isGenerating?: boolean
}

interface NewsState {
  history: Summary[]
  activeSummaryId: string | null
  isLoading: boolean
  
  createSummary: (config: {
    topics: string[]
    dateRange: { from: string; to: string }
    language: string
  }) => Promise<void>
  
  generatePodcast: (summaryId: string) => Promise<void>
  setActiveSummary: (summaryId: string | null) => void
  addSummary: (summary: Summary) => void
}

// Datos ficticios para demo
const mockSummaries: Summary[] = [
  {
    id: '1',
    title: 'Resumen Tecnológico Semanal',
    content: 'Esta semana en tecnología: Apple presenta nuevos productos, Google anuncia mejoras en IA, y Microsoft lanza actualizaciones de seguridad importantes. El mercado de criptomonedas muestra volatilidad mientras que las startups de IA continúan atrayendo inversiones récord.',
    date: dayjs().subtract(1, 'day').toISOString(),
    topics: ['Tecnología', 'IA', 'Criptomonedas'],
    language: 'es'
  },
  {
    id: '2',
    title: 'Noticias de Economía Global',
    content: 'Los mercados globales muestran signos de recuperación tras las últimas decisiones de los bancos centrales. La inflación en Europa se mantiene estable mientras que Asia reporta crecimiento económico sostenido. Los expertos predicen un año prometedor para las economías emergentes.',
    date: dayjs().subtract(3, 'days').toISOString(),
    topics: ['Economía', 'Mercados', 'Bancos Centrales'],
    language: 'es'
  },
  {
    id: '3',
    title: 'Avances en Ciencia y Salud',
    content: 'Nuevos estudios revelan avances prometedores en tratamientos contra el cáncer. Investigadores descubren propiedades beneficiosas en compuestos naturales. La OMS actualiza sus recomendaciones sobre salud mental en el entorno digital.',
    date: dayjs().subtract(5, 'days').toISOString(),
    topics: ['Ciencia', 'Salud', 'Investigación'],
    language: 'es'
  }
]

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      history: mockSummaries,
      activeSummaryId: null,
      isLoading: false,

      createSummary: async (config) => {
        set({ isLoading: true })
        
        // Simulación de creación de resumen
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const newSummary: Summary = {
          id: Date.now().toString(),
          title: `Resumen ${config.topics.join(', ')}`,
          content: `Resumen generado sobre ${config.topics.join(', ')} para el período del ${dayjs(config.dateRange.from).format('DD/MM/YYYY')} al ${dayjs(config.dateRange.to).format('DD/MM/YYYY')}. Este contenido ha sido personalizado según tus preferencias y filtrado para evitar saturación informativa.`,
          date: new Date().toISOString(),
          topics: config.topics,
          language: config.language
        }
        
        set(state => ({
          history: [newSummary, ...state.history],
          activeSummaryId: newSummary.id,
          isLoading: false
        }))
      },

      generatePodcast: async (summaryId) => {
        set(state => ({
          history: state.history.map(summary => 
            summary.id === summaryId 
              ? { ...summary, isGenerating: true }
              : summary
          )
        }))
        
        // Simulación de generación de podcast
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        set(state => ({
          history: state.history.map(summary => 
            summary.id === summaryId 
              ? { 
                  ...summary, 
                  isGenerating: false,
                  podcastUrl: `/api/podcasts/${summaryId}.mp3`
                }
              : summary
          )
        }))
      },

      setActiveSummary: (summaryId) => {
        set({ activeSummaryId: summaryId })
      },

      addSummary: (summary) => {
        set(state => ({
          history: [summary, ...state.history]
        }))
      }
    }),
    {
      name: 'news-storage',
      partialize: (state) => ({ 
        history: state.history,
        activeSummaryId: state.activeSummaryId
      })
    }
  )
)
