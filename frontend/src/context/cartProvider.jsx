import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authFetch } from "../utils/authFetch";
import { useAuth } from "./authProvider";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, token, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [saveLaterItems, setSaveLaterItems] = useState([]);

  // Buscar carrinho do backend ao carregar
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated || !user?.email) {
        setCartItems([]);
        return;
      }
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/cart/${user.email}`,
          { method: "GET" },
          token
        );
        if (res.ok) {
          setCartItems(res.data || []);
        }
      } catch (err) {
        console.error("Erro ao carregar carrinho:", err);
      }
    };
    fetchCart();
  }, [isAuthenticated, user, token]);

  // Persistência local
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Reset ao perder autenticação
  useEffect(() => {
    if (!isAuthenticated) {
      setCartItems([]);
      setSaveLaterItems([]);
      localStorage.removeItem("cart");
    }
  }, [isAuthenticated]);

  // Adicionar item ao carrinho
  const addToCart = async (product) => {
    if (!isAuthenticated || !user?.email) return;

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
      userEmail: user.email,
    };

    try {
      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          method: "POST",
          body: JSON.stringify(normalizedItem),
        },
        token
      );

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

  // Remover item
  const removeById = async (id) => {
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${id}`,
        { method: "DELETE" },
        token
      );
      setCartItems((prev) =>
        prev.filter((p) => p.id !== id && p.productId !== id)
      );
    } catch (err) {
      console.error("Erro ao remover item:", err);
    }
  };

  // Atualizar quantidade
  const updateQuantity = async (id, newQuantity) => {
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({ quantity: newQuantity }),
        },
        token
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

  // Limpar carrinho
  const clearCart = async () => {
    if (!isAuthenticated || !user?.email) {
      setCartItems([]);
      localStorage.removeItem("cart");
      return;
    }
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart/user/${user.email}`,
        { method: "DELETE" },
        token
      );
      setCartItems([]);
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Erro ao limpar carrinho:", err);
    }
  };

  // Salvar para depois
  const saveForLater = (item) => {
    setCartItems((prev) =>
      prev.filter((p) => (p.id || p.productId) !== (item.id || item.productId))
    ); // ✅ remove do carrinho

    setSaveLaterItems((prev) => [...prev, item]); // ✅ adiciona no "salvar para depois"
  };

  // Mover de volta do 'salvos' para carrinho
  const moveBackToCart = (item) => {
    setSaveLaterItems((prev) =>
      prev.filter((p) => (p.id || p.productId) !== (item.id || item.productId))
    ); // ✅ remove do "salvar para depois"

    setCartItems((prev) => [...prev, item]); // ✅ adiciona de volta ao carrinho
  };

  // Checkout (Pix/Cartão)
  const checkout = async (method, payload = {}) => {
    if (!isAuthenticated || !user?.email)
      return { ok: false, error: "not_auth" };
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/payment/${method}`,
        {
          method: "POST",
          body: JSON.stringify({
            userEmail: user.email,
            items: cartItems,
            ...payload,
          }),
        },
        token
      );
      return res;
    } catch (err) {
      console.error("Erro no checkout:", err);
      return { ok: false, error: err.message };
    }
  };

  // Helpers
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
    [cartItems, saveLaterItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
