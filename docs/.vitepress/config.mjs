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
  logo: '/assets/ss-logo.svg',
  socialLinks: [
    { icon: 'github', link: 'https://github.com/bookklik-technologies/senangstart-icons' }
  ],
  footer: {
    message: 'SenangStart Icons v' + pkg.version + ' is part of the <a href="https://senangstart.com/" target="_blank" style="color: var(--vp-c-brand)">SenangStart</a> ecosystem.',
    copyright: `Copyright © ${new Date().getFullYear()} <a href="https://bookklik.com/" target="_blank" style="color: #ff6600">Bookklik Technologies</a>. Released under the MIT License.`
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

    search: {
      provider: 'local'
    }
  },

  markdown: {
    config: (md) => {
      md.core.ruler.push('replace_version', (state) => {
        state.tokens.forEach((token) => {
          if (token.type === 'fence' && token.content.includes('__PKG_VERSION__')) {
            token.content = token.content.replace(/__PKG_VERSION__/g, pkg.version)
          }
        })
      })
    }
  }
})
