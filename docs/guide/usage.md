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
<ss-icon icon="search"></ss-icon>
<ss-icon icon="user"></ss-icon>
<ss-icon icon="settings"></ss-icon>
```

### thickness

Set the stroke width for the icon. Default is `1.5`.

```html
<ss-icon icon="circle" thickness="1"></ss-icon>
<ss-icon icon="circle" thickness="2"></ss-icon>
<ss-icon icon="circle" thickness="3"></ss-icon>
```

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

For better accessibility, add `aria-label` or `aria-hidden`:

```html
<!-- Decorative icon -->
<ss-icon icon="star" aria-hidden="true"></ss-icon>

<!-- Meaningful icon -->
<ss-icon icon="warning" aria-label="Warning"></ss-icon>

<!-- Icon with text -->
<button>
  <ss-icon icon="save" aria-hidden="true"></ss-icon>
  Save
</button>
```
