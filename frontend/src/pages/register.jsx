import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeProvider";

/* ===========================
   Componente local PasswordInput
   =========================== */
function PasswordInput({
  value,
  onChange,
  placeholder = "Digite sua senha",
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
    <div className="relative w-full">
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

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("❌ As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnections/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            email,
            password,
            connection: "Username-Password-Authentication",
            user_metadata: { name },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setMessage(`❌ Erro: ${data.error_description || data.error}`);
        return;
      }

      if (data._id) {
        setMessage("✅ Conta criada com sucesso! Agora você pode fazer login.");
        navigate("/login");
      } else {
        setMessage("❌ Erro ao criar conta.");
      }
    } catch (err) {
      setMessage("❌ Erro ao criar conta.");
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
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-3 text-brand-text shadow-strong placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-brand-border bg-brand-surface/70 px-4 py-3 text-brand-text shadow-strong placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            required
          />

          {/* ✅ Campo de senha com toggle */}
          <PasswordInput
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />

          {/* ✅ Campo de confirmação de senha com toggle */}
          <PasswordInput
            name="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirme sua senha"
          />

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold shadow-strong hover:scale-105 transition-transform duration-500 select-none"
            >
              Criar Conta
            </button>

            <Link
              to="/"
              className="flex-1 px-6 py-3 rounded-full border border-brand-border text-brand-text bg-transparent shadow-strong hover:bg-brand-accent hover:text-black transition-colors duration-300 text-center select-none"
            >
              Sair
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
