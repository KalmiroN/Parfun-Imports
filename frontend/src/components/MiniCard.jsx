import { resolveImageUrl } from "../utils/resolveImageUrl"; // ✅ utilitário para normalizar URLs

export default function MiniCard({ item, onAddToCart, onDelete }) {
  return (
    <div className="flex items-center gap-3 border-b border-brand-border py-2">
      <img
        src={resolveImageUrl(item?.imageUrl)} // ✅ normaliza URL
        alt={item?.name || "Produto"}
        onError={(e) => {
          e.currentTarget.onerror = null; // ✅ evita loop infinito
          e.currentTarget.src = "/images/default-product.png"; // ✅ fallback estável
        }}
        className="w-12 h-12 rounded object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold">{item?.name}</p>
        <p className="text-xs text-brand-text">
          {Number(item?.price || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart(item)}
          className="btn-accent text-xs px-2 py-1"
        >
          ➕ Carrinho
        </button>
        <button
          onClick={() => onDelete(item)}
          className="btn-secondary text-xs px-2 py-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
