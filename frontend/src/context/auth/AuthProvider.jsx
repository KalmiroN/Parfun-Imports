import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenExpiry, isJwtExpired } from "./authUtils";
import { saveAuthData, loadAuthData } from "./authStorage";
import { loginRequest, refreshRequest } from "./authService";

// Criando o contexto
const AuthContext = createContext();

// Hook para usar o contexto em qualquer componente
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  const storage = rememberMe ? localStorage : sessionStorage;

  // 📌 Carregar dados salvos ao iniciar
  useEffect(() => {
    const { storedUser, storedToken, storedRefresh, storedRemember } =
      loadAuthData();

    if (storedRemember !== null) setRememberMe(storedRemember === "true");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) {
      if (isJwtExpired(storedToken)) {
        if (storedRefresh) refreshAccessToken(storedRefresh);
      } else setToken(storedToken);
    }
    if (storedRefresh) setRefreshToken(storedRefresh);

    setLoadingAuth(false);
  }, []);

  // 📌 Persistir user/token/refresh sempre que mudar
  useEffect(() => {
    saveAuthData(storage, { user, token, refreshToken, rememberMe });
  }, [user, token, refreshToken, rememberMe]);

  // 📌 Renovar token de acesso
  const refreshAccessToken = async (refreshTokenValue) => {
    try {
      const data = await refreshRequest(refreshTokenValue);
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      storage.setItem("accessToken", data.accessToken);
      storage.setItem("refreshToken", data.refreshToken);
    } catch (err) {
      console.error("Erro ao renovar token:", err);
      logout(false);
    }
  };

  // 📌 Login
  const login = async (email, password, remember = true) => {
    try {
      const data = await loginRequest(email, password);
      const userData = { ...data, role: data.role?.toUpperCase() };
      setUser(userData);
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setRememberMe(remember);

      const s = remember ? localStorage : sessionStorage;
      saveAuthData(s, {
        user: userData,
        token: data.accessToken,
        refreshToken: data.refreshToken,
        rememberMe: remember,
      });

      return true;
    } catch (err) {
      console.error("Erro no login:", err);
      return false;
    }
  };

  // 📌 Logout
  const logout = (redirect = true) => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    if (redirect) navigate("/login");
  };

  // 📌 Agendar refresh automático do token
  useEffect(() => {
    if (!token || !refreshToken) return;
    const expiry = getTokenExpiry(token);
    const delay = expiry - Date.now() - 5000; // 5s antes de expirar
    if (delay > 0) {
      const timeout = setTimeout(() => refreshAccessToken(refreshToken), delay);
      return () => clearTimeout(timeout);
    }
  }, [token, refreshToken]);

  const isAuthenticated = Boolean(user && token);

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
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
