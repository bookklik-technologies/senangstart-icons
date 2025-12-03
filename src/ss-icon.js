import icons from "./svg/index.js";

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
    const iconSvg = icons[iconName];

    if (!iconSvg) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    const thicknessAttr = this.getAttribute("thickness");
    // If thickness is provided, we need to inject it into the SVG string
    // This is a bit hacky but works for simple SVGs
    let finalSvg = iconSvg;
    if (thicknessAttr) {
      finalSvg = finalSvg.replace(
        /stroke-width="[^"]*"/,
        `stroke-width="${thicknessAttr}"`
      );
    }

    // Render initial markup
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: inline-block;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    </style>
    ${finalSvg}
  `;
  }
}

customElements.define("ss-icon", SSIcon);
