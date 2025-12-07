import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function PrivateRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useAuth0();

  // Se não estiver logado, manda para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Pega roles da claim customizada
  const roles = user?.["https://parfun-imports.com/roles"] || [];

  // Se tiver role exigida e não bater, manda para acesso negado
  if (requiredRole && !roles.includes(requiredRole)) {
    return <Navigate to="/access-denied" replace />;
  }

  // Caso contrário, renderiza o conteúdo
  return children;
}
