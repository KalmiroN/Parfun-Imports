package com.parfunimports.backend.security;

import com.parfunimports.backend.model.User;
import com.parfunimports.backend.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * Serviço responsável por carregar usuários do banco de dados
 * e convertê-los em UserDetails para o Spring Security.
 *
 * ⚠️ Esse serviço é usado internamente pelo Spring Security
 * quando precisamos autenticar usuários com base no email.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 🔎 Busca usuário no banco pelo email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + email));

        // ✅ Converte enum Role para String ("ADMIN" ou "CLIENTE")
        String role = user.getRole().name();

        // ✅ Prefixa sempre com ROLE_ para compatibilidade com @PreAuthorize("hasRole('ADMIN')")
        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + role)
        );

        // ✅ Constrói objeto UserDetails usado pelo Spring Security
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword()) // senha já criptografada no banco
                .authorities(authorities)
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
