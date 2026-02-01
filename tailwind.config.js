/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1020px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "#F8FAFC",
        foreground: "#0E172B",
        sidebar: "#FAFAFA",
        card: {
          DEFAULT: "#ffffff",
          border: "#E2E8F0",
        },
        primary: {
          DEFAULT: "#2A76DA",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          foreground: "#62748E",
        },
        accent: {
          blue: "#046EF8",
          green: "#22C55E",
          "green-light": "#ecfdf5",
        },
        text: {
          primary: "#0E172B",
          secondary: "#62748E",
          tertiary: "#94A3B8",
        },
        "deepcampusairoyal-blue": "var(--deepcampusairoyal-blue)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        "deepcampus-ai-arial-regular":
          "var(--deepcampus-ai-arial-regular-font-family)",
        "deepcampus-ai-inter-regular":
          "var(--deepcampus-ai-inter-regular-font-family)",
        "deepcampus-ai-inter-semi-bold":
          "var(--deepcampus-ai-inter-semi-bold-font-family)",
        "deepcampus-ai-semantic-button":
          "var(--deepcampus-ai-semantic-button-font-family)",
        "deepcampus-ai-semantic-heading-1":
          "var(--deepcampus-ai-semantic-heading-1-font-family)",
        "deepcampus-ai-semantic-input":
          "var(--deepcampus-ai-semantic-input-font-family)",
        "deepcampus-ai-semantic-label":
          "var(--deepcampus-ai-semantic-label-font-family)",
        "deepcampus-ai-semantic-link":
          "var(--deepcampus-ai-semantic-link-font-family)",
        "guiding-light-dash-lovable-app-inter-regular":
          "var(--guiding-light-dash-lovable-app-inter-regular-font-family)",
        "guiding-light-dash-lovable-app-semantic-heading-1":
          "var(--guiding-light-dash-lovable-app-semantic-heading-1-font-family)",
        "guiding-light-dash-lovable-app-semantic-link":
          "var(--guiding-light-dash-lovable-app-semantic-link-font-family)",
        "guiding-light-dash-lovable-app-semantic-link-underline":
          "var(--guiding-light-dash-lovable-app-semantic-link-underline-font-family)",
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
