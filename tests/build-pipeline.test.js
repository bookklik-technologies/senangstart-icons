/**
 * Integration tests for the build pipeline
 * 
 * Tests the complete build output and cross-component consistency
 */
import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');
const svgDir = path.join(srcDir, 'svg');
const distDir = path.join(projectRoot, 'dist');
const docsDir = path.join(projectRoot, 'docs');

describe('Build Pipeline Integration', () => {
  let icons;

  beforeAll(() => {
    const iconsPath = path.join(srcDir, 'icons.json');
    icons = JSON.parse(fs.readFileSync(iconsPath, 'utf8'));
  });

  describe('Source files', () => {
    it('should have icons.json', () => {
      expect(fs.existsSync(path.join(srcDir, 'icons.json'))).toBe(true);
    });

    it('should have all required source files', () => {
      expect(fs.existsSync(path.join(srcDir, 'index.js'))).toBe(true);
      expect(fs.existsSync(path.join(srcDir, 'ss-icon.js'))).toBe(true);
      expect(fs.existsSync(path.join(srcDir, 'ss-loader.js'))).toBe(true);
    });
  });

  describe('Generated SVG files', () => {
    it('should have svg directory', () => {
      expect(fs.existsSync(svgDir)).toBe(true);
    });

    it('should have SVG file for each icon in icons.json', () => {
      icons.forEach(icon => {
        const svgPath = path.join(svgDir, `${icon.slug}.svg`);
        expect(fs.existsSync(svgPath)).toBe(true);
      });
    });

    it('should have index.js exporting all icons', () => {
      const indexPath = path.join(svgDir, 'index.js');
      expect(fs.existsSync(indexPath)).toBe(true);

      const content = fs.readFileSync(indexPath, 'utf8');
      expect(content).toContain('export default icons');
    });
  });

  describe('Generated CSS', () => {
    it('should have icons.css file', () => {
      expect(fs.existsSync(path.join(srcDir, 'icons.css'))).toBe(true);
    });

    it('should have CSS class for each icon', () => {
      const cssContent = fs.readFileSync(path.join(srcDir, 'icons.css'), 'utf8');
      
      icons.forEach(icon => {
        expect(cssContent).toContain(`.ss-${icon.slug}`);
      });
    });
  });

  describe('Documentation files', () => {
    it('should have docs directory structure', () => {
      expect(fs.existsSync(path.join(docsDir, 'icons'))).toBe(true);
      expect(fs.existsSync(path.join(docsDir, 'ms', 'icons'))).toBe(true);
    });

    it('should have documentation for each icon', () => {
      icons.forEach(icon => {
        const enPath = path.join(docsDir, 'icons', `${icon.slug}.md`);
        const msPath = path.join(docsDir, 'ms', 'icons', `${icon.slug}.md`);
        
        expect(fs.existsSync(enPath)).toBe(true);
        expect(fs.existsSync(msPath)).toBe(true);
      });
    });
  });

  describe('Icon data consistency', () => {
    it('should have matching icon counts across all generated files', () => {
      const svgFiles = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));
      const docFiles = fs.readdirSync(path.join(docsDir, 'icons')).filter(f => f.endsWith('.md') && f !== 'index.md');
      
      // All icons in icons.json should have corresponding SVG and doc files
      // Note: There may be more files than icons if old files weren't cleaned up
      expect(svgFiles.length).toBeGreaterThanOrEqual(icons.length);
      expect(docFiles.length).toBeGreaterThanOrEqual(icons.length);
      
      // Verify each icon has its files
      icons.forEach(icon => {
        expect(svgFiles).toContain(`${icon.slug}.svg`);
        expect(docFiles).toContain(`${icon.slug}.md`);
      });
    });

    it('should have valid SVG path data in icons.json', () => {
      icons.forEach(icon => {
        // Check that path commands are valid SVG path syntax
        expect(icon.src.length).toBeGreaterThan(0);
        // Should not contain HTML tags or scripts
        expect(icon.src).not.toContain('<script');
        expect(icon.src).not.toContain('javascript:');
      });
    });

    it('should have normalized slugs (lowercase, hyphenated)', () => {
      icons.forEach(icon => {
        expect(icon.slug).toMatch(/^[a-z0-9-]+$/);
        expect(icon.slug).not.toContain(' ');
        expect(icon.slug).not.toMatch(/[A-Z]/);
      });
    });
  });

  describe('Build scripts', () => {
    it('should have all build scripts', () => {
      expect(fs.existsSync(path.join(projectRoot, 'scripts', 'build.js'))).toBe(true);
      expect(fs.existsSync(path.join(projectRoot, 'scripts', 'build-svgs.js'))).toBe(true);
      expect(fs.existsSync(path.join(projectRoot, 'scripts', 'build-css.js'))).toBe(true);
      expect(fs.existsSync(path.join(projectRoot, 'scripts', 'build-icon-docs.js'))).toBe(true);
    });
  });

  describe('Webpack configuration', () => {
    it('should have webpack.config.js', () => {
      expect(fs.existsSync(path.join(projectRoot, 'webpack.config.js'))).toBe(true);
    });
  });
});
