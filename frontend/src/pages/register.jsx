import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Register() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await loginWithRedirect({
        screen_hint: "signup", // ✅ abre o fluxo de cadastro do Auth0
      });
    } catch (err) {
      console.error("Erro no cadastro:", err);
    }
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

      {/* Container com efeito vidro */}
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-soft">
        <h2 className="font-display text-3xl text-brand-text text-center mb-6 transition-colors duration-500 select-none">
          Cadastro
        </h2>

        {!isAuthenticated ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-semibold text-brand-text rounded-full bg-brand-accent hover:opacity-90 transition-colors duration-500 select-none"
            >
              Criar conta com Auth0
            </button>

            <Link
              to="/"
              className="block mt-4 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center select-none"
            >
              Voltar à página inicial
            </Link>
          </form>
        ) : (
          <div className="text-center text-brand-text">
            <p>Você já está cadastrado e logado como:</p>
            <p className="font-bold">{user?.email}</p>
            <Link
              to="/dashboard"
              className="btn-accent mt-6 inline-block select-none"
            >
              Ir para Dashboard
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
