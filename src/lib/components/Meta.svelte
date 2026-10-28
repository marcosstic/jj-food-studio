<script lang="ts">
	import { site, ogImage } from '$lib/content';

	/**
	 * SEO por página: título, descripción y tarjetas sociales (Paso 4, backlog #1).
	 * Usar dentro de <svelte:head>… no: este componente ya incluye <svelte:head>.
	 */
	let {
		title,
		description,
		image = ogImage,
		path = ''
	}: { title: string; description: string; image?: string; path?: string } = $props();

	const absoluteUrl = `${site.url}${path}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={absoluteUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
