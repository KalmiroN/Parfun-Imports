import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-brand-bg text-brand-text px-6">
      <div className="bg-brand-surface shadow-soft rounded-xl p-10 text-center max-w-lg w-full">
        <h2 className="text-3xl font-display mb-4">Acesso Negado</h2>
        <p className="text-brand-textMuted mb-8">
          Você não tem permissão para acessar esta página.
          <br />
          Caso acredite que isso seja um erro, entre em contato com o suporte.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* ✅ Corrigido para apontar para /admin */}
          <Link
            to="/admin"
            className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
          >
            Ir para Dashboard
          </Link>

          <Link
            to="/"
            className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
          >
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
