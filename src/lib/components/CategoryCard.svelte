<script lang="ts">
	import type { Category } from '$lib/content';
	import { imageUrl, imageSrcSet, cardImageSizes, cardImageVariants } from '$lib/services/cloudinary';
	import { fadein } from '$lib/actions/fadein';

	let { category }: { category: Category } = $props();
</script>

<a class="card card--cover" href={`/portafolio/${category.slug}`}>
	<div class="card__media">
		<img
			src={imageUrl(category.cover.publicId, cardImageVariants[cardImageVariants.length - 1])}
			srcset={imageSrcSet(category.cover.publicId, cardImageVariants)}
			sizes={cardImageSizes}
			alt={category.cover.alt}
			loading="lazy"
			use:fadein
		/>
	</div>
	<div class="card__content">
		<h3 class="h3">{category.name}</h3>
		<p class="muted">{category.tagline}</p>
	</div>
</a>

<style>
	/* Estilos propios del componente (vertical 4:5, Fase 2c) */
	.card__media {
		aspect-ratio: 4 / 5;
		background: rgba(255, 255, 255, 0.05);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.card__media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	/* .loaded se añade en runtime (acción fadein) → :global evita la poda */
	.card__media img:global(.loaded) {
		opacity: 1;
	}

	.card__content {
		padding-top: var(--space-3);
	}
</style>
