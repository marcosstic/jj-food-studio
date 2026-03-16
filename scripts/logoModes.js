import { initThreeLogo, destroyThreeLogo } from "./logoThreeBillboard.js";

export const setLogoMode = async (mode) => {
  const cssEl = document.querySelector("[data-logo=css]");
  const threeEl = document.querySelector("[data-logo=three]");

  document.body.dataset.logoMode = mode === "three" ? "three" : "css";

  if (mode === "three") {
    if (cssEl) cssEl.hidden = true;
    if (threeEl) threeEl.hidden = false;
    await initThreeLogo();
    return;
  }

  destroyThreeLogo();
  if (threeEl) threeEl.hidden = true;
  if (cssEl) cssEl.hidden = false;
};
