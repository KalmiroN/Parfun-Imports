import React from "react";
import { Outlet, Link } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Layout() {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-[var(--color-primary)] bg-[var(--color-bg)] text-[var(--color-text)]">
        {/* Logo / título */}
        <Link to="/" className="text-2xl font-bold text-[var(--color-primary)]">
          Parfum Imports
        </Link>

        {/* Navegação */}
        <nav className="flex gap-4">
          <Link
            to="/products"
            className="hover:text-[var(--color-primary)] transition"
          >
            Produtos
          </Link>
          <Link
            to="/cart"
            className="hover:text-[var(--color-primary)] transition"
          >
            Carrinho
          </Link>
          <Link
            to="/my-orders"
            className="hover:text-[var(--color-primary)] transition"
          >
            Meus Pedidos
          </Link>
          <Link
            to="/admin/products"
            className="hover:text-[var(--color-primary)] transition"
          >
            Admin
          </Link>
        </nav>

        {/* Botões de troca de tema */}
        <ThemeSwitcher />
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
