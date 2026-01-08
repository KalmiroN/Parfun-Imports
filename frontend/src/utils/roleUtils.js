// src/utils/roleUtils.js

/**
 * Normaliza a role para maiúsculo.
 */
export function normalizeRole(role) {
  if (!role) return null;
  return role.toUpperCase();
}

/**
 * Verifica se o usuário é ADMIN.
 */
export function isAdmin(user) {
  return normalizeRole(user?.role) === "ADMIN";
}

/**
 * Verifica se o usuário é CLIENTE.
 */
export function isCliente(user) {
  return normalizeRole(user?.role) === "CLIENTE";
}

/**
 * Retorna uma string amigável para exibir a role.
 */
export function formatRole(role) {
  if (!role) return "cliente";
  return normalizeRole(role) === "ADMIN" ? "Admin" : "cliente";
}
