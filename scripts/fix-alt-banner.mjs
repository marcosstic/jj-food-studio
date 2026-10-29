// Parche 2: alt de portadas + banner del home (reutiliza los mismos assets)
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
	readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
		.split('\n').filter((l) => l.includes('=')).map((l) => [l.split('=')[0], l.split('=')[1]])
);
const TOKEN = env.SANITY_WRITE_TOKEN;
if (!TOKEN) { console.error('✗ falta SANITY_WRITE_TOKEN'); process.exit(1); }

const imgRef = (assetId, alt) => ({ _type: 'image', asset: { _type: 'reference', _ref: assetId }, alt });

const listRes = await fetch('https://tg1ohcli.apicdn.sanity.io/v1/data/query/production?query=' + encodeURIComponent('*[_type=="sanity.imageAsset"] | order(_createdAt asc) {_id}'), {
	headers: { Authorization: `Bearer ${TOKEN}` }
});
const ids = ((await listRes.json()).result ?? []).map((a) => a._id);
if (ids.length < 7) { console.error('✗ assets insuficientes'); process.exit(1); }

const mutations = [
	{
		patch: {
			id: 'category-restaurantes',
			set: { 'cover.alt': 'Fotografía de restaurante — JJ Food Studio' }
		}
	},
	{
		patch: {
			id: 'category-marcas-personales',
			set: { 'cover.alt': 'Fotografía para marca gastronómica — JJ Food Studio' }
		}
	},
	{
		patch: {
			id: 'category-pastelerias',
			set: { 'cover.alt': 'Fotografía de pastelería — JJ Food Studio' }
		}
	},
	{
		patch: {
			id: 'homeContent',
			set: {
				banner: [
					imgRef(ids[0], 'Fotografía gastronómica de restaurante'),
					imgRef(ids[1], 'Plato con textura y vapor'),
					imgRef(ids[2], 'Ambiente gastronómico'),
					imgRef(ids[3], 'Fotografía para marca de alimentos'),
					imgRef(ids[4], 'Creación de pastelería'),
					imgRef(ids[5], 'Detalle macro de pastelería')
				]
			}
		}
	}
];

const res = await fetch('https://tg1ohcli.api.sanity.io/v1/data/mutate/production?returnIds=true', {
	method: 'POST',
	headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
	body: JSON.stringify({ mutations })
});
const json = await res.json();
console.log(res.ok ? '✓ alt de portadas + banner del home aplicados' : '✗ ' + JSON.stringify(json).slice(0, 300));
