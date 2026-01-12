/**
 * Tests for build-icon-docs.js
 * 
 * Tests documentation generation for icons
 */
import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const iconsPath = path.resolve(__dirname, '../src/icons.json');
const docsIconsDir = path.resolve(__dirname, '../docs/icons');
const docsIconsDirMs = path.resolve(__dirname, '../docs/ms/icons');

describe('build-icon-docs.js', () => {
  let icons;

  beforeAll(() => {
    icons = JSON.parse(fs.readFileSync(iconsPath, 'utf8'));
  });

  describe('English documentation', () => {
    it('should have docs/icons directory', () => {
      expect(fs.existsSync(docsIconsDir)).toBe(true);
    });

    it('should generate index.md', () => {
      const indexPath = path.join(docsIconsDir, 'index.md');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should generate a markdown file for each icon', () => {
      icons.forEach(icon => {
        const mdPath = path.join(docsIconsDir, `${icon.slug}.md`);
        expect(fs.existsSync(mdPath)).toBe(true);
      });
    });

    it('should have proper frontmatter in icon pages', () => {
      const sampleIcon = icons[0];
      const mdPath = path.join(docsIconsDir, `${sampleIcon.slug}.md`);
      const content = fs.readFileSync(mdPath, 'utf8');

      expect(content).toContain('---');
      expect(content).toContain(`title: ${sampleIcon.name}`);
    });

    it('should include usage examples', () => {
      const sampleIcon = icons[0];
      const mdPath = path.join(docsIconsDir, `${sampleIcon.slug}.md`);
      const content = fs.readFileSync(mdPath, 'utf8');

      expect(content).toContain('## Usage');
      expect(content).toContain(`<ss-icon name="${sampleIcon.slug}">`);
    });

    it('should include icon details table', () => {
      const sampleIcon = icons[0];
      const mdPath = path.join(docsIconsDir, `${sampleIcon.slug}.md`);
      const content = fs.readFileSync(mdPath, 'utf8');

      expect(content).toContain('## Icon Details');
      expect(content).toContain('| Property | Value |');
      expect(content).toContain(`| **Name** | ${sampleIcon.name} |`);
      expect(content).toContain(`| **Slug** | \`${sampleIcon.slug}\` |`);
    });

    it('should include SVG path data', () => {
      const sampleIcon = icons[0];
      const mdPath = path.join(docsIconsDir, `${sampleIcon.slug}.md`);
      const content = fs.readFileSync(mdPath, 'utf8');

      expect(content).toContain('## SVG Path');
      expect(content).toContain(sampleIcon.src);
    });

    it('should have index with all icons', () => {
      const indexPath = path.join(docsIconsDir, 'index.md');
      const content = fs.readFileSync(indexPath, 'utf8');

      expect(content).toContain(`${icons.length}`);
      expect(content).toContain('icon-grid');
      
      // Check that at least some icons are linked
      const sampleIcon = icons[0];
      expect(content).toContain(`href="./${sampleIcon.slug}"`);
    });
  });

  describe('Malay documentation', () => {
    it('should have docs/ms/icons directory', () => {
      expect(fs.existsSync(docsIconsDirMs)).toBe(true);
    });

    it('should generate index.md in Malay', () => {
      const indexPath = path.join(docsIconsDirMs, 'index.md');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should generate a markdown file for each icon', () => {
      icons.forEach(icon => {
        const mdPath = path.join(docsIconsDirMs, `${icon.slug}.md`);
        expect(fs.existsSync(mdPath)).toBe(true);
      });
    });

    it('should have Malay-translated content', () => {
      const sampleIcon = icons[0];
      const mdPath = path.join(docsIconsDirMs, `${sampleIcon.slug}.md`);
      const content = fs.readFileSync(mdPath, 'utf8');

      expect(content).toContain('## Penggunaan'); // "Usage" in Malay
      expect(content).toContain('## Butiran Ikon'); // "Icon Details" in Malay
      expect(content).toContain('## Laluan SVG'); // "SVG Path" in Malay
    });

    it('should link back to Malay icon library', () => {
      const sampleIcon = icons[0];
      const mdPath = path.join(docsIconsDirMs, `${sampleIcon.slug}.md`);
      const content = fs.readFileSync(mdPath, 'utf8');

      expect(content).toContain('[← Kembali ke Pustaka Ikon](/ms/icons/)');
    });

    it('should have Malay index with all icons', () => {
      const indexPath = path.join(docsIconsDirMs, 'index.md');
      const content = fs.readFileSync(indexPath, 'utf8');

      expect(content).toContain('Pustaka Ikon'); // "Icon Library" in Malay
      expect(content).toContain(`href="./${icons[0].slug}"`);
    });
  });
});
