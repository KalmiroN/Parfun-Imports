import { useState } from "react";

export default function Wishlist() {
  // Placeholder de produtos favoritos
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Perfume Exemplo 1",
      price: "R$ 299,90",
      image: "/images/perfume1.jpg", // **ALTERAR depois**
    },
    {
      id: 2,
      name: "Perfume Exemplo 2",
      price: "R$ 399,90",
      image: "/images/perfume2.jpg", // **ALTERAR depois**
    },
  ]);

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Minha Lista de Favoritos
        </h2>

        {favorites.length === 0 ? (
          <p className="text-brand-textMuted">
            Você ainda não adicionou nenhum perfume aos favoritos.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favorites.map((item) => (
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
                <button
                  onClick={() =>
                    setFavorites(favorites.filter((f) => f.id !== item.id))
                  }
                  className="mt-4 w-full px-4 py-2 rounded-full border border-brand-border text-brand-text bg-transparent shadow-strong hover:bg-brand-accent hover:text-black transition-colors duration-300 select-none"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
