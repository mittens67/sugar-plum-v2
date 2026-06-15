import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}", // Add this if you have a top-level ui folder
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Add this if components is NOT inside src
  ],
  theme: {
    extend: {
      colors: {
        // Sugar Plum Palette
        primary: {
          DEFAULT: "#C5A059", // Antique Gold
          light: "#E2CFAB",   // Soft Gold for hovers/tints
        },
        secondary: {
          DEFAULT: "#906B9A", // Muted Lavender
        },
        text: {
          DEFAULT: "#4A1E4D", // Deep Plum
        },
        accent: {
          DEFAULT: "#906B9A", // Muted Lavender
        },
        background: {
          DEFAULT: "#FFF9F0", // Creamy Vanilla
        }
      },
      borderRadius: {
        card:      '2rem',    // primary card — replaces rounded-[2rem] / rounded-3xl
        'card-lg': '2.5rem', // large panel — replaces rounded-[2.5rem] / rounded-4xl
        'card-xl': '3rem',   // hero sections — replaces rounded-[3rem]
        modal:     '2rem',   // modal panels
      },
      boxShadow: {
        card:          '0 10px 30px rgba(74,30,77,0.07)',
        'card-hover':  '0 20px 40px rgba(74,30,77,0.13)',
        modal:         '0 0 50px rgba(0,0,0,0.28)',
        promo:         '0 20px 50px rgba(74,30,77,0.15)',
        nav:           '0 10px 30px rgba(74,30,77,0.05)',
      },
    },
  },
  plugins: [],
};

export default config;