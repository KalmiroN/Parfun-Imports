import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authProvider";

export default function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Define role com base no email
    const role = email === "admin@site.com" ? "admin" : "client";

    // Atualiza contexto de autenticação
    setUser({
      name: role === "admin" ? "Administrador" : "Usuário Teste",
      email: email,
      role: role,
    });

    // Redireciona para perfil
    window.location.href = "/profile";
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-3 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="btn-accent w-full mt-4">
            Login
          </button>

          <div className="flex justify-between mt-6">
            <Link to="/register" className="btn-secondary text-center">
              Inscrever-se
            </Link>
            <Link to="/" className="btn-secondary text-center">
              Sair
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
