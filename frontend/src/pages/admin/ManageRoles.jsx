import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/AuthProvider";
import { authFetch } from "../../utils/authFetch";
import AdminLayout from "../../components/AdminLayout";

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
      } catch {
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
        { method: "POST", body: JSON.stringify({ role }) },
        token
      );
      toast.success("Role atribuída com sucesso!");
    } catch {
      toast.error("Erro ao atribuir role.");
    }
  };

  const removeRole = async (userId, role) => {
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/admin/users/${userId}/roles`,
        { method: "DELETE", body: JSON.stringify({ role }) },
        token
      );
      toast.success("Role removida com sucesso!");
    } catch {
      toast.error("Erro ao remover role.");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-brand-text">Carregando usuários...</p>
      </AdminLayout>
    );
  }
  if (error) {
    return (
      <AdminLayout>
        <p className="text-red-500">{error}</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-8">
          Gerenciar Roles
        </h2>
        <div className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-6">
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
      </div>
    </AdminLayout>
  );
}
