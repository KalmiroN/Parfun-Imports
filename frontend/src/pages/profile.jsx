import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authProvider";
import { authFetch } from "../utils/authFetch"; // ✅ utilitário para fetch com token
import { toast } from "react-toastify";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Buscar dados do usuário no backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/user/me`
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar perfil.");
        }

        const data = await response.json();
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setError(""); // ✅ limpa erro se carregar com sucesso
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // ✅ limpa antes de tentar salvar

    try {
      const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/user/update`,
        {
          method: "PUT",
          body: JSON.stringify({ name, phone, email, address }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil.");
      }

      toast.success("Perfil atualizado com sucesso!");
      setError(""); // ✅ limpa erro se salvar com sucesso
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-brand-text">Carregando perfil...</p>
      </main>
    );
  }
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

        {error && user && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-brand-text mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setError("")}
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
              onFocus={() => setError("")}
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
              onFocus={() => setError("")}
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
              onFocus={() => setError("")}
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
