import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
			// El sitio original usa anchors muertos (p.ej. /portafolio#restaurantes
			// sin elemento destino); se replica ese comportamiento.
			handleMissingId: 'ignore'
		}
	}
};

export default config;
