// Parchea las referencias de imagen de las 3 categorías + retrato de JJ
// hacia los assets que ya existen en Sanity (subidos por el seed).
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
	readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
		.split('\n').filter((l) => l.includes('=')).map((l) => [l.split('=')[0], l.split('=')[1]])
);
const TOKEN = env.SANITY_WRITE_TOKEN;
if (!TOKEN) { console.error('✗ falta SANITY_WRITE_TOKEN'); process.exit(1); }

const ref = (assetId) => ({ _type: 'image', asset: { _type: 'reference', _ref: assetId } });

// 1) listar assets en orden de creación
const listRes = await fetch('https://tg1ohcli.apicdn.sanity.io/v1/data/query/production?query=' + encodeURIComponent('*[_type=="sanity.imageAsset"] | order(_createdAt asc) {_id, originalFilename}'), {
	headers: { Authorization: `Bearer ${TOKEN}` }
});
const assets = (await listRes.json()).result ?? [];
const log = ['assets: ' + assets.map((a) => a._id.slice(6, 20)).join(', ')];
if (assets.length < 7) { console.error(log.join('\n')); console.error('✗ se esperaban 7 assets'); process.exit(1); }

const [A0, A1, A2, A3, A4, A5, A6] = assets.map((a) => a._id);

// 2) parchear documentos
const mutations = [
	{
		patch: {
			id: 'category-restaurantes',
			set: {
				cover: ref(A0),
				'galeria[0].imagen': ref(A0),
				'galeria[1].imagen': ref(A1),
				'galeria[2].imagen': ref(A2)
			}
		}
	},
	{
		patch: {
			id: 'category-marcas-personales',
			set: {
				cover: ref(A3),
				'galeria[0].imagen': ref(A3),
				'galeria[1].imagen': ref(A2),
				'galeria[2].imagen': ref(A0)
			}
		}
	},
	{
		patch: {
			id: 'category-pastelerias',
			set: {
				cover: ref(A4),
				'galeria[0].imagen': ref(A4),
				'galeria[1].imagen': ref(A5),
				'galeria[2].imagen': ref(A3)
			}
		}
	},
	{ patch: { id: 'homeContent', set: { retratoJJ: ref(A6) } } }
];

const res = await fetch('https://tg1ohcli.api.sanity.io/v1/data/mutate/production?returnIds=true', {
	method: 'POST',
	headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
	body: JSON.stringify({ mutations })
});
const json = await res.json();
log.push(res.ok ? '✓ referencias parcheadas: ' + JSON.stringify(json.transactionIds) : '✗ ' + JSON.stringify(json).slice(0, 300));
console.log(log.join('\n'));
