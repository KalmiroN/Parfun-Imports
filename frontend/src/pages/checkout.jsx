import { Link } from "react-router-dom";

export default function Checkout() {
  const handleConfirm = (e) => {
    e.preventDefault();
    alert("Pedido confirmado com sucesso!");
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
              className="w-full px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-brand-textMuted mb-1">
              Forma de pagamento
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
              required
            >
              <option>Cartão de crédito</option>
              <option>Boleto bancário</option>
              <option>Pix</option>
            </select>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500"
            >
              Confirmar pedido
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
