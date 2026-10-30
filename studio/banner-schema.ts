/**
 * Documento dedicado al banner-carrusel del home (Fase 3, UX para JJ):
 * documento corto → el botón Publicar siempre está a la vista.
 */
export const bannerHomeSchema = {
	name: 'bannerHome',
	title: 'Banner del home (carrusel)',
	type: 'document',
	__experimental_actions: ['update', 'publish'],
	fields: [
		{
			name: 'fotos', title: 'Fotos del carrusel (verticales 4:5)', type: 'array',
			description: 'Arrastra para cambiar el orden — el orden del slider es este',
			of: [{
				type: 'image', options: { hotspot: true },
				fields: [{ name: 'alt', title: 'Descripción (alt)', type: 'string', validation: (R: any) => R.required() }]
			}],
			validation: (R: any) => R.required().min(2)
		}
	],
	preview: {
		select: { media: 'fotos.0' },
		prepare: ({ media }: any) => ({ title: 'Banner del carrusel', media })
	}
};
