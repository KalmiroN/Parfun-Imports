import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        // ✅ Busca o último pedido do usuário logado
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/orders/last`
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar dados do pedido.");
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLastOrder();
  }, []);

  return (
    <main className="transition-colors duration-500">
      <Hero
        backgroundImage="/hero-confirmation.jpg"
        title="Pedido confirmado"
        subtitle="Obrigado pela compra! Você receberá um e-mail com os detalhes."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        {loading && <p className="text-brand-text">Carregando detalhes...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {order && (
          <div className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-6 mb-8">
            <h3 className="text-xl font-display text-brand-text mb-2">
              Pedido #{order.id}
            </h3>
            <p className="text-brand-textMuted">
              Data: {order.date} | Total: R$ {order.total}
            </p>
            <p className="text-brand-textMuted">Status: {order.status}</p>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/my-orders"
            className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
          >
            Ver meus pedidos
          </Link>
          <Link
            to="/products"
            className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </main>
  );
}
