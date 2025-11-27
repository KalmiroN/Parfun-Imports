import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const produtos = [
  { name: "Ameeri", price: "R$ 499,00", imageUrl: "/produtos/ameeri.jpg" },
  { name: "Noora", price: "R$ 429,00", imageUrl: "/produtos/noora.jpg" },
  {
    name: "Ameer Al Oud",
    price: "R$ 539,00",
    imageUrl: "/produtos/ameer-al-oud.jpg",
  },
];

export default function Products() {
  return (
    <main className="transition-colors duration-500">
      <Hero
        backgroundImage="/hero-products.jpg"
        title="Catálogo"
        subtitle="Seleção de fragrâncias com acabamento impecável."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((p) => (
          <ProductCard key={p.name} {...p} />
        ))}
      </div>
    </main>
  );
}
