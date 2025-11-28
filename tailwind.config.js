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
    },
  },
  plugins: [],
};
