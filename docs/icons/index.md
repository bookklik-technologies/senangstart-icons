# Icon Library

Browse all available icons in SenangStart Icons.

::: tip
Click on any icon to copy its name to clipboard.
:::

<iframe id="icons-frame" src="/minimal.html" width="100%" scrolling="no" style="border: none; min-height: 386px; overflow: hidden;"></iframe>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const iframe = document.getElementById('icons-frame')
  if (!iframe) return
  
  // Listen for height updates from iframe
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'iframe-height') {
      iframe.style.height = event.data.height + 'px'
    }
  })

  // Sync dark mode with iframe
  const syncDarkMode = () => {
    const isDark = document.documentElement.classList.contains('dark')
    iframe.contentWindow?.postMessage({ type: 'theme-change', isDark }, '*')
  }

  // Initial sync after iframe loads
  iframe.addEventListener('load', syncDarkMode)

  // Observe VitePress dark mode changes on <html>
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        syncDarkMode()
      }
    })
  })
  observer.observe(document.documentElement, { attributes: true })
})
</script>

## Usage

Once you find the icon you need, use it like this:

```html
<ss-icon name="icon-name"></ss-icon>
```

## Icon Categories

Icons are organized into the following categories:

- **Navigation** - Arrows, menus, and navigation elements
- **Actions** - Common action icons like edit, delete, save
- **Communication** - Chat, mail, and social icons
- **Media** - Play, pause, volume controls
- **Files** - Document and file-related icons
- **UI Elements** - Interface components and controls

See [Categories](/icons/categories) for a complete breakdown.

## Contributing Icons

Want to contribute new icons? Check out our [GitHub repository](https://github.com/a-hakim/senangstart-icons) for contribution guidelines.
