import { useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { toast } from "react-toastify";
import EditOrderModal from "./components/EditOrderModal";
import CustomerInfoModal from "./components/CustomerInfoModal";
import AdminLayout from "../../components/AdminLayout";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    customer: "",
    orderId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.status) params.append("status", filters.status);
        if (filters.customer) params.append("customer", filters.customer);
        if (filters.orderId) params.append("orderId", filters.orderId);
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

  const traduzirStatus = (status) => {
    switch (status) {
      case "pending":
        return "Status do pedido: Aguardando pagamento";
      case "processing":
        return "Status do pedido: Em processamento";
      case "shipped":
        return "Status do pedido: Enviado";
      case "completed":
        return "Status do pedido: Concluído";
      case "cancelled":
        return "Status do pedido: Cancelado";
      default:
        return "Status do pedido: Desconhecido";
    }
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(
      "O pedido foi cancelado com êxito, ainda assim, deseja realmente excluir permanentemente o pedido?"
    );
    if (!confirmDelete) return;

    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`,
        { method: "DELETE" }
      );
      toast.success("Pedido excluído com sucesso!");
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      toast.error(err.message || "Erro ao excluir pedido");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-brand-text text-lg">Carregando pedidos...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-8">
          Administração de Pedidos
        </h2>

        {/* Filtros */}
        <div className="admin-orders-filters mb-8">
          <h3 className="text-xl font-display text-brand-text mb-4">Filtros</h3>

          {/* Primeira linha: status + datas */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="input-field flex-1"
            >
              <option value="">Todos os Status</option>
              <option value="pending">Aguardando pagamento</option>
              <option value="processing">Em processamento</option>
              <option value="shipped">Enviado</option>
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
            </select>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="input-field flex-1"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="input-field flex-1"
            />
          </div>

          {/* Segunda linha: cliente + número do pedido + lupa */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Cliente"
              value={filters.customer}
              onChange={(e) =>
                setFilters({ ...filters, customer: e.target.value })
              }
              className="input-field flex-1"
            />
            <input
              type="text"
              placeholder="Número do pedido"
              value={filters.orderId}
              onChange={(e) =>
                setFilters({ ...filters, orderId: e.target.value })
              }
              className="input-field flex-1"
            />
            <button
              onClick={() => toast.info("Buscando pedidos...")}
              className="btn-accent flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
              Buscar
            </button>
          </div>
        </div>

        {/* Lista de pedidos */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-textMuted text-lg">
              Nenhum pedido encontrado.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="admin-order-card relative">
                {/* Cabeçalho com botão excluir */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-display text-brand-text">
                    Pedido #{order.id} - {order.customerName}
                  </h3>
                  {order.status === "cancelled" && (
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="remove-btn px-4 py-2 rounded-full"
                    >
                      Excluir pedido
                    </button>
                  )}
                </div>

                <p className="text-brand-textMuted">
                  Total: R$ {order.total} | {traduzirStatus(order.status)}
                </p>
                <p className="text-brand-textMuted">
                  Data: {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                </p>
                {/* Botões de ação */}
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 btn-accent text-center"
                  >
                    Atualização de Pedidos
                  </button>
                  <button
                    onClick={() => setSelectedCustomer(order)}
                    className="flex-1 btn-secondary text-center"
                  >
                    Exibir endereço
                  </button>
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

      {/* Modal de informações do cliente */}
      {selectedCustomer && (
        <CustomerInfoModal
          order={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </AdminLayout>
  );
}
