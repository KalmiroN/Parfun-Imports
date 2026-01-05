import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/ThemeProvider";
import Highlights from "../components/Highlights";
import { Link } from "react-router-dom"; // ✅ importado

// ✅ Array local de produtos, igual ao Products.jsx
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

          {/* Botões principais */}
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

      {/* Seção de destaques */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-display mb-6 text-brand-text text-center select-none">
          Destaques
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {produtos.slice(0, 3).map((p) => (
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
    </main>
  );
}
