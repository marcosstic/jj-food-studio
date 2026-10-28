import type { SiteConfig } from '$lib/content/types';

/**
 * Integración con cal.com (ADR-0003).
 * Reproduce el bootstrap oficial del snippet de cal.com (cola + namespaces)
 * y configura el embed inline con los colores de marca del sitio.
 */

type CalQueueEntry = unknown[];

interface CalStub {
	loaded?: boolean;
	ns?: Record<string, CalApi>;
	q?: CalQueueEntry[];
	(...args: unknown[]): void;
}

// API de terceros sin tipos oficiales: se tipa de forma mínima en el borde.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CalApi = any;

const CAL_SCRIPT_SRC = 'https://app.cal.com/embed/embed.js';

export const initCalEmbed = (config: SiteConfig['cal']): void => {
	if (typeof window === 'undefined') return;

	const w = window as unknown as { document: Document; Cal?: CalStub };
	// bookingLink = raíz de la cuenta → lista todos los tipos de evento
	// (caen solos cuando JJ cree los demás eventos en cal.com)
	const link = config.bookingLink || config.eventSlug;
	const elementId = `my-cal-inline-${link}`;

	// Bootstrap del snippet oficial de cal.com (permanece igual al original).
	(function (C: { document: Document; Cal?: CalStub }, A: string, L: string) {
		const push = (a: CalStub, ar: CalQueueEntry) => {
			a.q?.push(ar);
		};
		C.Cal =
			C.Cal ||
			function (this: unknown, ...args: unknown[]) {
				const cal = C.Cal as CalStub;
				if (!cal.loaded) {
					cal.ns = {};
					cal.q = cal.q || [];
					const script = C.document.createElement('script');
					script.src = A;
					C.document.head.appendChild(script);
					cal.loaded = true;
				}
				if (args[0] === L) {
					const api = function (this: unknown, ...inner: unknown[]) {
						push(api as unknown as CalStub, inner);
					} as unknown as CalStub;
					const namespace = args[1];
					api.q = api.q || [];
					if (typeof namespace === 'string') {
						cal.ns = cal.ns || {};
						cal.ns[namespace] = cal.ns[namespace] || api;
						push(cal.ns[namespace], args as CalQueueEntry);
						push(cal, ['initNamespace', namespace]);
					} else {
						push(cal, args as CalQueueEntry);
					}
					return;
				}
				push(cal, args as CalQueueEntry);
			} as CalStub;
	})(w, CAL_SCRIPT_SRC, 'init');

	const cal = w.Cal as CalStub;

	cal('init', link, { origin: config.origin });
	const calWithConfig = cal as unknown as { config?: Record<string, unknown> };
	calWithConfig.config = calWithConfig.config || {};
	calWithConfig.config.forwardQueryParams = true;

	cal.ns = cal.ns || {};
	const ns = cal.ns[link];
	if (!ns) return;

	ns('inline', {
		elementOrSelector: `#${elementId}`,
		config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
		// bookingLink ya es la ruta completa de la cuenta; eventSlug va bajo el usuario
		calLink: link === config.bookingLink ? config.bookingLink : `jj-food-studio/${link}`
	});

	ns('ui', {
		cssVarsPerTheme: {
			// Marca dorada en AMBOS temas: el botón Confirmar nunca debe fundirse
			// con el fondo (bug #070708 sobre fondo oscuro)
			light: { 'cal-brand': config.brandColorLight },
			dark: { 'cal-brand': config.brandColorLight }
		},
		hideEventTypeDetails: false,
		layout: 'month_view'
	});
};
