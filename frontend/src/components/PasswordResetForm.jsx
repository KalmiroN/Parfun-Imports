import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import usePasswordValidation from "../hooks/usePasswordValidation";
import { useTheme } from "../context/themeProvider";

/* ===========================
   Componente local PasswordInput
   =========================== */
function PasswordInput({ value, onChange, placeholder, name }) {
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

export default function PasswordResetForm({ emailOverride }) {
  const { user } = useAuth0();
  const { validate, getMessage } = usePasswordValidation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("❌ As senhas não conferem.");
      return;
    }

    if (!validate(newPassword)) {
      setError(getMessage());
      return;
    }

    try {
      const response = await fetch(
        `https://${
          import.meta.env.VITE_AUTH0_DOMAIN
        }/dbconnections/change_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            email: emailOverride || user?.email,
            connection: "Username-Password-Authentication",
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(`❌ Erro: ${data.error_description || data.error}`);
        return;
      }

      toast.success("✅ Link de redefinição enviado para seu email.");
      setError("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("❌ Erro ao solicitar redefinição de senha.");
    }
  };

  return (
    <div className="mt-10">
      <hr className="my-8 border-brand-border" />
      <h3 className="text-xl text-brand-text font-semibold mb-4 text-center">
        Alterar Senha
      </h3>

      <form onSubmit={handlePasswordReset} className="space-y-6">
        <div>
          <label className="block text-brand-text mb-2">Nova senha</label>
          <PasswordInput
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nova senha"
          />
        </div>

        <div>
          <label className="block text-brand-text mb-2">
            Confirmar nova senha
          </label>
          <PasswordInput
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar nova senha"
          />
        </div>

        <button type="submit" className="btn-accent w-full">
          Enviar link de redefinição
        </button>
      </form>

      {error && (
        <p className="mt-6 text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}
