import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
}) {
  const {
    isAuthenticated,
    user,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated) {
          // tenta renovar token silenciosamente com audience e scope corretos
          await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              scope: import.meta.env.VITE_AUTH0_SCOPE,
            },
          });
        }

        // Recupera roles do usuário (claim customizada vinda da Action do Auth0)
        const userRoles = user?.["https://parfun-imports.com/roles"] || [];

        if (allowedRoles && allowedRoles.length > 0) {
          const hasRole = allowedRoles.some((role) =>
            userRoles.map((r) => r.toLowerCase()).includes(role.toLowerCase())
          );
          setAuthorized(hasRole);
        } else {
          setAuthorized(true);
        }
      } catch (err) {
        console.error("Erro de autenticação:", err);

        if (err.error === "login_required" || err.error === "access_denied") {
          loginWithRedirect();
        }
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
    user,
    allowedRoles,
  ]);

  if (isLoading || checking) {
    return <p>Carregando...</p>;
  }

  if (!authorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
