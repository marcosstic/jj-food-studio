<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageHero from '$lib/sections/PageHero.svelte';
	import { servicesDetailed, whyChoose } from '$lib/content';
</script>

<Meta
	title="Servicios · JJ Food Studio"
	description="Fotografía gastronómica, video, dirección de arte, food styling y asesorías para restaurantes, marcas de alimentos y pastelerías."
	path="/servicios"
/>

<PageHero
	title="Servicios"
	lead="Soluciones visuales completas para restaurantes, marcas de alimentos y pastelería."
/>

{#each servicesDetailed as service (service.title)}
	<section class="section container">
		<div class="card card--wide">
			<h2 class="h2">{service.title}</h2>
			<p class="lead">{service.lead}</p>
			<p class="muted">{service.description}</p>
			<div class="cta-row">
				<a class="btn btn--outline btn--cta" href="/#agenda">{service.cta}</a>
			</div>
		</div>
	</section>
{/each}

<section class="section container">
	<header class="section__header">
		<h2 class="h2">¿Por qué elegir JJ Food Studio?</h2>
	</header>
	<div class="grid grid--3">
		{#each whyChoose as item (item.title)}
			<div class="card">
				<h3 class="h3">{item.title}</h3>
				<p class="muted">{item.description}</p>
			</div>
		{/each}
		<div class="card card--cta">
			<h3 class="h3">Hablemos de tu proyecto</h3>
			<p class="muted">Cuéntame qué necesitas y te explico cómo puedo ayudarte.</p>
			<a class="btn btn--outline btn--cta" href="/#agenda">Agenda tu sesión</a>
		</div>
	</div>
</section>

<Footer />
