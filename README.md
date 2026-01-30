# SenangStart Icons

Curated Starter icons designed for web projects. `senangstart-icons` provides a collection of SVG icons that can be easily used via the `ss-icon` web component or the `ss ss-icon` class. Icons are designed to be simple & scalable.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

## Installation

```bash
npm i @bookklik/senangstart-icons
```

You can then import individual icons (supports tree-shaking):

```js
import { Home, User } from '@bookklik/senangstart-icons';
// or for zero side-effects:
import { Home } from '@bookklik/senangstart-icons/icons';
```

## Usage

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
