import React, { useState } from "react";

export default function MyOrders() {
  // Exemplo simples de pedidos
  const [orders] = useState([
    {
      id: "12345",
      date: "2025-11-10",
      status: "Em processamento",
      total: 449.8,
      items: [
        { name: "Ameeri Al Wataniah", qty: 1 },
        { name: "Angel Isabelle La Belle", qty: 2 },
      ],
    },
    {
      id: "67890",
      date: "2025-11-01",
      status: "Concluído",
      total: 299.9,
      items: [{ name: "Club De Nuit Intense Man", qty: 1 }],
    },
  ]);

  return (
    <div className="min-h-screen p-6 bg-[var(--color-bg)] text-[var(--color-text)]">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">
        Meus Pedidos
      </h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 rounded-lg shadow-md bg-[var(--color-bg)]"
          >
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
              Pedido #{order.id}
            </h3>
            <p className="text-[var(--color-text)]">
              Data: {order.date} | Status:{" "}
              <span className="text-[var(--color-accent)]">{order.status}</span>
            </p>
            <ul className="mt-2 mb-4">
              {order.items.map((item, idx) => (
                <li key={idx} className="text-[var(--color-text)]">
                  {item.qty}x {item.name}
                </li>
              ))}
            </ul>
            <p className="font-bold text-[var(--color-accent)]">
              Total: R$ {order.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
