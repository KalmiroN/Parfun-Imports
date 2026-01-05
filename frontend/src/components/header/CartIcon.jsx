export default function CartIcon({
  isAuthenticated,
  navigate,
  toast,
  cartIcon,
  tooltip,
  startTooltip,
  stopTooltip,
}) {
  return (
    <div
      className="relative group"
      onMouseEnter={() => startTooltip("cart")}
      onMouseLeave={() => stopTooltip("cart")}
    >
      <button
        aria-label="Abrir carrinho"
        onClick={() => {
          if (isAuthenticated) {
            navigate("/cart");
          } else {
            toast.warn("Você precisa estar logado para acessar o carrinho.", {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        }}
      >
        <img
          src={cartIcon}
          alt="Carrinho"
          className="h-8 w-8 hover:scale-105 transition-transform duration-300"
        />
      </button>
      {tooltip.cart && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-black/80 text-white shadow-soft">
          Carrinho
        </div>
      )}
    </div>
  );
}
