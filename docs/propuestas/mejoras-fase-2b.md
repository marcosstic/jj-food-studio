# Propuesta de mejoras — Fase 2b · **v2 consolidada** (pendiente de aprobación final)

> **Estado:** PROPUESTA v2 — no implementar hasta la aprobación final de Marcos.
> **Creada:** 2026-10-27 · **Reformada:** 2026-10-27 (v2).
> Cambios v2: Opción A de agenda **aprobada** ✔; nueva **§5 Sistema modular de
> secciones** (auditoría + arquitectura); nuevo **§6 gestión de Cloudinary vía API
> key**; orden de ejecución consolidado (§10).
> Fuente de los requisitos: feedback de Marcos/JJ tras revisar la Fase 2.

---

## 1. Agenda primero — Opción A ✅ APROBADA

Primer viewport: titular corto (1–2 líneas) + **video + calendario lado a lado**
(calendario dominante). El bloque de texto completo y el logo grande pasan a la
sección "**Qué hacemos**" (entre la editorial y el portafolio), con el selector de
versión de logo ahí.

```
┌──────────────────────────────────────────────────────────────┐
│ [kicker pequeño]                                             │
│ Imágenes que hacen que la comida se vende — versión corta    │
│ ┌──────────────────────┐  ┌────────────────────────────────┐ │
│ │  VIDEO (reel)        │  │  CALENDARIO (cal.com)          │ │
│ │  + Ver portafolio    │  │  "Agenda tu sesión"            │ │
│ └──────────────────────┘  └────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

Móvil: orden apilado → titular → calendario → video (agenda sigue primero).

## 2. Espaciado del bloque hero (aplicará a la sección "Qué hacemos")

Ritmo vertical con tokens: kicker→H1 y H1→sub `--space-4`; sub→botones y
botones→pills `--space-5`. Pills a 32 px de alto o eliminadas (duplican servicios).

## 3. Selector de versiones del logo — híbrido discreto + CMS ✅ (mismo enfoque aprobado)

1. **Discretizar**: píldoras pequeñas semitransparentes (contraste al hover) o
   logo-clic abre mini-panel (huevo de pascua premium para la competencia).
2. **Default desde CMS**: `siteConfig.logoDefault` editable por JJ; el selector
   público solo sobreescribe la sesión del visitante (localStorage).

## 4. Fondos negros / cajas flotantes

1. **Definir tokens rotos** en `tokens.css`: `--space-8/10/12` (32/40/48 px) y
   `--radius-md` (14 px) — recupera aire en media página (bug heredado, ver plan).
2. **Suavizar cajas** (stage, videos, reel): borde tenue solo al hover, radios
   grandes, sombra dorada sutil.
3. **Unificar glow del hero** a un solo halo suave arriba-izquierda.

---

## 5. NUEVO · Sistema modular de secciones (auditoría y arquitectura)

**Requisito de Marcos:** todo componente/parte de la web debe ser modular y
escalable — si JJ pide mover o cambiar algo, debe hacerse sin distorsionar el
resto ni superponer nada.

### 5.1 Auditoría del estado actual (2026-10-27)

| Elemento | Veredicto | Hallazgo |
|----------|-----------|----------|
| Componentes base (Header, Footer, Cards, Booking, Forms, LogoStage, GalleryStage…) — 11 uds, 586 líneas | ✅ MODULAR | Pequeños, presentacionales, datos por props |
| **Páginas** (home 143 líneas/8 secciones inline; sobre-jj 150; caso 59…) | ❌ MONOLITO | Las secciones no son unidades móviles: mover una = cortar/pegar bloque + su CSS |
| **CSS de página global**: `home.css` la importan 5 rutas (home, contacto, servicios, sobre-jj, metodología) | ❌ ACOPLAMIENTO CRUZADO | Un cambio en home.css altera 4 páginas distintas sin querer |
| **z-index mágicos**: 40 (header), 50 (demo), 60 (WhatsApp) repartidos en 2 archivos | ⚠️ RIESGO | Sin escala tokenizada: elementos nuevos "tapan" o "quedan debajo" sin regla |
| **Elementos fijos**: WhatsApp, demo-toggle, demo-panel (esquinas inferiores) | ⚠️ RIESGO | Zona de solapamiento real en móvil (y con el calendario) |
| Sticky: header + banda de agenda | ⚠️ PARCIAL | El video sticky (`top: 84px`) depende de la altura del header — frágil si el header cambia |

### 5.2 Arquitectura objetivo: "secciones como bloques LEGO"

**Principio:** una sección = un componente autocontenido. La página es una lista
ordenada de secciones; mover una sección es mover **una línea**.

```
src/lib/sections/            # Secciones reutilizables (bloques LEGO)
├── HeroSection.svelte        # titular compacto + video + calendario (Opción A)
├── WhatWeDoSection.svelte    # texto de marca + logo grande + selector discreto
├── EditorialSection.svelte
├── PortfolioSection.svelte   # grid de categorías
├── ServicesSection.svelte
├── FormationSection.svelte
├── AboutSection.svelte
├── ClosingSection.svelte     # video JJ + WhatsApp
└── …(PageHero, metodología, etc.)
```

**Orden declarativo en la capa de contenido** (ADRs 0002/0006 — sin contenido en rutas):

```ts
// src/lib/content/home.ts
export const homeSections = [
  'hero',        // Opción A: agenda primera
  'editorial',
  'portfolio',
  'whatWeDo',    // texto de marca + logo (movido del hero)
  'services',
  'formation',
  'about',
  'closing'
] as const;
```

`+page.svelte` hace `{#each}` sobre esa lista y renderiza el componente de cada
sección. **Resultado:** "JJ quiere el portafolio antes que la editorial" = mover
un string. En **Fase 3 ese orden es editable desde el CMS** (lista arrastrable en
Sanity) — JJ reordena su home sin tocar a nadie.

**Cada sección es dueña de sus estilos:** el CSS de sección pasa de los archivos
globales `pages/*.css` a estilos scoped dentro de su componente (Svelte los aísla
y poda lo no usado). Solo `tokens.css`, `base.css` y `components.css` quedan
globales. Esto elimina el acoplamiento cruzado actual (home.css ↔ 5 rutas).

### 5.3 Contrato de layout (reglas anti-superposición y anti-distorsión)

Reglas vinculantes (se documentarán en AGENTS.md al implementar; auditable en cada PR):

1. **Flujo normal:** ninguna sección usa `position: absolute/fixed/sticky` hacia
   afuera; solo decoraciones internas. Los únicos elementos fijos del sitio:
   WhatsApp flotante y header sticky.
2. **Ritmo vertical unificado:** cada sección define su padding con tokens
   (`--space-6/7/8`), nunca márgenes negativos ni "compensaciones" mágicas. El
   espacio entre secciones lo aporta la propia sección → cualquier orden se ve bien.
3. **Container único:** todo contenido dentro de `.container` (1120 px) — ninguna
   sección inventa su ancho máximo.
4. **Escala z-index tokenizada** en `tokens.css`: `--z-header: 40`,
   `--z-sticky: 30`, `--z-float: 60`, `--z-demo: 70`. Prohibido z-index literales.
5. **Responsive uniforme:** a <980 px todo colapsa a 1 columna (grid existente);
   los elementos fijos se repliegan (demo ya oculto por defecto; WhatsApp 50 px).
6. **Sticky medido:** la banda de agenda usa `top: var(--header-h)` con
   `--header-h` tokenizado — si el header cambia de altura, nada se rompe.

### 5.4 Alcance del refactor (paridad verificada)

- Extraer ~14 secciones (home 8 + portafolio chooser + galería hero/grid/cta +
  page-hero reutilizable + metodología + servicios).
- Mover CSS scoped por sección; eliminar import cruzado de `pages/home.css` en 4 rutas.
- Tokenizar z-index y `--header-h`.
- **Verificación:** screenshots antes/después de cada página (como Fase 1) — el
  refactor no cambia ni un píxel; solo habilita mover cosas después.

---

## 6. NUEVO · Cloudinary: gestión con API key de Marcos/JJ

**Ofrecido por Marcos:** pasar las API keys para que yo gestione Cloudinary directamente.

**Sí, lo puedo gestionar — con reglas de seguridad:**

1. **Las claves nunca entran al repo** (`.env` está en `.gitignore`; en Netlify
   van como variables de entorno). Si alguna vez aparecen en git: rotarlas.
2. **Qué haré con la key:**
   - Subir el stock curado (placeholders §5.1-v1) directamente a la cuenta de JJ,
     en carpetas organizadas: `placeholders/galerias/{restaurantes,marcas-personales,pastelerias}`,
     `placeholders/videos/{hero,cierre}`.
   - Crear la estructura definitiva `galerias/<categoria>/` lista para el material real.
   - Probar transformaciones reales (`f_auto`, `srcset`, LQIP) sobre sus archivos.
3. **La key es solo para administración (yo)**: el sitio público usa URLs de
   Cloudinary (públicas); nunca hay claves en el frontend. En Fase 3, Sanity
   también solo guarda URLs.
4. **Plan B sin key:** stock en `static/placeholders/` (v1). La arquitectura no
   cambia — solo el origen de las URLs.

**Recomendación:** pasar la key cuando ejecutemos el paso de placeholders (no
antes), por mensaje directo; queda en `.env.local` de esta máquina y en variables
de Netlify si algún script lo necesita en el build.

## 7. Especificación de formatos y tamaños (para JJ)

Sin cambios respecto a v1: fotos 3:2 ≥2400 px lado largo, JPEG original sin
optimizar, alt obligatorio por foto, carpetas por categoría; videos MP4 1080p,
8–15 s loop sin audio ≤8 MB, cierre 16:9. (Detalle completo en el historial del
documento y en la guía que se le entregará a JJ con el CMS.)

## 8. Esquema CMS (Fase 3) — actualizado con secciones

Igual que v1 (category creable con galería + **alt obligatorio**, mediaItem,
siteConfig con **logoDefault**, homeContent, service, course, testimonial) **+
nuevo**: `siteConfig.homeSections` (orden de secciones del home, lista arrastrable
en Sanity — fruto de §5). Webhook → rebuild Netlify ~1 min.

## 9. Backlog frontend priorizado (sin cambios)

SEO base + Open Graph · WhatsApp real prellenado · testimonios/clientes ·
proceso 3 pasos con backstage · suscripción PDF regalo · FAQ · analytics ·
lightbox galerías · `prefers-reduced-motion` · (detalle en v1/§7, vigente).

## 10. Orden de ejecución consolidado (a aprobar)

| Paso | Contenido | Entregable verificable |
|------|-----------|------------------------|
| **1. Modularización** (§5) | Secciones LEGO + orden declarativo + contrato de layout + z-index tokens | Refactor sin cambios visuales (screenshots de paridad) |
| **2. Sprint visual** (§1–§4) | Agenda primero (Opción A), espaciados, tokens rotos, cajas suaves, selector discreto | Home nuevo verificado desktop+móvil |
| **3. Placeholders** (§6) | Stock curado subido a Cloudinary de JJ (con key) o `static/` (sin key) | Galerías llenas y videos en su sitio |
| **4. Backlog rápido** (§9) | SEO/OG, WhatsApp prellenado, reduced-motion | Link compartible impecable para la competencia |
| **5. Fase 3 — CMS** (§8) | Sanity con esquema completo incl. `homeSections` y `logoDefault` | JJ edita todo sin dev |

Los pasos 1 y 2 se ejecutan en un mismo ciclo de verificación visual (1 habilita
que 2 sea "mover líneas" en vez de cirugía de HTML/CSS).

---

## Aprobación final solicitada (checklist)

- [x] Agenda primero — **Opción A** (aprobada por Marcos)
- [x] Espaciados, cajas suaves, tokens rotos (aprobado "toda la propuesta")
- [x] Selector de logo híbrido discreto + CMS (aprobado)
- [ ] **Sistema modular de secciones §5** como paso 1 (auditoría arriba)
- [ ] **Uso de API key de Cloudinary §6** (entregarla al ejecutar paso 3, vía segura)
- [ ] **Orden de ejecución §10** (1→5)
