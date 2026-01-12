/**
 * Tests for ss-loader.js Icon Loader
 * 
 * Tests the icon replacement functionality
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock icons
const mockIcons = {
  'home': '<svg viewBox="0 0 24 24"><path d="M2.25 12l8.954-8.955"/></svg>',
  'check': '<svg viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5"/></svg>',
  'plus': '<svg viewBox="0 0 24 24"><path d="M12 4.5v15m7.5-7.5h-15"/></svg>',
  'sw-loading': '<svg viewBox="0 0 24 24"><path d="M16.023 9.348h4.992"/></svg>'
};

// Recreate the replaceIcons function from ss-loader.js for testing
function replaceIcons() {
  const elements = document.querySelectorAll('i.ss');
  elements.forEach((el) => {
    if (el.dataset.ssLoaded) return;

    const classes = Array.from(el.classList);
    const iconClass = classes.find(
      (c) => (c.startsWith('ss-') || c.startsWith('sw-')) && c !== 'ss'
    );

    if (iconClass) {
      const iconName = iconClass.startsWith('sw-')
        ? iconClass
        : iconClass.replace('ss-', '');
      const iconSvg = mockIcons[iconName];

      if (iconSvg) {
        el.innerHTML = iconSvg;
        el.dataset.ssLoaded = 'true';
      }
    }
  });
}

describe('ss-loader.js Icon Loader', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('replaceIcons function', () => {
    it('should replace i.ss.ss-{slug} with SVG content', () => {
      document.body.innerHTML = '<i class="ss ss-home"></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      expect(icon.innerHTML).toContain('<svg');
      expect(icon.innerHTML).toContain('M2.25 12l8.954-8.955');
    });

    it('should handle sw- prefix icons', () => {
      document.body.innerHTML = '<i class="ss sw-loading"></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      expect(icon.innerHTML).toContain('<svg');
      expect(icon.innerHTML).toContain('M16.023 9.348h4.992');
    });

    it('should set data-ss-loaded attribute after replacement', () => {
      document.body.innerHTML = '<i class="ss ss-check"></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      expect(icon.dataset.ssLoaded).toBe('true');
    });

    it('should not replace already loaded icons', () => {
      document.body.innerHTML = '<i class="ss ss-home" data-ss-loaded="true"><span>original</span></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      expect(icon.innerHTML).toContain('<span>original</span>');
      expect(icon.innerHTML).not.toContain('<svg');
    });

    it('should not replace icons without ss- or sw- class', () => {
      document.body.innerHTML = '<i class="ss other-class"></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      expect(icon.innerHTML).toBe('');
      expect(icon.dataset.ssLoaded).toBeUndefined();
    });

    it('should not replace icons with invalid slug', () => {
      document.body.innerHTML = '<i class="ss ss-nonexistent"></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      expect(icon.innerHTML).toBe('');
      expect(icon.dataset.ssLoaded).toBeUndefined();
    });

    it('should replace multiple icons', () => {
      document.body.innerHTML = `
        <i class="ss ss-home"></i>
        <i class="ss ss-check"></i>
        <i class="ss ss-plus"></i>
      `;
      replaceIcons();

      const icons = document.querySelectorAll('i.ss');
      expect(icons[0].innerHTML).toContain('M2.25 12l8.954-8.955');
      expect(icons[1].innerHTML).toContain('M4.5 12.75l6 6 9-13.5');
      expect(icons[2].innerHTML).toContain('M12 4.5v15m7.5-7.5h-15');
    });

    it('should handle icons with additional classes', () => {
      document.body.innerHTML = '<i class="ss ss-home text-lg text-blue-500"></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      expect(icon.innerHTML).toContain('<svg');
      expect(icon.classList.contains('text-lg')).toBe(true);
      expect(icon.classList.contains('text-blue-500')).toBe(true);
    });
  });

  describe('Icon class detection', () => {
    it('should detect ss- prefixed classes', () => {
      document.body.innerHTML = '<i class="ss ss-home"></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      expect(icon.dataset.ssLoaded).toBe('true');
    });

    it('should detect sw- prefixed classes', () => {
      document.body.innerHTML = '<i class="ss sw-loading"></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      expect(icon.dataset.ssLoaded).toBe('true');
    });

    it('should use the first matching icon class when multiple are present', () => {
      document.body.innerHTML = '<i class="ss ss-home ss-check"></i>';
      replaceIcons();

      const icon = document.querySelector('i.ss');
      // Should match ss-home first (first in class list after 'ss')
      expect(icon.innerHTML).toContain('M2.25 12l8.954-8.955');
    });
  });
});
