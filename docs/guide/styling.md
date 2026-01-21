# Styling

Customize the appearance of SenangStart Icons using CSS.

## CSS Custom Properties

Icons can be styled using CSS custom properties:

```css
ss-icon {
  color: #333;
  font-size: 24px;
}
```

## Inline Styles

Apply styles directly to icon elements:

```html
<ss-icon icon="home" style="color: blue; font-size: 24px;"></ss-icon>
```

## CSS Classes

Create reusable icon styles:

```css
.icon-primary {
  color: #3498db;
}

.icon-danger {
  color: #e74c3c;
}

.icon-success {
  color: #2ecc71;
}

.icon-lg {
  font-size: 32px;
}

.icon-sm {
  font-size: 16px;
}
```

```html
<ss-icon icon="info" class="icon-primary"></ss-icon>
<ss-icon icon="x-circle" class="icon-danger"></ss-icon>
<ss-icon icon="check-circle" class="icon-success"></ss-icon>
```

## Hover Effects

Add interactive hover effects:

```css
ss-icon {
  transition: color 0.2s ease, transform 0.2s ease;
}

ss-icon:hover {
  color: #3498db;
  transform: scale(1.1);
}
```

## Animation

Animate icons with CSS:

```css
/* Spin animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.icon-spin {
  animation: spin 1s linear infinite;
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.icon-pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

```html
<ss-icon icon="loader" class="icon-spin"></ss-icon>
<ss-icon icon="heart" class="icon-pulse"></ss-icon>
```

## Dark Mode

Support dark mode with CSS:

```css
ss-icon {
  color: #333;
}

@media (prefers-color-scheme: dark) {
  ss-icon {
    color: #fff;
  }
}

/* Or with class-based dark mode */
.dark ss-icon {
  color: #fff;
}
```

## Icon in Buttons

Style icons within buttons:

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn ss-icon {
  flex-shrink: 0;
}

.btn-icon-only {
  padding: 0.5rem;
}
```

```html
<button class="btn">
  <ss-icon icon="plus" style="font-size: 16px;"></ss-icon>
  Add Item
</button>

<button class="btn btn-icon-only">
  <ss-icon icon="menu"></ss-icon>
</button>
```
