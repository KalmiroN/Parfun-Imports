package com.parfunimports.backend.repository;

import com.parfunimports.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 📦 Busca todos os produtos sem duplicados
    @Query("SELECT DISTINCT p FROM Product p")
    List<Product> findAllDistinct();

    // ⭐ Busca apenas produtos em destaque (highlight = true) sem duplicados
    @Query("SELECT DISTINCT p FROM Product p WHERE p.highlight = true")
    List<Product> findDistinctByHighlightTrue();

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

    // 🔎 Buscar produtos por nome (case insensitive, sem duplicados)
    @Query("SELECT DISTINCT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Product> findByNameContainingIgnoreCase(String name);

    // 🔎 Buscar produtos com preço menor ou igual ao valor informado (sem duplicados)
    @Query("SELECT DISTINCT p FROM Product p WHERE p.price <= :price")
    List<Product> findByPriceLessThanEqual(Double price);

    // 🔎 Buscar produtos com estoque maior que zero (sem duplicados)
    @Query("SELECT DISTINCT p FROM Product p WHERE p.stock > :stock")
    List<Product> findByStockGreaterThan(Integer stock);

    // 🔎 Buscar produtos por categoria (sem duplicados)
    @Query("SELECT DISTINCT p FROM Product p WHERE LOWER(p.category) = LOWER(:category)")
    List<Product> findByCategoryIgnoreCase(String category);

    // 🔎 Buscar produtos por faixa de preço (sem duplicados)
    @Query("SELECT DISTINCT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
}
