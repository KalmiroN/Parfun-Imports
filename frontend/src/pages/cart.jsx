import { useCart } from "../context/CartProvider.jsx";
import { useAuth } from "../context/auth/AuthProvider.jsx";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AsideContainer from "../components/AsideContainer";
import CartItemsList from "../components/CartItemsList";
import { useCartActions } from "../hooks/useCartActions";
import { calculateSubtotal } from "../utils/calculateSubtotal";

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    saveForLater,
    checkout,
    showSaveLater,
    setShowSaveLater,
    setSaveLaterItems, // ✅ agora também extraímos do provider
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

  // 📌 Buscar carrinho e salvos para depois do backend
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [cartRes, savedRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/cart/my`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/api/savelater/my`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const cartData = await cartRes.json();
        const savedData = await savedRes.json();

        if (!cartRes.ok)
          throw new Error(cartData?.error || "Erro ao buscar carrinho");
        if (!savedRes.ok)
          throw new Error(
            savedData?.error || "Erro ao buscar salvos para depois"
          );

        setCartItems(cartData || []);
        setSaveLaterItems(savedData || []); // ✅ popula os salvos
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (loadingAuth) return;
    if (isAuthenticated) fetchAll();
    else setLoading(false);
  }, [setCartItems, setSaveLaterItems, token, loadingAuth, isAuthenticated]);

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

  // ✅ Handlers separados em hook
  const {
    handleRemove,
    handleQuantityChange,
    handleSaveLater,
    handleCheckout,
  } = useCartActions({
    cartItems,
    setCartItems,
    saveForLater,
    checkout,
    token,
    isAuthenticated,
    setShowSaveLater,
    setShowCheckout,
  });

  const subtotal = calculateSubtotal(cartItems);

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
            <CartItemsList
              ref={cardsRef}
              cartItems={cartItems}
              handleRemove={handleRemove}
              handleQuantityChange={handleQuantityChange}
              handleSaveLater={handleSaveLater}
              subtotal={subtotal}
            />

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
