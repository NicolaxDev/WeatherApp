/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
  
      },
      fontFamily: {
        quicksand: ["var(--font-quicksand)", "sans-serif"],
        bungee: ["var(--font-bungee)", "cursive"],
      },
    },
  },
  plugins: [],
};
