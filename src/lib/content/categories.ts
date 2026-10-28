import type { Category } from './types';

/**
 * Categorías del portafolio (AJ-05/06/07/08).
 * Galerías con fotos placeholder — pendiente P-3: galerías completas del cliente
 * (ideal: carpetas Cloudinary galerias/restaurantes, galerias/marcas-personales,
 * galerias/pastelerias; se sustituyen los publicId y nada más cambia).
 */
export const categories: Category[] = [
	{
		slug: 'restaurantes',
		name: 'Restaurantes',
		tagline: 'Imagen, composición y antojo',
		headline: 'Fotografía que abre el apetito.',
		description:
			'Construimos imágenes que transmiten la esencia de tu restaurante: sus platos, su ambiente y la experiencia detrás de cada servicio.',
		cover: {
			publicId: 'v1790531095/IMG_9222.jpg',
			alt: 'Fotografía de restaurante - JJ Food Studio'
		},
		gallery: [
			{ publicId: 'v1790531095/IMG_9222.jpg', alt: 'Fotografía de restaurante - JJ Food Studio' },
			{ publicId: 'v1790531438/IMG_4755-Edit.jpg', alt: 'Plato de restaurante con textura y vapor - JJ Food Studio' },
			{ publicId: 'v1790531313/IMG_9651.jpg', alt: 'Ambiente gastronómico de restaurante - JJ Food Studio' }
		]
	},
	{
		slug: 'marcas-personales',
		name: 'Marcas personales',
		tagline: 'El talento detrás de cada plato',
		headline: 'La imagen detrás del talento.',
		description:
			'Retratos y contenido gastronómico para chefs, cocineros, pasteleros y profesionales que quieren construir una identidad visual propia.',
		cover: {
			publicId: 'v1790533207/IMG_3370.jpg',
			alt: 'Fotografía para marca gastronómica - JJ Food Studio'
		},
		gallery: [
			{ publicId: 'v1790533207/IMG_3370.jpg', alt: 'Fotografía para marca gastronómica - JJ Food Studio' },
			{ publicId: 'v1790531313/IMG_9651.jpg', alt: 'Contenido gastronómico de marca personal - JJ Food Studio' },
			{ publicId: 'v1790531095/IMG_9222.jpg', alt: 'Imagen gastronómica profesional - JJ Food Studio' }
		]
	},
	{
		slug: 'pastelerias',
		name: 'Pastelerías',
		tagline: 'Texturas, detalle y dulzura',
		headline: 'El detalle también se saborea.',
		description:
			'Imágenes que resaltan texturas, formas, color y detalle para convertir cada creación en una experiencia visual.',
		cover: {
			publicId: 'v1790532915/_MG_9520.jpg',
			alt: 'Fotografía de pastelería - JJ Food Studio'
		},
		gallery: [
			{ publicId: 'v1790532915/_MG_9520.jpg', alt: 'Fotografía de pastelería - JJ Food Studio' },
			{ publicId: 'v1790546207/_MG_7698.jpg', alt: 'Detalle macro de pastelería - JJ Food Studio' },
			{ publicId: 'v1790533207/IMG_3370.jpg', alt: 'Creación de pastelería estilizada - JJ Food Studio' }
		]
	}
];

/** Busca una categoría por slug (ruta /portafolio/[categoria]). */
export const findCategory = (slug: string): Category | undefined =>
	categories.find((c) => c.slug === slug);
