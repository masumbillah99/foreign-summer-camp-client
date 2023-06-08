/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: false,
    darkTheme: "light",
    styled: true,
    utils: true,
  },
  plugins: [require("daisyui")],
};
