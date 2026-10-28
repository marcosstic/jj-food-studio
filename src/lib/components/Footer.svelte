<script lang="ts">
	let { variant = 'full' }: { variant?: 'full' | 'minimal' } = $props();
</script>

<footer class="footer container" aria-label="Footer">
	{#if variant === 'full'}
		<div class="footer__top">
			<div>
				<div class="footer__brand">JJ Food Studio</div>
				<div class="footer__muted">Fotografía · Video · Dirección de arte · Food styling</div>
			</div>
			<div class="footer__links">
				<a class="nav__link" href="/portafolio">Portafolio</a>
				<a class="nav__link" href="/servicios">Servicios</a>
				<a class="nav__link" href="/#formacion">Formación</a>
			</div>
		</div>
		<div class="footer__bottom">© JJ Food Studio</div>
	{:else}
		<div class="footer__bottom">JJ Food Studio</div>
	{/if}
</footer>
