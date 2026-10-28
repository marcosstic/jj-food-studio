<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageHero from '$lib/sections/PageHero.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { site, waLink } from '$lib/content';
</script>

<Meta
	title="Contacto · JJ Food Studio"
	description="Agenda tu sesión de fotografía o video gastronómico. Cuéntame tu proyecto y te respondo lo antes posible."
	path="/contacto"
/>

<PageHero title="Contacto" lead="Cuéntame sobre tu proyecto y te respondo lo antes posible." />

<section class="section container">
	<div class="card card--wide">
		<h2 class="h2">Agenda tu sesión</h2>
		<p class="muted">
			Completa el formulario y te contactaré para coordinar los detalles de tu proyecto.
		</p>
		<ContactForm />
	</div>
</section>

<section class="section container">
	<div class="grid grid--3">
		<div class="card">
			<h3 class="h3">WhatsApp</h3>
			<p class="muted">Respuesta inmediata para consultas rápidas.</p>
			<a class="link" href={waLink()} target="_blank" rel="noreferrer">Enviar mensaje</a>
		</div>
		<div class="card">
			<h3 class="h3">Instagram</h3>
			<p class="muted">Ve mi trabajo diario y proceso detrás de cámara.</p>
			<a class="link" href={site.instagramUrl} target="_blank" rel="noreferrer">{site.instagramHandle}</a>
		</div>
		<div class="card">
			<h3 class="h3">Email</h3>
			<p class="muted">Para consultas detalladas y presupuestos.</p>
			<a class="link" href={`mailto:${site.email}`}>{site.email}</a>
		</div>
	</div>
</section>

<Footer />
