"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, 
  Bell, 
  Heart, 
  Tag, 
  Globe, 
  Clock,
  Shield,
  Moon,
  Sun,
  Smartphone
} from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    daily: true,
    weekly: false,
    podcast: true,
    bias: true
  })

  const [wellness, setWellness] = useState({
    pauseMode: false,
    darkMode: false,
    readingTime: 30,
    breakReminders: true
  })

  const availableTopics = [
    'Tecnología', 'Economía', 'Política', 'Ciencia', 'Salud', 
    'Deportes', 'Entretenimiento', 'Internacional', 'Medio Ambiente',
    'Educación', 'Cultura', 'Sociedad'
  ]

  const [selectedTopics, setSelectedTopics] = useState([
    'Tecnología', 'Economía', 'Ciencia'
  ])

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="font-heading font-bold text-3xl text-gray-900 mb-2">
          Configuración
        </h1>
        <p className="text-gray-600">
          Personaliza tu experiencia de NewsHaven
        </p>
      </motion.div>

      {/* Settings Tabs */}
      <Tabs defaultValue="topics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="topics" className="flex items-center space-x-2">
            <Tag className="h-4 w-4" />
            <span>Temas</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="wellness" className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>Bienestar</span>
          </TabsTrigger>
        </TabsList>

        {/* Topics Tab */}
        <TabsContent value="topics" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-blue-600" />
                  <span>Temas de Interés</span>
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Selecciona los temas que te interesan para personalizar tus resúmenes
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTopicToggle(topic)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedTopics.includes(topic)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  {selectedTopics.length} temas seleccionados
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-green-600" />
                  <span>Notificaciones</span>
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Configura cómo y cuándo recibir notificaciones
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Resumen Diario</Label>
                      <p className="text-sm text-gray-500">
                        Recibe un resumen de noticias cada mañana
                      </p>
                    </div>
                    <Switch
                      checked={notifications.daily}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, daily: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Resumen Semanal</Label>
                      <p className="text-sm text-gray-500">
                        Recibe un resumen completo cada domingo
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weekly}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, weekly: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Podcast IA</Label>
                      <p className="text-sm text-gray-500">
                        Notifica cuando tu podcast esté listo
                      </p>
                    </div>
                    <Switch
                      checked={notifications.podcast}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, podcast: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Alertas de Sesgo</Label>
                      <p className="text-sm text-gray-500">
                        Recibe alertas sobre contenido con alto sesgo
                      </p>
                    </div>
                    <Switch
                      checked={notifications.bias}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, bias: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Wellness Tab */}
        <TabsContent value="wellness" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Pause Mode */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-amber-600" />
                  <span>Modo Pausa</span>
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Toma descansos regulares para mantener tu bienestar digital
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Activar Modo Pausa</Label>
                    <p className="text-sm text-gray-500">
                      Recibe recordatorios para tomar descansos
                    </p>
                  </div>
                  <Switch
                    checked={wellness.pauseMode}
                    onCheckedChange={(checked) => 
                      setWellness(prev => ({ ...prev, pauseMode: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Reading Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Preferencias de Lectura</span>
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Configura tus hábitos de lectura para una mejor experiencia
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Recordatorios de Descanso</Label>
                    <p className="text-sm text-gray-500">
                      Recibe alertas para tomar descansos durante la lectura
                    </p>
                  </div>
                  <Switch
                    checked={wellness.breakReminders}
                    onCheckedChange={(checked) => 
                      setWellness(prev => ({ ...prev, breakReminders: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Tiempo de Lectura Diario (minutos)</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="15"
                      value={wellness.readingTime}
                      onChange={(e) => 
                        setWellness(prev => ({ ...prev, readingTime: parseInt(e.target.value) }))
                      }
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{wellness.readingTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-orange-600" />
                  <span>Apariencia</span>
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Personaliza la apariencia de la aplicación
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Modo Oscuro</Label>
                    <p className="text-sm text-gray-500">
                      Cambia entre tema claro y oscuro
                    </p>
                  </div>
                  <Switch
                    checked={wellness.darkMode}
                    onCheckedChange={(checked) => 
                      setWellness(prev => ({ ...prev, darkMode: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="flex justify-end"
      >
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
          Guardar Cambios
        </Button>
      </motion.div>
    </div>
  )
}
