package com.parfunimports.backend.exception;

/**
 * Exceção lançada quando um email já está em uso.
 */
public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String email) {
        super("Email já está em uso: " + email);
    }
}
