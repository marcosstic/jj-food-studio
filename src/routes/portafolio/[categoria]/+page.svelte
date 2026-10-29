<script lang="ts">
	import '$lib/styles/pages/galeria.css';
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GalleryStage from '$lib/components/GalleryStage.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import { fadein } from '$lib/actions/fadein';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const category = $derived(data.category);
	let active = $state(0);
	let jumpTo = $state(-1);
	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);

	const goTo = (i: number) => {
		active = i;
		jumpTo = i;
	};

	// Clic en el grid: salta el stage Y abre el lightbox a pantalla completa
	const openLightbox = (i: number) => {
		goTo(i);
		lightboxIndex = i;
		lightboxOpen = true;
	};

	// OG image: la mayor resolución disponible de la portada
	const og = $derived(category.cover.srcset?.split(', ').pop()?.split(' ')[0] ?? category.cover.src);
</script>

<Meta
	title="{category.name} · JJ Food Studio"
	description={`${category.headline} ${category.description}`}
	image={og}
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
		{#each category.gallery as img, i (img.src + i)}
			<button
				class="gallery-tile"
				class:is-active={active === i}
				type="button"
				aria-label={`Ver foto ${i + 1} de ${category.name} a pantalla completa`}
				onclick={() => openLightbox(i)}
			>
				<span
					class="gallery-tile__media"
					style="background-image:url({img.lqip})"
				>
					<img
						src={img.src}
						srcset={img.srcset}
						sizes={img.sizes}
						alt={img.alt}
						loading="lazy"
						use:fadein
					/>
				</span>
			</button>
		{/each}
	</div>
</section>

<!-- AJ-09: CTA redirige al calendario de agenda -->
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

<Lightbox images={category.gallery} bind:index={lightboxIndex} bind:open={lightboxOpen} />

<Footer />
