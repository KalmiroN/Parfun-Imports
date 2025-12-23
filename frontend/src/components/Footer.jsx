import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Footer() {
  const navigate = useNavigate();

  // Checa se existe usuário logado no localStorage
  const isAuthenticated = !!localStorage.getItem("user");

  return (
    <footer className="bg-brand-surface border-t border-brand-border shadow-soft mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo + nome */}
        <div className="flex items-center gap-4 animate-fadeInLeft">
          <img
            src="/images/logo.png"
            alt="Parfun Imports"
            className="h-14 w-14 rounded-full border border-brand-border shadow-md"
          />
          <span className="text-2xl font-display text-brand-text tracking-wide">
            Parfun Imports
          </span>
        </div>

        {/* Links úteis */}
        <div className="flex flex-col gap-2 text-brand-text animate-fadeInUp text-center md:text-left">
          <h3 className="font-semibold mb-2">Links úteis</h3>
          <a href="/products" className="hover:text-brand-accent transition">
            Produtos
          </a>
          <button
            className="hover:text-brand-accent transition text-left"
            onClick={() => {
              if (isAuthenticated) {
                navigate("/profile");
              } else {
                toast.info("Você precisa estar logado para acessar o perfil.");
              }
            }}
          >
            Perfil
          </button>
          <a href="/cart" className="hover:text-brand-accent transition">
            Carrinho
          </a>
          <a href="/contact" className="hover:text-brand-accent transition">
            Contato
          </a>
        </div>

        {/* Redes sociais */}
        <div className="flex flex-col items-center gap-3 animate-fadeInRight">
          <h3 className="font-semibold text-brand-text">Siga-nos</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img
                src="/images/facebook.png"
                alt="Facebook"
                className="h-8 w-8 hover:scale-110 transition"
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img
                src="/images/instagram.png"
                alt="Instagram"
                className="h-8 w-8 hover:scale-110 transition"
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img
                src="/images/twitter_X.png"
                alt="Twitter/X"
                className="h-8 w-8 hover:scale-110 transition"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-brand-muted py-4 border-t border-brand-border">
        © {new Date().getFullYear()} Parfun Imports — Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
