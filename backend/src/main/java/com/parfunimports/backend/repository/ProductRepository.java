package com.parfunimports.backend.repository;

import com.parfunimports.backend.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositório para entidade Product.
 * Usa JpaRepository para operações básicas (save, findAll, findById, deleteById).
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Métodos adicionais podem ser definidos aqui se necessário
}
