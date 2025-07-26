"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, CheckCircle, Loader2 } from 'lucide-react'

interface PodcastGeneratingToastProps {
  isVisible: boolean
  onComplete: () => void
}

export function PodcastGeneratingToast({ isVisible, onComplete }: PodcastGeneratingToastProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isVisible && !isComplete) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsComplete(true)
            setTimeout(onComplete, 2000)
            return 100
          }
          return prev + Math.random() * 15 + 5
        })
      }, 500)

      return () => clearInterval(interval)
    }
  }, [isVisible, isComplete, onComplete])

  useEffect(() => {
    if (isVisible) {
      setProgress(0)
      setIsComplete(false)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-80"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {isComplete ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <div className="relative">
                  <Mic className="h-6 w-6 text-blue-600" />
                  <Loader2 className="h-4 w-4 text-blue-600 animate-spin absolute -top-1 -right-1" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">
                {isComplete ? 'Podcast Generado' : 'Generando Podcast IA'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {isComplete 
                  ? 'Tu podcast personalizado está listo'
                  : 'Procesando audio y optimizando contenido...'
                }
              </p>

              {!isComplete && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round(progress)}% completado
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
