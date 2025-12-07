// src/pages/admin/ManageRoles.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function ManageRoles() {
  const { getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ⚠️ Configure seu domínio Auth0
  const DOMAIN = "SEU_DOMINIO.auth0.com"; // ex: dev-abc123.us.auth0.com

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // ✅ obtém token via Auth0 (se configurado)
        const token = await getAccessTokenSilently({
          audience: `https://${DOMAIN}/api/v2/`,
          scope: "read:users update:users",
        });

        const res = await axios.get(`https://${DOMAIN}/api/v2/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        setError("Não foi possível carregar usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAccessTokenSilently]);

  const assignRole = async (userId, roleId) => {
    try {
      const token = await getAccessTokenSilently({
        audience: `https://${DOMAIN}/api/v2/`,
        scope: "update:users",
      });

      await axios.post(
        `https://${DOMAIN}/api/v2/users/${userId}/roles`,
        { roles: [roleId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Role atribuída com sucesso!");
    } catch (err) {
      console.error("Erro ao atribuir role:", err);
      alert("Erro ao atribuir role.");
    }
  };

  const removeRole = async (userId, roleId) => {
    try {
      const token = await getAccessTokenSilently({
        audience: `https://${DOMAIN}/api/v2/`,
        scope: "update:users",
      });

      await axios.delete(`https://${DOMAIN}/api/v2/users/${userId}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { roles: [roleId] },
      });
      alert("Role removida com sucesso!");
    } catch (err) {
      console.error("Erro ao remover role:", err);
      alert("Erro ao remover role.");
    }
  };

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1>Gerenciar Roles</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Email</th>
            <th>Roles</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td>{u.email}</td>
              <td>{u.app_metadata?.roles?.join(", ") || "Nenhuma"}</td>
              <td>
                <button
                  onClick={() => assignRole(u.user_id, "ROLE_ID_CLIENTE")}
                >
                  Tornar Cliente
                </button>
                <button
                  onClick={() =>
                    assignRole(u.user_id, "ROLE_ID_ADMIN_SECUNDARIO")
                  }
                >
                  Tornar Admin Secundário
                </button>
                <button onClick={() => assignRole(u.user_id, "ROLE_ID_ADMIN")}>
                  Tornar Admin
                </button>
                <button onClick={() => removeRole(u.user_id, "ROLE_ID_ADMIN")}>
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
