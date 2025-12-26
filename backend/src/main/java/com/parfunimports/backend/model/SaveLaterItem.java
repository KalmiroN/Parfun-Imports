package com.parfunimports.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "save_later_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveLaterItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 📌 usuário associado ao item
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // 📌 produto associado ao item
    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(name = "user_email", nullable = false, length = 255)
    private String userEmail;
}
