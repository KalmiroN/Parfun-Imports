import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Contexto de tema
import { ThemeProvider } from "./context/themeProvider";

// Estilos globais
import "./styles/tokens.css";
import "./styles/theme.css";
import "./index.css"; // Tailwind base, components e utilities

// Renderização principal
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
