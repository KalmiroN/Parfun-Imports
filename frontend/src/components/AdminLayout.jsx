import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-surface shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Painel Admin</h2>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="block">
            📊 Dashboard
          </Link>
          <Link to="/admin/products" className="block">
            📦 Produtos
          </Link>
          <Link to="/admin/orders" className="block">
            🧾 Pedidos
          </Link>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
