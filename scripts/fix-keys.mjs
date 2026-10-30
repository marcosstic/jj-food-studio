// Agrega _key a los items de arrays que lo Missing keys del Studio
// (siteConfig.homeSections, homeContent.banner, category.galeria)
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
	readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
		.split('\n').filter((l) => l.includes('=')).map((l) => [l.split('=')[0], l.split('=')[1]])
);
const TOKEN = env.SANITY_WRITE_TOKEN;
if (!TOKEN) { console.error('✗ falta SANITY_WRITE_TOKEN'); process.exit(1); }

const CDN = 'https://tg1ohcli.apicdn.sanity.io/v1/data/query/production?query=';
const MUT = 'https://tg1ohcli.api.sanity.io/v1/data/mutate/production?returnIds=true';

const keyify = (arr) => (arr ?? []).map((item, i) => ({ ...item, _key: item._key ?? `k${i}${Math.random().toString(36).slice(2, 8)}` }));

const qRes = await fetch(CDN + encodeURIComponent(`{
	"siteConfig": *[_id=="siteConfig"][0]{homeSections},
	"homeContent": *[_id=="homeContent"][0]{banner},
	"categories": *[_type=="category"]{_id, galeria}
}`), { headers: { Authorization: `Bearer ${TOKEN}` } });
const data = (await qRes.json()).result ?? {};

const mutations = [];
if (data.siteConfig?.homeSections) {
	mutations.push({ patch: { id: 'siteConfig', set: { homeSections: keyify(data.siteConfig.homeSections) } } });
}
if (data.homeContent?.banner) {
	mutations.push({ patch: { id: 'homeContent', set: { banner: keyify(data.homeContent.banner) } } });
}
for (const c of data.categories ?? []) {
	if (c.galeria?.length) {
		mutations.push({ patch: { id: c._id, set: { galeria: keyify(c.galeria) } } });
	}
}

if (!mutations.length) { console.log('nada que corregir'); process.exit(0); }

const res = await fetch(MUT, {
	method: 'POST',
	headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
	body: JSON.stringify({ mutations })
});
const json = await res.json();
console.log(res.ok ? `✓ ${mutations.length} arrays con keys (${json.transactionId})` : '✗ ' + JSON.stringify(json).slice(0, 300));
