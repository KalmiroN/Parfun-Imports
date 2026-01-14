import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/ThemeProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const { theme } = useTheme();
  const hasDarkOverlay = theme === "dark";

  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/highlights`
        );
        if (!res.ok) throw new Error("Erro ao carregar destaques");
        const data = await res.json();

        // ✅ filtra produtos inválidos
        const validProducts = data.filter((p) => p && p.id && p.name);

        // ✅ deduplicação por ID e limite de 12
        const uniqueProducts = Array.from(
          new Map(validProducts.map((p) => [p.id, p])).values()
        ).slice(0, 12);

        setHighlights(uniqueProducts);
      } catch (err) {
        toast.error(err.message || "Erro ao carregar destaques");
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  return (
    <main className="bg-brand-bg text-brand-text transition-colors duration-500">
      {/* Hero */}
      <section
        className="relative min-h-[70vh] flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('/images/background_files/perfumes-arabes-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {hasDarkOverlay && (
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        )}
        <div className="relative z-10 px-4">
          <h1 className="love-light-regular text-[5rem] mb-6 text-white select-none">
            Parfun Imports
          </h1>
          <p className="text-3xl mb-6 text-white select-none">
            Fragrâncias exclusivas que elevam sua presença.
          </p>

          <div className="flex gap-6 justify-center">
            <Link to="/catalogo" className="btn-accent text-lg">
              Ver Catálogo
            </Link>
            <Link to="/cart" className="btn-secondary text-lg">
              Carrinho
            </Link>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-display mb-6 text-brand-text text-center select-none">
          Destaques
        </h2>

        {loading ? (
          <p className="text-center text-brand-textMuted">
            Carregando destaques...
          </p>
        ) : highlights.length === 0 ? (
          <p className="text-center text-brand-textMuted">
            Nenhum produto em destaque.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            {highlights.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                imageUrl={p.imageUrl}
                description={p.description}
                stock={p.stock}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
