import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Carrega tema inicial do localStorage ou usa "theme1"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "theme1";
  });

  useEffect(() => {
    // Aplica o tema como atributo data-theme no body
    document.body.setAttribute("data-theme", theme);

    // Salva tema no localStorage
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
