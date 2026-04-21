# 📲 Guía Rápida: De Desarrollo a Producción

## Paso 1: Ver tu sitio en desarrollo (AHORA)

Tu sitio está corriendo en:
```
http://localhost:5173/
```

Presiona `q` en la terminal para detener el servidor (cuando lo necesites).

---

## Paso 2: Preparar GitHub (Gratis)

### Crear cuenta en GitHub (si no tienes)

1. Ve a [github.com](https://github.com)
2. Click en "Sign up"
3. Completa el formulario con tu email
4. Confirma tu email

### Inicializar Git en el proyecto

```bash
# En la carpeta filtro-agua/
git init
git add .
git commit -m "Initial commit: Landing page Filtro H2O"
```

### Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre: `filtro-agua` (o lo que prefieras)
3. Descripción: "Landing page para Filtro Biotecnológico H2O"
4. Click "Create repository"
5. Sigue las instrucciones que GitHub te muestra:

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/filtro-agua.git
git push -u origin main
```

---

## Paso 3: Desplegar en Vercel (MUY FÁCIL)

### Opción A: Con GitHub (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Click "Sign up"
3. Elige "Continue with GitHub"
4. Autoriza Vercel
5. Click "New Project"
6. Selecciona `filtro-agua` de tus repositorios
7. Click "Import"
8. Click "Deploy"
9. ¡Listo! Tu sitio está en vivo

Tu URL será algo como:
```
https://filtro-agua.vercel.app/
```

### Opción B: Desde la carpeta local

```bash
# Instala Vercel CLI
npm i -g vercel

# Desde la carpeta filtro-agua/
vercel

# Sigue las instrucciones interactivas
```

---

## Paso 4: Dominio personalizado

### Con Vercel

1. Ve a tu proyecto en Vercel
2. "Settings" → "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones DNS

### Dominios baratos

- [Namecheap](https://namecheap.com) - desde $0.88/año
- [Google Domains](https://domains.google) - $12/año
- [Ionos](https://ionos.com) - muy económicos

---

## Paso 5: Optimizaciones finales

### Antes de compartir

- [ ] Cambiar `info@filtroh2o.com` por tu email real
- [ ] Cambiar números de teléfono
- [ ] Cambiar ubicación
- [ ] Agregar logo/colores personalizados
- [ ] Editar textos según necesites

### Editar en App.jsx

Abre `src/App.jsx` y busca:

```javascript
<p className="opacity-90">info@filtroh2o.com</p>
<p className="opacity-90">+XX (XXX) XXX-XXXX</p>
<p className="opacity-90">Tu Ciudad, País</p>
```

Reemplaza con tus datos y haz `git push` para actualizar el sitio en vivo.

---

## 🎯 Checklist Rápido

- [ ] Servidor de desarrollo corriendo (`npm run dev`)
- [ ] GitHub configurado con el proyecto
- [ ] Vercel desplegado desde GitHub
- [ ] Dominio personalizado (opcional pero recomendado)
- [ ] Datos de contacto actualizados
- [ ] Sitio visible en vivo

---

## 🆘 Troubleshooting

### "Error: node_modules not found"
```bash
npm install
npm run dev
```

### "Error al hacer push a GitHub"
```bash
# Verifica tu email en Git
git config --global user.email "tu@email.com"
git config --global user.name "Tu Nombre"

# Intenta de nuevo
git push
```

### El sitio muestra versión antigua
- Borra el caché del navegador (Ctrl+Shift+Delete)
- O abre en incógnito/privado

---

## 💡 Siguiente Paso: Mejorar

### Agregar formulario de contacto

```bash
# Opción simple: Formspree
npm install react-hook-form
```

### Analytics

```bash
# Seguimiento de visitantes (gratis)
# Ve a plausible.io o google.com/analytics
```

### Email Newsletter

```
# ConvertKit, Substack o MailChimp (gratis)
```

---

## 📞 Soporte

¿Necesitas ayuda?

1. Revisar documentación:
   - [Vite](https://vitejs.dev/)
   - [Vercel](https://vercel.com/docs)
   
2. Buscar error en Google con el mensaje exacto

3. ChatGPT puede ayudarte con código React

---

**Resumen en 3 pasos:**
1. `git push` a GitHub
2. Conectar GitHub a Vercel
3. ¡Sitio en vivo! 🎉

¡Mucho éxito con tu Filtro H2O!
