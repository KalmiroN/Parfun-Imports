package com.parfunimports.backend.repository;

import com.parfunimports.backend.model.Role;
import com.parfunimports.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // ✅ Busca usuário por e-mail (login principal)
    Optional<User> findByEmail(String email);

    // ✅ Verifica se já existe usuário com determinado e-mail
    boolean existsByEmail(String email);

    // ✅ Busca usuários por telefone
    Optional<User> findByPhone(String phone);

    // ✅ Busca todos os usuários por role (ADMIN ou CLIENTE)
    List<User> findByRole(Role role);

    // ✅ Exemplo de query customizada: busca todos os admins
    @Query("SELECT u FROM User u WHERE u.role = com.parfunimports.backend.model.Role.ADMIN")
    List<User> findAllAdmins();

    // ✅ Exemplo de query customizada: busca todos os clientes
    @Query("SELECT u FROM User u WHERE u.role = com.parfunimports.backend.model.Role.CLIENTE")
    List<User> findAllClients();
}
