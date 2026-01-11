export default function UserMenu({
  isAuthenticated,
  user,
  navigate,
  handleLogout,
  logoutIcon,
  userBoxRef,
}) {
  const formatRole = (role) => {
    if (!role) return "cliente";
    return role.toUpperCase() === "ADMIN" ? "Admin" : "cliente";
  };

  return (
    <div
      ref={userBoxRef}
      className="
        glass-card absolute right-0 top-12 w-64 p-4
        shadow-strong animate-fadeIn user-info-menu
      "
    >
      {isAuthenticated ? (
        <>
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text)]">
            Informações do Usuário
          </h3>
          <p className="text-sm text-[var(--color-text)]">Nome: {user?.name}</p>
          <p className="text-sm text-[var(--color-text)]">
            Email: {user?.email}
          </p>
          <p className="text-sm text-orange-400 font-semibold mt-1">
            Usuário: {formatRole(user?.role)}
          </p>

          <div className="flex flex-col gap-2 mt-4">
            <button
              className="btn-accent w-full text-center"
              onClick={() => navigate("/profile")}
            >
              Endereço
            </button>
            <button
              className="btn-accent w-full text-center"
              onClick={() => navigate("/wallet")}
            >
              Vale Desconto
            </button>
            <button
              className="btn-accent w-full text-center"
              onClick={() => navigate("/my-orders")}
            >
              Meus Pedidos
            </button>
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
          <h3 className="text-lg font-semibold mb-2 text-[var(--color-text)]">
            Bem-vindo!
          </h3>
          <p className="text-sm mb-4 text-[var(--color-text)]">
            Faça login ou cadastre-se para continuar.
          </p>
          <div className="flex flex-col gap-2">
            <button
              className="btn-accent w-full text-center"
              onClick={() => navigate("/login")}
            >
              Entrar
            </button>
            <button
              className="btn-secondary w-full text-center"
              onClick={() => navigate("/register")}
            >
              Registrar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
