import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#13EC5B',
        'primary-gold': '#D4A017',
        'primary-red': '#C0392B',
        'dark-bg': '#221C10',
        'dark-text': '#181611',
        'gray-warm': '#A19886',
        'gray-border': '#3C3629',
        'cream': '#F8F7F5',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        newsreader: ['var(--font-newsreader)', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        noto: ['var(--font-noto-sans)', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
      },
      spacing: {
        '17': '4.25rem',
        '22': '5.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '62': '15.5rem',
        '69': '17.25rem',
        '87': '21.75rem',
        '88': '22rem',
        '98': '24.5rem',
        '126': '31.5rem',
        '152': '38rem',
        '160': '40rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        '6xl': '72rem',
        '7xl': '80rem',
      },
    },
  },
} satisfies Config;
