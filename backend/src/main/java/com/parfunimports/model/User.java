package com.parfunimports.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")  // evita conflito com palavra reservada
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // não pode ser nulo
    private String name;

    @Column(nullable = false, unique = true) // email único
    private String email;

    @Column(nullable = false)
    private String password; // armazenar com hash

    @Column(nullable = false)
    private String role;     // "ADMIN" ou "USER"

    // Relacionamento: um usuário pode ter vários pedidos
    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    // Getters e Setters
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
