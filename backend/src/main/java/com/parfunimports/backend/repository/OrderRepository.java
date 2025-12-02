package com.parfunimports.backend.repository;

import com.parfunimports.backend.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // JpaRepository já fornece save, findAll, findById, deleteById, etc.
}
