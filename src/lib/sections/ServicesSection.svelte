<script lang="ts">
	import { servicesSummary } from '$lib/content';

	/** Sección servicios resumidos del home. */
</script>

<section id="servicios" class="section container" aria-label="Servicios">
	<header class="section__header">
		<h2 class="h2">Servicios</h2>
		<a class="link" href="/servicios">Trabajemos juntos</a>
	</header>

	<div class="grid grid--3">
		{#each servicesSummary as service (service.title)}
			<div class="card">
				<h3 class="h3">{service.title}</h3>
				<p class="muted">{service.description}</p>
			</div>
		{/each}
		<div class="card card--cta">
			<h3 class="h3">Cuéntame tu proyecto</h3>
			<p class="muted">Cuéntanos tu proyecto y te respondemos.</p>
			<a class="btn btn--outline btn--cta" href="/contacto">Abrir formulario</a>
		</div>
	</div>
</section>
