import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const data = localStorage.getItem("wishlist");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price !== "string") return 0;
    const clean = price
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    const val = parseFloat(clean);
    return Number.isNaN(val) ? 0 : val;
  };

  const addToWishlist = (product) => {
    if (!product || (!product.id && !product.name)) return;

    setWishlistItems((prev) => {
      const exists = prev.find((p) =>
        product.id ? p.id === product.id : p.name === product.name
      );
      if (exists) {
        // ✅ Atualiza dados do produto existente
        return prev.map((p) =>
          (product.id ? p.id === product.id : p.name === product.name)
            ? {
                ...p,
                ...product,
                priceValue: parsePrice(product.price ?? p.price),
              }
            : p
        );
      }
      return [
        ...prev,
        {
          ...product,
          priceValue: parsePrice(product.price),
        },
      ];
    });
  };

  const removeFromWishlist = (matcher) => {
    setWishlistItems((prev) => prev.filter((p, idx) => !matcher(p, idx)));
  };

  const removeById = (id) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== id));
  };

  const removeByName = (name) => {
    setWishlistItems((prev) => prev.filter((p) => p.name !== name));
  };

  const clearWishlist = () => setWishlistItems([]);

  const value = useMemo(
    () => ({
      wishlistItems,
      setWishlistItems,
      addToWishlist,
      removeFromWishlist,
      removeById,
      removeByName,
      clearWishlist,
    }),
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
