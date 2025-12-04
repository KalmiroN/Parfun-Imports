import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Limpa token e role
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // ✅ Mensagem de feedback
    toast.info("Você saiu da sua conta.", {
      position: "bottom-right",
      autoClose: 2000,
    });

    // ✅ Redireciona para login após breve delay
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);

    // Cleanup do timer
    return () => clearTimeout(timer);
  }, [navigate]);

  // Não precisa renderizar nada
  return null;
}
