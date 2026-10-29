/**
 * Constructores de MediaView desde Cloudinary (contenido local).
 * La ruta de Sanity produce el mismo MediaView en scripts/fetch-content.mjs.
 */
import type { MediaView } from './types';

const CL = 'sfhco0ar';

const cfill = (publicId: string, w: number, h: number, q = 80): string =>
	`https://res.cloudinary.com/${CL}/image/upload/c_fill,w_${w},h_${h},q_${q},f_auto/${publicId}`;

const lqip = (publicId: string, w: number, h: number): string =>
	`https://res.cloudinary.com/${CL}/image/upload/w_${Math.round(w / 10)},h_${Math.round(h / 10)},c_fill,e_blur:300,q_1,f_auto/${publicId}`;

/**
 * MediaView vertical 4:5 (tarjetas, galerías, banner).
 */
export const cloud4x5 = (
	publicId: string,
	alt: string,
	extra?: Partial<MediaView>,
	sizes = '(max-width: 680px) 46vw, (max-width: 980px) 30vw, 300px'
): MediaView => ({
	kind: 'image',
	src: cfill(publicId, 480, 600),
	srcset: [cfill(publicId, 360, 450, 75) + ' 360w', cfill(publicId, 480, 600) + ' 480w', cfill(publicId, 640, 800, 85) + ' 640w', cfill(publicId, 960, 1200, 85) + ' 960w'].join(', '),
	lqip: lqip(publicId, 480, 600),
	alt,
	...extra,
	sizes
});

/**
 * MediaView retrato 3:4 (cierre de JJ).
 */
export const cloud3x4 = (publicId: string, alt: string, sizes?: string): MediaView => ({
	kind: 'image',
	src: cfill(publicId, 720, 960),
	srcset: [cfill(publicId, 480, 640, 75) + ' 480w', cfill(publicId, 720, 960) + ' 720w', cfill(publicId, 960, 1280, 85) + ' 960w'].join(', '),
	lqip: lqip(publicId, 720, 960),
	alt,
	sizes
});
