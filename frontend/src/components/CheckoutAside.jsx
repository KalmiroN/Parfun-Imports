import { createPortal } from "react-dom";
import { useCart } from "../context/CartProvider";
import { useState } from "react";
import { toast } from "react-toastify";

export function CheckoutAside({ show, top, height, onClose, discountPix }) {
  const { getCartCount, getCartTotal, checkout, clearCart } = useCart();
  const [mode, setMode] = useState(null); // "pix" ou "card"

  if (!show) return null;

  const total = getCartTotal();
  const itemCount = getCartCount();

  const handleCheckout = async () => {
    if (!mode) {
      toast.warn("Escolha uma forma de pagamento.");
      return;
    }
    const payload =
      mode === "card" ? { cardNumber: "**** **** **** 1234" } : {};
    const res = await checkout(mode, payload);
    if (res.ok) {
      toast.success("Pagamento realizado com sucesso!");
      clearCart();
      onClose();
    } else {
      toast.error("Erro no pagamento.");
    }
  };

  return createPortal(
    <aside
      style={{ top, height }}
      className="fixed right-0 z-50 w-[24rem] bg-brand-surface shadow-strong p-6 
        border-l border-t border-b border-yellow-500 rounded-l-2xl animate-slideInSlow flex flex-col justify-between"
    >
      <div>
        <h2 className="text-2xl font-display mb-4">Finalizar compra</h2>
        <p className="text-brand-text mb-4">
          Total de itens: {itemCount} <br />
          Valor:{" "}
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <p className="text-brand-text mb-2">Escolha a forma de pagamento:</p>
        <div className="flex flex-col gap-2">
          <button
            className={`btn-accent w-full ${
              mode === "card" ? "ring-2 ring-brand-accent" : ""
            }`}
            onClick={() => setMode("card")}
          >
            Cartão de crédito
          </button>
          <button
            className={`btn-accent w-full ${
              mode === "pix" ? "ring-2 ring-brand-accent" : ""
            }`}
            onClick={() => setMode("pix")}
          >
            Pix
          </button>
        </div>

        {mode === "pix" && discountPix?.active && (
          <div className="mt-4 p-3 bg-green-100 rounded-lg text-green-700">
            Pagando com Pix você ganha desconto de{" "}
            {discountPix.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
        )}
      </div>

      {/* Rodapé com botões */}
      <div className="flex flex-col gap-2 mt-6">
        <button onClick={handleCheckout} className="btn-accent w-full text-lg">
          Finalizar compra
        </button>
        <button onClick={onClose} className="btn-secondary w-full text-lg">
          Fechar
        </button>
      </div>
    </aside>,
    document.body
  );
}
