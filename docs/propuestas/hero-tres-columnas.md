# Propuesta — Hero a 3 columnas: video · agenda · logo

> **Estado:** ✅ Implementada (v1) · **§7 AJUSTE PROPUESTO (v2) — pendiente de aprobación**.
> **Creada:** 2026-10-27 · Origen: feedback de Marcos tras ver el home en pantalla
> ancha ("hay espacio suficiente sin contenido a izquierda y derecha").

---

## 1. Diagnóstico

- La banda del hero actual tiene **2 columnas** (video 340px + calendario) dentro de
  un container de **1120px**: en pantallas ≥1440px quedan márgenes vacíos grandes a
  ambos lados (lo que Marcos ve).
- El logo grande vive más abajo (sección "Qué hacemos") → la marca **no aparece en
  el pantallazo de conversión** (agenda + video).

## 2. Layout propuesto (POV del visitante mirando su PC)

```
┌────────────────────────────────────────────────────────────────────────┐
│ KICKER                                                                  │
│ Imágenes que hacen que la comida se venda.                             │
│                                                                        │
│ ┌──────────┐   ┌──────────────────────────────┐   ┌──────────────┐     │
│ │  VIDEO   │   │         AGENDA               │   │  LOGO  JJ    │     │
│ │ vertical │   │      (cal.com, centro,       │   │ (compacto +  │     │
│ │ (reel)   │   │    la pieza dominante)       │   │  selector)   │     │
│ └──────────┘   └──────────────────────────────┘   └──────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

**Columnas y proporciones:**

| Columna | Ancho | Rol visual |
|---------|-------|------------|
| Video (izquierda) | `260–300px` fijo | Contenido/apetito, altura `min(70vh,720px)` con recorte |
| **Agenda (centro)** | `flexible (≈640–680px)` — **la más ancha** | Elemento dominante: prioridad de JJ respetada |
| Logo (derecha) | `260–300px` fijo | Marca + selector discreto de versiones debajo |

- **Bandas de separación:** `--space-5` (32px) entre columnas, alineación vertical
  centrada (alturas similares: video 70vh / agenda ~700px / logo ~300–420px).
- El H1/kicker se mantiene arriba a lo ancho (1–2 líneas, igual que hoy).

## 3. Cambios técnicos (acotados)

1. **Token nuevo `--container-wide: 1360px`** en `tokens.css`: la banda del hero lo
   usa para aprovechar las pantallas anchas. *Enmienda documentada al contrato de
   layout (AGENTS.md §5): "única excepción al container 1120: la banda hero".*
   El resto del sitio sigue en 1120px — coherencia intacta.
2. **LogoStage variante compacta** (prop `size="compact"`): 280–300px con
   `min-height` ajustado. Nota técnica: el buffer del canvas 3D ya tiene mínimo
   420px internamente → en caja menor se ve **más nítido**, sin cambio de código 3D.
3. **"Qué hacemos" se aligera**: pierde el logo (sube al hero) y queda como banda
   de texto + botones + pills. Alternativa futura (no ahora): fusionarla con la
   editorial para acortar la página.
4. **Sticky eliminado** en el video (con 3 columnas de alturas similares ya no
   aporta; menos excepciones al contrato de layout).

## 4. Responsive (breakpoints)

| Ancho | Comportamiento |
|-------|----------------|
| ≥1200px | **3 columnas** (propuesta) |
| 980–1199px | 2 columnas: agenda (dominante) + video; logo compacto debajo del video |
| <980px | Pila en orden: título → **agenda** (prioridad JJ) → video → logo + selector |

Verificación obligatoria: `scrollWidth == clientWidth` (sin overflow) + screenshots
en 1440, 1366, 1280, 1024 y 390.

## 5. Por qué es estratégicamente correcto (y honesto sobre el riesgo)

- ✅ **Marca + conversión juntas**: el visitante ve el logo (identidad premium) en
  el mismo pantallazo donde agenda (acción) y el video (prueba de calidad).
  Ideal también para la demo en vivo de la competencia: los 3 activos de JJ visibles.
- ✅ Resuelve el aire muerto lateral usando el ancho real de pantalla.
- ⚠️ **Riesgo controlado**: densidad visual — si el logo compitiera con la agenda,
  se rompe la prioridad de JJ. Mitigación: agenda = columna más ancha y centrada;
  logo en columna estrecha con selector tenue. El H1 sigue siendo lo primero que
  se lee.

## 6. Alcance

Solo `HeroSection.svelte`, `WhatWeDoSection.svelte`, `tokens.css` (1 token) y
`LogoStage.svelte` (prop de tamaño). Sin tocar el resto de secciones ni páginas.
Verificación con screenshots antes/después como en fases anteriores.

---

## 7. v2 — Ajuste de alineación: "el tríptico uniforme" ✅ IMPLEMENTADA (2026-10-28, Opción B aprobada)

**Feedback de Marcos (post-implementación):** los tres bloques se ven como
"escalera"; quiere que **en la parte superior los tres estén en línea** y que el
conjunto se vea "estratégicamente uniforme"; la parte inferior no importa.

### 7.1 Diagnóstico medido (2026-10-27, navegador real)

| Viewport | Layout | Tops medidos | Problema |
|----------|--------|--------------|----------|
| 1280px (3 col) | video·agenda·logo | video 275 · agenda 275 · **logo 501** | El logo está centrado verticalmente (`align-self: center`) → arranca **226px más abajo**: ese es el escalón |
| 1100px (2 col) | video·agenda / logo debajo | video 264 · agenda 264 · logo 1077 (segunda fila) | Alineados entre sí ✓ (logo abajo por diseño del rango) |
| 390px (pila) | título→agenda→video→logo | agenda 325 · video 1155 · logo 1671 | Correcto (prioridad JJ) ✓ |

**Causa raíz:** el centrado vertical del logo en su columna. El video y la agenda
ya arrancan a la misma altura.

### 7.2 Opciones

**Opción A — Solo alinear tops (mínima):** quitar el centrado (`align-self: start`).
Los tres arrancan en línea; abajo cada uno termina donde termine.
- ⚠️ Contra: el logo (280px) deja ~500px de vacío debajo en su columna → se ve
  "flotando" otra vez, solo que arriba. No resuelve "uniforme".

**Opción B — Tríptico uniforme (RECOMENDADA):** `align-items: stretch` — las tres
columnas miden lo mismo (la altura natural de la agenda, ~785px):
- **Video:** llena su columna completa con `object-fit: cover` (recorte elegante).
- **Agenda:** columna dominante, define la altura (igual que hoy).
- **Logo:** dentro de su columna, centrado vertical y envuelto en una **tarjeta
  glass sutil** (mismo lenguaje de `.card`: borde tenue + fondo 0.04 + sombra) —
  el aire arriba/abajo queda **intencional**, como panel de marca premium, no como
  vacío.
- Tops y bases alineados → efecto editorial de tríptico: lo "estratégicamente
  uniforme" que pides.

### 7.3 Ajustes complementarios

1. **Rango 980–1199px:** mismo tratamiento stretch para la fila video·agenda
   (tops ya alineados; se igualan alturas). El logo sigue debajo, ancho completo,
   también en tarjeta glass.
2. **Móvil (<980px):** se mantiene título → agenda → video → logo (medido ✓).
   Blindaje defensivo: órdenes explícitas en los tres items (`order` en media,
   cal y logo) para que ningún navegador/caché pueda mostrar otra secuencia
   (la captura de Marcos sugería una versión cacheada con video primero).
3. **Sticky:** sigue fuera (sin cambios).

### 7.4 Verificación al implementar

- Medición programática: tops de los 3 bloques iguales (±4px) en 1440 y 1280.
- `scrollWidth == clientWidth` en 1440/1366/1280/1024/390.
- Screenshots desktop + móvil.
- Solo se toca `HeroSection.svelte` (+2 líneas de `components.css` para la
  tarjeta glass del logo si hace falta).
