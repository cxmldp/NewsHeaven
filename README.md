# NewsHaven MVP 🚀

**Combate la saturación informativa con podcasts IA personalizados y herramientas de bienestar digital.**

## 📋 Descripción

NewsHaven es una aplicación web moderna que ayuda a los usuarios a gestionar su consumo de información de manera saludable. Utiliza inteligencia artificial para generar resúmenes personalizados y podcasts, evitando la saturación informativa.

## ✨ Características Principales

### 🎯 **Funcionalidades Core**
- **Resúmenes Personalizados**: Genera resúmenes de noticias basados en tus intereses
- **Podcasts IA**: Convierte noticias en podcasts personalizados
- **Radar de Sesgo**: Analiza el sesgo en tu consumo informativo
- **Modo Pausa**: Herramientas para desconectar y cuidar tu bienestar digital

### 🎨 **Interfaz de Usuario**
- **Diseño Responsive**: Funciona perfectamente en desktop, tablet y móvil
- **Animaciones Suaves**: Transiciones fluidas con Framer Motion
- **Tema Moderno**: UI/UX limpia y profesional con Tailwind CSS
- **Navegación Intuitiva**: Sidebar deslizable y navegación clara

### 🔐 **Autenticación**
- **Sistema de Login**: Autenticación segura con credenciales demo
- **Rutas Protegidas**: Acceso controlado a funcionalidades premium
- **Gestión de Sesión**: Estado persistente con Zustand

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **Next.js 14** - Framework React con App Router
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones

### **Estado y Datos**
- **Zustand** - Gestión de estado global
- **LocalStorage** - Persistencia de datos
- **Day.js** - Manejo de fechas

### **UI Components**
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconografía
- **Shadcn/ui** - Sistema de componentes

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+ 
- npm, yarn o pnpm

### **Pasos de Instalación**

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd newshaven-mvp
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 👤 Credenciales de Demo

Para probar la aplicación, utiliza estas credenciales:

- **Email:** `demo@newshaven.com`
- **Contraseña:** `demo123`

## 📱 Estructura del Proyecto

```
newshaven-mvp/
├── app/                    # Next.js App Router
│   ├── (public)/          # Rutas públicas
│   │   ├── page.tsx       # Landing page
│   │   ├── login/         # Página de login
│   │   └── signup/        # Página de registro
│   ├── app/               # Rutas autenticadas
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── news/          # Feed de noticias
│   │   └── settings/      # Configuración
│   └── layout.tsx         # Layout raíz
├── components/            # Componentes React
│   ├── layout/           # Componentes de layout
│   ├── ui/               # Componentes de UI
│   ├── auth/             # Componentes de autenticación
│   └── modals/           # Modales y overlays
├── stores/               # Estado global (Zustand)
├── lib/                  # Utilidades y configuraciones
├── public/               # Archivos estáticos
└── styles/               # Estilos globales
```

## 🎯 Funcionalidades Detalladas

### **Dashboard (`/app/dashboard`)**
- **Radar de Sesgo**: Visualización interactiva del sesgo informativo
- **Métricas**: Estadísticas de consumo y tiempo ahorrado
- **Noticias Recientes**: Lista de artículos analizados

### **Noticias (`/app/news`)**
- **NewsSidebar**: Lista de resúmenes generados
- **FloatingActionButton**: Crear nuevos resúmenes
- **SummaryConfigModal**: Configurar temas y fechas
- **PodcastGeneratingToast**: Progreso de generación de podcasts

### **Configuración (`/app/settings`)**
- **Temas**: Personalizar categorías de interés
- **Notificaciones**: Configurar alertas
- **Bienestar**: Herramientas de bienestar digital

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
```

## 🎨 Personalización

### **Colores y Temas**
Los colores están definidos en `tailwind.config.js` y `lib/design-tokens.ts`:

```typescript
// Colores principales
primary: '#2563EB'    // Azul principal
secondary: '#64748B'  // Gris secundario
accent: '#F59E0B'     // Ámbar para alertas
```

### **Componentes**
Los componentes utilizan el sistema de diseño de Shadcn/ui, configurado en `components.json`.

## 📊 Estado de Desarrollo

### **✅ Completado**
- [x] Arquitectura base con Next.js 14
- [x] Sistema de autenticación
- [x] Dashboard con radar de sesgo
- [x] Feed de noticias con sidebar
- [x] Configuración de usuario
- [x] Diseño responsive
- [x] Animaciones con Framer Motion
- [x] Estado global con Zustand

### **🚧 En Desarrollo**
- [ ] Integración con APIs de noticias reales
- [ ] Generación de podcasts con IA
- [ ] Sistema de notificaciones push
- [ ] Métricas avanzadas de bienestar

### **📋 Pendiente**
- [ ] Tests unitarios y de integración
- [ ] Optimización de performance
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Equipo:** NewsHaven Team    
- **Email:** team@newshaven.com
- **Proyecto:** [https://github.com/newshaven/mvp](https://github.com/newshaven/mvp)

---

**¡Gracias por usar NewsHaven! 🎉**
*Combatiendo la saturación informativa, una noticia a la vez.* 