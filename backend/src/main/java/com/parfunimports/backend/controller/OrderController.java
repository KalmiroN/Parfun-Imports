package com.parfunimports.backend.controller;

import com.parfunimports.backend.model.Order;
import com.parfunimports.backend.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Listar todos os pedidos
    @GetMapping
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    // Buscar pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar novo pedido
    @PostMapping
    public Order create(@RequestBody Order order) {
        return orderRepository.save(order);
    }
}
