import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products] = useState([
    {
      id: 1,
      name: "Ameeri Al Wataniah",
      price: 199.9,
      image: "/images/Ameeri-Al-Wataniah-00.jpg",
    },
    {
      id: 2,
      name: "Angel Isabelle La Belle",
      price: 249.9,
      image: "/images/Angel-Isabelle-La-Belle-00.jpg",
    },
    {
      id: 3,
      name: "Club De Nuit Intense Man",
      price: 299.9,
      image: "/images/Club-De-Nuit-Intense-Man-00.jpg",
    },
  ]);

  return (
    <div className="min-h-screen p-6 bg-[var(--color-bg)] text-[var(--color-text)]">
      <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-primary)]">
        Catálogo de Perfumes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-lg shadow-md flex flex-col items-center bg-[var(--color-bg)]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
              {product.name}
            </h3>
            <p className="mb-4 text-[var(--color-text)]">
              R$ {product.price.toFixed(2)}
            </p>
            <Link
              to={`/products/${product.id}`}
              className="px-4 py-2 rounded-lg font-semibold bg-[var(--color-accent)] text-white hover:opacity-90 transition"
            >
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
