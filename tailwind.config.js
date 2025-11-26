/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Aqui você pode adicionar extensões personalizadas se quiser
      // Exemplo: fontes, espaçamentos, breakpoints
      // Mas as cores já são controladas pelas variáveis CSS (theme.css + tokens.css)
    },
  },
  plugins: [],
};
