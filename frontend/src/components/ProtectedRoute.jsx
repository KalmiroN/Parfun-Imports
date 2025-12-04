import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute
 * - Bloqueia acesso se não houver token
 * - Se receber `role`, valida também o papel do usuário
 * - Redireciona para `redirectTo` (default: "/login") se não autorizado
 */
export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  role,
}) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // só funciona se o backend enviar

  // Se não houver token → redireciona
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  // Se a rota exigir role específico e o usuário não tiver → bloqueia
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  // Se autorizado → renderiza o conteúdo protegido
  return children;
}
