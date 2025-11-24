import { icons } from "./icons.js";

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
    const svgPath = icons[iconName];

    if (!svgPath) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 1em;
          height: 1em;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
      </style>
      <svg viewBox="0 0 24 24">
        <path d="${svgPath}" />
      </svg>
    `;
  }
}

customElements.define("ss-icon", SSIcon);
