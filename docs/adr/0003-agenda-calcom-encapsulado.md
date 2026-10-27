# ADR-0003: Agenda — cal.com encapsulado, no construir sistema propio (por ahora)

- **Estado:** Aceptada (2026-10-27)
- **Fase:** 1 (encapsulación) → 4 (reevaluación)

## Contexto

El cliente agenda sesiones vía widget de cal.com (ya integrado, sincronizado con
Google Calendar). El dev percibe limitaciones del plan gratuito (branding,
funciones). Construir un sistema propio implicaría: zonas horarias y DST,
prevención de doble reserva, sincronía bidireccional con Google Calendar
(OAuth + webhooks), emails transaccionales con deliverability garantizada,
flujos de reagenda/cancelación y panel admin — semanas de trabajo y
mantenimiento permanente.

## Decisión

**No construir sistema propio ahora.** Encapsular cal.com en un componente
`BookingWidget` + servicio `booking.ts` (ADR de arquitectura) de modo que cambiar
de proveedor en el futuro cueste horas, no días.

**Escalones si el plan gratuito limita (en orden):**
1. Plan pago de Cal (~$12/mes; quita branding — relevante para el evento).
2. Self-host de Cal open source (requiere VPS, ver ADR-0005).
3. Sistema propio — solo con requisitos que Cal no cubra y **diseño previo completo**.

## Consecuencias

- **Positivas:** agenda confiable desde el día 1 con costo $0; effort dedicado a lo
  visual (lo que el cliente evalúa); opción de salida barata si duele el branding.
- **Negativas:** branding de Cal visible en el plan free; dependencia del
  proveedor; límites del plan gratuito.

## Alternativas consideradas

- **Calendly:** plan gratuito más limitado (1 tipo de evento); ya descartado en
  `INSTRUCCIONS-CALCOM.md`.
- **Sistema propio inmediato:** costo/riesgo desproporcionado para el volumen
  actual; se reevalúa en Fase 4 con datos reales.
