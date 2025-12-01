import { useTheme } from "../context/themeProvider";
import { useAuth } from "../context/authProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { theme, cycleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showUserBox, setShowUserBox] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const cartIcon =
    theme === "dark"
      ? "/images/shopping_bag_2.png"
      : "/images/shopping_bag.png";

  const loginIcon =
    theme === "dark" ? "/images/login_branco.png" : "/images/login_preto.png";

  const userIcon =
    theme === "dark"
      ? "/images/user_attributes_white.png"
      : "/images/user_attributes_black.png";

  const logoutIcon =
    theme === "dark"
      ? "/images/logout_24dp_white.png"
      : "/images/logout_24dp_black.png";

  const handleLogout = () => {
    logout(); // limpa sessão/token
    toast.info("Você saiu da sua conta.");
    navigate("/login"); // redireciona para login
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-brand-surface shadow-soft relative">
      {/* Logo gigante em camada superior */}
      <div
        className="absolute top-2 left-6 z-50 cursor-pointer group animate-fadeInLeft"
        onClick={cycleTheme}
      >
        <img
          src="/images/logo.png"
          alt="Parfun Imports"
          className="h-36 w-36 rounded-full border-4 border-brand-border shadow-strong group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* Botão hamburguer (mobile) */}
      <button
        className="md:hidden text-brand-text focus:outline-none ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Menu centralizado (desktop) */}
      <nav className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-4">
          <li>
            <a href="/" className="btn-accent">
              Home
            </a>
          </li>
          <li>
            <a href="/products" className="btn-accent">
              Produtos
            </a>
          </li>
          <li>
            <a href="/profile" className="btn-accent">
              Perfil
            </a>
          </li>
          {isAdmin && (
            <>
              <li>
                <a href="/admin/products" className="btn-accent">
                  Admin Produtos
                </a>
              </li>
              <li>
                <a href="/admin/orders" className="btn-accent">
                  Admin Pedidos
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
      {/* Ícones à direita */}
      <div className="flex items-center gap-6">
        {/* Carrinho */}
        <div className="relative group">
          <a href="/cart">
            <img
              src={cartIcon}
              alt="Carrinho"
              className="h-8 w-8 hover:scale-105 transition"
            />
          </a>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition delay-[1500ms]">
            Carrinho
          </span>
        </div>

        {/* Usuário */}
        {user && (
          <div className="relative group">
            <img
              src={userIcon}
              alt="Usuário"
              className="h-8 w-8 cursor-pointer hover:scale-105 transition"
              onClick={() => setShowUserBox(!showUserBox)}
            />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition delay-[1500ms]">
              Usuário
            </span>
          </div>
        )}

        {/* Login */}
        <div className="relative group">
          <a href="/login">
            <img
              src={loginIcon}
              alt="Login"
              className="h-10 w-10 hover:scale-105 transition"
            />
          </a>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition delay-[1500ms]">
            Login
          </span>
        </div>
      </div>
      {/* Caixa flutuante do usuário */}
      {showUserBox && user && (
        <div className="absolute right-6 top-20 w-64 bg-brand-surface shadow-strong rounded-xl p-4 border border-brand-border">
          <h3 className="text-lg font-semibold mb-2">Informações do Usuário</h3>
          <p className="text-sm">Nome: {user?.name}</p>
          <p className="text-sm">Email: {user?.email}</p>

          <button
            onClick={handleLogout}
            className="btn-secondary mt-4 flex items-center gap-2"
          >
            <img src={logoutIcon} alt="Logout" className="w-5 h-5" />
            Logout
          </button>
        </div>
      )}
      {/* Menu mobile */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-brand-surface shadow-strong p-6 md:hidden">
          <ul className="flex flex-col gap-4">
            <li>
              <a href="/" className="btn-accent w-full text-center">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="btn-accent w-full text-center">
                Produtos
              </a>
            </li>
            <li>
              <a href="/profile" className="btn-accent w-full text-center">
                Perfil
              </a>
            </li>
            {isAdmin && (
              <>
                <li>
                  <a
                    href="/admin/products"
                    className="btn-accent w-full text-center"
                  >
                    Admin Produtos
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/orders"
                    className="btn-accent w-full text-center"
                  >
                    Admin Pedidos
                  </a>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="btn-secondary w-full text-center"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
