import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeProvider";

function PasswordInput({
  value,
  onChange,
  placeholder = "Digite sua nova senha",
  name,
}) {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  const eyeIcon =
    theme === "dark" ? "/images/eye_white.png" : "/images/eye_black.png";
  const offIcon =
    theme === "dark"
      ? "/images/visibility_off_white.png"
      : "/images/visibility_off_black.png";

  return (
    <div className="relative w-full mb-6">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-3 text-brand-text shadow-strong placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirm) {
      setMessage("❌ As senhas não coincidem.");
      return;
    }

    try {
      // ✅ Chamada real à sua API de reset de senha
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao redefinir senha");
      }

      setMessage("✅ Senha redefinida com sucesso!");
    } catch (err) {
      console.error("Erro ao redefinir senha:", err);
      setMessage("❌ Erro ao redefinir senha.");
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/images/background_files/gold-backgraund-02.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-4xl p-20 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-strong">
        <h2 className="font-display text-3xl text-brand-text text-center mb-6 select-none">
          Recuperar Senha
        </h2>

        <form onSubmit={handleReset} className="space-y-6">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-3 text-brand-text shadow-strong placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            required
          />

          <PasswordInput
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Digite sua nova senha"
          />

          <PasswordInput
            name="confirmPassword"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirme sua nova senha"
          />

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-brand-accent text-black font-semibold shadow-strong hover:scale-105 transition-transform duration-500 select-none"
          >
            Redefinir Senha
          </button>
        </form>

        <Link
          to="/login"
          className="mt-6 block px-6 py-3 rounded-full border border-brand-border text-brand-text bg-transparent shadow-strong hover:bg-brand-accent hover:text-black transition-colors duration-300 text-center select-none"
        >
          Voltar
        </Link>

        {message && (
          <p className="mt-6 text-sm text-brand-text text-center">{message}</p>
        )}
      </div>
    </main>
  );
}
