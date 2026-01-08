// src/context/auth/authService.js

/**
 * Faz a requisição de login ao backend.
 * Espera receber um LoginResponse com accessToken e refreshToken.
 */
export async function loginRequest(email, password) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  // 🔎 valida se veio accessToken
  if (!res.ok || !data?.accessToken) {
    throw new Error(data.error || "Credenciais inválidas");
  }

  return data; // { id, email, name, role, phone, address, accessToken, refreshToken }
}

/**
 * Faz a requisição de refresh ao backend.
 * Espera receber novos tokens.
 */
export async function refreshRequest(refreshToken) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();

  if (!res.ok || !data?.accessToken) {
    throw new Error(data.error || "Falha ao renovar token");
  }

  return data; // { accessToken, refreshToken }
}
