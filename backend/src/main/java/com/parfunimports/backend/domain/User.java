package com.parfunimports.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "users")  // nome da tabela no banco
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 100)
    @Column(nullable = false)
    private String name;

    @NotNull
    @Email
    @Column(nullable = false, unique = true) // email único
    private String email;

    @NotNull
    @Size(min = 6) // senha deve ter pelo menos 6 caracteres
    @Column(nullable = false)
    @JsonIgnore // 👉 oculta o campo nas respostas JSON
    private String password; // armazenar com hash

    @NotNull
    @Column(nullable = false)
    private String role;     // "ADMIN" ou "USER"

    // Relacionamento: um usuário pode ter vários pedidos
    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public List<Order> getOrders() { return orders; }
    public void setOrders(List<Order> orders) { this.orders = orders; }
}

