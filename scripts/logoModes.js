import { initThreeLogo, destroyThreeLogo } from "./logoThreeBillboard.js";

let currentActiveVariant = null;

export const setLogoMode = async (mode) => {
  console.log("setLogoMode called with mode:", mode);
  
  // Don't re-init if already in this mode
  if (mode === currentActiveVariant) {
    console.log("Already in mode:", mode, "skipping");
    return;
  }
  
  currentActiveVariant = mode;
  
  const cssEl = document.querySelector("[data-logo=css]");
  const threeEl = document.querySelector("[data-logo=three]");
  
  console.log("Elements found - cssEl:", !!cssEl, "threeEl:", !!threeEl);
  console.log("Current visibility - cssEl.hidden:", cssEl?.hidden, "threeEl.hidden:", threeEl?.hidden);

  const normalized = mode === "three" || mode === "cinematic" || mode === "glow" ? mode : "css";
  console.log("Normalized mode:", normalized);
  document.body.dataset.logoMode = normalized;
  document.body.classList.toggle("logo-glow", normalized === "glow");

  if (normalized === "three" || normalized === "cinematic") {
    console.log("Setting up Three.js mode");
    if (cssEl) {
      cssEl.hidden = true;
      console.log("CSS element hidden");
    }
    if (threeEl) {
      threeEl.hidden = false;
      console.log("Three element shown");
    }
    await initThreeLogo({ variant: normalized });
    return;
  }

  console.log("Setting up CSS/Glow mode");
  destroyThreeLogo();
  if (threeEl) {
    threeEl.hidden = true;
    console.log("Three element hidden");
  }
  if (cssEl) {
    cssEl.hidden = false;
    console.log("CSS element shown");
  }
};
