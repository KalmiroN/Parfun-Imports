import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/AuthProvider";

export default function Layout() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text">
      {/* Header fixo no topo */}
      <Header isAuthenticated={isAuthenticated} user={user} />

      {/* Conteúdo principal das páginas */}
      <main className="flex-grow container mx-auto px-6 py-8 animate-fadeIn">
        <Outlet />
      </main>

      {/* Footer fixo no final */}
      <Footer />
    </div>
  );
}
