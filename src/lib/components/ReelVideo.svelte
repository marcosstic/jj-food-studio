<script lang="ts">
	import { videoUrl } from '$lib/services/cloudinary';
	import { home } from '$lib/content';

	/**
	 * Video del hero. `customUrl` viene del CMS (homeContent.videoHeroUrl);
	 * si no hay, se usa el placeholder por publicId de Cloudinary.
	 * El poster del customUrl se deriva cambiando /video/upload/ por
	 * /image/upload/ (Cloudinary sirve el primer frame así).
	 */
	let { customUrl = home.reel.customUrl }: { customUrl?: string } = $props();

	const fallbackSrc = videoUrl(home.reel.videoPublicId, home.reel.videoTransform);
	const fallbackPoster = `https://res.cloudinary.com/sfhco0ar/image/upload/c_fill,w_380,h_253,q_75,f_auto/${home.reel.posterPublicId}`;

	const videoSrc = customUrl || fallbackSrc;
	const posterSrc = customUrl?.includes('res.cloudinary.com')
		? customUrl.replace('/video/upload/', '/image/upload/').replace(/\.\w+$/, '.jpg')
		: customUrl
			? undefined
			: fallbackPoster;
</script>

<div class="reel" aria-label="Demo reel">
	<video
		class="reel__video"
		src={videoSrc}
		poster={posterSrc}
		autoplay
		muted
		loop
		playsinline
		loading="lazy"
	>
		Tu navegador no soporta videos HTML5.
	</video>
</div>
