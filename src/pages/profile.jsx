import React, { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-bg transition-colors duration-500">
      <div className="w-full max-w-lg p-10 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-soft">
        <h2 className="love-light-regular text-3xl text-brand-text text-center mb-8">
          Meu Perfil
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Nome */}
          <div>
            <label className="block text-brand-text mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full px-4 py-3 rounded-lg border border-brand-border bg-brand-surface text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent"
              required
            />
          </div>

          {/* Campo Telefone */}
          <div>
            <label className="block text-brand-text mb-2">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-3 rounded-lg border border-brand-border bg-brand-surface text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          {/* Campo E-mail */}
          <div>
            <label className="block text-brand-text mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-3 rounded-lg border border-brand-border bg-brand-surface text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent"
              required
            />
          </div>

          {/* Campo Endereço */}
          <div>
            <label className="block text-brand-text mb-2">Endereço</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Seu endereço"
              className="w-full px-4 py-3 rounded-lg border border-brand-border bg-brand-surface text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          {/* Botão salvar */}
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500"
          >
            Salvar
          </button>
        </form>
      </div>
    </main>
  );
}
