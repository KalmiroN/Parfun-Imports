package com.parfunimports.backend.repository;

import com.parfunimports.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Repositório para entidade User.
 * Fornece métodos de acesso ao banco de dados relacionados a usuários.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Busca usuário pelo email.
     * @param email email do usuário
     * @return Optional<User>
     */
    Optional<User> findByEmail(String email);

    /**
     * Verifica se já existe usuário com determinado email.
     * @param email email do usuário
     * @return true se existir, false caso contrário
     */
    boolean existsByEmail(String email);
}
