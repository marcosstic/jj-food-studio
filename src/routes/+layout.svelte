<script lang="ts">
	import '$lib/styles/tokens.css';
	import '$lib/styles/base.css';
	import '$lib/styles/components.css';
	import Header from '$lib/components/Header.svelte';
	import WaFloat from '$lib/components/WaFloat.svelte';
	import DemoPanel from '$lib/components/DemoPanel.svelte';
	import { hideNetlifyBadge } from '$lib/services/netlify';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onMount(() => {
		hideNetlifyBadge();
	});

	// View Transitions API con mejora progresiva (navegadores sin soporte: cambio normal)
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete();
			});
		});
	});
</script>

<Header />

<main>
	{@render children()}
</main>

<WaFloat />
<DemoPanel />
