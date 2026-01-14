package com.parfunimports.backend.dto;

import com.parfunimports.backend.model.Order;
import com.parfunimports.backend.model.OrderProduct;
import com.parfunimports.backend.model.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper para converter Order -> OrderDTO e OrderProduct -> OrderProductDTO.
 * Garante que o backend nunca exponha diretamente as entidades JPA.
 */
@Component
public class OrderMapper {

    public OrderDTO fromEntity(Order order) {
        if (order == null) return null;

        List<OrderProductDTO> items = order.getItems().stream()
                .map(this::fromEntity)
                .collect(Collectors.toList());

        return new OrderDTO(
                order.getId(),
                order.getCustomerEmail(),
                order.getTotal(),
                items
        );
    }

    public OrderProductDTO fromEntity(OrderProduct orderProduct) {
        if (orderProduct == null) return null;

        Product product = orderProduct.getProduct();

        return new OrderProductDTO(
                product != null ? product.getId() : null,
                product != null ? product.getName() : null,
                product != null ? product.getImageUrl() : null,
                orderProduct.getQuantity(),
                orderProduct.getPrice()
        );
    }
}
