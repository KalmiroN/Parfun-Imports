package com.parfunimports.backend.service;

import com.parfunimports.backend.model.Order;
import com.parfunimports.backend.model.OrderProduct;
import com.parfunimports.backend.model.Product;
import com.parfunimports.backend.repository.OrderRepository;
import com.parfunimports.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    // 📌 Listar todos os pedidos
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 📌 Buscar pedido por ID
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    // 📥 Criar vários pedidos de uma vez
    public List<Order> saveAllOrders(List<Order> orders) {
        orders.forEach(this::prepareOrderBeforeSave);
        return orderRepository.saveAll(orders);
    }

    // ➕ Criar novo pedido
    public Order saveOrder(Order order) {
        prepareOrderBeforeSave(order);
        return orderRepository.save(order);
    }

    // ✏️ Atualizar pedido
    public Order updateOrder(Long id, Order updatedOrder) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setCustomerName(updatedOrder.getCustomerName());
                    order.setCustomerEmail(updatedOrder.getCustomerEmail());
                    order.setStatus(updatedOrder.getStatus());
                    order.setUserId(updatedOrder.getUserId());
                    order.setCreatedAt(updatedOrder.getCreatedAt() != null ? updatedOrder.getCreatedAt() : order.getCreatedAt());

                    if (updatedOrder.getItems() != null) {
                        updatedOrder.getItems().forEach(item -> {
                            Product product = productRepository.findById(item.getProduct().getId())
                                    .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + item.getProduct().getId()));
                            item.setProduct(product);
                            item.setPrice(product.getPrice()); // ✅ BigDecimal
                            item.setOrder(order);
                        });
                        order.setItems(updatedOrder.getItems());
                    }

                    // ✅ recalcular total
                    recalculateOrderTotal(order);

                    return orderRepository.save(order);
                })
                .orElse(null);
    }

    // ❌ Deletar pedido
    public boolean deleteOrder(Long id) {
        return orderRepository.findById(id)
                .map(order -> {
                    orderRepository.delete(order);
                    return true;
                })
                .orElse(false);
    }

    // 📊 Relatórios
    public BigDecimal sumTotalSalesBetween(LocalDateTime start, LocalDateTime end) {
        return orderRepository.sumTotalSalesBetween(start, end); // ✅ BigDecimal
    }

    public Long countOrdersBetween(LocalDateTime start, LocalDateTime end) {
        return orderRepository.countOrdersBetween(start, end);
    }

    public List<Object[]> sumSalesByDay(int month, int year) {
        return orderRepository.sumSalesByDay(month, year);
    }

    public List<Object[]> sumSalesByMonth(int year) {
        return orderRepository.sumSalesByMonth(year);
    }

    // 👤 Buscar pedidos pelo e-mail do cliente (para /api/orders/my)
    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findByCustomerEmail(email);
    }

    // 🔧 Método auxiliar para preparar pedido antes de salvar
    private void prepareOrderBeforeSave(Order order) {
        if (order.getCreatedAt() == null) {
            order.setCreatedAt(LocalDateTime.now());
        }

        if (order.getItems() != null) {
            order.getItems().forEach(item -> {
                Product product = productRepository.findById(item.getProduct().getId())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado: " + item.getProduct().getId()));
                item.setProduct(product);
                item.setPrice(product.getPrice()); // ✅ BigDecimal
                item.setOrder(order);
            });
        }

        // ✅ calcular total
        recalculateOrderTotal(order);
    }

    // 🔧 Método auxiliar para recalcular total do pedido
    private void recalculateOrderTotal(Order order) {
        BigDecimal total = BigDecimal.ZERO;

        if (order.getItems() != null) {
            for (OrderProduct item : order.getItems()) {
                BigDecimal subtotal = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                total = total.add(subtotal);
            }
        }

        order.setTotal(total); // ✅ apenas este campo
    }
}

