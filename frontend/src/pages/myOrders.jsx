import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../utils/authFetch";
import { useAuth } from "../context/auth/AuthProvider";

export default function MyOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Você precisa estar logado para ver seus pedidos.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/orders/my`, // ✅ rota correta
          { method: "GET" },
          token
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos");
        }

        setOrders(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Função para download automático
  const downloadPDF = async (url, filename, token) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao baixar PDF");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Falha ao baixar PDF");
    }
  };

  // Função para preview em nova aba
  const previewPDF = async (url, token) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao abrir PDF");

      const blob = await response.blob();
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } catch (err) {
      console.error(err);
      alert("Falha ao abrir PDF");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-brand-text">Carregando pedidos...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Meus Pedidos
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        {orders.length === 0 ? (
          <p className="text-brand-textMuted">
            Você ainda não possui pedidos. Assim que fizer uma compra, ela
            aparecerá aqui.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-4 transition-colors duration-500"
              >
                <h3 className="text-lg font-display text-brand-text">
                  Pedido #{order.id}
                </h3>
                <p className="text-brand-textMuted">
                  Data: {new Date(order.createdAt).toLocaleDateString("pt-BR")}{" "}
                  | Total:{" "}
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order.totalAmount)}
                </p>
                <p className="text-brand-textMuted">Status: {order.status}</p>

                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  {/* Detalhes do pedido */}
                  <Link
                    to={`/order/${order.id}`}
                    className="flex-1 px-4 py-2 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
                  >
                    Ver detalhes do pedido
                  </Link>

                  {/* Grupo Nota Fiscal */}
                  <div className="flex flex-1 gap-2">
                    <button
                      onClick={() =>
                        downloadPDF(
                          `${import.meta.env.VITE_API_URL}/api/orders/${
                            order.id
                          }/nota-fiscal`,
                          `nota-fiscal-${order.id}.pdf`,
                          token
                        )
                      }
                      className="flex-1 px-4 py-2 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
                    >
                      Baixar NF
                    </button>
                    <button
                      onClick={() =>
                        previewPDF(
                          `${import.meta.env.VITE_API_URL}/api/orders/${
                            order.id
                          }/nota-fiscal`,
                          token
                        )
                      }
                      className="flex-1 px-4 py-2 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
                    >
                      Visualizar NF
                    </button>
                  </div>

                  {/* Grupo Nota Fiscal Paulista */}
                  <div className="flex flex-1 gap-2">
                    <button
                      onClick={() =>
                        downloadPDF(
                          `${import.meta.env.VITE_API_URL}/api/orders/${
                            order.id
                          }/nota-fiscal-paulista`,
                          `nota-fiscal-paulista-${order.id}.pdf`,
                          token
                        )
                      }
                      className="flex-1 px-4 py-2 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
                    >
                      Baixar NF Paulista
                    </button>
                    <button
                      onClick={() =>
                        previewPDF(
                          `${import.meta.env.VITE_API_URL}/api/orders/${
                            order.id
                          }/nota-fiscal-paulista`,
                          token
                        )
                      }
                      className="flex-1 px-4 py-2 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
                    >
                      Visualizar NF Paulista
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
