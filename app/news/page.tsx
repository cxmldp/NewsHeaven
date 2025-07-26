"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, FileText, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NewsSidebar } from '@/components/layout/NewsSidebar'
import { FloatingActionButton } from '@/components/buttons/FloatingActionButton'
import { SummaryConfigModal } from '@/components/modals/SummaryConfigModal'
import { PodcastGeneratingToast } from '@/components/toast/PodcastGeneratingToast'
import { useNewsStore } from '@/stores/useNewsStore'
import dayjs from 'dayjs'

export default function NewsPage() {
  const [newsSidebarOpen, setNewsSidebarOpen] = useState(false)
  const [configModalOpen, setConfigModalOpen] = useState(false)
  const [showPodcastToast, setShowPodcastToast] = useState(false)
  
  const { 
    history, 
    activeSummaryId, 
    generatePodcast,
    setActiveSummary 
  } = useNewsStore()

  const activeSummary = history.find(summary => summary.id === activeSummaryId)

  const handleGeneratePodcast = async () => {
    if (!activeSummaryId) return
    
    setShowPodcastToast(true)
    await generatePodcast(activeSummaryId)
  }

  const handlePodcastComplete = () => {
    setShowPodcastToast(false)
  }

  return (
    <div className="flex h-full">
      {/* NewsSidebar */}
      <NewsSidebar 
        isOpen={newsSidebarOpen}
        onClose={() => setNewsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-gray-200 bg-white">
          <Button
            variant="outline"
            onClick={() => setNewsSidebarOpen(true)}
            className="w-full justify-start"
          >
            <FileText className="h-4 w-4 mr-2" />
            Ver historias ({history.length})
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {!activeSummary ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-md"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-12 w-12 text-blue-600" />
                </div>
                
                <h2 className="font-heading font-semibold text-2xl text-gray-900 mb-3">
                  Crea tu primer resumen
                </h2>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Genera un resumen personalizado de noticias basado en tus intereses y preferencias. 
                  Selecciona temas, fechas e idioma para comenzar.
                </p>

                <Button
                  onClick={() => setConfigModalOpen(true)}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Crear Resumen
                </Button>
              </motion.div>
            </div>
          ) : (
            // Summary Content
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              {/* Summary Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="font-heading font-bold text-3xl text-gray-900 mb-2">
                      {activeSummary.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{dayjs(activeSummary.date).format('DD/MM/YYYY')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="h-4 w-4" />
                        <span>{activeSummary.topics.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleGeneratePodcast}
                    disabled={activeSummary.isGenerating}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    {activeSummary.isGenerating ? 'Generando...' : 'Generar Podcast IA'}
                  </Button>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2">
                  {activeSummary.topics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Podcast Player (if available) */}
              {activeSummary.podcastUrl && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mic className="h-5 w-5 text-blue-600" />
                      <span>Podcast IA</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Mic className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {activeSummary.title} - Podcast
                          </h3>
                          <p className="text-sm text-gray-500">
                            Duración: 3:45 • Generado con IA
                          </p>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Reproducir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Summary Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {activeSummary.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={() => setConfigModalOpen(true)}
        label="Nuevo Resumen"
      />

      {/* Modals */}
      <SummaryConfigModal 
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
      />

      {/* Toast */}
      <PodcastGeneratingToast
        isVisible={showPodcastToast}
        onComplete={handlePodcastComplete}
      />
    </div>
  )
} 