import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  // Carregar dados salvos no localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    if (storedToken) {
      setToken(storedToken);
    }
    setLoadingAuth(false);
  }, []);

  // Persistir user/token no localStorage sempre que mudarem
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");

    if (token) localStorage.setItem("access_token", token);
    else localStorage.removeItem("access_token");
  }, [user, token]);

  // Revalidar token automaticamente ao iniciar
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const res = await authFetch(
            `${import.meta.env.VITE_API_URL}/api/user/me`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // ✅ garante envio do token
              },
            },
            token
          );

          if (res.ok) {
            setUser(res.data);
          } else {
            console.warn("Token inválido ou expirado, fazendo logout...");
            logout();
          }
        } catch (err) {
          console.error("Erro ao validar token:", err);
          logout();
        }
      }
    };
    validateToken();
  }, [token]);

  // Login integrado com backend
  const login = async (email, password) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
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
        roles: data.roles,
        phone: data.phone,
        address: data.address,
      };

      setUser(userData);
      setToken(data.accessToken);

      // ✅ Redireciona para Home após login
      navigate("/");

      return true;
    } catch (err) {
      console.error("Erro no login:", err);
      return false;
    }
  };

  // Atualizar dados do usuário no contexto
  const updateUser = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  // Logout: limpa sessão e carrinho local
  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("cart"); // garante limpeza local do carrinho
    } finally {
      setUser(null);
      setToken(null);
      navigate("/");
    }
  };

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loadingAuth,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
