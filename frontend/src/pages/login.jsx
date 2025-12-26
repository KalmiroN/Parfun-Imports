import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeProvider";
import { useAuth } from "../context/authProvider"; // 👈 usamos apenas o contexto

/* ===========================
   Componente local PasswordInput
   =========================== */
function PasswordInput({ value, onChange, placeholder = "Digite sua senha" }) {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  const eyeIcon =
    theme === "dark" ? "/images/eye_white.png" : "/images/eye_black.png";
  const offIcon =
    theme === "dark"
      ? "/images/visibility_off_white.png"
      : "/images/visibility_off_black.png";

  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
        required
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
        aria-label={show ? "Ocultar senha" : "Mostrar senha"}
      >
        <img
          src={show ? offIcon : eyeIcon}
          alt={show ? "Ocultar senha" : "Mostrar senha"}
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}

export default function Login() {
  const { login, isAuthenticated, user } = useAuth(); // 👈 usamos login do contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await login(email, password); // ✅ strings simples
      if (success) {
        navigate("/"); // redireciona após login
      } else {
        setMessage("❌ Falha no login. Verifique suas credenciais.");
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
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-4xl p-20 rounded-2xl bg-white/20 backdrop-blur-md border border-brand-border shadow-strong">
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="input-field"
              required
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />

            {/* ✅ Novo bloco: Lembrar-me + Esqueceu a senha */}
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 text-sm text-brand-text">
                <input type="checkbox" className="toggle-checkbox" />
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
          <p className="mt-6 text-sm text-brand-text text-center">{message}</p>
        )}
      </div>
    </main>
  );
}
