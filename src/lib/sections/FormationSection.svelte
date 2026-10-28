<script lang="ts">
	import { courses } from '$lib/content';

	/** Sección formación del home (ancla usada por la navegación /#formacion). */
</script>

<section id="formacion" class="section container" aria-label="Formación">
	<header class="section__header">
		<h2 class="h2">Formación</h2>
		<a class="link" href="#formacion">Ver todo</a>
	</header>

	<div class="grid grid--3">
		{#each courses as course (course.title)}
			<div class="card">
				<h3 class="h3">{course.title}</h3>
				<p class="muted">{course.description}</p>
				<a class="link" href={course.href}>{course.cta}</a>
			</div>
		{/each}
	</div>
</section>
