import type { SiteConfig } from './types';

/**
 * Configuración global del sitio.
 * Los valores marcados como "pendiente" esperan datos del cliente
 * (ver docs/requisitos/ajustes-web-cliente.md, tabla de pendientes).
 */
export const site: SiteConfig = {
	name: 'JJ Food Studio',
	// Dominio real (Netlify: proyecto jjfoodstudio.com)
	url: 'https://jjfoodstudio.com',
	// Pendiente P-4: número real de WhatsApp (internacional, sin "+")
	whatsappPhone: '',
	whatsappMessage: 'Hola JJ, vi tu web y quiero una sesión de fotografía/video gastronómico.',
	instagramUrl: 'https://instagram.com/',
	instagramHandle: '@jjfoodstudio',
	email: 'contacto@jjfoodstudio.com',
	// Pendiente P-5: ID real de Formspree
	formspreeEndpoint: 'https://formspree.io/f/TU_FORM_ID',
	// Modo de logo por defecto (AJ-12; Fase 3: editable desde el CMS)
	logoDefault: 'css',
	cal: {
		eventSlug: 'sesion-de-fotografia-gastronomica-jj',
		// Raíz de la cuenta: muestra TODOS los tipos de evento que JJ cree en cal.com
		// (hoy solo existe 1; los demás están en INSTRUCCIONS-CALCOM.md Paso 5)
		bookingLink: 'jj-food-studio',
		origin: 'https://app.cal.com',
		brandColorLight: '#E9D79A',
		brandColorDark: '#070708'
	}
};

/**
 * Enlace de WhatsApp con mensaje prellenado (si hay número; pendiente P-4).
 */
export const waLink = (message: string = site.whatsappMessage): string => {
	const base = site.whatsappPhone ? `https://wa.me/${site.whatsappPhone}` : 'https://wa.me/';
	return site.whatsappPhone ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Imagen por defecto para Open Graph (recorte 1200×630). */
export const ogImage = `https://res.cloudinary.com/sfhco0ar/image/upload/c_fill,w_1200,h_630,q_80,f_auto/v1790531095/IMG_9222.jpg`;
