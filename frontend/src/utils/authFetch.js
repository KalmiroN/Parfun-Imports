/**
 * Faz requisições autenticadas ao backend usando o Access Token do AuthProvider.
 *
 * @param {string} url - URL da requisição
 * @param {object} options - opções do fetch (headers, body, etc.)
 * @param {string} token - access_token obtido do AuthProvider
 */
export async function authFetch(url, options = {}, token) {
  try {
    const headers = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // timeout de 10s

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      const message = data?.message || `Erro ${response.status}`;
      throw new Error(message);
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
      headers: response.headers,
    };
  } catch (err) {
    console.error("Erro na requisição autenticada:", err);
    throw err;
  }
}
