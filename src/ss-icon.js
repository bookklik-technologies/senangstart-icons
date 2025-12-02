import iconsArray from "./icons.json";

const icons = iconsArray.reduce((acc, icon) => {
  acc[icon.slug] = icon;
  return acc;
}, {});

class SSIcon extends HTMLElement {
  static get observedAttributes() {
    return ["icon", "thickness"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "icon" || name === "thickness") {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const iconName = this.getAttribute("icon");
    const iconData = icons[iconName];

    if (!iconData) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    const isString = typeof iconData === "string";
    const svgPath = isString ? iconData : iconData.src;
    const viewBox =
      isString || !iconData.viewBox ? "0 0 24 24" : iconData.viewBox;
    const fill = isString || !iconData.fill ? "none" : iconData.fill;
    const stroke =
      isString || !iconData.stroke ? "currentColor" : iconData.stroke;

    const thicknessAttr = this.getAttribute("thickness");
    const strokeWidth = thicknessAttr
      ? thicknessAttr
      : isString || !iconData.strokeWidth
      ? "2.25"
      : iconData.strokeWidth;

    // Render initial markup
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: inline-block;
        fill: ${fill};
        stroke: ${stroke};
        stroke-width: ${strokeWidth};
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    </style>
    <svg viewBox="${viewBox}">
      <g>
        <path d="${svgPath}" />
      </g>
    </svg>
  `;
  }
}

customElements.define("ss-icon", SSIcon);
