package com.parfunimports.backend.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders") // evita conflito com palavra reservada
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String status;

    // Usar BigDecimal para cálculos monetários
    @Column(nullable = false)
    private BigDecimal total;

    // Cada pedido pertence a um usuário
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "user_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_orders_user")
    )
    private User user;

    // Cada pedido pode ter vários produtos
    @ManyToMany
    @JoinTable(
        name = "order_products",
        joinColumns = @JoinColumn(
            name = "order_id",
            foreignKey = @ForeignKey(name = "fk_order_products_order")
        ),
        inverseJoinColumns = @JoinColumn(
            name = "product_id",
            foreignKey = @ForeignKey(name = "fk_order_products_product")
        )
    )
    private List<Product> products = new ArrayList<>();

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
