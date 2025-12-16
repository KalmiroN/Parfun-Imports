// src/hooks/useRoles.js
import { useAuth0 } from "@auth0/auth0-react";

export function useRoles() {
  const { user } = useAuth0();

  const roles = user?.["https://parfun-imports.com/roles"] || [];

  const hasRole = (role) =>
    roles.map((r) => r.toLowerCase()).includes(role.toLowerCase());

  return {
    roles,
    hasRole,
    isAdmin: hasRole("admin"),
    isAdminSecondary: hasRole("admin_secondary"),
    isClient: hasRole("client"),
  };
}
