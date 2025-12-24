import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../context/cartProvider";

/**
 * AsideCarrinho.jsx
 * - Gerencia carrinho, salvar para depois e finalizar compra
 * - Suporta pagamento via Pix (com desconto opcional) e Cartão
 */

export default function AsideCarrinho({
  discountActive = false,
  discountValue = 0,
  closeAside,
}) {
  const { cartItems, saveLaterItems, saveForLater, moveBackToCart } = useCart();
  const [payment, setPayment] = useState(null); // "pix" ou "card"

  // Salvar item para depois (usa contexto)
  const handleSaveForLater = (item) => {
    saveForLater(item);
    toast.info(`${item.name} salvo para depois.`);
  };

  // Voltar escolha de pagamento
  const handleBackPaymentChoice = () => {
    setPayment(null);
  };

  // Finalizar compra
  const handleCheckout = () => {
    if (payment === "pix") {
      toast.success(
        "Pagamento via Pix iniciado. Escaneie o QR Code ou copie a chave Pix."
      );
      // Aqui você integraria com backend para gerar QR Code/chave Pix
    } else if (payment === "card") {
      toast.success(
        "Pagamento via Cartão iniciado. Preencha os dados do cartão."
      );
      // Aqui você integraria com gateway de pagamento
    } else {
      toast.warn("Escolha uma forma de pagamento.");
    }
  };

  return (
    <aside className="flex flex-col h-full bg-white shadow-strong">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Finalizar compra</h2>
        <button onClick={closeAside} className="text-red-500 font-bold">
          ✕
        </button>
      </header>

      {/* Corpo: lista de itens do carrinho */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id || item.productId}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">R$ {item.price}</p>
              </div>
              <button
                onClick={() => handleSaveForLater(item)}
                className="text-xs text-blue-500 underline"
              >
                Salvar para depois
              </button>
            </div>
          ))
        )}

        {/* Aside: Salvos para depois */}
        {saveLaterItems.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Salvos para depois</h3>
            {saveLaterItems.map((item) => (
              <div
                key={item.id || item.productId}
                className="flex justify-between items-center border p-2 rounded bg-gray-50"
              >
                <div>
                  <p className="text-sm">{item.name}</p>
                  <p className="text-sm text-gray-600">R$ {item.price}</p>
                </div>
                <button
                  onClick={() => moveBackToCart(item)}
                  className="text-xs text-green-600 underline"
                >
                  ➕ Voltar ao carrinho
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rodapé */}
      <footer className="p-4 border-t space-y-4">
        <p className="font-medium">Total de itens: {cartItems.length}</p>

        {/* Escolha de pagamento */}
        {payment === null && (
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="pix"
                checked={payment === "pix"}
                onChange={() => setPayment("pix")}
              />
              Pix
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="card"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
              />
              Cartão
            </label>
          </div>
        )}

        {/* Modo Pix */}
        {payment === "pix" && (
          <div className="space-y-2">
            {discountActive && (
              <p className="text-green-600">
                Pagando com Pix você ganha desconto de R$ {discountValue}
              </p>
            )}
            <p className="text-sm text-gray-600">
              Escaneie o QR Code ou copie a chave Pix para concluir o pagamento.
            </p>
            <button onClick={handleCheckout} className="btn-accent w-full mt-2">
              Finalizar compra com Pix
            </button>
            <button
              onClick={handleBackPaymentChoice}
              className="btn-secondary w-full mt-2"
            >
              Voltar
            </button>
          </div>
        )}

        {/* Modo Cartão */}
        {payment === "card" && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Preencha os dados do cartão:
            </p>
            <input
              type="text"
              placeholder="Número do cartão"
              className="input-field"
            />
            <input
              type="text"
              placeholder="Validade (MM/AA)"
              className="input-field"
            />
            <input type="text" placeholder="CVV" className="input-field" />
            <select className="input-field">
              <option>Visa</option>
              <option>MasterCard</option>
              <option>Amex</option>
            </select>

            <button onClick={handleCheckout} className="btn-accent w-full mt-2">
              Finalizar compra com Cartão
            </button>
            <button
              onClick={handleBackPaymentChoice}
              className="btn-secondary w-full mt-2"
            >
              Voltar
            </button>
          </div>
        )}
      </footer>
    </aside>
  );
}
