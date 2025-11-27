import { useTheme } from "../context/themeProvider";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Simulação: altere para true se quiser ver menu de Admin
  const [isAdmin] = useState(true);

  // Destaque inicial no logo
  const [highlight, setHighlight] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setHighlight(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogoClick = () => {
    if (theme === "theme1") setTheme("theme2");
    else if (theme === "theme2") setTheme("theme3");
    else setTheme("theme1");
  };

  // Itens de navegação para clientes
  const navItemsUser = [
    { label: "Produtos", href: "/products" },
    { label: "Carrinho", href: "/cart" },
    { label: "Meus Pedidos", href: "/my-orders" },
    { label: "Cadastro", href: "/register" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border backdrop-blur bg-brand-surface/80 transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* Logo à esquerda (clique alterna tema) */}
        <button
          onClick={handleLogoClick}
          aria-label="Alternar tema"
          className={`flex items-center gap-3 group transition-transform duration-300 ${
            highlight ? "logo-highlight" : ""
          }`}
        >
          <img
            src="/images/Logo-Parfun-Imports.jpg"
            alt="Parfun Imports"
            className="h-10 w-10 object-cover rounded-full border border-brand-border group-hover:scale-105 group-active:scale-95 transition-transform duration-300 cursor-pointer"
          />
          <span className="font-display text-xl text-brand-text tracking-wide transition-colors duration-500">
            Parfun Imports
          </span>
        </button>

        {/* Navegação central */}
        <nav className="hidden md:flex items-center gap-2">
          {navItemsUser.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-full border transition-all duration-500 ${
                  isActive
                    ? "bg-brand-accent text-black border-brand-border"
                    : "text-brand-text border-transparent hover:border-brand-border hover:bg-brand-surface/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Dropdown Admin */}
          {isAdmin && (
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-full border transition-all duration-500 ${
                  location.pathname.startsWith("/admin")
                    ? "bg-brand-accent text-black border-brand-border"
                    : "text-brand-text border-transparent hover:border-brand-border hover:bg-brand-surface/60"
                }`}
              >
                Admin ▾
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-lg border border-brand-border bg-brand-surface shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  to="/admin/products"
                  className="block px-4 py-2 text-brand-text hover:bg-brand-surface/60 transition-colors duration-300"
                >
                  Admin Produtos
                </Link>
                <Link
                  to="/admin/orders"
                  className="block px-4 py-2 text-brand-text hover:bg-brand-surface/60 transition-colors duration-300"
                >
                  Admin Pedidos
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Ações à direita */}
        <div className="flex items-center gap-2">
          <Link
            to="/checkout"
            className="px-3 py-2 rounded-full bg-brand-accent text-black hover:opacity-90 transition-colors duration-500"
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </header>
  );
}
