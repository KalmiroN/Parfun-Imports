import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// MiniCard para itens salvos
function MiniCard({ item, onAddToCart, onDelete }) {
  return (
    <div className="flex items-center gap-3 border-b border-brand-border py-2">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-12 h-12 rounded object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-xs text-brand-text">{item.price}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart(item)}
          className="btn-accent text-xs px-2 py-1"
        >
          ➕ Carrinho
        </button>
        <button
          onClick={() => onDelete(item)}
          className="btn-secondary text-xs px-2 py-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function AsideContainer({
  showCheckout,
  showSaveLater,
  onCloseCheckout,
  onCloseSaveLater,
  onCheckout,
  cardsTopAbs,
  mainHeight,
  savedItems = [], // 👈 lista de itens salvos
  onAddToCart, // função para adicionar ao carrinho
  onDeleteSavedItem, // função para deletar item salvo
}) {
  const bothActive = showCheckout && showSaveLater;

  const baseHeight = Math.round(mainHeight * 0.76);
  const halfHeight = Math.floor(baseHeight / 2);

  const [scrollY, setScrollY] = useState(window.scrollY || 0);
  const [hovered, setHovered] = useState(null); // "checkout" | "save" | null

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topOffset = Math.max(0, cardsTopAbs - scrollY);

  if (!showCheckout && !showSaveLater) return null;

  const aside = (
    <div
      className="fixed z-[1000]"
      style={{
        right: 0,
        top: topOffset,
        width: "20rem",
      }}
    >
      {bothActive ? (
        <div className="flex flex-col gap-4">
          {/* Checkout Aside */}
          <div
            onMouseEnter={() => setHovered("checkout")}
            onMouseLeave={() => setHovered(null)}
            className="bg-brand-surface border-l border-brand-border rounded-l-2xl shadow-soft p-4 transition-transform duration-300"
            style={{
              height:
                hovered === "checkout"
                  ? halfHeight * 1.25
                  : hovered === "save"
                  ? halfHeight * 0.75
                  : halfHeight,
              maxHeight: Math.round(mainHeight * 0.48),
              overflowY: "auto",
            }}
          >
            <h2 className="text-xl font-display mb-3">Finalizar compra</h2>
            <button onClick={onCheckout} className="btn-accent w-full mb-3">
              ✅ Finalizar compra
            </button>
            <button onClick={onCloseCheckout} className="btn-secondary w-full">
              ✕ Fechar
            </button>
          </div>

          {/* Save Later Aside */}
          <div
            onMouseEnter={() => setHovered("save")}
            onMouseLeave={() => setHovered(null)}
            className="bg-brand-surface border-l border-brand-border rounded-l-2xl shadow-soft p-4 transition-transform duration-300"
            style={{
              height:
                hovered === "save"
                  ? halfHeight * 1.25
                  : hovered === "checkout"
                  ? halfHeight * 0.75
                  : halfHeight,
              maxHeight: Math.round(mainHeight * 0.48),
              overflowY: "auto",
            }}
          >
            <h2 className="text-xl font-display mb-3">Salvar para depois</h2>
            <p className="text-sm text-brand-text mb-3">
              Os itens salvos ficarão disponíveis para você finalizar mais
              tarde.
            </p>

            {/* Loop dos MiniCards */}
            {savedItems.length === 0 ? (
              <p className="text-xs text-brand-text">
                Nenhum item salvo ainda.
              </p>
            ) : (
              savedItems.map((item, idx) => (
                <MiniCard
                  key={idx}
                  item={item}
                  onAddToCart={onAddToCart}
                  onDelete={onDeleteSavedItem}
                />
              ))
            )}

            <button
              onClick={onCloseSaveLater}
              className="btn-secondary w-full mt-3"
            >
              ✕ Fechar
            </button>
          </div>
        </div>
      ) : (
        <>
          {showCheckout && (
            <div
              className="bg-brand-surface border-l border-brand-border rounded-l-2xl shadow-soft p-4"
              style={{
                height: baseHeight,
                maxHeight: Math.round(mainHeight * 0.9),
                overflowY: "auto",
              }}
            >
              <h2 className="text-xl font-display mb-3">Finalizar compra</h2>
              <button onClick={onCheckout} className="btn-accent w-full mb-3">
                ✅ Finalizar compra
              </button>
              <button
                onClick={onCloseCheckout}
                className="btn-secondary w-full"
              >
                ✕ Fechar
              </button>
            </div>
          )}

          {showSaveLater && (
            <div
              className="bg-brand-surface border-l border-brand-border rounded-l-2xl shadow-soft p-4"
              style={{
                height: baseHeight,
                maxHeight: Math.round(mainHeight * 0.9),
                overflowY: "auto",
              }}
            >
              <h2 className="text-xl font-display mb-3">Salvar para depois</h2>
              <p className="text-sm text-brand-text mb-3">
                Os itens salvos ficarão disponíveis para você finalizar mais
                tarde.
              </p>

              {/* Loop dos MiniCards */}
              {savedItems.length === 0 ? (
                <p className="text-xs text-brand-text">
                  Nenhum item salvo ainda.
                </p>
              ) : (
                savedItems.map((item, idx) => (
                  <MiniCard
                    key={idx}
                    item={item}
                    onAddToCart={onAddToCart}
                    onDelete={onDeleteSavedItem}
                  />
                ))
              )}

              <button
                onClick={onCloseSaveLater}
                className="btn-secondary w-full mt-3"
              >
                ✕ Fechar
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );

  return createPortal(aside, document.body);
}
