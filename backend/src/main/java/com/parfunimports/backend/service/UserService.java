package com.parfunimports.backend.service;

import com.parfunimports.backend.domain.User;
import com.parfunimports.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Criar usuário com senha criptografada
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Listar todos os usuários
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Buscar usuário por ID
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Buscar usuário por email
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Atualizar usuário existente
    public User updateUser(Long id, User user) {
        return userRepository.findById(id).map(existing -> {
            existing.setName(user.getName());
            existing.setEmail(user.getEmail());
            existing.setRole(user.getRole());

            // só atualiza senha se foi enviada
            if (user.getPassword() != null && !user.getPassword().isBlank()) {
                existing.setPassword(passwordEncoder.encode(user.getPassword()));
            }

            return userRepository.save(existing);
        }).orElse(null);
    }

    // Deletar usuário
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Verificar senha (para login simples)
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}

