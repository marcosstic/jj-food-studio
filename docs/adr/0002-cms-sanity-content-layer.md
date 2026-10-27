# ADR-0002: Gestión de contenido — capa tipada propia y luego Sanity

- **Estado:** Aceptada (2026-10-27)
- **Fase:** 1 (capa de contenido) → 3 (Sanity)

## Contexto

El cliente (JJ) debe poder cambiar **categorías, textos e imágenes de cada
categoría** sin depender del desarrollador. Hoy el contenido vive hardcodeado en el
HTML. El sitio debe seguir siendo estático y rápido, y el media ya vive en
Cloudinary con transformaciones (`f_auto`, `srcset`) que conviene preservar.

## Decisión

**Fase 1:** crear una capa de contenido propia en `src/lib/content/` — tipos TS
(`SiteConfig`, `Category`, `MediaAsset`, …) + datos locales. Es el único lugar de
donde las rutas obtienen contenido (patrón repositorio/proveedor).

**Fase 3:** reemplazar el proveedor local por un **adapter de Sanity** (headless
CMS hospedado, plan gratuito suficiente para este proyecto). Sanity almacenará
texto y URLs de Cloudinary — **no los archivos** — para mantener el pipeline de
transformaciones actual. El estudio de Sanity queda hospedado por ellos; JJ edita
en un panel web y un webhook reconstruye Netlify (~1 min).

## Consecuencias

- **Positivas:** el swap a CMS no toca rutas ni componentes (mismos tipos); el
  sitio sigue prerender (los visitantes nunca tocan Sanity); el cliente obtiene un
  panel de edición profesional; costo $0 al día.
- **Negativas:** una cuenta/servicio más; los cambios de contenido requieren un
  rebuild (~1 min, automático); dependencia del servicio Sanity (mitigable: el
  contenido es exportable y la capa permite cambiar de proveedor).

## Alternativas consideradas

- **Decap CMS (Netlify CMS):** gratis y Git-based, pero UX envejecida — el cliente
  es visual y la experiencia de edición importa.
- **Payload/Strapi/Directus self-host:** exigen servidor propio (choca con ADR-0005).
- **Contenido en JSON en el repo sin CMS:** ya no sirve: el cliente no usa git.
