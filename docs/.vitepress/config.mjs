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
