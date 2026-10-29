<script lang="ts">
	import { onMount } from 'svelte';

	let el: HTMLElement;
	let error = $state('');

	onMount(async () => {
		try {
			const { mountStudio } = await import('$lib/panel/studio');
			if (el) mountStudio(el);
		} catch (e) {
			error = String(e);
		}
	});
</script>

<svelte:head>
	<title>Panel · JJ Food Studio</title>
</svelte:head>

<div class="panel" bind:this={el}>
	{#if error}
		<pre style="color:#b00; padding:20px; white-space:pre-wrap;">{error}</pre>
	{/if}
</div>

<style>
	.panel {
		min-height: 100vh;
		background: #ffffff;
	}
</style>
