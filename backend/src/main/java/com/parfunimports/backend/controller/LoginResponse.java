package com.parfunimports.backend.controller;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private Long id;
    private String email;
    private String name;
    private String role;
    private String phone;
    private String address;
    private String accessToken;
    private String refreshToken;
}
