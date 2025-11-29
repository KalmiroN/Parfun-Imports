import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeProvider";

export default function Profile() {
  const [name, setName] = useState("Nome do Cliente");
  const [email, setEmail] = useState("cliente@exemplo.com");
  const [address, setAddress] = useState("Rua Exemplo, 123 - São Paulo/SP");

  const { theme } = useTheme();
  const hasDarkOverlay = theme === "dark";

  const handleSave = (e) => {
    e.preventDefault();
    alert("Dados atualizados com sucesso!");
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center transition-colors duration-500 relative"
      style={{
        backgroundImage:
          "url('/images/background_files/gold-backgraund-02.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {hasDarkOverlay && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      )}

      <div className="relative z-10 bg-brand-surface/80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-lg transition-colors duration-500">
        <h2 className="font-display text-2xl text-brand-text mb-6">
          Meu Perfil
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-brand-textMuted mb-1">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            />
          </div>
          <div>
            <label className="block text-sm text-brand-textMuted mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            />
          </div>
          <div>
            <label className="block text-sm text-brand-textMuted mb-1">
              Endereço
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-500"
            />
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500"
            >
              Salvar alterações
            </button>
            <Link
              to="/products"
              className="flex-1 px-6 py-3 rounded-full border border-brand-border text-brand-text bg-brand-surface hover:bg-brand-surface/60 transition-colors duration-500 text-center"
            >
              Voltar ao catálogo
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
