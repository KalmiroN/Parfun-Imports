import { useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Placeholder: simula resultados
    setResults([
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
    ]);
  };

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Buscar Perfumes
        </h2>

        <form onSubmit={handleSearch} className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Digite o nome ou fragrância..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500"
          >
            Buscar
          </button>
        </form>

        {results.length === 0 ? (
          <p className="text-brand-textMuted">Nenhum resultado encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((item) => (
              <div
                key={item.id}
                className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-4 transition-colors duration-500"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-display text-brand-text">
                  {item.name}
                </h3>
                <p className="text-brand-textMuted">{item.price}</p>

                {/* Botões de ação */}
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <button className="flex-1 px-4 py-2 rounded-full bg-brand-accent text-black hover:opacity-90 transition-colors duration-500">
                    Adicionar ao carrinho
                  </button>
                  <Link
                    to="/products"
                    className="flex-1 px-4 py-2 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
                  >
                    Voltar ao catálogo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
