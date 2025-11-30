import { Link } from "react-router-dom";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login realizado com sucesso!");
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/background_files/Orquidea.jpg')",
      }}
    >
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Container do login */}
      <div className="relative w-full max-w-lg p-12 rounded-2xl bg-white/20 backdrop-blur-md border border-brand-border shadow-strong">
        <h2 className="love-light-regular text-5xl text-brand-text text-center mb-8">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="E-mail"
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-3 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-3 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            required
          />

          <div className="flex justify-between items-center text-sm mt-2">
            <label className="flex items-center gap-2 text-brand-text">
              <input type="checkbox" className="accent-brand-accent" />
              Lembrar-me
            </label>
            <Link
              to="/forgot-password"
              className="text-brand-accent hover:underline transition-colors duration-300"
            >
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-brand-accent text-black font-bold hover:opacity-90 transition-colors duration-500 mt-4"
          >
            Login
          </button>

          <div className="flex justify-between mt-6">
            <Link
              to="/register"
              className="px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
            >
              Inscrever-se
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
            >
              Sair
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
