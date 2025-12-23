import React from "react";
import { createPortal } from "react-dom";

export default function SaveLaterAside({ show, onClose, onSave, width = 320 }) {
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
        <h2 className="text-xl font-display">Salvar para depois</h2>
        <button onClick={onClose} className="btn-secondary px-3 py-1 ml-4">
          ✕
        </button>
      </div>

      <p className="text-brand-text mb-4">
        Os itens salvos ficarão disponíveis para você finalizar mais tarde.
      </p>

      {/* Botão para salvar itens (chama função passada pelo Cart.jsx) */}
      <button
        onClick={onSave}
        className="btn-accent w-full mt-2 flex items-center justify-center gap-2"
      >
        💾 Salvar itens
      </button>
    </div>
  );

  return createPortal(node, document.body);
}
