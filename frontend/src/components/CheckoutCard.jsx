import React from "react";

export default function CheckoutCard({
  item,
  index,
  onRemove,
  onQuantityChange,
  onSaveLater,
}) {
  const { name, price, imageUrl, quantity } = item;

  // ✅ Função para resolver a URL da imagem com fallback
  const resolveSrc = (url) => {
    if (!url) return "/images/default.jpg"; // fallback se não houver imagem
    return url;
  };

  const priceNumber = (() => {
    if (typeof price === "string") {
      return parseFloat(
        price.replace("R$", "").replace(".", "").replace(",", ".")
      );
    }
    if (typeof price === "number") return price;
    return 0;
  })();

  const total = priceNumber * quantity;

  return (
    <div className="flex gap-6 rounded-xl border border-brand-border bg-brand-surface shadow-strong p-6 hover:scale-[1.02] transition-transform duration-300">
      {/* Esquerda: imagem + info básica */}
      <div className="flex-1 flex gap-4">
        <img
          src={resolveSrc(imageUrl)}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = "/images/default.jpg"; // ✅ fallback se a imagem não carregar
          }}
          className="w-24 h-24 rounded-lg object-cover border border-brand-border"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-display">{name}</h3>

          {/* Preço unitário */}
          <p className="text-brand-text mt-2">Preço: {price}</p>

          {/* Quantidade */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => onQuantityChange(index, -1)}
              className="btn-accent px-3 py-1"
            >
              −
            </button>
            <span className="min-w-8 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(index, +1)}
              className="btn-accent px-3 py-1"
            >
              +
            </button>
          </div>

          {/* Ações: Excluir / Salvar para depois */}
          <div className="mt-4 flex gap-6">
            <button
              onClick={() => onRemove(index)}
              className="btn-secondary text-sm"
            >
              Excluir
            </button>
            <button
              onClick={() => onSaveLater()}
              className="btn-accent text-sm"
            >
              Salvar para depois
            </button>
          </div>
        </div>
      </div>

      {/* Direita: resumo e total */}
      <div className="w-64 border-l border-brand-border pl-6">
        <p className="text-brand-text font-semibold">
          Total: R$ {total.toFixed(2).replace(".", ",")}
        </p>

        {/* Parcelamento e estoque abaixo do Total */}
        <p className="text-brand-text mt-2">
          Até 10x de R$ {(total / 10).toFixed(2).replace(".", ",")} sem juros
          <br />
          Em estoque
        </p>
      </div>
    </div>
  );
}
