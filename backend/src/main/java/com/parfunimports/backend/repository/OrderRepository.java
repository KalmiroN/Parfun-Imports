package com.parfunimports.backend.repository;

import com.parfunimports.backend.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositório para entidade Order.
 * Usa JpaRepository para operações básicas (save, findAll, findById, deleteById).
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Métodos adicionais podem ser definidos aqui se necessário
}
