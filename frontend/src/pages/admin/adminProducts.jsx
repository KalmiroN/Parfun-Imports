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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await authFetch(
          `${import.meta.env.VITE_API_URL}/api/admin/products`
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

  const handleRemove = async (id) => {
    try {
      await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/products/${id}`,
        { method: "DELETE" }
      );
      toast.success("Produto removido!");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error(err.message || "Erro ao remover produto");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        price: parseFloat(newProduct.price) || 0,
        stock: parseInt(newProduct.stock, 10) || 0,
      };

      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/products`,
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
        <div className="flex items-center justify-center py-12">
          <p className="text-brand-text text-lg">Carregando produtos...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-brand-text mb-8">
          Administração de Produtos
        </h2>

        {/* Formulário de cadastro */}
        <form
          onSubmit={handleAddProduct}
          className="admin-products-form mb-12 space-y-6"
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
          <div className="text-center py-12">
            <p className="text-brand-textMuted text-lg">
              Nenhum produto cadastrado.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="admin-product-card flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-display text-brand-text mb-1">
                    {p.name}
                  </h3>
                  <p className="text-brand-textMuted">Preço: R$ {p.price}</p>
                  <p className="text-brand-textMuted">
                    Estoque: {p.stock ?? 0}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="edit-btn px-4 py-2 rounded-full"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleRemove(p.id)}
                    className="remove-btn px-4 py-2 rounded-full"
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
                `${import.meta.env.VITE_API_URL}/api/admin/products/${
                  updated.id
                }`,
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
