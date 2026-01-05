export default function LoginIcon({
  navigate,
  loginIcon,
  tooltip,
  startTooltip,
  stopTooltip,
}) {
  return (
    <div
      className="relative group"
      onMouseEnter={() => startTooltip("login")}
      onMouseLeave={() => stopTooltip("login")}
    >
      <button
        aria-label="Ir para login"
        onClick={() => navigate("/login")}
        className="bg-transparent"
      >
        <img
          src={loginIcon}
          alt="Login"
          className="h-8 w-8 hover:scale-105 transition-transform duration-300"
        />
      </button>
      {tooltip.login && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-black/80 text-white shadow-soft">
          Login
        </div>
      )}
    </div>
  );
}
