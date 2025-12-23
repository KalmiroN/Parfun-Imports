import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/background_files/Orquidea.jpg')",
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Card central */}
      <div className="relative w-full max-w-2xl p-16 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-strong text-center">
        <h2 className="font-display text-3xl text-brand-text mb-6 select-none">
          Você saiu da sua conta
        </h2>
        <p className="text-brand-text mb-8">
          Clique abaixo para entrar novamente.
        </p>
        <Link
          to="/login"
          className="px-6 py-3 rounded-full bg-brand-accent text-black font-semibold shadow-strong hover:scale-105 transition-transform duration-500 select-none"
        >
          Ir para Login
        </Link>
      </div>
    </main>
  );
}
