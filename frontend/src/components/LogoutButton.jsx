import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); // ✅ Redireciona para Home
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
    >
      Logout
    </button>
  );
}
