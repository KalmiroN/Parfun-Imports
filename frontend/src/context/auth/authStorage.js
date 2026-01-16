/**
 * Salva dados de autenticação no storage escolhido (localStorage ou sessionStorage).
 *
 * @param {Storage} storage - localStorage ou sessionStorage
 * @param {object} data - objeto com user, token, refreshToken, rememberMe
 */
export function saveAuthData(
  storage,
  { user, token, refreshToken, rememberMe }
) {
  try {
    if (user) {
      storage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    }

    if (token) {
      storage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    }

    if (refreshToken) {
      storage.setItem("refreshToken", refreshToken);
    } else {
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("refreshToken");
    }

    storage.setItem("rememberMe", rememberMe.toString());
  } catch (err) {
    console.error("Erro ao salvar dados de autenticação:", err);
  }
}

/**
 * Carrega dados de autenticação do localStorage ou sessionStorage.
 *
 * @returns {object} - dados armazenados (user, token, refreshToken, rememberMe)
 */
export function loadAuthData() {
  try {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    const storedToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const storedRefresh =
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken");
    const storedRemember =
      localStorage.getItem("rememberMe") ||
      sessionStorage.getItem("rememberMe");

    return { storedUser, storedToken, storedRefresh, storedRemember };
  } catch (err) {
    console.error("Erro ao carregar dados de autenticação:", err);
    return {
      storedUser: null,
      storedToken: null,
      storedRefresh: null,
      storedRemember: null,
    };
  }
}
