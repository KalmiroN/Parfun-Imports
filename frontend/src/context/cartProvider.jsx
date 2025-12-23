import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authFetch } from "../utils/authFetch";
import { useAuth } from "./authProvider";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, token, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // ✅ Buscar carrinho do backend ao carregar
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

  // ✅ Persistência local
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Adicionar item ao carrinho
  const addToCart = async (product) => {
    if (!isAuthenticated || !user?.email) return;

    // 🔎 Normalização segura
    const normalizedItem = {
      productId: parseInt(product.productId || product.id, 10), // garante número
      name: product.name,
      price: parseFloat(
        String(product.price)
          .replace("R$", "")
          .replace(/\./g, "") // remove pontos de milhar
          .replace(",", ".") // troca vírgula por ponto
          .trim()
      ), // garante número decimal
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

  // ❌ Remover item
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

  // 🔄 Atualizar quantidade (agora compatível com backend)
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

  // 🗑️ Limpar carrinho
  const clearCart = async () => {
    if (!isAuthenticated || !user?.email) return;
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart/user/${user.email}`,
        { method: "DELETE" },
        token
      );
      setCartItems([]);
    } catch (err) {
      console.error("Erro ao limpar carrinho:", err);
    }
  };

  // 📊 Helpers
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
      addToCart,
      removeById,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
      setCartItems,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
