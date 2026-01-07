import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-brand-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-surface/80 backdrop-blur-md shadow-soft p-6">
        <h2 className="text-xl font-display text-brand-text mb-6">
          Painel Admin
        </h2>
        <nav className="space-y-3">
          <Link
            to="/admin/dashboard"
            className="block px-3 py-2 rounded-lg btn-secondary border-2 border-yellow-500 hover:btn-accent transition-colors"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="block px-3 py-2 rounded-lg btn-secondary border-2 border-yellow-500 hover:btn-accent transition-colors"
          >
            📦 Produtos
          </Link>
          <Link
            to="/admin/orders"
            className="block px-3 py-2 rounded-lg btn-secondary border-2 border-yellow-500 hover:btn-accent transition-colors"
          >
            🧾 Pedidos
          </Link>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1">
        <div className="px-4 md:px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
