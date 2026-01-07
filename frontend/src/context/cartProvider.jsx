import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authFetch } from "../utils/authFetch";
import { useAuth } from "../context/auth/AuthProvider";

const CartContext = createContext();

export function CartProvider({ children }) {
  const auth = useAuth() || {};
  const { isAuthenticated } = auth;

  const [cartItems, setCartItems] = useState([]);
  const [saveLaterItems, setSaveLaterItems] = useState([]);
  const [showSaveLater, setShowSaveLater] = useState(false);

  // 📌 Buscar carrinho do backend ao carregar
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) {
        setCartItems([]);
        return;
      }
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/cart/my`,
          { method: "GET" }
        );
        if (res.ok) {
          setCartItems(res.data || []);
        }
      } catch (err) {
        console.error("Erro ao carregar carrinho:", err);
        if (err.message.includes("Sessão expirada")) {
          // 🚨 força logout se token inválido
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      }
    };
    fetchCart();
  }, [isAuthenticated]);

  // 📌 Persistência local
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 📌 Reset ao perder autenticação
  useEffect(() => {
    if (!isAuthenticated) {
      setCartItems([]);
      setSaveLaterItems([]);
      setShowSaveLater(false);
      localStorage.removeItem("cart");
    }
  }, [isAuthenticated]);

  // 📌 Adicionar item ao carrinho
  const addToCart = async (product) => {
    if (!isAuthenticated) return;

    const normalizedItem = {
      productId: parseInt(product.productId || product.id, 10),
      name: product.name,
      price: parseFloat(
        String(product.price)
          .replace("R$", "")
          .replace(/\./g, "")
          .replace(",", ".")
          .trim()
      ),
      imageUrl: product.imageUrl,
      quantity: Number(product.quantity) || 1,
    };

    try {
      const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        method: "POST",
        body: JSON.stringify(normalizedItem),
      });

      if (res.ok) {
        setCartItems((prev) => {
          const existing = prev.find(
            (p) =>
              p.productId === normalizedItem.productId ||
              p.id === normalizedItem.productId
          );
          if (existing) {
            return prev.map((p) =>
              p.productId === normalizedItem.productId ||
              p.id === normalizedItem.productId
                ? { ...p, quantity: p.quantity + normalizedItem.quantity }
                : p
            );
          }
          return [...prev, normalizedItem];
        });
      }
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
    }
  };

  // 📌 Remover item
  const removeById = async (id) => {
    try {
      await authFetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
        method: "DELETE",
      });
      setCartItems((prev) =>
        prev.filter((p) => p.id !== id && p.productId !== id)
      );
    } catch (err) {
      console.error("Erro ao remover item:", err);
    }
  };

  // 📌 Atualizar quantidade
  const updateQuantity = async (id, newQuantity) => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      if (res.ok) {
        setCartItems((prev) =>
          prev.map((p) =>
            p.id === id || p.productId === id
              ? { ...p, quantity: newQuantity }
              : p
          )
        );
      }
    } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
    }
  };

  // 📌 Limpar carrinho
  const clearCart = async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      localStorage.removeItem("cart");
      return;
    }
    try {
      await authFetch(`${import.meta.env.VITE_API_URL}/api/cart/clear`, {
        method: "DELETE",
      });
      setCartItems([]);
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Erro ao limpar carrinho:", err);
    }
  };

  // 📌 Salvar para depois
  const saveForLater = (item) => {
    setCartItems((prev) =>
      prev.filter((p) => (p.id || p.productId) !== (item.id || item.productId))
    );
    setSaveLaterItems((prev) => [...prev, item]);
    setShowSaveLater(true);
  };

  // 📌 Mover de volta do 'salvos' para carrinho
  const moveBackToCart = (item) => {
    setSaveLaterItems((prev) =>
      prev.filter((p) => (p.id || p.productId) !== (item.id || item.productId))
    );
    setCartItems((prev) => [...prev, item]);
  };

  // 📌 Checkout (Pix/Cartão)
  const checkout = async (method, payload = {}) => {
    if (!isAuthenticated) return { ok: false, error: "not_auth" };
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/payment/${method}`,
        {
          method: "POST",
          body: JSON.stringify({
            items: cartItems,
            ...payload,
          }),
        }
      );
      return res;
    } catch (err) {
      console.error("Erro no checkout:", err);
      return { ok: false, error: err.message };
    }
  };

  // 📌 Helpers
  const getCartCount = () =>
    cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const getCartTotal = () =>
    cartItems.reduce(
      (acc, item) => acc + Number(item.price) * (item.quantity || 1),
      0
    );

  const value = useMemo(
    () => ({
      cartItems,
      saveLaterItems,
      showSaveLater,
      setShowSaveLater,
      addToCart,
      removeById,
      updateQuantity,
      clearCart,
      saveForLater,
      moveBackToCart,
      checkout,
      getCartCount,
      getCartTotal,
      setCartItems,
      setSaveLaterItems,
    }),
    [cartItems, saveLaterItems, showSaveLater]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
