# Penggayaan

Sesuaikan penampilan SenangStart Icons menggunakan CSS.

## Ciri Tersuai CSS

Ikon boleh digayakan menggunakan ciri tersuai CSS:

```css
ss-icon {
  --ss-icon-color: #333;
  --ss-icon-size: 24px;
}
```

## Gaya Sebaris

Gunakan gaya terus pada elemen ikon:

```html
<ss-icon name="home" style="color: blue;"></ss-icon>
```

## Kelas CSS

Cipta gaya ikon yang boleh diguna semula:

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
<ss-icon name="info" class="icon-primary"></ss-icon>
<ss-icon name="x-circle" class="icon-danger"></ss-icon>
<ss-icon name="check-circle" class="icon-success"></ss-icon>
```

## Kesan Hover

Tambah kesan hover interaktif:

```css
ss-icon {
  transition: color 0.2s ease, transform 0.2s ease;
}

ss-icon:hover {
  color: #3498db;
  transform: scale(1.1);
}
```

## Animasi

Animasikan ikon dengan CSS:

```css
/* Animasi pusing */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.icon-spin {
  animation: spin 1s linear infinite;
}

/* Animasi denyut */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.icon-pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

```html
<ss-icon name="loader" class="icon-spin"></ss-icon>
<ss-icon name="heart" class="icon-pulse"></ss-icon>
```

## Mod Gelap

Sokong mod gelap dengan CSS:

```css
ss-icon {
  color: #333;
}

@media (prefers-color-scheme: dark) {
  ss-icon {
    color: #fff;
  }
}

/* Atau dengan mod gelap berasaskan kelas */
.dark ss-icon {
  color: #fff;
}
```

## Ikon dalam Butang

Gayakan ikon dalam butang:

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
  <ss-icon name="plus" size="16"></ss-icon>
  Tambah Item
</button>

<button class="btn btn-icon-only">
  <ss-icon name="menu"></ss-icon>
</button>
```
