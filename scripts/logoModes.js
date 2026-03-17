import { initThreeLogo, destroyThreeLogo } from "./logoThreeBillboard.js";

export const setLogoMode = async (mode) => {
  const cssEl = document.querySelector("[data-logo=css]");
  const threeEl = document.querySelector("[data-logo=three]");

  const normalized = mode === "three" || mode === "cinematic" || mode === "glow" ? mode : "css";
  document.body.dataset.logoMode = normalized;
  document.body.classList.toggle("logo-glow", normalized === "glow");

  if (normalized === "three" || normalized === "cinematic") {
    if (cssEl) cssEl.hidden = true;
    if (threeEl) threeEl.hidden = false;
    await initThreeLogo({ variant: normalized });
    return;
  }

  destroyThreeLogo();
  if (threeEl) threeEl.hidden = true;
  if (cssEl) cssEl.hidden = false;
};
