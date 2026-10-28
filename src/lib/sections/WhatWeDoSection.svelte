<script lang="ts">
	import { home } from '$lib/content';

	/**
	 * Sección "Qué hacemos": titular de marca (mudado del hero en Fase 2c,
	 * donde vive el banner), texto + botones.
	 */
</script>

<section class="wwd container" aria-label="Qué hacemos">
	<p class="kicker">{home.hero.kicker}</p>
	<h1 class="wwd__title">{home.hero.h1}</h1>

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

	.wwd__title {
		font-size: clamp(30px, 3.6vw, 46px);
		letter-spacing: -0.02em;
		line-height: 1.08;
		margin: 0 0 var(--space-5);
		max-width: 720px;
		font-weight: 700;
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
