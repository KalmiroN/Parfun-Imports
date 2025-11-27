import { Link } from "react-router-dom";

export default function Cart() {
  // Placeholder: simulação de itens no carrinho
  const items = [
    {
      id: 1,
      name: "Perfume Exemplo A",
      price: "R$ 249,90",
      image: "/images/perfumeA.jpg", // **ALTERAR depois**
    },
    {
      id: 2,
      name: "Perfume Exemplo B",
      price: "R$ 349,90",
      image: "/images/perfumeB.jpg", // **ALTERAR depois**
    },
  ];

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Meu Carrinho
        </h2>

        {items.length === 0 ? (
          <p className="text-brand-textMuted">Seu carrinho está vazio.</p>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-4 transition-colors duration-500"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-display text-brand-text">
                    {item.name}
                  </h3>
                  <p className="text-brand-textMuted">{item.price}</p>
                </div>
                <button className="px-4 py-2 rounded-full bg-red-500 text-white hover:opacity-90 transition-colors duration-500">
                  Remover
                </button>
              </div>
            ))}

            {/* Botões de ação */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <Link
                to="/checkout"
                className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
              >
                Finalizar compra
              </Link>
              <Link
                to="/products"
                className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
