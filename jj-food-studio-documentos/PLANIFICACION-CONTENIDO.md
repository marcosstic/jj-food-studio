# Planificación de Contenido - JJ Food Studio

## Análisis de Contenido Disponible

### Inventario de Archivos

**Videos (5 archivos):**
- DRACOROSSO TEASER.mp4
- Ferrero v5.mp4
- Presentacion pan de j 2.mp4
- Tomatos JJ V2.mp4
- wok d2.mp4

**Fotos Horizontales (10 archivos):**
- IMG_0133.jpg
- IMG_3370.jpg
- IMG_4755-Edit.jpg
- IMG_7491.jpg
- IMG_9222.JPG
- IMG_9651.jpg
- _DSC0087.jpg
- _MG_7698.jpg
- _MG_9520.jpg
- _MG_9661-Edit.jpg

**Fotos Verticales (13 archivos):**
- 25072024-IMG_6716-Editar.jpg
- DSC01482.jpg
- DSC01617.jpg
- IMG_0271-Editar.jpg
- IMG_6665.jpg
- IMG_8441.jpg
- IMG_9670.jpg
- IMG_9838.jpg
- JJ_C0525.jpg
- JJ_C2531.jpg
- JJ_C2981.jpg
- JJ_C4500.jpg
- JJ_C6405.jpg
- _DSC0080.jpg

**Fotos Cocineros/Pasteleros (5 archivos):**
- 0M0A6158.jpg
- IMG_1999-Editar.jpg
- IMG_3039.jpg
- JJ_C3184-Editar.jpg
- JJ_C5282.jpg

**Foto Producto (1 archivo):**
- JJ_C9928.jpg

**Logos (4 archivos):**
- JJ-logo-dorado.png (usado actualmente en sitio)
- JJ-logo-gris.png
- JJ-logo-negativo.png
- JJ-logo-positivo.png

## Estrategia de Integración

### Principios de Diseño y UX

1. **Jerarquía Visual:** El contenido debe guiar al usuario a través de una narrativa clara
2. **Consistencia Estética:** Mantener el estilo "dark & moody" en todo el sitio
3. **Performance:** Optimizar carga de medios para velocidad
4. **Responsive:** Contenido adaptable a todos los dispositivos
5. **Accesibilidad:** Alt text descriptivo para todas las imágenes

### Principios de Producción Audiovisual

1. **Storytelling:** Cada video debe contar una historia o mostrar proceso
2. **Calidad Técnica:** Formatos optimizados para web
3. **Duración Óptima:** Videos cortos (15-30 segundos) para retención
4. **Audio:** Considerar si los videos necesitan audio o pueden ser mute por defecto

### Principios de Ingeniería de Software

1. **CDN para Performance:** Usar Cloudinary para distribución global
2. **Lazy Loading:** Cargar contenido solo cuando es necesario
3. **Responsive Images:** Múltiples tamaños según dispositivo
4. **Formatos Modernos:** WebP para imágenes, MP4/H.264 para videos
5. **Fallbacks:** Alternativas para navegadores antiguos

## Asignación de Contenido por Página

### 1. index.html (Home)

**Sección Hero - Logo:**
- **Archivo:** JJ-logo-dorado.png
- **Ubicación:** Línea 56
- **Hosting:** GitHub (raíz del proyecto)
- **Justificación:** Logo principal, acceso frecuente, archivo pequeño (44KB)
- **Optimización:** Ya optimizado, mantener en local

**Sección Hero - Demo Reel:**
- **Archivo:** Presentacion pan de j 2.mp4 (o DRACOROSSO TEASER.mp4)
- **Ubicación:** Líneas 65-70
- **Hosting:** Cloudinary
- **Justificación:** Video principal del sitio, necesita CDN para performance
- **Optimización:** 
  - Comprimir a 1080p máximo
  - Bitrate: 2-3 Mbps
  - Codec: H.264
  - Audio: AAC 128kbps (si tiene audio)
  - Formato: MP4
- **UX:** Autoplay con mute, loop, controles opcionales

**Sección Portafolio Destacado (3 cards):**
- **Archivos:** 3 fotos horizontales
  - IMG_9222.JPG (Restaurantes)
  - IMG_7491.jpg (Marcas de alimentos)
  - IMG_4755-Edit.jpg (Pastelería)
- **Ubicación:** Líneas 124-146
- **Hosting:** Cloudinary
- **Justificación:** Imágenes de portafolio, necesitan optimización y CDN
- **Optimización:**
  - Tamaño: 1200x800px (desktop), 800x600px (tablet), 600x400px (mobile)
  - Formato: WebP con fallback JPG
  - Calidad: 80%
  - Lazy loading

**Sección CTA Final - Video JJ:**
- **Archivo:** Tomatos JJ V2.mp4 (o wok d2.mp4)
- **Ubicación:** Líneas 243-252
- **Hosting:** Cloudinary
- **Justificación:** Video personalizado de JJ, necesita CDN
- **Optimización:**
  - Tamaño: 720p para desktop, 480p para mobile
  - Bitrate: 1.5 Mbps
  - Codec: H.264
  - Audio: AAC 96kbps
- **UX:** Autoplay con mute, controles visibles

### 2. portafolio.html

**Grid de Casos (3 cards):**
- **Archivos:** 3 fotos horizontales
  - _MG_9520.jpg (Marcas + Video)
  - _MG_7698.jpg (Restaurantes + Foto)
  - IMG_9651.jpg (Pastelería + Foto)
- **Ubicación:** Líneas 71-96
- **Hosting:** Cloudinary
- **Justificación:** Casos de portafolio, necesitan alta calidad y CDN
- **Optimización:**
  - Tamaño: 1400x900px (desktop), 900x600px (tablet), 700x500px (mobile)
  - Formato: WebP con fallback JPG
  - Calidad: 85%
  - Lazy loading

### 3. Oportunidades de Expansión (Contenido No Utilizado)

**Fotos Verticales (13 archivos):**
- **Uso potencial:** 
  - Crear sección "Detalles Macro" en portafolio
  - Usar como backgrounds en secciones específicas
  - Integrar en página "Sobre JJ" para mostrar filosofía visual
- **Recomendación:** Reservar para futura expansión o crear galería de detalles

**Fotos Cocineros/Pasteleros (5 archivos):**
- **Uso potencial:**
  - Sección "Colaboraciones" en portafolio
  - Testimonios visuales en página "Sobre JJ"
  - Hero image de página de servicios
- **Recomendación:** Usar 1-2 en "Sobre JJ" para mostrar trabajo con chefs

**Foto Producto (1 archivo):**
- **Uso potencial:**
  - Ejemplo de fotografía de producto en servicios
  - Hero de sección "Food Styling"
- **Recomendación:** Usar en página de servicios como ejemplo

**Videos Restantes (3 archivos):**
- **Ferrero v5.mp4:** Caso de marca de alimentos (portafolio)
- **DRACORROSSO TEASER.mp4:** Caso de restaurante (portafolio)
- **wok d2.mp4:** Caso de proceso/technique (metodología)
- **Recomendación:** Crear página de casos individuales con videos completos

**Logos Alternativos (3 archivos):**
- **Uso:**
  - JJ-logo-gris.png: Footer o secciones oscuras
  - JJ-logo-negativo.png: Fondos oscuros
  - JJ-logo-positivo.png: Fondos claros (si se agregan)
- **Recomendación:** Subir a Cloudinary para uso flexible según contexto

## Estructura de Carpetas en Cloudinary

```
cloudinary/
├── hero/
│   ├── demo-reel.mp4
│   └── jj-intro.mp4
├── portfolio/
│   ├── restaurantes/
│   ├── marcas/
│   └── pasteleria/
├── servicios/
│   └── producto/
├── sobre-jj/
│   ├── cocineros/
│   └── filosofia/
├── logos/
│   ├── dorado.png
│   ├── gris.png
│   ├── negativo.png
│   └── positivo.png
└── detalles/
    └── verticales/
```

## Especificaciones Técnicas

### Imágenes

**Formatos:**
- Principal: WebP (soporte moderno)
- Fallback: JPG (compatibilidad)
- PNG solo para logos con transparencia

**Tamaños:**
- Desktop: 1200-1600px (ancho)
- Tablet: 800-1000px (ancho)
- Mobile: 600-800px (ancho)

**Compresión:**
- WebP: 75-85% calidad
- JPG: 80-90% calidad
- PNG: Sin pérdida (logos)

**Metadata:**
- Alt text descriptivo
- Title para SEO
- Lazy loading nativo (loading="lazy")

### Videos

**Formatos:**
- Principal: MP4 (H.264 codec)
- Audio: AAC codec

**Resoluciones:**
- Desktop: 1080p o 720p
- Tablet: 720p
- Mobile: 480p o 360p

**Bitrates:**
- 1080p: 3-5 Mbps
- 720p: 2-3 Mbps
- 480p: 1-1.5 Mbps

**Atributos HTML:**
- autoplay (muted)
- muted (requerido para autoplay)
- loop (para hero)
- playsinline (iOS)
- controls (para videos con audio)

## Implementación por Fases

### Fase 1: Contenido Crítico (Inmediato)
1. Logo JJ-logo-dorado.png → GitHub (ya en local)
2. Hero demo reel → Cloudinary
3. 3 fotos portafolio home → Cloudinary
4. Video CTA final → Cloudinary

### Fase 2: Portafolio Completo (Corto plazo)
1. 3 fotos casos portafolio → Cloudinary
2. Optimizar y subir fotos verticales → Cloudinary
3. Crear sección de detalles macro

### Fase 3: Expansión (Medio plazo)
1. Videos de casos individuales → Cloudinary
2. Fotos cocineros → Cloudinary
3. Integrar en páginas correspondientes

### Fase 4: Optimización Continua
1. Monitorear performance con Lighthouse
2. Ajustar compresión según necesidad
3. Implementar lazy loading agresivo
4. Considerar AVIF para imágenes (soporte futuro)

## Métricas de Éxito

**Performance:**
- Lighthouse Performance score > 90
- LCP (Largest Contentful Paint) < 2.5s
- CLS (Cumulative Layout Shift) < 0.1

**UX:**
- Tiempo de carga del hero < 1s
- Videos cargan sin buffering
- Imágenes cargan progresivamente

**SEO:**
- Todas las imágenes con alt text
- Videos con descripciones
- Sitemap actualizado con URLs de contenido

## Notas de Mantenimiento

1. **Actualización de contenido:** Cloudinary permite reemplazar archivos sin cambiar URLs
2. **Versionado:** Usar parámetros de transformación para versiones
3. **Backup:** Mantener copia local de todo contenido
4. **Monitoreo:** Revisar uso de bandwidth en Cloudinary (plan gratuito: 25GB/mes)
5. **Optimización continua:** Revisar nuevas tecnologías de compresión

## Referencias

- Cloudinary Documentation: https://cloudinary.com/documentation
- WebP vs JPG: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization
- Video Optimization: https://web.dev/fast-video/
- Lazy Loading: https://web.dev/lazy-loading/
- Accessibility: https://www.w3.org/WAI/tutorials/images/
