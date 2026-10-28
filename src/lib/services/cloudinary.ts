/**
 * Servicio de URLs de Cloudinary.
 * Centraliza la construcción de URLs con transformaciones para que
 * cambiar de proveedor solo toque este archivo (ADR-0006).
 */

const CLOUD_NAME = 'sfhco0ar';

export interface ImageTransform {
	w: number;
	h: number;
	q: number;
}

/** Variantes estándar de tarjetas (equivalen al srcset del sitio original). */
export const cardImageVariants: ImageTransform[] = [
	{ w: 600, h: 400, q: 75 },
	{ w: 900, h: 600, q: 80 },
	{ w: 1200, h: 800, q: 85 }
];

/** Atributo sizes estándar de las tarjetas. */
export const cardImageSizes = '(max-width: 768px) 600px, (max-width: 1024px) 900px, 1200px';

export const imageUrl = (publicId: string, t: ImageTransform): string =>
	`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,w_${t.w},h_${t.h},q_${t.q},f_auto/${publicId}`;

export const imageSrcSet = (publicId: string, variants: ImageTransform[]): string =>
	variants.map((t) => `${imageUrl(publicId, t)} ${t.w}w`).join(', ');

export const videoUrl = (publicId: string, transform = ''): string =>
	`https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transform}${publicId}`;

/** Placeholder borroso (LQIP) para blur-up de galerías. */
export const lqipUrl = (publicId: string): string =>
	`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_40,h_27,c_fill,e_blur:300,q_1,f_auto/${publicId}`;
