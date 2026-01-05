import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: null,
  token: null,
  refreshToken: null,
  rememberMe: true,
  isAuthenticated: false,
  loadingAuth: true,
  login: async () => false,
  logout: () => {},
  updateUser: () => {},
  hasRole: () => false,
});

function getTokenExpiry(token) {
  try {
    const [, payload] = token.split(".");
    const json = JSON.parse(atob(payload));
    return json.exp * 1000; // exp em ms
  } catch {
    return 0;
  }
}

function isJwtExpired(token) {
  const expiry = getTokenExpiry(token);
  return !expiry || Date.now() >= expiry;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  const storage = rememberMe ? localStorage : sessionStorage;

  // 📌 Carregar dados salvos ao iniciar
  useEffect(() => {
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

    if (storedRemember !== null) {
      setRememberMe(storedRemember === "true");
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role) parsedUser.role = parsedUser.role.toUpperCase();
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
    }

    if (storedToken) {
      if (isJwtExpired(storedToken)) {
        if (storedRefresh) {
          refreshAccessToken(storedRefresh);
        } else {
          setUser(null);
          setToken(null);
        }
      } else {
        setToken(storedToken);
      }
    }

    if (storedRefresh) {
      setRefreshToken(storedRefresh);
    }

    setLoadingAuth(false);
  }, []);

  // 📌 Persistir user/token/refresh no storage correto
  useEffect(() => {
    const s = rememberMe ? localStorage : sessionStorage;

    if (user) s.setItem("user", JSON.stringify(user));
    else {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    }

    if (token) s.setItem("accessToken", token);
    else {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    }

    if (refreshToken) s.setItem("refreshToken", refreshToken);
    else {
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("refreshToken");
    }

    s.setItem("rememberMe", rememberMe.toString());
  }, [user, token, refreshToken, rememberMe]);

  // 📌 Função para renovar accessToken usando refreshToken
  const refreshAccessToken = async (refreshTokenValue) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: refreshTokenValue }),
        }
      );

      if (!res.ok) throw new Error("Falha ao renovar token");

      const data = await res.json();

      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      storage.setItem("accessToken", data.accessToken);
      storage.setItem("refreshToken", data.refreshToken);

      return true;
    } catch (err) {
      console.error("Erro ao renovar token:", err);
      logout(false);
      return false;
    }
  };

  // 📌 Login integrado com backend
  const login = async (email, password, remember = true) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) throw new Error("Credenciais inválidas");

      const data = await res.json();

      const userData = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role?.toUpperCase(),
        phone: data.phone,
        address: data.address,
      };

      setUser(userData);
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setRememberMe(remember);

      const s = remember ? localStorage : sessionStorage;
      s.setItem("user", JSON.stringify(userData));
      s.setItem("accessToken", data.accessToken);
      s.setItem("refreshToken", data.refreshToken);
      s.setItem("rememberMe", remember.toString());

      return true;
    } catch (err) {
      console.error("Erro no login:", err);
      return false;
    }
  };

  const updateUser = (updatedData) => {
    const mergedUser = { ...user, ...updatedData };
    if (mergedUser.role) mergedUser.role = mergedUser.role.toUpperCase();
    setUser(mergedUser);
    storage.setItem("user", JSON.stringify(mergedUser));
  };
  // 📌 Logout preserva carrinho e wishlist
  const logout = (redirect = true) => {
    try {
      // ❌ não usar clear(), remove apenas dados de autenticação
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("rememberMe");

      sessionStorage.removeItem("user");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("rememberMe");
      // ✅ mantém cart, wishlist, theme etc.
    } finally {
      setUser(null);
      setToken(null);
      setRefreshToken(null);
      if (redirect) navigate("/login");
    }
  };

  const isAuthenticated = Boolean(user && token);

  const hasRole = (role) => {
    if (!user?.role) return false;
    return user.role.toUpperCase() === role.toUpperCase();
  };

  // 📌 Auto refresh do token alguns segundos antes de expirar
  useEffect(() => {
    if (!token || !refreshToken) return;

    const expiry = getTokenExpiry(token);
    const now = Date.now();
    const delay = expiry - now - 5000; // 5s antes de expirar

    if (delay > 0) {
      const timeout = setTimeout(() => {
        refreshAccessToken(refreshToken);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [token, refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        rememberMe,
        setRememberMe,
        isAuthenticated,
        loadingAuth,
        login,
        logout,
        updateUser,
        hasRole,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
