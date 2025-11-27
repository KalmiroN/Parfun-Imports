import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="transition-colors duration-500">
      <Hero
        backgroundImage="/hero-perfumes.jpg"
        title="Elegância em cada fragrância"
        subtitle="Descubra perfumes exclusivos com presença sofisticada e conforto no dia a dia."
        actions={[
          { href: "/products", label: "Ver produtos", primary: true },
          { href: "/my-orders", label: "Meus pedidos", primary: false },
        ]}
      />
    </main>
  );
}
