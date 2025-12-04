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
      <div className="absolute inset-0 bg-black/50" />

      {/* Container */}
      <div className="relative w-full max-w-lg p-10 md:p-12 rounded-2xl bg-white/20 backdrop-blur-md border border-brand-border shadow-strong text-center">
        <h2 className="love-light-regular text-4xl md:text-5xl text-brand-text mb-6">
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
            className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500"
          >
            Ir para Dashboard
          </Link>
          <Link
            to="/"
            className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500"
          >
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
