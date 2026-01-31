/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111111",
        sidebar: "#FAFAFA",
        card: {
          DEFAULT: "#ffffff",
          border: "#E5E7EB",
        },
        primary: {
          DEFAULT: "#111111",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#F3F4F6",
          foreground: "#4B5563",
        },
        accent: {
          green: "#22C55E",
          "green-light": "#ecfdf5",
        },
        text: {
          primary: "#111111",
          secondary: "#6B7280",
          tertiary: "#9CA3AF",
        },
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        lg: "16px",
      },
      width: {
        sidebar: "280px",
      },
    },
  },
  plugins: [],
};
