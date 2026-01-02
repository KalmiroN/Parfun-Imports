package com.parfunimports.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ campo email único, usado no findByEmail
    @Email
    @Column(nullable = false, unique = true, length = 255)
    private String email;

    // 🔒 nunca expor senha em JSON
    @JsonIgnore
    @Column(nullable = false, length = 255)
    private String password;

    @NotBlank
    @Column(nullable = false, length = 255)
    private String name;

    // ✅ Enum para role (ADMIN ou CLIENTE)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Role role;

    @Column(length = 255)
    private String phone;

    @Column(length = 255)
    private String address;

    // 📌 relação com pedidos
    @Builder.Default // ✅ garante inicialização mesmo com @Builder
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference   // ✅ evita recursão infinita no JSON
    private List<Order> orders = new ArrayList<>();

    // ✅ helper methods
    public void addOrder(Order order) {
        order.setUser(this);
        this.orders.add(order);
    }

    public void setOrders(List<Order> orders) {
        this.orders.clear();
        if (orders != null) {
            orders.forEach(this::addOrder);
        }
    }

    // ✅ Método auxiliar para exibir role de forma semântica
    public String getRoleDisplay() {
        return role != null ? role.name().toLowerCase() : "desconhecido";
    }

    // 🔑 Implementação de UserDetails para o Spring Security
    @Override
    @JsonIgnore // não serializar no JSON
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override @JsonIgnore public String getPassword() { return password; }
    @Override @JsonIgnore public String getUsername() { return email; }
    @Override @JsonIgnore public boolean isAccountNonExpired() { return true; }
    @Override @JsonIgnore public boolean isAccountNonLocked() { return true; }
    @Override @JsonIgnore public boolean isCredentialsNonExpired() { return true; }
    @Override @JsonIgnore public boolean isEnabled() { return true; }
}