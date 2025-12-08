package com.parfunimports.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicController {

    @GetMapping("/api/public/hello")
    public String helloPublic() {
        return "Olá! Este endpoint é público e não precisa de token.";
    }
}
