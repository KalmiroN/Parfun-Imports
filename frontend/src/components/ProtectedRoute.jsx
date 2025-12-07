// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
}) {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  // Se não estiver autenticado → redireciona
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Recupera roles do usuário (vem do token JWT)
  const userRoles = user?.["https://parfun-imports.com/roles"] || [];

  // Se houver roles definidas e o usuário não estiver incluído → redireciona para AccessDenied
  if (
    allowedRoles &&
    !allowedRoles.some((role) =>
      userRoles.map((r) => r.toLowerCase()).includes(role.toLowerCase())
    )
  ) {
    return <Navigate to="/access-denied" replace />;
  }

  // Se autorizado → renderiza o conteúdo protegido
  return children;
}
