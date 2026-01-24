---
description: Build the production distribution files for SenangStart Icons
---

# Build Workflow

This workflow builds the production-ready distribution files.

## Full Build (Recommended)

// turbo
```bash
npm run build
```

This runs the complete 4-step build pipeline:
1. **Build SVGs** - Generates individual SVG files from `src/icons.json`
2. **Build CSS** - Creates `src/icons.css` with mask-based icon classes
3. **Build Icon Docs** - Generates markdown docs for each icon (EN + MS)
4. **Webpack** - Bundles and minifies JS/CSS to `dist/`

## Individual Build Steps

### Build SVGs Only

// turbo
```bash
npm run build:svg
```

Reads `src/icons.json` and generates:
- Individual SVG files in `src/svg/`
- `src/svg/index.js` exporting all icons

### Build CSS Only

// turbo
```bash
npm run build:css
```

Generates `src/icons.css` with `.ss-{slug}` classes using CSS mask-image.

### Build Icon Documentation Only

// turbo
```bash
npm run build:icon-docs
```

Generates:
- `docs/icons/{slug}.md` - Individual icon pages (English)
- `docs/ms/icons/{slug}.md` - Individual icon pages (Malay)
- `docs/icons/index.md` - Icon gallery index (English)
- `docs/ms/icons/index.md` - Icon gallery index (Malay)

## Output Files

| File | Description |
|------|-------------|
| `dist/senangstart-icon.min.js` | Bundled JS (Web Component + Loader) |
| `dist/senangstart-icon.min.js.map` | JS source map |
| `dist/senangstart.min.css` | Bundled CSS |
| `dist/senangstart.min.css.map` | CSS source map |

## Webpack Configuration

See `webpack.config.js` for bundling options:
- UMD module format
- Babel transpilation
- TerserPlugin for JS minification
- CssMinimizerPlugin for CSS minification
- Source maps enabled
