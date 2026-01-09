import { useEffect } from "react";

export default function AdminLayout({ children, theme }) {
  useEffect(() => {
    // Se não veio prop, tenta recuperar do localStorage
    const appliedTheme = theme || localStorage.getItem("theme") || "dark";

    // Atualiza classe no html
    document.documentElement.classList.remove("theme-dark", "theme-gold");
    document.documentElement.classList.add(
      appliedTheme === "dark" ? "theme-dark" : "theme-gold"
    );

    // Salva escolha
    localStorage.setItem("theme", appliedTheme);
  }, [theme]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-6 flex flex-col gap-4 bg-[var(--color-surface)] text-[var(--color-text)]">
        {/* ... links ... */}
      </aside>
      <main className="flex-1 p-8 overflow-y-auto bg-[var(--color-bg)] text-[var(--color-text)]">
        {children}
      </main>
    </div>
  );
}
