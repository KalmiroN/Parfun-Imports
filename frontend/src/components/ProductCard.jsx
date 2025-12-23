import { useCart } from "../context/cartProvider";
import { toast } from "react-toastify";
import { useAuth } from "../context/authProvider";
import { authFetch } from "../utils/authFetch";
import { useTheme } from "../context/themeProvider";

export default function ProductCard({ id, name, price, imageUrl }) {
  const { addToCart } = useCart();
  const { isAuthenticated, user, token } = useAuth();
  const { theme } = useTheme();

  const handleAdd = async () => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para adicionar ao carrinho.");
      return;
    }

    // 🚨 valida ID e preço antes de enviar
    const productId = Number(id);
    const productPrice = Number(price);

    if (!productId || isNaN(productId)) {
      toast.error("Produto inválido. ID não encontrado.");
      return;
    }

    if (!productPrice || isNaN(productPrice)) {
      toast.error("Preço inválido.");
      return;
    }

    try {
      const payload = {
        productId,
        quantity: 1,
        name: String(name).trim(),
        price: productPrice,
        imageUrl,
        userEmail: user?.email,
      };

      console.log("Payload enviado ao backend:", payload);

      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        token
      );

      if (!res.ok) {
        throw new Error(res.data?.error || "Erro ao adicionar ao carrinho.");
      }

      toast.success(`${name} foi adicionado ao carrinho!`);
      addToCart(payload);
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
      toast.error(err.message || "Erro ao comunicar com a API.");
    }
  };

  return (
    <article className="rounded-xl border border-brand-border bg-brand-surface shadow-2xl overflow-hidden transition duration-500 transform hover:scale-105 hover:shadow-2xl select-none">
      <div className="aspect-[3/4] bg-brand-surface overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition duration-500 hover:brightness-110 hover:contrast-105"
          loading="lazy"
        />
      </div>

      <div className="p-6 transition-colors duration-500">
        <h3 className="font-sans text-brand-text text-lg select-none">
          {name}
        </h3>
        <p className="mt-1 text-sm text-brand-muted select-none">
          Eau de parfum
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium text-brand-text select-none">
            {Number(price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <button
            onClick={handleAdd}
            className="px-5 py-2 rounded-full border border-brand-border text-brand-text font-bold text-base hover:bg-brand-accent hover:text-black transition-colors duration-500 select-none"
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
