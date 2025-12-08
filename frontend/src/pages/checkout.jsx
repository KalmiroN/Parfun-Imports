import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authFetch } from "../utils/authFetch"; // ✅ importa utilitário
import { toast } from "react-toastify";

export default function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cartão de crédito");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/orders/create`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            address,
            paymentMethod,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar pedido. Tente novamente.");
      }

      const data = await response.json();
      console.log("Pedido criado:", data);

      toast.success("Pedido confirmado com sucesso!");
      navigate("/order-confirmation"); // ✅ redireciona para página de confirmação
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Finalizar Compra
        </h2>

        {/* Formulário de checkout */}
        <form onSubmit={handleConfirm} className="space-y-6">
          <div>
            <label className="block text-sm text-brand-textMuted mb-1">
              Nome completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-brand-textMuted mb-1">
              Endereço de entrega
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-brand-textMuted mb-1">
              Forma de pagamento
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
              required
            >
              <option>Cartão de crédito</option>
              <option>Boleto bancário</option>
              <option>Pix</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Botões de ação */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500"
            >
              {loading ? "Confirmando..." : "Confirmar pedido"}
            </button>
            <Link
              to="/cart"
              className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
            >
              Voltar ao carrinho
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
