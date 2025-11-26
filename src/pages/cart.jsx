import React, { useState } from "react";

export default function Cart() {
  // Exemplo simples de itens no carrinho
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ameeri Al Wataniah",
      price: 199.9,
      quantity: 1,
      image: "/images/Ameeri-Al-Wataniah-00.jpg",
    },
    {
      id: 2,
      name: "Angel Isabelle La Belle",
      price: 249.9,
      quantity: 2,
      image: "/images/Angel-Isabelle-La-Belle-00.jpg",
    },
  ]);

  const updateQuantity = (id, newQty) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-6 bg-[var(--color-bg)] text-[var(--color-text)]">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">
        Carrinho
      </h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg shadow-md bg-[var(--color-bg)]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                {item.name}
              </h3>
              <p className="text-[var(--color-text)]">
                R$ {item.price.toFixed(2)}
              </p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="w-16 mt-2 p-1 border border-[var(--color-primary)] rounded bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h3 className="text-xl font-bold mb-4 text-[var(--color-accent)]">
          Total: R$ {total.toFixed(2)}
        </h3>
        <button className="px-6 py-3 rounded-lg font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
