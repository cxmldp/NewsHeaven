"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Globe, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNewsStore } from '@/stores/useNewsStore'

interface SummaryConfigModalProps {
  isOpen: boolean
  onClose: () => void
}

const availableTopics = [
  'Tecnología', 'Economía', 'Política', 'Ciencia', 'Salud', 
  'Deportes', 'Entretenimiento', 'Internacional', 'Medio Ambiente',
  'Educación', 'Cultura', 'Sociedad'
]

const languages = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'Inglés' },
  { code: 'fr', name: 'Francés' },
  { code: 'de', name: 'Alemán' }
]

export function SummaryConfigModal({ isOpen, onClose }: SummaryConfigModalProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  })
  const [selectedLanguage, setSelectedLanguage] = useState('es')
  const [isCreating, setIsCreating] = useState(false)

  const { createSummary } = useNewsStore()

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  const handleCreateSummary = async () => {
    if (selectedTopics.length === 0) return

    setIsCreating(true)
    try {
      await createSummary({
        topics: selectedTopics,
        dateRange,
        language: selectedLanguage
      })
      onClose()
      // Reset form
      setSelectedTopics([])
      setDateRange({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0]
      })
      setSelectedLanguage('es')
    } catch (error) {
      console.error('Error creating summary:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="font-heading font-semibold text-xl text-gray-900">
                    Configurar Resumen
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Personaliza tu resumen de noticias
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
                {/* Temas */}
                <div>
                  <Label className="flex items-center space-x-2 mb-3">
                    <Tag className="h-4 w-4" />
                    <span className="font-medium">Temas de interés</span>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicToggle(topic)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedTopics.includes(topic)
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                            : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rango de fechas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Desde</span>
                    </Label>
                    <Input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Hasta</span>
                    </Label>
                    <Input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Idioma */}
                <div>
                  <Label className="flex items-center space-x-2 mb-3">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">Idioma</span>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedLanguage === lang.code
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                            : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isCreating}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateSummary}
                  disabled={selectedTopics.length === 0 || isCreating}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creando...
                    </>
                  ) : (
                    'Crear Resumen'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
