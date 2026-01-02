import { createPortal } from "react-dom";
import { useCart } from "../context/CartProvider";

export function SaveLaterAside({ show, top, height, offset = 400, onClose }) {
  const { saveLaterItems, moveBackToCart } = useCart();

  if (!show) return null;

  // ✅ Função para resolver a URL da imagem com fallback
  const resolveSrc = (url) => {
    if (!url) return "/images/default.jpg";
    return url;
  };

  return createPortal(
    <aside
      style={{ top: top + offset, height }}
      className="fixed right-0 z-40 w-[20rem] bg-brand-surface shadow-strong p-6 
        border-l border-t border-b border-yellow-500 rounded-l-2xl animate-slideInSlow flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-display">Salvos para depois</h2>
        <button onClick={onClose} className="btn-secondary px-3 py-1 ml-4">
          ✕
        </button>
      </div>

      {saveLaterItems.length === 0 ? (
        <p className="text-brand-text">
          Nenhum item salvo para comprar mais tarde.
        </p>
      ) : (
        <div className="space-y-4 overflow-y-auto">
          {saveLaterItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 border border-brand-border rounded-lg bg-brand-surface/80"
            >
              <div className="flex items-center gap-2">
                <img
                  src={resolveSrc(item?.imageUrl)}
                  alt={item?.name || "Produto"}
                  onError={(e) => {
                    e.currentTarget.src = "/images/default.jpg"; // ✅ fallback se a imagem não carregar
                  }}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-brand-textMuted">
                    {item.quantity}x{" "}
                    {Number(item.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => moveBackToCart(item)}
                className="btn-accent text-xs px-2 py-1"
              >
                Voltar
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>,
    document.body
  );
}
