module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-bg": "var(--color-bg)",
        "brand-text": "var(--color-text)",
        "brand-muted": "var(--color-muted)",
        "brand-primary": "var(--color-primary)",
        "brand-accent": "var(--color-accent)",
        "brand-border": "var(--color-border)",
        "brand-surface": "var(--color-surface)",
        "brand-overlay": "var(--color-overlay)",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.08)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      keyframes: {
        slideInSlow: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutSlow: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        slideInSlow: "slideInSlow 2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        slideOutSlow: "slideOutSlow 2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};
