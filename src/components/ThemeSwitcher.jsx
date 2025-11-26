import React from "react";
import { useTheme } from "../context/themeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "theme1", label: "Tema 1" },
    { id: "theme2", label: "Tema 2" },
    { id: "theme3", label: "Tema 3" },
  ];

  return (
    <div className="flex gap-2">
      {themes.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`px-4 py-2 rounded-lg border-2 transition duration-200
            ${
              theme === id
                ? "bg-[var(--color-primary)] text-white font-bold border-[var(--color-accent)] shadow-md"
                : "bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
