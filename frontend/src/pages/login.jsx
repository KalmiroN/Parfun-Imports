import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Falha no login. Verifique suas credenciais.");
      }

      const data = await response.json();

      // ✅ Log para verificar o que o backend retorna
      console.log("Resposta do backend:", data);

      // ✅ Salva token e role (se existir) no localStorage
      localStorage.setItem("token", data.token);
      if (data.role) {
        localStorage.setItem("role", data.role);
      }

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

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
