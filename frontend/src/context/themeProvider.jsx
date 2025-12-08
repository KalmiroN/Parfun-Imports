import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Todos os temas possíveis
  const allThemes = ["gold", "dark", "orange", "imperial"];

  // ✅ Por padrão, apenas gold e dark habilitados
  const [enabledThemes, setEnabledThemes] = useState(() => {
    const saved = localStorage.getItem("enabledThemes");
    return saved ? JSON.parse(saved) : ["gold", "dark"];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "gold";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove(...allThemes.map((t) => `theme-${t}`));
    html.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
    localStorage.setItem("enabledThemes", JSON.stringify(enabledThemes));
  }, [theme, enabledThemes]);

  // ✅ Alterna apenas entre os temas habilitados
  const cycleTheme = () => {
    const currentIndex = enabledThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % enabledThemes.length;
    setTheme(enabledThemes[nextIndex]);
  };

  // ✅ Admin pode habilitar/desabilitar temas
  const toggleThemeAvailability = (t) => {
    setEnabledThemes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  return (
    <ThemeContext.Provider
      value={{ theme, cycleTheme, enabledThemes, toggleThemeAvailability }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
