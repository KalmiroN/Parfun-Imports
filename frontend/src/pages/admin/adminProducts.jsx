import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import { toast } from "react-toastify";
import EditProductModal from "./components/EditProductModal";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(res.data || []);
      } catch (err) {
        toast.error(err.message || "Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleRemove = async (id) => {
    try {
      await authFetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: "DELETE",
      });
      toast.success("Produto removido!");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error(err.message || "Erro ao remover produto");
    }
  };

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <main className="min-h-screen bg-brand-bg transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Administração de Produtos
        </h2>

        {products.length === 0 ? (
          <p className="text-brand-textMuted">Nenhum produto cadastrado.</p>
        ) : (
          <div className="space-y-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-brand-surface/80 backdrop-blur-md rounded-xl shadow-soft p-4 transition-colors duration-500 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-display text-brand-text">
                    {p.name}
                  </h3>
                  <p className="text-brand-textMuted">Preço: R$ {p.price}</p>
                  <p className="text-brand-textMuted">
                    Estoque: {p.stock ?? 0}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="px-4 py-2 rounded-full bg-brand-accent text-black hover:opacity-90 transition-colors duration-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleRemove(p.id)}
                    className="px-4 py-2 rounded-full bg-red-500 text-white hover:opacity-90 transition-colors duration-500"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link
            to="/admin/products/new"
            className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500 text-center"
          >
            Adicionar novo produto
          </Link>
          <Link
            to="/products"
            className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
          >
            Voltar ao catálogo
          </Link>
        </div>
      </div>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={async (updated) => {
            try {
              await authFetch(
                `${import.meta.env.VITE_API_URL}/products/${updated.id}`,
                {
                  method: "PUT",
                  body: JSON.stringify(updated),
                }
              );
              toast.success("Produto atualizado!");
              setSelectedProduct(null);
              setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
              );
            } catch (err) {
              toast.error(err.message || "Erro ao atualizar produto");
            }
          }}
        />
      )}
    </main>
  );
}
