import { Link } from "react-router-dom";

export default function AdminProducts() {
  // Placeholder: lista de produtos
  const produtos = [
    { id: 1, name: "Ameeri", price: "R$ 499,00" },
    { id: 2, name: "Noora", price: "R$ 429,00" },
  ];

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Administração de Produtos
        </h2>

        {produtos.length === 0 ? (
          <p className="text-brand-textMuted">Nenhum produto cadastrado.</p>
        ) : (
          <div className="space-y-6">
            {produtos.map((p) => (
              <div
                key={p.id}
                className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-4 transition-colors duration-500 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-display text-brand-text">
                    {p.name}
                  </h3>
                  <p className="text-brand-textMuted">{p.price}</p>
                </div>
                <button className="px-4 py-2 rounded-full bg-red-500 text-white hover:opacity-90 transition-colors duration-500">
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link
            to="/admin/products/new"
            className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
          >
            Adicionar novo produto
          </Link>
          <Link
            to="/products"
            className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
          >
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
