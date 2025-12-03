import icons from "./svg/index.js";

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
      const iconSvg = icons[iconName];

      if (iconSvg) {
        el.innerHTML = iconSvg;
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
