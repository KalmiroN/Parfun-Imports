-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS parfun_imports CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE parfun_imports;

-- ============================
-- Tabela USERS
-- ============================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- ============================
-- Tabela PRODUCT
-- ============================
CREATE TABLE IF NOT EXISTS product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- ============================
-- Tabela ORDERS
-- ============================
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    user_id BIGINT,
    product_id BIGINT,
    CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES product(id)
) ENGINE=InnoDB;
