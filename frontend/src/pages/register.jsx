import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Falha no cadastro. Verifique os dados.");
      }

      const data = await response.json();

      // Salva token no localStorage
      localStorage.setItem("token", data.token);

      // Redireciona para dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
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
        <h2 className="font-display text-3xl text-brand-text text-center mb-6 transition-colors duration-500">
          Cadastro
        </h2>

        {/* Formulário */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-2 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            placeholder="Nome completo"
            type="text"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-2 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            placeholder="E-mail"
            type="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-2 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            placeholder="Senha"
            type="password"
            required
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-2 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            placeholder="Confirmar senha"
            type="password"
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
