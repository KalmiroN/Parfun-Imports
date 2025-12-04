import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton"; // ✅ Import do botão de logout

export default function Layout() {
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text">
      {/* Header fixo no topo */}
      <Header />

      {/* Conteúdo principal das páginas */}
      <main className="flex-grow container mx-auto px-6 py-8 animate-fadeIn">
        {/* Se o usuário estiver logado, mostra o botão de logout no topo do conteúdo */}
        {token && (
          <div className="flex justify-end mb-4">
            <LogoutButton />
          </div>
        )}

        <Outlet />
      </main>

      {/* Footer fixo no final */}
      <Footer />
    </div>
  );
}
