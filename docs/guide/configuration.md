# Configuration

Configure SenangStart Icons for your project needs.

## Framework Integration

### Vue.js

```vue
<template>
  <ss-icon :icon="iconName" :style="{ fontSize: iconSize + 'px' }"></ss-icon>
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
    <ss-icon icon="home" style={{ fontSize: '24px' }}></ss-icon>
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
<ss-icon icon="home" style="font-size: 24px;"></ss-icon>
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
