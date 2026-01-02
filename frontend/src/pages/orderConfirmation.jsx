import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import { useAuth } from "../context/AuthProvider";

export default function OrderConfirmation() {
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Você precisa estar logado para ver seu pedido.");
      setLoading(false);
      return;
    }

    const fetchLastOrder = async () => {
      try {
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/orders/last`,
          {},
          token
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
  }, [token]);

  return (
    <main className="transition-colors duration-500">
      <Hero
        backgroundImage="/hero-confirmation.jpg"
        title="Pedido confirmado"
        subtitle="Obrigado pela compra! Você receberá um e-mail com os detalhes."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        {loading && <p className="text-brand-text">Carregando detalhes...</p>}
        {error && (
          <div>
            <p className="text-red-500 mb-4">{error}</p>
            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500"
            >
              Voltar ao catálogo
            </Link>
          </div>
        )}

        {order && (
          <div className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-6 mb-8">
            <h3 className="text-xl font-display text-brand-text mb-2">
              Pedido #{order.id}
            </h3>
            <p className="text-brand-textMuted">
              Data: {new Date(order.date).toLocaleDateString("pt-BR")} | Total:{" "}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(order.total)}
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
