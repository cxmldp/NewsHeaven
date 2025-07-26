"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">NewsHaven</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Combate la saturación informativa con podcasts IA personalizados y herramientas de bienestar digital.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 mb-4">Producto</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Configuración
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 NewsHaven. Todos los derechos reservados.</p>
            <div className="flex items-center space-x-1 text-gray-500 text-sm mt-4 md:mt-0">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>para un mundo mejor informado</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
