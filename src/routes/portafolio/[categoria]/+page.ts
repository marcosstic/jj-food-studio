import { error } from '@sveltejs/kit';
import { findCategory } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const category = findCategory(params.categoria);
	if (!category) error(404, 'Categoría no encontrada');
	return { category };
};
