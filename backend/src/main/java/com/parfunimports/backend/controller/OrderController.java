package com.parfunimports.backend.controller;

import com.parfunimports.backend.dto.OrderDTO;
import com.parfunimports.backend.dto.OrderMapper;
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
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final ProductService productService;
    private final JwtUtil jwtUtil;
    private final OrderMapper orderMapper;

    public OrderController(OrderService orderService,
                           ProductService productService,
                           JwtUtil jwtUtil,
                           OrderMapper orderMapper) {
        this.orderService = orderService;
        this.productService = productService;
        this.jwtUtil = jwtUtil;
        this.orderMapper = orderMapper;
    }

    // 📦 Listar todos os pedidos (somente ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAll() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderDTO> dtos = orders.stream()
                .map(orderMapper::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // 🔎 Buscar pedido por ID (somente ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return (order != null)
                ? ResponseEntity.ok(orderMapper.fromEntity(order))
                : ResponseEntity.notFound().build();
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

                BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                total = total.add(subtotal);
            }

            order.setTotal(total);

            Order savedOrder = orderService.saveOrder(order);
            return ResponseEntity.ok(orderMapper.fromEntity(savedOrder));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar pedido: " + e.getMessage());
        }
    }

    // 📥 Criar vários pedidos de uma vez (somente ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/batch")
    public ResponseEntity<List<OrderDTO>> createOrders(@RequestBody List<Order> orders) {
        List<Order> saved = orderService.saveAllOrders(orders);
        List<OrderDTO> dtos = saved.stream()
                .map(orderMapper::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // ✏️ Atualizar pedido (somente ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> update(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Order order = orderService.updateOrder(id, updatedOrder);
        return (order != null)
                ? ResponseEntity.ok(orderMapper.fromEntity(order))
                : ResponseEntity.notFound().build();
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
    public ResponseEntity<List<OrderDTO>> getMyOrders(@RequestHeader("Authorization") String token) {
        String jwt = token.replace("Bearer ", "").trim();
        String email = jwtUtil.extractEmail(jwt);

        List<Order> orders = orderService.getOrdersByEmail(email);
        List<OrderDTO> dtos = orders.stream()
                .map(orderMapper::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
