# Penggunaan

Pelajari cara menggunakan SenangStart Icons dalam projek anda.

## Penggunaan Asas

Selepas memasukkan pustaka, anda boleh menggunakan ikon dengan dua cara:

### 1. Komponen Web

Gunakan elemen tersuai `<ss-icon>`:

```html
<ss-icon icon="home"></ss-icon>
```

### 2. Kelas CSS

Gunakan tag `<i>` dengan kelas tertentu:

```html
<i class="ss ss-home"></i>
```

## Atribut (`<ss-icon>`)

### icon

**Diperlukan.** Slug ikon untuk dipaparkan.

```html
<ss-icon icon="search"></ss-icon>
<ss-icon icon="user"></ss-icon>
<ss-icon icon="settings"></ss-icon>
```

### thickness

Tetapkan ketebalan garisan untuk ikon. Lalai adalah `1.5`.

```html
<ss-icon icon="circle" thickness="1"></ss-icon>
<ss-icon icon="circle" thickness="2"></ss-icon>
<ss-icon icon="circle" thickness="3"></ss-icon>
```

## Penggayaan (Styling)

SenangStart Icons menggunakan `currentColor`, jadi mereka mewarisi warna teks daripada elemen induk. Anda boleh menggayakan mereka menggunakan CSS standard.

### Saiz & Warna

```html
<!-- Melalui kelas utiliti (cth. Tailwind) -->
<ss-icon icon="home" class="w-6 h-6 text-blue-500"></ss-icon>

<!-- Melalui atribut style -->
<ss-icon icon="heart" style="font-size: 32px; color: red;"></ss-icon>
```

## Dalam JavaScript

Anda juga boleh memanipulasi ikon secara programatik:

```js
// Dapatkan elemen ikon
const icon = document.querySelector('ss-icon');

// Tukar ikon
icon.setAttribute('icon', 'check');

// Kemas kini ketebalan
icon.setAttribute('thickness', '2');

// Kemas kini gaya
icon.style.color = 'green';
icon.style.fontSize = '48px';
```

## Kebolehcapaian

Untuk kebolehcapaian yang lebih baik, tambah `aria-label` atau `aria-hidden`:

```html
<!-- Ikon hiasan -->
<ss-icon icon="star" aria-hidden="true"></ss-icon>

<!-- Ikon bermakna -->
<ss-icon icon="warning" aria-label="Amaran"></ss-icon>

<!-- Ikon dengan teks -->
<button>
  <ss-icon icon="save" aria-hidden="true"></ss-icon>
  Simpan
</button>
```
