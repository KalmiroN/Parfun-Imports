import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authProvider";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    toast.info("Você saiu da sua conta.", {
      position: "bottom-right",
      autoClose: 2000,
    });
    logout();
  }, [logout]);

  return null;
}
