<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$lib/content';
	import { initCalEmbed } from '$lib/services/booking';

	onMount(() => initCalEmbed(site.cal));
</script>

<div class="calcom-widget">
	<!-- Alturas responsivas: la agenda completa debe verse sin cortes
	     (desktop ~880px; en móvil el detalle + calendario se apilan → más alto) -->
	<div class="calcom-widget__frame" id={`my-cal-inline-${site.cal.bookingLink || site.cal.eventSlug}`}></div>
</div>

<style>
	/* Sin altura fija: el embed de cal.com ajusta el iframe solo a su contenido
	   (si cal no reporta altura, el fallback de min-height evita el colapso) */
	.calcom-widget__frame {
		width: 100%;
		min-height: 600px;
		overflow: visible;
	}
</style>
