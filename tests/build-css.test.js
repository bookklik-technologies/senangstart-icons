/**
 * Tests for build-css.js
 * 
 * Tests CSS generation with SVG data URIs
 */
import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const iconsPath = path.resolve(__dirname, '../src/icons.json');
const cssPath = path.resolve(__dirname, '../src/icons.css');

// Recreate the encodeSvg function from build-css.js for testing
function encodeSvg(svg) {
  return svg
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/\s+/g, " ")
    .trim();
}

// Recreate generateSvg function from build-css.js
function generateSvg(icon) {
  const { src, viewBox, fill, stroke, strokeWidth } = icon;
  const vBox = viewBox || "0 0 24 24";
  const fl = fill || "none";
  const strk = stroke || "currentColor";
  const strkWidth = strokeWidth || "2";

  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${vBox}' fill='${fl}' stroke='${strk}' stroke-width='${strkWidth}' stroke-linecap='round' stroke-linejoin='round'><path d='${src}'/></svg>`;
}

describe('build-css.js', () => {
  let icons;
  let cssContent;

  beforeAll(() => {
    icons = JSON.parse(fs.readFileSync(iconsPath, 'utf8'));
    cssContent = fs.readFileSync(cssPath, 'utf8');
  });

  describe('encodeSvg function', () => {
    it('should replace double quotes with single quotes', () => {
      const result = encodeSvg('<svg viewBox="0 0 24 24">');
      expect(result).not.toContain('"');
      expect(result).toContain("'");
    });

    it('should URL-encode special characters', () => {
      const result = encodeSvg('<svg>#test</svg>');
      expect(result).toContain('%3C'); // <
      expect(result).toContain('%3E'); // >
      expect(result).toContain('%23'); // #
    });

    it('should collapse whitespace', () => {
      const result = encodeSvg('<svg>  test   test  </svg>');
      expect(result).not.toContain('  '); // no double spaces
    });
  });

  describe('generateSvg function', () => {
    it('should generate valid SVG string', () => {
      const icon = { src: 'M12 4.5v15m7.5-7.5h-15', name: 'test' };
      const svg = generateSvg(icon);

      expect(svg).toContain("<svg");
      expect(svg).toContain("xmlns='http://www.w3.org/2000/svg'");
      expect(svg).toContain("<path d='M12 4.5v15m7.5-7.5h-15'");
    });

    it('should apply default values', () => {
      const icon = { src: 'M0 0', name: 'test' };
      const svg = generateSvg(icon);

      expect(svg).toContain("viewBox='0 0 24 24'");
      expect(svg).toContain("fill='none'");
      expect(svg).toContain("stroke='currentColor'");
      expect(svg).toContain("stroke-width='2'");
    });

    it('should use custom values when provided', () => {
      const icon = {
        src: 'M0 0',
        name: 'test',
        viewBox: '0 0 48 48',
        fill: 'red',
        stroke: 'blue',
        strokeWidth: '4'
      };
      const svg = generateSvg(icon);

      expect(svg).toContain("viewBox='0 0 48 48'");
      expect(svg).toContain("fill='red'");
      expect(svg).toContain("stroke='blue'");
      expect(svg).toContain("stroke-width='4'");
    });
  });

  describe('CSS file generation', () => {
    it('should contain base .ss class', () => {
      expect(cssContent).toContain('.ss {');
      expect(cssContent).toContain('display: inline-block;');
      expect(cssContent).toContain('width: 1em;');
      expect(cssContent).toContain('height: 1em;');
    });

    it('should contain mask properties in base class', () => {
      expect(cssContent).toContain('mask-size: contain;');
      expect(cssContent).toContain('mask-repeat: no-repeat;');
      expect(cssContent).toContain('mask-position: center;');
    });

    it('should generate class for each icon', () => {
      icons.forEach(icon => {
        expect(cssContent).toContain(`.ss-${icon.slug}`);
      });
    });

    it('should use data URI for mask-image', () => {
      expect(cssContent).toContain('mask-image: url("data:image/svg+xml,');
    });

    it('should have proper header comment', () => {
      expect(cssContent).toContain('Senangstart Icons - CSS Only');
      expect(cssContent).toContain('Auto-generated');
    });
  });
});
