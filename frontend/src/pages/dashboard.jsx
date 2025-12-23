import React from "react";
import { useRoles } from "../hooks/useRoles"; // ✅ hook que criamos para roles

export default function Dashboard() {
  const { isAdmin, isAdminSecondary, isClient, roles } = useRoles();

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/images/background_files/gold-backgraund-02.jpg')",
      }}
    >
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Card central */}
      <div className="relative z-10 max-w-5xl w-full p-12 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-strong">
        <h2 className="font-display text-4xl text-brand-text mb-6 text-center select-none">
          Bem-vindo ao Dashboard
        </h2>
        <p className="text-brand-textMuted text-center mb-10">
          Seu painel personalizado de acordo com seu perfil de acesso.
        </p>

        {/* Seções para CLIENTE */}
        {isClient && (
          <section className="mt-8">
            <h3 className="text-xl font-semibold text-brand-text mb-4">
              Área do Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="/my-orders"
                className="btn-accent text-center py-4 rounded-xl shadow-md hover:scale-105 transition"
              >
                Meus Pedidos
              </a>
              <a
                href="/wishlist"
                className="btn-accent text-center py-4 rounded-xl shadow-md hover:scale-105 transition"
              >
                Minha Wishlist
              </a>
              <a
                href="/profile"
                className="btn-secondary text-center py-4 rounded-xl shadow-md hover:scale-105 transition"
              >
                Meu Perfil
              </a>
            </div>
          </section>
        )}

        {/* Seções para ADMIN SECUNDÁRIO */}
        {isAdminSecondary && (
          <section className="mt-12">
            <h3 className="text-xl font-semibold text-brand-text mb-4">
              Área Administrativa (Secundário)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="/admin/products"
                className="btn-accent text-center py-4 rounded-xl shadow-md hover:scale-105 transition"
              >
                Gerenciar Produtos
              </a>
              <a
                href="/admin/orders"
                className="btn-accent text-center py-4 rounded-xl shadow-md hover:scale-105 transition"
              >
                Gerenciar Pedidos
              </a>
            </div>
          </section>
        )}

        {/* Seções para ADMIN */}
        {isAdmin && (
          <section className="mt-12">
            <h3 className="text-xl font-semibold text-brand-text mb-4">
              Área Administrativa (Admin)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="/admin/products"
                className="btn-accent text-center py-4 rounded-xl shadow-md hover:scale-105 transition"
              >
                Produtos
              </a>
              <a
                href="/admin/orders"
                className="btn-accent text-center py-4 rounded-xl shadow-md hover:scale-105 transition"
              >
                Pedidos
              </a>
              <a
                href="/admin/manage-roles"
                className="btn-secondary text-center py-4 rounded-xl shadow-md hover:scale-105 transition"
              >
                Gerenciar Roles
              </a>
            </div>
          </section>
        )}

        {/* Informações extras */}
        <div className="mt-12 text-sm text-brand-muted text-center">
          Último acesso: {new Date().toLocaleString("pt-BR")}
          <br />
          Suas roles:{" "}
          {roles.length > 0 ? roles.join(", ") : "Nenhuma role atribuída"}
        </div>
      </div>
    </main>
  );
}
