import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePasswordValidation from "../hooks/usePasswordValidation";
import { useTheme } from "../context/themeProvider";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const { validate, getMessage } = usePasswordValidation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate(password)) {
      setMessage(getMessage());
      return;
    }

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grant_type: "password",
            username: email,
            password: password,
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE, // ✅ incluído
            scope: import.meta.env.VITE_AUTH0_SCOPE, // ✅ incluído
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setMessage(
          `❌ Erro: ${data.error_description || "Credenciais inválidas"}`
        );
        return;
      }

      if (data.access_token) {
        if (rememberMe) {
          localStorage.setItem("auth_token", data.access_token);
        } else {
          sessionStorage.setItem("auth_token", data.access_token);
        }
        window.location.href = "/dashboard";
      } else {
        setMessage("❌ Credenciais inválidas");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Erro ao fazer login");
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

        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-brand-text mb-2">
              Email ou Usuário
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email ou usuário"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-brand-text mb-2">Senha</label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-brand-text">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Lembrar-me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-brand-accent hover:underline"
            >
              Esqueci a senha
            </Link>
          </div>

          <div className="flex justify-between mt-6 gap-4">
            <Link to="/register" className="flex-1 btn-accent text-center">
              Inscrever-se
            </Link>

            <Link to="/" className="flex-1 btn-secondary text-center">
              Sair
            </Link>
          </div>

          <button type="submit" className="w-full btn-accent mt-4">
            Entrar
          </button>
        </form>

        {message && (
          <p className="mt-6 text-sm text-brand-text text-center">{message}</p>
        )}
      </div>
    </main>
  );
}
