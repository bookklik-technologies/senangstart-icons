# Usage

Learn how to use SenangStart Icons in your projects.

## Basic Usage

After including the library, you can use icons in two ways:

### 1. Web Component

Use the `<ss-icon>` custom element:

```html
<ss-icon icon="home"></ss-icon>
```

### 2. CSS Classes

Use the `<i>` tag with specific classes:

```html
<i class="ss ss-home"></i>
```

## Attributes (`<ss-icon>`)

### icon

**Required.** The slug of the icon to display.

```html
<ss-icon icon="magnifying-glass"></ss-icon>
<ss-icon icon="user"></ss-icon>
<ss-icon icon="cog-6-tooth"></ss-icon>
```

### thickness

Set the stroke width for the icon. Default is `2`.

The `thickness` attribute affects only `<ss-icon>`. CSS class icons use a fixed stroke width of `2`.

```html
<ss-icon icon="circle" thickness="1"></ss-icon>
<ss-icon icon="circle" thickness="2"></ss-icon>
<ss-icon icon="circle" thickness="3"></ss-icon>
```

## Legacy Icon Names

Existing names and drawings remain available for compatibility. Prefer these names to make the intended action clear:

| Action | Preferred name | Legacy name with the same drawing |
|---|---|---|
| Incoming call | `phone-incoming` | `phone-x-mark` |
| Sign in (arrow entering the door) | `sign-in` | `arrow-right-on-rectangle` |
| Sign out (arrow leaving the door) | `sign-out` | `arrow-left-on-rectangle` |

Use `phone-reject` to reject a call; it contains an actual X. Search tags are not runtime aliases.

## Styling

SenangStart Icons are powered by currentColor, so they inherit the text color of their parent. You can style them using standard CSS.

### Sizing & Coloring

```html
<!-- Via utility classes (e.g. Tailwind) -->
<ss-icon icon="home" class="w-6 h-6 text-blue-500"></ss-icon>

<!-- Via style attribute -->
<ss-icon icon="heart" style="font-size: 32px; color: red;"></ss-icon>
```

## In JavaScript

You can also manipulate icons programmatically:

```js
// Get icon element
const icon = document.querySelector('ss-icon');

// Change icon
icon.setAttribute('icon', 'check');

// Update thickness
icon.setAttribute('thickness', '2');

// Update styling
icon.style.color = 'green';
icon.style.fontSize = '48px';
```

## Accessibility

Hide decorative icons with `aria-hidden="true"`. Give meaningful standalone icons `role="img"` and an `aria-label`. For an icon-only button, put the action name on the button:

```html
<!-- Decorative icon -->
<ss-icon icon="star" aria-hidden="true"></ss-icon>

<!-- Meaningful icon -->
<ss-icon icon="exclamation-triangle" role="img" aria-label="Warning"></ss-icon>

<!-- Icon-only button -->
<button type="button" aria-label="Open menu">
  <ss-icon icon="bars-3" aria-hidden="true"></ss-icon>
</button>

<!-- Icon with text -->
<button>
  <ss-icon icon="save" aria-hidden="true"></ss-icon>
  Save
</button>
```

The same pattern applies to CSS icons: use `<i class="ss ss-star" aria-hidden="true"></i>` for decoration. Keep labels and checked/selected state on native form controls; icons only decorate them.

## Using Icons data (Node.js/SSR)

If you are using SenangStart Icons in a Node.js project or need to access the raw SVG strings programmatically (e.g., for SSR or custom rendering), you can import the icons separately.

### ES Modules (Recommended)

```js
import icons from '@bookklik/senangstart-icons/icons';

// Access specific icon
const arrowIcon = icons['arrow-right'];
```

### CommonJS (Legacy)

```js
const icons = require('@bookklik/senangstart-icons/icons');

// Access specific icon
const arrowIcon = icons['arrow-right'];
```

Both methods give you access to the raw SVG string:

```js
console.log(arrowIcon); 
// Output: <svg viewBox="0 0 24 24" ...>...</svg>
```

This is useful when you don't need the web component and just want the icon data.

