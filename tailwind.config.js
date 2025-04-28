import tailwindPrimeUI from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primeui/**/*.{js,ts,vue}',
    './node_modules/@primeui/themes/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': 'var(--color-primary)',
        'color-secondary': 'var(--color-secondary)',
        'color-teal': 'var(--color-teal)',
        'color-tomato': 'var(--color-tomato)',
      },
      options: {
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primeui, primevue, primevue-tailwind, tailwind-utilities;',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [tailwindPrimeUI],
}
