import React, { useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: "12345",
      customer: "João Silva",
      date: "2025-11-10",
      status: "Em processamento",
      total: 449.8,
    },
    {
      id: "67890",
      customer: "Maria Oliveira",
      date: "2025-11-01",
      status: "Concluído",
      total: 299.9,
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-[var(--color-bg)] text-[var(--color-text)]">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">
        Administração de Pedidos
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
              Cliente: {order.customer}
            </p>
            <p className="text-[var(--color-text)]">Data: {order.date}</p>
            <p className="text-[var(--color-text)]">
              Total: R$ {order.total.toFixed(2)}
            </p>
            <div className="mt-3">
              <label className="block mb-1 text-[var(--color-text)]">
                Status:
              </label>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="p-2 border border-[var(--color-primary)] rounded bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="Em processamento">Em processamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
