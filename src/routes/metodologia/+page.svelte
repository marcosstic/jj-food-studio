<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageHero from '$lib/sections/PageHero.svelte';
	import { methodSteps } from '$lib/content';
</script>

<Meta
	title="Metodología · JJ Food Studio"
	description="El proceso de JJ Food Studio en 5 etapas: brief, preproducción, producción, postproducción y entrega."
	path="/metodologia"
/>

<PageHero title="Metodología" lead="Mi proceso de trabajo para crear imagen gastronómica profesional." />

<section class="section container">
	<div class="grid grid--3">
		{#each methodSteps as step (step.title)}
			<div class="card">
				<h3 class="h3">{step.title}</h3>
				<p class="muted">{step.description}</p>
			</div>
		{/each}
		<div class="card card--cta">
			<h3 class="h3">Trabajemos juntos</h3>
			<p class="muted">
				Cuéntame tu proyecto y te explico cómo aplico esta metodología a tu caso específico.
			</p>
			<a class="btn btn--outline btn--cta" href="/#agenda">Agenda tu sesión</a>
		</div>
	</div>
</section>

<section class="section container">
	<header class="section__header">
		<h2 class="h2">Por qué esta metodología</h2>
	</header>
	<div class="card card--wide">
		<p class="lead">
			Más de 8 años de experiencia me han enseñado que la imagen gastronómica exitosa no es solo
			técnica, es estrategia. Cada paso de este proceso está diseñado para garantizar que el resultado
			final no solo sea hermoso, sino efectivo para tu negocio.
		</p>
		<p class="muted">
			La fotografía y video gastronómico requiere un entendimiento profundo de la comida, la luz, la
			composición y, sobre todo, del consumidor. Mi metodología combina precisión técnica con
			sensibilidad culinaria para crear imágenes que despiertan apetito y generan acción.
		</p>
	</div>
</section>

<Footer />
