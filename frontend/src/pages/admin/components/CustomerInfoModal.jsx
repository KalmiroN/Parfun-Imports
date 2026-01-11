import React from "react";

export default function CustomerInfoModal({ order, onClose }) {
  if (!order) return null;

  const { customerName, address, phone, whatsapp, email } = order;

  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal-content">
        <h2>Dados do Cliente</h2>

        <p>
          <strong>Nome:</strong> {customerName}
        </p>
        {email && (
          <p>
            <strong>Email:</strong> {email}
          </p>
        )}
        {phone && (
          <p>
            <strong>Telefone:</strong> {phone}
          </p>
        )}
        {whatsapp && (
          <p>
            <strong>WhatsApp:</strong> {whatsapp}
          </p>
        )}

        {address && (
          <>
            <p>
              <strong>Endereço:</strong> {address.street}
            </p>
            {address.number && (
              <p>
                <strong>Número:</strong> {address.number}
              </p>
            )}
            {address.apartment && (
              <p>
                <strong>Apartamento:</strong> {address.apartment}
              </p>
            )}
            {address.complement && (
              <p>
                <strong>Complemento:</strong> {address.complement}
              </p>
            )}
            {address.city && (
              <p>
                <strong>Cidade:</strong> {address.city}
              </p>
            )}
            {address.zip && (
              <p>
                <strong>CEP:</strong> {address.zip}
              </p>
            )}
          </>
        )}

        <div className="customer-modal-actions">
          <button onClick={onClose} className="btn-secondary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
