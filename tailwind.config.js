/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          50: 'oklch(var(--background-50) / <alpha-value>)',
          100: 'oklch(var(--background-100) / <alpha-value>)',
          200: 'oklch(var(--background-200) / <alpha-value>)',
          300: 'oklch(var(--background-300) / <alpha-value>)',
        },
        primary: {
          50: 'oklch(var(--primary-50) / <alpha-value>)',
          100: 'oklch(var(--primary-100) / <alpha-value>)',
          400: 'oklch(var(--primary-400) / <alpha-value>)',
          500: 'oklch(var(--primary-500) / <alpha-value>)',
          600: 'oklch(var(--primary-600) / <alpha-value>)',
        },
        accent: {
          400: 'oklch(var(--accent-400) / <alpha-value>)',
          500: 'oklch(var(--accent-500) / <alpha-value>)',
        },
        foreground: {
          500: 'oklch(var(--foreground-500) / <alpha-value>)',
          600: 'oklch(var(--foreground-600) / <alpha-value>)',
          700: 'oklch(var(--foreground-700) / <alpha-value>)',
          950: 'oklch(var(--foreground-950) / <alpha-value>)',
        },
      },
      opacity: {
        98: '.98',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
