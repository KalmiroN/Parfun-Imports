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

    @Email
    @Column(nullable = false, unique = true, length = 255)
    private String email;

    // 🔒 senha criptografada no banco
    @JsonIgnore
    @Column(nullable = false, length = 255)
    private String password;

    // 📌 campo transitório para receber senha pura do JSON (não persistido)
    @Transient
    private String rawPassword;

    @NotBlank
    @Column(nullable = false, length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Role role;

    // 📌 Campos opcionais: podem ser nulos
    @Column(length = 255)
    private String phone;

    @Column(length = 255)
    private String address;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Order> orders = new ArrayList<>();

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

    public String getRoleDisplay() {
        return role != null ? role.name().toLowerCase() : "desconhecido";
    }

    // 📌 Implementação de UserDetails para Spring Security
    @Override @JsonIgnore
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
