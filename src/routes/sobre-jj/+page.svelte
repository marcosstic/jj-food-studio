<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageHero from '$lib/sections/PageHero.svelte';
</script>

<Meta
	title="Sobre JJ · JJ Food Studio"
	description="JJ, fotógrafo gastronómico con más de 8 años de experiencia creando imagen que despierta apetito para restaurantes, chefs y marcas."
	path="/sobre-jj"
/>

<PageHero
	title="Sobre JJ"
	lead="Fotógrafo gastronómico con más de 8 años de experiencia creando imagen que despierta apetito."
/>

<section class="section container">
	<div class="card card--wide">
		<h2 class="h2">Mi historia</h2>
		<p class="lead">
			Soy JJ, fotógrafo gastronómico y fundador de JJfoodstudio. Durante más de 8 años he trabajado
			con restaurantes, chefs y marcas desarrollando imagen gastronómica profesional.
		</p>
		<p class="muted">
			Mi enfoque combina fotografía, video, dirección de arte y conocimiento real de cocina. No solo
			fotografío comida, entiendo la comida. Esta distinción es fundamental para crear imágenes que no
			solo sean hermosas, sino que comuniquen la esencia de cada plato y cada marca.
		</p>
		<p class="muted">
			Comencé mi carrera en la cocina, lo que me dio una comprensión profunda de los ingredientes,
			técnicas y la pasión detrás de cada platillo. Esta perspectiva culinaria me permite anticipar
			cómo la comida se comportará frente a la cámara y cómo resaltar sus mejores cualidades.
		</p>
	</div>
</section>

<section class="section container">
	<header class="section__header">
		<h2 class="h2">Mi filosofía</h2>
	</header>
	<div class="grid grid--3">
		<div class="card">
			<h3 class="h3">Dark &amp; moody aesthetic</h3>
			<p class="muted">
				Mi estilo distintivo combina iluminación dramática con composición intencional. Creo imágenes
				que evocan atmósfera, elegancia y antojo. No busco la iluminación plana y perfecta, busco la
				luz que cuente una historia.
			</p>
		</div>
		<div class="card">
			<h3 class="h3">Precisión técnica</h3>
			<p class="muted">
				Cada imagen es el resultado de control meticuloso de iluminación, composición y
				postproducción. La técnica es el fundamento, pero la creatividad es el alma. Combino ambas para
				crear imágenes que funcionan.
			</p>
		</div>
		<div class="card">
			<h3 class="h3">Autenticidad culinaria</h3>
			<p class="muted">
				Respeto la comida. No uso trucos que comprometan la integridad del plato. Mi food styling
				realza lo que ya está ahí, no crea algo artificial. La autenticidad se percibe en el resultado
				final.
			</p>
		</div>
	</div>
</section>

<section class="section container">
	<header class="section__header">
		<h2 class="h2">Experiencia</h2>
	</header>
	<div class="grid grid--3">
		<div class="card">
			<h3 class="h3">Restaurantes</h3>
			<p class="muted">
				Desde restaurantes gourmet hasta conceptos casuales. Menús completos, hero shots, contenido
				para redes. Entiendo las necesidades de cada tipo de establecimiento.
			</p>
		</div>
		<div class="card">
			<h3 class="h3">Marcas de alimentos</h3>
			<p class="muted">
				Packaging shots, campañas publicitarias, contenido para e-commerce. Imagen que vende producto
				y construye marca de manera consistente.
			</p>
		</div>
		<div class="card">
			<h3 class="h3">Pastelería</h3>
			<p class="muted">
				Texturas, brillos, detalle macro. La pastelería requiere un enfoque especial para capturar su
				delicadeza y artesanía. Es una de mis especialidades.
			</p>
		</div>
	</div>
</section>

<section class="section container">
	<header class="section__header">
		<h2 class="h2">Proceso de trabajo</h2>
	</header>
	<div class="card card--wide">
		<p class="lead">
			Mi metodología se basa en cinco etapas: brief, preproducción, producción, postproducción y
			entrega. Cada etapa es crítica para el éxito del proyecto final.
		</p>
		<p class="muted">
			Comprendiendo tu marca y objetivos desde el inicio, planificando cada detalle antes de la
			sesión, ejecutando con precisión técnica durante la producción, aplicando revelado profesional y
			retoque limpio en postproducción, y entregando archivos organizados con metadata completa.
		</p>
		<a class="link" href="/metodologia">Ver metodología completa</a>
	</div>
</section>

<section class="section container">
	<header class="section__header">
		<h2 class="h2">Formación</h2>
	</header>
	<div class="card card--wide">
		<p class="lead">
			Comparto mi conocimiento a través de cursos y talleres de fotografía gastronómica, food
			styling, iluminación y composición.
		</p>
		<p class="muted">
			Creo firmemente en la educación como forma de elevar el estándar de la fotografía gastronómica.
			Mis cursos están diseñados para transmitir no solo técnica, sino también la filosofía y el
			enfoque que he desarrollado durante más de 8 años en el campo.
		</p>
		<a class="link" href="/#formacion">Ver cursos y talleres</a>
	</div>
</section>

<section class="section container">
	<div class="card card--wide card--cta-final">
		<div>
			<h2 class="h2">¿Trabajamos juntos?</h2>
			<p class="muted">
				Cuéntame sobre tu proyecto y te explico cómo puedo ayudarte a crear imagen gastronómica que
				impacte.
			</p>
		</div>
		<div class="cta-row">
			<a class="btn btn--outline btn--cta" href="/#agenda">Agenda tu sesión</a>
			<a class="btn btn--ghost" href="/portafolio">Ver portafolio</a>
		</div>
	</div>
</section>

<Footer />
