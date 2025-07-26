"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BiasData {
  category: string
  score: number
  trend: "up" | "down" | "stable"
  color: string
}

const biasData: BiasData[] = [
  { category: "Política", score: 7, trend: "up", color: "#EF4444" },
  { category: "Economía", score: 4, trend: "down", color: "#F59E0B" },
  { category: "Tecnología", score: 2, trend: "stable", color: "#10B981" },
  { category: "Salud", score: 3, trend: "down", color: "#3B82F6" },
  { category: "Deportes", score: 1, trend: "stable", color: "#8B5CF6" },
]

export function BiasRadar() {
  const maxScore = 10
  const centerX = 120
  const centerY = 120
  const radius = 80

  const getCoordinates = (index: number, score: number) => {
    const angle = (index * 2 * Math.PI) / biasData.length - Math.PI / 2
    const distance = (score / maxScore) * radius
    return {
      x: centerX + distance * Math.cos(angle),
      y: centerY + distance * Math.sin(angle),
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-red-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-green-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const averageScore = biasData.reduce((sum, item) => sum + item.score, 0) / biasData.length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md border border-gray-200 p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-gray-900">Radar de Sesgo</h3>
          <p className="text-sm text-gray-600">Análisis de tu consumo informativo</p>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                El radar muestra el nivel de sesgo en diferentes categorías. Valores más altos indican mayor sesgo
                detectado.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {/* Radar Chart */}
        <div className="relative">
          <svg width="240" height="240" className="overflow-visible">
            {/* Grid circles */}
            {[2, 4, 6, 8, 10].map((value) => (
              <circle
                key={value}
                cx={centerX}
                cy={centerY}
                r={(value / maxScore) * radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            ))}

            {/* Grid lines */}
            {biasData.map((_, index) => {
              const angle = (index * 2 * Math.PI) / biasData.length - Math.PI / 2
              const endX = centerX + radius * Math.cos(angle)
              const endY = centerY + radius * Math.sin(angle)

              return <line key={index} x1={centerX} y1={centerY} x2={endX} y2={endY} stroke="#E5E7EB" strokeWidth="1" />
            })}

            {/* Data polygon */}
            <motion.polygon
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              points={biasData
                .map((item, index) => {
                  const coords = getCoordinates(index, item.score)
                  return `${coords.x},${coords.y}`
                })
                .join(" ")}
              fill="rgba(37, 99, 235, 0.1)"
              stroke="#2563EB"
              strokeWidth="2"
            />

            {/* Data points */}
            {biasData.map((item, index) => {
              const coords = getCoordinates(index, item.score)
              return (
                <motion.circle
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: 0.3 + index * 0.1,
                  }}
                  cx={coords.x}
                  cy={coords.y}
                  r="6"
                  fill={item.color}
                  stroke="white"
                  strokeWidth="2"
                />
              )
            })}

            {/* Labels */}
            {biasData.map((item, index) => {
              const angle = (index * 2 * Math.PI) / biasData.length - Math.PI / 2
              const labelDistance = radius + 25
              const labelX = centerX + labelDistance * Math.cos(angle)
              const labelY = centerY + labelDistance * Math.sin(angle)

              return (
                <text
                  key={index}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-gray-700"
                >
                  {item.category}
                </text>
              )
            })}
          </svg>
        </div>

        {/* Legend and Stats */}
        <div className="w-full space-y-3">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-heading font-medium text-gray-900 mb-2">Puntuación General</h4>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}</div>
              <div className="text-sm text-gray-600">/10</div>
              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  averageScore <= 3
                    ? "bg-green-100 text-green-800"
                    : averageScore <= 6
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {averageScore <= 3 ? "Excelente" : averageScore <= 6 ? "Moderado" : "Alto sesgo"}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-heading font-medium text-gray-900 text-sm">Por Categoría</h4>
            {biasData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.4 + index * 0.1,
                }}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{item.score}/10</span>
                  {getTrendIcon(item.trend)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
