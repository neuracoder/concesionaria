# 🚗 Tu Concesionaria - Sistema Web Completo

Sistema profesional de gestión de concesionaria de autos con panel administrativo, diseñado para agencias automotrices en Argentina.

## ✨ Características

- 🎨 **Frontend Moderno**: React 19 + TypeScript + Vite
- 🔧 **Panel Admin Completo**: CRUD de vehículos con interfaz intuitiva
- 📱 **100% Responsive**: Diseño optimizado para móvil y desktop
- 🎯 **SEO Friendly**: Slugs amigables y meta tags optimizados
- 💬 **Integración WhatsApp**: Botón flotante y enlaces directos
- 📊 **Sistema de Cotizaciones**: Modal interactivo para toma de datos
- 🖼️ **Optimización de Imágenes**: Conversión automática a WebP
- 🎨 **Tailwind CSS**: Diseño moderno con tema oscuro y rojo
- 🔒 **Autenticación Admin**: Sistema de login seguro
- 📈 **Banner de Ventas**: Sticky banner para captar clientes B2B

## 🚀 Instalación Local

**Requisitos previos:** Node.js 18+

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/neuracoder/concesionaria.git
   cd concesionaria
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**

   Crear archivo `.env.local` en la raíz:
   ```env
   GEMINI_API_KEY=tu_clave_api_de_gemini
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`
   El servidor backend en `http://localhost:3000`

## 📦 Scripts Disponibles

- `npm run dev` - Inicia Vite dev server + Express backend
- `npm run build` - Build de producción
- `npm run preview` - Preview del build de producción
- `npm run server` - Solo el servidor Express

## 🌐 Deploy en Vercel

### Opción 1: Deploy desde GitHub (Recomendado)

1. Ir a [vercel.com](https://vercel.com)
2. Conectar con GitHub
3. Importar el repositorio `neuracoder/concesionaria`
4. Configurar variables de entorno:
   - `GEMINI_API_KEY` = tu clave de Gemini
5. Deploy automático

### Opción 2: Deploy con Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Variables de Entorno en Vercel

Ir a: **Project Settings → Environment Variables**

Agregar:
- `GEMINI_API_KEY` = tu_clave_api

## 🏗️ Estructura del Proyecto

```
concesionaria/
├── components/          # Componentes React reutilizables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── VehicleCard.tsx
│   ├── SalesBanner.tsx  # Banner de ventas B2B
│   ├── QuoteModal.tsx
│   └── WhatsAppButton.tsx
├── pages/              # Páginas principales
│   ├── Home.tsx
│   ├── Inventory.tsx
│   ├── VehicleDetail.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── admin/          # Sección administrativa
│       ├── Login.tsx
│       ├── Dashboard.tsx
│       ├── VehicleForm.tsx
│       └── AdminLayout.tsx
├── context/            # Estado global
│   └── VehicleContext.tsx
├── services/           # Servicios y utilidades
│   ├── geminiService.ts
│   ├── imageOptimizer.ts
│   └── mockData.ts
├── public/             # Archivos estáticos
├── server.js           # Backend Express
├── vercel.json         # Configuración Vercel
└── vite.config.ts      # Configuración Vite
```

## 🎨 Personalización

### Cambiar el nombre de la marca

Buscar y reemplazar "Tu Concesionaria" en:
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `pages/Home.tsx`
- `pages/About.tsx`

### Modificar colores

El proyecto usa Tailwind CSS con tema rojo principal. Para cambiar:
- Buscar `red-600` y reemplazar con tu color
- Modificar gradientes en componentes hero

### Email de contacto del banner

Editar en `components/SalesBanner.tsx`:
```tsx
href="mailto:tuemail@ejemplo.com"
```

## 🔐 Acceso Admin

- **URL**: `/admin/login`
- **Usuario por defecto**: `admin@concesionaria.com`
- **Contraseña**: `admin123`

⚠️ **IMPORTANTE**: Cambiar estas credenciales en producción editando `pages/admin/Login.tsx`

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS (CDN)
- **Backend**: Express.js 5
- **Base de Datos**: JSON (db.json)
- **Iconos**: Lucide React
- **IA**: Google Gemini API
- **Optimización**: WebP, lazy loading
- **Deploy**: Vercel

## 📧 Contacto

Para consultas sobre licencias o personalizaciones:
- Email: contact@neuracoder.com
- Precio: $350.000 (pago único)

## 📄 Licencia

Proyecto desarrollado por **NeuraCoder**. Todos los derechos reservados.

---

🤖 Desarrollado con [Claude Code](https://claude.com/claude-code)
