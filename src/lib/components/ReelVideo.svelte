<script lang="ts">
	import { videoUrl } from '$lib/services/cloudinary';
	import { home } from '$lib/content';

	let { videoPublicId = home.reel.videoPublicId, videoTransform = home.reel.videoTransform }: { videoPublicId?: string; videoTransform?: string } = $props();

	const videoSrc = videoUrl(videoPublicId, videoTransform);
	const posterSrc = `https://res.cloudinary.com/sfhco0ar/image/upload/c_fill,w_380,h_253,q_75,f_auto/${home.reel.posterPublicId}`;
</script>

<div class="reel" aria-label="Demo reel">
	<video class="reel__video" src={videoSrc} poster={posterSrc} autoplay muted loop playsinline loading="lazy">
		Tu navegador no soporta videos HTML5.
	</video>
</div>
