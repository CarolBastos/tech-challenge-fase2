import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //brand-colors
        "primary-500": "#004D61",
        "secondary-500": "#FF5031",
        "tertiary-500": "#47A138",
        "tertiary-400": "#E4EDE3",
        "tertiary-300": "#DEE9EA",
        //neutral-colors
        "neutral-400": "#000000",
        "neutral-300": "#CBCBCB",
        "neutral-200": "#F5F5F5",
        "neutral-100": "#FFFFFF",
        //extra-colors
        //warning-colors
      },
    },
    fontSize: {
      xxs:'0.75rem', //12px
      xs:'0.875rem', //14px
      sm:'1rem', //16px
      md:'1.125rem', //18px
      lg:'1.25rem', //20px
      xl:'1.5625rem', //25px
      '2xl':'1.75rem', //28px
      '3xl':'1.938rem', //31px
    },
    maxWidth: {
      'sm': '19.5rem',
      'md': '37.5rem',
      'lg': '75rem',
      'hero': '27.125rem',
    },
    fontFamily: {
      inter: "Inter, sans-serif",
    },
  },
  plugins: [],
};
export default config;
