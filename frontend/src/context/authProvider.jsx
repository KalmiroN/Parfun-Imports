import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

// ✅ Cria o contexto de autenticação com valor inicial seguro
const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  loadingAuth: true,
  login: async () => false,
  logout: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  // 📌 Carregar dados salvos no localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken"); // ✅ nome consistente

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role) {
          parsedUser.role = parsedUser.role.toUpperCase();
        }
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
      }
    }
    if (storedToken) {
      setToken(storedToken);
    }
    setLoadingAuth(false);
  }, []);

  // 📌 Persistir user/token no localStorage sempre que mudarem
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");

    if (token)
      localStorage.setItem("accessToken", token); // ✅ nome consistente
    else localStorage.removeItem("accessToken");
  }, [user, token]);

  // 📌 Revalidar token automaticamente ao iniciar
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const res = await authFetch(
            `${import.meta.env.VITE_API_URL}/api/user/me`,
            { method: "GET" }
          );

          if (res.ok) {
            const data = res.data;
            setUser({ ...data, role: data.role?.toUpperCase() });
          } else {
            logout();
          }
        } catch {
          logout();
        } finally {
          setLoadingAuth(false);
        }
      } else {
        setLoadingAuth(false);
      }
    };
    validateToken();
  }, [token]);

  // 📌 Login integrado com backend
  const login = async (email, password) => {
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
      setToken(data.accessToken); // ✅ backend retorna `accessToken`

      // sobrescreve direto no localStorage para garantir consistência
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", data.accessToken);

      return true;
    } catch (err) {
      console.error("Erro no login:", err);
      return false;
    }
  };

  // 📌 Atualizar dados do usuário no contexto
  const updateUser = (updatedData) => {
    const mergedUser = {
      ...user,
      ...updatedData,
    };
    if (mergedUser.role) {
      mergedUser.role = mergedUser.role.toUpperCase();
    }
    setUser(mergedUser);
    localStorage.setItem("user", JSON.stringify(mergedUser));
  };

  // 📌 Logout
  const logout = () => {
    try {
      localStorage.clear(); // ✅ limpa tudo de uma vez
    } finally {
      setUser(null);
      setToken(null);
      navigate("/login"); // ✅ redireciona para login
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

// ✅ Hook para consumir o contexto
export function useAuth() {
  return useContext(AuthContext);
}
