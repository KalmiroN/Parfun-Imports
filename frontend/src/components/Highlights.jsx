import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// ✅ Fallback local: produtos que aparecem se o backend não responder
const fallbackProdutos = [
  {
    id: 1,
    name: "Ameeri",
    price: 499.0,
    imageUrl: "/images/Ameeri-Al-Wataniah-00.jpg",
  },
  {
    id: 2,
    name: "Noora",
    price: 429.0,
    imageUrl: "/images/Angel-Isabelle-La-Belle-00.jpg",
  },
  {
    id: 3,
    name: "Ameer Al Oud",
    price: 539.0,
    imageUrl: "/images/Asad-Lattafa-00.jpg",
  },
];

export default function Highlights() {
  const [highlights, setHighlights] = useState(fallbackProdutos);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/highlights`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setHighlights(data); // ✅ substitui fallback pelos dados reais
          }
        }
      } catch (err) {
        console.error("Erro ao carregar destaques:", err);
        // mantém fallback
      }
    };

    fetchHighlights();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-display mb-6 text-brand-text text-center select-none">
        Destaques
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {highlights.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            imageUrl={p.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
