---
description: Publish a new version of SenangStart Icons to npm
---

# Publish Workflow

This workflow guides publishing a new version to npm.

## Prerequisites

1. Ensure you're logged in to npm: `npm whoami`
2. Ensure you have publish access to `@bookklik/senangstart-icons`

## Step 1: Run Tests

Ensure all tests pass:

// turbo
```bash
npm test
```

## Step 2: Build Production Files

// turbo
```bash
npm run build
```

## Step 3: Update Version

Update version in `package.json` following semver:

- **Patch** (1.0.x): Bug fixes, minor icon adjustments
- **Minor** (1.x.0): New icons, non-breaking feature additions
- **Major** (x.0.0): Breaking API changes

// turbo
```bash
npm version patch
```

Or for minor/major:
```bash
npm version minor
npm version major
```

## Step 4: Publish to npm

```bash
npm publish --access public
```

## Step 5: Push Tags

```bash
git push origin main --tags
```

## Step 6: Build and Deploy Docs

Build documentation:

// turbo
```bash
npm run docs:build
```

Deploy to GitHub Pages (if configured via GitHub Actions).

## Checklist

Before publishing:
- [ ] All tests pass
- [ ] Build completes without errors
- [ ] Version number updated
- [ ] CHANGELOG updated (if maintained)
- [ ] Documentation regenerated
- [ ] Icons visually verified
