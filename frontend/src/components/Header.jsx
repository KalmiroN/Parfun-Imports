// ===== Header.jsx — Parte 1/2 =====

import { useTheme } from "../context/themeProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { theme, cycleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth0();
  const [showUserBox, setShowUserBox] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const triggerRef = useRef(null);
  const userBoxRef = useRef(null);

  const roles = user?.["https://parfun-imports.com/roles"] || [];
  const isAdmin = roles.includes("admin");

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
    logout({
      logoutParams: {
        returnTo: import.meta.env.VITE_AUTH0_POST_LOGOUT_REDIRECT_URI,
      },
    });
    toast.info("Você saiu da sua conta.");
    navigate("/logged-out");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setShowUserBox(false);
  };

  // Fecha ao clicar fora
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

      {/* Botão hamburguer (mobile) */}
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
        <ul className="flex gap-4">
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
          {isAuthenticated && (
            <li>
              <Link to="/profile" className="btn-accent">
                Perfil
              </Link>
            </li>
          )}
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
          <Link to="/cart" aria-label="Abrir carrinho">
            <img
              src={cartIcon}
              alt="Carrinho"
              className="h-8 w-8 hover:scale-105 transition-transform duration-300 pointer-events-auto"
            />
          </Link>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition delay-[1500ms]">
            Carrinho
          </span>
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
            className="p-0 m-0 bg-transparent rounded-full hover:scale-105 transition-transform duration-300 pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setShowUserBox((prev) => !prev);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowUserBox((prev) => !prev);
              }
            }}
            aria-haspopup="menu"
            aria-expanded={showUserBox}
            aria-label="Abrir menu do usuário"
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
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition delay-[1500ms]">
            Usuário
          </span>

          {/* Caixa flutuante do usuário */}
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

                  <div className="flex flex-col gap-2 mt-4">
                    <Link
                      to="/profile"
                      className="btn-accent w-full text-center"
                    >
                      Endereço
                    </Link>
                    <Link
                      to="/wallet"
                      className="btn-accent w-full text-center"
                    >
                      Vale Desconto
                    </Link>
                    <Link
                      to="/profile"
                      className="btn-accent w-full text-center"
                    >
                      Perfil
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
                      <img src={logoutIcon} alt="Logout" className="w-5 h-5" />
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
                    <Link to="/login" className="btn-accent w-full text-center">
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

        {/* Login (ícone separado, continua visível) */}
        {!isAuthenticated && (
          <div className="relative group">
            <Link to="/login" aria-label="Ir para login">
              <img
                src={loginIcon}
                alt="Login"
                className="h-10 w-10 hover:scale-105 transition-transform duration-300 pointer-events-auto"
              />
            </Link>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition delay-[1500ms]">
              Login
            </span>
          </div>
        )}
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-brand-surface shadow-strong p-6 md:hidden z-50">
          <ul className="flex flex-col gap-4">
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
            {isAuthenticated && (
              <li>
                <Link to="/profile" className="btn-accent w-full text-center">
                  Perfil
                </Link>
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
    </header>
  );
}
