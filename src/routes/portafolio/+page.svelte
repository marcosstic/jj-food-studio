<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageHero from '$lib/sections/PageHero.svelte';
	import PortfolioSection from '$lib/sections/PortfolioSection.svelte';
</script>

<Meta
	title="Portafolio · JJ Food Studio"
	description="Portafolio de fotografía gastronómica dark & moody: restaurantes, marcas personales y pastelerías."
	path="/portafolio"
/>

<PageHero title="Portafolio" lead="Selección de trabajos con estética dark & moody y enfoque macro." />

<!-- AJ-05/06: categorías renombradas; cada una enlaza directo a su galería -->
<PortfolioSection showHeader={false} />

<Footer />
