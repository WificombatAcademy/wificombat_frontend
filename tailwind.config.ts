import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-500': '#131314',
        'purple-500': '#BC00DD',
        'blue-500': '#0784C3',
        'yellow-500': '#FFB700',
        'blue-300': '#6BCAFA'
      }
    },
  },
  plugins: [],
};
export default config;
