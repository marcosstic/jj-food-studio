import { initDemoControls } from "./demoControls.js";
import { initLogoCssTilt } from "./logoCssTilt.js";
import { applyCtaStyleFromBody } from "./ctaVariants.js";
import { hideNetlifyBadge } from "./hideNetlifyBadge.js";

const ensureBodyDefaults = () => {
  if (!document.body.classList.contains("cta-outline") && !document.body.classList.contains("cta-solid")) {
    document.body.classList.add("cta-outline");
  }
};

ensureBodyDefaults();
initDemoControls();
applyCtaStyleFromBody();
initLogoCssTilt();
hideNetlifyBadge();
