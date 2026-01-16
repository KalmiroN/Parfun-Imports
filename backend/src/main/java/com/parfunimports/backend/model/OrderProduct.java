package com.parfunimports.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * Entidade que representa os itens de um pedido.
 * Cada OrderProduct está vinculado a um Order e a um Product.
 */
@Entity
@Table(name = "order_products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 📌 relacionamento com Order (lado inverso do @OneToMany em Order)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonBackReference   // ✅ evita recursão infinita no JSON
    private Order order;

    // 📌 relacionamento com Product
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // 📌 quantidade do produto no pedido
    @Column(nullable = false)
    private Integer quantity;

    // 💰 preço do item no momento da compra
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // ✅ helper para calcular subtotal do item
    public BigDecimal getSubtotal() {
        if (price == null || quantity == null) return BigDecimal.ZERO;
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}
