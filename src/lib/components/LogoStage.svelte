<script lang="ts">
	import { onDestroy } from 'svelte';
	import { logoMode, normalizeLogoMode } from '$lib/demo/stores';
	import { tilt } from '$lib/actions/tilt';
	import { initThreeLogo, destroyThreeLogo } from '$lib/logo/threeBillboard';

	/** compact: caja menor (hero a 3 columnas); default: 420px (Qué hacemos). */
	let { size = 'default' }: { size?: 'default' | 'compact' } = $props();

	const mode = $derived(normalizeLogoMode($logoMode));
	const isThree = $derived(mode === 'three' || mode === 'cinematic');

	$effect(() => {
		const current = mode; // dependencia reactiva del modo de logo
		if (typeof document === 'undefined') return;

		document.body.dataset.logoMode = current;
		document.body.classList.toggle('logo-glow', current === 'glow');

		if (current === 'three' || current === 'cinematic') {
			initThreeLogo({ variant: current });
		} else {
			destroyThreeLogo();
		}
	});

	onDestroy(() => destroyThreeLogo());
</script>

<div class="logo-stage" class:logo-stage--compact={size === 'compact'} aria-label="Logo">
	<div class="logo-css" data-logo="css" hidden={isThree} use:tilt>
		<img class="logo-img" src="/JJ-logo-dorado.png" alt="JJ Food Studio" />
		<span class="logo-spec"></span>
	</div>
	<div class="logo-three" data-logo="three" hidden={!isThree}>
		<canvas class="logo-canvas" width="640" height="640" aria-label="Logo 3D"></canvas>
		<div class="logo-three__fallback">Cargando modo 3D…</div>
	</div>
</div>
