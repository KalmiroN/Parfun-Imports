package com.parfunimports.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * Entidade que representa um item salvo para depois.
 * Ligada ao usuário e ao produto, com informações essenciais
 * para manter consistência no banco.
 */
@Entity
@Table(name = "save_later_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SaveLaterItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 📌 usuário associado ao item (FK opcional, mas mantemos o email também)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // 📌 produto associado ao item
    @Column(name = "product_id", nullable = false)
    private Long productId;

    // 📌 quantidade do produto
    @Column(nullable = false)
    private Integer quantity;

    // 📌 imagem do produto
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    // 📌 nome do produto
    @Column(nullable = false, length = 255)
    private String name;

    // ✅ preço como BigDecimal para alinhar com DECIMAL(10,2) no banco
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // 📌 email do usuário (garante multiusuário mesmo sem FK)
    @Column(name = "user_email", nullable = false, length = 255)
    private String userEmail;
}
