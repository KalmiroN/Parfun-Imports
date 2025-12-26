import { useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { toast } from "react-toastify";
import EditProductModal from "./components/EditProductModal";
import AdminLayout from "../../components/AdminLayout";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });

  // Carregar produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        setProducts(res.data || []);
      } catch (err) {
        toast.error(err.message || "Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Remover produto
  const handleRemove = async (id) => {
    try {
      await authFetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: "DELETE",
      });
      toast.success("Produto removido!");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error(err.message || "Erro ao remover produto");
    }
  };

  // Adicionar produto
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // ✅ Converter price e stock para número
      const payload = {
        ...newProduct,
        price: parseFloat(newProduct.price) || 0,
        stock: parseInt(newProduct.stock, 10) || 0,
      };

      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      toast.success("Produto adicionado!");
      setProducts((prev) => [...prev, res.data]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
      });
    } catch (err) {
      toast.error(err.message || "Erro ao adicionar produto");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-brand-textMuted">Carregando produtos...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-6">
          Administração de Produtos
        </h2>

        {/* Formulário de cadastro */}
        <form
          onSubmit={handleAddProduct}
          className="bg-brand-surface/80 rounded-xl shadow-soft p-6 mb-8 space-y-4"
        >
          <input
            type="text"
            placeholder="Nome"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="input-field"
            required
          />
          <textarea
            placeholder="Descrição"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="input-field"
          />
          <input
            type="number"
            placeholder="Preço"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="input-field"
            required
          />
          <input
            type="number"
            placeholder="Estoque"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Categoria"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="URL da Imagem"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
            className="input-field"
          />
          <button type="submit" className="btn-accent w-full mt-4">
            Salvar Produto
          </button>
        </form>

        {/* Lista de produtos */}
        {products.length === 0 ? (
          <p className="text-brand-textMuted">Nenhum produto cadastrado.</p>
        ) : (
          <div className="space-y-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-brand-surface/80 rounded-xl shadow-soft p-4 flex justify-between items-center"
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
                    className="px-4 py-2 rounded-full bg-brand-accent text-black"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleRemove(p.id)}
                    className="px-4 py-2 rounded-full bg-red-500 text-white"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de edição */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={async (updated) => {
            try {
              const payload = {
                ...updated,
                price: parseFloat(updated.price) || 0,
                stock: parseInt(updated.stock, 10) || 0,
              };

              await authFetch(
                `${import.meta.env.VITE_API_URL}/api/products/${updated.id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
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
    </AdminLayout>
  );
}
