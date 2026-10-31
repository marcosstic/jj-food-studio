<script lang="ts">
	import { onMount } from 'svelte';
	import EmblaCarousel from 'embla-carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import { home } from '$lib/content';

	/**
	 * Banner slider (Fase 3): autoplay + flechas + dots + arrastre táctil.
	 * Cadencia 7.8 s y transición larga (duration 50) = ritmo del filmstrip
	 * continuo original (55 s / 7 fotos). Pausa al hover y al interactuar;
	 * respeta prefers-reduced-motion.
	 */
	const images = home.banner;

	let viewport: HTMLElement;
	let emblaApi: ReturnType<typeof EmblaCarousel> | null = null;
	let current = $state(0);

	const step = (dir: 1 | -1) => {
		emblaApi?.scrollTo(emblaApi.selectedScrollSnap() + dir);
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight') step(1);
		else if (e.key === 'ArrowLeft') step(-1);
	};

	onMount(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const plugins = reducedMotion ? [] : [Autoplay({ delay: 7800, stopOnInteraction: false, stopOnMouseEnter: true })];
		emblaApi = EmblaCarousel(viewport, { loop: true, align: 'center', duration: 50 }, plugins);
		emblaApi.on('select', () => (current = emblaApi!.selectedScrollSnap()));
		return () => {
			emblaApi?.destroy();
			emblaApi = null;
		};
	});
</script>

<div class="banner" aria-label="Trabajos destacados — carrusel">
	<div class="banner__viewport" bind:this={viewport}>
		<div class="banner__track">
			{#each images as img, i (img.src + i)}
				<div class="banner__slide" class:is-active={current === i} aria-hidden={current !== i}>
					<!-- Todas eager: el banner es above-the-fold y las fotos tardías
					     aparecían "de golpe" al llegar el carrusel a ellas -->
					<img
						src={img.src}
						srcset={img.srcset}
						sizes={img.sizes}
						alt={img.alt}
						loading="eager"
						fetchpriority={i === 0 ? 'high' : undefined}
						decoding="async"
					/>
				</div>
			{/each}
		</div>
	</div>

	<button class="banner__nav banner__nav--prev" type="button" aria-label="Foto anterior" onclick={() => step(-1)}>‹</button>
	<button class="banner__nav banner__nav--next" type="button" aria-label="Foto siguiente" onclick={() => step(1)}>›</button>

	<div class="banner__dots" role="tablist" aria-label="Posición del carrusel">
		{#each images as _, i (i)}
			<button
				class="banner__dot"
				type="button"
				class:is-active={current === i}
				aria-label={`Ir a la foto ${i + 1}`}
				onclick={() => emblaApi?.scrollTo(i)}
			></button>
		{/each}
	</div>
</div>

<style>
	.banner {
		position: relative;
		overflow: hidden;
		padding: var(--space-6) 0;
	}

	.banner__viewport {
		overflow: hidden;
		/* Las fotos se desvanecen hacia los bordes de la página (efecto
		   editorial, sin caja ni velo negro sobre las imágenes) */
		-webkit-mask-image: linear-gradient(
			90deg,
			transparent 0,
			#000 9%,
			#000 91%,
			transparent 100%
		);
		mask-image: linear-gradient(90deg, transparent 0, #000 9%, #000 91%, transparent 100%);
	}

	.banner__track {
		display: flex;
	}

	.banner__slide {
		flex: 0 0 min(58vw, 460px);
		margin: 0 var(--space-3);
		aspect-ratio: 4 / 5;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
		/* Atenuación por luminosidad (se integra al fondo sin capa encima):
		   las laterales respiran hacia atrás, la activa brilla */
		filter: brightness(0.55) saturate(0.85) blur(1.5px);
		transform: scale(0.95);
		transition:
			filter 0.8s var(--ease),
			transform 0.8s var(--ease),
			border-color 0.8s var(--ease),
			box-shadow 0.8s var(--ease);
	}

	.banner__slide.is-active {
		filter: none;
		transform: scale(1);
		border-color: rgba(233, 215, 154, 0.22);
		box-shadow:
			0 28px 70px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(233, 215, 154, 0.08);
	}

	.banner__slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.banner__nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 44px;
		height: 44px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.16);
		background: rgba(7, 7, 8, 0.6);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		color: rgba(255, 255, 255, 0.9);
		font-size: 20px;
		line-height: 1;
		cursor: pointer;
		z-index: 2;
		transition: border-color var(--dur-1) var(--ease);
	}

	.banner__nav:hover {
		border-color: rgba(233, 215, 154, 0.5);
	}

	.banner__nav--prev {
		left: clamp(12px, 4vw, 48px);
	}

	.banner__nav--next {
		right: clamp(12px, 4vw, 48px);
	}

	.banner__dots {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 18px;
		display: flex;
		justify-content: center;
		gap: 8px;
		z-index: 2;
	}

	.banner__dot {
		width: 9px;
		height: 9px;
		padding: 0;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.45);
		background: transparent;
		cursor: pointer;
		transition: background var(--dur-1) var(--ease), border-color var(--dur-1) var(--ease);
	}

	.banner__dot.is-active {
		background: var(--gold-l);
		border-color: var(--gold-l);
	}

	@media (max-width: 680px) {
		.banner {
			padding: var(--space-4) 0;
		}

		.banner__slide {
			flex-basis: 72vw;
		}

		.banner__nav {
			width: 38px;
			height: 38px;
			font-size: 17px;
		}
	}
</style>
