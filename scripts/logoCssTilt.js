const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export const initLogoCssTilt = () => {
  const stage = document.querySelector(".logo-css");
  if (!stage) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let raf = 0;

  const onMove = (e) => {
    if (!document.body || document.body.dataset.logoMode !== "css") return;

    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rx = clamp((0.5 - y) * 10, -10, 10);
    const ry = clamp((x - 0.5) * 12, -12, 12);

    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      stage.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  };

  const reset = () => {
    stage.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  stage.addEventListener("mousemove", onMove);
  stage.addEventListener("mouseleave", reset);

  reset();
};
