import React from "react";
import { createPortal } from "react-dom";

export default function CheckoutAside({ show, top, height, width, onClose }) {
  if (!show) return null;

  const node = (
    <div
      className="fixed z-[1000] bg-brand-surface border border-brand-border rounded-lg shadow-soft p-4"
      style={{
        position: "fixed",
        top: `${top}px`,
        right: 0, // colado no lado direito da tela
        left: "auto", // garante que 'left' não interfira
        height: `${height}px`,
        width: `${width}px`,
        transform: "none", // evita qualquer herança de transform
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Finalizar compra</h2>
      <button className="btn-accent w-full mb-2">Cartão de crédito</button>
      <button className="btn-accent w-full">Pix</button>
      <button
        onClick={onClose}
        className="mt-4 text-sm text-brand-muted hover:underline"
      >
        Fechar
      </button>
    </div>
  );

  return createPortal(node, document.body);
}
