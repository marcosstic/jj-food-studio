# Fase 3 — Configuración pendiente (checklist de Marcos, ~10 minutos)

> El código del CMS ya está en producción. Estos pasos se hacen en los
> dashboards de Sanity y Netlify (donde ya tienes sesión). Cuando los
> termines, avísame y ejecuto el seed + la prueba end-to-end.

## 1. Crear el dataset `production` (Sanity)

1. Ve a **manage.sanity.io** → proyecto **JJ Food Studio** (tg1ohclj)
2. Menú izquierdo → **Datasets** → **Create dataset**
3. Nombre: `production` · Visibilidad: **Public** → Create
   *(sin esto, la web usa su contenido local de respaldo — no se rompe nada)*

## 2. Agregar los orígenes CORS (para que el panel funcione)

1. **manage.sanity.io** → tu proyecto → pestaña **API** → sección **CORS origins** → **Add CORS origin**
2. Agrega estos tres, uno por uno, marcando **Allow credentials ✓**:
   - `https://jjfoodstudio.com`
   - `https://jjfoodstudio.netlify.app` (si aplica)
   - `http://localhost:4173` y `http://localhost:5173` (para desarrollo)

## 3. Crear el token de escritura (para el seed inicial)

1. **manage.sanity.io** → tu proyecto → **API** → **Tokens** → **Add API token**
2. Nombre: `seed` · Permisos: **Editor** → guardar
3. **Cópialo** y pégamelo (o agrégalo tú mismo en `.env.local` como `SANITY_WRITE_TOKEN=...`)

Con este token ejecuto `scripts/seed-sanity.mjs`, que sube a Sanity todo el
contenido actual (3 categorías con galerías, servicios, cursos, config) para
que JJ arranque con el panel lleno.

## 4. Invitar a JJ al proyecto

1. **manage.sanity.io** → tu proyecto → **Members** → **Invite member**
2. Email de JJ → rol **Administrator** (o Editor)

Así JJ entra a `jjfoodstudio.com/panel` con SU cuenta de Google/Sanity y ve el panel.

## 5. Webhook: publicar en Sanity → reconstruir el sitio (Netlify)

1. **app.netlify.com** → proyecto **jjfoodstudio.com** → **Site configuration → Build & deploy → Build hooks** → **Add build hook**
   - Nombre: `sanity-publish` · Branch: `main` → **Save** → copia la URL secreta
2. **manage.sanity.io** → tu proyecto → **API** → **Webhooks** → **Create webhook**
   - Nombre: `netlify-rebuild`
   - URL: (la URL del build hook que copiaste)
   - Trigger on: **Create, Update, Delete**
   - Filter: (opcional) `_type in ["category","siteConfig","homeContent","service","course","mediaItem"]`
   - **Save**

## Verificación final (la hago yo cuando termines los pasos)

1. Ejecuto el seed (paso 3) → contenido en Sanity
2. Abro `jjfoodstudio.com/panel` → login de Sanity → panel en español con categorías, galerías y config
3. Creo/edito una categoría de prueba → publico → el webhook reconstruye → **jjfoodstudio.com actualizada en ~1 minuto**
4. Marco la Fase 3 como completa en el plan maestro
