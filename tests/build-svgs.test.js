/**
 * Tests for build-svgs.js
 * 
 * Tests SVG file generation from icons.json
 */
import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const iconsPath = path.resolve(__dirname, '../src/icons.json');
const svgDir = path.resolve(__dirname, '../src/svg');

describe('build-svgs.js', () => {
  let icons;

  beforeAll(() => {
    icons = JSON.parse(fs.readFileSync(iconsPath, 'utf8'));
  });

  describe('icons.json validation', () => {
    it('should be valid JSON array', () => {
      expect(Array.isArray(icons)).toBe(true);
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should have required fields for each icon', () => {
      icons.forEach((icon, index) => {
        expect(icon).toHaveProperty('name', expect.any(String));
        expect(icon).toHaveProperty('slug', expect.any(String));
        expect(icon).toHaveProperty('src', expect.any(String));
        expect(icon).toHaveProperty('tags', expect.any(Array));
      });
    });

    it('should have unique slugs', () => {
      const slugs = icons.map(icon => icon.slug);
      const uniqueSlugs = [...new Set(slugs)];
      expect(slugs.length).toBe(uniqueSlugs.length);
    });

    it('should have valid SVG path data in src', () => {
      icons.forEach(icon => {
        // SVG path should start with a valid command (M, m, L, l, etc.)
        expect(icon.src).toMatch(/^[MmLlHhVvCcSsQqTtAaZz0-9\s.,\-]+$/);
      });
    });

    it('should have non-empty tags array', () => {
      icons.forEach(icon => {
        expect(icon.tags.length).toBeGreaterThan(0);
      });
    });
  });

  describe('SVG file generation', () => {
    it('should have generated SVG files for all icons', () => {
      icons.forEach(icon => {
        const svgPath = path.join(svgDir, `${icon.slug}.svg`);
        expect(fs.existsSync(svgPath)).toBe(true);
      });
    });

    it('should generate valid SVG content', () => {
      const sampleIcon = icons[0];
      const svgPath = path.join(svgDir, `${sampleIcon.slug}.svg`);
      const svgContent = fs.readFileSync(svgPath, 'utf8');

      expect(svgContent).toContain('<svg');
      expect(svgContent).toContain('viewBox=');
      expect(svgContent).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svgContent).toContain('<path');
      expect(svgContent).toContain(sampleIcon.src);
    });

    it('should apply default SVG attributes', () => {
      const svgPath = path.join(svgDir, `${icons[0].slug}.svg`);
      const svgContent = fs.readFileSync(svgPath, 'utf8');

      // Default values from build-svgs.js
      expect(svgContent).toContain('viewBox="0 0 24 24"');
      expect(svgContent).toContain('fill="none"');
      expect(svgContent).toContain('stroke="currentColor"');
      expect(svgContent).toContain('stroke-width="2"');
    });
  });

  describe('index.js generation', () => {
    it('should have generated src/svg/index.js', () => {
      const indexPath = path.join(svgDir, 'index.js');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should export all icons', () => {
      const indexPath = path.join(svgDir, 'index.js');
      const indexContent = fs.readFileSync(indexPath, 'utf8');

      icons.forEach(icon => {
        expect(indexContent).toContain(`"${icon.slug}"`);
      });
    });
  });
});
