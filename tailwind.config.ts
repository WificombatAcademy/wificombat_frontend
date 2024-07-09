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
        'black-200': '#CBCBCD',
        'black-500': '#131314',
        'black-700': '#4B4B4E',
        'black-800': '#323234',
        'purple-500': '#BC00DD',
        'blue-500': '#0784C3',
        'yellow-500': '#FFB700',
        'blue-300': '#6BCAFA',
        'primary-gray': '#D9D9D9',
      }
    },
  },
  plugins: [],
};
export default config;
