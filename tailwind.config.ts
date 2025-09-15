import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        test: "#F0427D",
        primary: {
          DEFAULT: "#F0427D",
          light: "#F04271",
        },
        text: {
          DEFAULT: "#1C0D1C",
        },
        accent: {
          DEFAULT: "#994D99",
        },
      },
    },
  },
  plugins: [],
};

export default config;
