import { useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { toast } from "react-toastify";
import AdminLayout from "../../components/AdminLayout";

// Importando Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [salesData, setSalesData] = useState({
    weekly: [],
    fortnightly: [],
    currentMonth: [],
    monthly: [],
    annual: [],
    topProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/dashboard/sales`
        );
        setSalesData(res.data || {});
      } catch (err) {
        toast.error(err.message || "Erro ao carregar dados de vendas");
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-brand-text">Carregando dados do Dashboard...</p>
      </AdminLayout>
    );
  }

  // Configuração dos gráficos
  const lineChartData = {
    labels: salesData.currentMonth.map((d) => d.day),
    datasets: [
      {
        label: "Vendas do Mês Vigente",
        data: salesData.currentMonth.map((d) => d.total),
        borderColor: "#4F46E5",
        backgroundColor: "#6366F1",
      },
    ],
  };

  const barChartData = {
    labels: salesData.annual.map((d) => d.month),
    datasets: [
      {
        label: "Vendas Anuais",
        data: salesData.annual.map((d) => d.total),
        backgroundColor: "#10B981",
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-8">
          Dashboard de Vendas
        </h2>

        {/* Indicadores principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-brand-surface shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">Pedidos</h3>
            <p className="text-2xl font-bold">{salesData.totalOrders}</p>
          </div>
          <div className="p-6 rounded-xl bg-brand-surface shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">Vendas</h3>
            <p className="text-2xl font-bold">R$ {salesData.totalSales}</p>
          </div>
          <div className="p-6 rounded-xl bg-brand-surface shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">
              Ticket Médio
            </h3>
            <p className="text-2xl font-bold">R$ {salesData.avgTicket}</p>
          </div>
          <div className="p-6 rounded-xl bg-brand-surface shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">
              Produtos Vendidos
            </h3>
            <p className="text-2xl font-bold">{salesData.totalProducts}</p>
          </div>
        </div>

        {/* Gráfico de linhas - mês vigente */}
        <div className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-6 mb-12">
          <h3 className="text-2xl font-display text-brand-text mb-4">
            Evolução das Vendas (Mês Vigente)
          </h3>
          <Line data={lineChartData} />
        </div>

        {/* Gráfico de barras - anual */}
        <div className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-6 mb-12">
          <h3 className="text-2xl font-display text-brand-text mb-4">
            Vendas Anuais
          </h3>
          <Bar data={barChartData} />
        </div>

        {/* Ranking de produtos */}
        <div className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-6">
          <h3 className="text-2xl font-display text-brand-text mb-4">
            Top 5 Produtos Mais Vendidos
          </h3>
          <ul className="space-y-2">
            {salesData.topProducts?.map((prod, idx) => (
              <li
                key={prod.id ?? `${prod.name}-${idx}`}
                className="flex justify-between"
              >
                <span>
                  {idx + 1}. {prod.name}
                </span>
                <span>{prod.quantity} unid.</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
