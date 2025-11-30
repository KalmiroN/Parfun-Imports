import { useCart } from "../context/cartProvider";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import CheckoutCard from "../components/CheckoutCard";

export default function Cart() {
  const { cartItems, setCartItems } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [showSaveLater, setShowSaveLater] = useState(false);

  const mainRef = useRef(null);
  const [mainMetrics, setMainMetrics] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      const top = mainRef.current?.offsetTop || 0;
      const height = mainRef.current?.offsetHeight || window.innerHeight;
      setMainMetrics({ top, height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleRemove = (index) => {
    const updated = [...cartItems];
    const removedItem = updated[index];
    updated.splice(index, 1);
    setCartItems(updated);
    toast.info(`${removedItem?.name || "Produto"} foi removido do carrinho.`);
  };

  const handleQuantityChange = (index, delta) => {
    const updated = [...cartItems];
    const newQty = (updated[index]?.quantity || 1) + delta;
    updated[index].quantity = Math.max(1, newQty);
    setCartItems(updated);
    toast.success(
      `Quantidade de ${updated[index]?.name || "Produto"} atualizada para ${
        updated[index].quantity
      }`
    );
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const qty = item?.quantity || 1;
    let priceValue = 0;
    if (typeof item?.price === "string") {
      priceValue = parseFloat(item.price.replace("R$", "").replace(",", "."));
    } else if (typeof item?.price === "number") {
      priceValue = item.price;
    }
    return acc + priceValue * qty;
  }, 0);

  const openCheckout = () => setShowCheckout(true);
  const openSaveLater = () => setShowSaveLater(true);

  const closeCheckout = () => setShowCheckout(false);
  const closeSaveLater = () => setShowSaveLater(false);

  const CheckoutAside = showCheckout ? (
    <aside
      style={{ top: mainMetrics.top, height: mainMetrics.height }}
      className="fixed right-0 z-50 w-[24rem] bg-brand-surface shadow-strong p-6 
        border-l border-t border-b border-yellow-500 rounded-l-2xl animate-slideInSlow"
    >
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-display mb-4">Finalizar compra</h2>
        <button
          onClick={closeCheckout}
          className="ml-4 text-brand-text hover:text-black hover:bg-brand-accent rounded-full px-3 py-1"
        >
          ✕
        </button>
      </div>

      <p className="text-brand-text mb-4">Escolha a forma de pagamento:</p>
      <button className="w-full px-6 py-3 mb-4 rounded-full border border-brand-border text-brand-text font-bold hover:bg-brand-accent hover:text-black">
        Cartão de crédito
      </button>
      <button className="w-full px-6 py-3 rounded-full border border-brand-border text-brand-text font-bold hover:bg-brand-accent hover:text-black">
        Pix
      </button>
    </aside>
  ) : null;
  const SaveLaterAside = showSaveLater ? (
    <aside
      style={{ top: mainMetrics.top, height: mainMetrics.height }}
      className="fixed right-0 z-50 w-[20rem] bg-brand-surface shadow-strong p-6 
        border-l border-t border-b border-yellow-500 rounded-l-2xl animate-slideInSlow"
    >
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-display mb-4">Salvos para depois</h2>
        <button
          onClick={closeSaveLater}
          className="ml-4 text-brand-text hover:text-black hover:bg-brand-accent rounded-full px-3 py-1"
        >
          ✕
        </button>
      </div>

      <p className="text-brand-text">
        Aqui você verá os itens que foram salvos para comprar mais tarde.
      </p>
    </aside>
  ) : null;

  return (
    <>
      <main
        ref={mainRef}
        className="bg-brand-bg text-brand-text min-h-screen px-4 py-12"
      >
        <h1 className="text-3xl font-display mb-8">Carrinho de Compras</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-xl border border-brand-border bg-brand-surface shadow-strong p-8 text-center">
            <p className="text-lg text-brand-text">
              Você ainda não adicionou nada ao Carrinho.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((rawItem, idx) => {
                const item = {
                  name: rawItem?.name || "Produto",
                  price:
                    typeof rawItem?.price === "number"
                      ? `R$ ${rawItem.price.toFixed(2).replace(".", ",")}`
                      : rawItem?.price || "R$ 0,00",
                  imageUrl: rawItem?.imageUrl || "/images/default.jpg",
                  quantity: rawItem?.quantity || 1,
                };

                return (
                  <CheckoutCard
                    key={idx}
                    item={item}
                    index={idx}
                    onRemove={handleRemove}
                    onQuantityChange={handleQuantityChange}
                    onSaveLater={openSaveLater}
                  />
                );
              })}
            </div>

            <div className="mt-10 text-right">
              <p className="text-xl font-semibold">
                Subtotal: R$ {subtotal.toFixed(2).replace(".", ",")}
              </p>
              {/* 🔧 Removido: bloco de parcelamento/estoque fora do card */}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={openCheckout}
                className="px-8 py-4 rounded-full border border-brand-border text-brand-text font-bold text-lg hover:bg-brand-accent hover:text-black"
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </main>

      {showCheckout && createPortal(CheckoutAside, document.body)}
      {showSaveLater && createPortal(SaveLaterAside, document.body)}
    </>
  );
}
