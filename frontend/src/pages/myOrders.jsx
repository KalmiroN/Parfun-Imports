import { Link } from "react-router-dom";

export default function MyOrders() {
  // Placeholder: simulação de pedidos
  const orders = [
    {
      id: 1,
      date: "20/11/2025",
      total: "R$ 499,00",
      status: "Entregue",
    },
    {
      id: 2,
      date: "25/11/2025",
      total: "R$ 349,90",
      status: "Em processamento",
    },
  ];

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Meus Pedidos
        </h2>

        {orders.length === 0 ? (
          <p className="text-brand-textMuted">Você ainda não possui pedidos.</p>
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
                  Data: {order.date} | Total: {order.total}
                </p>
                <p className="text-brand-textMuted">Status: {order.status}</p>

                {/* Botões de ação */}
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <Link
                    to={`/order/${order.id}`}
                    className="flex-1 px-4 py-2 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
                  >
                    Ver detalhes do pedido
                  </Link>
                  <Link
                    to="/products"
                    className="flex-1 px-4 py-2 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
                  >
                    Voltar ao catálogo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
