"use client"

import { motion } from "framer-motion"
import { Clock, ExternalLink, TrendingUp, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  category: string
  biasScore: number
  readTime: number
  imageUrl?: string
  url: string
}

interface NewsCardProps {
  news: NewsItem
  index: number
}

export function NewsCard({ news, index }: NewsCardProps) {
  const getBiasColor = (score: number) => {
    if (score <= 3) return "bg-green-100 text-green-800"
    if (score <= 6) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getBiasLabel = (score: number) => {
    if (score <= 3) return "Neutral"
    if (score <= 6) return "Moderado"
    return "Alto sesgo"
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      {news.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={news.imageUrl || "/placeholder.jpg"}
            alt={news.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {news.category}
            </Badge>
            <Badge className={`text-xs ${getBiasColor(news.biasScore)}`}>
              <AlertCircle className="h-3 w-3 mr-1" />
              {getBiasLabel(news.biasScore)}
            </Badge>
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            {news.readTime} min
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{news.title}</h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.summary}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span className="font-medium">{news.source}</span>
            <span>•</span>
            <time>{new Date(news.publishedAt).toLocaleDateString("es-ES")}</time>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <TrendingUp className="h-4 w-4 mr-1" />
              Analizar
            </Button>

            <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-700 hover:bg-gray-50">
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// Skeleton loader component
export function NewsCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden animate-pulse">
      <div className="aspect-video w-full bg-gray-200" />
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="flex space-x-2">
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
