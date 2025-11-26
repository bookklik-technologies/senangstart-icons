import iconsArray from "./icons.json";

const icons = iconsArray.reduce((acc, icon) => {
  acc[icon.slug] = icon;
  return acc;
}, {});

class SSIcon extends HTMLElement {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "icon") {
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
    const strokeWidth =
      isString || !iconData.strokeWidth ? "2" : iconData.strokeWidth;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 1em;
          height: 1em;
          fill: ${fill};
          stroke: ${stroke};
          stroke-width: ${strokeWidth};
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
      </style>
      <svg viewBox="${viewBox}">
        <path d="${svgPath}" />
      </svg>
    `;
  }
}

customElements.define("ss-icon", SSIcon);
