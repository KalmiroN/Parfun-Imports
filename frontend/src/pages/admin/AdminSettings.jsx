import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authFetch } from "../../utils/authFetch";
import { useAuth } from "../../context/authProvider";

export default function AdminSettings() {
  const { token } = useAuth();
  const [settings, setSettings] = useState({
    pixActive: false,
    pixDiscount: 0,
    cardActive: true,
  });
  const [loading, setLoading] = useState(true);

  // Buscar configurações atuais do backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/admin/settings`,
          {},
          token
        );
        if (res.ok) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error("Erro ao carregar configurações:", err);
        toast.error("Erro ao carregar configurações.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchSettings();
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/settings`,
        {
          method: "PUT",
          body: JSON.stringify(settings),
        },
        token
      );
      if (res.ok) {
        toast.success("Configurações de pagamento atualizadas!");
      } else {
        toast.error("Erro ao salvar configurações.");
      }
    } catch (err) {
      console.error("Erro ao salvar configurações:", err);
      toast.error("Erro ao salvar configurações.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Carregando configurações...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-8">
          Configurações de Pagamento
        </h2>

        <form
          onSubmit={handleSave}
          className="space-y-6 bg-brand-surface p-6 rounded-xl shadow-soft"
        >
          {/* Pix */}
          <div>
            <label className="block text-brand-text mb-2">Ativar Pix</label>
            <input
              type="checkbox"
              checked={settings.pixActive}
              onChange={(e) =>
                setSettings({ ...settings, pixActive: e.target.checked })
              }
            />
          </div>
          <div>
            <label className="block text-brand-text mb-2">
              Desconto Pix (R$)
            </label>
            <input
              type="number"
              value={settings.pixDiscount}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  pixDiscount: Number(e.target.value),
                })
              }
              className="input-field"
            />
          </div>

          {/* Cartão */}
          <div>
            <label className="block text-brand-text mb-2">
              Ativar Cartão de Crédito
            </label>
            <input
              type="checkbox"
              checked={settings.cardActive}
              onChange={(e) =>
                setSettings({ ...settings, cardActive: e.target.checked })
              }
            />
          </div>

          <button type="submit" className="btn-accent w-full">
            Salvar Configurações
          </button>
        </form>
      </div>
    </main>
  );
}
