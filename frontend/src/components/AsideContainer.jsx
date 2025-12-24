import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/cartProvider";

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
}) {
  const { saveLaterItems, moveBackToCart, setSaveLaterItems, getCartTotal } =
    useCart();

  const [scrollY, setScrollY] = useState(window.scrollY || 0);
  const [hovered, setHovered] = useState(null); // "checkout" | "save" | null

  const [paymentMode, setPaymentMode] = useState(null); // null | "PIX" | "CARD"
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  // Configurações de desconto (mock — substituir por valores vindos do backend/admin)
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

  const handleApplyCode = () => {
    const code = discountCodes[discountCode?.trim()];
    if (!code) {
      alert("Código inválido");
      return;
    }
    setAppliedDiscount(code);
  };

  const calcTotal = () => {
    const base = getCartTotal();
    let total = base;
    const pixApplied = paymentMode === "PIX" && pixDiscountActive;

    if (appliedDiscount?.type === 1) {
      total = base - appliedDiscount.value;
    } else {
      if (pixApplied) total -= pixDiscountValue;
      if (appliedDiscount?.type === 2) total -= appliedDiscount.value;
    }
    return total < 0 ? 0 : total;
  };

  const baseHeight = Math.round(mainHeight * 0.76);
  const halfHeight = Math.floor(baseHeight / 2);

  const aside = (
    <div
      className="fixed z-[1000]"
      style={{ right: 0, top: topOffset, width: "20rem" }}
    >
      {/* Aside: Finalizar compra */}
      {showCheckout && (
        <div
          onMouseEnter={() => setHovered("checkout")}
          onMouseLeave={() => setHovered(null)}
          className="bg-brand-surface border-l border-brand-border rounded-l-2xl shadow-soft p-4 transition-transform duration-300"
          style={{
            height:
              showCheckout && showSaveLater
                ? hovered === "checkout"
                  ? Math.floor(halfHeight * 1.25) // cresce 25% quando em foco
                  : hovered === "save"
                  ? Math.floor(halfHeight * 0.75) // diminui 25% quando o outro está em foco
                  : halfHeight // padrão: metade
                : baseHeight, // somente ele ativo: altura cheia
            maxHeight: Math.round(mainHeight * 0.9),
            overflowY: "auto",
          }}
        >
          <h2 className="text-xl font-display mb-3">Finalizar compra</h2>

          <p className="text-lg font-semibold mb-3">
            Total: R$ {calcTotal().toFixed(2).replace(".", ",")}
          </p>

          {paymentMode === null && (
            <div className="flex flex-col gap-2 mb-4">
              <button
                onClick={() => {
                  setPaymentMode("PIX");
                  if (showSaveLater) onCloseSaveLater();
                }}
                className="btn-accent"
              >
                Pagar com PIX
              </button>
              <button
                onClick={() => {
                  setPaymentMode("CARD");
                  if (showSaveLater) onCloseSaveLater();
                }}
                className="btn-secondary"
              >
                Pagar com Cartão
              </button>
            </div>
          )}

          {paymentMode === "PIX" && (
            <div className="mb-4">
              {pixDiscountActive && (
                <p className="text-sm text-green-600 mb-2">
                  Pagando com PIX você ganha R$ {pixDiscountValue} de desconto!
                </p>
              )}
              <p className="text-sm mb-2">
                Escaneie o QR Code ou copie a chave PIX para concluir o
                pagamento.
              </p>
              <div className="bg-gray-200 p-4 text-center mb-3">
                [QR CODE PIX]
              </div>
              <div className="bg-gray-100 rounded p-2 text-sm">
                Chave PIX: contato@parfumimports.com.br
              </div>
              <button
                onClick={() => setPaymentMode(null)}
                className="btn-secondary w-full mt-3"
              >
                ← Voltar
              </button>
            </div>
          )}
          {/* Modo Cartão */}
          {paymentMode === "CARD" && (
            <div className="mb-4">
              <form className="flex flex-col gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Número do cartão"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Nome do titular"
                  className="input"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    className="input flex-1"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="input flex-1"
                  />
                </div>
                <select className="input">
                  <option>Visa</option>
                  <option>MasterCard</option>
                  <option>Amex</option>
                </select>
              </form>

              <button
                onClick={() => setPaymentMode(null)}
                className="btn-secondary w-full"
              >
                ← Voltar
              </button>
            </div>
          )}

          {/* Vale desconto */}
          <div className="mt-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Código de desconto"
              className="input w-full mb-2"
            />
            <button onClick={handleApplyCode} className="btn-accent w-full">
              Aplicar código
            </button>
            {appliedDiscount && (
              <p className="text-xs text-brand-text mt-2">
                Código aplicado: tipo {appliedDiscount.type} — desconto de R${" "}
                {appliedDiscount.value}
              </p>
            )}
          </div>

          {/* Rodapé */}
          <div className="mt-6 flex flex-col gap-2">
            <button onClick={onCheckout} className="btn-accent w-full">
              ✅ Finalizar compra
            </button>
            <button onClick={onCloseCheckout} className="btn-secondary w-full">
              ✕ Fechar
            </button>
          </div>
        </div>
      )}

      {/* Aside: Salvar para depois */}
      {showSaveLater && (
        <div
          onMouseEnter={() => setHovered("save")}
          onMouseLeave={() => setHovered(null)}
          className="bg-brand-surface border-l border-brand-border rounded-l-2xl shadow-soft p-4 transition-transform duration-300"
          style={{
            height:
              showCheckout && showSaveLater
                ? hovered === "save"
                  ? Math.floor(halfHeight * 1.25)
                  : hovered === "checkout"
                  ? Math.floor(halfHeight * 0.75)
                  : halfHeight
                : baseHeight,
            maxHeight: Math.round(mainHeight * 0.9),
            overflowY: "auto",
          }}
        >
          <h2 className="text-xl font-display mb-3">Salvar para depois</h2>
          <p className="text-sm text-brand-text mb-3">
            Os itens salvos ficarão disponíveis para você finalizar mais tarde.
          </p>

          {saveLaterItems.length === 0 ? (
            <p className="text-xs text-brand-text">Nenhum item salvo ainda.</p>
          ) : (
            saveLaterItems.map((item, idx) => (
              <MiniCard
                key={idx}
                item={item}
                onAddToCart={moveBackToCart}
                onDelete={(it) =>
                  setSaveLaterItems((prev) =>
                    prev.filter(
                      (p) => (p.id || p.productId) !== (it.id || it.productId)
                    )
                  )
                }
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
    </div>
  );

  return createPortal(aside, document.body);
}
