// Crea el documento bannerHome publicado (migración única, Fase 3).
// Referencia los assets YA existentes en Sanity (no sube nada nuevo).
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
	readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
		.split('\n').filter((l) => l.includes('=')).map((l) => [l.split('=')[0], l.split('=')[1]])
);
const TOKEN = env.SANITY_WRITE_TOKEN;
if (!TOKEN) { console.error('✗ falta SANITY_WRITE_TOKEN'); process.exit(1); }

// listar assets en orden de creación (los 6 primeros = fotos del banner)
const listRes = await fetch('https://tg1ohcli.apicdn.sanity.io/v1/data/query/production?query=' + encodeURIComponent('*[_type=="sanity.imageAsset"] | order(_createdAt asc) [0...6] {_id}'), {
	headers: { Authorization: `Bearer ${TOKEN}` }
});
const ids = ((await listRes.json()).result ?? []).map((a) => a._id);
if (ids.length < 6) { console.error('✗ assets insuficientes: ' + ids.length); process.exit(1); }

const alts = [
	'Fotografía gastronómica de restaurante',
	'Plato con textura y vapor',
	'Ambiente gastronómico',
	'Fotografía para marca de alimentos',
	'Creación de pastelería',
	'Detalle macro de pastelería'
];

const fotos = ids.map((id, i) => ({
	_type: 'image',
	asset: { _type: 'reference', _ref: id },
	_key: `k${i}`,
	alt: alts[i]
}));

const doc = { _id: 'bannerHome', _type: 'bannerHome', fotos };

const res = await fetch('https://tg1ohcli.api.sanity.io/v1/data/mutate/production?returnIds=true', {
	method: 'POST',
	headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
	body: JSON.stringify({ mutations: [{ createOrReplace: doc }] })
});
const json = await res.json();
console.log(res.ok ? '✓ bannerHome creado con ' + fotos.length + ' fotos' : '✗ ' + JSON.stringify(json).slice(0, 300));
