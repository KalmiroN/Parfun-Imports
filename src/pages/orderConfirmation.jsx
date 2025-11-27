import Hero from "../components/Hero";
import { Link } from "react-router-dom";

export default function OrderConfirmation() {
  return (
    <main className="transition-colors duration-500">
      <Hero
        backgroundImage="/hero-confirmation.jpg"
        title="Pedido confirmado"
        subtitle="Obrigado pela compra! Você receberá um e-mail com os detalhes."
      />

      {/* Botões de ação */}
      <div className="mx-auto max-w-4xl px-4 py-12 flex flex-col md:flex-row gap-4 justify-center">
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
    </main>
  );
}
