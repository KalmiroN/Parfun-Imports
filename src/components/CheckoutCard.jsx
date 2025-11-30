import React from "react";

export default function CheckoutCard({
  item,
  index,
  onRemove,
  onQuantityChange,
  onSaveLater,
}) {
  const { name, price, imageUrl, quantity } = item;

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
    <div className="flex gap-6 rounded-xl border border-brand-border bg-brand-surface shadow-strong p-6">
      {/* Esquerda: imagem + info básica */}
      <div className="flex-1 flex gap-4">
        <img
          src={imageUrl}
          alt={name}
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
              className="px-3 py-1 rounded-full border border-brand-border text-brand-text hover:bg-brand-accent hover:text-black"
            >
              −
            </button>
            <span className="min-w-8 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(index, +1)}
              className="px-3 py-1 rounded-full border border-brand-border text-brand-text hover:bg-brand-accent hover:text-black"
            >
              +
            </button>
          </div>

          {/* Ações: Excluir / Salvar para depois como links */}
          <div className="mt-4 flex gap-6">
            <span
              onClick={() => onRemove(index)}
              className="cursor-pointer text-brand-accent hover:underline"
            >
              Excluir
            </span>
            <span
              onClick={() => onSaveLater()}
              className="cursor-pointer text-brand-accent hover:underline"
            >
              Salvar para depois
            </span>
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
