# 💧 Filtro Biotecnológico H2O - Landing Page

Una landing page profesional para la promoción del Filtro Biotecnológico de Bajo Costo para Purificación de Agua.

## 🚀 Tech Stack

- **Vite** - Bundler y herramienta de desarrollo ultra-rápida
- **React** - Librería UI
- **Tailwind CSS** - Framework de CSS utility-first
- **Node.js** - Runtime de JavaScript

## 📁 Estructura del Proyecto

```
filtro-agua/
├── src/
│   ├── App.jsx          # Componente principal con la landing page
│   ├── App.css          # Estilos personalizados (usa Tailwind)
│   ├── index.css        # Configuración global + Tailwind directives
│   ├── main.jsx         # Entrada de React
│   └── assets/          # Imágenes y recursos
├── public/              # Archivos estáticos
├── tailwind.config.js   # Configuración de Tailwind
├── postcss.config.js    # Configuración de PostCSS
├── vite.config.js       # Configuración de Vite
├── package.json         # Dependencias y scripts
└── index.html           # HTML principal
```

## 🎯 Secciones de la Landing Page

1. **Hero** - Presentación principal del producto
2. **Problema** - Problemas que soluciona
3. **Solución** - Descripción biotecnológica
4. **Cómo Funciona** - 3 etapas de filtración
5. **Materiales** - Componentes principales
6. **A Quién Va Dirigido** - Usuarios principales y secundarios
7. **Beneficios** - Ventajas del producto
8. **Diferenciador** - Por qué elegirnos
9. **Mantenimiento** - Calendario de mantenimiento
10. **Impacto** - Impacto en salud y ambiente
11. **CTA** - Llamada a la acción
12. **Footer** - Información de contacto

## 💻 Instalación y Desarrollo

### Requisitos
- Node.js 16+ instalado
- npm o yarn

### Pasos

```bash
# Ya está instalado, pero si necesitas reinstalar:
npm install

# Ejecutar servidor de desarrollo
npm run dev

# La página estará disponible en:
# http://localhost:5173/
```

## 🏗️ Build para Producción

```bash
# Crear build optimizado
npm run build

# Vista previa del build
npm run preview
```

La carpeta `dist/` contendrá los archivos listos para producción.

## 🌐 Despliegue en Vercel (Recomendado)

### Opción 1: Desde la web

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Importa desde tu repositorio GitHub
4. Vercel detectará automáticamente que es un proyecto Vite
5. ¡Listo! Tu sitio estará en vivo en segundos

### Opción 2: Desde la CLI

```bash
# Instala Vercel CLI
npm i -g vercel

# Desde la carpeta del proyecto
vercel

# Sigue las instrucciones interactivas
```

## 🚀 Despliegue en Netlify

### Opción 1: Drag & Drop

1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta (si no tienes)
3. Haz un build local: `npm run build`
4. Arrastra la carpeta `dist/` al área de Netlify
5. ¡Tu sitio está en vivo!

### Opción 2: Desde Git

1. Sube tu código a GitHub
2. En Netlify: "New site from Git"
3. Conecta con GitHub
4. Build command: `npm run build`
5. Publish directory: `dist`
6. ¡Listo!

## ✨ Características de la Landing Page

✅ **Responsive Design** - Se adapta a cualquier dispositivo
✅ **Navegación Fija** - Menu de navegación siempre visible
✅ **Scroll Suave** - Animaciones al desplazarse
✅ **Colores Profesionales** - Azul y verde para agua y naturaleza
✅ **Secciones Organizadas** - Contenido estructura y fácil de leer
✅ **CTAs Claros** - Botones de llamada a la acción prominentes
✅ **Emojis** - Visualización amigable del contenido

## 🎨 Colores Utilizados

- **Azul**: `#3B82F6` (agua)
- **Verde**: `#16A34A` (naturaleza)
- **Gris**: `#6B7280` (textos)
- **Blanco**: `#FFFFFF` (fondo)

## 📝 Cómo Editar el Contenido

### Cambiar texto

Abre `src/App.jsx` y modifica los textos directamente. Los cambios se reflejarán automáticamente en el navegador.

### Cambiar colores

Edita `tailwind.config.js` para personalizar los colores:

```javascript
colors: {
  'blue-600': '#3B82F6', // Cambia aquí
  'green-600': '#16A34A', // O aquí
  // ...
}
```

### Agregar secciones

Copia el patrón de una sección existente en `App.jsx` y adáptalos a tus necesidades.

### Agregar imágenes

1. Coloca las imágenes en `src/assets/`
2. Importa en `App.jsx`: `import imagen from './assets/nombre.png'`
3. Usa en el JSX: `<img src={imagen} alt="descripción" />`

## 🔧 Customización Avanzada

### Agregar fuentes personalizadas

En `tailwind.config.js`:

```javascript
theme: {
  fontFamily: {
    sans: ['Poppins', 'sans-serif'],
  }
}
```

### Agregar animaciones

En `tailwind.config.js`:

```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in',
}
```

## 📱 Optimización Mobile

- La página es completamente responsive
- Usa clases Tailwind como `md:` para breakpoints
- Todas las secciones se adaptan automáticamente

## 🔒 Seguridad

- Tailwind CSS proporciona valores seguros
- Sin dependencias externas innecesarias
- Código limpio y mantenible

## 💡 Tips de Mejora

1. **Agregar formulario de contacto**: Usa Formspree o similar
2. **Analytics**: Agrega Google Analytics o Plausible
3. **SEO**: Actualiza meta tags en `index.html`
4. **Email**: Configura newsletter con ConvertKit
5. **Chat**: Agrega soporte con Intercom o similar

## 📞 Contacto y Soporte

Para modificaciones o ayuda con el despliegue, consulta la documentación oficial:

- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)

---

**Hecho con ❤️ para promover agua limpia y sustentable**
