import iconsArray from "./icons.json";

const icons = iconsArray.reduce((acc, icon) => {
  acc[icon.slug] = icon;
  return acc;
}, {});

function replaceIcons() {
  const elements = document.querySelectorAll("i.ss");
  elements.forEach((el) => {
    if (el.dataset.ssLoaded) return;

    const classes = Array.from(el.classList);
    const iconClass = classes.find(
      (c) => (c.startsWith("ss-") || c.startsWith("sw-")) && c !== "ss"
    );

    if (iconClass) {
      const iconName = iconClass.startsWith("sw-")
        ? iconClass
        : iconClass.replace("ss-", "");
      const iconData = icons[iconName];

      if (iconData) {
        const isString = typeof iconData === "string";
        const svgPath = isString ? iconData : iconData.src;
        const viewBox =
          isString || !iconData.viewBox ? "0 0 24 24" : iconData.viewBox;
        const fill = isString || !iconData.fill ? "none" : iconData.fill;
        const stroke =
          isString || !iconData.stroke ? "currentColor" : iconData.stroke;
        const strokeWidth =
          isString || !iconData.strokeWidth ? "2" : iconData.strokeWidth;

        el.innerHTML = `
          <svg viewBox="${viewBox}" width="100%" height="100%" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
            <g><path d="${svgPath}" /></g>
          </svg>
        `;
        el.dataset.ssLoaded = "true";
      }
    }
  });
}

// Initial replacement
document.addEventListener("DOMContentLoaded", replaceIcons);

// Observe for new icons
const observer = new MutationObserver((mutations) => {
  let shouldUpdate = false;
  mutations.forEach((mutation) => {
    if (
      mutation.addedNodes.length ||
      (mutation.type === "attributes" && mutation.attributeName === "class")
    ) {
      shouldUpdate = true;
    }
  });

  if (shouldUpdate) {
    replaceIcons();
  }
});

// Start observing only after DOM is ready
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
  });
}
