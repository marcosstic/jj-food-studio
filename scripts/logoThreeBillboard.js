let state = null;

export const initThreeLogo = async () => {
  if (state) return;

  const wrap = document.querySelector("[data-logo=three]");
  const canvas = document.querySelector(".logo-canvas");
  const fallback = document.querySelector(".logo-three__fallback");

  if (!wrap || !canvas) return;

  try {
    if (fallback) fallback.textContent = "Cargando modo 3D…";

    const THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const texture = await new THREE.TextureLoader().loadAsync("./JJ-logo-dorado.png");
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.35,
      metalness: 0.65,
    });

    const geometry = new THREE.PlaneGeometry(3.8, 3.8);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(-2.5, 2.5, 4);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xfff2d0, 0.55);
    rim.position.set(3.5, -2.0, 3.5);
    scene.add(rim);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    let raf = 0;
    const tick = () => {
      mesh.rotation.y += 0.0025;
      mesh.rotation.x = Math.sin(performance.now() * 0.0006) * 0.08;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    if (fallback) fallback.hidden = true;

    raf = requestAnimationFrame(tick);

    state = {
      THREE,
      renderer,
      scene,
      camera,
      mesh,
      geometry,
      material,
      texture,
      raf,
      onResize,
    };
  } catch (e) {
    if (fallback) fallback.textContent = "No se pudo cargar el modo 3D.";
  }
};

export const destroyThreeLogo = () => {
  if (!state) return;

  cancelAnimationFrame(state.raf);
  window.removeEventListener("resize", state.onResize);

  try {
    state.geometry.dispose();
    state.material.dispose();
    state.texture.dispose();
    state.renderer.dispose();
  } catch {
  }

  const fallback = document.querySelector(".logo-three__fallback");
  if (fallback) fallback.hidden = false;

  state = null;
};
