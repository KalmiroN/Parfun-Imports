package com.parfunimports.backend.controller;

import com.parfunimports.backend.domain.Order;
import com.parfunimports.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller para endpoints relacionados a pedidos (Order).
 * Protegido por permissions via Spring Security integrado ao Auth0.
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Listar todos os pedidos (precisa da permission "read:products")
    @GetMapping
    @PreAuthorize("hasAuthority('read:products')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.findAll());
    }

    // Buscar pedido por ID (precisa da permission "read:products")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('read:products')")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.findById(id);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    // Criar novo pedido (precisa da permission "create:products")
    @PostMapping
    @PreAuthorize("hasAuthority('create:products')")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order savedOrder = orderService.createOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    // Atualizar pedido existente (precisa da permission "create:products")
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('create:products')")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        Order updatedOrder = orderService.updateOrder(id, order);
        return updatedOrder != null ? ResponseEntity.ok(updatedOrder) : ResponseEntity.notFound().build();
    }

    // Deletar pedido (precisa da permission "delete:orders")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('delete:orders')")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        return orderService.deleteOrder(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
