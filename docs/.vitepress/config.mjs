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
      { text: 'GitHub', link: 'https://github.com/ln-advisor/ln-advisor-ui' },
    ],
    sidebar: [
      { text: 'Install and Run', link: '/' },
      { text: 'Product', link: '/product' },
      { text: 'LNC', link: '/lnc' },
      { text: 'Channel Fees', link: '/channelfees' },
      { text: 'Openings', link: '/openings' },
      { text: 'Node Analysis', link: '/nodeanalysis' },
      { text: 'Private Pipeline', link: '/privatepipeline' },
      { text: 'Architecture', link: '/architecture' },
    ],
    search: {
      provider: 'local',
    },
    footer: {
      message:
        '<a href="https://github.com/ln-advisor/ln-advisor-ui" target="_blank" rel="noreferrer" aria-label="LN Advisor UI GitHub" style="display:inline-flex;align-items:center;gap:8px;color:inherit;text-decoration:none;"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.22 1.84 1.22 1.08 1.82 2.82 1.29 3.5.98.11-.77.42-1.29.76-1.59-2.67-.3-5.47-1.31-5.47-5.86 0-1.3.47-2.36 1.23-3.2-.12-.3-.53-1.52.12-3.16 0 0 1.01-.32 3.3 1.22a11.57 11.57 0 0 1 6 0c2.28-1.54 3.29-1.22 3.29-1.22.66 1.64.25 2.86.12 3.16.77.84 1.23 1.9 1.23 3.2 0 4.56-2.81 5.55-5.49 5.85.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" /></svg><span>LN Advisor UI on GitHub</span></a>',
      copyright: 'Source repository',
    },
  },
})
