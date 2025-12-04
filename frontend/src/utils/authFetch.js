export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Se o token for inválido ou expirado, podemos tratar aqui
  if (response.status === 401) {
    console.error("Token inválido ou expirado");
    // Opcional: redirecionar para login
    // window.location.href = "/login";
  }

  return response;
}
