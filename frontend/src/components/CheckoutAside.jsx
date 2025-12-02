import React from "react";
import { createPortal } from "react-dom";

export default function CheckoutAside({ show, top, height, width, onClose }) {
  if (!show) return null;

  const node = (
    <div
      className="fixed z-[1000] bg-brand-surface border border-brand-border rounded-lg shadow-soft p-4"
      style={{
        top: `${top}px`,
        right: 0,
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Finalizar compra</h2>
      <button className="btn-accent w-full mb-2">Cartão de crédito</button>
      <button className="btn-accent w-full">Pix</button>
      <button
        onClick={onClose}
        className="btn-secondary mt-4 flex items-center justify-center gap-2"
      >
        ✕ Fechar
      </button>
    </div>
  );

  return createPortal(node, document.body);
}
