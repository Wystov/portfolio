/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
  darkMode: 'selector',
};
