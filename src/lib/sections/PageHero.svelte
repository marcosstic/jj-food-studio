<script lang="ts">
	/** Encabezado de páginas interiores (título + lead centrados, aire con tokens). */
	let { title, lead, kicker }: { title: string; lead?: string; kicker?: string } = $props();
</script>

<section class="page-hero">
	{#if kicker}<p class="kicker">{kicker}</p>{/if}
	<h1 class="h1">{title}</h1>
	{#if lead}<p class="lead">{lead}</p>{/if}
</section>

<style>
	.page-hero {
		padding: var(--space-12) var(--space-4);
		text-align: center;
	}

	.page-hero .kicker {
		margin-bottom: var(--space-3);
	}

	@media (max-width: 980px) {
		.page-hero {
			padding: var(--space-10) var(--space-3);
		}
	}

	@media (max-width: 768px) {
		.page-hero {
			padding: var(--space-8) var(--space-3);
		}
	}
</style>
