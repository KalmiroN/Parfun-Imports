import React from "react";
import { useTheme } from "../context/themeProvider";

export default function Register() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] font-[var(--font-family)]">
      {/* Card com efeito de blur e transparência */}
      <div className="backdrop-blur-md bg-[var(--color-bg)]/80 p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="backdrop-blur-lg bg-[var(--color-bg)]/90 rounded-xl p-8 w-full shadow-xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-[var(--color-primary)]">
            Criar Conta
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nome Completo"
              className="w-full p-3 rounded-lg border border-[var(--color-primary)] bg-[var(--color-bg)]/80 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-[var(--color-primary)] bg-[var(--color-bg)]/80 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-3 rounded-lg border border-[var(--color-primary)] bg-[var(--color-bg)]/80 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
            />
            <input
              type="password"
              placeholder="Confirmar Senha"
              className="w-full p-3 rounded-lg border border-[var(--color-primary)] bg-[var(--color-bg)]/80 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
            />
            <button
              type="submit"
              className="w-full py-3 font-bold rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
