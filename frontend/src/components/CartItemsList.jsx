import CheckoutCard from "./CheckoutCard";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import { forwardRef } from "react";

/**
 * Lista de itens do carrinho + subtotal
 */
const CartItemsList = forwardRef(
  (
    {
      cartItems,
      handleRemove,
      handleQuantityChange,
      handleSaveLater,
      subtotal,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="space-y-4 mx-auto"
        style={{ maxWidth: "850px", minWidth: "650px", width: "100%" }}
      >
        {cartItems.map((rawItem, idx) => {
          const item = {
            id: rawItem?.id,
            productId: rawItem?.productId,
            name: rawItem?.name || "Produto",
            price:
              typeof rawItem?.price === "number"
                ? `R$ ${rawItem.price.toFixed(2).replace(".", ",")}`
                : rawItem?.price || "R$ 0,00",
            imageUrl: resolveImageUrl(rawItem?.imageUrl),
            quantity: rawItem?.quantity || 1,
          };

          return (
            <div
              key={idx}
              className="hover:scale-[1.02] transition-transform duration-300"
            >
              <CheckoutCard
                item={item}
                index={idx}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
                onSaveLater={() => handleSaveLater(rawItem)}
              />
            </div>
          );
        })}

        {/* ✅ Subtotal alinhado com os cards */}
        <div className="mt-10 flex justify-end">
          <p className="text-xl font-semibold">
            Subtotal: R$ {subtotal.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>
    );
  }
);

export default CartItemsList;
