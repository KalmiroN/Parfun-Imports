/**
 * Extrai o tempo de expiração (exp) de um JWT.
 *
 * @param {string} token - JWT no formato padrão (header.payload.signature)
 * @returns {number} - timestamp em milissegundos da expiração, ou 0 se inválido
 */
export function getTokenExpiry(token) {
  try {
    if (!token) return 0;

    const parts = token.split(".");
    if (parts.length !== 3) return 0;

    const payload = parts[1];
    const json = JSON.parse(atob(payload));

    // exp é em segundos → converter para ms
    return json.exp ? json.exp * 1000 : 0;
  } catch (err) {
    console.error("Erro ao extrair expiração do token:", err);
    return 0;
  }
}

/**
 * Verifica se um JWT já expirou.
 *
 * @param {string} token - JWT
 * @returns {boolean} - true se expirado ou inválido, false se ainda válido
 */
export function isJwtExpired(token) {
  const expiry = getTokenExpiry(token);
  return !expiry || Date.now() >= expiry;
}
