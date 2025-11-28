import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

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
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Club-De-Nuit-Woman-01.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Como-Moiselle-00.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Club-De-Nuit-Woman-01.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Como-Moiselle-Near-01.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Delilah-Pour-Femme-00.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Khamrah-Lattafa-00.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Khamrah-Lattafa-Box-01.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Lattafa-Fakhar-00.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Royal-Amber-00.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Sabah-Al-Ward-00.jpg",
  },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/images/Safeer-Al-Noble-Lattafa-00.jpg",
  },
];

export default function Products() {
  return (
    <main className="bg-brand-bg text-brand-text transition-colors duration-500">
      <Hero
        backgroundImage="/images/hero-products.jpg"
        title="Catálogo"
        subtitle="Seleção de fragrâncias com acabamento impecável."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((p, idx) => (
          <ProductCard key={idx} {...p} />
        ))}
      </div>
    </main>
  );
}
