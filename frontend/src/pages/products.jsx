import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/themeProvider";

const produtos = [
  {
    name: "Ameeri",
    price: "R$ 499,00",
    imageUrl: "/images/Ameeri-Al-Wataniah-00.jpg",
  },
  {
    name: "Noora",
    price: "R$ 429,00",
    imageUrl: "/images/Angel-Isabelle-La-Belle-00.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Asad-Lattafa-00.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Club-De-Nuit-Intense-Man-00.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Club-De-Nuit-Woman-00.jpg",
  },
];

export default function Products() {
  const { theme } = useTheme();
  const hasDarkOverlay = theme === "dark";

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
          {/* Título com fonte Love Light */}
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
        {produtos.map((p, idx) => (
          <ProductCard key={idx} {...p} />
        ))}
      </div>
    </main>
  );
}
