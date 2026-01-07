export function saveAuthData(
  storage,
  { user, token, refreshToken, rememberMe }
) {
  if (user) storage.setItem("user", JSON.stringify(user));
  else {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }

  if (token) storage.setItem("accessToken", token);
  else {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
  }

  if (refreshToken) storage.setItem("refreshToken", refreshToken);
  else {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("refreshToken");
  }

  storage.setItem("rememberMe", rememberMe.toString());
}

export function loadAuthData() {
  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const storedToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");
  const storedRefresh =
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken");
  const storedRemember =
    localStorage.getItem("rememberMe") || sessionStorage.getItem("rememberMe");

  return { storedUser, storedToken, storedRefresh, storedRemember };
}
