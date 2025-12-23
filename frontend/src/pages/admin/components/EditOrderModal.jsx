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
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl mb-4">Atualizar Pedido #{order.id}</h3>

        {/* Status do pedido */}
        <label className="block text-brand-text mb-2">Status</label>
        <select
          className="input-field mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Em processamento">Em processamento</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregue">Entregue</option>
          <option value="Cancelado">Cancelado</option>
        </select>

        {/* Informações extras */}
        {order.invoiceNumber && (
          <p className="text-brand-textMuted mb-2">
            Nota Fiscal: {order.invoiceNumber}
          </p>
        )}
        {order.companyCnpj && (
          <p className="text-brand-textMuted mb-4">
            CNPJ da empresa: {order.companyCnpj}
          </p>
        )}

        {/* Botões de ação */}
        <div className="flex gap-2">
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
