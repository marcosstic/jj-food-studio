// Ruta client-only: se prerenderiza como cáscara vacía y el Studio de Sanity
// (React) se monta en el navegador. El login de Sanity aparece ahí mismo.
export const ssr = false;
export const prerender = true;
