import { createContext, useContext } from "react";

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
  refreshAccessToken: async () => false,
});

export default AuthContext;

export function useAuth() {
  return useContext(AuthContext);
}
