package com.parfunimports.backend.repository;

import com.parfunimports.backend.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // JpaRepository já fornece save, findAll, findById, deleteById, etc.
}

