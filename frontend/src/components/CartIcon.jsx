import { Link } from "react-router-dom";
import { useCart } from "../context/cartProvider";

export default function CartIcon() {
  const { getCartCount, getCartTotal } = useCart();

  return (
    <Link to="/cart" className="flex items-center gap-2 cursor-pointer">
      <span className="material-icons">shopping_cart</span>
      <span className="text-sm font-bold">{getCartCount() || 0} itens</span>
      <span className="text-sm text-brand-muted">
        {(getCartTotal() || 0).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    </Link>
  );
}
