---
name: Build Scripts
description: Understanding and modifying the SenangStart Icons build pipeline
---

# Build Scripts Skill

This skill covers the build pipeline scripts for SenangStart Icons.

## Build Pipeline Overview

The build system consists of four scripts that run sequentially:

1. `build-svgs.js` → Generates SVG files from JSON
2. `build-css.js` → Generates CSS with mask-based icons
3. `build-icon-docs.js` → Generates markdown documentation
4. `webpack` → Bundles everything into dist/

## Script Details

### 1. build-svgs.js

**Location:** `scripts/build-svgs.js`

**Purpose:** Converts icons.json into individual SVG files and a JS index

**Inputs:**
- `src/icons.json`

**Outputs:**
- `src/svg/{slug}.svg` - Individual SVG files
- `src/svg/index.js` - Export map for Webpack

**Key Logic:**
```javascript
// Each icon generates an SVG with standard attributes
const svgContent = `<svg viewBox="${vBox}" fill="${fl}" stroke="${strk}" stroke-width="${strkWidth}" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <g><path d="${src}" /></g>
</svg>`;
```

---

### 2. build-css.js

**Location:** `scripts/build-css.js`

**Purpose:** Generates CSS using mask-image for pure-CSS icons

**Inputs:**
- `src/icons.json`

**Outputs:**
- `src/icons.css`

**Key Logic:**
```javascript
// Base .ss class styles
.ss {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: currentColor;
  -webkit-mask-size: contain;
  mask-size: contain;
}

// Each icon gets a mask-image class
.ss-{slug} {
  mask-image: url("data:image/svg+xml,...");
}
```

**SVG Encoding Function:**
```javascript
function encodeSvg(svg) {
  return svg
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    // ... more replacements
}
```

---

### 3. build-icon-docs.js

**Location:** `scripts/build-icon-docs.js`

**Purpose:** Generates VitePress markdown pages for each icon

**Inputs:**
- `src/icons.json`

**Outputs:**
- `docs/icons/{slug}.md` - English icon pages
- `docs/ms/icons/{slug}.md` - Malay icon pages
- `docs/icons/index.md` - English gallery
- `docs/ms/icons/index.md` - Malay gallery

**Key Features:**
- Generates SVG preview with inline SVG
- Creates usage examples for both methods
- Includes icon metadata (name, slug, tags)
- Provides raw SVG code

---

### 4. build.js (Orchestrator)

**Location:** `scripts/build.js`

**Purpose:** Runs all build steps in sequence

**Execution Order:**
```javascript
execSync('node scripts/build-svgs.js');
execSync('node scripts/build-css.js');
execSync('node scripts/build-icon-docs.js');
execSync('npx webpack --mode production');
```

## Modifying Build Scripts

### Adding New Icon Properties

1. Update `icons.json` schema documentation
2. Modify `build-svgs.js` to use new property
3. Modify `build-css.js` if CSS output changes
4. Update `build-icon-docs.js` to display new property
5. Add tests in `tests/build-*.test.js`

### Adding Build Outputs

1. Create new build script in `scripts/`
2. Add npm script to `package.json`
3. Include in `scripts/build.js` orchestrator
4. Write tests for the new script

## Webpack Configuration

**Location:** `webpack.config.js`

**Entry:** `src/index.js`

**Output:** 
- `dist/senangstart-icon.min.js` (UMD)
- `dist/senangstart.min.css`

**Key Features:**
- Babel transpilation for browser compatibility
- CSS extraction and minification
- SVG as asset/source (inline in JS)
- Source maps enabled
