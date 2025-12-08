import React from "react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-brand-bg px-6 py-12">
      <div className="max-w-4xl mx-auto bg-brand-surface rounded-xl shadow-soft p-8">
        <h2 className="text-3xl font-display text-brand-text mb-6">
          Bem-vindo ao Painel Administrativo
        </h2>
        <p className="text-brand-textMuted">
          Aqui você pode gerenciar produtos, pedidos e configurações da empresa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
            href="/admin"
            className="btn-secondary text-center py-4 rounded-xl shadow-md hover:scale-105 transition"
          >
            Configurações
          </a>
        </div>
        <div className="mt-12 text-sm text-brand-muted text-center">
          Último acesso: {new Date().toLocaleString("pt-BR")}
        </div>
      </div>
    </main>
  );
}
