package com.parfunimports.backend.dto;

import com.parfunimports.backend.model.User;
import org.springframework.stereotype.Component;

/**
 * Mapper para converter User -> UserDTO.
 */
@Component
public class UserMapper {

    public UserDTO fromEntity(User user) {
        if (user == null) return null;

        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getRole() != null ? user.getRole().name() : null
        );
    }
}
