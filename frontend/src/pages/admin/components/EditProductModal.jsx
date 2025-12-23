import { useState, useEffect } from "react";

export default function EditProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product);

  // ✅ Sincroniza form se o produto mudar
  useEffect(() => {
    setForm(product);
  }, [product]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    // ✅ Converte preço e estoque para número
    const updated = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    onSave(updated);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // fecha ao clicar fora
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl mb-4">Editar Produto</h3>
        <input
          className="input-field mb-2"
          value={form.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Nome do produto"
        />
        <input
          className="input-field mb-2"
          type="number"
          value={form.price ?? ""}
          onChange={(e) => handleChange("price", e.target.value)}
          placeholder="Preço"
        />
        <input
          className="input-field mb-2"
          type="number"
          value={form.stock ?? ""}
          onChange={(e) => handleChange("stock", e.target.value)}
          placeholder="Quantidade em estoque"
        />
        <div className="flex gap-2 mt-4">
          <button className="btn-accent flex-1" onClick={handleSave}>
            Salvar
          </button>
          <button className="btn-secondary flex-1" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
