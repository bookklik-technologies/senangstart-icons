# Usage

Learn how to use SenangStart Icons in your projects.

## Basic Usage

After including the library, use the `<ss-icon>` custom element:

```html
<ss-icon name="home"></ss-icon>
```

## Attributes

### name

**Required.** The name of the icon to display.

```html
<ss-icon name="search"></ss-icon>
<ss-icon name="user"></ss-icon>
<ss-icon name="settings"></ss-icon>
```

### size

Set the icon size in pixels. Default is `24`.

```html
<ss-icon name="home" size="16"></ss-icon>
<ss-icon name="home" size="24"></ss-icon>
<ss-icon name="home" size="32"></ss-icon>
<ss-icon name="home" size="48"></ss-icon>
```

### color

Set the icon color. Accepts any valid CSS color value.

```html
<ss-icon name="heart" color="red"></ss-icon>
<ss-icon name="star" color="#f1c40f"></ss-icon>
<ss-icon name="check" color="rgb(46, 204, 113)"></ss-icon>
```

### stroke-width

Set the stroke width for outlined icons.

```html
<ss-icon name="circle" stroke-width="1"></ss-icon>
<ss-icon name="circle" stroke-width="2"></ss-icon>
<ss-icon name="circle" stroke-width="3"></ss-icon>
```

## Combining Attributes

Combine multiple attributes for full customization:

```html
<ss-icon 
  name="bell" 
  size="32" 
  color="#3498db"
  stroke-width="2"
></ss-icon>
```

## In JavaScript

You can also manipulate icons programmatically:

```js
// Get icon element
const icon = document.querySelector('ss-icon');

// Change icon
icon.setAttribute('name', 'check');

// Update size
icon.setAttribute('size', '48');

// Update color
icon.setAttribute('color', 'green');
```

## Accessibility

For better accessibility, add `aria-label` or `aria-hidden`:

```html
<!-- Decorative icon -->
<ss-icon name="star" aria-hidden="true"></ss-icon>

<!-- Meaningful icon -->
<ss-icon name="warning" aria-label="Warning"></ss-icon>

<!-- Icon with text -->
<button>
  <ss-icon name="save" aria-hidden="true"></ss-icon>
  Save
</button>
```
