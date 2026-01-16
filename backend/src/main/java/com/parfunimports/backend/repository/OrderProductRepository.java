package com.parfunimports.backend.repository;

import com.parfunimports.backend.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repositório JPA para a entidade OrderProduct.
 * - Permite CRUD completo nos itens de pedidos.
 * - Pode ser expandido com consultas customizadas (ex.: buscar por Order ou Product).
 */
public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {

    // 🔎 Buscar todos os itens de um pedido específico
    List<OrderProduct> findByOrderId(Long orderId);

    // 🔎 Buscar todos os itens relacionados a um produto específico
    List<OrderProduct> findByProductId(Long productId);
}
