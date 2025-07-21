const { join } = require("path");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", join(__dirname, "./src/**/*.{js,ts,jsx,tsx}")],
  theme: {
    extend: {
      colors: {
        primary: "#1D3B20",
        secondary: "#BF0517",
      },
      fontFamily: {
        uber: ["Uber Move", "sans-serif"],
      },
      fontSize: {
        h1: ["4.5rem", { fontWeight: "700" }],
        h2: ["3.5rem", { fontWeight: "700" }],
        h3: ["2.5rem", { fontWeight: "700" }],
        h4: ["2rem", { fontWeight: "700" }],
        h5: ["1.5rem", { fontWeight: "700" }],
        h6: ["1.25rem", { fontWeight: "700" }],
        body: ["18px", { fontWeight: "400" }],
        small: ["16px", { fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};
