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
│                      #   cargan datos, componen UI. Sin lógica de negocio.
├── lib/
│   ├── components/    # Componentes UI presentacionales (reciben props,
│   │                  #   no hacen fetch ni conocen el origen de datos)
│   ├── content/       # CAPA DE CONTENIDO (repositorio): tipos + proveedor.
│   │                  #   Hoy: datos tipados en TS. Fase 3: adapter Sanity.
│   │                  #   ÚNICA fuente de contenido del sitio.
│   ├── services/      # Integraciones externas: cloudinary.ts (URL builder),
│   │                  #   booking.ts (cal.com), formspree.ts, etc.
│   ├── scripts/       # Efectos de DOM envueltos como Svelte actions
│   │                  #   (use:fadein, logo tilt, three.js)
│   └── styles/        # tokens.css · base.css · components.css (globales,
│                      #   heredados del diseño actual) + pages/*.css
└── static/            # Fuentes Gotham, logo, favicon (servidos tal cual)
```

**Reglas de dependencia (solo hacia abajo):** `routes → components → content/services`;
`components` nunca importa de `routes`; `content` no importa de `components`.

**Convenciones:** nombres de clases CSS en BEM (heredados del diseño actual);
componentes en PascalCase; datos en español (contenido) e inglés (código);
`export` explícitos; sin `any` en la capa de contenido.

## 6. Comandos

Estado actual del repo: **sitio vanilla pre-migración** (abrir los `.html` de la
raíz directamente). Tras la Fase 1 existirá `package.json`:

```bash
npm install        # dependencias
npm run dev        # desarrollo (http://localhost:5173)
npm run build      # build estático → build/
npm run preview    # servir el build localmente
```

Deploy: Netlify conectado al repo GitHub `marcosstic/jj-food-studio`.
Tras Fase 1: build command `npm run build`, publish directory `build/`.

## 7. Estado actual y próximos pasos

- [x] Documentación base (este archivo, plan maestro, ADRs, requisitos AJ)
- [ ] **Fase 1 — Migración a SvelteKit con paridad visual 1:1** ← *siguiente paso*
- [ ] Fase 2 — Ajustes del cliente (AJ-01…AJ-11)
- [ ] Fase 3 — CMS Sanity sobre la capa de contenido
- [ ] Fase 4 — Evaluación del sistema de agenda

El detalle completo con criterios de salida está en `docs/plan-maestro.md`.

## 8. Pendientes que bloquean (del cliente)

Ver tabla "Pendientes del cliente" en `docs/requisitos/ajustes-web-cliente.md`
(videos mix/backstage, galerías por categoría, número de WhatsApp, ID de Formspree,
URL de Instagram).
