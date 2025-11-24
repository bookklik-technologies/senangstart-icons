import { icons } from "./icons.js";

function replaceIcons() {
  const elements = document.querySelectorAll("i.ss");
  elements.forEach((el) => {
    if (el.dataset.ssLoaded) return;

    const classes = Array.from(el.classList);
    const iconClass = classes.find((c) => c.startsWith("ss-") && c !== "ss");

    if (iconClass) {
      const iconName = iconClass.replace("ss-", "");
      const svgPath = icons[iconName];

      if (svgPath) {
        el.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="${svgPath}" />
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

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"],
});
