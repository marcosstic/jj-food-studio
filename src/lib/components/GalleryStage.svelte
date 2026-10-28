<script lang="ts">
	import { onMount } from 'svelte';
	import EmblaCarousel from 'embla-carousel';
	import type { CloudinaryAsset } from '$lib/content';
	import { imageUrl, imageSrcSet, cardImageSizes, cardImageVariants, lqipUrl } from '$lib/services/cloudinary';
	import { fadein } from '$lib/actions/fadein';

	/**
	 * Visor fotográfico vertical (Fase 2c): stage 4:5 con autoplay + flechas
	 * + teclado, y tira de miniaturas lateral sincronizada con el grid.
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

<div class="viewer">
	<div class="viewer__stagecol">
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
								sizes="(max-width: 980px) 100vw, 640px"
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

	<div class="viewer__thumbs" role="tablist" aria-label="Miniaturas de la galería">
		{#each images as img, i (img.publicId + i)}
			<button
				class="viewer__thumb"
				type="button"
				class:is-active={current === i}
				aria-label={`Ver foto ${i + 1}: ${img.alt}`}
				onclick={() => scrollToIndex(i)}
			>
				<img src={imageUrl(img.publicId, { w: 160, h: 200, q: 70 })} alt="" loading="lazy" />
			</button>
		{/each}
	</div>
</div>

<style>
	/* Visor fotográfico: stage vertical + tira de miniaturas lateral */
	.viewer {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 104px;
		gap: var(--space-4);
		align-items: start;
		width: 100%;
	}

	.viewer__stagecol {
		display: flex;
		justify-content: center;
	}

	.stage {
		position: relative;
		width: min(100%, calc(min(76vh, 780px) * 0.8));
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

	.stage__viewport {
		overflow: hidden;
	}

	.stage__track {
		display: flex;
	}

	.stage__slide {
		flex: 0 0 100%;
		min-width: 0;
		aspect-ratio: 4 / 5;
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

	/* Tira de miniaturas vertical */
	.viewer__thumbs {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		max-height: min(76vh, 780px);
		overflow-y: auto;
	}

	.viewer__thumb {
		flex: 0 0 auto;
		width: 100%;
		aspect-ratio: 4 / 5;
		padding: 0;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius-sm);
		overflow: hidden;
		cursor: pointer;
		opacity: 0.55;
		background: rgba(255, 255, 255, 0.04);
		transition: opacity var(--dur-1) var(--ease), border-color var(--dur-1) var(--ease);
	}

	.viewer__thumb:hover {
		opacity: 1;
	}

	.viewer__thumb.is-active {
		opacity: 1;
		border-color: rgba(233, 215, 154, 0.55);
	}

	.viewer__thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	@media (max-width: 980px) {
		.viewer {
			grid-template-columns: 1fr;
		}

		.stage {
			width: 100%;
		}

		.viewer__thumbs {
			flex-direction: row;
			max-height: none;
			overflow-x: auto;
		}

		.viewer__thumb {
			width: 72px;
		}

		.stage__nav {
			width: 38px;
			height: 38px;
			font-size: 18px;
		}
	}
</style>
