import { useCart } from "../context/cartProvider";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useTheme } from "../context/themeProvider";

export default function ProductCard({ id, name, price, imageUrl }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth0();
  const { theme } = useTheme();

  const handleAdd = () => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para adicionar ao carrinho.");
      return;
    }
    addToCart({ id, name, price, imageUrl, quantity: 1 });
    toast.success(`${name} foi adicionado ao carrinho!`);
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
            {price}
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

/* ===========================
   Componente de Input de Senha
   =========================== */

export function PasswordInput({ placeholder = "Digite sua senha" }) {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  const eyeIcon =
    theme === "dark" ? "/images/eye_white.png" : "/images/eye_black.png";

  const offIcon =
    theme === "dark"
      ? "/images/visibility_off_white.png"
      : "/images/visibility_off_black.png";

  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        className="border rounded px-3 py-2 w-full text-brand-text bg-brand-surface"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-2"
      >
        <img
          src={show ? offIcon : eyeIcon}
          alt={show ? "Ocultar senha" : "Mostrar senha"}
          className="w-6 h-6"
        />
      </button>
    </div>
  );
}
