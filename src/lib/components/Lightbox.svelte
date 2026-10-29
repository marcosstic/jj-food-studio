<script lang="ts">
	import type { MediaView } from '$lib/content';

	/**
	 * Lightbox a pantalla completa (Fase 2c/3): ✕ para cerrar, flechas,
	 * contador, ficha técnica (cliente · servicio · año) y navegación con
	 * teclado (Esc / ← →). Clic fuera = cerrar.
	 */
	let { images, index = $bindable(0), open = $bindable(false) }: { images: MediaView[]; index?: number; open?: boolean } = $props();

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
	{@const img = images[index]}
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

		{#if img.kind === 'video'}
			<video class="lb__img" src={img.src} autoplay muted loop playsinline></video>
		{:else}
			<img class="lb__img" src={img.src} srcset={img.srcset} alt={img.alt} />
		{/if}

		<button class="lb__nav lb__nav--next" type="button" aria-label="Siguiente" onclick={() => step(1)}>›</button>

		<div class="lb__ficha">
			{#if img.cliente}<span>{img.cliente}</span>{/if}
			{#if img.servicio}<span>{img.servicio}</span>{/if}
			{#if img.anio}<span>{img.anio}</span>{/if}
		</div>

		<div class="lb__counter">{index + 1} / {images.length}</div>
	</div>
{/if}

<style>
	.lb {
		position: fixed;
		inset: 0;
		z-index: var(--z-overlay);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
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
		max-height: 80vh;
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 32px 80px rgba(0, 0, 0, 0.55);
		object-fit: contain;
	}

	.lb__ficha {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
		justify-content: center;
		color: var(--gold-m);
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		min-height: 1em;
	}

	.lb__counter {
		color: rgba(255, 255, 255, 0.8);
		font-size: 12px;
		letter-spacing: 0.14em;
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

	@media (max-width: 680px) {
		.lb__img {
			max-width: 96vw;
			max-height: 74vh;
		}

		.lb__nav {
			width: 42px;
			height: 42px;
		}
	}
</style>
