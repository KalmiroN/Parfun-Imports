import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/background_files/Orquidea.jpg')",
      }}
    >
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Container com efeito vidro */}
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-soft">
        <h2 className="font-display text-3xl text-brand-text text-center mb-6 transition-colors duration-500">
          Cadastro
        </h2>

        {/* Formulário */}
        <form className="space-y-4">
          <input
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-2 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            placeholder="Nome completo"
            type="text"
          />
          <input
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-2 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            placeholder="E-mail"
            type="email"
          />
          <input
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-2 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            placeholder="Senha"
            type="password"
          />
          <input
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-2 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            placeholder="Confirmar senha"
            type="password"
          />

          {/* Botões de ação */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 px-6 py-3 text-lg font-semibold text-brand-text rounded-full bg-brand-accent hover:opacity-90 transition-colors duration-500"
            >
              Cadastrar
            </button>
            <Link
              to="/"
              className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
            >
              Voltar à página inicial
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
