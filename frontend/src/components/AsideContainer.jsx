import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartProvider";
import { toast } from "react-toastify";

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
            e.currentTarget.src = "/images/default.jpg";
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
  cardsTopAbs,
}) {
  const {
    saveLaterItems,
    moveBackToCart,
    setSaveLaterItems,
    getCartTotal,
    getCartCount,
    checkout,
    clearCart,
  } = useCart();

  const [scrollY, setScrollY] = useState(window.scrollY || 0);
  const [hovered, setHovered] = useState(null);

  const [paymentMode, setPaymentMode] = useState(null); // null | "PIX" | "CARD" | "CARD_DEBIT" | "CARD_CREDIT"
  const [discountCode, setDiscountCode] = useState("");

  const pixDiscountActive = true;
  const pixDiscountValue = 50;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topOffset = Math.max(0, cardsTopAbs - scrollY);

  if (!showCheckout && !showSaveLater) return null;

  const hoverEnabled = showCheckout && showSaveLater;

  const handleCheckout = async () => {
    if (!paymentMode) {
      toast.warn("Escolha uma forma de pagamento.");
      return;
    }
    const payload =
      paymentMode === "CARD_DEBIT" || paymentMode === "CARD_CREDIT"
        ? { cardType: paymentMode }
        : {};
    const res = await checkout(paymentMode.toLowerCase(), payload);
    if (res.ok) {
      toast.success("Pagamento realizado com sucesso!");
      clearCart();
      onCloseCheckout();
    } else {
      toast.error("Erro no pagamento.");
    }
  };

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
          {/* Cabeçalho */}
          <h2 className="text-2xl font-display mb-4 text-white">
            Finalizar compra
          </h2>
          <p className="text-brand-text mb-4">
            Total de itens: {getCartCount()} <br />
            Valor:{" "}
            {getCartTotal().toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          {/* Formas de pagamento */}
          <p className="text-brand-text mb-2">Escolha a forma de pagamento:</p>
          <div className="flex flex-col gap-2">
            <button
              className={`btn-accent w-full ${
                paymentMode?.startsWith("CARD")
                  ? "ring-2 ring-brand-accent"
                  : ""
              }`}
              onClick={() => setPaymentMode("CARD")}
            >
              Pagar com cartão
            </button>
            <button
              className={`btn-accent w-full ${
                paymentMode === "PIX" ? "ring-2 ring-brand-accent" : ""
              }`}
              onClick={() => setPaymentMode("PIX")}
            >
              Pix
            </button>
          </div>

          {/* Sub-opções se escolher cartão */}
          {paymentMode === "CARD" && (
            <div className="mt-3 flex gap-2">
              <button
                className="btn-secondary flex-1"
                onClick={() => setPaymentMode("CARD_DEBIT")}
              >
                Débito
              </button>
              <button
                className="btn-secondary flex-1"
                onClick={() => setPaymentMode("CARD_CREDIT")}
              >
                Crédito
              </button>
            </div>
          )}

          {/* Desconto Pix */}
          {paymentMode === "PIX" && pixDiscountActive && (
            <div className="mt-4 p-3 bg-green-100 rounded-lg text-green-700">
              Pagando com Pix você ganha desconto de{" "}
              {pixDiscountValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          )}

          {/* Rodapé fixo */}
          <div className="mt-auto flex flex-col gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Código de desconto"
              className="input-field mb-2"
            />
            <button
              onClick={handleCheckout}
              className="btn-accent w-full text-lg"
            >
              Finalizar compra
            </button>
            <button
              onClick={onCloseCheckout}
              className="btn-secondary w-full text-lg"
            >
              Fechar
            </button>
          </div>
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
                  key={item.saveLaterId}
                  item={item}
                  onAddToCart={() => moveBackToCart(item)}
                  onDelete={(it) =>
                    setSaveLaterItems((prev) =>
                      prev.filter((p) => p.saveLaterId !== it.saveLaterId)
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
