import { createPortal } from "react-dom";

export function CheckoutAside({ show, top, height, onClose }) {
  if (!show) return null;

  return createPortal(
    <aside
      style={{ top, height }}
      className="fixed right-0 z-50 w-[24rem] bg-brand-surface shadow-strong p-6 
        border-l border-t border-b border-yellow-500 rounded-l-2xl animate-slideInSlow"
    >
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-display mb-4">Finalizar compra</h2>
        <button onClick={onClose} className="btn-secondary px-3 py-1 ml-4">
          ✕
        </button>
      </div>

      <p className="text-brand-text mb-4">Escolha a forma de pagamento:</p>
      <button className="btn-accent w-full mb-4">Cartão de crédito</button>
      <button className="btn-accent w-full">Pix</button>
    </aside>,
    document.body
  );
}

export function SaveLaterAside({ show, top, height, offset = 400, onClose }) {
  if (!show) return null;

  return createPortal(
    <aside
      style={{ top: top + offset, height }}
      className="fixed right-0 z-40 w-[20rem] bg-brand-surface shadow-strong p-6 
        border-l border-t border-b border-yellow-500 rounded-l-2xl animate-slideInSlow"
    >
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-display mb-4">Salvos para depois</h2>
        <button onClick={onClose} className="btn-secondary px-3 py-1 ml-4">
          ✕
        </button>
      </div>

      <p className="text-brand-text">
        Aqui você verá os itens que foram salvos para comprar mais tarde.
      </p>
    </aside>,
    document.body
  );
}
