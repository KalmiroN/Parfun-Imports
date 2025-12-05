import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/themeProvider";

export default function Home() {
  const { theme } = useTheme();
  const hasDarkOverlay = theme === "dark";

  return (
    <main className="bg-brand-bg text-brand-text transition-colors duration-500">
      {/* Hero com controle de overlay */}
      <section
        className="relative min-h-[70vh] flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('/images/background_files/perfumes-arabes-1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {hasDarkOverlay && (
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        )}
        <div className="relative z-10 px-4">
          {/* Título principal com fonte Love Light */}
          <h1 className="love-light-regular text-[5rem] mb-6 text-white select-none">
            Parfun Imports
          </h1>

          {/* Subtítulo aumentado */}
          <p className="text-3xl mb-10 text-white select-none">
            Fragrâncias exclusivas que elevam sua presença.
          </p>

          {/* Botões atualizados */}
          <div className="flex gap-6 justify-center">
            <a
              href="/products"
              className="px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-lg hover:opacity-90 transition select-none"
            >
              Ver Catálogo
            </a>
            <a
              href="/cart"
              className="px-8 py-4 rounded-full border border-brand-border text-brand-text font-bold text-lg hover:bg-brand-accent hover:text-black transition-colors duration-500 select-none"
            >
              Carrinho
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-display mb-6 text-brand-text text-center select-none">
          Destaques
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          <ProductCard
            name="Ameeri"
            price="R$ 499,00"
            imageUrl="/images/Ameeri-Al-Wataniah-00.jpg"
          />
          <ProductCard
            name="Noora"
            price="R$ 429,00"
            imageUrl="/images/Angel-Isabelle-La-Belle-00.jpg"
          />
          <ProductCard
            name="Ameer Al Oud"
            price="R$ 539,00"
            imageUrl="/images/Asad-Lattafa-00.jpg"
          />
        </div>
      </section>
    </main>
  );
}
