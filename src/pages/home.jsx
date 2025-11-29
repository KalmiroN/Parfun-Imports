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
          <h1 className="text-4xl font-bold mb-4 text-white">
            Bem-vindo à Parfun Imports
          </h1>
          <p className="text-lg mb-6 text-white">
            Fragrâncias exclusivas que elevam sua presença.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/products"
              className="px-6 py-3 rounded-full bg-brand-accent text-black hover:opacity-90 transition"
            >
              Ver Catálogo
            </a>
            {/* Botão Carrinho com o mesmo estilo dos ProductCard */}
            <a
              href="/cart"
              className="px-4 py-2 rounded-full border border-brand-border text-brand-text hover:bg-brand-accent hover:text-black transition-colors duration-500"
            >
              Carrinho
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-display mb-6 text-brand-text text-center">
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
