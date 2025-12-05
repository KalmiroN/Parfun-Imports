import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

export default function PrivateRoute({ children, requiredRole }) {
  const { user } = useAuth();

  // Se não estiver logado, manda para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se tiver role exigida e não bater, manda para acesso negado
  if (requiredRole && user.role.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/access-denied" replace />;
  }

  // Caso contrário, renderiza o conteúdo
  return children;
}
