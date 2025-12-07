// src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithRedirect(); // ✅ redireciona para Auth0
    } catch (err) {
      console.error("Erro no login:", err);
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

      {/* Container do login */}
      <div className="relative w-full max-w-lg p-12 rounded-2xl bg-white/20 backdrop-blur-md border border-brand-border shadow-strong">
        <h2 className="love-light-regular text-5xl text-brand-text text-center mb-8 select-none">
          Login
        </h2>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <button
              type="submit"
              className="btn-accent w-full mt-4 select-none"
            >
              Entrar com Auth0
            </button>

            <div className="flex justify-between mt-6">
              <Link
                to="/register"
                className="btn-secondary text-center select-none"
              >
                Inscrever-se
              </Link>
              <Link to="/" className="btn-secondary text-center select-none">
                Sair
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center text-brand-text">
            <p>Você já está logado como:</p>
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
