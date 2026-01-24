---
description: Add a new icon to the SenangStart Icons library
---

# Add Icon Workflow

This workflow guides adding a new icon to the library.

## Step 1: Edit icons.json

Add the new icon to `src/icons.json`:

```json
{
  "name": "Icon Display Name",
  "slug": "icon-slug",
  "src": "M12 2L2 7l10 5 10-5-10-5z...",
  "tags": ["category", "related", "keywords"]
}
```

### Icon Properties

| Property | Required | Description |
|----------|----------|-------------|
| `name` | Yes | Human-readable display name |
| `slug` | Yes | URL-safe identifier (lowercase, hyphens) |
| `src` | Yes | SVG path `d` attribute |
| `tags` | Yes | Array of searchable keywords |
| `viewBox` | No | Custom viewBox (default: "0 0 24 24") |
| `fill` | No | Fill color (default: "none") |
| `stroke` | No | Stroke color (default: "currentColor") |
| `strokeWidth` | No | Stroke width (default: "2") |

## Step 2: Rebuild Assets

Run the full build to generate all files:

// turbo
```bash
npm run build
```

This generates:
- `src/svg/{slug}.svg` - Individual SVG file
- Updated `src/icons.css` - CSS class for the icon
- `docs/icons/{slug}.md` - English documentation
- `docs/ms/icons/{slug}.md` - Malay documentation
- Updated `dist/` bundles

## Step 3: Verify the Icon

1. Check the generated SVG in `src/svg/{slug}.svg`
2. Open `index.html` in a browser to preview
3. Run docs dev server to verify documentation:

// turbo
```bash
npm run docs:dev
```

## Step 4: Run Tests

// turbo
```bash
npm test
```

## Best Practices

### SVG Path Guidelines
- Use 24x24 viewBox for consistency
- Optimize paths (remove unnecessary precision)
- Use stroke-based icons for thickness customization
- Ensure paths work with `stroke-linecap="round"` and `stroke-linejoin="round"`

### Naming Conventions
- Use descriptive, concise names
- Slugs should be lowercase with hyphens
- Follow existing naming patterns (e.g., `arrow-left`, `chevron-down`)

### Tags
- Include the icon name broken into words
- Add related concept keywords
- Include action words if applicable
