package com.parfunimports.backend.dto;

import com.parfunimports.backend.model.User;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private String role;
    private String phone;
    private String address;
    private String accessToken; // opcional, só usado no login

    // ✅ Construtor completo com todos os campos
    public UserResponse(Long id, String email, String name, String role,
                        String phone, String address, String accessToken) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = formatRole(role);
        this.phone = phone;
        this.address = address;
        this.accessToken = accessToken;
    }

    // ✅ Construtor a partir de User
    public UserResponse(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.role = formatRole(user.getRole().name()); // enum → string formatada
        this.phone = user.getPhone();
        this.address = user.getAddress();
    }

    // ✅ Construtor a partir de User + token
    public UserResponse(User user, String token) {
        this(user);
        this.accessToken = token;
    }

    // ✅ método auxiliar para formatar role
    private String formatRole(String roleName) {
        if (roleName == null) return "cliente"; // fallback padrão
        switch (roleName.toUpperCase()) {
            case "CLIENTE": return "cliente";
            case "ADMIN": return "Admin";
            default: return roleName; // fallback para valores inesperados
        }
    }
}
