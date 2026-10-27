# ADR-0001: Migrar a SvelteKit con renderizado estático

- **Estado:** Aceptada (2026-10-27)
- **Fase:** 1

## Contexto

El sitio es vanilla (HTML/CSS/JS): 7 páginas con header, footer, panel demo y
WhatsApp flotante duplicados en cada archivo, estilos inline en `contacto.html` y
JS modular pero orquestado a mano. Cada mejora del cliente (Fase 2) tocaría varios
archivos a mano. El roadmap exige escalabilidad: static → CMS → posible sistema de
agenda. El diseño visual está aprobado y debe mantenerse intacto.

## Decisión

Migrar a **SvelteKit 2 + Svelte 5** con `@sveltejs/adapter-static` y `prerender = true`
en todas las rutas. El output sigue siendo un sitio estático puro servido por
Netlify (igual que hoy). El CSS actual se porta intacto como estilos globales por
capas (`tokens → base → components → pages`) para garantizar paridad visual 1:1.

## Consecuencias

- **Positivas:** componentes reutilizables; rutas por archivos; carga bajo demanda
  de Three.js; base natural para CMS (load functions + rutas dinámicas prerender);
  Svelte 5 (runes) genera bundles mínimos sin virtual DOM; DX moderna (HMR).
- **Negativas:** introduce toolchain de Node/npm (hoy inexistente); esfuerzo de
  migración inicial con riesgo de regresión visual (mitigado con verificación por
  screenshots); requiere cambiar el build en Netlify.

## Alternativas consideradas

- **Quedarse en vanilla:** cero costo de migración, pero el mantenimiento empeora
  con cada feature y el roadmap (CMS) lo hace inviable.
- **Astro:** excelente para contenido estático, pero obligaría a un segundo stack
  al llegar la parte interactiva (agenda propia). Se descarta por el roadmap.
- **Next.js:** ecosistema mayor pero bundles más pesados y orientación React
  innecesaria para este caso.
