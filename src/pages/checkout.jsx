import React, { useState } from "react";

export default function Checkout() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "credit",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pedido confirmado!"); // aqui depois você pode integrar com backend
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">
        Finalizar Compra
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 rounded-lg shadow-md bg-[var(--color-bg)]"
      >
        <div>
          <label className="block mb-1 text-[var(--color-text)]">
            Nome Completo
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-[var(--color-primary)] rounded bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block mb-1 text-[var(--color-text)]">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-[var(--color-primary)] rounded bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block mb-1 text-[var(--color-text)]">
            Endereço
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border border-[var(--color-primary)] rounded bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block mb-1 text-[var(--color-text)]">
            Método de Pagamento
          </label>
          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            className="w-full p-2 border border-[var(--color-primary)] rounded bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="credit">Cartão de Crédito</option>
            <option value="debit">Cartão de Débito</option>
            <option value="pix">PIX</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition"
        >
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
}
