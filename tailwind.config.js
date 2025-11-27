/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // permite alternar tema escuro
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // procura classes em todos os arquivos JS/JSX
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "var(--color-bg)",
          text: "var(--color-text)",
          primary: "var(--color-primary)",
          accent: "var(--color-accent)",
          border: "var(--color-border)",
          muted: "var(--color-muted)",
          surface: "var(--color-surface)",
          overlay: "var(--color-overlay)",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"], // títulos elegantes
        sans: ["Inter", "system-ui", "sans-serif"], // texto padrão
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)", // sombra suave para cards
      },
    },
  },
  plugins: [],
};
