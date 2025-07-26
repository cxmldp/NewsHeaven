"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface PodcastPlayerProps {
  isMinimized?: boolean
  onToggleMinimize?: () => void
}

export function PodcastPlayer({ isMinimized = false, onToggleMinimize }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180) // 3 minutos de ejemplo
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSkip = (direction: "forward" | "backward") => {
    const skipAmount = 15
    setCurrentTime((prev) => {
      if (direction === "forward") {
        return Math.min(prev + skipAmount, duration)
      } else {
        return Math.max(prev - skipAmount, 0)
      }
    })
  }

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted)
  }

  if (isMinimized) {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-4 right-4 z-40 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 min-w-[280px]"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-heading font-semibold text-sm text-gray-900 truncate">Tu Podcast Diario</h4>
          <Button variant="ghost" size="icon" onClick={onToggleMinimize} className="h-6 w-6">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </Button>

          <div className="flex-1">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={(value) => setCurrentTime(value[0])}
              className="w-full"
            />
          </div>

          <span className="text-xs text-gray-500 min-w-[35px]">{formatTime(currentTime)}</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-gray-900">Tu Podcast Diario</h3>
          <p className="text-sm text-gray-600">Resumen personalizado de noticias</p>
        </div>

        {onToggleMinimize && (
          <Button variant="ghost" size="icon" onClick={onToggleMinimize} className="h-8 w-8">
            <Minimize2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Artwork placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center mb-2 mx-auto">
            <span className="text-white font-bold text-xl">NH</span>
          </div>
          <p className="text-gray-600 text-sm">Episodio de hoy</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => setCurrentTime(value[0])}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <Button variant="ghost" size="icon" onClick={() => handleSkip("backward")} className="h-10 w-10">
          <SkipBack className="h-5 w-5" />
        </Button>

        <Button onClick={handlePlayPause} className="h-12 w-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={() => handleSkip("forward")} className="h-10 w-10">
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      {/* Volume control */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" onClick={handleVolumeToggle} className="h-8 w-8">
          {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        <Slider
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={(value) => {
            setVolume(value[0])
            if (value[0] > 0) setIsMuted(false)
          }}
          className="flex-1"
        />
      </div>
    </motion.div>
  )
}
