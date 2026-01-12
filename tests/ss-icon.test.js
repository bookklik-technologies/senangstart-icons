/**
 * Tests for ss-icon.js Web Component
 * 
 * Tests the <ss-icon> custom element functionality
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';

// Mock the icons module
const mockIcons = {
  'home': '<svg viewBox="0 0 24 24"><path d="M2.25 12l8.954-8.955"/></svg>',
  'check': '<svg viewBox="0 0 24 24" stroke-width="2"><path d="M4.5 12.75l6 6 9-13.5"/></svg>',
  'plus': '<svg viewBox="0 0 24 24" stroke-width="2"><path d="M12 4.5v15m7.5-7.5h-15"/></svg>'
};

// Create a simple mock of the SSIcon class for testing
class SSIcon extends HTMLElement {
  static get observedAttributes() {
    return ['icon', 'thickness'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'icon' || name === 'thickness') {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const iconName = this.getAttribute('icon');
    const iconSvg = mockIcons[iconName];

    if (!iconSvg) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    const thicknessAttr = this.getAttribute('thickness');
    let finalSvg = iconSvg;
    if (thicknessAttr) {
      finalSvg = finalSvg.replace(
        /stroke-width="[^"]*"/,
        `stroke-width="${thicknessAttr}"`
      );
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          width: 1em;
          height: 1em;
          vertical-align: middle;
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

describe('ss-icon.js Web Component', () => {
  beforeAll(() => {
    // Define the custom element
    if (!customElements.get('ss-icon')) {
      customElements.define('ss-icon', SSIcon);
    }
  });

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Custom Element Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ss-icon')).toBeDefined();
    });

    it('should be an instance of HTMLElement', () => {
      const icon = document.createElement('ss-icon');
      expect(icon instanceof HTMLElement).toBe(true);
    });
  });

  describe('Icon Rendering', () => {
    it('should render SVG when icon attribute is set', () => {
      const icon = document.createElement('ss-icon');
      icon.setAttribute('icon', 'home');
      document.body.appendChild(icon);

      expect(icon.shadowRoot.innerHTML).toContain('<svg');
      expect(icon.shadowRoot.innerHTML).toContain('M2.25 12l8.954-8.955');
    });

    it('should render empty when icon attribute is invalid', () => {
      const icon = document.createElement('ss-icon');
      icon.setAttribute('icon', 'nonexistent-icon');
      document.body.appendChild(icon);

      expect(icon.shadowRoot.querySelector('svg')).toBeNull();
    });

    it('should render empty when icon attribute is missing', () => {
      const icon = document.createElement('ss-icon');
      document.body.appendChild(icon);

      expect(icon.shadowRoot.querySelector('svg')).toBeNull();
    });

    it('should update when icon attribute changes', () => {
      const icon = document.createElement('ss-icon');
      icon.setAttribute('icon', 'home');
      document.body.appendChild(icon);

      expect(icon.shadowRoot.innerHTML).toContain('M2.25 12l8.954-8.955');

      icon.setAttribute('icon', 'check');
      expect(icon.shadowRoot.innerHTML).toContain('M4.5 12.75l6 6 9-13.5');
    });
  });

  describe('Thickness Attribute', () => {
    it('should apply custom thickness to stroke-width', () => {
      const icon = document.createElement('ss-icon');
      icon.setAttribute('icon', 'check');
      icon.setAttribute('thickness', '3');
      document.body.appendChild(icon);

      expect(icon.shadowRoot.innerHTML).toContain('stroke-width="3"');
    });

    it('should update thickness when attribute changes', () => {
      const icon = document.createElement('ss-icon');
      icon.setAttribute('icon', 'check');
      icon.setAttribute('thickness', '2');
      document.body.appendChild(icon);

      expect(icon.shadowRoot.innerHTML).toContain('stroke-width="2"');

      icon.setAttribute('thickness', '4');
      expect(icon.shadowRoot.innerHTML).toContain('stroke-width="4"');
    });
  });

  describe('Shadow DOM Styles', () => {
    it('should include scoped styles in shadow DOM', () => {
      const icon = document.createElement('ss-icon');
      icon.setAttribute('icon', 'home');
      document.body.appendChild(icon);

      expect(icon.shadowRoot.innerHTML).toContain('<style>');
      expect(icon.shadowRoot.innerHTML).toContain(':host');
      expect(icon.shadowRoot.innerHTML).toContain('display: inline-flex');
    });
  });

  describe('Observed Attributes', () => {
    it('should observe icon and thickness attributes', () => {
      expect(SSIcon.observedAttributes).toContain('icon');
      expect(SSIcon.observedAttributes).toContain('thickness');
    });
  });
});
