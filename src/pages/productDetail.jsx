import React from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  // Exemplo simples de produtos (poderá vir do backend depois)
  const products = [
    {
      id: "1",
      name: "Ameeri Al Wataniah",
      price: 199.9,
      description:
        "Fragrância sofisticada com notas orientais e elegância marcante.",
      image: "/images/Ameeri-Al-Wataniah-00.jpg",
    },
    {
      id: "2",
      name: "Angel Isabelle La Belle",
      price: 249.9,
      description: "Perfume doce e envolvente, ideal para ocasiões especiais.",
      image: "/images/Angel-Isabelle-La-Belle-00.jpg",
    },
    {
      id: "3",
      name: "Club De Nuit Intense Man",
      price: 299.9,
      description: "Aroma intenso e moderno, perfeito para noites elegantes.",
      image: "/images/Club-De-Nuit-Intense-Man-00.jpg",
    },
  ];

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <p>Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-lg w-full p-6 rounded-lg shadow-md bg-[var(--color-bg)]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-primary)]">
          {product.name}
        </h2>
        <p className="mb-4 text-[var(--color-text)]">{product.description}</p>
        <p className="text-xl font-semibold mb-6 text-[var(--color-accent)]">
          R$ {product.price.toFixed(2)}
        </p>
        <Link
          to="/cart"
          className="w-full block text-center px-6 py-3 rounded-lg font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition"
        >
          Adicionar ao Carrinho
        </Link>
      </div>
    </div>
  );
}
