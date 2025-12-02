import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Exemplo de usuário logado (pode vir do backend depois)
  const [user, setUser] = useState({
    name: "Ana Clara",
    email: "clarinha@gmail.com",
    role: "client", // ou "admin"
  });

  // Função de logout
  const logout = () => {
    setUser(null); // limpa o usuário
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
