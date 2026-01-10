import { useCart } from "../context/CartProvider";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth/AuthProvider";
import { authFetch } from "../utils/authFetch";
import { useTheme } from "../context/ThemeProvider";
import { resolveImageUrl } from "../utils/resolveImageUrl"; // ✅ utilitário atualizado

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  description,
  stock,
}) {
  const { addToCart } = useCart();
  const { isAuthenticated, user, token } = useAuth();
  const { theme } = useTheme();

  const handleAdd = async () => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para adicionar ao carrinho.");
      return;
    }

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
        imageUrl: imageUrl || "/images/default-product.png", // ✅ fallback no payload
        userEmail: user?.email,
      };

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
    <article className="rounded-xl border border-brand-border bg-brand-surface shadow-2xl overflow-hidden transition duration-500 transform hover:scale-105 hover:shadow-2xl select-none flex flex-col">
      {/* Imagem */}
      <div className="aspect-[3/4] bg-brand-surface overflow-hidden">
        <img
          src={resolveImageUrl(imageUrl)} // ✅ normaliza URL
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null; // ✅ evita loop
            e.currentTarget.src = "/images/default-product.png"; // ✅ fallback estável
          }}
          className="h-full w-full object-cover transition duration-500 hover:brightness-110 hover:contrast-105"
          loading="lazy"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-6 flex-1 flex flex-col transition-colors duration-500">
        <h3 className="font-sans text-brand-text text-lg select-none">
          {name || "Produto sem nome"}
        </h3>
        <p className="mt-1 text-sm text-brand-muted select-none">
          {description || "Sem descrição disponível"}
        </p>
        <p className="mt-1 text-sm text-brand-muted select-none">
          Estoque: {stock ?? 0}
        </p>

        {/* Rodapé fixo: preço + botão */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-medium text-brand-text select-none">
            {Number(price || 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <button onClick={handleAdd} className="btn-secondary">
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
