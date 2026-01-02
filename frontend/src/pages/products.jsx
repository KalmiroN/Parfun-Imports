import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/ThemeProvider";
import axios from "axios";

export default function Products() {
  const { theme } = useTheme();
  const hasDarkOverlay = theme === "dark";

  const [produtos, setProdutos] = useState([]);

  // ✅ Carregar produtos do backend (rota pública)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        console.log("Produtos recebidos:", res.data); // 👀 log para verificar formato
        setProdutos(res.data || []);
      } catch (err) {
        console.error("Erro ao carregar produtos", err);
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
            Catálogo
          </h1>
          <p className="text-3xl mb-10 text-white select-none">
            Seleção de fragrâncias com acabamento impecável.
          </p>
        </div>
      </section>

      {/* Grid de produtos */}
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name || p.nome || "Produto sem nome"} // ✅ fallback
            price={p.price || p.valor || 0} // ✅ fallback
            imageUrl={p.imageUrl || p.imagem || "/images/default-product.png"} // ✅ fallback
            description={p.description || "Sem descrição"} // ✅ fallback
            stock={p.stock ?? 0} // ✅ fallback
          />
        ))}
      </div>
    </main>
  );
}
