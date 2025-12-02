import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authProvider";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    } else {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Perfil atualizado com sucesso!");
  };

  if (!user) return null;

  return (
    <div
      className="flex items-center justify-center min-h-[calc(100vh-200px)] w-full bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/images/background_files/gold-backgraund-02.jpg')",
      }}
    >
      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 w-full max-w-lg p-10 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-soft animate-fadeInUp">
        <h2 className="love-light-regular text-3xl text-brand-text text-center mb-8">
          Meu Perfil
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-brand-text mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-brand-text mb-2">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-brand-text mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-brand-text mb-2">Endereço</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Seu endereço"
              className="input-field"
            />
          </div>

          <button type="submit" className="btn-accent w-full">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
