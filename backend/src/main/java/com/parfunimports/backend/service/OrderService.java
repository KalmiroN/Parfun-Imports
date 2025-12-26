package com.parfunimports.backend.service;

import com.parfunimports.backend.model.Order;
import com.parfunimports.backend.model.OrderProduct;
import com.parfunimports.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
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
        orders.forEach(order -> {
            if (order.getCreatedAt() == null) {
                order.setCreatedAt(LocalDateTime.now());
            }
            if (order.getItems() != null) {
                order.getItems().forEach(item -> item.setOrder(order));
            }
        });
        return orderRepository.saveAll(orders);
    }

    // ➕ Criar novo pedido
    public Order saveOrder(Order order) {
        if (order.getCreatedAt() == null) {
            order.setCreatedAt(LocalDateTime.now());
        }
        if (order.getItems() != null) {
            order.getItems().forEach(item -> item.setOrder(order));
        }
        return orderRepository.save(order);
    }

    // ✏️ Atualizar pedido
    public Order updateOrder(Long id, Order updatedOrder) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setCustomerName(updatedOrder.getCustomerName());
                    order.setCustomerEmail(updatedOrder.getCustomerEmail());
                    order.setStatus(updatedOrder.getStatus());
                    order.setTotal(updatedOrder.getTotal());
                    order.setTotalAmount(updatedOrder.getTotalAmount());
                    order.setUserId(updatedOrder.getUserId());
                    order.setCreatedAt(updatedOrder.getCreatedAt() != null ? updatedOrder.getCreatedAt() : order.getCreatedAt());

                    // ✅ garantir vínculo dos itens
                    if (updatedOrder.getItems() != null) {
                        updatedOrder.getItems().forEach(item -> item.setOrder(order));
                        order.setItems(updatedOrder.getItems());
                    }

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
    public Double sumTotalSalesBetween(LocalDateTime start, LocalDateTime end) {
        return orderRepository.sumTotalSalesBetween(start, end);
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
}
