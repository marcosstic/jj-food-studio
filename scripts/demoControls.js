import { setLogoMode } from "./logoModes.js";
import { setCtaStyle } from "./ctaVariants.js";

const DEMO_KEY = "jj_demo_mode";
const LOGO_KEY = "jj_logo_mode";
const CTA_KEY = "jj_cta_style";

const getParam = (name) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
};

const setDemoMode = (enabled) => {
  document.body.classList.toggle("demo-on", enabled);
  localStorage.setItem(DEMO_KEY, enabled ? "1" : "0");

  const panel = document.querySelector(".demo-panel");
  if (panel) panel.hidden = !enabled;
};

const ensureDemoUi = () => {
  let toggleBtn = document.querySelector("[data-demo-toggle]");
  let panel = document.querySelector(".demo-panel");

  const panelHtml = `
      <div class="demo-panel__title">Comparar diseño</div>
      <div class="demo-panel__hint">Tip: presiona <kbd>D</kbd> o usa <span class="mono">?demo=1</span></div>

      <div class="demo-panel__section">
        <div class="demo-panel__section-title">Logo (hero)</div>
        <div class="demo-panel__options">
          <button class="opt" type="button" data-logo-mode="css">
            <div class="opt__title">Opción 1 · CSS</div>
            <div class="opt__desc">Más rápida y estable. Look premium.</div>
          </button>
          <button class="opt" type="button" data-logo-mode="three">
            <div class="opt__title">Opción 2 · Three.js</div>
            <div class="opt__desc">Más “wow”. Carga bajo demanda.</div>
          </button>
        </div>
      </div>

      <div class="demo-panel__section">
        <div class="demo-panel__section-title">CTA</div>
        <div class="demo-panel__options">
          <button class="opt" type="button" data-cta-style="outline">
            <div class="opt__title">Opción 1 · Outline</div>
            <div class="opt__desc">Borde gradiente + fondo oscuro (editorial).</div>
          </button>
          <button class="opt" type="button" data-cta-style="solid">
            <div class="opt__title">Opción 2 · Solid</div>
            <div class="opt__desc">Botón dorado sólido (más llamativo).</div>
          </button>
        </div>
      </div>
    `;

  if (!toggleBtn) {
    const wrap = document.createElement("div");
    wrap.className = "demo-toggle";
    wrap.setAttribute("aria-label", "Demo");
    wrap.innerHTML = `<button class="demo-toggle__btn" type="button" data-demo-toggle>Demo</button>`;
    document.body.appendChild(wrap);
    toggleBtn = wrap.querySelector("[data-demo-toggle]");
  }

  if (!panel) {
    panel = document.createElement("div");
    panel.className = "demo-panel";
    panel.hidden = true;
    panel.setAttribute("aria-label", "Panel de opciones");
    panel.innerHTML = panelHtml;
    document.body.appendChild(panel);
  } else {
    panel.setAttribute("aria-label", "Panel de opciones");
    panel.innerHTML = panelHtml;
  }

  return { toggleBtn, panel };
};

const getInitialDemoMode = () => {
  const p = getParam("demo");
  if (p === "1") return true;
  const stored = localStorage.getItem(DEMO_KEY);
  return stored === "1";
};

const updateSegmentActive = () => {
  const logoMode = document.body.dataset.logoMode || "css";
  document.querySelectorAll("[data-logo-mode]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-logo-mode") === logoMode);
  });

  const cta = document.body.classList.contains("cta-solid") ? "solid" : "outline";
  document.querySelectorAll("[data-cta-style]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-cta-style") === cta);
  });
};

export const initDemoControls = () => {
  const { toggleBtn } = ensureDemoUi();

  const enabled = getInitialDemoMode();
  setDemoMode(enabled);

  const storedLogo = localStorage.getItem(LOGO_KEY);
  const storedCta = localStorage.getItem(CTA_KEY);

  document.body.dataset.logoMode = storedLogo || document.body.dataset.logoMode || "css";
  setCtaStyle(storedCta || (document.body.classList.contains("cta-solid") ? "solid" : "outline"));

  toggleBtn.addEventListener("click", () => {
    const next = !document.body.classList.contains("demo-on");
    setDemoMode(next);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() !== "d") return;
    const next = !document.body.classList.contains("demo-on");
    setDemoMode(next);
  });

  document.querySelectorAll("[data-logo-mode]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const mode = btn.getAttribute("data-logo-mode");
      await setLogoMode(mode);
      localStorage.setItem(LOGO_KEY, mode);
      updateSegmentActive();
    });
  });

  document.querySelectorAll("[data-cta-style]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const style = btn.getAttribute("data-cta-style");
      setCtaStyle(style);
      localStorage.setItem(CTA_KEY, style);
      updateSegmentActive();
    });
  });

  setLogoMode(document.body.dataset.logoMode);

  updateSegmentActive();
};
