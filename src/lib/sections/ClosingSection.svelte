<script lang="ts">
	import { home, waLink } from '$lib/content';

	/**
	 * Sección de cierre: retrato de JJ + solo WhatsApp (AJ-10, actualizado:
	 * el cliente pidió foto en lugar de video — Fase 2c). Placeholder P-2.
	 * En Fase 3 el retrato es editable desde el CMS.
	 */
	const foto = home.closing.foto;
</script>

<section class="closing container" aria-label="Trabajemos juntos">
	<img
		class="closing__foto"
		src={foto.src}
		srcset={foto.srcset}
		sizes={foto.sizes}
		alt={foto.alt}
		loading="lazy"
	/>
	<a class="btn btn--outline btn--cta closing__wa" href={waLink()} target="_blank" rel="noreferrer">
		WhatsApp
	</a>
</section>

<style>
	.closing {
		text-align: center;
		padding: var(--space-7) var(--space-4) var(--space-6);
	}

	/* Retrato vertical 3:4 — el formato recomendado para la foto real de JJ */
	.closing__foto {
		width: 100%;
		max-width: 560px;
		aspect-ratio: 3 / 4;
		object-fit: cover;
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.06);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
		background: rgba(255, 255, 255, 0.03);
		display: block;
		margin: 0 auto var(--space-4);
	}

	.closing__wa {
		min-width: 220px;
	}
</style>
