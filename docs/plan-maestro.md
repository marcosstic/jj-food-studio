# Plan maestro — JJ Food Studio

> Documento vivo. Define las fases, alcance, entregables y criterios de salida del
> proyecto. Se actualiza **antes** de implementar cada fase (metodología:
> diseñar → implementar → verificar, ver [AGENTS.md](../AGENTS.md)).

- **Creado:** 2026-10-27
- **Decisión de arranque:** migrar a SvelteKit manteniendo el diseño intacto
- **Guardado de arranque:** tag git `pre-fase-1`

## 1. Objetivo y criterios de éxito

Convertir el sitio vanilla actual en una plataforma **modular, escalable y
editable por el cliente**, implementando los ajustes solicitados (documento de
requisitos AJ-01…AJ-11), con:

1. **Paridad visual 1:1** con el diseño aprobado (el cliente no quiere rediseño).
2. **Contenido gestionable**: JJ podrá cambiar categorías, textos e imágenes sin tocar código (Fase 3).
3. **Performance**: sitio estático prerender servido por CDN; media optimizada por Cloudinary.
4. **Impacto visual** (el sitio competirá en un evento): interacciones modernas y pulidas en la galería.
5. **Continuidad**: cualquier IA o dev puede retomar el proyecto vía `AGENTS.md` + ADRs.

## 2. Fases

### Fase 1 — Migración a SvelteKit (paridad exacta) ✅ (2026-10-27)

**Objetivo:** mismo sitio, misma apariencia, nueva arquitectura. Sin cambios visuales.

**Alcance:**
- Proyecto SvelteKit 2 + Svelte 5 + `@sveltejs/adapter-static`, `prerender = true` en todas las rutas.
- Rutas: `/`, `/portafolio`, `/caso`, `/servicios`, `/sobre-jj`, `/metodologia`, `/contacto`.
- Componentes: `Header`, `Footer`, `LogoStage` (modos css/glow/three/cinematic), `ReelVideo`, `CategoryCard`, `BookingWidget` (cal.com), `WaFloat` (WhatsApp flotante), `ContactForm`, `DemoPanel`.
- CSS portado intacto: `tokens.css`, `base.css`, `components.css` como globales; `pages/*.css` importados por ruta.
- JS portado: `logoCssTilt` e `imageFadeIn` → Svelte actions; `logoThreeBillboard` → componente con `onMount`/cleanup (dispose completo); `demoControls` → visible solo con `?demo=1`; `hideNetlifyBadge` se mantiene.
- **Capa de contenido** `src/lib/content/` con tipos (`SiteConfig`, `Category`, `MediaAsset`, `Service`, `Course`) y datos actuales en TS (ADR-0002: prepara el swap a Sanity).
- Servicios `src/lib/services/cloudinary.ts` (builder de URLs con transformaciones `f_auto`, `srcset`) y `booking.ts` (carga del embed cal.com).
- Fuentes Gotham y logo a `static/`.
- Netlify: build `npm run build`, publish `build/`.

**Fuera de alcance:** cualquier cambio visual o de contenido (eso es Fase 2).

**Criterios de salida:**
- [x] `npm run build` sin errores; todas las rutas prerender (7 rutas → `build/*.html`).
- [x] Comparación visual screenshot a screenshot (desktop 1440 y móvil 390) contra el sitio vanilla: sin diferencias perceptibles (verificado con navegador real contra worktree del tag `pre-fase-1`).
- [x] Los 4 modos de logo funcionan (panel demo vía `?demo=1`; modo Three.js verificado con render 3D real).
- [x] Widget cal.com y video del hero operativos.
- [ ] Deploy en Netlify verificado. ← *pendiente: requiere push al remoto (el usuario no lo ha solicitado aún)*
- [x] El contenido del sitio vive **solo** en `src/lib/content/` (cero contenido hardcodeado en componentes).

**Desviaciones respecto al sitio vanilla (todas documentadas y justificadas):**

| # | Desviación | Motivo |
|---|-----------|--------|
| D-1 | Nav unificada en todas las páginas (portafolio/caso tenían menos enlaces y CTA roto `href="#"`) | Corrección de enlaces rotos; intención evidente del diseño |
| D-2 | WhatsApp flotante unificado a `site.whatsappUrl` en todas las páginas (antes `#` en 5 páginas) | Enlace roto; número real pendiente (P-4) |
| D-3 | Botones CTA `#` de servicios/caso → `/contacto` | Enlaces rotos |
| D-4 | Panel demo oculto salvo `?demo=1` o localStorage (antes botón "Demo" siempre visible) | Acordado en plan: herramienta de desarrollo, no debe verse en producción/evento |
| D-5 | Logs de depuración eliminados del módulo Three.js | Eran restos de debug; cero impacto visual |
| D-6 | `rel="noreferrer"` en enlaces `_blank`; `id`/`for` en el formulario | Buenas prácticas, sin impacto visual |
| D-7 | Preload de fuentes en todas las páginas (antes solo home) | Optimización, sin impacto visual |

**Bugs del sitio vanilla preservados deliberadamente (paridad 1:1) — decidir en Fase 2:**

| Bug | Efecto | Archivo |
|-----|--------|---------|
| `--space-8/10/12` no existen en tokens | `padding` de `.booking-section`, `.page-hero`, `.case-hero`, `.hero` (768px) cae a 0 | tokens.css/pages |
| `--radius-md` no existe en tokens | `border-radius` de `.reel__video`, `.calcom-widget`, `.card__media` cae a 0 | pages/home.css, portafolio.css |

**Bugs corregidos durante la migración (detectados en verificación):**
- `handleKey is not defined` (atajo de teclado del demo) — reescrito con `addEventListener` en `onMount`.
- Video del hero sin `src`/`poster` (shorthand Svelte incorrecto) — corregido.
- `.svelte-kit/` ignorado; `package-lock.json` ahora se versiona (builds deterministas en Netlify).

**Limpieza realizada:** páginas HTML legacy y `scripts/` eliminados del repo (recuperables en el tag `pre-fase-1`); CSS movido con `git mv` (historial preservado); fuentes y logo movidos a `static/`.

### Fase 2 — Ajustes del cliente (AJ-01…AJ-12) ✅ (2026-10-27)

**Objetivo:** implementar los requisitos del PDF + selector de logo. Diseño intacto; solo lo pedido.

**Alcance (trazabilidad completa en `docs/requisitos/ajustes-web-cliente.md`):**
- Hero nuevo (AJ-01/02/03): kicker + H1 + subtexto arriba; debajo, fila video (mix/backstage) + calendario; botones con más espacio.
- Sección editorial bajo calendario (AJ-04).
- Categorías renombradas: Restaurantes / Marcas personales / Pastelerías (AJ-05).
- Nueva ruta `/portafolio/[categoria]`: galería directa por categoría (AJ-06) con stage diapositiva sincronizado con el grid (AJ-07) y copy exacto por categoría (AJ-08), CTA "Agenda tu sesión" (AJ-09).
- Cierre con backstage/video de JJ, solo WhatsApp (AJ-10).
- Eliminar la sección marcada como innecesaria (AJ-11 — **requiere confirmación del cliente**).
- Selector público de versiones del logo en el hero (AJ-12): píldoras doradas CSS · Glow · 3D · Cine, persistente por navegador, default desde config (CMS-editable en Fase 3).
- Detalle UX de galería (aprobado con el dev): Embla Carousel para el stage, blur-up LQIP de Cloudinary, hover zoom sutil, soporte de video en el grid, navegación por teclado, View Transitions API con mejora progresiva.

**Criterios de salida:**
- [x] Todos los AJ-01…AJ-12 verificados visualmente y marcados en la tabla de trazabilidad (placeholders en AJ-03/10 hasta llegar P-1/P-2; AJ-11 parcial con Q-1 abierta).
- [ ] Lighthouse Performance ≥ 90 en móvil (media por Cloudinary, sin layout shift). ← *medir al hacer deploy real*
- [ ] Aprobación visual del cliente (screenshots o demo). ← *pendiente de presentación a JJ*

**Dependencias:** pendientes P-1…P-6 del cliente (videos, galerías, WhatsApp, Formspree, Instagram). Los ítems no bloqueados se ejecutan primero.

### Fase 2b — Modularización + sprint visual + placeholders 🔜 (propuesta v2 pendiente de aprobación final)

**Objetivo:** (a) convertir las páginas en composiciones de **secciones tipo LEGO**
(orden declarativo en la capa de contenido → JJ reordena su home desde el CMS en
Fase 3), con **contrato de layout** anti-superposición (z-index tokens, ritmo
vertical por sección, container único, sticky medido); (b) sprint visual: agenda
primero (Opción A aprobada), espaciados, tokens rotos (`--space-8/10/12`,
`--radius-md`), cajas suavizadas, selector de logo discreto; (c) placeholders con
stock curado subido a Cloudinary del cliente vía API key (entrega directa de
Marcos; claves solo en `.env`/Netlify, nunca en el repo).

**Detalle completo:** [docs/propuestas/mejoras-fase-2b.md](propuestas/mejoras-fase-2b.md)
(incluye auditoría de modularidad del 2026-10-27: páginas monolíticas, CSS
compartido entre 5 rutas, z-index mágicos, elementos fijos).

**Criterios de salida:**
- [x] Refactor de secciones con paridad visual 1:1 (10 secciones LEGO creadas; páginas interiores con PageHero compartido; `pages/home.css` y `pages/portafolio.css` eliminados).
- [x] Home con agenda primera (Opción A) verificado desktop+móvil.
- [x] Orden del home viviendo en `src/lib/content/home.ts` (`homeSections` — sin contenido en rutas).
- [x] z-index y `--header-h` tokenizados; sin z-index literales nuevos. Tokens rotos definidos (`--space-8/10/12`, `--radius-md`).
- [x] Backlog rápido: Meta/SEO+Open Graph por página, sitemap.xml, robots.txt, favicon.svg, WhatsApp prellenado (esperando número P-4), `prefers-reduced-motion` en el stage.
- [ ] Galerías y slots de video con material placeholder en Cloudinary del cliente. ← *esperando API key de Cloudinary (paso 3)*

**Incidentes resueltos durante la fase (lecciones):**
- Al eliminar `pages/home.css`, los estilos del logo y del reel se fueron con él (canvas sin estilo → min-content 640px → scroll horizontal en móvil). Restaurados a `components.css` (su capa correcta). Verificación de overflow (scrollWidth == clientWidth) añadida al protocolo.
- Video vertical del hero desbordaba el grid (`height:100%` en contenedor auto) → altura fija `min(70vh,720px)` + `object-fit: cover`.
- Svelte poda selectores con clases runtime (`img.loaded`) → patrón `:global(.loaded)` documentado.

### Fase 3 — CMS (Sanity) sobre la capa de contenido

**Objetivo:** JJ edita categorías, textos, imágenes y galleries sin depender del dev.

**Alcance:**
- Proyecto Sanity (ID `tg1ohcli`, dataset `production` — creado por Marcos el 2026-10-29) con esquema: `category` **creable sin límite por JJ** (nombre, slug, tagline, descripción, cover, galería de `MediaAsset` con **alt obligatorio** y **ficha técnica opcional por pieza: cliente · servicio · año** — se muestra en el lightbox, "con quién trabajó JJ"), orden arrastrable, visible/oculta; `siteConfig` singleton (WhatsApp, Instagram, email, enlaces cal.com, textos del hero, **logoDefault**, **homeSections**), `homeContent`, `service`, `course`, `testimonial` (opcional).
- `MediaItem` soporta **foto o video** mezclados en galería.
- Studio hospedado por Sanity (gratis) con onboarding visual para JJ.
- Adapter Sanity en `src/lib/content/` respetando los mismos tipos (las rutas no cambian).
- Webhook Sanity → Netlify para rebuild automático (~1 min).
- Imágenes siguen en Cloudinary (Sanity solo guarda URLs públicas).
- **Plan Sanity:** el proyecto se crea en trial de 30 días del plan pago y **al vencer baja automáticamente al plan Community gratuito permanente** (contenido y studio intactos; sin medios de pago registrados no hay cobro posible). El sitio no usa funciones de pago.

**Criterios de salida:**
- [ ] JJ crea/edita una categoría con fotos y el cambio se publica solo.
- [ ] Sin cambios visuales respecto a Fase 2 (el CMS no altera el render).
- [ ] Documentado el flujo de edición para el cliente (guía breve con capturas).

### Fase 4 — Evaluación del sistema de agenda

**Objetivo:** decidir con datos reales si mantener cal.com o invertir en sistema propio.

**Marco de decisión (ADR-0003):**
- Mantener cal.com mientras: volume de reservas bajo, branding aceptable, sin necesidad de lógica propia.
- Escalones intermedios antes de construir propio: plan pago de Cal (~$12/mes, quita branding, útil para el evento) → self-host de Cal open source (requiere VPS, ver ADR-0005).
- Sistema propio **solo si** surgen requisitos que Cal no cubre (flujos de pago complejos, lógica de negocio propia) y con diseño previo completo: timezone/DST, anti doble-reserva, sincronía con Google Calendar, emails transaccionales, panel admin.

## 3. Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|------------|
| Regresión visual durante la migración | Paridad verificada con screenshots; CSS portado intacto, sin refactor estético |
| Assets del cliente tardíos (P-1…P-3) | Fase 2 ejecutable con assets actuales como placeholder, swap cuando lleguen |
| Ambigüedad AJ-11 ("borrar esta parte") | Pregunta abierta Q-1: confirmar con el cliente antes de eliminar |
| Scope creep en Fase 2 | Regla: solo lo del PDF; cualquier otra idea → backlog para discutir |
| Complejidad Three.js en Svelte | Encapsular en componente con cleanup completo (dispose) y lazy-load |

## 4. Historial de cambios

| Fecha | Cambio |
|-------|--------|
| 2026-10-27 | Creación del plan; ADRs 0001–0006; guardado `pre-fase-1` |
| 2026-10-27 | **Fase 1 completada**: migración SvelteKit verificada visualmente; desviaciones D-1…D-7 documentadas; bugs vanilla preservados listados; Netlify deploy pendiente de push |
| 2026-10-27 | **Fase 2 completada**: AJ-01…AJ-12 implementados y verificados en navegador (home nuevo, galerías con stage Embla, selector de logo); trazabilidad actualizada; pendientes de cliente P-1/P-2/P-3 usan placeholders; Q-1 (AJ-11) sigue abierta |
| 2026-10-27 | Propuesta de mejoras Fase 2b creada ([docs/propuestas/mejoras-fase-2b.md](propuestas/mejoras-fase-2b.md)): agenda primero, discretizar selector de logo + default CMS, tokens rotos, placeholders stock, especificación de formatos para JJ, esquema CMS con categorías creables y alt obligatorio, backlog priorizado (SEO, WhatsApp, testimonios…) — **pendiente de aprobación** |
| 2026-10-27 | Propuesta **v2** (consolidada): Opción A de agenda aprobada; +auditoría de modularidad y sistema de secciones LEGO con orden declarativo; +gestión de Cloudinary vía API key (segura, `.env`); Fase 2b formalizada en el plan; esquema CMS ampliado con `homeSections` y `logoDefault` — **pendiente aprobación final (3 ítems)** |
| 2026-10-27 | **Fase 2b implementada** (pasos 1, 2 y 4): modularización con secciones LEGO + contrato de layout (AGENTS.md §5), agenda primera (Opción A), tokens/espaciados/cajas/selector discreto, SEO+OG+sitemap+favicon+WhatsApp prellenado+reduced-motion. Paso 3 (placeholders Cloudinary) espera API key. Verificado en navegador (desktop+móvil, overflow=0) |
| 2026-10-27 | Propuesta **hero a 3 columnas** (video · agenda · logo) creada ([docs/propuestas/hero-tres-columnas.md](propuestas/hero-tres-columnas.md)): usa el ancho real de pantalla (`--container-wide` 1360px), logo compacto junto a la agenda; breakpoints 3col/2col/pila — **pendiente de aprobación** |
| 2026-10-27 | **Hero a 3 columnas implementado** (aprobado por Marcos): video · agenda (centro dominante) · logo 3D compacto con selector; `--container-wide` 1360px (excepción única al contrato); responsive 3col ≥1200 / 2col 980–1199 / pila con agenda primero <980; verificado sin overflow en 1440/1366/1280/1024/390 |
| 2026-10-27 | Propuesta **v2 de alineación del hero** ("tríptico uniforme", §7 de hero-tres-columnas.md): diagnóstico medido (logo 226px más bajo por centrado vertical); opción B recomendada = stretch + logo en tarjeta glass; blindaje de orden móvil — **pendiente de aprobación** |
| 2026-10-28 | **Tríptico uniforme implementado** (Opción B aprobada): `align-items: stretch` con video llenando su columna (absoluto), logo en tarjeta glass igualando altura; fix de overflow (min-content de la tarjeta > columna → `min-width: 0` + logo elástico); verificado con medición (tops 275/275/275 a 1280, orden móvil agenda→video→logo, overflow=0 en 1280 y 390) |
| 2026-10-28 | **Hero full-bleed + agenda completa**: banda a todo el ancho (video pegado al borde izquierdo, logo al derecho, radios solo hacia el interior); agenda apuntando a la raíz de la cuenta cal.com (`bookingLink`) para listar TODOS los eventos automáticamente; hallazgo: la cuenta solo tiene 1 de los 5 tipos de evento del instructivo — **JJ debe crear los otros 4 en cal.com (Paso 5 de INSTRUCCIONS-CALCOM.md)** |
| 2026-10-28 | **Agenda sin cortes en todos los dispositivos**: el contenedor del embed dejó la altura fija y ahora usa auto-altura (cal.com ajusta el iframe a su contenido: 588px desktop / 807px iPhone XS); verificado desktop 1920, 1280, 1024 y 375 (iPhone XS) sin overflow ni fechas cortadas |
| 2026-10-28 | **Deploy a producción** (push con token de Marcos): jjfoodstudio.com con Fases 1-2b + dominio real en OG/sitemap + embudo de conversión de 3 caminos (commit `acd2557`) |
| 2026-10-28 | Propuesta **Fase 2c** creada ([docs/propuestas/banner-vertical-fase-2c.md](propuestas/banner-vertical-fase-2c.md)): banner filmstrip vertical + H1 a "Qué hacemos", portafolio 4:5 vertical con specs de subida (Cloudinary auto-ajusta), campos WhatsApp/ubicación en cal.com (instrucciones JJ, P-7), hotfix botón confirmar + badge Netlify, placeholders stock — **pendiente de aprobación** |
| 2026-10-28 | **Fase 2c implementada y en producción** (aprobada por Marcos, commit `72c11a8`): banner filmstrip vertical en loop, H1/kicker en "Qué hacemos", portafolio 4:5 con visor vertical + miniaturas, hotfix botón Confirmar (cal-brand dorado) y badge Netlify, carpetas Cloudinary seedeadas vía API (galerias/banner/videos). Pendiente P-7: campos WhatsApp+ubicación en cal.com (los hace JJ) |
| 2026-10-29 | **Lote de pulido en producción** (commit `115300f`): lightbox a pantalla completa en galerías (✕, flechas, contador, teclado, bloqueo de scroll); fix iOS Safari (texto del header invisible: prefijo -webkit-backdrop-filter + fallback opaco + text-size-adjust); banner táctil ya no pausa el loop; **P-7 resuelto vía API de cal.com** (campos WhatsApp requerido + Ubicación texto libre aplicados al evento 7262193 — sin panel) |
| 2026-10-29 | **Fase 3 — código implementado** (commit `e9b3f3a`): Studio embebido en `/panel` (login Sanity en el navegador, esquemas en español), adaptador con respaldo local (el build nunca se rompe por el CMS), `MediaView` normalizado (foto/video + ficha técnica en el lightbox), scripts `fetch-content` (prebuild) y `seed-sanity` (con token). Panel verificado montando en navegador — pide configurar CORS. **Pendiente: checklist de dashboard de Marcos** ([docs/fase3-configuracion.md](fase3-configuracion.md)): dataset, CORS, token seed, invitar a JJ, webhook |
| 2026-10-29 | **Fase 3 en producción** (commits `46d6bd4`+): ID de proyecto corregido a **tg1ohcli** (error de lectura mío: tg1ohclj no existía), seed completado vía API (7 imágenes + 17 documentos: 3 categorías con galerías y ficha técnica, servicios, cursos, config, orden de secciones, alt de portadas y banner), **el home sirve imágenes desde cdn.sanity.io** y el panel responde 200. Pendiente: invitar a JJ (Members) + webhook Sanity→Netlify (§5 de fase3-configuracion.md) |
