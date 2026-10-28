# Propuesta — Fase 2c: banner visual + identidad vertical (pendiente de aprobación)

> **Estado:** PROPUESTA — no implementar hasta aprobación de Marcos.
> **Creada:** 2026-10-28 · Origen: nuevos cambios pedidos por JJ tras ver el sitio
> en producción (jjfoodstudio.com).

---

## 0. Ya resuelto ✓

El problema del botón "Agenda tu sesión" (confusión con el formulario) quedó
implementado y desplegado: embudo de 3 caminos (agenda → calendario, contacto →
formulario, WhatsApp → chat). Commit `acd2557`, verificado en producción.

## 1. Campos del formulario de cal.com (WhatsApp + ubicación)

**Lo que pide JJ:** que al agendar se pida también número de WhatsApp y ubicación
(campo de texto libre, sin selector de país).

**Análisis:** esto NO se programa en la web — son las **"Booking questions" del
tipo de evento en cal.com**. Ya lo tiene a medias: el campo *phone* existe pero
está oculto, y *location* es un selector. JJ (o tú con su login) debe:

1. cal.com → Event Types → **Sesión de Fotografía Gastronómica** → editar.
2. En **Booking questions**: activar **Phone** (renombrar etiqueta a "WhatsApp")
   y marcarlo requerido.
3. **Add question** → tipo **Texto largo** → etiqueta "Ubicación / País" → requerido.
   (texto libre = el usuario escribe cualquier país).
4. Repetir en cada tipo de evento que cree (los 4 pendientes del Paso 5).

Lo documento como **P-7** en requisitos. Yo preparo una mini-guía con capturas
para JJ cuando hagamos el CMS.

## 2. Botón "Confirmar" invisible en la agenda (BUG — lo arreglo yo)

**Síntoma:** al llegar al paso del formulario de reserva se ve "go back" pero no
el botón de confirmar. **Hipótesis técnica:** el iframe de cal.com no repinta su
altura al cambiar de paso (mes → formulario), y el botón queda cortado bajo el
pliegue del iframe. **Fix propuesto:** escuchar el evento de cambio de paso del
embed y re-medir/forzar la altura (o pasar a `layout: "column"` si el month_view
sigue inestable). Lo reproduzco en navegador, arreglo y subo — **hotfix antes de
todo lo demás**. (Ídem: el badge "Powered by Netlify" reapareció — mismo lote de
hotfix.)

## 3. Banner antes del tríptico (video · agenda · logo)

**Lo que pide JJ:** un banner/collage de fotos ANTES de la agenda. Marcos pregunta:
¿banner o carrusel? ¿y funciona un carrusel con imágenes verticales (el 95% del
material es vertical)?

### Opciones analizadas

| Opción | Descripción | Veredicto |
|--------|-------------|-----------|
| A. Banner estático (1 foto horizontal recortada) | Simple, pero **mata el 95% vertical**: recortar vertical a horizontal pierde el 60% de la imagen | ✗ |
| B. Collage fijo de tiles verticales | Banda de 4-5 fotos verticales estáticas con hover sutil | Correcto pero plano para un productor audiovisual |
| C. **Filmstrip autoplay (RECOMENDADA)** | Carrusel continuo de tiles verticales (≈4:5) desplazándose lento en loop infinito; pausa al hover/touch; estático si `prefers-reduced-motion` | ✓ |

**Por qué C:** los carruseles con imágenes verticales no solo existen — son el
patrón dominante en webs gastronómicas premium de referencia (y la estética
"stories" que el público de RRSS lee naturalmente). Muestra las verticales SIN
recortarlas, da movimiento "vivo" desde el primer píxel (JJ es audiovisual: su
web debe moverse), y reutilizamos **Embla** que ya está integrado.

**Diseño propuesto:**
- Banda full-bleed de **360–440px de alto**, 5-7 tiles verticales 4:5, scroll
  automático lento (60s por ciclo), pausa al hover, gradiente oscuro en los
  bordes para fundirse con el fondo.
- **La agenda no se sacrifica:** con ~400px de banner, el tríptico
  video·agenda·logo queda asomando en el primer viewport en desktop; en móvil el
  banner baja a ~300px (2.5 tiles visibles) y la agenda sigue primera en el flujo.
- Tras el banner: el tríptico sin cambios (video | agenda | logo).

### Destino de los textos que salen del hero

El H1 "Imágenes que hacen que la comida se venda." y el kicker pasan a la sección
**"Qué hacemos"** como titular (ese era su hueco natural: ahí ya viven el subtexto
y los botones). Nada se pierde: la frase gana protagonismo como cabecera de la
sección de marca, y el hero queda 100% visual + conversión.

## 4. Portafolio vertical + tamaños recomendados

**Cambio:** todo el portafolio pasa a vertical 4:5.

- **Grid:** 3 columnas de tarjetas 4:5 (móvil: 2 columnas), hover con zoom sutil
  (estilo editorial/foto-portfolio).
- **Stage diapositiva:** se rediseña a vertical — imagen grande 4:5 a la izquierda
  + tira de miniaturas vertical a la derecha (patrón de visor fotográfico
  profesional); en móvil se apila. Sigue sincronizado con el grid y con autoplay
  + flechas + teclado.
- **Tarjetas del home** (categorías): también 4:5 para consistencia.

### Especificación de tamaños (la respuesta directa a tu pregunta)

**¿La web ajusta las imágenes sola? SÍ.** Cloudinary recorta (`c_fill` a 4:5),
convierte al formato óptimo del navegador (WebP/AVIF con `f_auto`) y genera todas
las resoluciones del `srcset` automáticamente. **JJ sube el original bueno y
nosotros servimos la versión perfecta para cada dispositivo.**

| Elemento | Qué debe subir JJ | Qué sirve la web |
|----------|-------------------|------------------|
| Fotos galería/banner | Vertical 4:5 (o cualquier vertical), **2000–2500px lado largo**, JPEG calidad alta (sin comprimir él mismo) | 400×500 → 800×1000 → 1200×1500 (WebP/AVIF, lazy + blur-up) |
| Portadas de categoría | Igual que fotos | Igual |
| Video hero (columna izquierda) | **Vertical 9:16, 1080×1920**, MP4 H.264 | `q_auto,f_auto` (recorte automático a la caja) |
| Video de cierre | **Horizontal 16:9, 1080p**, MP4 H.264 | idem |
| Duración videos | **8–15 s en loop perfecto, sin audio** | — |

Regla de oro para JJ (para la guía del CMS): *sube siempre el original a máxima
calidad; la web hace el resto*. Nunca comprimir a mano.

## 5. Placeholders verticales (mientras llega el material de JJ)

Yo busco y coloco **8-10 fotos gastronómicas verticales dark & moody** de bancos
libres (Pexels/Pixabay) en `static/placeholders/` — el banner y las galerías se
ven llenas y profesionales desde ya. Cuando exista el CMS (Fase 3), JJ las
reemplaza por las suyas sin tocar código. (Si me pasas la API key de Cloudinary,
las subo además a su cuenta para dejar la estructura de carpetas lista.)

## 6. Todo esto se administra luego desde el panel de JJ

Banner, galerías, portadas y videos quedarán como contenido del CMS en la
**Fase 3 (Sanity)** — ya estaba en el esquema: `homeContent` (banner + videos),
`category` (portada + galería). La Fase 2c se construye sobre la capa de contenido
así que el swap a panel es trivial después.

## 7. Plan de ejecución (a aprobar)

| Paso | Contenido | Tipo |
|------|-----------|------|
| 1 | **Hotfix**: botón confirmar de cal.com + badge Netlify | bug |
| 2 | **Banner filmstrip vertical** (Embla, autoplay, reduced-motion) + mudanza de H1/kicker a "Qué hacemos" | feature |
| 3 | **Portafolio vertical 4:5**: grid, stage vertical, tarjetas home | feature |
| 4 | **Placeholders** stock verticales | contenido |
| 5 | Commit + push + verificación en producción | entrega |

**Aprobaciones necesarias:**
- [ ] Filmstrip autoplay (Opción C) como banner
- [ ] H1 + kicker mudándose a "Qué hacemos"
- [ ] Portafolio/stage/tarjetas en 4:5 vertical
- [ ] Yo buscar los placeholders verticales de stock
- [ ] Orden de ejecución 1→5
