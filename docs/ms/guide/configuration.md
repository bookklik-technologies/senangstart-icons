# Konfigurasi

Konfigurasikan SenangStart Icons untuk keperluan projek anda.

## Tetapan Lalai

Tetapkan lalai global untuk semua ikon:

```js
// Tetapkan saiz lalai untuk semua ikon
SSIcon.defaults = {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2
};
```

## Laluan Ikon Tersuai

Jika anda menghos ikon sendiri, konfigurasikan laluan asas:

```js
// Tetapkan laluan tersuai ke ikon
SSIcon.config({
  basePath: '/assets/icons/'
});
```

## Pramuat Ikon

Pramuat ikon yang kerap digunakan untuk prestasi yang lebih baik:

```js
// Pramuat ikon tertentu
SSIcon.preload(['home', 'user', 'settings', 'menu']);
```

## Sokongan TypeScript

SenangStart Icons termasuk definisi TypeScript:

```ts
import '@bookklik/senangstart-icons';

// Elemen ikon ditaip
const icon: HTMLElement = document.querySelector('ss-icon')!;
icon.setAttribute('name', 'home');
```

## Integrasi Rangka Kerja

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
