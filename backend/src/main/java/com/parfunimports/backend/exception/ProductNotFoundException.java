package com.parfunimports.backend.exception;

/**
 * Exceção lançada quando um produto não é encontrado.
 */
public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Produto não encontrado com ID: " + id);
    }

    public ProductNotFoundException(String message) {
        super(message);
    }
}
