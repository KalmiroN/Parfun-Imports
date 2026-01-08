import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartProvider";

// ✅ MiniCard para itens salvos com fallback de imagem
function MiniCard({ item, onAddToCart, onDelete }) {
  const resolveSrc = (url) => {
    if (!url) return "/images/default.jpg";
    return url;
  };

  return (
    <div className="flex items-center gap-3 border-b border-brand-border py-2">
      <img
        src={resolveSrc(item?.imageUrl)}
        alt={item?.name || "Produto"}
        onError={(e) => {
          if (!e.currentTarget.src.includes("default.jpg")) {
            e.currentTarget.src = "/images/default.jpg"; // ✅ evita loop/piscar
          }
        }}
        className="w-12 h-12 rounded object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{item.name}</p>
        <p className="text-xs text-brand-text">
          R$ {Number(item.price).toFixed(2)}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart(item)} // ✅ passa o objeto completo com saveLaterId
          className="btn-accent text-xs px-2 py-1"
        >
          ➕ Carrinho
        </button>
        <button
          onClick={() => onDelete(item)} // ✅ também passa o objeto completo
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
}) {
  const { saveLaterItems, moveBackToCart, setSaveLaterItems, getCartTotal } =
    useCart();

  const [scrollY, setScrollY] = useState(window.scrollY || 0);
  const [hovered, setHovered] = useState(null); // "checkout" | "save" | null

  const [paymentMode, setPaymentMode] = useState(null); // null | "PIX" | "CARD"
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const pixDiscountActive = true;
  const pixDiscountValue = 50;
  const discountCodes = {
    VALE10: { type: 1, value: 10 },
    VALE20: { type: 2, value: 20 },
  };

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topOffset = Math.max(0, cardsTopAbs - scrollY);

  if (!showCheckout && !showSaveLater) return null;

  const hoverEnabled = showCheckout && showSaveLater;
  const aside = (
    <div
      className="fixed z-[1000] flex flex-col overflow-hidden transition-all duration-300"
      style={{
        right: 0,
        top: topOffset,
        width: "clamp(20rem, 30vw, 30rem)",
        height: showCheckout || showSaveLater ? "80vh" : "auto",
      }}
    >
      {/* Aside: Finalizar compra */}
      {showCheckout && (
        <div
          onMouseEnter={() => hoverEnabled && setHovered("checkout")}
          onMouseLeave={() => hoverEnabled && setHovered(null)}
          className="bg-[#061624] border-l border-brand-border rounded-l-2xl shadow-soft p-4 flex flex-col transition-all duration-300 overflow-y-auto"
          style={{
            height: hoverEnabled
              ? hovered === "checkout"
                ? "50vh"
                : hovered === "save"
                ? "30vh"
                : "39vh"
              : "80vh",
            minHeight: 0,
          }}
        >
          {/* ... checkout UI permanece igual ... */}
        </div>
      )}

      {/* Aside: Salvar para depois */}
      {showSaveLater && (
        <div
          onMouseEnter={() => hoverEnabled && setHovered("save")}
          onMouseLeave={() => hoverEnabled && setHovered(null)}
          className="bg-[#061624] border-l border-brand-border rounded-l-2xl shadow-soft p-4 flex flex-col transition-all duration-300 overflow-y-auto"
          style={{
            height: hoverEnabled
              ? hovered === "save"
                ? "50vh"
                : hovered === "checkout"
                ? "30vh"
                : "39vh"
              : "80vh",
            minHeight: 0,
            width: "clamp(20rem, 30vw, 30rem)",
          }}
        >
          <h2 className="text-xl font-display mb-3 text-white">
            Salvar para depois
          </h2>
          <p className="text-sm text-brand-text mb-3">
            Os itens salvos ficarão disponíveis para você finalizar mais tarde.
          </p>

          <div className="flex-1 min-h-0 overflow-y-auto">
            {saveLaterItems.length === 0 ? (
              <p className="text-xs text-brand-text">
                Nenhum item salvo ainda.
              </p>
            ) : (
              saveLaterItems.map((item) => (
                <MiniCard
                  key={item.saveLaterId} // ✅ usa saveLaterId como chave
                  item={item}
                  onAddToCart={() => moveBackToCart(item)} // ✅ passa objeto completo
                  onDelete={(it) =>
                    setSaveLaterItems(
                      (prev) =>
                        prev.filter((p) => p.saveLaterId !== it.saveLaterId) // ✅ compara por saveLaterId
                    )
                  }
                />
              ))
            )}
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <button onClick={onCloseSaveLater} className="btn-secondary w-full">
              ✕ Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(aside, document.body);
}
