package com.parfunimports.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 📌 referência ao produto
    @Column(name = "product_id", nullable = false)
    private Long productId;

    // 📌 nome do produto
    @Column(nullable = false, length = 255)
    private String name;

    // 📌 preço unitário (BigDecimal para valores monetários)
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // 📌 imagem do produto
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    // 📌 quantidade escolhida
    @Column(nullable = false)
    private Integer quantity;

    // 📌 email do usuário dono do carrinho
    @Column(name = "user_email", nullable = false, length = 255)
    private String userEmail;
}

