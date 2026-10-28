<script lang="ts">
	import { site } from '$lib/content';

	const inputStyle =
		'width: 100%; padding: var(--space-3); background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.10); border-radius: var(--radius-sm); color: var(--text); font-size: 14px; font-family: var(--font);';
	const labelStyle =
		'display: block; color: var(--text); margin-bottom: var(--space-2); font-size: 14px;';
	const groupStyle = 'margin-bottom: var(--space-3);';
</script>

<form action={site.formspreeEndpoint} method="POST" style="margin-top: var(--space-5);">
	<div style={groupStyle}>
		<label for="contacto-nombre" style={labelStyle}>Nombre *</label>
		<input
			id="contacto-nombre"
			type="text"
			name="nombre"
			required
			style={inputStyle}
			placeholder="Tu nombre completo"
		/>
	</div>

	<div style={groupStyle}>
		<label for="contacto-correo" style={labelStyle}>Correo electrónico *</label>
		<input
			id="contacto-correo"
			type="email"
			name="correo"
			required
			style={inputStyle}
			placeholder="tu@email.com"
		/>
	</div>

	<div style={groupStyle}>
		<label for="contacto-instagram" style={labelStyle}>Instagram</label>
		<input
			id="contacto-instagram"
			type="text"
			name="instagram"
			style={inputStyle}
			placeholder="@tu.instagram"
		/>
	</div>

	<div style={groupStyle}>
		<label for="contacto-telefono" style={labelStyle}>Número de contacto *</label>
		<input
			id="contacto-telefono"
			type="tel"
			name="telefono"
			required
			style={inputStyle}
			placeholder="+58 412 123 4567"
		/>
	</div>

	<div style={groupStyle}>
		<label for="contacto-interes" style={labelStyle}>Interés en *</label>
		<select
			id="contacto-interes"
			name="interes"
			required
			style={`${inputStyle} cursor: pointer;`}
		>
			<option value="">Selecciona una opción</option>
			<option value="sesiones">Sesiones de fotos y/o video</option>
			<option value="cursos">Cursos</option>
			<option value="asesorias">Asesorías</option>
			<option value="otros">Otros</option>
		</select>
	</div>

	<div style="margin-bottom: var(--space-4);">
		<label for="contacto-mensaje" style={labelStyle}>Mensaje</label>
		<textarea
			id="contacto-mensaje"
			name="mensaje"
			rows="4"
			style={`${inputStyle} resize: vertical;`}
			placeholder="Cuéntame sobre tu proyecto..."
		></textarea>
	</div>

	<button type="submit" class="btn btn--outline btn--cta" style="width: 100%;">
		Enviar mensaje
	</button>
</form>
