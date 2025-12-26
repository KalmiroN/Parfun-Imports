package com.parfunimports.backend.repository;

import com.parfunimports.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // ✅ Busca apenas produtos com highlight = true
    List<Product> findByHighlightTrue();

    // ✅ Top N produtos mais vendidos (via OrderProduct)
    // Retorna uma lista de Object[] onde:
    // [0] = Product
    // [1] = quantidade vendida (Long)
    @Query("SELECT op.product, SUM(op.quantity) as totalSold " +
           "FROM OrderProduct op GROUP BY op.product ORDER BY totalSold DESC")
    List<Object[]> findTopSellingProductsWithQuantity();

    // ✅ Somar estoque total
    @Query("SELECT COALESCE(SUM(p.stock), 0) FROM Product p")
    Integer sumTotalStock();
}

