<script lang="ts">
	import { onMount } from 'svelte';
	import {
		demoOn,
		logoMode,
		ctaStyle,
		initDemoState,
		toggleDemo,
		persistLogoMode,
		persistCtaStyle,
		normalizeLogoMode,
		normalizeCtaStyle
	} from '$lib/demo/stores';
	import type { CtaStyle, LogoMode } from '$lib/content';

	const logoOptions: { mode: LogoMode; title: string; desc: string }[] = [
		{ mode: 'css', title: 'Opción 1 · CSS', desc: 'Más rápida y estable. Look premium.' },
		{ mode: 'glow', title: 'Opción 2 · Glow', desc: 'Brillo dorado + flotación.' },
		{ mode: 'three', title: 'Opción 3 · Three.js', desc: 'Más "wow". Carga bajo demanda.' },
		{ mode: 'cinematic', title: 'Opción 4 · Cinematic', desc: 'Luz más dramática + partículas sutiles.' }
	];

	const ctaOptions: { style: CtaStyle; title: string; desc: string }[] = [
		{ style: 'outline', title: 'Opción 1 · Outline', desc: 'Borde gradiente + fondo oscuro (editorial).' },
		{ style: 'solid', title: 'Opción 2 · Solid', desc: 'Botón dorado sólido (más llamativo).' }
	];

	// El atajo "D" solo funciona si el demo se activó alguna vez (?demo=1 o localStorage)
	let armed = $state(false);

	onMount(() => {
		armed = initDemoState();

		const onKeyDown = (e: KeyboardEvent) => {
			if (!armed) return;
			if (e.key.toLowerCase() !== 'd') return;
			toggleDemo();
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	});

	// Clases de estado en <body> (equivalente al estado global del sitio original)
	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.classList.toggle('demo-on', $demoOn);
		document.body.classList.toggle('cta-solid', $ctaStyle === 'solid');
		document.body.classList.toggle('cta-outline', $ctaStyle !== 'solid');
	});

	const pickLogoMode = (mode: LogoMode) => {
		logoMode.set(normalizeLogoMode(mode));
		persistLogoMode(mode);
	};

	const pickCtaStyle = (style: CtaStyle) => {
		ctaStyle.set(normalizeCtaStyle(style));
		persistCtaStyle(style);
	};
</script>

{#if $demoOn}
	<div class="demo-toggle" aria-label="Demo">
		<button class="demo-toggle__btn" type="button" onclick={toggleDemo}>Demo</button>
	</div>

	<div class="demo-panel" aria-label="Panel de opciones">
		<div class="demo-panel__title">Comparar diseño</div>
		<div class="demo-panel__hint">
			Tip: presiona <kbd>D</kbd> o usa <span class="mono">?demo=1</span>
		</div>

		<div class="demo-panel__section">
			<div class="demo-panel__section-title">Logo (hero)</div>
			<div class="demo-panel__options">
				{#each logoOptions as option (option.mode)}
					<button
						class="opt"
						type="button"
						class:is-active={normalizeLogoMode($logoMode) === option.mode}
						onclick={() => pickLogoMode(option.mode)}
					>
						<div class="opt__title">{option.title}</div>
						<div class="opt__desc">{option.desc}</div>
					</button>
				{/each}
			</div>
		</div>

		<div class="demo-panel__section">
			<div class="demo-panel__section-title">CTA</div>
			<div class="demo-panel__options">
				{#each ctaOptions as option (option.style)}
					<button
						class="opt"
						type="button"
						class:is-active={normalizeCtaStyle($ctaStyle) === option.style}
						onclick={() => pickCtaStyle(option.style)}
					>
						<div class="opt__title">{option.title}</div>
						<div class="opt__desc">{option.desc}</div>
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}
