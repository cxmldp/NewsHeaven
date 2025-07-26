"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsCard, NewsCardSkeleton } from "@/components/news-card"
import { BiasRadar } from "@/components/bias-radar"

// Mock data
const mockNews = [
  {
    id: "1",
    title: "Avances en inteligencia artificial transforman la industria tecnológica",
    summary:
      "Las últimas innovaciones en IA están revolucionando sectores desde la salud hasta la educación, prometiendo cambios significativos en la próxima década.",
    source: "TechNews",
    publishedAt: "2024-01-15T10:30:00Z",
    category: "Tecnología",
    biasScore: 2,
    readTime: 4,
    imageUrl: "/placeholder.jpg",
    url: "#",
  },
  {
    id: "2",
    title: "Nueva política económica genera debate en el congreso",
    summary:
      "Los legisladores discuten las implicaciones de las nuevas medidas fiscales propuestas por el gobierno, con opiniones divididas sobre su impacto.",
    source: "Política Hoy",
    publishedAt: "2024-01-15T09:15:00Z",
    category: "Política",
    biasScore: 7,
    readTime: 6,
    imageUrl: "/placeholder.jpg",
    url: "#",
  },
  {
    id: "3",
    title: "Descubrimiento médico ofrece esperanza para tratamiento del cáncer",
    summary:
      "Investigadores desarrollan una nueva terapia que muestra resultados prometedores en ensayos clínicos, abriendo nuevas posibilidades de tratamiento.",
    source: "Salud Global",
    publishedAt: "2024-01-15T08:45:00Z",
    category: "Salud",
    biasScore: 1,
    readTime: 5,
    imageUrl: "/placeholder.jpg",
    url: "#",
  },
]

export default function DashboardPage() {
  const [news, setNews] = useState<typeof mockNews>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setNews(mockNews)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setNews([...mockNews].sort(() => Math.random() - 0.5))
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Análisis completo de tu consumo informativo</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>Actualizar</span>
          </Button>

          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Bias Radar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-1"
        >
          <BiasRadar />
        </motion.div>

        {/* Right Column - News Feed */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-semibold text-gray-900">Noticias Analizadas</h2>
              <span className="text-sm text-gray-500">{news.length} artículos</span>
            </div>

            <div className="space-y-6">
              {isLoading
                ? // Skeleton loading
                  Array.from({ length: 3 }).map((_, index) => <NewsCardSkeleton key={index} />)
                : // News cards
                  news.map((item, index) => <NewsCard key={item.id} news={item} index={index} />)}
            </div>

            {!isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                className="text-center mt-8"
              >
                <Button variant="outline" onClick={handleRefresh} className="px-8 bg-transparent">
                  Cargar más noticias
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
