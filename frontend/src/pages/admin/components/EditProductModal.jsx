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
      highlight: Number(form.highlight) || 0, // garante número
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
      <div className="bg-brand-surface/90 backdrop-blur-md p-6 rounded-xl shadow-soft w-96">
        <h3 className="text-xl font-display text-brand-text mb-6">
          Editar Produto
        </h3>

        <input
          className="input-field mb-4"
          value={form.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Nome do produto"
        />
        <input
          className="input-field mb-4"
          type="number"
          value={form.price ?? ""}
          onChange={(e) => handleChange("price", e.target.value)}
          placeholder="Preço"
        />
        <input
          className="input-field mb-4"
          type="number"
          value={form.stock ?? ""}
          onChange={(e) => handleChange("stock", e.target.value)}
          placeholder="Quantidade em estoque"
        />

        {/* ✅ Checkbox para destaque */}
        <label className="flex items-center gap-2 mb-6 text-brand-text">
          <input
            type="checkbox"
            checked={Number(form.highlight) === 1}
            onChange={(e) =>
              handleChange("highlight", e.target.checked ? 1 : 0)
            }
          />
          Destaque na Home
        </label>

        <div className="flex gap-4">
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
