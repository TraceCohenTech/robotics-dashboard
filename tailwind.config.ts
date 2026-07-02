import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "SF Mono", "Menlo", "monospace"],
      },
      colors: {
        // Systematic dark-mode gray scale (Geist-inspired semantic steps)
        // 100-300: backgrounds, 400-600: borders, 700-800: fills, 900-1000: text
        gray: {
          100: '#0a0a0a',  // deep bg
          200: '#111111',  // hover bg
          300: '#171717',  // active bg / card bg
          400: '#222222',  // default border
          500: '#333333',  // hover border
          600: '#444444',  // active border
          700: '#666666',  // disabled text / muted fill
          800: '#999999',  // secondary text
          900: '#cccccc',  // secondary text (light)
          1000: '#eeeeee', // primary text
        },
      },
      letterSpacing: {
        'heading-xl': '-0.04em',
        'heading-lg': '-0.03em',
        'heading-md': '-0.02em',
      },
      transitionTimingFunction: {
        'geist': 'cubic-bezier(0.175, 0.885, 0.32, 1.1)',
      },
      boxShadow: {
        // Geist elevation hierarchy (adapted for dark theme)
        'card': '0 1px 2px rgba(255, 255, 255, 0.03)',
        'popover': '0 1px 1px rgba(255,255,255,0.02), 0 4px 8px -4px rgba(0,0,0,0.3), 0 16px 24px -8px rgba(0,0,0,0.3)',
        'modal': '0 1px 1px rgba(255,255,255,0.02), 0 8px 16px -4px rgba(0,0,0,0.4), 0 24px 32px -8px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
