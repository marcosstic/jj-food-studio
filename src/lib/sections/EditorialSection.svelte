<script lang="ts">
	import { home } from '$lib/content';

	/** Sección editorial (AJ-04). */
</script>

<section class="editorial container" aria-label="Filosofía">
	<h2 class="h2">{home.editorial.title}</h2>
	<p class="lead">{home.editorial.subtitle}</p>
</section>

<style>
	.editorial {
		text-align: center;
		padding: var(--space-7) var(--space-4);
		max-width: 820px;
		margin: 0 auto;
	}

	.editorial .h2 {
		background: var(--gold-grad);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-bottom: var(--space-3);
	}

	.editorial .lead {
		font-size: 18px;
		margin-bottom: 0;
	}
</style>
