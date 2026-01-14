import { useState, useEffect } from "react";

export default function EditOrderModal({ order, onClose, onSave }) {
  const [status, setStatus] = useState(order.status);

  // ✅ Sincroniza status se o order mudar
  useEffect(() => {
    setStatus(order.status);
  }, [order]);

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
          Atualizar Pedido #{order.id}
        </h3>

        {/* Status do pedido */}
        <label className="block text-brand-text mb-2">Status</label>
        <select
          className="input-field mb-6"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="processing">Em processamento</option>
          <option value="shipped">Enviado</option>
          <option value="completed">Entregue</option>
          <option value="cancelled">Cancelado</option>
        </select>

        {/* Informações extras */}
        {order.invoiceNumber && (
          <p className="text-brand-textMuted mb-2">
            Nota Fiscal: {order.invoiceNumber}
          </p>
        )}
        {order.companyCnpj && (
          <p className="text-brand-textMuted mb-6">
            CNPJ da empresa: {order.companyCnpj}
          </p>
        )}

        {/* Botões de ação */}
        <div className="flex gap-4">
          <button
            className="btn-accent flex-1"
            onClick={() => onSave({ ...order, status })}
          >
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
