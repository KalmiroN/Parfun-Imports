/**
 * Faz requisições autenticadas ao backend usando o Access Token do Auth0.
 *
 * @param {string} url - URL da requisição
 * @param {object} options - opções do fetch (headers, body, etc.)
 * @param {function} getAccessTokenSilently - função obtida via useAuth0() para pegar o token
 */
export async function authFetch(url, options = {}, getAccessTokenSilently) {
  try {
    // ✅ obtém o token do Auth0 com audience e scope do .env
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: import.meta.env.VITE_AUTH0_SCOPE,
      },
    });

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
    }

    return response;
  } catch (err) {
    console.error("Erro ao obter token:", err);
    throw err;
  }
}
