import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// Studio de Sanity (React) montado bajo demanda en /panel
	esbuild: {
		jsx: 'automatic',
		jsxImportSource: 'react'
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production')
	}
});
