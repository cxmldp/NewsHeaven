"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Heart, Palette, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const topicCategories = [
  { id: "tech", name: "Tecnología", color: "bg-blue-500" },
  { id: "politics", name: "Política", color: "bg-red-500" },
  { id: "health", name: "Salud", color: "bg-green-500" },
  { id: "sports", name: "Deportes", color: "bg-orange-500" },
  { id: "economy", name: "Economía", color: "bg-purple-500" },
  { id: "science", name: "Ciencia", color: "bg-teal-500" },
  { id: "culture", name: "Cultura", color: "bg-pink-500" },
  { id: "environment", name: "Medio Ambiente", color: "bg-emerald-500" },
]

const pauseSchedule = [
  { time: "08:00", active: false, label: "Mañana" },
  { time: "12:00", active: true, label: "Mediodía" },
  { time: "16:00", active: false, label: "Tarde" },
  { time: "20:00", active: true, label: "Noche" },
  { time: "22:00", active: true, label: "Antes de dormir" },
]

export default function SettingsPage() {
  const [selectedTopics, setSelectedTopics] = useState(["tech", "health", "science"])
  const [notifications, setNotifications] = useState({
    podcast: true,
    breaking: false,
    digest: true,
    wellness: true,
  })
  const [wellnessSettings, setWellnessSettings] = useState({
    maxDailyTime: 30,
    pauseReminders: true,
    positiveContent: 80,
  })

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p className="text-gray-600">Personaliza tu experiencia en NewsHaven</p>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <Tabs defaultValue="topics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="topics" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Temas de Interés</span>
                  </CardTitle>
                  <CardDescription>
                    Selecciona los temas que más te interesan para personalizar tu podcast
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {topicCategories.map((topic, index) => (
                      <motion.button
                        key={topic.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                          delay: index * 0.05,
                        }}
                        onClick={() => handleTopicToggle(topic.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedTopics.includes(topic.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`w-8 h-8 ${topic.color} rounded-lg`} />
                          <span className="text-sm font-medium text-gray-900">{topic.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Temas Seleccionados ({selectedTopics.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTopics.map((topicId) => {
                        const topic = topicCategories.find((t) => t.id === topicId)
                        return topic ? (
                          <Badge key={topicId} variant="secondary" className="flex items-center space-x-1">
                            <div className={`w-2 h-2 ${topic.color} rounded-full`} />
                            <span>{topic.name}</span>
                            <button
                              onClick={() => handleTopicToggle(topicId)}
                              className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notificaciones</span>
                  </CardTitle>
                  <CardDescription>Controla cuándo y cómo recibir notificaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Podcast Diario</h4>
                        <p className="text-sm text-gray-600">Notificación cuando tu podcast esté listo</p>
                      </div>
                      <Switch
                        checked={notifications.podcast}
                        onCheckedChange={(value) => handleNotificationChange("podcast", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Noticias de Última Hora</h4>
                        <p className="text-sm text-gray-600">Solo eventos muy importantes</p>
                      </div>
                      <Switch
                        checked={notifications.breaking}
                        onCheckedChange={(value) => handleNotificationChange("breaking", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Resumen Semanal</h4>
                        <p className="text-sm text-gray-600">Análisis de tu consumo informativo</p>
                      </div>
                      <Switch
                        checked={notifications.digest}
                        onCheckedChange={(value) => handleNotificationChange("digest", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Recordatorios de Bienestar</h4>
                        <p className="text-sm text-gray-600">Sugerencias para pausas y descansos</p>
                      </div>
                      <Switch
                        checked={notifications.wellness}
                        onCheckedChange={(value) => handleNotificationChange("wellness", value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wellness Tab */}
            <TabsContent value="wellness" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Bienestar Digital</span>
                  </CardTitle>
                  <CardDescription>Configura límites saludables para tu consumo de noticias</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Daily Time Limit */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">Tiempo Diario Máximo</h4>
                        <p className="text-sm text-gray-600">Límite recomendado para consumo de noticias</p>
                      </div>
                      <span className="text-lg font-semibold text-blue-600">{wellnessSettings.maxDailyTime} min</span>
                    </div>
                    <Slider
                      value={[wellnessSettings.maxDailyTime]}
                      onValueChange={(value) =>
                        setWellnessSettings((prev) => ({
                          ...prev,
                          maxDailyTime: value[0],
                        }))
                      }
                      max={120}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>10 min</span>
                      <span>120 min</span>
                    </div>
                  </div>

                  {/* Positive Content Ratio */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">Contenido Positivo</h4>
                        <p className="text-sm text-gray-600">Porcentaje de noticias constructivas</p>
                      </div>
                      <span className="text-lg font-semibold text-green-600">{wellnessSettings.positiveContent}%</span>
                    </div>
                    <Slider
                      value={[wellnessSettings.positiveContent]}
                      onValueChange={(value) =>
                        setWellnessSettings((prev) => ({
                          ...prev,
                          positiveContent: value[0],
                        }))
                      }
                      max={100}
                      min={20}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>20%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Pause Schedule */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Horario de Pausas</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Configura momentos del día para descansar de las noticias
                    </p>

                    <div className="space-y-3">
                      {pauseSchedule.map((schedule, index) => (
                        <motion.div
                          key={schedule.time}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            delay: index * 0.1,
                          }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <div>
                              <span className="font-medium text-gray-900">{schedule.time}</span>
                              <span className="text-sm text-gray-600 ml-2">{schedule.label}</span>
                            </div>
                          </div>
                          <Switch
                            checked={schedule.active}
                            onCheckedChange={() => {
                              // Handle schedule toggle
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Wellness Tips */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">💡 Consejos de Bienestar</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Toma descansos regulares durante el día</li>
                      <li>• Evita noticias 1 hora antes de dormir</li>
                      <li>• Equilibra noticias negativas con contenido positivo</li>
                      <li>• Practica la reflexión después de consumir noticias</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
          className="flex justify-end mt-8"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Guardar Configuración
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
