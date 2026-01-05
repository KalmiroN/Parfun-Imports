export default function UserIcon({
  isAuthenticated,
  user,
  defaultUserIcon,
  triggerRef,
  setShowUserMenu, // ✅ atualizado para o novo nome
  tooltip,
  startTooltip,
  stopTooltip,
}) {
  return (
    <div
      className="relative group flex items-center gap-2"
      onMouseEnter={() => startTooltip("user")}
      onMouseLeave={() => stopTooltip("user")}
    >
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
          setShowUserMenu((prev) => !prev); // ✅ usa setShowUserMenu
        }}
      >
        <img
          src={
            isAuthenticated ? user?.picture || defaultUserIcon : defaultUserIcon
          }
          alt="Usuário"
          className="h-8 w-8 rounded-full"
        />
      </button>

      {tooltip.user && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-black/80 text-white shadow-soft">
          Usuário
        </div>
      )}
    </div>
  );
}
