import { useCart } from "../context/cartProvider";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import CheckoutCard from "../components/CheckoutCard";
import CheckoutAside from "../components/CheckoutAside";
import SaveLaterAside from "../components/SaveLaterAside";
import { authFetch } from "../utils/authFetch"; // ✅ importa utilitário

export default function Cart() {
  const { cartItems, setCartItems } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [showSaveLater, setShowSaveLater] = useState(false);

  const mainRef = useRef(null);
  const [mainMetrics, setMainMetrics] = useState({ top: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Buscar carrinho do backend ao carregar
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/cart`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar carrinho");
        }

        const data = await response.json();
        setCartItems(data.items || []); // backend retorna { items: [...] }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setCartItems]);

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

  const handleRemove = async (index) => {
    const updated = [...cartItems];
    const removedItem = updated[index];
    updated.splice(index, 1);
    setCartItems(updated);

    // ✅ Remove também no backend
    try {
      await authFetch(`${import.meta.env.VITE_API_URL}/cart/remove`, {
        method: "POST",
        body: JSON.stringify({ productId: removedItem.id }),
      });
      toast.info(`${removedItem?.name || "Produto"} foi removido do carrinho.`);
    } catch {
      toast.error("Erro ao remover produto do carrinho.");
    }
  };

  const handleQuantityChange = async (index, delta) => {
    const updated = [...cartItems];
    const newQty = (updated[index]?.quantity || 1) + delta;
    updated[index].quantity = Math.max(1, newQty);
    setCartItems(updated);

    // ✅ Atualiza também no backend
    try {
      await authFetch(`${import.meta.env.VITE_API_URL}/cart/update`, {
        method: "POST",
        body: JSON.stringify({
          productId: updated[index].id,
          quantity: updated[index].quantity,
        }),
      });
      toast.success(
        `Quantidade de ${updated[index]?.name || "Produto"} atualizada para ${
          updated[index].quantity
        }`
      );
    } catch {
      toast.error("Erro ao atualizar quantidade.");
    }
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

  // Regras de altura
  const bothActive = showCheckout && showSaveLater;
  const singleHeight = mainMetrics.height * 0.9;
  const asideHeight = mainMetrics.height * 0.44;

  if (loading) {
    return (
      <main className="bg-brand-bg text-brand-text min-h-screen flex items-center justify-center">
        <p>Carregando carrinho...</p>
      </main>
    );
  }

  return (
    <>
      <main
        ref={mainRef}
        className="bg-brand-bg text-brand-text min-h-screen px-4 py-12"
      >
        <h1 className="text-3xl font-display mb-8">Carrinho de Compras</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

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
                  id: rawItem?.id,
                  name: rawItem?.name || "Produto",
                  price:
                    typeof rawItem?.price === "number"
                      ? `R$ ${rawItem.price.toFixed(2).replace(".", ",")}`
                      : rawItem?.price || "R$ 0,00",
                  imageUrl: rawItem?.imageUrl || "/images/default.jpg",
                  quantity: rawItem?.quantity || 1,
                };

                return (
                  <div
                    key={idx}
                    className="hover:scale-[1.02] transition-transform duration-300"
                  >
                    <CheckoutCard
                      item={item}
                      index={idx}
                      onRemove={handleRemove}
                      onQuantityChange={handleQuantityChange}
                      onSaveLater={() => setShowSaveLater(true)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-right">
              <p className="text-xl font-semibold">
                Subtotal: R$ {subtotal.toFixed(2).replace(".", ",")}
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowCheckout(true)}
                className="btn-accent text-lg"
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </main>

      {/* Asides */}
      {showCheckout && !bothActive && (
        <CheckoutAside
          show={showCheckout}
          top={mainMetrics.top + 20}
          height={singleHeight}
          width={320}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {showSaveLater && !bothActive && (
        <SaveLaterAside
          show={showSaveLater}
          top={mainMetrics.top + 20}
          height={singleHeight}
          width={320}
          onClose={() => setShowSaveLater(false)}
        />
      )}

      {bothActive && (
        <>
          <CheckoutAside
            show={showCheckout}
            top={mainMetrics.top + 20}
            height={asideHeight}
            width={320}
            onClose={() => setShowCheckout(false)}
          />
          <SaveLaterAside
            show={showSaveLater}
            top={mainMetrics.top + 20 + asideHeight + 3}
            height={asideHeight}
            width={320}
            onClose={() => setShowSaveLater(false)}
          />
        </>
      )}
    </>
  );
}
