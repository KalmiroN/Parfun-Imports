import { useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { toast } from "react-toastify";
import AdminLayout from "../../components/AdminLayout";
import { Line, Bar } from "react-chartjs-2";
import "../../utils/chartConfig"; // ✅ importa configuração Chart.js

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value || 0);

export default function AdminDashboard() {
  const [salesData, setSalesData] = useState({
    totalOrders: 0,
    totalSales: 0,
    avgTicket: 0,
    totalProducts: 0,
    currentMonth: [],
    annual: [],
    topProducts: [],
  });

  const [statusData, setStatusData] = useState({
    pendingOrders: 0,
    paidOrders: 0,
    cancelledOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/dashboard`
        );
        setSalesData(res.data || {});
      } catch (err) {
        toast.error(err.message || "Erro ao carregar dados do Dashboard");
      } finally {
        setLoading(false);
      }
    };

    const fetchStatus = async () => {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/dashboard/status`
        );
        setStatusData(res.data || {});
      } catch (err) {
        toast.error(err.message || "Erro ao carregar status dos pedidos");
      }
    };

    fetchDashboard();
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-brand-text text-lg">
            Carregando dados do Dashboard...
          </p>
        </div>
      </AdminLayout>
    );
  }

  // ✅ Dados para gráficos
  const dailyChartData = {
    labels: salesData.currentMonth?.map((d) => d.day),
    datasets: [
      {
        label: "Vendas Diárias",
        data: salesData.currentMonth?.map((d) => d.total),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
      },
    ],
  };

  const annualChartData = {
    labels: salesData.annual?.map((m) => m.month),
    datasets: [
      {
        label: "Vendas Mensais",
        data: salesData.annual?.map((m) => m.total),
        backgroundColor: "rgba(16, 185, 129, 0.6)",
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
          <div className="p-6 rounded-xl bg-brand-surface/80 backdrop-blur-md shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">Pedidos</h3>
            <p className="text-2xl font-bold">{salesData.totalOrders}</p>
          </div>
          <div className="p-6 rounded-xl bg-brand-surface/80 backdrop-blur-md shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">Vendas</h3>
            <p className="text-2xl font-bold">
              {formatCurrency(salesData.totalSales)}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-brand-surface/80 backdrop-blur-md shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">
              Ticket Médio
            </h3>
            <p className="text-2xl font-bold">
              {formatCurrency(salesData.avgTicket)}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-brand-surface/80 backdrop-blur-md shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">
              Produtos Vendidos
            </h3>
            <p className="text-2xl font-bold">{salesData.totalProducts}</p>
          </div>
        </div>

        {/* Status dos pedidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-brand-surface/80 backdrop-blur-md shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">Pendentes</h3>
            <p className="text-2xl font-bold">{statusData.pendingOrders}</p>
          </div>
          <div className="p-6 rounded-xl bg-brand-surface/80 backdrop-blur-md shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">Pagos</h3>
            <p className="text-2xl font-bold">{statusData.paidOrders}</p>
          </div>
          <div className="p-6 rounded-xl bg-brand-surface/80 backdrop-blur-md shadow-soft text-center">
            <h3 className="text-xl font-display text-brand-text">Cancelados</h3>
            <p className="text-2xl font-bold">{statusData.cancelledOrders}</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-brand-surface/80 backdrop-blur-md shadow-soft">
            <h3 className="text-xl font-display text-brand-text mb-4">
              Vendas Diárias (Mês Atual)
            </h3>
            <Line data={dailyChartData} />
          </div>
          <div className="p-6 rounded-xl bg-brand-surface/80 backdrop-blur-md shadow-soft">
            <h3 className="text-xl font-display text-brand-text mb-4">
              Vendas Mensais (Ano Atual)
            </h3>
            <Bar data={annualChartData} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
