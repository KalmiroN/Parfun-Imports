import { useCart } from "../context/cartProvider.jsx";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutCard from "../components/CheckoutCard";
import AsideContainer from "../components/AsideContainer";
import { authFetch } from "../utils/authFetch";
import { useAuth } from "../context/authProvider";

export default function Cart() {
  const { cartItems, setCartItems } = useCart();
  const { user, token, loadingAuth } = useAuth();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [showSaveLater, setShowSaveLater] = useState(false);

  const mainRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const [mainMetrics, setMainMetrics] = useState({ top: 0, height: 0 });
  const [cardsTopAbs, setCardsTopAbs] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Buscar carrinho do backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/cart/${user.email}`,
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
    if (user?.email) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [setCartItems, user, token, loadingAuth]);

  // ✅ Atualizar métricas para o AsideContainer
  useEffect(() => {
    const update = () => {
      const top = mainRef.current?.offsetTop || 0;
      const height = mainRef.current?.offsetHeight || window.innerHeight;
      setMainMetrics({ top, height });

      if (cardsRef.current) {
        const rect = cardsRef.current.getBoundingClientRect();
        setCardsTopAbs(rect.top + window.scrollY); // topo absoluto dos cards
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

  // ✅ Esconder mensagens de erro após 25s
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

  // ✅ Salvar itens para depois (backend)
  const handleSaveLater = async () => {
    try {
      for (const item of cartItems) {
        await authFetch(
          `${import.meta.env.VITE_API_URL}/api/savelater`,
          {
            method: "POST",
            body: JSON.stringify({
              productId: item.productId || item.id,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrl,
              quantity: item.quantity,
              userEmail: user.email,
            }),
          },
          token
        );
      }
      toast.success("Itens salvos para depois!");
      setShowSaveLater(false);
    } catch (err) {
      console.error("Erro ao salvar itens para depois:", err);
      toast.error("Erro ao salvar itens para depois.");
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

  const handleCheckout = async () => {
    if (!user?.email) {
      toast.error("Você precisa estar logado para finalizar a compra.");
      return;
    }
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart/user/${user.email}`,
        { method: "DELETE" },
        token
      );
      setCartItems([]);
      toast.success("Carrinho limpo após checkout!");
      setShowCheckout(false);
    } catch (err) {
      console.error("Erro ao finalizar compra:", err);
      toast.error("Erro ao finalizar compra.");
    }
  };

  return (
    <>
      {/* Cabeçalho fixo */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full flex justify-between items-center bg-brand-surface shadow-md px-4 py-2 z-40"
      >
        <h1 className="text-3xl font-display">Carrinho de Compras</h1>
        <button className="btn-secondary" onClick={() => navigate("/")}>
          Sair
        </button>
      </div>

      {/* Conteúdo principal */}
      <main
        ref={mainRef}
        className="bg-brand-bg text-brand-text min-h-screen px-4 py-12 pt-24"
      >
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {!user ? (
          <div className="rounded-xl border border-brand-border bg-brand-surface shadow-strong p-8 text-center">
            <p className="text-lg text-brand-text">
              Você ainda não está logado. <br />
              Faça login para visualizar os itens do seu carrinho.
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-xl border border-brand-border bg-brand-surface shadow-strong p-8 text-center">
            <p className="text-lg text-brand-text">
              Você ainda não adicionou nada ao Carrinho.
            </p>
          </div>
        ) : (
          <>
            <div ref={cardsRef} className="space-y-4 w-[70%] mx-auto">
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

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setShowCheckout(true)}
                className="btn-accent text-lg"
              >
                Finalizar compra
              </button>
              <button
                onClick={() => navigate("/products")}
                className="btn-secondary text-lg"
              >
                Voltar a comprar
              </button>
            </div>
          </>
        )}
      </main>

      {/* AsideContainer flutuante — fixed + portal */}
      <AsideContainer
        showCheckout={showCheckout}
        showSaveLater={showSaveLater}
        onCloseCheckout={() => setShowCheckout(false)}
        onCloseSaveLater={() => setShowSaveLater(false)}
        onCheckout={handleCheckout}
        onSave={handleSaveLater}
        cardsTopAbs={cardsTopAbs} // 👈 topo absoluto dos cards
        mainHeight={mainMetrics.height} // 👈 altura total da área principal
      />
    </>
  );
}
