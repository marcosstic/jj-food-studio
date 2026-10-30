// Normaliza los homeSections almacenados (objetos rotos → strings limpios)
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
	readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
		.split('\n').filter((l) => l.includes('=')).map((l) => [l.split('=')[0], l.split('=')[1]])
);
const TOKEN = env.SANITY_WRITE_TOKEN;

const norm = (s) =>
	typeof s === 'string'
		? s
		: s && typeof s === 'object'
			? Object.entries(s)
					.filter(([k]) => k !== '_key' && k !== '_type')
					.sort((a, b) => Number(a[0]) - Number(b[0]))
					.map(([, v]) => v)
					.join('')
			: String(s);

const qRes = await fetch('https://tg1ohcli.apicdn.sanity.io/v1/data/query/production?query=' + encodeURIComponent('*[_id=="siteConfig"][0]{homeSections}'), {
	headers: { Authorization: `Bearer ${TOKEN}` }
});
const secciones = (await qRes.json()).result?.homeSections ?? [];

const limpias = secciones.map(norm);
const res = await fetch('https://tg1ohcli.api.sanity.io/v1/data/mutate/production', {
	method: 'POST',
	headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
	body: JSON.stringify({ mutations: [{ patch: { id: 'siteConfig', set: { homeSections: limpias } } }] })
});
const json = await res.json();
console.log(res.ok ? '✓ homeSections normalizadas: ' + JSON.stringify(limpias) : '✗ ' + JSON.stringify(json).slice(0, 250));
