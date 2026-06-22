import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
   
    extend: {
      colors: {
        brand: {
          orange: '#FF6B00',
          yellow: '#F5C518',
          dark:   '#0a0a0a',
          card:   '#161616',
          border: '#2a2a2a',
        },
      },
    
      screens: {
      
        'tv': '1920px',   
        'tv-4k': '3840px'
      },
      
      fontSize: {
        'tv-sm': ['18px', '1.6'],
        'tv-base': ['22px', '1.6'],
        'tv-lg': ['28px', '1.4'],
        'tv-xl': ['36px', '1.3'],
        'tv-2xl': ['48px', '1.2'],
      },
      // larger spacing so cards aren't cramped on TV
      spacing: {
        'tv': '3rem',
      },
    },
  },
  plugins: [],
}

export default config