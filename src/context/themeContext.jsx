import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "gold";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const html = document.documentElement;
    html.classList.remove("theme-gold", "theme-dark", "theme-orange");
    if (theme === "gold") html.classList.add("theme-gold");
    if (theme === "dark") html.classList.add("theme-dark");
    if (theme === "orange") html.classList.add("theme-orange");
  }, [theme]);

  const cycleTheme = () => {
    setTheme((t) => (t === "gold" ? "dark" : t === "dark" ? "orange" : "gold"));
  };

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
