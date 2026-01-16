/**
 * Faz requisições autenticadas ao backend usando o Access Token salvo pelo AuthProvider.
 *
 * @param {string} url - URL da requisição
 * @param {object} options - opções do fetch (headers, body, etc.)
 */
export async function authFetch(url, options = {}) {
  try {
    // 🔧 recupera token automaticamente do localStorage
    const token = localStorage.getItem("accessToken"); // ⚠️ use o mesmo nome salvo no login

    const headers = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // só adiciona Content-Type se não for GET
    if (
      !headers["Content-Type"] &&
      options.method &&
      options.method.toUpperCase() !== "GET"
    ) {
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
        // 🚨 token inválido ou expirado
        localStorage.removeItem("accessToken"); // limpa token
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      // 🔎 backend retorna { error: "..."} e não { message: "..."}
      const message = data?.error || data?.message || `Erro ${response.status}`;
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
