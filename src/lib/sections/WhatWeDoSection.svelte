<script lang="ts">
	import { home } from '$lib/content';

	/**
	 * Sección "Qué hacemos": texto de marca + botones (el logo vive en el hero
	 * a 3 columnas, Fase 2b).
	 */
</script>

<section class="wwd container" aria-label="Qué hacemos">
	<p class="wwd__lead">{home.hero.sub}</p>

		<div class="wwd__actions">
			<a class="btn btn--outline btn--cta" href="/#agenda">Agenda tu sesión</a>
			<a class="btn btn--ghost" href="/portafolio">Ver portafolio</a>
		</div>

	<div class="wwd__meta">
		<span class="pill">Food styling</span>
		<span class="pill">Dirección de arte</span>
		<span class="pill">Foto · Video</span>
	</div>
</section>

<style>
	.wwd {
		padding-top: var(--space-7);
		padding-bottom: var(--space-8);
	}

	.wwd__lead {
		color: var(--muted);
		font-size: 20px;
		line-height: 1.6;
		margin: 0 0 var(--space-5);
		max-width: 640px;
	}

	/* AJ-02: botones con espacio entre sí */
	.wwd__actions {
		display: flex;
		gap: var(--space-5);
		row-gap: var(--space-3);
		flex-wrap: wrap;
	}

	.wwd__meta {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
		margin-top: var(--space-5);
	}

	@media (max-width: 980px) {
		.wwd {
			text-align: center;
		}

		.wwd__lead {
			margin-inline: auto;
		}

		.wwd__actions,
		.wwd__meta {
			justify-content: center;
		}
	}
</style>
