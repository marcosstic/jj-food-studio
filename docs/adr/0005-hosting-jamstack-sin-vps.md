# ADR-0005: Hosting e infraestructura — Jamstack administrado, sin VPS

- **Estado:** Aceptada (2026-10-27)
- **Fase:** transversal

## Contexto

El sitio es media-pesado (fotos + video). Opciones: (a) composición de servicios
administrados con planes gratuitos — Netlify (hosting), Cloudinary (media + CDN +
transformaciones), Sanity (contenido, ADR-0002), cal.com (agenda), Formspree
(formularios); o (b) un VPS económico (p. ej. Contabo ~$5/mes) consolidando
todo. El criterio del dueño es la **experiencia de usuario del cliente y de los
visitantes**, y el proyecto competirá en un evento.

## Decisión

**Mantener la arquitectura Jamstack administrada (costo $0/mes; solo dominio
~$10/año).** No adquirir VPS. Razones:

1. **Velocidad:** CDN global (Netlify + Cloudinary) vs. un solo servidor en una
   región — para un sitio de fotos/video no hay comparación; un VPS sería un paso
   atrás en UX.
2. **Operación:** el VPS convierte al dev en equipo de ops 24/7 (parches, firewall,
   SSL, backups, monitoreo). Los servicios administrados eliminan esa carga.
3. **Email/notify desde VPS barato:** trampa clásica de deliverability (IPs en
   listas negras); los servicios ya lo resuelven.

**Si algún día se necesita self-host** (Cal propio, CMS self-host, producto
multi-cliente): preferir **Hetzner** sobre Contabo (mejor hardware, red y
reputación al mismo precio). Ese día se escribe un ADR nuevo.

## Consecuencias

- **Positivas:** $0/mes, cero mantenimiento, mejor rendimiento global, alta
  disponibilidad delegada.
- **Negativas:** varias cuentas/servicios (el costo real es coordinación, no
  mantenimiento); límites de planes gratuitos (holgados a este tamaño); dependencia
  de terceros (mitigada: contenido exportable, media en Cloudinary, repo propio).
