package com.parfunimports.backend.service;

import com.parfunimports.backend.model.CartItem;
import com.parfunimports.backend.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // ➕ Adicionar item ao carrinho
    public CartItem addItem(CartItem item) {
        CartItem existing = cartRepository.findByUserEmailAndProductId(
                item.getUserEmail(), item.getProductId()
        );

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + item.getQuantity());
            return cartRepository.save(existing);
        }

        return cartRepository.save(item);
    }

    // 📦 Listar itens do carrinho de um usuário
    public List<CartItem> getCartItems(String userEmail) {
        return cartRepository.findByUserEmail(userEmail);
    }

    // ❌ Remover item do carrinho (valida dono)
    public boolean removeItem(Long id, String userEmail) {
        return cartRepository.findById(id)
                .filter(item -> item.getUserEmail().equals(userEmail)) // ✅ só remove se pertence ao usuário logado
                .map(item -> {
                    cartRepository.delete(item);
                    return true;
                })
                .orElse(false);
    }

    // 🗑️ Limpar carrinho de um usuário
    public void clearCart(String userEmail) {
        List<CartItem> items = cartRepository.findByUserEmail(userEmail);
        if (items.isEmpty()) {
            throw new IllegalStateException("O carrinho já está vazio para o usuário: " + userEmail);
        }
        cartRepository.deleteByUserEmail(userEmail);
    }

    // 🔄 Atualizar quantidade de um item no carrinho (valida dono)
    public CartItem updateQuantity(Long id, int newQuantity, String userEmail) {
        CartItem existing = cartRepository.findById(id)
                .filter(item -> item.getUserEmail().equals(userEmail)) // ✅ só atualiza se pertence ao usuário logado
                .orElseThrow(() -> new IllegalArgumentException("Item não encontrado ou não pertence ao usuário: " + id));

        if (newQuantity <= 0) {
            throw new IllegalArgumentException("Quantidade deve ser maior que zero");
        }

        existing.setQuantity(newQuantity);
        return cartRepository.save(existing);
    }
}
