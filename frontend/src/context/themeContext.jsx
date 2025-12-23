import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const themes = ["gold", "dark", "orange", "imperial"];
const themeClasses = {
  gold: "theme-gold",
  dark: "theme-dark",
  orange: "theme-orange",
  imperial: "theme-imperial",
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return themes.includes(saved) ? saved : "gold";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const html = document.documentElement;

    // Remove todas as classes de tema
    Object.values(themeClasses).forEach((cls) => html.classList.remove(cls));

    // Adiciona a classe correspondente ao tema atual
    html.classList.add(themeClasses[theme]);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((t) => {
      const idx = themes.indexOf(t);
      return themes[(idx + 1) % themes.length];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
