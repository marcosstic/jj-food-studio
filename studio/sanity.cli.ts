import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
	api: {
		projectId: 'tg1ohcli',
		dataset: 'production'
	},
	// Hostname del panel hospedado (jjfoodstudio-panel.sanity.studio).
	// Evita que `sanity deploy` pregunte interactivamente.
	studioHost: 'jjfoodstudio-panel'
});
