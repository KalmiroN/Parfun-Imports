import { useTheme } from "../context/themeProvider";
import { useAuth } from "../context/authProvider";

export default function Header() {
  const { theme, cycleTheme } = useTheme();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";
  const cartIcon =
    theme === "dark"
      ? "/images/shopping_bag_2.png"
      : "/images/shopping_bag.png";

  // Ícone de login alterna conforme tema
  const loginIcon =
    theme === "dark" ? "/images/login_branco.png" : "/images/login_preto.png";

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-brand-surface shadow-soft">
      {/* Logo - clique alterna o tema */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={cycleTheme}
      >
        <img
          src="/images/logo.png"
          alt="Parfun Imports"
          className="h-12 hover:opacity-90 transition-transform duration-300 logo-highlight"
        />
      </div>

      {/* Menu centralizado */}
      <nav className="flex-1 flex justify-center">
        <ul className="flex gap-4">
          <li>
            <a
              href="/"
              className="px-4 py-2 rounded-full bg-brand-accent text-black font-sans hover:opacity-90 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/products"
              className="px-4 py-2 rounded-full bg-brand-accent text-black font-sans hover:opacity-90 transition"
            >
              Produtos
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className="px-4 py-2 rounded-full bg-brand-accent text-black font-sans hover:opacity-90 transition"
            >
              Perfil
            </a>
          </li>
          {isAdmin && (
            <>
              <li>
                <a
                  href="/admin/products"
                  className="px-4 py-2 rounded-full bg-brand-accent text-black font-sans hover:opacity-90 transition"
                >
                  Admin Produtos
                </a>
              </li>
              <li>
                <a
                  href="/admin/orders"
                  className="px-4 py-2 rounded-full bg-brand-accent text-black font-sans hover:opacity-90 transition"
                >
                  Admin Pedidos
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Carrinho + Login */}
      <div className="flex items-center gap-6">
        <a href="/cart">
          <img
            src={cartIcon}
            alt="Carrinho"
            className="h-8 w-8 hover:scale-105 transition"
          />
        </a>
        <a href="/login">
          <img
            src={loginIcon}
            alt="Login"
            className="h-10 w-10 hover:scale-105 transition"
          />
        </a>
      </div>
    </header>
  );
}
