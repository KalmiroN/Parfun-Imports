package com.parfunimports.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidade que representa os produtos disponíveis no catálogo.
 * Cada produto pode estar associado a vários itens de pedidos (OrderProduct).
 */
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // PK auto-increment

    // ✅ Nome comercial (aparece para o cliente)
    @NotBlank(message = "O nome do produto é obrigatório")
    @Size(max = 255, message = "O nome não pode ultrapassar 255 caracteres")
    @Column(nullable = false, length = 255)
    private String name;

    // 📌 Descrição opcional
    @Size(max = 255, message = "A descrição não pode ultrapassar 255 caracteres")
    @Column(length = 255)
    private String description;

    // 💰 Preço do produto
    @NotNull(message = "O preço é obrigatório")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // 📦 Estoque disponível
    @Column
    private Integer stock;

    // 🖼️ Nome do arquivo físico da imagem
    @Pattern(regexp = ".*\\.png$", message = "Somente arquivos .PNG são permitidos")
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    // ⭐ Campo para marcar produtos em destaque
    @Builder.Default
    @Column(nullable = false)
    private boolean highlight = false;

    // 🏷️ Categoria do produto
    @Size(max = 100, message = "A categoria não pode ultrapassar 100 caracteres")
    @Column(length = 100)
    private String category;

    // 📌 Relação com OrderProduct (itens de pedidos)
    @Builder.Default
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference   // ✅ evita recursão infinita no JSON
    private List<OrderProduct> orderProducts = new ArrayList<>();

    // ✅ helper methods para manter consistência no relacionamento
    public void addOrderProduct(OrderProduct orderProduct) {
        orderProduct.setProduct(this);
        this.orderProducts.add(orderProduct);
    }

    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts.clear();
        if (orderProducts != null) {
            orderProducts.forEach(this::addOrderProduct);
        }
    }
}
