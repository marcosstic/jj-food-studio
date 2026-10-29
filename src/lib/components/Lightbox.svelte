<script lang="ts">
	import type { CloudinaryAsset } from '$lib/content';
	import { imageUrl } from '$lib/services/cloudinary';

	/**
	 * Lightbox a pantalla completa (Fase 2c): ✕ para cerrar, flechas,
	 * contador y navegación con teclado (Esc / ← →). Clic fuera = cerrar.
	 */
	let { images, index = $bindable(0), open = $bindable(false) }: { images: CloudinaryAsset[]; index?: number; open?: boolean } = $props();

	const close = () => (open = false);
	const step = (dir: 1 | -1) => {
		index = (index + dir + images.length) % images.length;
	};

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowRight') step(1);
		else if (e.key === 'ArrowLeft') step(-1);
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'; // sin scroll del fondo
			window.addEventListener('keydown', onKeydown);
			return () => {
				document.body.style.overflow = '';
				window.removeEventListener('keydown', onKeydown);
			};
		}
	});
</script>

{#if open}
	<div
		class="lb"
		role="dialog"
		aria-modal="true"
		aria-label="Foto ampliada"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
	>
		<button class="lb__close" type="button" aria-label="Cerrar (Escape)" onclick={close}>✕</button>

		<button class="lb__nav lb__nav--prev" type="button" aria-label="Anterior" onclick={() => step(-1)}>‹</button>

		<img
			class="lb__img"
			src={imageUrl(images[index].publicId, { w: 1200, h: 1500, q: 85 })}
			alt={images[index].alt}
		/>

		<button class="lb__nav lb__nav--next" type="button" aria-label="Siguiente" onclick={() => step(1)}>›</button>

		<div class="lb__counter">{index + 1} / {images.length}</div>
	</div>
{/if}

<style>
	.lb {
		position: fixed;
		inset: 0;
		z-index: var(--z-overlay);
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(4, 4, 5, 0.94);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		animation: lb-in var(--dur-2) var(--ease);
	}

	@keyframes lb-in {
		from {
			opacity: 0;
		}
	}

	.lb__img {
		max-width: min(92vw, 900px);
		max-height: 88vh;
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 32px 80px rgba(0, 0, 0, 0.55);
		object-fit: contain;
	}

	.lb__close {
		position: absolute;
		top: 18px;
		right: 18px;
		width: 44px;
		height: 44px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.18);
		background: rgba(7, 7, 8, 0.7);
		color: rgba(255, 255, 255, 0.92);
		font-size: 18px;
		cursor: pointer;
		transition: border-color var(--dur-1) var(--ease), transform var(--dur-1) var(--ease);
	}

	.lb__close:hover {
		border-color: rgba(233, 215, 154, 0.5);
		transform: rotate(90deg);
	}

	.lb__nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 48px;
		height: 48px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.18);
		background: rgba(7, 7, 8, 0.7);
		color: rgba(255, 255, 255, 0.92);
		font-size: 24px;
		line-height: 1;
		cursor: pointer;
		transition: border-color var(--dur-1) var(--ease);
	}

	.lb__nav:hover {
		border-color: rgba(233, 215, 154, 0.5);
	}

	.lb__nav--prev {
		left: 18px;
	}

	.lb__nav--next {
		right: 18px;
	}

	.lb__counter {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		color: rgba(255, 255, 255, 0.8);
		font-size: 12px;
		letter-spacing: 0.14em;
	}

	@media (max-width: 680px) {
		.lb__img {
			max-width: 96vw;
			max-height: 80vh;
		}

		.lb__nav {
			width: 42px;
			height: 42px;
		}
	}
</style>
