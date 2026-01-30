# SenangStart Icons

Curated Starter icons designed for web projects. `senangstart-icons` provides a collection of SVG icons that can be easily used via the `ss-icon` web component or the `ss ss-icon` class. Icons are designed to be simple & scalable.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

## Installation

```bash
npm i @bookklik/senangstart-icons
```

## Usage

### Node.js / Bundlers

You can import the icons collection using ES Modules (recommended) or CommonJS.

**ES Modules:**
```js
import icons from '@bookklik/senangstart-icons/icons';

// Access specific icons
const { "arrow-right": ArrowRight } = icons;
```

**CommonJS:**
```js
const icons = require('@bookklik/senangstart-icons/icons');

const { "arrow-right": ArrowRight } = icons;
```

### Browser / Web Components

You may use the `<ss-icon>` tag:

```html
<head>
  <script src="https://unpkg.com/@bookklik/senangstart-icons/dist/senangstart-icon.min.js"></script>
</head>
<body>
  <ss-icon icon="check" thickness="2"></ss-icon>
</body>
```

> **Note:**
> You can customize the icon thickness (default `2.2`).

### CSS Icons

Or use the `ss-icon` class:

```html
<head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/@bookklik/senangstart-icons/dist/senangstart.min.css"
  />
</head>
<body>
  <i class="ss ss-check"></i>
</body>
```

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## Documentation

Full docs at [bookklik-technologies.github.io/senangstart-icons](https://bookklik-technologies.github.io/senangstart-icons/)

## License

Read [MIT License](LICENSE.md)
