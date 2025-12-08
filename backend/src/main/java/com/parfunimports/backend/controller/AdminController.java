package com.parfunimports.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @GetMapping("/api/admin/secret")
    public String secretAdmin() {
        return "Segredo do ADMIN: você só vê isso se tiver ROLE_ADMIN!";
    }
}
