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
        'purple-50': '#FBE5FF',
        'purple-200': '#F099FF',
        'purple-500': '#BC00DD',
        'blue-50': '#E6F6FE',
        'blue-200': '#9DDCFB',
        'blue-300': '#6BCAFA',
        'blue-500': '#0784C3',
        'yellow-50': '#FFF8E5',
        'yellow-300': '#FFD466',
        'yellow-500': '#FFB700',
        'yellow-600': '#CC9200',
        'primary-gray': '#D9D9D9',
      }
    },
  },
  plugins: [],
};
export default config;
