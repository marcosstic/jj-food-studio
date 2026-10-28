import type { Action } from 'svelte/action';

/**
 * Fade-in de imágenes al cargar (port de imageFadeIn.js).
 * Uso: <img use:fadein />
 */
export const fadein: Action<HTMLImageElement> = (img) => {
	const addLoaded = () => img.classList.add('loaded');

	if (img.complete) addLoaded();

	img.addEventListener('load', addLoaded);
	img.addEventListener('error', addLoaded);

	return {
		destroy() {
			img.removeEventListener('load', addLoaded);
			img.removeEventListener('error', addLoaded);
		}
	};
};
