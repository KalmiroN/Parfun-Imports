import { useTheme } from "../context/themeProvider";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useRoles } from "../hooks/useRoles";
import CartIcon from "../components/CartIcon";
import { useAuth } from "../context/authProvider";

export default function Header() {
  const { theme, cycleTheme } = useTheme();
  const [showUserBox, setShowUserBox] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const triggerRef = useRef(null);
  const userBoxRef = useRef(null);

  const { user, isAuthenticated, logout } = useAuth();

  const { isAdmin, isAdminSecondary, isClient } = useRoles();

  const cartIcon =
    theme === "dark"
      ? "/images/shopping_bag_2.png"
      : "/images/shopping_bag.png";
  const loginIcon =
    theme === "dark" ? "/images/login_branco.png" : "/images/login_preto.png";
  const logoutIcon =
    theme === "dark"
      ? "/images/logout_24dp_white.png"
      : "/images/logout_24dp_black.png";
  const defaultUserIcon =
    theme === "dark" ? "/images/person_branco.png" : "/images/person_preto.png";

  const handleLogout = () => {
    logout();
    toast.info("Você saiu da sua conta.", {
      position: "bottom-right",
      autoClose: 2000,
    });
    // navigate("/") já é feito dentro do logout()
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setShowUserBox(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (!showUserBox) return;
      const clickedInsideTrigger =
        triggerRef.current && triggerRef.current.contains(event.target);
      const clickedInsideBox =
        userBoxRef.current && userBoxRef.current.contains(event.target);
      if (!clickedInsideTrigger && !clickedInsideBox) {
        setShowUserBox(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserBox]);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-brand-surface shadow-soft relative">
        {/* Logo */}
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

        {/* Hamburguer mobile */}
        <button
          className="md:hidden text-brand-text focus:outline-none ml-auto"
          onClick={toggleMenu}
          aria-label="Abrir menu"
          type="button"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Menu desktop */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/" className="btn-accent">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="btn-accent">
                Produtos
              </Link>
            </li>
            <li>
              <button
                className="btn-accent"
                onClick={() => {
                  if (isAuthenticated) {
                    navigate("/profile");
                  } else {
                    toast.warn(
                      "Você precisa estar logado para acessar o perfil.",
                      {
                        position: "bottom-right",
                        autoClose: 2000,
                      }
                    );
                    navigate("/login");
                  }
                }}
              >
                Perfil
              </button>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link to="/admin/products" className="btn-accent">
                    Admin Produtos
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders" className="btn-accent">
                    Admin Pedidos
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Ícones à direita */}
        <div className="flex items-center gap-6">
          {/* Carrinho */}
          <div className="relative group">
            <Link
              to={isAuthenticated ? "/cart" : "/login"}
              aria-label="Abrir carrinho"
              onClick={() => {
                if (!isAuthenticated) {
                  toast.warn("Faça login para acessar o carrinho.", {
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
            </Link>
          </div>

          {/* Usuário */}
          <div className="relative group flex items-center gap-2">
            {isAuthenticated && (
              <span className="text-sm text-brand-text">
                Olá, {user?.name?.split(" ")[0]}
              </span>
            )}
            <button
              ref={triggerRef}
              type="button"
              className="bg-transparent rounded-full hover:scale-105 transition-transform duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setShowUserBox((prev) => !prev);
              }}
            >
              <img
                src={
                  isAuthenticated
                    ? user?.picture || defaultUserIcon
                    : defaultUserIcon
                }
                alt="Usuário"
                className="h-8 w-8 rounded-full"
              />
            </button>

            {/* Ícone login aparece quando não autenticado */}
            {!isAuthenticated && (
              <Link to="/login" aria-label="Login">
                <img
                  src={loginIcon}
                  alt="Login"
                  className="h-8 w-8 hover:scale-105 transition-transform duration-300"
                />
              </Link>
            )}

            {/* Caixa flutuante */}
            {showUserBox && (
              <div
                ref={userBoxRef}
                className="absolute right-0 top-12 w-64 bg-brand-surface shadow-strong rounded-xl p-4 border border-brand-border z-50"
              >
                {isAuthenticated ? (
                  <>
                    <h3 className="text-lg font-semibold mb-2">
                      Informações do Usuário
                    </h3>
                    <p className="text-sm">Nome: {user?.name}</p>
                    <p className="text-sm">Email: {user?.email}</p>
                    <p className="text-sm text-orange-400 font-semibold mt-1">
                      Usuário:{" "}
                      {isAdmin
                        ? "Admin"
                        : isAdminSecondary
                        ? "Admin secundário"
                        : isClient
                        ? "Cliente"
                        : "Usuário"}
                    </p>

                    <div className="flex flex-col gap-2 mt-4">
                      <button
                        className="btn-accent w-full text-center"
                        onClick={() => navigate("/profile")}
                      >
                        Endereço
                      </button>
                      <Link
                        to="/wallet"
                        className="btn-accent w-full text-center"
                      >
                        Vale Desconto
                      </Link>
                      <Link
                        to="/my-orders"
                        className="btn-accent w-full text-center"
                      >
                        Meus Pedidos
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="btn-secondary w-full flex items-center justify-center gap-2"
                      >
                        <img
                          src={logoutIcon}
                          alt="Logout"
                          className="w-5 h-5"
                        />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold mb-2">Bem-vindo!</h3>
                    <p className="text-sm mb-4">
                      Faça login ou cadastre-se para continuar.
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link
                        to="/login"
                        className="btn-accent w-full text-center"
                      >
                        Entrar
                      </Link>
                      <Link
                        to="/register"
                        className="btn-secondary w-full text-center"
                      >
                        Registrar
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-brand-surface shadow-strong p-6 md:hidden z-50">
          <ul className="flex flex-col gap-4 items-center">
            <li>
              <Link to="/" className="btn-accent w-full text-center">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="btn-accent w-full text-center">
                Produtos
              </Link>
            </li>
            <li>
              <Link
                to={isAuthenticated ? "/cart" : "/login"}
                className="btn-accent w-full text-center"
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.warn("Faça login para acessar o carrinho.", {
                      position: "bottom-right",
                      autoClose: 2000,
                    });
                  }
                }}
              >
                Carrinho
              </Link>
            </li>
            <li>
              <button
                className="btn-accent w-full text-center"
                onClick={() => {
                  if (isAuthenticated) {
                    navigate("/profile");
                  } else {
                    toast.warn(
                      "Você precisa estar logado para acessar o perfil.",
                      {
                        position: "bottom-right",
                        autoClose: 2000,
                      }
                    );
                    navigate("/login");
                  }
                }}
              >
                Perfil
              </button>
            </li>

            {isAuthenticated && (
              <li className="text-sm text-orange-400 font-semibold">
                Usuário:{" "}
                {isAdmin
                  ? "Admin"
                  : isAdminSecondary
                  ? "Admin secundário"
                  : isClient
                  ? "Cliente"
                  : "Usuário"}
              </li>
            )}

            {isAdmin && (
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
        </nav>
      )}
    </>
  );
}
