import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../utils/authFetch"; // ✅ importa o utilitário

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/orders/my`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos");
        }

        const data = await response.json();
        setOrders(data); // ✅ backend retorna lista de pedidos
      } catch (err) {
        setError(err.message);
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
          Meus Pedidos
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        {orders.length === 0 ? (
          <p className="text-brand-textMuted">Você ainda não possui pedidos.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-4 transition-colors duration-500"
              >
                <h3 className="text-lg font-display text-brand-text">
                  Pedido #{order.id}
                </h3>
                <p className="text-brand-textMuted">
                  Data: {order.date} | Total: {order.total}
                </p>
                <p className="text-brand-textMuted">Status: {order.status}</p>

                {/* Botões de ação */}
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <Link
                    to={`/order/${order.id}`}
                    className="flex-1 px-4 py-2 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
                  >
                    Ver detalhes do pedido
                  </Link>
                  <Link
                    to="/products"
                    className="flex-1 px-4 py-2 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
                  >
                    Voltar ao catálogo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
