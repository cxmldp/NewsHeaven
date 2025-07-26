import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "NewsHaven - Noticias sin saturación",
  description: "Combate la saturación informativa con podcasts IA personalizados y herramientas de bienestar digital.",
  keywords: ["noticias", "podcast", "IA", "bienestar digital", "información"],
  authors: [{ name: "NewsHaven Team" }],
  generator: 'v0.dev'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563EB'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Fonts will be loaded via CSS variables */}
      </head>
      <body className="font-body antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
