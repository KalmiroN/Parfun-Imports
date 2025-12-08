package com.parfunimports.backend.exception;

/**
 * Exceção lançada quando um usuário não é encontrado.
 */
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Usuário não encontrado com ID: " + id);
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
