import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { bannerHomeSchema } from './banner-schema';
import { schemaTypes } from './schema';

export default defineConfig({
	projectId: 'tg1ohcli',
	dataset: 'production',
	title: 'JJ Food Studio — Panel',
	plugins: [structureTool()],
	schema: { types: schemaTypes }
});
