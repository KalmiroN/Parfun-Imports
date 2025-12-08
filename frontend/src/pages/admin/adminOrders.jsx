import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import { toast } from "react-toastify";
import EditOrderModal from "./components/EditOrderModal";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/orders`
        );
        if (!response.ok) throw new Error("Erro ao carregar pedidos");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-brand-text">Carregando pedidos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Administração de Pedidos
        </h2>

        {orders.length === 0 ? (
          <p className="text-brand-textMuted">Nenhum pedido encontrado.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-4 transition-colors duration-500"
              >
                <h3 className="text-lg font-display text-brand-text">
                  Pedido #{order.id} - {order.customerName}
                </h3>
                <p className="text-brand-textMuted">
                  Total: R$ {order.total} | Status: {order.status}
                </p>
                {order.invoiceNumber && (
                  <p className="text-brand-textMuted">
                    Nota Fiscal: {order.invoiceNumber}
                  </p>
                )}
                {order.companyCnpj && (
                  <p className="text-brand-textMuted">
                    CNPJ da empresa: {order.companyCnpj}
                  </p>
                )}

                {/* Botões de ação */}
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 px-4 py-2 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
                  >
                    Atualizar status
                  </button>
                  <Link
                    to="/admin"
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

      {selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onSave={async (updated) => {
            try {
              const response = await authFetch(
                `${import.meta.env.VITE_API_URL}/orders/${updated.id}`,
                {
                  method: "PUT",
                  body: JSON.stringify(updated),
                }
              );
              if (!response.ok) throw new Error("Erro ao atualizar pedido");
              toast.success("Pedido atualizado!");
              setSelectedOrder(null);
              // Atualiza lista local
              setOrders((prev) =>
                prev.map((o) => (o.id === updated.id ? updated : o))
              );
            } catch (err) {
              toast.error(err.message);
            }
          }}
        />
      )}
    </main>
  );
}
