import React from "react";
import { useRoles } from "../hooks/useRoles"; // ✅ hook que criamos para roles

export default function Dashboard() {
  const { isAdmin, isAdminSecondary, isClient, roles } = useRoles();

  return (
    <main className="min-h-screen bg-brand-bg px-6 py-12">
      <div className="max-w-5xl mx-auto bg-brand-surface rounded-xl shadow-soft p-8">
        <h2 className="text-3xl font-display text-brand-text mb-6">
          Bem-vindo ao Dashboard
        </h2>
        <p className="text-brand-textMuted">
          Seu painel personalizado de acordo com seu perfil de acesso.
        </p>

        {/* Seções para CLIENTE */}
        {isClient && (
          <div className="mt-8">
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
          </div>
        )}

        {/* Seções para ADMIN SECUNDÁRIO */}
        {isAdminSecondary && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-brand-text mb-4">
              Área Administrativa (Secundário)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        )}

        {/* Seções para ADMIN */}
        {isAdmin && (
          <div className="mt-12">
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
          </div>
        )}

        {/* Informações extras */}
        <div className="mt-12 text-sm text-brand-muted text-center">
          Último acesso: {new Date().toLocaleString("pt-BR")}
          <br />
          Suas roles: {roles.join(", ")}
        </div>
      </div>
    </main>
  );
}
