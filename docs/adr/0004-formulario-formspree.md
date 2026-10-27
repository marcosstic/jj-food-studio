# ADR-0004: Formulario de contacto — Formspree con endpoint configurable

- **Estado:** Aceptada (2026-10-27)
- **Fase:** 1

## Contexto

El formulario de contacto ya existe (frontend propio: HTML/CSS/UX hechos a medida).
Lo que falta es el backend que recibe envíos, filtra spam y notifica por email.
`contacto.html` aún usa el placeholder `TU_FORM_ID` de Formspree. Un backend propio
exigiría función servidor + servicio de email transaccional + anti-spam/rate-limit:
infraestructura genérica que no aporta valor visual al cliente.

## Decisión

Usar **Formspree (plan gratuito, 50 envíos/mes)** — suficiente para el volumen de
leads de un fotógrafo gastronómico (10–30/mes). El endpoint vive en **una sola
constante de configuración** del componente `ContactForm`/servicio, de modo que
cambiar de proveedor es editar una línea.

**Pendiente del cliente:** ID real de Formspree (P-5 en requisitos).

## Consecuencias

- **Positivas:** cero infraestructura propia; formulario ya construido sigue
  igual; swap trivial en el futuro.
- **Negativas:** límite de 50 envíos/mes (si se supera, escalar a plan pago o
  migrar a Netlify Forms / función propia).

## Alternativas consideradas

- **Netlify Forms:** consolidaría cuentas (100 envíos/mes), opción preferida si la
  sensación de "demasiados servicios" pesa; se deja como plan B documentado.
- **Función propia (Netlify Function + Resend):** factible y barata, pero es
  plumbing sin valor para el cliente; solo si los límites aprietan.
