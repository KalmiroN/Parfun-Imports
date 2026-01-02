package com.parfunimports.backend.repository;

import com.parfunimports.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // ✅ Busca apenas produtos em destaque (highlight = true)
    List<Product> findByHighlightTrue();

    // ✅ Top N produtos mais vendidos (via OrderProduct)
    // Retorna uma lista de Object[] onde:
    // [0] = Product
    // [1] = quantidade vendida (Long)
    @Query("SELECT op.product, SUM(op.quantity) as totalSold " +
           "FROM OrderProduct op GROUP BY op.product ORDER BY totalSold DESC")
    List<Object[]> findTopSellingProductsWithQuantity();

    // ✅ Somar estoque total de todos os produtos
    @Query("SELECT COALESCE(SUM(p.stock), 0) FROM Product p")
    Integer sumTotalStock();

    // ✅ Buscar produtos por nome (case insensitive, útil para pesquisa no catálogo)
    List<Product> findByNameContainingIgnoreCase(String name);

    // ✅ Buscar produtos com preço menor ou igual ao valor informado
    List<Product> findByPriceLessThanEqual(Double price);

    // ✅ Buscar produtos com estoque maior que zero (disponíveis para venda)
    List<Product> findByStockGreaterThan(Integer stock);
}
