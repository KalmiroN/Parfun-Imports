package com.parfunimports.backend.controller;

import com.parfunimports.backend.model.Order;
import com.parfunimports.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // 📦 Listar todos os pedidos
    @GetMapping
    public ResponseEntity<List<Order>> getAll() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // 🔎 Buscar pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return (order != null) ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    // ➕ Criar novo pedido
    @PostMapping
    public ResponseEntity<Order> create(@RequestBody Order order) {
        Order savedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    // 📥 Criar vários pedidos de uma vez
    @PostMapping("/batch")
    public ResponseEntity<List<Order>> createOrders(@RequestBody List<Order> orders) {
        List<Order> saved = orderService.saveAllOrders(orders);
        return ResponseEntity.ok(saved);
    }

    // ✏️ Atualizar pedido
    @PutMapping("/{id}")
    public ResponseEntity<Order> update(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Order order = orderService.updateOrder(id, updatedOrder);
        return (order != null) ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    // ❌ Deletar pedido
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = orderService.deleteOrder(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
