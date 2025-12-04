import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Lê o token salvo no localStorage
    const savedToken = localStorage.getItem("token");
    setToken(savedToken || "");
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard</h1>

        {token ? (
          <p className="text-green-600">
            Token carregado: <span className="break-all">{token}</span>
          </p>
        ) : (
          <p className="text-red-600">Nenhum token encontrado. Faça login.</p>
        )}
      </div>
    </main>
  );
}
