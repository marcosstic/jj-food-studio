# AGENTS.md — Guía obligatoria para agentes de IA y desarrolladores

> **Este archivo es el punto de entrada del proyecto.** Cualquier IA (Claude, GPT,
> Cursor, Windsurf, Copilot…) o persona que continúe este repositorio debe leerlo
> completo antes de tocar código. Su propósito es que el proyecto pueda retomarse
> por cualquiera, en cualquier momento, sin perder decisiones ni criterios.

## 1. Qué es este proyecto

Sitio web de **JJ Food Studio**, estudio de fotografía y video gastronómico
(restaurantes, marcas personales y pastelerías). El dueño (JJ) es productor
audiovisual gastronómico, muy visual: **cada cambio debe verse impecable**.

**Marca:** estética *dark & moody* premium — fondo negro `#070708`, dorados
`#bd8c44 → #d4ac6a → #e9d79a`, tipografía Gotham, glassmorphism sutil, BEM en CSS.
Valores: precisión técnica, calidad gourmet, elegancia moderna, calidez profesional.
**El diseño visual está aprobado por el cliente y no se rediseña** — solo se ejecutan
los ajustes de `docs/requisitos/ajustes-web-cliente.md`.

**Stack objetivo (ver ADRs):** SvelteKit + `adapter-static` (sitio 100 % prerender),
CSS por capas con design tokens, Cloudinary para media, Sanity como CMS (Fase 3),
cal.com para agenda, Formspree para el formulario, Netlify como hosting.

## 2. Reglas de oro (innegociables)

1. **Metodología: diseñar → implementar → verificar.** Nunca escribir código antes
   de que exista el diseño del cambio (alcance, UI, esquema de datos, criterios de
   aceptación). Detalle en §4.
2. **Arquitectura en capas con capa de contenido.** El contenido nunca se hardcodea
   en componentes; siempre sale de `src/lib/content/`. Detalle en §5.
3. **El diseño visual no se cambia sin aprobación del cliente.** Colores, espaciados
   y tipografías salen de `tokens.css`; prohibido hardcodear valores visuales fuera
   de los tokens (excepciones: documentar el porqué en el commit).
4. **Edición de archivos solo con herramientas estructuradas** (lectura/escritura
   completa o edición con coincidencia exacta y diff revisable). **Prohibido modificar
   archivos con `sed`, `awk`, `echo >`, `perl -pi` u otras sustituciones por shell**:
   generan errores silenciosos y diffs difíciles de auditar. El shell queda para
   comandos (git, npm, build), no para editar código.
5. **Commits convencionales en español** (`feat:`, `fix:`, `docs:`, `refactor:`…)
   y **solo cuando el usuario lo pida**. Un commit = un propósito.
6. **Toda decisión de arquitectura se registra como ADR** en `docs/adr/`
   (numerado, corto: contexto → decisión → consecuencias → alternativas).
7. **Actualizar la documentación junto con el código** que la afecta (plan maestro,
   tabla de trazabilidad de requisitos, este archivo si cambian reglas).
8. **Nada de secretos en el repo** (`.env` está ignorado; los IDs públicos de
   Formspree/Cloudinary/cal.com sí pueden ir en configuración).

## 3. Mapa de documentación

| Ruta | Contenido |
|------|-----------|
| `AGENTS.md` | Este archivo: reglas, metodología, arquitectura, comandos |
| `docs/plan-maestro.md` | Fases 1–4, alcance, entregables y criterios de salida |
| `docs/requisitos/ajustes-web-cliente.md` | Requisitos AJ-01…AJ-11 del cliente + pendientes + trazabilidad |
| `docs/adr/0001…0006` | Decisiones de arquitectura tomadas y su justificación |
| `DESIGN_SYSTEM.md` | Sistema de diseño visual (tokens, componentes, efectos) — fuente visual |
| `CLIENT-REQUIREMENTS.md` | Requerimiento original del sitio (histórico) |
| `INSTRUCCIONS-CALCOM.md` | Setup de cal.com + Google Calendar del cliente |

## 4. Metodología de desarrollo (obligatoria en cada cambio)

**Paso 1 — Diseñar (sin código).** Para cada feature o corrección:
definir alcance, comportamiento de UI (texto/wireframe), esquema de datos o tipos
involucrados, y criterios de aceptación verificables. Si el cambio es de fase,
registrarlo en `docs/plan-maestro.md` antes de implementar.

**Paso 2 — Implementar lógica y datos primero.** Orden: tipos y capa de contenido
(`src/lib/content/`) → servicios/integraciones (`src/lib/services/`) → componentes
presentacionales → rutas/páginas. Los efectos de DOM como *actions* de Svelte.

**Paso 3 — Verificar.** `npm run build` sin errores, comprobación visual
(screenshots desktop/mobile contra el diseño de referencia), responsive
(breakpoints 1200/1024/768/680/480/375), accesibilidad básica (labels, alt, foco),
y actualización de docs/trazabilidad. Solo entonces se considera terminado.

Desarrollo en **slices verticales pequeños** (una feature completa y verificada),
no capas horizontales sueltas.

## 5. Arquitectura (patrón y capas) — ver ADR-0006

```
src/
├── routes/            # Páginas (SvelteKit file routing). Solo orquestan:
│                      #   cargan datos y componen secciones. Sin lógica de negocio.
├── lib/
│   ├── sections/      # SECCIONES tipo LEGO (Fase 2b): bloques autocontenidos
│   │                  #   con estilos scoped (HeroSection, PortfolioSection…).
│   │                  #   Pueden leer la capa de contenido. Mover una sección
│   │                  #   en una página = mover una línea del orden declarativo.
│   ├── components/    # Componentes UI presentacionales (reciben props,
│   │                  #   no hacen fetch ni conocen el origen de datos)
│   ├── content/       # CAPA DE CONTENIDO (repositorio): tipos + proveedor.
│   │                  #   Hoy: datos tipados en TS. Fase 3: adapter Sanity.
│   │                  #   ÚNICA fuente de contenido del sitio. Incluye el
│   │                  #   ORDEN de secciones (homeSections).
│   ├── services/      # Integraciones externas: cloudinary.ts (URL builder),
│   │                  #   booking.ts (cal.com), netlify.ts, etc.
│   ├── actions/       # Svelte actions (use:fadein, use:tilt)
│   ├── demo/          # Estado del panel demo (stores, ?demo=1)
│   ├── logo/          # Módulo Three.js del logo
│   └── styles/        # tokens.css · base.css · components.css (globales)
└── static/            # Fuentes Gotham, logo, favicon, sitemap, robots
```

**Reglas de dependencia (solo hacia abajo):** `routes → sections → components → content/services`;
`components` nunca importa de `routes`/`sections`; `content` no importa de nada visual.

**Contrato de layout (Fase 2b — anti-superposición y anti-distorsión):**
1. Solo el header (sticky) y el WhatsApp flotante usan `position: fixed/sticky`
   hacia afuera; las secciones viven en el flujo normal.
2. El ritmo vertical lo aporta cada sección con tokens (`--space-6/7/8`); prohibidos
   márgenes negativos y "compensaciones" mágicas.
3. Todo contenido dentro de `.container` (1120 px). Única excepción: la banda
   hero usa `--container-wide` (1360 px) para el layout a 3 columnas.
4. **Prohibido z-index literal**: usar `--z-sticky/--z-header/--z-demo/--z-float`.
5. `<980 px` todo colapsa a 1 columna.
6. Elementos sticky internos usan `top: calc(var(--header-h) + …)`.
7. El CSS de una sección/componente vive scoped en su `.svelte`; los globales solo
   para tokens/base/componentes compartidos. Prohibido recrear `pages/*.css`
   compartidos entre rutas (causó acoplamiento cruzado hasta Fase 2a).

**Convenciones:** nombres de clases CSS en BEM (heredados del diseño actual);
componentes en PascalCase; datos en español (contenido) e inglés (código);
`export` explícitos; sin `any` en la capa de contenido.

## 6. Comandos

Proyecto SvelteKit desde Fase 1 (raíz del repo):

```bash
npm install        # dependencias (requiere Node 18.13+; verificado con Node 20)
npm run dev        # desarrollo (http://localhost:5173; si está ocupado Vite elige otro puerto)
npm run build      # build estático → build/
npm run preview    # servir el build localmente (reiniciar tras cada build: sirv cachea el listado de archivos al arrancar)
```

Deploy: Netlify conectado al repo GitHub `marcosstic/jj-food-studio`.
Config (netlify.toml ya incluido): build command `npm run build`, publish `build/`.

## 7. Estado actual y próximos pasos

- [x] Documentación base (este archivo, plan maestro, ADRs, requisitos AJ)
- [x] **Fase 1 — Migración a SvelteKit con paridad visual 1:1** ✅ (2026-10-27; desviaciones D-1…D-7 y bugs preservados documentados en plan-maestro.md; deploy Netlify pendiente de push)
- [x] **Fase 2 — Ajustes del cliente (AJ-01…AJ-12)** ✅ (2026-10-27; galerías `/portafolio/[categoria]` con stage Embla; selector público de logo; placeholders P-1/P-2/P-3 activos; Q-1 abierta)
- [x] **Fase 2b — Modularización + sprint visual** ✅ (2026-10-27; secciones LEGO con orden declarativo, agenda primera, contrato de layout, SEO/OG/sitemap/favicon; placeholders Cloudinary pendientes de API key)
- [ ] **Fase 3 — CMS Sanity sobre la capa de contenido** ← *siguiente paso (explicar alcance a Marcos antes de iniciar)*
- [ ] Fase 4 — Evaluación del sistema de agenda

El detalle completo con criterios de salida está en `docs/plan-maestro.md`.

## 8. Pendientes que bloquean (del cliente)

Ver tabla "Pendientes del cliente" en `docs/requisitos/ajustes-web-cliente.md`
(videos mix/backstage, galerías por categoría, número de WhatsApp, ID de Formspree,
URL de Instagram).
