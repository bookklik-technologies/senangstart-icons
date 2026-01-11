import { defineConfig } from 'vitepress'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pkg = require('../../package.json')

// Shared theme config
const sharedThemeConfig = {
  logo: 'https://senangstart.com/img/ss_logo_typo.svg',
  siteTitle: false,
  socialLinks: [
    { icon: 'github', link: 'https://github.com/bookklik-technologies/senangstart-css' }
  ],
  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2025 Bookklik Technologies'
  }
}

export default defineConfig({
  title: 'SenangStart Icons',
  description: 'Curated Starter icons designed for web projects',
  
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['script', { type: 'senangstart/config' }, '{ "darkMode": "selector" }'],
    ['script', { src: 'https://unpkg.com/@bookklik/senangstart-css@0.1.7/dist/senangstart-css.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4' }]
  ],

  themeConfig: {
    ...sharedThemeConfig,
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Icons', link: '/icons/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Usage', link: '/guide/usage' }
          ]
        },
        {
          text: 'Customization',
          items: [
            { text: 'Styling', link: '/guide/styling' },
            { text: 'Configuration', link: '/guide/configuration' }
          ]
        }
      ],
      '/icons/': [
        {
          text: 'Icon Library',
          items: [
            { text: 'All Icons', link: '/icons/' },
            { text: 'Categories', link: '/icons/categories' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bookklik-technologies/senangstart-icons' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Bookklik Technologies'
    },

    search: {
      provider: 'local'
    }
  }
})
