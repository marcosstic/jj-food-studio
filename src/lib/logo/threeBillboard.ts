/**
 * Logo 3D con Three.js (port de logoThreeBillboard.js).
 * Carga Three.js bajo demanda desde CDN y destruye por completo
 * la escena al cambiar de modo (memory management, DESIGN_SYSTEM.md §10).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyThree = any;

interface ThreeLogoState {
	renderer: AnyThree;
	scene: AnyThree;
	camera: AnyThree;
	mesh: AnyThree;
	texture: AnyThree;
	glowPlane: AnyThree | null;
	glowTexture: AnyThree | null;
	dust: AnyThree | null;
	dustTexture: AnyThree | null;
	variant: 'three' | 'cinematic';
	onResize: () => void;
	onPointerMove: (e: PointerEvent) => void;
	onPointerLeave: () => void;
	wrap: HTMLElement;
}

let state: ThreeLogoState | null = null;
let isDestroyed = false;
let animationFrameId: number | null = null;

const THREE_CDN_URL = 'https://unpkg.com/three@0.160.0/build/three.module.js';
const LOGO_TEXTURE_URL = '/JJ-logo-dorado.png';

const createDustTexture = () => {
	const c = document.createElement('canvas');
	c.width = 64;
	c.height = 64;
	const ctx = c.getContext('2d');
	if (!ctx) return c;

	const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
	g.addColorStop(0, 'rgba(255,255,255,0.90)');
	g.addColorStop(0.35, 'rgba(255,255,255,0.25)');
	g.addColorStop(1, 'rgba(255,255,255,0.00)');
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 64, 64);
	return c;
};

export const initThreeLogo = async ({ variant }: { variant?: string } = {}): Promise<void> => {
	const wanted = variant === 'cinematic' ? 'cinematic' : 'three';

	// Siempre destruir la instancia previa para evitar doble inicialización
	if (state) {
		destroyThreeLogo();
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	isDestroyed = false;

	const wrap = document.querySelector<HTMLElement>('[data-logo=three]');
	const canvas = document.querySelector<HTMLCanvasElement>('.logo-canvas');
	const fallback = document.querySelector<HTMLElement>('.logo-three__fallback');

	if (!wrap || !canvas) return;

	try {
		if (fallback) fallback.textContent = 'Cargando modo 3D…';

		// Import dinámico desde CDN (externo para el bundler → @vite-ignore)
		const THREE: AnyThree = await import(/* @vite-ignore */ THREE_CDN_URL);

		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

		const scene = new THREE.Scene();
		if (wanted === 'cinematic') {
			scene.fog = new THREE.Fog(0x070708, 4.5, 12);
		}

		const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
		camera.position.set(0, 0, wanted === 'cinematic' ? 6.2 : 6);

		const texture = await new THREE.TextureLoader().loadAsync(LOGO_TEXTURE_URL);
		texture.colorSpace = THREE.SRGBColorSpace;

		const material = new THREE.MeshStandardMaterial({
			map: texture,
			transparent: true,
			roughness: wanted === 'cinematic' ? 0.28 : 0.35,
			metalness: wanted === 'cinematic' ? 0.72 : 0.65,
			emissive: wanted === 'cinematic' ? new THREE.Color(0x2a1c08) : new THREE.Color(0x000000),
			emissiveIntensity: wanted === 'cinematic' ? 0.35 : 0.0,
			side: THREE.DoubleSide // Importante: visible por ambos lados
		});

		const geometry = new THREE.PlaneGeometry(3.2, 3.2); // Reducido 15% total (era 3.8, ahora 3.2)
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		let glowPlane: AnyThree = null;
		let glowTexture: AnyThree = null;
		if (wanted === 'cinematic') {
			const gc = document.createElement('canvas');
			gc.width = 256;
			gc.height = 256;
			const gctx = gc.getContext('2d');
			if (gctx) {
				const grd = gctx.createRadialGradient(128, 128, 0, 128, 128, 128);
				grd.addColorStop(0, 'rgba(233,215,154,0.55)');
				grd.addColorStop(0.25, 'rgba(212,172,106,0.25)');
				grd.addColorStop(1, 'rgba(0,0,0,0)');
				gctx.fillStyle = grd;
				gctx.fillRect(0, 0, 256, 256);
			}
			glowTexture = new THREE.CanvasTexture(gc);
			glowTexture.colorSpace = THREE.SRGBColorSpace;
			const glowMat = new THREE.MeshBasicMaterial({
				map: glowTexture,
				transparent: true,
				opacity: 0.55,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});
			glowPlane = new THREE.Mesh(new THREE.PlaneGeometry(5.3, 5.3), glowMat); // Reducido 15% (era 6.2)
			glowPlane.position.z = -0.6;
			scene.add(glowPlane);
		}

		const ambient = new THREE.AmbientLight(0xffffff, wanted === 'cinematic' ? 0.38 : 0.55);
		scene.add(ambient);

		const key = new THREE.DirectionalLight(0xffffff, wanted === 'cinematic' ? 1.35 : 1.1);
		key.position.set(-2.6, 2.4, 4.2);
		scene.add(key);

		const rim = new THREE.DirectionalLight(0xfff2d0, wanted === 'cinematic' ? 0.95 : 0.55);
		rim.position.set(3.8, -2.0, 3.6);
		scene.add(rim);

		const warm = new THREE.DirectionalLight(0xffd9a6, wanted === 'cinematic' ? 0.55 : 0.0);
		warm.position.set(-3.5, -1.5, 2.5);
		scene.add(warm);

		let dust: AnyThree = null;
		let dustTexture: AnyThree = null;
		if (wanted === 'cinematic') {
			const count = 700;
			const positions = new Float32Array(count * 3);
			for (let i = 0; i < count; i++) {
				const idx = i * 3;
				positions[idx + 0] = (Math.random() - 0.5) * 10;
				positions[idx + 1] = (Math.random() - 0.5) * 6;
				positions[idx + 2] = -Math.random() * 6;
			}
			const g = new THREE.BufferGeometry();
			g.setAttribute('position', new THREE.BufferAttribute(positions, 3));

			dustTexture = new THREE.CanvasTexture(createDustTexture());
			dustTexture.colorSpace = THREE.SRGBColorSpace;

			const m = new THREE.PointsMaterial({
				size: 0.05,
				map: dustTexture,
				transparent: true,
				opacity: 0.55,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
				color: 0xfff2d0
			});
			dust = new THREE.Points(g, m);
			dust.position.z = 0.8;
			scene.add(dust);
		}

		const resize = () => {
			const rect = wrap.getBoundingClientRect();
			const w = Math.max(420, Math.floor(rect.width));
			const h = Math.max(420, Math.floor(rect.height));
			renderer.setSize(w, h, false);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		};

		resize();

		let resizeTimeout: ReturnType<typeof setTimeout>;
		const onResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(resize, 100); // Espera 100ms tras el último resize
		};
		window.addEventListener('resize', onResize);

		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
		const onPointerMove = (e: PointerEvent) => {
			if (prefersReduced) return;
			const rect = wrap.getBoundingClientRect();
			const nx = (e.clientX - rect.left) / rect.width;
			const ny = (e.clientY - rect.top) / rect.height;
			pointer.tx = (nx - 0.5) * 2;
			pointer.ty = (0.5 - ny) * 2;
		};
		const onPointerLeave = () => {
			pointer.tx = 0;
			pointer.ty = 0;
		};
		wrap.addEventListener('pointermove', onPointerMove);
		wrap.addEventListener('pointerleave', onPointerLeave);

		const tick = () => {
			if (isDestroyed) return;

			const t = performance.now() * 0.001;
			pointer.x += (pointer.tx - pointer.x) * 0.06;
			pointer.y += (pointer.ty - pointer.y) * 0.06;

			// Rotación principal en Y (giro completo 360°)
			const baseSpin = wanted === 'cinematic' ? 0.0096 : 0.0077; // Reducido 40% total (era 0.015/0.012)
			mesh.rotation.y += baseSpin;

			// Rotaciones sutiles para efecto 3D sin interferir el giro principal
			const tiltX = pointer.y * (wanted === 'cinematic' ? 0.15 : 0.12);
			const tiltY = pointer.x * (wanted === 'cinematic' ? 0.2 : 0.15);

			// Oscilación sutil en X para dar vida
			mesh.rotation.x = Math.sin(t * (wanted === 'cinematic' ? 0.5 : 0.4)) * 0.05 + tiltX;
			mesh.rotation.z = tiltY * 0.1;

			if (wanted === 'cinematic') {
				camera.position.x = Math.sin(t * 0.22) * 0.16;
				camera.position.y = Math.cos(t * 0.18) * 0.1;
				camera.lookAt(0, 0, 0);

				key.position.x = -2.6 + Math.sin(t * 0.6) * 0.25;
				rim.position.y = -2.0 + Math.cos(t * 0.55) * 0.22;

				if (dust) {
					dust.rotation.y = Math.sin(t * 0.08) * 0.15;
					dust.position.x = Math.sin(t * 0.12) * 0.1;
				}

				if (glowPlane) {
					glowPlane.material.opacity = 0.4 + Math.sin(t * 0.8) * 0.08;
				}
			}

			renderer.render(scene, camera);
			animationFrameId = requestAnimationFrame(tick);
		};

		if (fallback) fallback.hidden = true;
		animationFrameId = requestAnimationFrame(tick);

		state = {
			renderer,
			scene,
			camera,
			mesh,
			texture,
			glowPlane,
			glowTexture,
			dust,
			dustTexture,
			variant: wanted,
			onResize,
			onPointerMove,
			onPointerLeave,
			wrap
		};
	} catch (e) {
		console.error('Error initializing Three.js:', e);
		if (fallback) fallback.textContent = 'No se pudo cargar el modo 3D.';
	}
};

export const destroyThreeLogo = (): void => {
	if (!state) return;

	isDestroyed = true;

	if (animationFrameId) {
		cancelAnimationFrame(animationFrameId);
		animationFrameId = null;
	}

	window.removeEventListener('resize', state.onResize);

	try {
		state.wrap?.removeEventListener('pointermove', state.onPointerMove);
		state.wrap?.removeEventListener('pointerleave', state.onPointerLeave);
	} catch {
		/* noop */
	}

	try {
		// Limpieza completa de la escena para liberar memoria
		if (state.scene) {
			state.scene.traverse((object: AnyThree) => {
				if (object.geometry) object.geometry.dispose();
				if (object.material) {
					if (Array.isArray(object.material)) {
						object.material.forEach((m: AnyThree) => m.dispose());
					} else {
						object.material.dispose();
					}
				}
			});
		}

		state.texture.dispose();
		if (state.glowPlane) {
			state.glowPlane.geometry.dispose();
			state.glowPlane.material.dispose();
		}
		if (state.glowTexture) {
			state.glowTexture.dispose();
		}
		if (state.dust) {
			state.dust.geometry.dispose();
			state.dust.material.dispose();
		}
		if (state.dustTexture) {
			state.dustTexture.dispose();
		}
		state.renderer.dispose();
		// Sin forceContextLoss() para evitar problemas de pérdida de contexto
	} catch {
		/* noop */
	}

	const fallback = document.querySelector<HTMLElement>('.logo-three__fallback');
	if (fallback) fallback.hidden = false;

	state = null;
};
