package com.parfunimports.backend.service;

import com.parfunimports.backend.domain.Role;
import com.parfunimports.backend.domain.User;
import com.parfunimports.backend.dto.auth.RegisterRequest;
import com.parfunimports.backend.dto.auth.LoginRequest;
import com.parfunimports.backend.dto.auth.AuthResponse;
import com.parfunimports.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Serviço de autenticação local.
 * OBS: Tokens JWT não são mais gerados aqui, pois usamos Auth0.
 * O Auth0 é responsável por emitir tokens. O backend apenas valida.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registrar novo usuário local.
     * O token JWT não é gerado aqui — Auth0 é quem fornece.
     */
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já está em uso: " + request.getEmail());
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        return new AuthResponse(
                "Usuário registrado com sucesso. Faça login via Auth0.",
                null,
                user.getRole().name()
        );
    }

    /**
     * Autenticar usuário local.
     * O token JWT não é gerado aqui — Auth0 é quem fornece.
     */
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }

        return new AuthResponse(
                "Login realizado com sucesso. Token deve ser obtido via Auth0.",
                null,
                user.getRole().name()
        );
    }
}
