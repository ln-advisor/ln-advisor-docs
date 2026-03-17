import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LN Advisor Docs',
  description: 'Product and architecture documentation for LN Advisor',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Install', link: '/' },
      { text: 'Product', link: '/product' },
      { text: 'Architecture', link: '/architecture' },
    ],
    sidebar: [
      { text: 'Install and Run', link: '/' },
      { text: 'Product', link: '/product' },
      { text: 'LNC', link: '/lnc' },
      { text: 'Channel Fees', link: '/channelfees' },
      { text: 'Openings', link: '/openings' },
      { text: 'Node Analysis', link: '/nodeanalysis' },
      { text: 'Private Pipeline', link: '/privatepipeline' },
      { text: 'Props', link: '/props' },
      { text: 'Architecture', link: '/architecture' },
    ],
    search: {
      provider: 'local',
    },
  },
})
