# ADR-0006: Arquitectura de la aplicación — capas + capa de contenido + tokens

- **Estado:** Aceptada (2026-10-27)
- **Fase:** 1 (patrón vinculante para todo el proyecto)

## Contexto

El proyecto necesita un patrón moderno, modular y escalable que sobreviva a la
evolución static → CMS → posible agenda propia, que otro desarrollador o IA pueda
continuar, y que proteja el diseño aprobado (el cliente no quiere rediseño).

## Decisión

**Arquitectura en capas con capa de contenido (repositorio) y design tokens como
única fuente visual.** Reglas completas y estructura de directorios en
[AGENTS.md §5](../../AGENTS.md). Resumen:

1. **Capas con dependencia solo hacia abajo:**
   `routes` (composición) → `components` (presentación) → `content` (repositorio
   de datos) y `services` (integraciones externas). `scripts` = efectos DOM como
   Svelte actions.
2. **Capa de contenido:** único origen del contenido del sitio; hoy datos TS
   tipados, mañana adapter Sanity (ADR-0002). Las rutas jamás hardcodean contenido.
3. **Componentes presentacionales:** reciben props; sin fetch ni conocimiento del
   origen de datos (dumb/smart separation).
4. **Design tokens:** colores, espaciados y tipografías solo desde `tokens.css`;
   CSS global por capas heredado del diseño actual; clases BEM.
5. **Servicios encapsulan proveedores** (cloudinary, booking, formspree): cambiar
   de proveedor toca un archivo.

**Metodología obligatoria en cada cambio:** diseñar → implementar (datos/lógica
primero) → verificar (build + screenshots + responsive + accesibilidad).

## Consecuencias

- **Positivas:** sustituciones de proveedores baratas; el diseño queda blindado
  por los tokens; onboarding trivial para cualquier IA/dev (AGENTS.md + ADRs);
  testing razonable por slice vertical.
- **Negativas:** algo más de archivos/indirección que escribir todo inline;
  disciplina requerida (las reglas de AGENTS.md son la mitigación).

## Alternativas consideradas

- **Atomic design (atoms/molecules/organisms):** nomenclatura útil pero añade
  jerarquía innecesaria en un sitio de este tamaño.
- **Arquitectura hexagonal completa:** sobreingeniería para un sitio estático + CMS.
