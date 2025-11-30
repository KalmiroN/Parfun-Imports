// src/context/cartProvider.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Inicializa do localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // Persiste a cada mudança
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Normaliza preço em número (aceita "R$ 1.234,56")
  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    const clean = price
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    const val = parseFloat(clean);
    return Number.isNaN(val) ? 0 : val;
  };

  // Adiciona item (merge por id se existir; senão por name)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const keyMatch = (p) =>
        product.id != null ? p.id === product.id : p.name === product.name;

      const existing = prev.find(keyMatch);
      if (existing) {
        return prev.map((p) =>
          keyMatch(p) ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity:
            product.quantity && product.quantity > 0 ? product.quantity : 1,
          priceValue: parsePrice(product.price),
        },
      ];
    });
  };

  const removeFromCart = (matcher) => {
    setCartItems((prev) => prev.filter((p, idx) => !matcher(p, idx)));
  };

  const updateQuantity = (matcher, delta) => {
    setCartItems((prev) =>
      prev.map((p, idx) =>
        matcher(p, idx)
          ? { ...p, quantity: Math.max(1, (p.quantity || 1) + delta) }
          : p
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems, // caso você queira manipular diretamente
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
