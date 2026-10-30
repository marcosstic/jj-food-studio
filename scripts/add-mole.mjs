// Agrega al bannerHome la foto "Mole Negro" que JJ subió (está en su borrador)
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
	readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
		.split('\n').filter((l) => l.includes('=')).map((l) => [l.split('=')[0], l.split('=')[1]])
);
const TOKEN = env.SANITY_WRITE_TOKEN;

const CDN = 'https://tg1ohcli.apicdn.sanity.io/v1/data/query/production?query=';
const MUT = 'https://tg1ohcli.api.sanity.io/v1/data/mutate/production';

const q = async (groq) => {
	const res = await fetch(CDN + encodeURIComponent(groq), { headers: { Authorization: `Bearer ${TOKEN}` } });
	return (await res.json()).result;
};

// 1) buscar en el borrador la pieza del Mole
const draft = await q('*[_id=="drafts.homeContent"][0]{banner[]{alt,"ref":asset._ref}}');
const mole = (draft?.banner ?? []).find((b) => (b.alt ?? '').toLowerCase().includes('mole'));
if (!mole?.ref) { console.error('✗ no encontré el Mole en el borrador'); process.exit(1); }

// 2) bannerHome actual
const actual = await q('*[_id=="bannerHome"][0]{fotos}');
const fotos = actual?.fotos ?? [];

// 3) si ya está, nada; si no, agregar
if (fotos.some((f) => f.asset?._ref === mole.ref)) {
	console.log('ya está en el banner');
	process.exit(0);
}
const nueva = { _type: 'image', asset: { _type: 'reference', _ref: mole.ref }, _key: `kmole${Math.random().toString(36).slice(2, 8)}`, alt: mole.alt };
const res = await fetch(MUT, {
	method: 'POST',
	headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
	body: JSON.stringify({ mutations: [{ patch: { id: 'bannerHome', insert: { after: 'fotos[-1]', items: [nueva] } } }] })
});
const json = await res.json();
console.log(res.ok ? '✓ Mole agregado al bannerHome' : '✗ ' + JSON.stringify(json).slice(0, 250));
