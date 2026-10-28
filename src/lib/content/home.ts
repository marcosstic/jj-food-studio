import type { LogoMode } from './types';

/**
 * Copy del home (AJ-01/03/04/10) — textos exactos del cliente.
 * Videos placeholder hasta recibir P-1 (mix/backstage hero) y P-2 (cierre JJ).
 */
export const home = {
	hero: {
		kicker: 'Fotografía y video gastronómico · Estilismo de alimentos · Dirección de arte',
		h1: 'Imágenes que hacen que la comida se venda.',
		sub: 'Enfocado en restaurantes, pastelerías, marcas de alimentos y personales'
	},
	editorial: {
		title: 'No se trata solo de fotografiar comida',
		subtitle:
			'Se trata de construir imágenes que hagan que una persona quiera probarla y trasmitir experiencias'
	},
	reel: {
		/** Pendiente P-1: video "mix" o "backstage" para el hero. */
		videoPublicId: 'v1790499569/DRACOROSSO_TEASER.mp4',
		videoTransform: 'q_80,f_auto/',
		posterPublicId: 'v1790531313/IMG_9651.jpg'
	},
	closing: {
		/** Pendiente P-2: backstage o video de JJ presentando la web. */
		videoPublicId: 'v1790531740/Tomatos_JJ_V2.mp4',
		videoTransform: 'q_80,f_auto/',
		title: '¿Trabajamos juntos?'
	}
} as const;

export type HomeContent = typeof home;

/**
 * Orden de las secciones del home (Fase 2b: secciones tipo LEGO).
 * Mover una sección = mover un string aquí. Fase 3: lista arrastrable
 * en el CMS (Sanity siteConfig.homeSections).
 */
export const homeSections = [
	'hero', // Opción A: agenda primera (video + calendario)
	'editorial',
	'portfolio',
	'whatWeDo', // texto de marca + logo grande + selector de versión
	'services',
	'formation',
	'about',
	'closing'
] as const;

export type HomeSectionId = (typeof homeSections)[number];
