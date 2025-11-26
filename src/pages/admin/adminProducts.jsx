import React, { useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: "Ameeri Al Wataniah", price: 199.9 },
    { id: 2, name: "Angel Isabelle La Belle", price: 249.9 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    setProducts([
      ...products,
      {
        id: Date.now(),
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      },
    ]);
    setNewProduct({ name: "", price: "" });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-[var(--color-bg)] text-[var(--color-text)]">
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">
        Administração de Produtos
      </h2>

      {/* Formulário de novo produto */}
      <form onSubmit={addProduct} className="mb-6 flex gap-4 items-end">
        <div>
          <label className="block mb-1 text-[var(--color-text)]">Nome</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="p-2 border border-[var(--color-primary)] rounded bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <label className="block mb-1 text-[var(--color-text)]">Preço</label>
          <input
            type="number"
            step="0.01"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="p-2 border border-[var(--color-primary)] rounded bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition"
        >
          Adicionar
        </button>
      </form>

      {/* Lista de produtos */}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-lg shadow-md flex justify-between items-center bg-[var(--color-bg)]"
          >
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                {product.name}
              </h3>
              <p className="text-[var(--color-text)]">
                R$ {product.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => deleteProduct(product.id)}
              className="px-3 py-1 rounded-lg font-semibold bg-[var(--color-accent)] text-white hover:opacity-90 transition"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
