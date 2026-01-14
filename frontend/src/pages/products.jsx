import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/ThemeProvider";
import axios from "axios";

export default function Products() {
  const { theme } = useTheme();
  const hasDarkOverlay = theme === "dark";

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Carregar produtos do backend (rota pública)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        console.log("Produtos recebidos:", res.data);

        // ✅ filtra produtos inválidos
        const validProducts = (res.data || []).filter(
          (p) =>
            p &&
            p.id &&
            p.name &&
            p.name.trim() !== "" &&
            p.imageUrl &&
            p.imageUrl.trim() !== ""
        );

        // ✅ remove duplicados pelo ID
        const uniqueProducts = Array.from(
          new Map(validProducts.map((p) => [p.id, p])).values()
        );

        setProdutos(uniqueProducts);
      } catch (err) {
        console.error("Erro ao carregar produtos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="bg-brand-bg text-brand-text transition-colors duration-500">
      {/* Seção Catálogo com imagem de fundo */}
      <section
        className="relative min-h-[60vh] flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('/images/background_files/default-product.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {hasDarkOverlay && (
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        )}
        <div className="relative z-10 px-4">
          <h1 className="love-light-regular text-[5rem] mb-6 text-white select-none">
            Catálogo
          </h1>
          <p className="text-3xl mb-10 text-white select-none">
            Seleção de fragrâncias com acabamento impecável.
          </p>
        </div>
      </section>

      {/* Grid de produtos */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {loading ? (
          <p className="text-center text-brand-textMuted">
            Carregando produtos...
          </p>
        ) : produtos.length === 0 ? (
          <p className="text-center text-brand-textMuted">
            Nenhum produto disponível.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtos.map((p) => (
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
      </div>
    </main>
  );
}
