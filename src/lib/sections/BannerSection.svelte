<script lang="ts">
	import { onMount } from 'svelte';
	import { home } from '$lib/content';

	/**
	 * Banner de rodado continuo (Fase 3): motor propio a velocidad CONSTANTE
	 * (herencia del filmstrip: ~7.4 s por foto, lineal, sin saltos ni pausas).
	 * Flechas = empujón suave de una foto; arrastre táctil; sin pausa al hover.
	 * Loop por duplicación de pista (invisible: mitad A ≡ mitad B).
	 * Respeta prefers-reduced-motion (queda quieto; las flechas navegan).
	 */
	const images = home.banner;
	const SECONDS_PER_SLIDE = 7.4; // cadencia del filmstrip original (55 s / 7)

	let viewport: HTMLElement;
	let track: HTMLElement;
	let x = 0; // desplazamiento actual de la pista (px)
	let half = 0; // ancho de una mitad (N fotos) → módulo del loop
	let slideW = 0; // ancho de una foto + su margen
	let speed = 0; // px/s (slideW / SECONDS_PER_SLIDE)
	let reduced = false;
	let active = $state(0);
	let raf = 0;
	let last = 0;
	let dragging = false;
	let nudging: Promise<void> | null = null;

	const clampWrap = () => {
		if (half > 0) {
			x = ((x % half) + half) % half;
		}
	};

	const paint = () => {
		track.style.transform = `translate3d(${-x}px,0,0)`;
		// La foto más cercana al centro del viewport es la "activa"
		const center = x + viewport.clientWidth / 2;
		active = Math.round(center / slideW - 0.5) % images.length;
	};

	const tick = (t: number) => {
		const dt = Math.min((t - last) / 1000, 0.05);
		last = t;
		if (!dragging && !nudging && !reduced) {
			x += speed * dt;
			clampWrap();
		}
		paint();
		raf = requestAnimationFrame(tick);
	};

	/** Empujón suave de una foto (flechas): tween 650 ms y retoma el rodado. */
	const nudge = (dir: 1 | -1) => {
		if (nudging || !slideW) return;
		nudging = (async () => {
			const from = x;
			const to = Math.round(x / slideW) * slideW + dir * slideW;
			const t0 = performance.now();
			const dur = 650;
			await new Promise<void>((resolve) => {
				const stepTween = (now: number) => {
					const p = Math.min((now - t0) / dur, 1);
					const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
					x = from + (to - from) * e;
					clampWrap();
					if (p < 1) requestAnimationFrame(stepTween);
					else resolve();
				};
				requestAnimationFrame(stepTween);
			});
			nudging = null;
		})();
	};

	onMount(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const measure = () => {
			slideW = track.children.length
				? track.children[1].getBoundingClientRect().left - track.children[0].getBoundingClientRect().left
				: 0;
			half = track.scrollWidth / 2;
			speed = (slideW || 1) / SECONDS_PER_SLIDE;
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(viewport);

		// Arrastre (mouse/touch): la pista sigue al puntero y al soltar engancha
		let startX = 0;
		let startTrackX = 0;
		const onDown = (e: PointerEvent) => {
			dragging = true;
			startX = e.clientX;
			startTrackX = x;
			viewport.setPointerCapture(e.pointerId);
		};
		const onMove = (e: PointerEvent) => {
			if (!dragging) return;
			x = startTrackX - (e.clientX - startX);
			clampWrap();
		};
		const onUp = () => {
			if (!dragging) return;
			dragging = false;
			nudge(x - startTrackX < 0 ? 1 : -1); // completa la foto más cercana
		};
		viewport.addEventListener('pointerdown', onDown);
		viewport.addEventListener('pointermove', onMove);
		viewport.addEventListener('pointerup', onUp);
		viewport.addEventListener('pointercancel', onUp);

		last = performance.now();
		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			viewport.removeEventListener('pointerdown', onDown);
			viewport.removeEventListener('pointermove', onMove);
			viewport.removeEventListener('pointerup', onUp);
			viewport.removeEventListener('pointercancel', onUp);
		};
	});
</script>

<div class="banner" aria-label="Trabajos destacados — carrusel">
	<div class="banner__viewport" bind:this={viewport}>
		<div class="banner__track" bind:this={track}>
			{#each [...images, ...images] as img, i (img.src + i)}
				<div class="banner__slide" class:is-active={active === i % images.length} aria-hidden={i >= images.length}>
					<img src={img.src} srcset={img.srcset} sizes={img.sizes} alt={img.alt} loading="eager" fetchpriority={i === 0 ? 'high' : undefined} decoding="async" draggable="false" />
				</div>
			{/each}
		</div>
	</div>

	<button class="banner__nav banner__nav--prev" type="button" aria-label="Foto anterior" onclick={() => nudge(-1)}>‹</button>
	<button class="banner__nav banner__nav--next" type="button" aria-label="Foto siguiente" onclick={() => nudge(1)}>›</button>
</div>

<style>
	.banner {
		position: relative;
		overflow: hidden;
		padding: var(--space-6) 0;
	}

	.banner__viewport {
		overflow: hidden;
		cursor: grab;
		touch-action: pan-y;
	}
	.banner__viewport:active {
		cursor: grabbing;
	}

	.banner__track {
		display: flex;
		width: max-content;
		will-change: transform;
	}

	.banner__slide {
		flex: 0 0 min(58vw, 460px);
		margin: 0 var(--space-3);
		aspect-ratio: 4 / 5;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
		/* Atenuación por luminosidad: las laterales respiran hacia atrás,
		   la activa (más cercana al centro) brilla */
		filter: brightness(0.55) saturate(0.85) blur(1.5px);
		transform: scale(0.95);
		transition:
			filter 0.6s var(--ease),
			transform 0.6s var(--ease),
			border-color 0.6s var(--ease),
			box-shadow 0.6s var(--ease);
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
		pointer-events: none;
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

	@media (prefers-reduced-motion: reduce) {
		.banner__slide {
			transition: none;
		}
	}
</style>
