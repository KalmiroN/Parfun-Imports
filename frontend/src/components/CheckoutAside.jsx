import React from "react";
import { createPortal } from "react-dom";

export default function CheckoutAside({
  show,
  onClose,
  onCheckout,
  width = 320,
}) {
  if (!show) return null;

  const node = (
    <div
      className="fixed top-0 right-0 z-[1000] bg-brand-surface border-l border-brand-border rounded-l-2xl shadow-soft p-6 animate-slideInSlow"
      style={{
        height: "100%",
        width: `${width}px`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-display">Finalizar compra</h2>
        <button onClick={onClose} className="btn-secondary px-3 py-1 ml-4">
          ✕
        </button>
      </div>

      <p className="text-brand-text mb-4">Escolha a forma de pagamento:</p>
      <button className="btn-accent w-full mb-2">Cartão de crédito</button>
      <button className="btn-accent w-full mb-2">Pix</button>

      {/* Botão para realmente finalizar (chama handleCheckout do Cart.jsx) */}
      <button
        onClick={onCheckout}
        className="btn-accent w-full mt-4 flex items-center justify-center gap-2"
      >
        ✅ Finalizar compra
      </button>
    </div>
  );

  return createPortal(node, document.body);
}
