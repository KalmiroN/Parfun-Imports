import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

/**
 * ProtectedRoute
 * - Garante que apenas usuários autenticados acessem a rota.
 * - Se `allowedRoles` for passado, também valida se o usuário tem a role necessária.
 *
 * Props:
 * - children: componente/rota protegida
 * - allowedRoles: lista de roles permitidas (ex.: ["ADMIN", "CLIENTE"])
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loadingAuth } = useAuth();

  // 👉 Log para debug
  console.log("ProtectedRoute - user:", user);

  // Enquanto o estado de autenticação está carregando
  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-brand-text">Carregando...</p>
      </div>
    );
  }

  // Se não estiver autenticado → redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agora basta usar diretamente user.role
  const userRole = user?.role?.toUpperCase();

  // Se a rota exigir roles específicas
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = allowedRoles.some(
      (role) => role.toUpperCase() === userRole
    );
    if (!hasRole) {
      // 🚨 Se não tiver permissão → redireciona para Home
      return <Navigate to="/" replace />;
    }
  }

  // Se passou em todas as verificações, renderiza o conteúdo protegido
  return children;
}
