# ADR-0007: Migración de hosting — Netlify → Cloudflare Pages

- **Estado:** Aceptada e implementada (2026-10-30)
- **Fecha:** 2026-10-30

## Contexto

Netlify cambió su modelo: el plan gratuito ahora tiene **créditos de build
mensuales**. El equipo agotó los créditos del ciclo (Oct 1 – Oct 31) por el
churn de desarrollo (múltiples deploys en un mismo día durante las Fases
1–3), y los deploys de producción quedaron **pausados hasta el 1 de
noviembre**. El sitio publicado sigue en línea; solo los nuevos deploys
están detenidos.

**Uso real esperado en producción:** JJ cambiará fotos/videos
aproximadamente **semanalmente** → ~4–6 deploys/mes ≈ 15–20 minutos de build.
El agotamiento fue por churn de desarrollo (mis pushes repetidos de prueba),
no por el uso normal del CMS.

## Decisión propuesta

**Migrar el hosting a Cloudflare Pages (plan gratuito)**, que para este caso:

| Criterio | Cloudflare Pages (gratis) | Netlify (gratis) | Vercel (Hobby) |
|----------|---------------------------|------------------|----------------|
| Builds/mes | **500** | ~300 min (agotado) | 6000 min |
| Ancho de banda | **Ilimitado** | 100 GB | 100 GB |
| **Uso comercial permitido** | ✓ | ✓ | ✗ **prohibido en Hobby** |
| Deploy hooks (Sanity) | ✓ | ✓ | ✓ |
| Dominio propio | ✓ | ✓ | ✓ |
| CDN global | ✓ (uno de los más rápidos) | ✓ | ✓ |

- **Vercel se descarta**: su plan gratuito **prohíbe uso comercial** — la web
  de un negocio (JJ) no puede vivir ahí sin pagar.
- **Netlify sigue siendo viable** tras el reset del ciclo (el uso semanal de
  JJ es mínimo), pero el episodio demostró el riesgo: un mes de actividad
  intensa (o varios redeploys por un fix) deja a un negocio **sin poder
  publicar**.

## Plan de migración (una vez aprobado)

1. **Cloudflare Pages** → conectar el mismo repo GitHub (`marcosstic/jj-food-studio`, branch `main`)
2. Build command: `npm run build` · Output: `build` · NODE_VERSION=20 (ya está en netlify.toml; se replica)
3. **Webhook**: crear en Cloudflare (deploy hook) y re-crear en Sanity (API → Webhooks) apuntando a la URL nueva
4. **Dominio**: apuntar `jjfoodstudio.com` al proyecto de Cloudflare (CNAME) — el dominio vive en la DNS de Netlify actualmente; la migración de DNS es la parte con más pasos
5. **Sanity CORS**: agregar el dominio definitivo en manage.sanity.io (2 min)
6. Verificación end-to-end: panel → publish → sitio actualizado en ~1 min

**Precaución de transición:** mantener el sitio de Netlify en línea hasta
verificar el de Cloudflare; recién entonces cambiar el dominio. Cero
downtime.

## Adenda (2026-10-30): dominio en Namecheap + gestión por API de Cloudflare

El dominio está registrado en **Namecheap** (no en Netlify). La API de
Namecheap es restrictiva (requiere habilitación + whitelist de IP) — se
descarta. **Plan de DNS elegido: migrar la DNS del dominio a Cloudflare**:

1. Marcos agrega el sitio en Cloudflare (plan Free) → Cloudflare importa los
   registros actuales y asigna **2 nameservers** (`xxx.ns.cloudflare.com`)
2. En **Namecheap** → Domain List → jjfoodstudio.com → Nameservers →
   **Custom DNS** → pegar los 2 nameservers de Cloudflare (1 minuto; el
   sitio nunca se cae — Cloudflare importa la configuración vigente)
3. Marcos crea un **API Token** (template "Edit zone DNS" + Cloudflare Pages
   Edit + Zone Read) y el **Account ID** → me los pasa
4. **Yo gestiono por API de Cloudflare**: verificar/corregir registros DNS,
   conectar el dominio al proyecto Pages, variables y deployments

**Resultado:** DNS + hosting + SSL + deployments, todo administrable por API
de Cloudflare por mi parte — sin depender de panel de Namecheap ni Netlify.

## Adenda 2 (2026-10-30): mecanismo de deploy real

Lo que efectivamente se implementó (difiere del plan original en el punto 1):

- La conexión git de Pages falló desde el dashboard ("Error connecting to
  git account") → el proyecto se creó como **subida directa vía API** y los
  deploys manuales se hacen con `wrangler pages deploy build`.
- El **deploy hook** de Pages en proyectos de subida directa quedó descartado:
  devuelve HTTP 500 y no reconstruye con contenido nuevo (verificado
  empíricamente: sin deployment nuevo tras dispararlo).
- **Deploy automático elegido: GitHub Actions** (`.github/workflows/deploy-pages.yml`):
  se dispara con push a `main` o con `repository_dispatch` tipo `sanity`
  (que será el objetivo del webhook del CMS), construye con `npm run build`
  (el prebuild trae el contenido publicado de Sanity, dataset público, sin
  secretos del CMS) y despliega con wrangler usando los secretos del repo.
- Estado del dominio al cierre: `www.jjfoodstudio.com` y `jjfoodstudio.com`
  **activos con certificado** en el proyecto Pages; registros CNAME `@`/`www`
  → `jjfoodstudio.pages.dev` (proxied).
- Cadena completa verificada (2026-10-30): Actions deploya en success con
  secretos del repo (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`).
  El webhook de Sanity pasa por una **Pages Function** (`functions/hooks/sanity.js`)
  en la propia web (`/hooks/sanity?k=<clave>`): GitHub exige
  `{"event_type":...}` en el cuerpo, incompatible con el payload de Sanity,
  y la API de Sanity rechaza crear webhooks con token de escritura, así que
  el registro del webhook es el último paso manual (UI de manage.sanity.io).
- Pendiente para cerrar la Fase 3: Marcos registra el webhook en Sanity
  (valores exactos en `docs/fase3-configuracion.md`) → prueba con publicación.

## Consecuencias

- **Positivas:** 500 builds/mes (sobrado para cambios semanales), ancho de
  banda ilimitado, sin sorpresas de créditos, CDN global premium, misma
  arquitectura (build estático + webhook de Sanity funciona igual).
- **Negativas:** migración de DNS del dominio (los pasos con más fricción);
  una plataforma más en el stack (aunque reemplaza a Netlify, no se suma).

## Alternativas consideradas

- **Quedarse en Netlify:** viable tras el reset (uso semanal mínimo), pero el
  riesgo de "pausa por créditos" reaparece cualquier mes de actividad alta —
  inaceptable para la web de un negocio que compite.
- **Vercel Hobby:** prohibido para comercial.
- **GitHub Pages:** gratis e ilimitado pero sin build hooks nativos ni
  headers/redirects finos; requeriría GitHub Actions (más piezas).
