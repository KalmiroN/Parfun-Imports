export function getTokenExpiry(token) {
  try {
    const [, payload] = token.split(".");
    const json = JSON.parse(atob(payload));
    return json.exp * 1000; // exp em ms
  } catch {
    return 0;
  }
}

export function isJwtExpired(token) {
  const expiry = getTokenExpiry(token);
  return !expiry || Date.now() >= expiry;
}
