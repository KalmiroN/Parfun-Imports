import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authProvider"; // 👈 pega token do contexto
import { authFetch } from "../../utils/authFetch"; // ✅ corrigido

export default function ManageRoles() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/admin/users`,
          {},
          token
        );
        setUsers(res.data || []);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        setError("Não foi possível carregar usuários.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUsers();
  }, [token]);

  const assignRole = async (userId, role) => {
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}/roles`,
        {
          method: "POST",
          body: JSON.stringify({ role }),
        },
        token
      );
      toast.success("Role atribuída com sucesso!");
    } catch (err) {
      console.error("Erro ao atribuir role:", err);
      toast.error(err.message || "Erro ao atribuir role.");
    }
  };

  const removeRole = async (userId, role) => {
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}/roles`,
        {
          method: "DELETE",
          body: JSON.stringify({ role }),
        },
        token
      );
      toast.success("Role removida com sucesso!");
    } catch (err) {
      console.error("Erro ao remover role:", err);
      toast.error(err.message || "Erro ao remover role.");
    }
  };

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-brand-surface rounded-xl shadow-soft">
      <h1 className="text-2xl font-display text-brand-text mb-6">
        Gerenciar Roles
      </h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-brand-bg">
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Roles</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-brand-border">
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                {u.roles?.length > 0 ? u.roles.join(", ") : "Nenhuma"}
              </td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => assignRole(u.id, "client")}
                  className="btn-accent"
                >
                  Tornar Cliente
                </button>
                <button
                  onClick={() => assignRole(u.id, "admin_secondary")}
                  className="btn-accent"
                >
                  Tornar Admin Secundário
                </button>
                <button
                  onClick={() => assignRole(u.id, "admin")}
                  className="btn-accent"
                >
                  Tornar Admin
                </button>
                <button
                  onClick={() => removeRole(u.id, "admin")}
                  className="btn-secondary"
                >
                  Revogar Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
