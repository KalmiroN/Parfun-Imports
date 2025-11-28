import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main className="bg-brand-bg text-brand-text transition-colors duration-500">
      <Hero
        backgroundImage="/images/hero-home.jpg"
        title="Bem-vindo à Parfun Imports"
        subtitle="Fragrâncias exclusivas que elevam sua presença."
        actions={[
          { label: "Ver Catálogo", href: "/products", primary: true },
          { label: "Carrinho", href: "/cart" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-display mb-6 text-brand-text">
          Destaques
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Exemplo de cards destacados */}
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
