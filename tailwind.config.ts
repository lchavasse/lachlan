import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ['Crimson Pro', 'serif'],
        'sans': ['Afacad', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(var(--foreground-rgb))',
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
