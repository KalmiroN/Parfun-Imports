import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [companyConfig, setCompanyConfig] = useState({
    cnpj: "",
    invoicePrefix: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/company/config`
        );
        setCompanyConfig({
          cnpj: res.data?.cnpj || "",
          invoicePrefix: res.data?.invoicePrefix || "",
        });
      } catch (err) {
        toast.error(err.message || "Erro ao carregar configurações");
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await authFetch(`${import.meta.env.VITE_API_URL}/company/config`, {
        method: "PUT",
        body: JSON.stringify(companyConfig),
      });
      toast.success("Configurações da empresa atualizadas!");
    } catch (err) {
      toast.error(err.message || "Erro ao salvar configurações");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-brand-text">Carregando painel...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-8">
          Painel Administrativo
        </h2>

        {/* Atalhos principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/admin/products"
            className="p-6 rounded-xl bg-brand-surface shadow-soft text-center hover:opacity-90 transition"
          >
            <h3 className="text-xl font-display text-brand-text mb-2">
              Produtos
            </h3>
            <p className="text-brand-textMuted">
              Gerencie o catálogo e estoque.
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="p-6 rounded-xl bg-brand-surface shadow-soft text-center hover:opacity-90 transition"
          >
            <h3 className="text-xl font-display text-brand-text mb-2">
              Pedidos
            </h3>
            <p className="text-brand-textMuted">
              Acompanhe e atualize os pedidos.
            </p>
          </Link>

          <div className="p-6 rounded-xl bg-brand-surface shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text mb-2">
              Configurações
            </h3>
            <p className="text-brand-textMuted">
              Defina CNPJ e prefixo de Nota Fiscal.
            </p>
          </div>
        </div>

        {/* Configurações da empresa */}
        <div className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-6">
          <h3 className="text-2xl font-display text-brand-text mb-4">
            Configurações da Empresa
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-brand-text mb-2">CNPJ</label>
              <input
                type="text"
                value={companyConfig.cnpj}
                onChange={(e) =>
                  setCompanyConfig({ ...companyConfig, cnpj: e.target.value })
                }
                placeholder="00.000.000/0000-00"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-brand-text mb-2">
                Prefixo da Nota Fiscal
              </label>
              <input
                type="text"
                value={companyConfig.invoicePrefix}
                onChange={(e) =>
                  setCompanyConfig({
                    ...companyConfig,
                    invoicePrefix: e.target.value,
                  })
                }
                placeholder="Ex: NF-2025"
                className="input-field"
              />
            </div>
            <button type="submit" className="btn-accent w-full">
              Salvar Configurações
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
