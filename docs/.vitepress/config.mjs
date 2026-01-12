import { defineConfig } from 'vitepress'
import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'

const require = createRequire(import.meta.url)
const pkg = require('../../package.json')

// Load icons from icons.json to generate sidebar
const iconsPath = path.resolve(__dirname, '../../src/icons.json')
const icons = JSON.parse(fs.readFileSync(iconsPath, 'utf8'))
const iconSidebarItems = icons.map(icon => ({
  text: icon.name,
  link: `/icons/${icon.slug}`
}))

// Shared theme config
const sharedThemeConfig = {
  logo: 'https://senangstart.com/img/ss_logo_typo.svg',
  siteTitle: false,
  socialLinks: [
    { icon: 'github', link: 'https://github.com/bookklik-technologies/senangstart-icons' }
  ],
  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2025 Bookklik Technologies'
  }
}

// Generate Malay icon sidebar items
const iconSidebarItemsMs = icons.map(icon => ({
  text: icon.name,
  link: `/ms/icons/${icon.slug}`
}))

export default defineConfig({
  title: 'SenangStart Icons',
  description: 'Curated Starter icons designed for web projects',
  base: '/senangstart-icons/',
  
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://senangstart.com/img/ss_icon_accent.svg' }],
    ['script', { type: 'senangstart/config' }, '{ "darkMode": "selector" }'],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    ms: {
      label: 'Bahasa Melayu',
      lang: 'ms',
      title: 'SenangStart Icons',
      description: 'Ikon permulaan terkurasi untuk projek web',
      themeConfig: {
        nav: [
          { text: 'Utama', link: '/ms/' },
          { text: 'Panduan', link: '/ms/guide/getting-started' },
          { text: 'Ikon', link: '/ms/icons/' },
          {
            text: `v${pkg.version}`,
            items: [
              { text: 'Changelog', link: '/changelog' },
              { text: 'GitHub', link: 'https://github.com/bookklik-technologies/senangstart-icons' }
            ]
          }
        ],
        sidebar: {
          '/ms/guide/': [
            {
              text: 'Pengenalan',
              items: [
                { text: 'Bermula', link: '/ms/guide/getting-started' },
                { text: 'Pemasangan', link: '/ms/guide/installation' },
                { text: 'Penggunaan', link: '/ms/guide/usage' }
              ]
            },
            {
              text: 'Penyesuaian',
              items: [
                { text: 'Penggayaan', link: '/ms/guide/styling' },
                { text: 'Konfigurasi', link: '/ms/guide/configuration' }
              ]
            }
          ],
          '/ms/icons/': [
            {
              text: 'Pustaka Ikon',
              items: [
                { text: 'Semua Ikon', link: '/ms/icons/' }
              ]
            },
            {
              text: 'Ikon',
              collapsed: false,
              items: iconSidebarItemsMs
            }
          ]
        },
        footer: {
          message: 'Dikeluarkan di bawah Lesen MIT.',
          copyright: 'Hakcipta © 2025 Bookklik Technologies'
        }
      }
    }
  },

  themeConfig: {
    ...sharedThemeConfig,
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Icons', link: '/icons/' },
      {
        text: `v${pkg.version}`,
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'GitHub', link: 'https://github.com/bookklik-technologies/senangstart-icons' }
        ]
      }
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
            { text: 'All Icons', link: '/icons/' }
          ]
        },
        {
          text: 'Icons',
          collapsed: false,
          items: iconSidebarItems
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
