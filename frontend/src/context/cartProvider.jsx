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

  // 📌 Buscar carrinho e salvos para depois ao carregar
  useEffect(() => {
    const fetchAll = async () => {
      if (!isAuthenticated) {
        setCartItems([]);
        setSaveLaterItems([]);
        return;
      }
      try {
        const [cartRes, savedRes] = await Promise.all([
          authFetch(`${import.meta.env.VITE_API_URL}/api/cart/my`, {
            method: "GET",
          }),
          authFetch(`${import.meta.env.VITE_API_URL}/api/savelater/my`, {
            method: "GET",
          }),
        ]);

        if (cartRes.ok) setCartItems(cartRes.data || []);
        if (savedRes.ok) {
          // ✅ normaliza os itens salvos para incluir saveLaterId separado de productId
          const normalized = (savedRes.data || []).map((item) => ({
            saveLaterId: item.id, // id da linha em save_later_items
            productId: item.productId, // id do produto
            name: item.name,
            imageUrl: item.imageUrl,
            quantity: item.quantity,
            price: item.price,
            userEmail: item.userEmail,
            userId: item.userId,
          }));
          setSaveLaterItems(normalized);
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        if (err.message.includes("Sessão expirada")) {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      }
    };
    fetchAll();
  }, [isAuthenticated]);

  // 📌 Persistência local (apenas carrinho, não mais saveLater)
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

  // 📌 Remover item (usa cartItem.id, não productId)
  const removeById = async (id) => {
    try {
      await authFetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, {
        method: "DELETE",
      });
      setCartItems((prev) => prev.filter((p) => p.id !== id));
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
          prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
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
  const saveForLater = async (item) => {
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${
          item.cartItemId || item.id
        }`,
        { method: "DELETE" }
      );

      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/savelater`,
        {
          method: "POST",
          body: JSON.stringify({
            productId: item.productId,
            name: item.name,
            imageUrl: item.imageUrl,
            quantity: item.quantity,
            price: item.price,
            userEmail: item.userEmail,
          }),
        }
      );

      if (res.ok) {
        const savedItem = res.data;
        const normalized = {
          saveLaterId: savedItem.id, // id da linha em save_later_items
          productId: savedItem.productId, // id do produto
          name: savedItem.name,
          imageUrl: savedItem.imageUrl,
          quantity: savedItem.quantity,
          price: savedItem.price,
          userEmail: savedItem.userEmail,
          userId: savedItem.userId,
        };

        setCartItems((prev) =>
          prev.filter((p) => p.id !== item.id && p.productId !== item.productId)
        );
        setSaveLaterItems((prev) => [...prev, normalized]);
        setShowSaveLater(true);
      }
    } catch (err) {
      console.error("Erro ao salvar para depois:", err);
    }
  };

  // 📌 Mover de volta do 'salvos' para carrinho
  const moveBackToCart = async (item) => {
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/savelater/${item.saveLaterId}`,
        { method: "DELETE" }
      );

      await authFetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        method: "POST",
        body: JSON.stringify({
          productId: item.productId,
          name: item.name,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          price: item.price,
          userEmail: item.userEmail,
        }),
      });

      setSaveLaterItems((prev) =>
        prev.filter((p) => p.saveLaterId !== item.saveLaterId)
      );
      setCartItems((prev) => [...prev, item]);
    } catch (err) {
      console.error("Erro ao mover item de volta:", err);
    }
  };

  // 📌 Checkout
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
