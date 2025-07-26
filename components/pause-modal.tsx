"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Coffee, Moon, Sunrise } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PauseModalProps {
  isOpen: boolean
  onClose: () => void
}

const pauseOptions = [
  {
    id: "short",
    title: "Pausa Corta",
    description: "15 minutos de descanso",
    duration: 15,
    icon: Coffee,
    color: "bg-blue-500",
  },
  {
    id: "medium",
    title: "Pausa Media",
    description: "1 hora sin noticias",
    duration: 60,
    icon: Clock,
    color: "bg-teal-500",
  },
  {
    id: "evening",
    title: "Modo Noche",
    description: "Hasta mañana a las 8:00",
    duration: "night",
    icon: Moon,
    color: "bg-indigo-500",
  },
  {
    id: "weekend",
    title: "Fin de Semana",
    description: "Descanso hasta el lunes",
    duration: "weekend",
    icon: Sunrise,
    color: "bg-orange-500",
  },
]

export function PauseModal({ isOpen, onClose }: PauseModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isActivating, setIsActivating] = useState(false)

  const handleActivatePause = async () => {
    if (!selectedOption) return

    setIsActivating(true)

    // Simular activación
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsActivating(false)
    onClose()
    setSelectedOption(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Modo Pausa</DialogTitle>
          <DialogDescription>Tómate un descanso de las noticias. Elige cuánto tiempo necesitas.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-6">
          {pauseOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedOption === option.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${option.color} text-white`}>
                  <option.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                {selectedOption === option.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={isActivating}>
            Cancelar
          </Button>
          <Button
            onClick={handleActivatePause}
            disabled={!selectedOption || isActivating}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isActivating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "Activar Pausa"
            )}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            💡 <strong>Consejo:</strong> Durante la pausa, te sugeriremos actividades relajantes y contenido positivo.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
