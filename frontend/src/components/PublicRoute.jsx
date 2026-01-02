import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

/**
 * PublicRoute
 * - Permite acesso apenas a usuários NÃO autenticados.
 * - Se o usuário já estiver logado, redireciona para uma rota (default: "/").
 *
 * Props:
 * - children: componente/rota pública
 * - redirectTo: rota para redirecionar se já estiver autenticado (default: "/")
 */
export default function PublicRoute({ children, redirectTo = "/" }) {
  const { isAuthenticated, loadingAuth } = useAuth();

  // Enquanto o estado de autenticação está carregando
  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-brand-text">Carregando...</p>
      </div>
    );
  }

  // Se já estiver autenticado, redireciona
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Se não estiver autenticado, renderiza o conteúdo público
  return children;
}
