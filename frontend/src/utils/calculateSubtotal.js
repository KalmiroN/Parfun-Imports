/**
 * Função utilitária para calcular o subtotal do carrinho
 * @param {Array} cartItems - Lista de itens do carrinho
 * @returns {number} subtotal
 */
export function calculateSubtotal(cartItems) {
  return cartItems.reduce((acc, item) => {
    const qty = item?.quantity || 1;
    let priceValue = 0;

    if (typeof item?.price === "string") {
      // Remove símbolos e normaliza para número
      priceValue = parseFloat(
        item.price.replace("R$", "").replace(".", "").replace(",", ".")
      );
    } else if (typeof item?.price === "number") {
      priceValue = item.price;
    }

    return acc + priceValue * qty;
  }, 0);
}
