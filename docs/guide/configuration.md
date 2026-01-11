# Configuration

Configure SenangStart Icons for your project needs.

## Default Settings

Set global defaults for all icons:

```js
// Set default size for all icons
SSIcon.defaults = {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2
};
```

## Custom Icon Path

If you're self-hosting the icons, configure the base path:

```js
// Set custom path to icons
SSIcon.config({
  basePath: '/assets/icons/'
});
```

## Preloading Icons

Preload commonly used icons for better performance:

```js
// Preload specific icons
SSIcon.preload(['home', 'user', 'settings', 'menu']);
```

## TypeScript Support

SenangStart Icons includes TypeScript definitions:

```ts
import '@bookklik/senangstart-icons';

// Icon element is typed
const icon: HTMLElement = document.querySelector('ss-icon')!;
icon.setAttribute('name', 'home');
```

## Framework Integration

### Vue.js

```vue
<template>
  <ss-icon :name="iconName" :size="iconSize"></ss-icon>
</template>

<script setup>
import '@bookklik/senangstart-icons';

const iconName = 'home';
const iconSize = 24;
</script>
```

### React

```jsx
import '@bookklik/senangstart-icons';

function App() {
  return (
    <ss-icon name="home" size="24"></ss-icon>
  );
}
```

### Angular

```ts
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@bookklik/senangstart-icons';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

```html
<!-- component.html -->
<ss-icon name="home" size="24"></ss-icon>
```

## Build Configuration

### Webpack

No additional configuration needed. Import directly:

```js
import '@bookklik/senangstart-icons';
```

### Vite

Works out of the box:

```js
import '@bookklik/senangstart-icons';
```

### Rollup

Add to your input:

```js
// rollup.config.js
export default {
  input: 'src/main.js',
  // ... rest of config
};
```
