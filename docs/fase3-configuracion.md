# Fase 3 — Estado de configuración

> Actualizado 2026-10-31. Infraestructura configurada **vía API**
> (tokens de Cloudflare y Sanity que dio Marcos).

## Panel de JJ (Sanity Studio hospedado)

**URL: <https://jjfoodstudio-panel.sanity.studio>** (login `jjifoodstudio@gmail.com`).

- Código fuente: `studio/` (React, **Sanity v4.22**). Redesplegar tras cambiar
  esquema/copy del panel — **requiere Node ≥20.19 (usamos 22 vía nvm)** porque
  el CLI v4 usa `require(esm)`:
  `export PATH="$HOME/.config/nvm/versions/node/v22.23.4/bin:$PATH"` y luego
  `cd studio && SANITY_AUTH_TOKEN=<SANITY_DEPLOY_TOKEN de .env.local>
  ./node_modules/.bin/sanity deploy -y`
- `studio/sanity.cli.ts` fija projectId y `studioHost` (evita el prompt
  interactivo del CLI). Token: **Deploy Studio (Token only)** en `.env.local`
  como `SANITY_DEPLOY_TOKEN` (el de escritura NO tiene ese permiso).
- Limpieza 2026-10-31: se quitaron por API los campos huérfanos
  `homeContent.banner` (residuo del esquema viejo del banner) y `service.cta`
  ×5 — eran la causa de los avisos "Unknown field found" en el panel.
  El sitio nunca los leyó (el banner vive en `bannerHome`).

## Qué ya quedó (automático, sin dashboard)

| Ítem | Estado |
|------|--------|
| Dataset `production` (público) en Sanity tg1ohcli | ✅ |
| CORS: `https://jjfoodstudio.com`, `https://www.jjfoodstudio.com`, localhost | ✅ |
| Token de escritura Sanity (en `.env.local`) | ✅ |
| JJ como miembro **Administrator** (`jjifoodstudio@gmail.com`) | ✅ |
| Contenido sembrado: 3 categorías + galerías + bannerHome (7 fotos) + config | ✅ |
| Proyecto Cloudflare Pages `jjfoodstudio` (subida directa vía wrangler) | ✅ |
| Dominios `jjfoodstudio.com` y `www` activos, certificado emitido | ✅ |
| DNS zona Cloudflare: CNAME `@` y `www` → `jjfoodstudio.pages.dev` | ✅ |
| Sitio sirviendo el build nuevo (slider + contenido de Sanity) | ✅ verificado |

**Nota de dominio:** el dominio es `jjfoodstudio.com` (sin "i").
**Nota de correo:** la cuenta de JJ es `jjifoodstudio@gmail.com` (con "i"),
la misma con la que creó Sanity — accesos con esa cuenta.

## Cómo se despliega ahora (VERIFICADO end-to-end 2026-10-30)

```
push a main ────────────────→ GitHub Actions → npm run build → wrangler → Pages
Sanity webhook (publicación)→ jjfoodstudio.com/hooks/sanity (Pages Function)
                              → GitHub dispatch → Actions → Pages
```

- El workflow está en `.github/workflows/deploy-pages.yml` (Node 22; el
  prebuild trae el contenido publicado de Sanity, dataset público).
- El webhook NO llama directo a GitHub (su API exige `{"event_type":...}` en
  el cuerpo, incompatible con el payload de Sanity): lo traduce la Pages
  Function `functions/hooks/sanity.js` con clave en la URL. Secretos
  `GH_TOKEN` y `HOOK_KEY` viven en el proyecto Pages (creados con
  `wrangler pages secret put`).
- Probado: clave errónea → 403; clave correcta → dispatch 204 → run de
  Actions en success → sitio actualizado.
- El deploy hook de Pages (subida directa) quedó descartado: devuelve HTTP 500
  y no reconstruye con contenido nuevo.

## Paso único pendiente (Marcos, ~2 minutos): registrar el webhook en Sanity

La API de Sanity rechaza crear webhooks con el token de escritura (exige
grant de admin del proyecto), así que se crea desde el panel:

1. **manage.sanity.io** → proyecto **JJ Food Studio** (tg1ohcli) → pestaña
   **API** → **Webhooks** → **Create webhook**
2. Copiar tal cual:
   - **Name**: `deploy-sitio-jjfoodstudio`
   - **URL**: (ver `SANITY_WEBHOOK_URL` y `SANITY_WEBHOOK_KEY` en `.env.local`
     — juntas: `…/hooks/sanity?k=<clave>`)
   - **Dataset**: `production`
   - **Trigger on**: Create / Update / Delete
   - **Include drafts**: OFF (así solo publica cambios PÚBLICOS)
   - **HTTP method**: POST · **Custom headers**: ninguno · **Filter**: vacío
3. **Save** → avisarme para correr la prueba completa.

## Cuidado con la expiración del PAT

Los fine-grained tokens de GitHub vencen (este expira **2027-05-01**).
Cuando venza: los `git push` y el relé del webhook fallarán (el `GH_TOKEN`
del proyecto Pages también). Al renovarlo: actualizar `.env.local`, el
secreto `GH_TOKEN` de Pages (`wrangler pages secret put GH_TOKEN …`) y el
secreto `CLOUDFLARE_API_TOKEN` de Actions en GitHub.

## Verificación final (2026-10-31, en curso)

1. Publicar un cambio de prueba desde el panel → webhook → `/hooks/sanity` →
   dispatch → Actions en success → **jjfoodstudio.com actualizado en ~2 min**
2. Marcar la Fase 3 como completa en el plan maestro y escribir la guía de
   uso del panel para JJ
