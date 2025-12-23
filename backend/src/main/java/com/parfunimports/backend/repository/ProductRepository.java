package com.parfunimports.backend.repository;

import com.parfunimports.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // ✅ busca apenas produtos com highlight = true
    List<Product> findByHighlightTrue();
}
