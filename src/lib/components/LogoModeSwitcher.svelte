<script lang="ts">
	import { logoMode, persistLogoMode } from '$lib/demo/stores';
	import type { LogoMode } from '$lib/content';

	const options: { mode: LogoMode; label: string; title: string }[] = [
		{ mode: 'css', label: 'CSS', title: 'Logo premium estático con tilt 3D' },
		{ mode: 'glow', label: 'Glow', title: 'Brillo dorado + flotación' },
		{ mode: 'three', label: '3D', title: 'Logo 3D giratorio (Three.js)' },
		{ mode: 'cinematic', label: 'Cine', title: 'Luz dramática + partículas' }
	];

	const pick = (mode: LogoMode) => {
		logoMode.set(mode);
		persistLogoMode(mode);
	};
</script>

<div class="logo-switch" role="group" aria-label="Versión del logo">
	{#each options as o (o.mode)}
		<button
			class="logo-switch__btn"
			type="button"
			class:is-active={$logoMode === o.mode}
			title={o.title}
			onclick={() => pick(o.mode)}
		>
			{o.label}
		</button>
	{/each}
</div>
