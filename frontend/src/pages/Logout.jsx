import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

export default function Logout() {
  const { logout } = useAuth0();

  useEffect(() => {
    // ✅ Mensagem de feedback
    toast.info("Você saiu da sua conta.", {
      position: "bottom-right",
      autoClose: 2000,
    });

    // ✅ Chama logout do Auth0 e redireciona para URL configurada no .env
    logout({
      logoutParams: {
        returnTo: import.meta.env.VITE_AUTH0_POST_LOGOUT_REDIRECT_URI,
      },
    });
  }, [logout]);

  // Não precisa renderizar nada
  return null;
}
