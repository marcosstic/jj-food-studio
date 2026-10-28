<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import BannerSection from '$lib/sections/BannerSection.svelte';
	import HeroSection from '$lib/sections/HeroSection.svelte';
	import WhatWeDoSection from '$lib/sections/WhatWeDoSection.svelte';
	import EditorialSection from '$lib/sections/EditorialSection.svelte';
	import PortfolioSection from '$lib/sections/PortfolioSection.svelte';
	import ServicesSection from '$lib/sections/ServicesSection.svelte';
	import FormationSection from '$lib/sections/FormationSection.svelte';
	import AboutSection from '$lib/sections/AboutSection.svelte';
	import ClosingSection from '$lib/sections/ClosingSection.svelte';
	import { homeSections, type HomeSectionId } from '$lib/content';

	/**
	 * El home es una LISTA ORDENADA de secciones (Fase 2b §5.2).
	 * El orden vive en src/lib/content/home.ts — mover una sección es
	 * mover un string. Fase 3: orden arrastrable desde el CMS.
	 */
	const registry: Record<HomeSectionId, import('svelte').Component> = {
		banner: BannerSection,
		hero: HeroSection,
		whatWeDo: WhatWeDoSection,
		editorial: EditorialSection,
		portfolio: PortfolioSection,
		services: ServicesSection,
		formation: FormationSection,
		about: AboutSection,
		closing: ClosingSection
	};
</script>

<Meta
	title="JJ Food Studio · Fotografía y video gastronómico"
	description="Fotografía y video gastronómico para restaurantes, pastelerías y marcas de alimentos. Imágenes que hacen que la comida se venda. Agenda tu sesión."
	path="/"
/>

{#each homeSections as id (id)}
	{@const Section = registry[id]}
	<Section />
{/each}
