# Konfigurasi

Konfigurasikan SenangStart Icons untuk keperluan projek anda.

## Integrasi Rangka Kerja

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

## Konfigurasi Pembinaan

### Webpack

Tiada konfigurasi tambahan diperlukan. Import terus:

```js
import '@bookklik/senangstart-icons';
```

### Vite

Berfungsi terus:

```js
import '@bookklik/senangstart-icons';
```

### Rollup

Tambah ke input anda:

```js
// rollup.config.js
export default {
  input: 'src/main.js',
  // ... baki konfigurasi
};
```
