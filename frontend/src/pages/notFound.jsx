import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-bg transition-colors duration-500">
      <div className="text-center p-8 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-soft max-w-md">
        <h2 className="font-display text-4xl text-brand-text mb-4">
          Página não encontrada
        </h2>
        <p className="text-brand-textMuted mb-8">
          O endereço que você tentou acessar não existe ou foi removido.
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
          >
            Voltar à página inicial
          </Link>
          <Link
            to="/products"
            className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
          >
            Ir para catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
