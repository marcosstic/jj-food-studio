<script lang="ts">
	import { home } from '$lib/content';
	import { imageUrl } from '$lib/services/cloudinary';

	/**
	 * Banner filmstrip (Fase 2c): cinta de fotos verticales 4:5 en loop
	 * continuo. Pausa al hover/tap; estática con prefers-reduced-motion.
	 * La pista se duplica para el loop perfecto (translateX -50%).
	 */
	const tiles = [...home.banner, ...home.banner];
</script>

<div class="banner" aria-label="Galería de trabajos">
	<div class="banner__track">
		{#each tiles as img, i (i)}
			<div class="banner__tile" aria-hidden={i >= home.banner.length}>
				<img
					src={imageUrl(img.publicId, { w: 480, h: 600, q: 80 })}
					srcset={`${imageUrl(img.publicId, { w: 360, h: 450, q: 75 })} 360w, ${imageUrl(img.publicId, { w: 480, h: 600, q: 80 })} 480w, ${imageUrl(img.publicId, { w: 640, h: 800, q: 80 })} 640w`}
					sizes="(max-width: 680px) 42vw, 300px"
					alt={img.alt}
					loading={i < 3 ? 'eager' : 'lazy'}
				/>
			</div>
		{/each}
	</div>
	<div class="banner__fade banner__fade--left" aria-hidden="true"></div>
	<div class="banner__fade banner__fade--right" aria-hidden="true"></div>
</div>

<style>
	.banner {
		position: relative;
		overflow: hidden;
		padding: var(--space-5) 0;
	}

	.banner__track {
		display: flex;
		gap: var(--space-3);
		width: max-content;
		animation: banner-scroll 55s linear infinite;
		will-change: transform;
	}

	/* Loop perfecto: la pista duplicada se desplaza exactamente la mitad */
	@keyframes banner-scroll {
		to {
			transform: translateX(calc(-50% - var(--space-3) / 2));
		}
	}

	/* Pausa solo con puntero real (hover): en táctil un toque NO detiene el loop */
	@media (hover: hover) and (pointer: fine) {
		.banner:hover .banner__track,
		.banner:focus-within .banner__track {
			animation-play-state: paused;
		}
	}

	.banner__tile {
		flex: 0 0 auto;
		width: clamp(220px, 24vw, 300px);
		aspect-ratio: 4 / 5;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.banner__tile img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transform: scale(1);
		transition: transform 0.6s var(--ease);
	}

	.banner__tile:hover img {
		transform: scale(1.04);
	}

	/* Fundidos laterales para integrar la cinta con el fondo */
	.banner__fade {
		position: absolute;
		top: 0;
		bottom: 0;
		width: clamp(40px, 8vw, 120px);
		pointer-events: none;
		z-index: 1;
	}

	.banner__fade--left {
		left: 0;
		background: linear-gradient(90deg, var(--bg0), transparent);
	}

	.banner__fade--right {
		right: 0;
		background: linear-gradient(270deg, var(--bg0), transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.banner__track {
			animation: none;
			overflow-x: auto;
			width: auto;
		}
	}
</style>
