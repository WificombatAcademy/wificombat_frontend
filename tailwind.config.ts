import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        spin: 'spin 1.5s linear infinite',
      },
      colors: {
        'black-50': '#F2F2F3',
        'black-100': '#E5E5E6',
        'black-200': '#CBCBCD',
        'black-300': '#B1B1B4',
        'black-400': '#96969C',
        'black-500': '#131314',
        'black-600': '#636369',
        'black-700': '#4B4B4E',
        'black-800': '#323234',
        'purple-50': '#FBE5FF',
        'purple-200': '#F099FF',
        'purple-300': '#E866FF',
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
      },

      screens:{
        md:'912px'
      },
      
      userSelect: {
        'none': 'none',
      }
    },
  },
  plugins: [],
};
export default config;