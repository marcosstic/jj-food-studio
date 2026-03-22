# Sistema de Diseño JJ Food Studio - Documentación Completa

Documento que define la filosofía de diseño, concepto visual, sistema de componentes y arquitectura de software de JJ Food Studio. Sirve como base para el desarrollo futuro y mantenimiento de consistencia visual y técnica.

## 1. Filosofía de Marca

### 1.1 Concepto Visual Principal
JJ Food Studio representa una fusión entre la cocina gourmet contemporánea y el diseño minimalista sofisticado. La marca transmite:

- **Elegancia Moderna:** Limpieza visual con detalles premium
- **Calidad Gourmet:** Experiencia culinaria de alto nivel  
- **Innovación Digital:** Integración de tecnología 3D/Three.js
- **Calidez Profesional:** Ambiente acogedor pero corporativo

### 1.2 Valores de Marca
- **Precisión:** Cada elemento está cuidadosamente calculado
- **Premium:** Detalles dorados y acabados de alta calidad
- **Tecnología:** Experiencias interactivas y animaciones fluidas
- **Autenticidad:** Honestidad en la presentación culinaria

## 2. Sistema de Color

### 2.1 Paleta Principal
```css
/* Fondo Oscuro - Base Premium */
--bg0: #070708    /* Negro casi puro con calidez */
--bg1: #0b0b0c    /* Variación sutil para profundidad */

/* Dorado JJ - Identidad Principal */
--gold-d: #bd8c44    /* Dorado oscuro elegante */
--gold-m: #d4ac6a    /* Dorado medio balanceado */
--gold-l: #e9d79a    /* Dorado claro brillante */

/* Gradiente Dorado - Elemento Premium */
--gold-grad: linear-gradient(135deg, var(--gold-d) 0%, var(--gold-m) 48%, var(--gold-l) 100%);
```

### 2.2 Sistema Neutro
```css
/* Textos y Elementos */
--text: rgba(255, 255, 255, 0.92)    /* Blanco casi puro */
--muted: rgba(255, 255, 255, 0.70)    /* Gris claro */
--muted2: rgba(255, 255, 255, 0.55)    /* Gris medio */
--neutral: #58595b    /* Gris neutro para acentos */

/* Superficies y Paneles */
--panel: rgba(255, 255, 255, 0.06)    /* Glass effect sutil */
--panel2: rgba(255, 255, 255, 0.10)    /* Glass effect medio */
```

### 2.3 Aplicación Semántica
- **Dorado:** Elementos premium, CTAs, logo principal
- **Blanco:** Textos principales, contenido
- **Grises:** Elementos secundarios, metadata
- **Glass:** Fondos de componentes, superficies interactivas

## 3. Tipografía

### 3.1 Sistema Gotham
```css
--font: "Gotham", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
```

### 3.2 Pesos y Usos
- **Book (400):** Textos largos, párrafos
- **Medium (500):** Navegación, botones, metadata
- **Bold (700):** Títulos, headings, marca

### 3.3 Escala Tipográfica
```css
/* Display - Hero */
h1: clamp(34px, 4vw, 54px)     /* Títulos principales */
letter-spacing: -0.02em               /* Ajuste fino */

/* Body - Contenido */
p: 16px                              /* Texto legible */
line-height: 1.6                      /* Buena legibilidad */

/* UI - Componentes */
.btn: 12px                            /* Botones compactos */
.lead: 18px                           /* Subtítulos importantes */
```

### 3.4 Características
- **Letter-spacing:** Negativo para headings (-0.02em), positivo para UI (0.18em)
- **Line-height:** Ajustado para legibilidad óptima
- **Font-display:** swap para rendimiento

## 4. Espaciado y Layout

### 4.1 Sistema de Espaciado
```css
--space-1: 8px      /* Micro espaciado */
--space-2: 12px     /* Espaciado pequeño */
--space-3: 16px     /* Espaciado estándar */
--space-4: 24px     /* Espaciado medio */
--space-5: 32px     /* Espaciado grande */
--space-6: 48px     /* Espaciado extra grande */
--space-7: 72px     /* Espaciado hero */
```

### 4.2 Grid System
```css
/* Container Principal */
--container: 1120px
max-width con padding responsivo

/* Grid Layout */
.hero__content: grid-template-columns: 1.1fr 0.9fr  /* Desktop */
.grid--3: grid-template-columns: repeat(3, 1fr)     /* 3 columnas */
.grid--2: grid-template-columns: repeat(2, 1fr)     /* 2 columnas */
```

### 4.3 Breakpoints Responsivos
- **Desktop:** >1200px - Layout completo
- **Tablet:** 768px-1024px - Adaptación tablet
- **Mobile:** 680px-768px - Layout móvil
- **Small:** 480px-680px - Móvil compacto
- **Mini:** <375px - Móvil ultra compacto

## 5. Efectos y Animaciones

### 5.1 Sistema de Animaciones
```css
--ease: cubic-bezier(0.2, 0.8, 0.2, 1)    /* Natural y suave */
--dur-1: 180ms    /* Micro interacciones */
--dur-2: 320ms    /* Transiciones estándar */
```

### 5.2 Efectos Principales

#### 5.2.1 Logo 3D (Three.js)
- **Opción 3 (Three.js):** Rotación suave, iluminación estándar
- **Opción 4 (Cinematic):** Rotación dramática, luces dinámicas, partículas
- **Material:** MeshStandard con metalness y roughness
- **Iluminación:** Ambient + Directional con efectos dorados

#### 5.2.2 Logo CSS (Glow Effect)
```css
/* Animación de flotación */
@keyframes jj-float: 1.9s ease-in-out infinite alternate

/* Animación de barrido dorado */
@keyframes jj-sweep: 2.1s ease infinite
background: radial-gradient con sweep animation
```

#### 5.2.3 Micro-interacciones
- **Buttons:** Transform translateY(1px) en active
- **Hover:** Background y border-color transitions
- **Links:** Color inherit con hover states

### 5.3 Efectos de Glass
```css
/* Glass Morphism */
backdrop-filter: blur(10px)
background: rgba(255, 255, 255, 0.06)
border: 1px solid rgba(255, 255, 255, 0.10)
```

## 6. Sistema de Componentes

### 6.1 Buttons
```css
.btn {
  height: 44px                    /* Touch-friendly */
  border-radius: 999px             /* Pills design */
  letter-spacing: 0.18em          /* Espaciado premium */
  text-transform: uppercase           /* Consistencia visual */
}

/* Variantes */
.btn--ghost: Transparencia sutil
.btn--outline: Borde visible con glass
.btn--cta: Gradiente dorado premium
```

### 6.2 Navigation
```css
.site-header {
  backdrop-filter: blur(10px)      /* Glass effect */
  position: sticky                 /* Siempre visible */
  z-index: 40                    /* Sobre contenido */
}

.brand__mark: font-weight: 700     /* JJ destacado */
.brand__name: letter-spacing: 0.22em /* Food Studio espaciado */
```

### 6.3 Cards y Paneles
```css
.card {
  border-radius: var(--radius)      /* 18px estándar */
  background: var(--panel)         /* Glass effect */
  border: 1px solid rgba(255, 255, 255, 0.10)
}
```

## 7. Sistema de Logo

### 7.1 Logo Variants
1. **CSS 3D:** Efecto pseudo-3D con CSS transforms
2. **Glow:** Brillo dorado con animación flotante
3. **Three.js:** Logo 3D real con rotación
4. **Cinematic:** Versión dramática con partículas

### 7.2 Logo 3D Technical
```javascript
// Geometry
PlaneGeometry(3.2, 3.2)  // 15% más pequeño que viewport

// Material
MeshStandardMaterial({
  map: texture,
  side: THREE.DoubleSide,    // Visible por ambos lados
  metalness: 0.65-0.72, // Efecto metálico
  roughness: 0.28-0.35   // Acabado realista
})

// Animation
baseSpin: 0.0077-0.0096 rad/frame  // 40% más lento
```

## 8. Gradientes y Fondos

### 8.1 Background System
```css
/* Principal - Capas múltiples */
background:
  radial-gradient(1200px 800px at 40% 10%, rgba(212, 172, 106, 0.12), transparent 60%),
  radial-gradient(900px 700px at 70% 40%, rgba(189, 140, 68, 0.10), transparent 62%),
  linear-gradient(180deg, var(--bg0), var(--bg1));

/* Hero Background */
radial-gradient(900px 520px at 30% 35%, rgba(233, 215, 154, 0.10), transparent 60%),
radial-gradient(900px 620px at 80% 70%, rgba(189, 140, 68, 0.12), transparent 62%),
linear-gradient(180deg, rgba(255, 255, 255, 0.00), rgba(0, 0, 0, 0.35));
```

### 8.2 Gradientes Semánticos
- **Dorado:** Premium, CTAs, elementos importantes
- **Dorados claros:** Efectos de brillo y glow
- **Fondos oscuros:** Base y profundidad
- **Glass:** Superficies interactivas

## 9. Sistema Responsivo

### 9.1 Adaptive Logo 3D
- **Desktop:** 420x420px
- **Tablet:** 380x380px  
- **Mobile Large:** 320x320px
- **Mobile Medium:** 280x280px
- **Mobile Small:** 240x240px
- **Mobile Mini:** 200x200px

### 9.2 Component Adaptation
- **Typography:** clamp() para escalado fluido
- **Spacing:** Reducción progresiva
- **Grid:** 3→2→1 columnas
- **Touch:** 44px minimum touch targets

## 10. Performance y Optimización

### 10.1 Font Loading
```html
<link rel="preload" href="./GothamBook.ttf" as="font" type="font/ttf" crossorigin />
font-display: swap  /* Fallback inmediato */
```

### 10.2 Animation Performance
- **Debounce:** 100ms para resize events
- **RequestAnimationFrame:** Loop optimizado
- **Memory Management:** Dispose completo en Three.js

### 10.3 Asset Optimization
- **Textures:** SRGBColorSpace correcto
- **Compression:** Formatos optimizados
- **Lazy Loading:** Three.js bajo demanda

## 11. Accesibilidad

### 11.1 Touch Targets
- **Minimum:** 44px × 44px para elementos táctiles
- **Spacing:** Mínimo 8px entre elementos

### 11.2 Color Contrast
- **Text:** 92% opacity sobre fondo oscuro
- **Interactive:** Estados claros y distinguibles

### 11.3 Semantic HTML
- **ARIA labels:** Navegación accesible
- **Semantic tags:** header, nav, main, section

## 12. ARQUITECTURA DE SOFTWARE

### 12.1 Estructura de Directorios
```
jj-food-studio/
├── 📄 index.html              # Página principal (entry point)
├── 📄 portafolio.html         # Página de portafolio
├── 📄 caso.html               # Página de caso de estudio
├── 📁 styles/                # Hojas de estilo CSS
│   ├── 🎨 tokens.css         # Design tokens (variables CSS)
│   ├── 🏗️ base.css           # Estilos base y reset
│   ├── 🧩 components.css     # Componentes reutilizables
│   └── 📁 pages/            # Estilos específicos por página
│       ├── 🏠 home.css      # Página principal
│       ├── 📂 portafolio.css # Portafolio
│       └── 📋 caso.css      # Caso de estudio
├── 📁 scripts/               # Módulos JavaScript
│   ├── 🚀 app.js            # Entry point y orquestador
│   ├── 🎮 demoControls.js   # Sistema de demo panel
│   ├── 🔄 logoModes.js      # Gestor de modos de logo
│   ├── 🎨 logoCssTilt.js   # Efectos 3D con CSS
│   ├── 🎬 logoThreeBillboard.js # Three.js y render 3D
│   └── 🎯 ctaVariants.js   # Variantes de botones CTA
├── 🎨 assets/                # Recursos estáticos
│   ├── 🔤 Gotham*.ttf        # Tipografía completa
│   └── 🖼️ JJ-logo-dorado.png # Logo principal
└── 📁 .git/                 # Control de versiones
```

### 12.2 Arquitectura de Módulos JavaScript

#### 12.2.1 Patrón de Módulos ES6
```javascript
// app.js - Entry Point
import { initDemoControls } from "./demoControls.js";
import { initLogoCssTilt } from "./logoCssTilt.js";
import { applyCtaStyleFromBody } from "./ctaVariants.js";

const ensureBodyDefaults = () => { /* Configuración inicial */ };
ensureBodyDefaults();
initDemoControls();
applyCtaStyleFromBody();
initLogoCssTilt();
```

#### 12.2.2 Separación de Responsabilidades
- **app.js:** Orquestador principal, inicialización de módulos
- **demoControls.js:** UI del panel de demo, localStorage, event listeners
- **logoModes.js:** Gestor de estados de logo, coordinador de modos
- **logoCssTilt.js:** Efectos 3D con CSS, mouse tracking
- **logoThreeBillboard.js:** Motor Three.js, render 3D, lifecycle
- **ctaVariants.js:** Sistema de variantes de botones, estado global

#### 12.2.3 Comunicación entre Módulos
```javascript
// Pub/Sub Pattern via Body Classes
document.body.classList.toggle("cta-solid", style === "solid");
document.body.dataset.logoMode = normalized;

// Event-driven Architecture
document.addEventListener("click", async () => {
  await setLogoMode(mode);
  updateSegmentActive();
});
```

### 12.3 Sistema de Componentes CSS

#### 12.3.1 Arquitectura en Capas
```css
/* 1. Tokens - Variables base */
:root {
  --gold-d: #bd8c44;
  --space-4: 24px;
  --font: "Gotham", ...;
}

/* 2. Base - Elementos HTML */
body { /* Reset y configuración global */ }
h1, p, a { /* Tipografía base */ }

/* 3. Components - Reutilizables */
.btn { /* Botón genérico */ }
.demo-panel { /* Panel de demo */ }

/* 4. Pages - Específicos */
.hero { /* Solo página home */ }
.case-hero { /* Solo página caso */ }
```

#### 12.3.2 Metodología BEM
```css
.component { /* Bloque principal */ }
.component__element { /* Elemento interno */ }
.component--modifier { /* Variante de estado */ }
.component__element--modifier { /* Modificador de elemento */ }

/* Ejemplo */
.demo-panel { }
.demo-panel__title { }
.demo-panel__section { }
.demo-panel__options { }
.opt { }
.opt--active { }
```

### 12.4 Sistema de Estado Global

#### 12.4.1 Body Classes como State Manager
```javascript
// Estado de Logo
document.body.dataset.logoMode = "three|cinematic|css|glow"

// Estado de CTA
document.body.classList.toggle("cta-solid|cta-outline")

// Estado de Demo
document.body.classList.toggle("demo-on")

// Detección de estado
const currentMode = document.body.dataset.logoMode;
const isDemoOn = document.body.classList.contains("demo-on");
```

#### 12.4.2 CSS Driven por Estado
```css
/* Estilos basados en estado */
body[data-logo-mode="three"] .logo-three { display: block; }
body[data-logo-mode="css"] .logo-css { display: grid; }

/* Variantes de CTA */
body.cta-solid .btn--cta { background: var(--gold-grad); }
body.cta-outline .btn--cta { background: rgba(7, 7, 8, 0.30); }
```

### 12.5 Sistema de Configuración

#### 12.5.1 localStorage como Persistencia
```javascript
const DEMO_KEY = "jj_demo_mode";
const LOGO_KEY = "jj_logo_mode";
const CTA_KEY = "jj_cta_style";

// Guardar estado
localStorage.setItem(LOGO_KEY, mode);

// Recuperar estado
const storedMode = localStorage.getItem(LOGO_KEY);
```

#### 12.5.2 Parámetros URL para Debug
```javascript
const getParam = (name) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
};

// Uso: ?demo=1&logo=cinematic
```

### 12.6 Sistema de Performance

#### 12.6.1 Lazy Loading de Módulos Pesados
```javascript
// Three.js solo cuando se necesita
if (normalized === "three" || normalized === "cinematic") {
  await initThreeLogo({ variant: normalized });
}

// Import dinámico
const THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");
```

#### 12.6.2 Memory Management
```javascript
// Cleanup completo
export const destroyThreeLogo = () => {
  cancelAnimationFrame(animationFrameId);
  renderer.dispose();
  geometry.dispose();
  material.dispose();
  texture.dispose();
  state = null;
};
```

### 12.7 Escalabilidad y Mantenimiento

#### 12.7.1 Principios de Diseño Modular
1. **Single Responsibility:** Cada módulo tiene una función clara
2. **Loose Coupling:** Módulos se comunican via interfaces estándar
3. **High Cohesion:** Funciones relacionadas agrupadas
4. **Dependency Injection:** Módulos reciben dependencias como parámetros

#### 12.7.2 Patrones de Extensión
```javascript
// Nuevo módulo de logo
export const initLogoNewTech = (options) => {
  // API consistente con otros módulos
  return {
    init: () => { /* Inicialización */ },
    destroy: () => { /* Cleanup */ }
  };
};

// Integración en app.js
import { initLogoNewTech } from "./logoNewTech.js";
initLogoNewTech({ variant: "new-mode" });
```

#### 12.7.3 Guías de Mantenimiento
- **Nuevos componentes:** Seguir estructura BEM + tokens
- **Nuevas páginas:** Crear CSS específico en /pages/
- **Nuevos módulos:** Exportar funciones init/destroy
- **Testing:** Cada módulo debe poder inicializarse/destruirse

## 13. Guías de Extensión

### 13.1 Nuevas Secciones
1. **Mantener consistencia:** Usar tokens existentes
2. **Seguir sistema:** Aplicar misma estructura de componentes
3. **Responsivo primero:** Mobile-first approach
4. **Performance:** Optimizar para animaciones 60fps

### 13.2 Nuevos Componentes
- **Usar variables CSS:** --space-*, --color-*, --dur-*
- **Seguir naming:** BEM methodology (.component__element--modifier)
- **Animaciones:** --ease y --dur-* consistentes
- **Glass effect:** backdrop-filter + rgba patterns

### 13.3 Nuevas Páginas
- **Estructura base:** Header + Main + Footer
- **Container system:** .container con max-width
- **Grid responsive:** Aplicar breakpoints estándar
- **Consistencia tipográfica:** Usar escala definida

## 14. Estado Actual del Sistema

### 14.1 Implementado ✅
- Sistema de color completo
- Tipografía Gotham con 4 pesos
- Espaciado y grid system
- 4 variantes de logo (CSS + 3D)
- Sistema de animaciones
- Diseño 100% responsivo
- Glass morphism effects
- Demo panel interactivo
- Arquitectura modular ES6
- Sistema de estado global
- Performance optimization

### 14.2 Por Implementar 🚧
- Secciones de servicios
- Página de formación
- Página sobre JJ
- Sistema de blog/portfolio
- Formulario de contacto
- Footer completo
- Testing framework

### 14.3 Mejoras Futuras 🔮
- Dark/Light mode toggle
- Animaciones scroll-based
- Micro-interacciones avanzadas
- Performance monitoring
- SEO optimization
- Component library system

---

**Este documento es la fuente de verdad para el diseño y arquitectura de JJ Food Studio.** Cualquier cambio o nueva sección debe referirse a estas guías para mantener consistencia visual, técnica y estructural.
