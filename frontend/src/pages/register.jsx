import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/auth/AuthProvider";
import { authFetch } from "../utils/authFetch";

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

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("❌ As senhas não coincidem.");
      return;
    }

    try {
      const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`, // ✅ corrigido para usar /api/auth/register
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            rawPassword: password, // ✅ campo correto
            role: "CLIENTE", // ✅ define papel padrão
          }),
        }
      );

      const data = response.data;

      // 🔎 tratamento específico para email duplicado
      if (response.status === 409) {
        setMessage("❌ Esse email já está em uso, tente outro.");
        return;
      }

      if (!response.ok) {
        setMessage(`❌ ${data?.error || "Falha ao registrar."}`);
        return;
      }

      // ✅ chama login corretamente com email e senha
      const success = await login(email, password, true);
      if (success) {
        setMessage("✅ Cadastro realizado com sucesso!");
        navigate("/");
      } else {
        setMessage("❌ Falha ao realizar login após cadastro.");
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setMessage("❌ Falha ao registrar. Tente novamente.");
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

      <div className="relative w-full max-w-4xl p-20 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-strong">
        <h2 className="font-display text-3xl text-brand-text text-center mb-6 select-none">
          Cadastro
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />

          <PasswordInput
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirme sua senha"
          />

          <div className="flex gap-4 mt-6">
            <button type="submit" className="flex-1 btn-accent">
              Criar Conta
            </button>
            <Link to="/" className="flex-1 btn-secondary text-center">
              Cancelar
            </Link>
          </div>
        </form>

        {message && (
          <p className="mt-6 text-sm text-brand-text text-center">{message}</p>
        )}
      </div>
    </main>
  );
}
