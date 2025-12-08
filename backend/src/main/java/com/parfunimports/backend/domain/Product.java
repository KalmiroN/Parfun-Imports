package com.parfunimports.backend.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * Entidade Product que representa um produto.
 * Cada produto pode aparecer em vários pedidos.
 */
@Entity
@Table(name = "products") // nome plural para tabela
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 180)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price; // Usar BigDecimal para valores monetários

    @Column(nullable = false)
    private Integer stock;

    // Relacionamento: um produto pode aparecer em vários pedidos
    @ManyToMany(mappedBy = "products")
    private List<Order> orders;

    // =========================
    // Getters e Setters
    // =========================
    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getName() { 
        return name; 
    }
    public void setName(String name) { 
        this.name = name; 
    }

    public String getDescription() { 
        return description; 
    }
    public void setDescription(String description) { 
        this.description = description; 
    }

    public BigDecimal getPrice() { 
        return price; 
    }
    public void setPrice(BigDecimal price) { 
        this.price = price; 
    }

    public Integer getStock() { 
        return stock; 
    }
    public void setStock(Integer stock) { 
        this.stock = stock; 
    }

    public List<Order> getOrders() { 
        return orders; 
    }
    public void setOrders(List<Order> orders) { 
        this.orders = orders; 
    }
}
