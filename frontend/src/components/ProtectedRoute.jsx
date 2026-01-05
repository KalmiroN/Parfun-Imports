import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

/**
 * ProtectedRoute
 * - Garante que apenas usuários autenticados acessem a rota.
 * - Se `allowedRoles` for passado, também valida se o usuário tem a role necessária.
 * - Se `redirectOnUnauthenticated` for false, não redireciona; apenas renderiza `children`
 *   (útil para páginas como Perfil, que mostram mensagem em vez de redirecionar).
 *
 * Props:
 * - children: componente/rota protegida
 * - allowedRoles: lista de roles permitidas (ex.: ["ADMIN", "CLIENTE"])
 * - redirectOnUnauthenticated: boolean (default: true)
 */
export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectOnUnauthenticated = true,
}) {
  const { user, isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-brand-text">Carregando...</p>
      </div>
    );
  }

  // Se não estiver autenticado
  if (!isAuthenticated) {
    // comportamento padrão: redireciona para login
    if (redirectOnUnauthenticated) {
      return <Navigate to="/login" replace />;
    }
    // caso especial (Perfil): não redireciona, deixa a página mostrar a mensagem
    return children;
  }

  const userRole = user?.role?.toUpperCase();

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = allowedRoles.some(
      (role) => role.toUpperCase() === userRole
    );
    if (!hasRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
