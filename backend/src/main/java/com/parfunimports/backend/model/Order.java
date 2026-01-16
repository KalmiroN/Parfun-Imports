package com.parfunimports.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    // 📌 valor total do pedido (decimal(10,2))
    @Column(name = "total", precision = 10, scale = 2, nullable = false)
    private BigDecimal total;

    // 📌 usuário associado ao pedido (relação ManyToOne)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference   // ✅ evita recursão infinita (lado inverso da relação)
    private User user;

    // 📌 também mantém o userId simples (compatibilidade com frontend)
    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;

    // 📌 data de criação do pedido
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // 📌 campo extra para compatibilidade com frontend (se precisar Date em vez de LocalDateTime)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    // 📌 relação com os itens do pedido
    @Builder.Default
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference   // ✅ evita recursão infinita (lado dono da relação)
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
