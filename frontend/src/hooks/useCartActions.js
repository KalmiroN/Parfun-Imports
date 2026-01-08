import { toast } from "react-toastify";

/**
 * Hook que centraliza as ações do carrinho
 */
export function useCartActions({
  cartItems,
  setCartItems,
  saveForLater, // ✅ já vem do CartProvider
  moveBackToCart, // ✅ novo: também vem do CartProvider
  checkout,
  token,
  isAuthenticated,
  setShowSaveLater,
  setShowCheckout,
}) {
  // ✅ Remover item do carrinho
  const handleRemove = async (index) => {
    const updated = [...cartItems];
    const removedItem = updated[index];
    updated.splice(index, 1);
    setCartItems(updated);

    try {
      await saveForLater(removedItem); // delega ao provider
      toast.info(`${removedItem?.name || "Produto"} foi removido do carrinho.`);
    } catch (err) {
      console.error("Erro ao remover produto:", err);
      toast.error("Erro ao remover produto do carrinho.");
    }
  };

  // ✅ Alterar quantidade
  const handleQuantityChange = async (index, delta) => {
    const updated = [...cartItems];
    const newQty = (updated[index]?.quantity || 1) + delta;
    updated[index].quantity = Math.max(1, newQty);
    setCartItems(updated);

    try {
      toast.success(
        `Quantidade de ${updated[index]?.name || "Produto"} atualizada para ${
          updated[index].quantity
        }`
      );
    } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
      toast.error("Erro ao atualizar quantidade.");
    }
  };

  // ✅ Salvar para depois
  const handleSaveLater = async (rawItem) => {
    try {
      await saveForLater(rawItem); // delega ao provider
      toast.success(`${rawItem?.name || "Item"} salvo para depois!`);
      setShowSaveLater(true);
    } catch (err) {
      console.error("Erro ao salvar item:", err);
      toast.error("Erro ao salvar item para depois.");
    }
  };

  // ✅ Mover de volta do 'salvos' para carrinho
  const handleMoveBackToCart = async (savedItem) => {
    try {
      await moveBackToCart(savedItem); // delega ao provider (usa saveLaterId corretamente)
      toast.success(
        `${savedItem?.name || "Item"} movido de volta para o carrinho!`
      );
    } catch (err) {
      console.error("Erro ao mover item de volta:", err);
      toast.error("Erro ao mover item de volta para o carrinho.");
    }
  };

  // ✅ Finalizar compra
  const handleCheckout = async (method) => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para finalizar a compra.");
      return;
    }
    try {
      const res = await checkout(method);
      if (res.ok) {
        toast.success("Compra finalizada com sucesso!");
        setCartItems([]);
        setShowCheckout(false);
      } else {
        toast.error("Erro ao finalizar compra.");
      }
    } catch (err) {
      console.error("Erro ao finalizar compra:", err);
      toast.error("Erro ao finalizar compra.");
    }
  };

  return {
    handleRemove,
    handleQuantityChange,
    handleSaveLater,
    handleMoveBackToCart, // ✅ novo
    handleCheckout,
  };
}
