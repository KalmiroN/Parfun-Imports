import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute
 * - Bloqueia acesso se não houver token
 * - Se receber `allowedRoles`, valida se o papel do usuário está incluído
 * - Redireciona para `redirectTo` (default: "/login") se não autorizado
 */
export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
}) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // precisa vir do backend

  // Se não houver token → redireciona para login
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  // Se houver roles definidas e o usuário não estiver incluído → redireciona para Unauthorized
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Se autorizado → renderiza o conteúdo protegido
  return children;
}
