import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider"; // carrinho
import { useWishlist } from "../context/WishlistProvider"; // favoritos
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlistItems, removeById } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = (item) => {
    addToCart(item);
    removeById(item.id);
    toast.success(`${item.name} foi movido para o carrinho!`);
  };

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Minha Lista de Favoritos
        </h2>

        {wishlistItems.length === 0 ? (
          <p className="text-brand-textMuted">
            Você ainda não adicionou nenhum perfume aos favoritos.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
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
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full px-4 py-2 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-300"
                    aria-label={`Mover ${item.name} para o carrinho`}
                  >
                    Mover para carrinho
                  </button>
                  <button
                    onClick={() => {
                      removeById(item.id);
                      toast.info("Produto removido dos favoritos.");
                    }}
                    className="w-full px-4 py-2 rounded-full border border-brand-border text-brand-text bg-transparent shadow-strong hover:bg-red-500 hover:text-white transition-colors duration-300"
                    aria-label={`Remover ${item.name} dos favoritos`}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botão para voltar */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500"
          >
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
