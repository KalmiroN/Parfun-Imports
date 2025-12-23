import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

/**
 * ProtectedRoute (PrivateRoute)
 * - Garante que apenas usuários autenticados acessem a rota.
 * - Se `allowedRoles` for passado, também valida se o usuário tem a role necessária.
 *
 * Props:
 * - children: componente/rota protegida
 * - redirectTo: rota para redirecionar se não estiver autenticado (default: /login)
 * - allowedRoles: lista de roles permitidas (ex.: ["admin", "client"])
 */
export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
}) {
  const { user, isAuthenticated, loadingAuth } = useAuth();

  // Enquanto o estado de autenticação está carregando
  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-brand-text">Carregando...</p>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Normaliza roles do usuário para lowercase
  const userRoles = (user?.roles || []).map((r) => r.toLowerCase());

  // Se a rota exigir roles específicas
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = allowedRoles.some((role) =>
      userRoles.includes(role.toLowerCase())
    );
    if (!hasRole) {
      // Se não tiver a role necessária, redireciona para página de acesso negado
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Se passou em todas as verificações, renderiza o conteúdo protegido
  return children;
}
