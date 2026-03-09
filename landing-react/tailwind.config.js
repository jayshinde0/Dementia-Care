/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF9', // Warm off-white
        primary: {
          light: '#06B6D4', // Soft ocean teal light
          DEFAULT: '#0891B2', // Soft ocean teal
          dark: '#0E7490'
        },
        accent: {
          DEFAULT: '#14B8A6', // Calming teal accent
          light: '#5EEAD4'
        },
        alert: {
          DEFAULT: '#FB7185', // Warm coral for alerts
          light: '#FDA4AF'
        },
        navy: {
          DEFAULT: '#0F172A', // Deep navy for text
          light: '#1E293B'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'SF Pro Display', 'sans-serif'],
      },
      boxShadow: {
        'floating': '0 25px 50px -12px rgba(0, 0, 0, 0.10)',
        'widget': '0 10px 30px -5px rgba(8, 145, 178, 0.15)',
        'inner': 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'sm': '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        'md': '0 4px 12px 0 rgba(0, 0, 0, 0.06)',
        'lg': '0 8px 24px 0 rgba(0, 0, 0, 0.08)',
        'xl': '0 16px 48px 0 rgba(0, 0, 0, 0.10)',
        '2xl': '0 24px 64px 0 rgba(0, 0, 0, 0.12)'
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
        'full': '9999px'
      },
      backgroundImage: {
        'gradient-mesh': 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
      }
    },
  },
  plugins: [],
}
