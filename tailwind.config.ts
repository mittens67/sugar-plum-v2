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
    },
  },
  plugins: [],
};

export default config;