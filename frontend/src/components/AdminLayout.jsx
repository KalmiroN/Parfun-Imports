import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Recupera tema salvo ou usa "dark" como fallback
    const appliedTheme = localStorage.getItem("theme") || "dark";

    document.documentElement.classList.remove("theme-dark", "theme-gold");
    document.documentElement.classList.add(
      appliedTheme === "dark" ? "theme-dark" : "theme-gold"
    );
  }, [location.pathname]); // ✅ reaplica ao navegar

  // ✅ Ordem fixa dos links
  const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/products", label: "Produtos" },
    { to: "/admin/orders", label: "Pedidos" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Aside do admin → usa cor exclusiva */}
      <aside className="w-64 p-6 flex flex-col gap-6 bg-[var(--admin-aside-bg)] text-[var(--color-text)]">
        <h2 className="text-xl font-display font-bold mb-4">Administração</h2>
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.to} // chave estável evita embaralhamento
              to={link.to}
              className="btn-secondary text-center"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main interna do admin → usa cor exclusiva */}
      <main className="flex-1 p-8 overflow-y-auto bg-[var(--admin-main-bg)] text-[var(--color-text)]">
        {children}
      </main>
    </div>
  );
}
