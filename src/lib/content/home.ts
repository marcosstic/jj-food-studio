import { cloud3x4, cloud4x5 } from './media';
import type { MediaView } from './types';

/**
 * Copy del home (AJ-01/03/04/10) — textos exactos del cliente.
 * Videos placeholder hasta recibir P-1 (mix/backstage hero) y P-2 (foto de JJ).
 * En Fase 3 esto vive en Sanity (homeContent) con fallback a estos valores.
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
		posterPublicId: 'v1790531313/IMG_9651.jpg',
		/** URL completa del video publicada en el CMS (homeContent.videoHeroUrl). */
		customUrl: undefined as string | undefined
	},
	closing: {
		/**
		 * Cierre: el cliente cambió el video por una FOTO de JJ (2026-10-29).
		 * Placeholder: retrato de stock (retratos/jj-placeholder en Cloudinary).
		 * JJ lo reemplaza por su retrato real desde el CMS (Fase 3) — P-2.
		 */
		foto: cloud3x4(
			'retratos/jj-placeholder',
			'JJ, fotógrafo gastronómico (foto de prueba — pendiente foto real de JJ)',
			'(max-width: 680px) 92vw, 560px'
		)
	},
	/**
	 * Banner filmstrip (Fase 2c): fotos verticales 4:5 en loop.
	 * Placeholders = recortes verticales del material actual (Cloudinary
	 * recorta con c_fill). JJ los reemplaza desde el CMS en Fase 3.
	 */
	banner: [
		cloud4x5('v1790531095/IMG_9222.jpg', 'Fotografía gastronómica de restaurante', undefined, '(max-width: 680px) 42vw, 300px'),
		cloud4x5('v1790531438/IMG_4755-Edit.jpg', 'Plato con textura y vapor', undefined, '(max-width: 680px) 42vw, 300px'),
		cloud4x5('v1790531313/IMG_9651.jpg', 'Ambiente gastronómico', undefined, '(max-width: 680px) 42vw, 300px'),
		cloud4x5('v1790533207/IMG_3370.jpg', 'Fotografía para marca de alimentos', undefined, '(max-width: 680px) 42vw, 300px'),
		cloud4x5('v1790532915/_MG_9520.jpg', 'Creación de pastelería', undefined, '(max-width: 680px) 42vw, 300px'),
		cloud4x5('v1790546207/_MG_7698.jpg', 'Detalle macro de pastelería', undefined, '(max-width: 680px) 42vw, 300px')
	] as MediaView[]
};

export const homeSections = [
	'banner', // filmstrip vertical en loop (Fase 2c)
	'hero', // agenda primera: video + calendario + logo
	'editorial',
	'portfolio',
	'whatWeDo', // titular de marca + texto + botones
	'services',
	'formation',
	'about',
	'closing'
] as const;

export type HomeSectionId = (typeof homeSections)[number];
