# Requisitos: Ajustes web solicitados por el cliente (JJ)

> **Fuente de verdad:** `RESUMEN AJUSTES WEB-jj.pdf` (raíz del repo, 2026-09-30).
> Este documento transcribe el texto íntegro del PDF y lo traduce a requisitos
> accionables. Las capturas de pantalla de referencia viven solo en el PDF original
> (excluido del repo por peso, 7.7 MB).
> Estado: **pendiente de implementación** → se ejecuta en la Fase 2 del
> [plan maestro](../plan-maestro.md).

## Contexto

El cliente (JJ, productor audiovisual gastronómico) revisó el sitio y pidió ajustes
concretos. El diseño general (dark & moody, dorados, Gotham) le gusta y **no debe
cambiarse**: solo se aplican estas mejoras.

---

## AJ-01 · Nuevo hero con texto en lugar de imagen

**Texto original del PDF:**

> INTERCAMBIAR ESTA IMAGEN POR EL SIGUIENTE TEXTO:
> FOTOGRAFÍA Y VIDEO GASTRONÓMICO · ESTILISMO DE ALIMENTOS · DIRECCIÓN DE ARTE
>
> Imágenes que hacen que la comida se venda.
>
> Enfocado en restaurantes, pastelerías, marcas de alimentos y personales
>
> A su vez, subirlo a la parte de arriba (al lado del logo) y COLOCAR DEBAJO EL
> "CALENDARIO". Respetando los márgenes y el justificado.

**Requisito accionable:**
- Kicker (etiqueta superior): `Fotografía y video gastronómico · Estilismo de alimentos · Dirección de arte`
- H1: `Imágenes que hacen que la comida se venda.`
- Subtexto: `Enfocado en restaurantes, pastelerías, marcas de alimentos y personales`
- El bloque de texto sube a la parte superior del hero (junto al logo / cabecera).
- Debajo del texto va el **calendario** (widget de cal.com), respetando márgenes y alineación (justificado) del layout actual.

## AJ-02 · Separar los botones del hero

> SEPARAR LOS BOTONES DE "AGENDA TU SESIÓN"-"VER PORTAFOLIO" ETC.. PARA QUE TENGAN ESPACIO ENTRE SÍ.

- Aumentar el espacio entre botones CTA del hero (más gap horizontal/vertical, sin tocar su estilo visual).

## AJ-03 · Cambiar el video del hero por un MIX / Backstage

> Intercambiar VIDEO de "Kanz" por un "MIX" o "Backstage" - QUE TE VOY A PASAR
> EL CALENDARIO DEBE QUEDAR AL LADO DEL VIDEO

- Reemplazar el video actual del hero (DRACOROSSO_TEASER) por un video **mix/backstage pendiente de recibir** (ver pendientes).
- **Layout:** el calendario queda al lado del video (fila: video + calendario).
- ⚠️ Nota: AJ-01 dice "debajo [del texto] el calendario" y AJ-03 "al lado del video" — interpretación acordada: hero superior con el nuevo texto; debajo, una fila con el video a un lado y el calendario al otro.

## AJ-04 · Título editorial bajo el calendario

> DEBAJO DEL CALENDARIO VA UN TÍTULO QUE DICE:
> NO SE TRATA SOLO DE FOTOGRAFIAR COMIDA
>
> Se trata de construir imágenes que hagan que una persona quiera probarla y trasmitir experiencias

- Nueva sección bajo el bloque video+calendario con ese título y subtítulo exactos.

## AJ-05 · Nuevas categorías del portafolio (home)

> EN ESTA PARTE LOS TÍTULOS Y SUBTÍTULOS SERÍAN
> RESTAURANTES - Imagen, composición y antojo
> MARCAS PERSONALES - El talento detrás de cada plato
> PASTELERÍAS - Texturas, detalle y dulzura

- Las tres categorías pasan a ser: **Restaurantes**, **Marcas personales** (antes "Marcas de alimentos"), **Pastelerías** (antes "Pastelería"), con esos subtítulos exactos.

## AJ-06 · Clic en categoría → galería directa (sin pantalla intermedia)

> Al darle CLICK al item de "Portafolio-Restaurantes" debe enviar directamente a la GALERIA de ese item, donde aparecen todas las fotos variadas. IGUAL CON "MARCAS PERSONALES" Y "PASTELERÍA"
> NOTA: NO DEBE DIRIGIR A ESTA PANTALLA YA QUE ES REDUNDANTE.

- Cada tarjeta de categoría enlaza a su página de galería (`/portafolio/[categoria]`).
- La pantalla actual intermedia (grid de "casos de ejemplo" en `portafolio.html`) **desaparece del flujo**; el ítem de menú "Portafolio" apunta al portafolio nuevo (ver AJ-08 y pregunta abierta Q-1).

## AJ-07 · Galería con imagen grande tipo diapositiva

> EN LA IMAGEN GRANDE QUIERO QUE PASEN TODAS LAS FOTOS QUE ESTÁN CARGADAS EN LA "GALERIA" DEBAJO. ESTILO DIAPOSITIVA. ES DECIR LAS MISMAS QUE ESTAN ABAJO, SE REPITEN ARRIBA.

- Página de cada categoría: **stage grande arriba** con autoplay tipo diapositiva mostrando las mismas fotos del grid inferior, sincronizadas (clic en miniatura → salta la diapositiva).

## AJ-08 · Textos de cada página de categoría

> RESTAURANTES — Fotografía que abre el apetito.
> Construimos imágenes que transmiten la esencia de tu restaurante: sus platos, su ambiente y la experiencia detrás de cada servicio.
>
> MARCAS PERSONALES — La imagen detrás del talento.
> Retratos y contenido gastronómico para chefs, cocineros, pasteleros y profesionales que quieren construir una identidad visual propia.
>
> PASTELERÍAS — El detalle también se saborea.
> Imágenes que resaltan texturas, formas, color y detalle para convertir cada creación en una experiencia visual.

- Copy exacto para el encabezado de cada galería de categoría.

## AJ-09 · Botón "Quiero algo así" → "Agenda tu sesión"

> CAMBIAR EL BOTÓN "QUIERO ALGO ASÍ" POR "AGENDA TU SESIÓN" QUE REDIRIGE AL FORMULARIO/CALENDARIO

- En las galerías de categoría, el CTA dice "Agenda tu sesión" y redirige a `/contacto` (formulario + calendario).

## AJ-10 · Cierre: backstage o video de JJ presentando la web

> CAMBIAR ESTE VIDEO POR UN BACKSTAGE O POR VIDEO DE JJ PRESENTANDO LA WEB - ELIMINAR BOTONES Y TEXTO DE LOS LADOS. SOLO DEJAR "WHATSAPP"

- El video de cierre se reemplaza por un backstage o video de JJ **pendiente de recibir**.
- Se eliminan botones y textos laterales de esa sección; solo permanece el acceso a WhatsApp.

## AJ-11 · Borrar sección innecesaria

> BORRAR ESTA PARTE ES INNECESARIA

- ⚠️ **Q-1 (preguesta abierta):** el PDF acompaña esta nota de una captura que no puede transcribirse. Candidatas según contexto: la pantalla intermedia de portafolio (redundante, ver AJ-06) o una sección del home. **Confirmar con el cliente qué sección exacta se elimina antes de borrar nada.**

---

## Pendientes del cliente (bloqueantes de Fase 2)

| # | Pendiente | Bloquea a |
|---|-----------|-----------|
| P-1 | Video "mix" o "backstage" para el hero (subir a Cloudinary) | AJ-03 |
| P-2 | Video backstage o de JJ presentando la web (cierre) | AJ-10 |
| P-3 | Galerías completas por categoría (fotos variadas, ideal en carpetas de Cloudinary: `galerias/restaurantes`, `galerias/marcas-personales`, `galerias/pastelerias`) | AJ-06, AJ-07 |
| P-4 | Número de WhatsApp real (el botón flotante apunta a `wa.me/` sin número) | AJ-10 y sitio completo |
| P-5 | ID real de Formspree (`contacto.html` usa `TU_FORM_ID`) | Formulario |
| P-6 | URL real de Instagram (hoy `https://instagram.com/`) | Contacto |

## Trazabilidad

Cada requisito AJ-xx se implementa como ítem verificable de la **Fase 2** del plan
maestro y debe marcarse como hecho en este documento (columna Estado) al completarse.

| Req | Descripción corta | Estado |
|-----|-------------------|--------|
| AJ-01 | Hero nuevo con texto + calendario debajo | ⬜ |
| AJ-02 | Espacio entre botones | ⬜ |
| AJ-03 | Video mix/backstage + calendario al lado | ⬜ |
| AJ-04 | Título "No se trata solo de fotografiar comida" | ⬜ |
| AJ-05 | Categorías renombradas con subtítulos | ⬜ |
| AJ-06 | Clic categoría → galería directa | ⬜ |
| AJ-07 | Stage diapositiva sincronizado con grid | ⬜ |
| AJ-08 | Textos por categoría | ⬜ |
| AJ-09 | CTA "Agenda tu sesión" | ⬜ |
| AJ-10 | Cierre con backstage/video JJ, solo WhatsApp | ⬜ |
| AJ-11 | Borrar sección innecesaria (confirmar cuál) | ⬜ |
