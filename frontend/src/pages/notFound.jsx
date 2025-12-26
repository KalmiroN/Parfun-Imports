import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
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
          ❓ Página não encontrada
        </h2>

        <p className="text-brand-text mb-8 leading-relaxed">
          O endereço que você tentou acessar não existe ou foi removido.
          <br />
          Verifique a URL ou escolha uma das opções abaixo.
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold shadow-strong hover:scale-105 transition-transform duration-500 select-none"
          >
            Voltar à página inicial
          </Link>
          <Link
            to="/catalogo"
            className="flex-1 px-6 py-3 rounded-full border border-brand-border text-brand-text bg-transparent shadow-strong hover:bg-brand-accent hover:text-black transition-colors duration-300 text-center select-none"
          >
            Ir para catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
