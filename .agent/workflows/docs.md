---
description: Work with VitePress documentation for SenangStart Icons
---

# Documentation Workflow

This workflow covers working with the VitePress documentation site.

## Development Server

Start the docs server with hot-reload:

// turbo
```bash
npm run docs:dev
```

Access at `http://localhost:5173`

## Build Documentation

Build static documentation files:

// turbo
```bash
npm run docs:build
```

Output goes to `docs/.vitepress/dist/`

## Preview Production Build

// turbo
```bash
npm run docs:preview
```

Serves the built documentation for testing before deployment.

## Documentation Structure

```
docs/
├── .vitepress/          # VitePress config
├── guide/               # Usage guides (English)
│   ├── getting-started.md
│   ├── installation.md
│   ├── usage.md
│   ├── styling.md
│   └── configuration.md
├── icons/               # Auto-generated icon pages (English)
│   ├── index.md         # Icon gallery
│   └── {slug}.md        # Individual icon pages
├── ms/                  # Malay translations
│   ├── guide/
│   └── icons/
├── public/              # Static assets
└── index.md             # Homepage
```

## Regenerating Icon Docs

After adding/modifying icons in `src/icons.json`:

// turbo
```bash
npm run build:icon-docs
```

This regenerates all icon documentation pages in both English and Malay.

## Adding Guide Pages

1. Create new `.md` file in `docs/guide/`
2. Add frontmatter with `title` field
3. Update VitePress config sidebar if needed
4. Create Malay translation in `docs/ms/guide/` if applicable
