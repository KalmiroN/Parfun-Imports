import { useTheme } from "../../context/ThemeProvider";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthProvider";
import { useCart } from "../../context/CartProvider";
import { toast } from "react-toastify";

import NavigationMenu from "./NavigationMenu";
import UserMenu from "./UserMenu"; // ✅ atualizado
import CartIcon from "./CartIcon";
import LoginIcon from "./LoginIcon";
import UserIcon from "./UserIcon";
import useTooltip from "./useTooltip";

export default function Header() {
  const { theme, cycleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const triggerRef = useRef(null);
  const userMenuRef = useRef(null);

  const { user, isAuthenticated, logout } = useAuth();
  const { setShowSaveLater } = useCart();

  const { tooltip, startTooltip, stopTooltip } = useTooltip();

  // Ícones dinâmicos conforme tema
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
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setShowUserMenu(false);
  };

  // Fecha UserMenu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (!showUserMenu) return;
      const clickedInsideTrigger =
        triggerRef.current && triggerRef.current.contains(event.target);
      const clickedInsideBox =
        userMenuRef.current && userMenuRef.current.contains(event.target);
      if (!clickedInsideTrigger && !clickedInsideBox) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  return (
    <>
      {/* Header com fundo baseado em var(--color-surface) */}
      <header className="flex items-center justify-between px-6 py-4 bg-[var(--color-surface)] shadow-soft relative">
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
        <NavigationMenu
          isAuthenticated={isAuthenticated}
          user={user}
          navigate={navigate}
          location={location}
          setShowSaveLater={setShowSaveLater}
          toast={toast}
        />

        {/* Ícones à direita */}
        <div className="flex items-center gap-4">
          {location.pathname !== "/cart" && (
            <CartIcon
              isAuthenticated={isAuthenticated}
              navigate={navigate}
              toast={toast}
              cartIcon={cartIcon}
              tooltip={tooltip}
              startTooltip={startTooltip}
              stopTooltip={stopTooltip}
            />
          )}

          <UserIcon
            isAuthenticated={isAuthenticated}
            user={user}
            defaultUserIcon={defaultUserIcon}
            triggerRef={triggerRef}
            setShowUserMenu={setShowUserMenu}
            tooltip={tooltip}
            startTooltip={startTooltip}
            stopTooltip={stopTooltip}
          />

          {!isAuthenticated && (
            <LoginIcon
              navigate={navigate}
              loginIcon={loginIcon}
              tooltip={tooltip}
              startTooltip={startTooltip}
              stopTooltip={stopTooltip}
            />
          )}
        </div>

        {/* Caixa flutuante do usuário */}
        {showUserMenu && (
          <UserMenu
            isAuthenticated={isAuthenticated}
            user={user}
            navigate={navigate}
            handleLogout={handleLogout}
            logoutIcon={logoutIcon}
            userBoxRef={userMenuRef}
          />
        )}
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <NavigationMenu
          isAuthenticated={isAuthenticated}
          user={user}
          navigate={navigate}
          location={location}
          setShowSaveLater={setShowSaveLater}
          toast={toast}
          mobile
        />
      )}
    </>
  );
}
