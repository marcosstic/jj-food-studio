<script lang="ts">
	import '$lib/styles/pages/galeria.css';
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GalleryStage from '$lib/components/GalleryStage.svelte';
	import { imageUrl, imageSrcSet, cardImageSizes, cardImageVariants, lqipUrl } from '$lib/services/cloudinary';
	import { fadein } from '$lib/actions/fadein';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const category = $derived(data.category);
	let active = $state(0);
	let jumpTo = $state(-1);

	const goTo = (i: number) => {
		active = i;
		jumpTo = i;
	};

	const categoryOgImage = $derived(
		`https://res.cloudinary.com/sfhco0ar/image/upload/c_fill,w_1200,h_630,q_80,f_auto/${category.cover.publicId}`
	);
</script>

<Meta
	title="{category.name} · JJ Food Studio"
	description={`${category.headline} ${category.description}`}
	image={categoryOgImage}
	path={`/portafolio/${category.slug}`}
/>

<!-- AJ-08: textos exactos por categoría -->
<section class="page-hero gallery-hero">
	<p class="kicker">Portafolio · {category.name}</p>
	<h1 class="h1">{category.headline}</h1>
	<p class="lead">{category.description}</p>
</section>

<!-- AJ-07: stage diapositiva con las mismas fotos de la galería inferior -->
<section class="container gallery-stage-section" aria-label="Galería destacada">
	<GalleryStage
		images={category.gallery}
		{jumpTo}
		onselect={(i) => (active = i)}
	/>
</section>

<section class="container section" aria-label="Galería completa">
	<div class="gallery-grid">
		{#each category.gallery as img, i (img.publicId + i)}
			<button
				class="gallery-tile"
				class:is-active={active === i}
				type="button"
				aria-label={`Ver foto ${i + 1} de ${category.name}`}
				onclick={() => goTo(i)}
			>
				<span
					class="gallery-tile__media"
					style="background-image:url({lqipUrl(img.publicId)})"
				>
					<img
						src={imageUrl(img.publicId, cardImageVariants[cardImageVariants.length - 1])}
						srcset={imageSrcSet(img.publicId, cardImageVariants)}
						sizes={cardImageSizes}
						alt={img.alt}
						loading="lazy"
						use:fadein
					/>
				</span>
			</button>
		{/each}
	</div>
</section>

<!-- AJ-09: CTA redirige al formulario/calendario -->
<section class="container section gallery-cta" aria-label="Agenda">
	<div class="card card--wide card--cta-final">
		<div>
			<h2 class="h2">¿Trabajamos juntos?</h2>
			<p class="muted">Cuéntame tu proyecto y agendamos tu sesión.</p>
		</div>
		<div class="cta-row">
			<a class="btn btn--outline btn--cta" href="/#agenda">Agenda tu sesión</a>
		</div>
	</div>
</section>

<Footer />
