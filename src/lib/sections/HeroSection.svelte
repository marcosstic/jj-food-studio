<script lang="ts">
	import ReelVideo from '$lib/components/ReelVideo.svelte';
	import BookingWidget from '$lib/components/BookingWidget.svelte';
	import LogoStage from '$lib/components/LogoStage.svelte';
	import LogoModeSwitcher from '$lib/components/LogoModeSwitcher.svelte';
	import { home } from '$lib/content';

	/**
	 * Sección HERO — agenda + video + logo en un pantallazo (Opción A + 3 columnas).
	 * La agenda es la columna central y más ancha: prioridad de JJ.
	 * ≥1200px: 3 columnas · 980–1199px: agenda+video, logo debajo · <980px: pila
	 * con la agenda primero.
	 */
</script>

<section class="hero" aria-label="Agenda tu sesión">
	<div class="hero__bg" aria-hidden="true"></div>

	<div class="hero__inner">
		<p class="kicker">{home.hero.kicker}</p>
		<h1 class="hero__title">{home.hero.h1}</h1>
	</div>

	<!-- Banda full-bleed: video pegado al borde izquierdo, logo al derecho -->
	<div class="hero__band">
		<div class="hero__media">
			<ReelVideo />
		</div>

		<div class="hero__cal">
			<header class="hero__cal-header">
				<h2 class="h2">Agenda tu sesión</h2>
				<p class="muted">Selecciona el tipo de servicio y horario disponible.</p>
			</header>
			<BookingWidget />
		</div>

		<div class="hero__logo">
			<div class="hero__logo-card">
				<LogoStage size="compact" />
				<LogoModeSwitcher />
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		padding: var(--space-6) 0 var(--space-7);
	}

	/* Glow unificado (Fase 2b §4.3): un solo halo suave arriba-izquierda */
	.hero__bg {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(900px 600px at 18% 0%, rgba(233, 215, 154, 0.10), transparent 62%),
			linear-gradient(180deg, transparent 55%, rgba(0, 0, 0, 0.25));
		pointer-events: none;
	}

	/* Título alineado con el container amplio */
	.hero__inner {
		position: relative;
		width: 100%;
		max-width: var(--container-wide);
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	.hero__title {
		font-size: clamp(28px, 3.2vw, 40px);
		letter-spacing: -0.02em;
		line-height: 1.12;
		margin: 0 0 var(--space-5);
		max-width: 720px;
		font-weight: 700;
	}

	/* Banda full-bleed — tríptico uniforme (v2/v3): video al borde izquierdo,
	   logo al borde derecho, agenda dominante al centro */
	.hero__band {
		display: grid;
		grid-template-columns: minmax(280px, 400px) minmax(0, 1fr) minmax(280px, 400px);
		gap: var(--space-5);
		align-items: stretch;
		margin-top: var(--space-5);
	}

	/* Video llenando su columna (absoluto: la altura la fija la agenda) */
	.hero__media {
		position: relative;
		min-height: 480px;
	}

	.hero__media :global(.reel) {
		position: absolute;
		inset: 0;
		margin: 0;
		max-width: none;
	}

	.hero__media :global(.reel__video) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-left: none;
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
	}

	.hero__cal {
		min-width: 0;
		width: 100%;
		max-width: 820px;
		margin: 0 auto;
	}

	.hero__cal-header {
		text-align: center;
		margin-bottom: var(--space-3);
	}

	.hero__cal-header .muted {
		margin-top: var(--space-2);
	}

	/* Panel de marca: tarjeta glass que iguala la altura de la fila */
	.hero__logo {
		display: flex;
	}

	/* Panel de marca pegado al borde derecho: radios solo en el lado interior */
	.hero__logo-card {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-4);
		padding: var(--space-3);
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-right: none;
		border-radius: var(--radius) 0 0 var(--radius);
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18) inset;
	}

	/* El logo se adapta a la tarjeta (evita min-content > columna → overflow) */
	.hero__logo-card :global(.logo-stage) {
		width: 100%;
		max-width: 280px;
		min-width: 0;
	}

	/* 980–1199px: agenda + video estirados; logo en tarjeta ancha debajo */
	@media (max-width: 1199px) and (min-width: 980px) {
		.hero__band {
			grid-template-columns: minmax(280px, 400px) minmax(0, 1fr);
		}

		.hero__logo {
			grid-column: 1 / -1;
		}

		.hero__logo-card {
			border-right: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: var(--radius);
		}
	}

	/* <980px: pila con la agenda primero (prioridad JJ), órdenes explícitos */
	@media (max-width: 980px) {
		.hero__band {
			grid-template-columns: 1fr;
		}

		.hero__cal {
			order: -1;
			padding: 0 var(--space-3);
		}

		.hero__media {
			order: 0;
			position: static;
			min-height: 0;
			display: flex;
			justify-content: center;
		}

		.hero__media :global(.reel) {
			position: static;
			width: min(340px, 100%);
		}

		.hero__media :global(.reel__video) {
			height: min(60vh, 480px);
			border: 1px solid rgba(255, 255, 255, 0.06);
		}

		.hero__logo {
			order: 1;
			padding: 0 var(--space-3);
		}

		.hero__logo-card {
			border-right: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: var(--radius);
		}
	}
</style>
