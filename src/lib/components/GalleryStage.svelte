<script lang="ts">
	import { onMount } from 'svelte';
	import EmblaCarousel from 'embla-carousel';
	import type { CloudinaryAsset } from '$lib/content';
	import { imageUrl, imageSrcSet, cardImageSizes, cardImageVariants, lqipUrl } from '$lib/services/cloudinary';
	import { fadein } from '$lib/actions/fadein';

	/**
	 * Stage tipo diapositiva (AJ-07): autoplay + arrastre táctil + teclado,
	 * sincronizado con el grid inferior vía onselect/scrollToIndex.
	 */
	let { images, autoplayMs = 4000, onselect, jumpTo = -1 }: { images: CloudinaryAsset[]; autoplayMs?: number; onselect?: (index: number) => void; jumpTo?: number } = $props();

	let viewport: HTMLElement;
	let emblaApi: ReturnType<typeof EmblaCarousel> | null = null;
	let current = $state(0);
	let paused = $state(false);
	let timer: ReturnType<typeof setInterval> | null = null;

	const notify = () => {
		if (!emblaApi) return;
		current = emblaApi.selectedScrollSnap();
		onselect?.(current);
	};

	const startAutoplay = () => {
		stopAutoplay();
		timer = setInterval(() => {
			if (!paused) emblaApi?.scrollNext();
		}, autoplayMs);
	};

	const stopAutoplay = () => {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	};

	const scrollToIndex = (i: number) => {
		emblaApi?.scrollTo(i);
	};

	const step = (dir: 1 | -1) => {
		emblaApi?.scrollTo(emblaApi.selectedScrollSnap() + dir);
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight') step(1);
		else if (e.key === 'ArrowLeft') step(-1);
	};

	onMount(() => {
		emblaApi = EmblaCarousel(viewport, { loop: true, align: 'start' });
		emblaApi.on('select', notify);
		// Accesibilidad: sin autoplay si el visitante prefiere movimiento reducido
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			startAutoplay();
		}
		return () => {
			stopAutoplay();
			emblaApi?.destroy();
			emblaApi = null;
		};
	});

	// Salto externo (clic en el grid de la galería)
	$effect(() => {
		if (typeof jumpTo === 'number' && jumpTo >= 0 && emblaApi) {
			emblaApi.scrollTo(jumpTo);
		}
	});
</script>

<div class="stage-wrap">
	<div
		class="stage"
		tabindex="0"
		role="region"
		aria-label="Galería destacada — usa flechas para navegar"
		onpointerenter={() => (paused = true)}
		onpointerleave={() => (paused = false)}
		onfocusin={() => (paused = true)}
		onfocusout={() => (paused = false)}
		onkeydown={onKeydown}
	>
		<div class="stage__viewport" bind:this={viewport}>
			<div class="stage__track">
				{#each images as img, i (img.publicId + i)}
					<div class="stage__slide" aria-hidden={current !== i}>
						<img
							src={imageUrl(img.publicId, cardImageVariants[cardImageVariants.length - 1])}
							srcset={imageSrcSet(img.publicId, cardImageVariants)}
							sizes="(max-width: 768px) 100vw, 900px"
							alt={img.alt}
							loading={i === 0 ? 'eager' : 'lazy'}
							use:fadein
						/>
					</div>
				{/each}
			</div>
		</div>

		<button class="stage__nav stage__nav--prev" type="button" aria-label="Foto anterior" onclick={() => step(-1)}>‹</button>
		<button class="stage__nav stage__nav--next" type="button" aria-label="Foto siguiente" onclick={() => step(1)}>›</button>

		<div class="stage__dots" role="tablist" aria-label="Posición de la diapositiva">
			{#each images as _, i (i)}
				<button
					class="stage__dot"
					type="button"
					class:is-active={current === i}
					aria-label={`Ir a la foto ${i + 1}`}
					onclick={() => scrollToIndex(i)}
				></button>
			{/each}
		</div>
	</div>
</div>

<style>
	.stage-wrap {
		width: 100%;
	}

	.stage {
		position: relative;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.06);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
		background: rgba(255, 255, 255, 0.03);
		outline: none;
		transition: border-color var(--dur-2) var(--ease);
	}

	.stage:hover {
		border-color: rgba(233, 215, 154, 0.22);
	}

	.stage:focus-visible {
		border-color: rgba(233, 215, 154, 0.45);
	}

	.stage__viewport {
		overflow: hidden;
	}

	.stage__track {
		display: flex;
	}

	.stage__slide {
		flex: 0 0 100%;
		min-width: 0;
		aspect-ratio: 3 / 2;
		background:
			radial-gradient(600px 420px at 30% 35%, rgba(233, 215, 154, 0.10), transparent 60%),
			rgba(255, 255, 255, 0.03);
	}

	.stage__slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	/* .loaded se añade en runtime (acción fadein) → :global evita la poda del compilador */
	.stage__slide img:global(.loaded) {
		opacity: 1;
	}

	.stage__nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 44px;
		height: 44px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.14);
		background: rgba(7, 7, 8, 0.55);
		color: rgba(255, 255, 255, 0.88);
		font-size: 22px;
		line-height: 1;
		cursor: pointer;
		backdrop-filter: blur(8px);
		transition: border-color var(--dur-1) var(--ease), background var(--dur-1) var(--ease);
	}

	.stage__nav:hover {
		border-color: rgba(233, 215, 154, 0.45);
	}

	.stage__nav--prev {
		left: 14px;
	}

	.stage__nav--next {
		right: 14px;
	}

	.stage__dots {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 14px;
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.stage__dot {
		width: 10px;
		height: 10px;
		padding: 0;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.45);
		background: transparent;
		cursor: pointer;
		transition: background var(--dur-1) var(--ease), border-color var(--dur-1) var(--ease);
	}

	.stage__dot.is-active {
		background: var(--gold-l);
		border-color: var(--gold-l);
	}

	@media (max-width: 680px) {
		.stage__nav {
			width: 38px;
			height: 38px;
			font-size: 18px;
		}
	}
</style>
