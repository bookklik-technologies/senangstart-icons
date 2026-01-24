---
description: Start the development server with hot-reload for icon development
---

# Development Server Workflow

This workflow starts the development environment for SenangStart Icons.

## Prerequisites

Ensure dependencies are installed:

// turbo
```bash
npm install
```

## Steps

### 1. Start Development Mode

This builds SVGs and CSS, then starts Webpack in watch mode:

// turbo
```bash
npm run dev
```

This command:
- Runs `build:svg` to generate SVG files from `src/icons.json`
- Runs `build:css` to generate `src/icons.css` with mask-based icon classes
- Starts Webpack in development watch mode

### 2. (Optional) Start Documentation Dev Server

In a separate terminal, start the VitePress docs server:

// turbo
```bash
npm run docs:dev
```

This serves the documentation at `http://localhost:5173` with hot-reload.

## File Locations

| File | Purpose |
|------|---------|
| `src/icons.json` | Icon definitions (name, slug, SVG path, tags) |
| `src/svg/` | Generated SVG files |
| `src/icons.css` | Generated CSS with mask-based icons |
| `dist/` | Bundled output files |
