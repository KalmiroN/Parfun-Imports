import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const handleRecover = (e) => {
    e.preventDefault();
    alert("Instruções de recuperação enviadas para o e-mail informado!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-bg transition-colors duration-500">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-soft">
        <h2 className="font-display text-3xl text-brand-text text-center mb-6">
          Recuperar Senha
        </h2>

        <form onSubmit={handleRecover} className="space-y-4">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-2 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            required
          />

          {/* Botões de ação */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500"
            >
              Recuperar senha
            </button>
            <Link
              to="/login"
              className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
            >
              Voltar ao login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
