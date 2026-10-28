<script lang="ts">
	import '$lib/styles/pages/caso.css';
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Meta
	title="Caso · JJ Food Studio"
	description="Caso de estudio: video gastronómico publicitario con control de líquidos y cámara lenta."
	path="/caso"
/>

<div class="container">
	<section class="case-hero">
		<div class="case-hero__media" aria-label="Cover">
			<div class="case-hero__ph"></div>
			<div class="case-hero__overlay"></div>
		</div>
		<div class="case-hero__content">
			<div class="tags"><span class="tag">Marcas</span><span class="tag">Video</span></div>
			<h1 class="h1">Caso de ejemplo</h1>
			<p class="lead">Look publicitario, control de iluminación y detalle macro.</p>
			<div class="cta-row">
				<a class="btn btn--outline btn--cta" href="/#agenda">Quiero algo así</a>
				<a class="btn btn--ghost" href="/portafolio">Volver</a>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="grid grid--3">
			<div class="card">
				<h3 class="h3">Servicios</h3>
				<p class="muted">Video · Dirección de arte · Food styling</p>
			</div>
			<div class="card">
				<h3 class="h3">Objetivo</h3>
				<p class="muted">Activar antojo con ritmo y precisión técnica.</p>
			</div>
			<div class="card">
				<h3 class="h3">Entrega</h3>
				<p class="muted">Piezas para redes y campaña.</p>
			</div>
		</div>
	</section>

	<section class="section" aria-label="Galería">
		<header class="section__header">
			<h2 class="h2">Galería</h2>
		</header>
		<div class="grid grid--3">
			<div class="media-tile"></div>
			<div class="media-tile"></div>
			<div class="media-tile"></div>
			<div class="media-tile"></div>
			<div class="media-tile"></div>
			<div class="media-tile"></div>
		</div>
	</section>
</div>

<Footer variant="minimal" />
