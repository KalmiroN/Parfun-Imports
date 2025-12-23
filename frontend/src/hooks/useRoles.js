import { useAuth } from "../context/authProvider";

export function useRoles() {
  const { user } = useAuth();

  // Agora roles vêm direto do objeto user
  const roles = user?.roles || [];

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
