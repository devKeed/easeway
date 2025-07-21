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
        h1: ["2.5rem", { fontWeight: "700" }],
        h2: ["1.8rem", { fontWeight: "700" }],
        h3: ["1.5rem", { fontWeight: "700" }],
        h4: ["1.25rem", { fontWeight: "700" }],
        h5: ["1rem", { fontWeight: "700" }],
        h6: ["0.875rem", { fontWeight: "700" }],
        body: ["16px", { fontWeight: "400" }],
        small: ["14px", { fontWeight: "500" }],
        button: ["16px", { fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};
