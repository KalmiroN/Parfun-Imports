import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/background_files/Orquidea.jpg')",
      }}
    >
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Card central */}
      <div className="relative w-full max-w-2xl p-16 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-strong text-center">
        <h2 className="font-display text-4xl md:text-5xl text-brand-text mb-6 select-none">
          🚫 Acesso Negado
        </h2>

        <p className="text-brand-text mb-8 leading-relaxed">
          Você não tem permissão para acessar esta página.
          <br />
          Caso acredite que isso seja um erro, entre em contato com o suporte.
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold shadow-strong hover:scale-105 transition-transform duration-500 select-none"
          >
            Ir para Dashboard
          </Link>
          <Link
            to="/"
            className="flex-1 px-6 py-3 rounded-full border border-brand-border text-brand-text bg-transparent shadow-strong hover:bg-brand-accent hover:text-black transition-colors duration-300 text-center select-none"
          >
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
