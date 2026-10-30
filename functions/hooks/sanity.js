// Relé Sanity → GitHub Actions (Fase 3): cuando JJ publica contenido en el
// CMS, el webhook de Sanity hace POST aquí y este relay dispara el deploy.
// Sanity envía su propio JSON; GitHub /dispatches exige {"event_type":...},
// así que la función traduce. Protegida con clave en la URL (?k=...).
// Los secretos GH_TOKEN y HOOK_KEY viven como variables del proyecto Pages.
export async function onRequestPost(context) {
	const { request, env } = context;
	const url = new URL(request.url);
	if (url.searchParams.get('k') !== env.HOOK_KEY) {
		return new Response('forbidden', { status: 403 });
	}
	try {
		const r = await fetch('https://api.github.com/repos/marcosstic/jj-food-studio/dispatches', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + env.GH_TOKEN,
				Accept: 'application/vnd.github+json',
				'User-Agent': 'sanity-relay-jj',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ event_type: 'sanity' })
		});
		// Se responde 200 con el estado aguas arriba: los 204/205 no admiten body
		// y a Sanity solo le importa que el relé procesó el aviso.
		return new Response(JSON.stringify({ dispatched: r.status }), {
			status: 200,
			headers: { 'content-type': 'application/json' }
		});
	} catch (e) {
		return new Response(JSON.stringify({ error: String(e && e.message ? e.message : e) }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}
}

export async function onRequestGet() {
	return new Response('method not allowed', { status: 405 });
}
