package com.parfunimports.backend.controller;

import com.parfunimports.backend.model.Order;
import com.parfunimports.backend.model.OrderProduct;
import com.parfunimports.backend.model.Product;
import com.parfunimports.backend.service.OrderService;
import com.parfunimports.backend.service.ProductService;
import com.parfunimports.backend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final ProductService productService;
    private final JwtUtil jwtUtil;

    public OrderController(OrderService orderService, ProductService productService, JwtUtil jwtUtil) {
        this.orderService = orderService;
        this.productService = productService;
        this.jwtUtil = jwtUtil;
    }

    // 📦 Listar todos os pedidos (somente ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Order>> getAll() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // 🔎 Buscar pedido por ID (somente ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Order> getById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return (order != null) ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    // ➕ Criar novo pedido (CLIENTE autenticado)
    @PreAuthorize("hasRole('CLIENTE')")
    @PostMapping
    public ResponseEntity<?> create(@RequestHeader("Authorization") String token,
                                    @RequestBody Order order) {
        try {
            String jwt = token.replace("Bearer ", "").trim();
            String email = jwtUtil.extractEmail(jwt);

            // Vincular o pedido ao usuário autenticado
            order.setCustomerEmail(email);

            BigDecimal total = BigDecimal.ZERO;

            // Validar produtos e calcular subtotal
            for (OrderProduct item : order.getItems()) {
                Product product = productService.getProductById(item.getProduct().getId());
                if (product == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Produto inválido: " + item.getProduct().getId());
                }

                item.setProduct(product);
                item.setPrice(product.getPrice()); // ✅ BigDecimal
                item.setOrder(order); // garantir vínculo

                // ✅ calcular subtotal do item
                BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                total = total.add(subtotal);
            }

            // ✅ definir total do pedido
            order.setTotal(total);

            Order savedOrder = orderService.saveOrder(order);
            return ResponseEntity.ok(savedOrder);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar pedido: " + e.getMessage());
        }
    }

    // 📥 Criar vários pedidos de uma vez (somente ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/batch")
    public ResponseEntity<List<Order>> createOrders(@RequestBody List<Order> orders) {
        List<Order> saved = orderService.saveAllOrders(orders);
        return ResponseEntity.ok(saved);
    }

    // ✏️ Atualizar pedido (somente ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Order> update(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Order order = orderService.updateOrder(id, updatedOrder);
        return (order != null) ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    // ❌ Deletar pedido (somente ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = orderService.deleteOrder(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // 👤 Listar pedidos do usuário autenticado (CLIENTE)
    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(@RequestHeader("Authorization") String token) {
        String jwt = token.replace("Bearer ", "").trim();
        String email = jwtUtil.extractEmail(jwt);

        // Buscar pedidos pelo e-mail do usuário autenticado
        List<Order> orders = orderService.getOrdersByEmail(email);
        return ResponseEntity.ok(orders);
    }
}
