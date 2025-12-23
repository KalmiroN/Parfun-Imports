package com.parfunimports.backend.repository;

import com.parfunimports.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Long> {
    // Buscar todos os itens do carrinho de um usuário
    List<CartItem> findByUserEmail(String userEmail);

    // Deletar todos os itens do carrinho de um usuário
    void deleteByUserEmail(String userEmail);

    // Buscar item específico no carrinho (evita duplicar produtos)
    CartItem findByUserEmailAndProductId(String userEmail, Long productId);
}
