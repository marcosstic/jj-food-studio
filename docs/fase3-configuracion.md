# Fase 3 — Estado de configuración

> Actualizado 2026-10-30. La infraestructura quedó configurada **vía API**
> (token de Cloudflare que dio Marcos). Solo queda un paso manual en GitHub.

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

## Cómo se despliega ahora

```
push a main ──────────────┐
                          ├─→ GitHub Actions → npm run build → wrangler → Pages
Sanity webhook (contenido)┘         (el prebuild trae el contenido de Sanity)
```

El workflow está en `.github/workflows/deploy-pages.yml`. Se dispara con:
1. **Push a `main`** (cambios de código o diseño).
2. **`repository_dispatch` tipo `sanity`** (cuando JJ publica contenido).

El deploy hook de Pages (subida directa) quedó descartado: devuelve HTTP 500
y no reconstruye con contenido nuevo.

## Paso único pendiente (Marcos, ~2 minutos)

El PAT de GitHub (`github_pat_11BN…`) no tiene dos permisos que faltan:

1. GitHub → **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens** → editar el token existente
2. En **Repository permissions** cambiar:
   - **Workflows**: Read and write *(para poder subir `.github/workflows/`)*
   - **Secrets**: Read and write *(para que yo cree los secretos de Cloudflare vía API)*
3. **Update** → avisarme

Con eso yo termino: empujar el workflow, crear los secretos
`CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`, crear el webhook en Sanity
(apunta a `api.github.com/repos/marcosstic/jj-food-studio/dispatches`,
header `Authorization: Bearer <PAT>`, body `{"event_type":"sanity"}`) y correr
la prueba end-to-end.

## Cuidado con la expiración del PAT

Los fine-grained tokens vencen (fecha de expiración elegida al crearlos).
Cuando venza: el webhook de Sanity dejará de disparar deploys y los `git push`
fallarán. Al renovarlo, avisarme para actualizar el header del webhook.

## Verificación final (la hago yo al terminar el paso de arriba)

1. Push de prueba → Actions en verde → `jjfoodstudio.com` con build fresco
2. Publicar un cambio de prueba en Sanity → webhook → dispatch → deploy →
   **sitio actualizado en ~2 minutos**
3. Marcar la Fase 3 como completa en el plan maestro
