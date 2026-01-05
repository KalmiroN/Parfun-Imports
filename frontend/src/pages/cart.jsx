import { useCart } from "../context/CartProvider.jsx";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutCard from "../components/CheckoutCard";
import AsideContainer from "../components/AsideContainer";
import { authFetch } from "../utils/authFetch";
import { useAuth } from "../context/AuthProvider.jsx";
import { resolveImageUrl } from "../utils/resolveImageUrl"; // ✅ normaliza URLs de imagens

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    saveForLater,
    checkout,
    showSaveLater,
    setShowSaveLater,
  } = useCart();
  const { user, token, loadingAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);

  const mainRef = useRef(null);
  const cardsRef = useRef(null);

  const [mainMetrics, setMainMetrics] = useState({ top: 0, height: 0 });
  const [cardsTopAbs, setCardsTopAbs] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 📌 Buscar carrinho do backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/cart/my`,
          { method: "GET" },
          token
        );

        if (!response.ok) {
          throw new Error(response.data?.error || "Erro ao buscar carrinho");
        }

        const data = response.data || response;
        setCartItems(data || []);
      } catch (err) {
        console.error("Erro ao buscar carrinho:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (loadingAuth) return;
    if (isAuthenticated) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [setCartItems, token, loadingAuth, isAuthenticated]);

  // 📌 Atualizar métricas para posicionar aside
  useEffect(() => {
    const update = () => {
      const top = mainRef.current?.offsetTop || 0;
      const height = mainRef.current?.offsetHeight || window.innerHeight;
      setMainMetrics({ top, height });

      if (cardsRef.current) {
        const rect = cardsRef.current.getBoundingClientRect();
        setCardsTopAbs(rect.top + window.scrollY);
      }
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [cartItems]);

  // 📌 Esconder mensagens de erro após 25s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 25000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleRemove = async (index) => {
    const updated = [...cartItems];
    const removedItem = updated[index];
    updated.splice(index, 1);
    setCartItems(updated);

    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${removedItem.id}`,
        { method: "DELETE" },
        token
      );
      toast.info(`${removedItem?.name || "Produto"} foi removido do carrinho.`);
    } catch (err) {
      console.error("Erro ao remover produto:", err);
      toast.error("Erro ao remover produto do carrinho.");
    }
  };

  const handleQuantityChange = async (index, delta) => {
    const updated = [...cartItems];
    const newQty = (updated[index]?.quantity || 1) + delta;
    updated[index].quantity = Math.max(1, newQty);
    setCartItems(updated);

    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${updated[index].id}`,
        {
          method: "PUT",
          body: JSON.stringify({ quantity: updated[index].quantity }),
        },
        token
      );
      toast.success(
        `Quantidade de ${updated[index]?.name || "Produto"} atualizada para ${
          updated[index].quantity
        }`
      );
    } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
      toast.error("Erro ao atualizar quantidade.");
    }
  };

  const handleSaveLater = (rawItem) => {
    try {
      saveForLater(rawItem);
      toast.success(`${rawItem?.name || "Item"} salvo para depois!`);
      setShowSaveLater(true);
    } catch (err) {
      console.error("Erro ao salvar item:", err);
      toast.error("Erro ao salvar item para depois.");
    }
  };

  const handleCheckout = async (method) => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para finalizar a compra.");
      return;
    }
    try {
      const res = await checkout(method);
      if (res.ok) {
        toast.success("Compra finalizada com sucesso!");
        setCartItems([]);
        setShowCheckout(false);
      } else {
        toast.error("Erro ao finalizar compra.");
      }
    } catch (err) {
      console.error("Erro ao finalizar compra:", err);
      toast.error("Erro ao finalizar compra.");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const qty = item?.quantity || 1;
    let priceValue = 0;
    if (typeof item?.price === "string") {
      priceValue = parseFloat(
        item.price.replace("R$", "").replace(".", "").replace(",", ".")
      );
    } else if (typeof item?.price === "number") {
      priceValue = item.price;
    }
    return acc + priceValue * qty;
  }, 0);
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
        className="bg-brand-bg text-brand-text min-h-screen px-4 py-12 pt-24 overflow-x-auto"
      >
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {!user ? (
          <div className="card p-8 text-center">
            <p className="text-lg text-brand-text">
              Você ainda não está logado. <br />
              Faça login para visualizar os itens do seu carrinho.
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-lg text-brand-text">
              Você ainda não adicionou nada ao Carrinho.
            </p>
          </div>
        ) : (
          <>
            <div
              ref={cardsRef}
              className="space-y-4 mx-auto"
              style={{ maxWidth: "850px", minWidth: "650px", width: "100%" }}
            >
              {cartItems.map((rawItem, idx) => {
                const item = {
                  id: rawItem?.id,
                  productId: rawItem?.productId,
                  name: rawItem?.name || "Produto",
                  price:
                    typeof rawItem?.price === "number"
                      ? `R$ ${rawItem.price.toFixed(2).replace(".", ",")}`
                      : rawItem?.price || "R$ 0,00",
                  imageUrl: resolveImageUrl(rawItem?.imageUrl), // ✅ normaliza aqui
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
                      onSaveLater={() => handleSaveLater(rawItem)}
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

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setShowCheckout(true)}
                className="btn-accent text-lg"
              >
                Finalizar compra
              </button>
              <button
                onClick={() => navigate("/catalogo")}
                className="btn-secondary text-lg"
              >
                Voltar a comprar
              </button>
            </div>
          </>
        )}

        <AsideContainer
          showCheckout={showCheckout}
          showSaveLater={showSaveLater}
          onCloseCheckout={() => setShowCheckout(false)}
          onCloseSaveLater={() => setShowSaveLater(false)}
          onCheckout={handleCheckout}
          onSave={handleSaveLater}
          cardsTopAbs={cardsTopAbs}
          mainHeight={mainMetrics.height}
        />
      </main>
    </>
  );
}
