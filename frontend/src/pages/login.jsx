import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const { login, isAuthenticated, user, rememberMe, setRememberMe } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const success = await login(email, password, rememberMe);
      if (success) {
        navigate("/");
      } else {
        setMessage("❌ Email ou senha incorretos.");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setMessage("❌ Falha no login. Verifique suas credenciais.");
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
      <div className="absolute inset-0 bg-black/20" />

      {/* Container com efeito vidro fosco */}
      <div className="glass-card relative w-full max-w-4xl p-20 shadow-strong">
        <h2 className="love-light-regular text-5xl text-brand-text text-center mb-8 select-none">
          Login
        </h2>

        {isAuthenticated ? (
          <div className="space-y-6 text-center text-brand-text">
            <p>
              Você já está logado como{" "}
              <strong>{user?.name || user?.email}</strong> 👋
            </p>
            <Link to="/" className="btn-accent w-full text-center">
              Ir para Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="input-field"
              autoComplete="email"
              required
            />

            {/* Senha */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="input-field pr-12"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-brand-text/70 hover:text-brand-text"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            {/* Checkbox lembrar-me */}
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 text-sm text-brand-text">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="toggle-checkbox"
                />
                Lembrar-me
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-brand-accent hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button type="submit" className="w-full btn-accent mt-4">
              Entrar
            </button>

            <div className="flex justify-between mt-6 gap-4">
              <Link to="/register" className="flex-1 btn-accent text-center">
                Inscrever-se
              </Link>
              <Link to="/" className="flex-1 btn-secondary text-center">
                Sair
              </Link>
            </div>
          </form>
        )}

        {message && (
          <p className="mt-6 text-sm text-red-600 text-center">{message}</p>
        )}
      </div>
    </main>
  );
}
