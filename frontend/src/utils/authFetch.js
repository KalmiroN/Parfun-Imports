// src/utils/authFetch.js

/**
 * Faz requisições autenticadas ao backend usando o Access Token do Auth0.
 *
 * @param {string} url - URL da requisição
 * @param {object} options - opções do fetch (headers, body, etc.)
 * @param {function} getAccessTokenSilently - função obtida via useAuth0() para pegar o token
 */
export async function authFetch(url, options = {}, getAccessTokenSilently) {
  try {
    // ✅ obtém o token do Auth0
    const token = await getAccessTokenSilently();

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      console.error("Token inválido ou expirado");
      // Opcional: redirecionar para login
      // window.location.href = "/login";
    }

    return response;
  } catch (err) {
    console.error("Erro ao obter token:", err);
    throw err;
  }
}
