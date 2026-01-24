---
description: Run the test suite for SenangStart Icons
---

# Testing Workflow

This workflow runs the Vitest test suite for SenangStart Icons.

## Test Commands

### Run All Tests Once

// turbo
```bash
npm test
```

### Run Tests in Watch Mode

// turbo
```bash
npm run test:watch
```

### Run Tests with Coverage

// turbo
```bash
npm run test:coverage
```

Coverage reports are generated in HTML format in the `coverage/` directory.

## Test Files

| Test File | What It Tests |
|-----------|---------------|
| `tests/ss-icon.test.js` | `<ss-icon>` Web Component rendering |
| `tests/ss-loader.test.js` | Class-based icon loader (`i.ss`) |
| `tests/build-svgs.test.js` | SVG generation from icons.json |
| `tests/build-css.test.js` | CSS generation with mask-image |
| `tests/build-icon-docs.test.js` | Documentation generation |
| `tests/build-pipeline.test.js` | Full build pipeline integration |

## Configuration

Tests are configured in `vitest.config.js`:
- Environment: Node
- Globals: enabled
- Coverage: V8 provider, excludes `src/svg/`

## Writing New Tests

1. Create test file in `tests/` with `.test.js` extension
2. Import `describe`, `it`, `expect` from `vitest` (or use globals)
3. Mock file system operations if needed with `vi.mock('fs')`
