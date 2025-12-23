import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const allThemes = ["gold", "dark", "orange", "imperial"];

export function ThemeProvider({ children }) {
  // ✅ Carrega temas habilitados do localStorage, filtrando apenas válidos
  const [enabledThemes, setEnabledThemes] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("enabledThemes"));
      if (Array.isArray(saved)) {
        return saved.filter((t) => allThemes.includes(t));
      }
    } catch {
      // ignore parse errors
    }
    return ["gold", "dark"];
  });

  // ✅ Carrega tema atual do localStorage, validando se é válido
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return allThemes.includes(saved) ? saved : "gold";
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
    if (!allThemes.includes(t)) return; // ignora temas inválidos
    setEnabledThemes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cycleTheme,
        enabledThemes,
        toggleThemeAvailability,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
