<script lang="ts">
	import { home, site, waLink } from '$lib/content';
	import { videoUrl } from '$lib/services/cloudinary';

	/** Sección de cierre: video de JJ + solo WhatsApp (AJ-10). Placeholder P-2. */
	const videoSrc = videoUrl(home.closing.videoPublicId, home.closing.videoTransform);
</script>

<section class="closing container" aria-label="Trabajemos juntos">
	<video class="closing__video" src={videoSrc} autoplay muted loop playsinline loading="lazy">
		Tu navegador no soporta videos HTML5.
	</video>
	<a class="btn btn--outline btn--cta closing__wa" href={waLink()} target="_blank" rel="noreferrer">
		WhatsApp
	</a>
</section>

<style>
	.closing {
		text-align: center;
		padding: var(--space-7) var(--space-4) var(--space-6);
	}

	/* Caja suave (Fase 2b §4.2): borde tenue, sombra profunda */
	.closing__video {
		width: 100%;
		max-width: 720px;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: var(--radius);
		border: 1px solid rgba(255, 255, 255, 0.06);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
		background: rgba(255, 255, 255, 0.03);
		display: block;
		margin: 0 auto var(--space-4);
	}

	.closing__wa {
		min-width: 220px;
	}
</style>
