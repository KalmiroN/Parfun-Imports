import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authProvider";
import { useRoles } from "../hooks/useRoles";
import PasswordResetForm from "../components/PasswordResetForm";
import { authFetch } from "../utils/authFetch";

export default function Profile() {
  const { user, token, updateUser } = useAuth(); // 👈 agora usamos updateUser
  const { roles, isAdmin, isAdminSecondary, isClient } = useRoles();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [password, setPassword] = useState(""); // 👈 novo estado para senha
  const [error, setError] = useState("");

  // ✅ Atualiza os estados quando o user mudar
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Monta payload dinamicamente
      const payload = { name, phone, email, address };
      if (password && password.trim() !== "") {
        payload.password = password;
      }

      const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/user/update`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        },
        token
      );

      // ✅ Atualiza contexto com dados retornados pelo backend
      if (response.ok && response.data) {
        updateUser(response.data);
      }

      toast.success("Perfil atualizado com sucesso!");
      setPassword(""); // limpa campo de senha após salvar
      setError("");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-brand-text">Você não está logado.</p>
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
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-lg p-10 rounded-2xl bg-white/30 backdrop-blur-md border border-brand-border shadow-soft animate-fadeInUp">
        <h2 className="love-light-regular text-3xl text-brand-text text-center mb-8">
          Meu Perfil
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Informações básicas */}
        <div className="mb-8 space-y-4">
          <div className="p-4 border border-brand-border rounded-lg bg-white/40">
            <h3 className="text-lg font-semibold text-brand-text">Nome</h3>
            <p className="text-brand-textMuted">{name}</p>
          </div>
          <div className="p-4 border border-brand-border rounded-lg bg-white/40">
            <h3 className="text-lg font-semibold text-brand-text">Email</h3>
            <p className="text-brand-textMuted">{email}</p>
          </div>
          <div className="p-4 border border-brand-border rounded-lg bg-white/40">
            <h3 className="text-lg font-semibold text-brand-text">Telefone</h3>
            <p className="text-brand-textMuted">{phone || "Não informado"}</p>
          </div>
          <div className="p-4 border border-brand-border rounded-lg bg-white/40">
            <h3 className="text-lg font-semibold text-brand-text">Endereço</h3>
            <p className="text-brand-textMuted">{address || "Não informado"}</p>
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

        {/* Botões por role */}
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

        {/* Formulário de edição */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-brand-text mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              className="input-field"
              placeholder="Digite seu telefone"
            />
          </div>
          <div>
            <label className="block text-brand-text mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="input-field"
              placeholder="Digite seu endereço"
            />
          </div>
          <div>
            <label className="block text-brand-text mb-2">
              Nova Senha (opcional)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Digite uma nova senha"
            />
          </div>
          <button type="submit" className="btn-accent w-full">
            Salvar
          </button>
        </form>

        {/* Reset de senha */}
        <PasswordResetForm emailOverride={email} />
      </div>
    </div>
  );
}
