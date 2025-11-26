import React from "react";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="p-8 rounded-lg shadow-lg max-w-md bg-[var(--color-bg)]">
        <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">
          Pedido Confirmado!
        </h2>
        <p className="mb-6 text-lg text-[var(--color-text)]">
          Obrigado por sua compra. Seu pedido foi recebido e está sendo
          processado.
        </p>
        <p className="mb-6 text-[var(--color-accent)]">
          Você receberá um e-mail com os detalhes em breve.
        </p>
        <a
          href="/products"
          className="px-6 py-3 rounded-lg font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition"
        >
          Continuar Comprando
        </a>
      </div>
    </div>
  );
}
