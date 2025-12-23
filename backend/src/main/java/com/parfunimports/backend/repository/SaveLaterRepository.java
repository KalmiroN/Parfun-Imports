package com.parfunimports.backend.repository;

import com.parfunimports.backend.model.SaveLaterItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaveLaterRepository extends JpaRepository<SaveLaterItem, Long> {
    // 📦 Buscar todos os itens salvos para depois de um usuário
    List<SaveLaterItem> findByUserEmail(String userEmail);

    // 🗑️ Deletar todos os itens salvos para depois de um usuário
    void deleteByUserEmail(String userEmail);

    // 🔎 Buscar item específico salvo para depois (evita duplicar produtos)
    SaveLaterItem findByUserEmailAndProductId(String userEmail, Long productId);
}
