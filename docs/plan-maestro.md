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

### Fase 1 — Migración a SvelteKit (paridad exacta) 🔜

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
- [ ] `npm run build` sin errores; todas las rutas prerender.
- [ ] Comparación visual screenshot a screenshot (desktop 1440 y móvil 390) contra el sitio vanilla: sin diferencias perceptibles.
- [ ] Los 4 modos de logo funcionan (panel demo vía `?demo=1`).
- [ ] Widget cal.com y video del hero operativos.
- [ ] Deploy en Netlify verificado.
- [ ] El contenido del sitio vive **solo** en `src/lib/content/` (cero contenido hardcodeado en componentes).

### Fase 2 — Ajustes del cliente (AJ-01…AJ-11)

**Objetivo:** implementar los requisitos del PDF. Diseño intacto; solo lo pedido.

**Alcance (trazabilidad completa en `docs/requisitos/ajustes-web-cliente.md`):**
- Hero nuevo (AJ-01/02/03): kicker + H1 + subtexto arriba; debajo, fila video (mix/backstage) + calendario; botones con más espacio.
- Sección editorial bajo calendario (AJ-04).
- Categorías renombradas: Restaurantes / Marcas personales / Pastelerías (AJ-05).
- Nueva ruta `/portafolio/[categoria]`: galería directa por categoría (AJ-06) con stage diapositiva sincronizado con el grid (AJ-07) y copy exacto por categoría (AJ-08), CTA "Agenda tu sesión" (AJ-09).
- Cierre con backstage/video de JJ, solo WhatsApp (AJ-10).
- Eliminar la sección marcada como innecesaria (AJ-11 — **requiere confirmación del cliente**).
- Detalle UX de galería (aprobado con el dev): Embla Carousel para el stage, blur-up LQIP de Cloudinary, hover zoom sutil, soporte de video en el grid, navegación por teclado, View Transitions API con mejora progresiva.

**Criterios de salida:**
- [ ] Todos los AJ-01…AJ-10 verificados visualmente y marcados en la tabla de trazabilidad.
- [ ] Lighthouse Performance ≥ 90 en móvil (media por Cloudinary, sin layout shift).
- [ ] Aprobación visual del cliente (screenshots o demo).

**Dependencias:** pendientes P-1…P-6 del cliente (videos, galerías, WhatsApp, Formspree, Instagram). Los ítems no bloqueados se ejecutan primero.

### Fase 3 — CMS (Sanity) sobre la capa de contenido

**Objetivo:** JJ edita categorías, textos, imágenes y galleries sin depender del dev.

**Alcance:**
- Proyecto Sanity con esquema: `category` (nombre, slug, tagline, descripción, cover, galería de `MediaAsset`, orden), `siteConfig` singleton (WhatsApp, Instagram, email, enlaces cal.com, textos del hero).
- Studio hospedado por Sanity (gratis) con onboarding visual para JJ.
- Adapter Sanity en `src/lib/content/` respetando los mismos tipos (las rutas no cambian).
- Webhook Sanity → Netlify para rebuild automático (~1 min).
- Imágenes siguen en Cloudinary (Sanity solo guarda URLs públicas).

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
