import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import { toast } from "react-toastify";
import EditOrderModal from "./components/EditOrderModal";
import AdminLayout from "../../components/AdminLayout";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    customer: "",
    startDate: "",
    endDate: "",
  });

  // Carregar pedidos (rota admin)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.status) params.append("status", filters.status);
        if (filters.customer) params.append("customer", filters.customer);
        if (filters.startDate) params.append("startDate", filters.startDate);
        if (filters.endDate) params.append("endDate", filters.endDate);

        const url = `${import.meta.env.VITE_API_URL}/api/admin/orders${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        const res = await authFetch(url);
        setOrders(res.data || []);
      } catch (err) {
        toast.error(err.message || "Erro ao carregar pedidos");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [filters]);

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-brand-text">Carregando pedidos...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Administração de Pedidos
        </h2>

        {/* Filtros */}
        <div className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-6 mb-8">
          <h3 className="text-xl font-display text-brand-text mb-4">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="input-field"
            >
              <option value="">Todos os Status</option>
              <option value="pending">Pendente</option>
              <option value="processing">Em Processamento</option>
              <option value="shipped">Enviado</option>
              <option value="completed">Concluído</option>
            </select>
            <input
              type="text"
              placeholder="Cliente"
              value={filters.customer}
              onChange={(e) =>
                setFilters({ ...filters, customer: e.target.value })
              }
              className="input-field"
            />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="input-field"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="input-field"
            />
          </div>
        </div>

        {/* Lista de pedidos */}
        {orders.length === 0 ? (
          <p className="text-brand-textMuted">Nenhum pedido encontrado.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-4"
              >
                <h3 className="text-lg font-display text-brand-text">
                  Pedido #{order.id} - {order.customerName}
                </h3>
                <p className="text-brand-textMuted">
                  Total: R$ {order.total} | Status: {order.status}
                </p>
                <p className="text-brand-textMuted">
                  Data: {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                </p>

                {/* Botões de ação */}
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 px-4 py-2 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
                  >
                    Detalhes / Atualizar
                  </button>
                  <Link
                    to="/admin/dashboard"
                    className="flex-1 px-4 py-2 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
                  >
                    Voltar ao painel
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de edição */}
      {selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onSave={async (updated) => {
            try {
              await authFetch(
                `${import.meta.env.VITE_API_URL}/api/admin/orders/${
                  updated.id
                }`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(updated),
                }
              );
              toast.success("Pedido atualizado!");
              setSelectedOrder(null);
              setOrders((prev) =>
                prev.map((o) => (o.id === updated.id ? updated : o))
              );
            } catch (err) {
              toast.error(err.message || "Erro ao atualizar pedido");
            }
          }}
        />
      )}
    </AdminLayout>
  );
}
