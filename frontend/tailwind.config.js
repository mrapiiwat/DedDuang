const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1B003F",
        secondary: "#D2B589",
        mybg: "#F2EFEA",
      },
      fontFamily: {
        Prompt: ["Prompt", "sans-serif"],
        PromptMedium: ["Prompt-Medium", "sans-serif"],
        PromptBold: ["Prompt-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
