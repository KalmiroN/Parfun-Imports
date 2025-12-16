// ===== Profile.jsx — Parte 1/2 =====

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // ✅ hook oficial do Auth0
import { authFetch } from "../utils/authFetch"; // utilitário para fetch com token
import { toast } from "react-toastify";
import { useRoles } from "../hooks/useRoles"; // ✅ hook para roles
import PasswordResetForm from "../components/PasswordResetForm"; // ✅ formulário modular de alteração de senha

export default function Profile() {
  const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const { roles, isAdmin, isAdminSecondary, isClient } = useRoles();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Buscar dados do usuário no backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) {
        loginWithRedirect();
        return;
      }

      try {
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/user/me`,
          {},
          () =>
            getAccessTokenSilently({
              authorizationParams: {
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                scope: "openid profile email",
              },
            })
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar perfil.");
        }

        const data = await response.json();
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, loginWithRedirect, getAccessTokenSilently]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/user/update`,
        {
          method: "PUT",
          body: JSON.stringify({ name, phone, email, address }),
        },
        () =>
          getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              scope: "openid profile email",
            },
          })
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil.");
      }

      toast.success("Perfil atualizado com sucesso!");
      setError("");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  if (!isAuthenticated) return null;

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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 w-full max-w-lg p-10 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-soft animate-fadeInUp">
        <h2 className="love-light-regular text-3xl text-brand-text text-center mb-8">
          Meu Perfil
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* ✅ Informações básicas do usuário */}
        <div className="mb-8 space-y-4">
          <div className="p-4 border border-brand-border rounded-lg bg-white/40">
            <h3 className="text-lg font-semibold text-brand-text">Nome</h3>
            <p className="text-brand-textMuted">
              {user?.name || user?.nickname}
            </p>
          </div>

          <div className="p-4 border border-brand-border rounded-lg bg-white/40">
            <h3 className="text-lg font-semibold text-brand-text">Email</h3>
            <p className="text-brand-textMuted">{user?.email}</p>
          </div>

          <div className="p-4 border border-brand-border rounded-lg bg-white/40">
            <h3 className="text-lg font-semibold text-brand-text">Roles</h3>
            {roles.length > 0 ? (
              <ul className="list-disc list-inside text-brand-textMuted">
                {roles.map((role, idx) => (
                  <li key={idx}>{role}</li>
                ))}
              </ul>
            ) : (
              <p className="text-brand-textMuted">Nenhuma role atribuída</p>
            )}
          </div>
        </div>

        {/* ✅ Botões diferentes por role */}
        <div className="mb-8">
          {isClient && (
            <div className="flex flex-col gap-4">
              <a href="/my-orders" className="btn-accent w-full">
                Meus Pedidos
              </a>
              <a href="/wishlist" className="btn-accent w-full">
                Minha Wishlist
              </a>
            </div>
          )}

          {isAdminSecondary && (
            <div className="flex flex-col gap-4">
              <a href="/admin/products" className="btn-accent w-full">
                Gerenciar Produtos
              </a>
              <a href="/admin/orders" className="btn-accent w-full">
                Gerenciar Pedidos
              </a>
            </div>
          )}

          {isAdmin && (
            <div className="flex flex-col gap-4">
              <a href="/admin/manage-roles" className="btn-secondary w-full">
                Gerenciar Usuários / Roles
              </a>
            </div>
          )}
        </div>

        {/* ✅ Formulário de edição */}
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

        {/* ✅ Bloco modular de alteração de senha (reutilizável com PasswordInput) */}
        <PasswordResetForm emailOverride={user?.email} />
      </div>
    </div>
  );
}
