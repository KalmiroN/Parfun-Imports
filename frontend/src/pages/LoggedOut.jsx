import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-10 bg-white rounded shadow text-center">
        <h2 className="text-2xl mb-4">Você saiu da sua conta</h2>
        <p className="mb-6">Clique abaixo para entrar novamente.</p>
        <Link to="/login" className="btn-accent">
          Ir para Login
        </Link>
      </div>
    </main>
  );
}
