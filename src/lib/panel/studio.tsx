/**
 * Configuración del Studio embebido en /panel (Fase 3).
 * Solo se ejecuta en el navegador (ruta client-only); React carga bajo demanda.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schema';

export const studioConfig = defineConfig({
	projectId: 'tg1ohclj',
	dataset: 'production',
	title: 'JJ Food Studio — Panel',
	plugins: [structureTool()],
	schema: { types: schemaTypes }
});

export async function mountStudio(el: HTMLElement): Promise<void> {
	const [{ createRoot }, React, { Studio }] = await Promise.all([
		import('react-dom/client'),
		import('react'),
		import('sanity')
	]);
	createRoot(el).render(
		React.createElement(React.StrictMode, null, React.createElement(Studio, { config: studioConfig }))
	);
}
