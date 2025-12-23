import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/themeProvider";

// ✅ Cada produto tem um id numérico e o preço é número
const produtos = [
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
  {
    id: 4,
    name: "Ameer Al Oud",
    price: 539.0,
    imageUrl: "/images/Club-De-Nuit-Intense-Man-00.jpg",
  },
  {
    id: 5,
    name: "Ameer Al Oud",
    price: 539.0,
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
            name={p.name}
            price={p.price} // ✅ número enviado ao backend
            imageUrl={p.imageUrl}
          />
        ))}
      </div>
    </main>
  );
}
