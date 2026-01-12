# Penggunaan

Pelajari cara menggunakan SenangStart Icons dalam projek anda.

## Penggunaan Asas

Selepas memasukkan pustaka, gunakan elemen tersuai `<ss-icon>`:

```html
<ss-icon name="home"></ss-icon>
```

## Atribut

### name

**Diperlukan.** Nama ikon untuk dipaparkan.

```html
<ss-icon name="search"></ss-icon>
<ss-icon name="user"></ss-icon>
<ss-icon name="settings"></ss-icon>
```

### size

Tetapkan saiz ikon dalam piksel. Lalai adalah `24`.

```html
<ss-icon name="home" size="16"></ss-icon>
<ss-icon name="home" size="24"></ss-icon>
<ss-icon name="home" size="32"></ss-icon>
<ss-icon name="home" size="48"></ss-icon>
```

### color

Tetapkan warna ikon. Menerima sebarang nilai warna CSS yang sah.

```html
<ss-icon name="heart" color="red"></ss-icon>
<ss-icon name="star" color="#f1c40f"></ss-icon>
<ss-icon name="check" color="rgb(46, 204, 113)"></ss-icon>
```

### stroke-width

Tetapkan lebar garisan untuk ikon bergaris luar.

```html
<ss-icon name="circle" stroke-width="1"></ss-icon>
<ss-icon name="circle" stroke-width="2"></ss-icon>
<ss-icon name="circle" stroke-width="3"></ss-icon>
```

## Menggabungkan Atribut

Gabungkan beberapa atribut untuk penyesuaian penuh:

```html
<ss-icon 
  name="bell" 
  size="32" 
  color="#3498db"
  stroke-width="2"
></ss-icon>
```

## Dalam JavaScript

Anda juga boleh memanipulasi ikon secara programatik:

```js
// Dapatkan elemen ikon
const icon = document.querySelector('ss-icon');

// Tukar ikon
icon.setAttribute('name', 'check');

// Kemas kini saiz
icon.setAttribute('size', '48');

// Kemas kini warna
icon.setAttribute('color', 'green');
```

## Kebolehcapaian

Untuk kebolehcapaian yang lebih baik, tambah `aria-label` atau `aria-hidden`:

```html
<!-- Ikon hiasan -->
<ss-icon name="star" aria-hidden="true"></ss-icon>

<!-- Ikon bermakna -->
<ss-icon name="warning" aria-label="Amaran"></ss-icon>

<!-- Ikon dengan teks -->
<button>
  <ss-icon name="save" aria-hidden="true"></ss-icon>
  Simpan
</button>
```
