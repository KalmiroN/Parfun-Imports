package com.parfunimports.backend.service;

import com.parfunimports.backend.domain.Role;
import com.parfunimports.backend.domain.User;
import com.parfunimports.backend.dto.auth.RegisterRequest;
import com.parfunimports.backend.dto.auth.LoginRequest;
import com.parfunimports.backend.dto.auth.AuthResponse;
import com.parfunimports.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // ✅ Registrar novo usuário
    public AuthResponse register(RegisterRequest request) {
        // Verifica se email já existe
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já está em uso: " + request.getEmail());
        }

        // Cria novo usuário com role fixo USER
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER); // sempre USER por padrão

        userRepository.save(user);

        // Gera token JWT para o novo usuário
        String token = jwtService.generateToken(user);

        // ✅ Retorna também o role
        return new AuthResponse("Usuário registrado com sucesso", token, user.getRole().name());
    }

    // ✅ Autenticar usuário
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }

        // Gera token JWT para o usuário autenticado
        String token = jwtService.generateToken(user);

        // ✅ Retorna também o role
        return new AuthResponse("Login realizado com sucesso", token, user.getRole().name());
    }
}
