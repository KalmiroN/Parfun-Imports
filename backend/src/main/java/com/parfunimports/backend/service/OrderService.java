package com.parfunimports.backend.service;

import com.parfunimports.backend.domain.Order;
import com.parfunimports.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Listar todos os pedidos
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    // Buscar pedido por ID
    public Order findById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + id));
    }

    // Criar novo pedido
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    // Atualizar pedido existente
    public Order updateOrder(Long id, Order orderDetails) {
        return orderRepository.findById(id)
                .map(existing -> {
                    existing.setStatus(orderDetails.getStatus());
                    existing.setTotal(orderDetails.getTotal());
                    existing.setUser(orderDetails.getUser());
                    existing.setProduct(orderDetails.getProduct());
                    return orderRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + id));
    }

    // Deletar pedido
    public boolean deleteOrder(Long id) {
        return orderRepository.findById(id)
                .map(order -> {
                    orderRepository.delete(order);
                    return true;
                })
                .orElse(false);
    }
}
