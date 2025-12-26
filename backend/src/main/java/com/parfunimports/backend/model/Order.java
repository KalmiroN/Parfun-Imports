package com.parfunimports.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 📌 dados do cliente
    @Column(name = "customer_name", nullable = false, length = 255)
    private String customerName;

    @Column(name = "customer_email", nullable = false, length = 255)
    private String customerEmail;

    // 📌 status do pedido (ex.: PENDING, PAID, CANCELLED)
    @Column(nullable = false, length = 255)
    private String status;

    // 📌 valor total do pedido (decimal(38,2))
    @Column(name = "total")
    private Double total;

    // 📌 valor total do pedido (double)
    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    // 📌 usuário associado ao pedido
    @Column(name = "user_id")
    private Long userId;

    // 📌 data de criação do pedido
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // 📌 relação com os itens do pedido
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProduct> items = new ArrayList<>();

    // ✅ helper method para manter consistência
    public void addItem(OrderProduct item) {
        item.setOrder(this); // garante que o order_id não será null
        this.items.add(item);
    }

    public void setItems(List<OrderProduct> items) {
        this.items.clear();
        if (items != null) {
            items.forEach(this::addItem);
        }
    }
}


