<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageHero from '$lib/sections/PageHero.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { site, waLink } from '$lib/content';
</script>

<Meta
	title="Contacto · JJ Food Studio"
	description="Cuéntame tu proyecto: fotografía, video, dirección de arte, food styling, cursos o asesorías. Te respondo en menos de 24 horas."
	path="/contacto"
/>

<PageHero title="Contacto" lead="Cuéntame sobre tu proyecto y te respondo lo antes posible." />

<section class="section container">
	<div class="card card--wide">
		<h2 class="h2">Cuéntame tu proyecto</h2>
		<p class="muted">
			Completa el formulario y te contactaré en menos de 24 horas para coordinar los detalles.
			¿Ya sabes qué necesitas? <a class="link" href="/#agenda">Agenda tu sesión directamente en el calendario</a>.
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
