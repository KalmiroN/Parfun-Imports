package com.parfunimports.repository;

import com.parfunimports.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // JpaRepository já fornece save, findAll, deleteById, etc.
}

