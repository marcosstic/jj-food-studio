<script lang="ts">
	import CategoryCard from '$lib/components/CategoryCard.svelte';
	import { categories } from '$lib/content';

	/** Sección portafolio: grid de categorías → galería directa (AJ-05/06). */
	let { showHeader = true, showHeaderLink = true }: { showHeader?: boolean; showHeaderLink?: boolean } = $props();
</script>

<section class="portfolio container section" aria-label="Portafolio">
	{#if showHeader}
		<header class="section__header">
			<h2 class="h2">Portafolio</h2>
			{#if showHeaderLink}
				<a class="link" href="/portafolio">Explorar</a>
			{/if}
		</header>
	{/if}

	<div class="grid grid--3">
		{#each categories as category (category.slug)}
			<CategoryCard {category} />
		{/each}
	</div>
</section>
