/**
 * Tipos de la capa de contenido (ADR-0002 y ADR-0006).
 * Única fuente de verdad para la forma de los datos del sitio.
 * Fase 3: el adapter de Sanity devolverá exactamente estos tipos.
 */

/** Modos del logo del hero (panel demo). */
export type LogoMode = 'css' | 'glow' | 'three' | 'cinematic';

/** Variantes del estilo de botones CTA (panel demo). */
export type CtaStyle = 'outline' | 'solid';

/** Activo multimedia alojado en Cloudinary (los archivos nunca viven en el repo). */
export interface CloudinaryAsset {
	/** Ruta tras /image/upload/ o /video/upload/, ej: "v1790531095/IMG_9222.jpg" */
	publicId: string;
	alt: string;
}

/** Categoría del portafolio con su galería (AJ-05/06/08). */
export interface Category {
	slug: string;
	name: string;
	/** Subtítulo corto (tarjetas del home/portafolio). */
	tagline: string;
	/** Encabezado editorial de la página de galería (AJ-08). */
	headline: string;
	description: string;
	cover: CloudinaryAsset;
	/** Galería completa de la categoría (AJ-06/07). Pendiente P-3: fotos finales del cliente. */
	gallery: CloudinaryAsset[];
}

/** Tarjeta de servicio resumida (home). */
export interface ServiceSummary {
	title: string;
	description: string;
}

/** Servicio detallado (página /servicios). */
export interface ServiceDetail {
	title: string;
	lead: string;
	description: string;
	cta: string;
}

/** Curso o taller de formación. */
export interface Course {
	title: string;
	description: string;
	cta: string;
	href: string;
}

/** Medio de un caso del portafolio: imagen o video. */
export type CaseMedia =
	| { kind: 'image'; asset: CloudinaryAsset }
	| { kind: 'video'; publicId: string };

/** Caso del portafolio (tarjeta en /portafolio). */
export interface CaseStudy {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	media: CaseMedia;
	href: string;
}

/** Paso de la metodología. */
export interface MethodStep {
	title: string;
	description: string;
}

/** Configuración global del sitio (contacto, agenda, redes, logo). */
export interface SiteConfig {
	name: string;
	/** URL absoluta del sitio (Open Graph, sitemap). TODO: dominio definitivo. */
	url: string;
	/** Pendiente P-4: número real de WhatsApp del cliente (formato internacional sin +). */
	whatsappPhone: string;
	/** Mensaje prellenado para WhatsApp. */
	whatsappMessage: string;
	instagramUrl: string;
	instagramHandle: string;
	email: string;
	/** Pendiente P-5: ID real de Formspree. */
	formspreeEndpoint: string;
	/** Modo de logo por defecto (Fase 3: editable por JJ desde el CMS). */
	logoDefault: LogoMode;
	cal: {
		/** Evento por defecto (enlaces profundos). */
		eventSlug: string;
		/** Página raíz de booking: lista TODOS los tipos de evento de la cuenta. */
		bookingLink: string;
		origin: string;
		brandColorLight: string;
		brandColorDark: string;
	};
}
