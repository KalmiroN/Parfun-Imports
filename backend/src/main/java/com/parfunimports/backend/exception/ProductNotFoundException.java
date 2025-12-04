package com.parfunimports.backend.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Produto não encontrado com ID: " + id);
    }

    public ProductNotFoundException(String message) {
        super(message);
    }
}
