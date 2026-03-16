export const setCtaStyle = (style) => {
  document.body.classList.toggle("cta-solid", style === "solid");
  document.body.classList.toggle("cta-outline", style !== "solid");
};

export const applyCtaStyleFromBody = () => {
  if (document.body.classList.contains("cta-solid")) setCtaStyle("solid");
  else setCtaStyle("outline");
};
