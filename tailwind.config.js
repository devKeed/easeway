const { join } = require("path");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    join(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./app/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D3B20",
        secondary: "#BF0517",
      },
      fontFamily: {
        uber: ["Uber Move", "sans-serif"],
        axiforma: ["Axiforma", "sans-serif"],
        american: ["American Purpose", "serif"],
      },
      fontSize: {
        // Desktop heading sizes
        "h1-desktop": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }], // 56px
        "h2-desktop": ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }], // 40px
        "h3-desktop": ["2rem", { lineHeight: "1.3", fontWeight: "600" }], // 32px
        "h4-desktop": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }], // 24px
        "h5-desktop": ["1.25rem", { lineHeight: "1.4", fontWeight: "500" }], // 20px
        "h6-desktop": ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }], // 18px

        // Mobile heading sizes
        "h1-mobile": ["2.5rem", { lineHeight: "1.1", fontWeight: "700" }], // 40px
        "h2-mobile": ["2rem", { lineHeight: "1.2", fontWeight: "600" }], // 32px
        "h3-mobile": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }], // 24px
        "h4-mobile": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }], // 20px
        "h5-mobile": ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }], // 18px
        "h6-mobile": ["1rem", { lineHeight: "1.4", fontWeight: "500" }], // 16px

        // Smaller heading sizes for non-hero sections
        "h1-small": ["2rem", { lineHeight: "1.1", fontWeight: "700" }], // 32px
        "h2-small": ["1.75rem", { lineHeight: "1.2", fontWeight: "600" }], // 28px
        "h3-small": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }], // 24px
        "h4-small": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }], // 20px
        "h5-small": ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }], // 18px
        "h6-small": ["1rem", { lineHeight: "1.4", fontWeight: "500" }], // 16px

        // Body text sizes
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }], // 18px
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }], // 16px
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }], // 14px
        "body-xs": ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }], // 12px

        // Button text sizes
        "button-lg": ["1rem", { lineHeight: "1.5", fontWeight: "600" }], // 16px
        button: ["0.875rem", { lineHeight: "1.5", fontWeight: "600" }], // 14px
        "button-sm": ["0.75rem", { lineHeight: "1.4", fontWeight: "600" }], // 12px

        // Legacy compatibility
        h1: ["2.5rem", { fontWeight: "700" }],
        h2: ["1.8rem", { fontWeight: "700" }],
        h3: ["1.5rem", { fontWeight: "700" }],
        h4: ["1.25rem", { fontWeight: "700" }],
        h5: ["1rem", { fontWeight: "700" }],
        h6: ["0.875rem", { fontWeight: "700" }],
        body: ["16px", { fontWeight: "400" }],
        small: ["14px", { fontWeight: "500" }],
        button: ["16px", { fontWeight: "600" }],
        base: ["16px", { fontWeight: "500" }],
      },
      screens: {
        xs: "475px",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
    },
  },
  plugins: [],
};
