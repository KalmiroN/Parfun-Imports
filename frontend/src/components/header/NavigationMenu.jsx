import { Link } from "react-router-dom";

export default function NavigationMenu({
  isAuthenticated,
  user,
  navigate,
  location,
  setShowSaveLater,
  toast,
  mobile = false,
}) {
  const Wrapper = "nav";
  const listClass = mobile
    ? "flex flex-col gap-4 items-center"
    : "flex gap-4 items-center";

  return (
    <Wrapper
      className={
        mobile
          ? "absolute top-full left-0 w-full bg-[var(--color-surface)] shadow-strong p-6 md:hidden z-50"
          : "hidden md:flex flex-1 justify-center bg-[var(--color-surface)]"
      }
    >
      <ul className={listClass}>
        <li>
          <Link to="/" className="btn-accent w-full text-center">
            Home
          </Link>
        </li>
        <li>
          <Link to="/catalogo" className="btn-accent w-full text-center">
            Catálogo
          </Link>
        </li>

        <li>
          <button
            className="btn-accent w-full text-center"
            onClick={() => {
              if (isAuthenticated) {
                navigate("/profile");
              } else {
                toast.warn("Você precisa estar logado para acessar o perfil.", {
                  position: "bottom-right",
                  autoClose: 2000,
                });
              }
            }}
          >
            Perfil
          </button>
        </li>

        {location.pathname === "/cart" && (
          <li>
            <button
              className="btn-accent w-full text-center"
              onClick={() => setShowSaveLater(true)}
            >
              Itens Salvos
            </button>
          </li>
        )}

        {user?.role?.toUpperCase() === "ADMIN" && (
          <>
            <li>
              <Link
                to="/admin/products"
                className="btn-accent w-full text-center"
              >
                Admin Produtos
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="btn-accent w-full text-center"
              >
                Admin Pedidos
              </Link>
            </li>
          </>
        )}
      </ul>
    </Wrapper>
  );
}
