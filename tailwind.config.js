/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono , monospace",
    },

    extend: {
      colors: {
        pizza: "#123456 ",
      },

      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },

      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};

/// we had this fontfaily custom font set to pizza at first,  but if you wnat to set the font on the whole app you type sans: custom font

/// this is a link to the default configuration of tailwind, just to see how to customize tailwind classes,

//https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
