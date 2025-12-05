// src/components/ProductCard.jsx
import { useCart } from "../context/cartProvider";
import { useAuth } from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductCard({ id, name, price, imageUrl }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!user) {
      navigate("/login"); // ✅ redireciona para login se não estiver logado
      return;
    }
    addToCart({ id, name, price, imageUrl, quantity: 1 });
    toast.success(`${name} foi adicionado ao carrinho!`);
  };

  return (
    <article
      className="rounded-xl border border-brand-border bg-brand-surface shadow-2xl 
                 overflow-hidden transition duration-500 transform hover:scale-105 hover:shadow-2xl select-none"
    >
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
            {price}
          </span>
          <button
            onClick={handleAdd}
            className="px-5 py-2 rounded-full border border-brand-border text-brand-text 
                       font-bold text-base hover:bg-brand-accent hover:text-black transition-colors duration-500 select-none"
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
