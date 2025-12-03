package com.parfunimports.backend.service;

import com.parfunimports.backend.domain.User;
import com.parfunimports.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Listar todos os usuários
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Buscar usuário por ID
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    // Criar novo usuário
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Registrar usuário (alias para createUser)
    public User registerUser(User user) {
        return createUser(user);
    }

    // Buscar usuário por email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Atualizar usuário existente
    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id)
                .map(existing -> {
                    existing.setName(userDetails.getName());
                    existing.setEmail(userDetails.getEmail());
                    existing.setRole(userDetails.getRole());
                    existing.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    // Deletar usuário
    public boolean deleteUser(Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return true;
                })
                .orElse(false);
    }
}
