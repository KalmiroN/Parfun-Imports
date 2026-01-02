-- ============================
-- Usuários iniciais (senha criptografada em BCrypt)
-- Senha original: A.marque@1979
-- ============================

INSERT INTO users (id, name, email, password, role) VALUES
(1, 'Solnice Guy', 'solniceguy@hotmail.com',
 '$2a$10$RsVnajxtEj0zLzzcmI6.0uGCG2IV4NOmN657aDpX0xbdFnM6aTjGe',
 'ADMIN')
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO users (id, name, email, password, role) VALUES
(2, 'Allstarson', 'allstarson@hotmail.com',
 '$2a$10$RsVnajxtEj0zLzzcmI6.0uGCG2IV4NOmN657aDpX0xbdFnM6aTjGe',
 'CLIENTE')
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO users (id, name, email, password, role) VALUES
(3, 'Admin', 'admin@parfun.com',
 '$2a$10$RsVnajxtEj0zLzzcmI6.0uGCG2IV4NOmN657aDpX0xbdFnM6aTjGe',
 'ADMIN')
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO users (id, name, email, password, role) VALUES
(4, 'Cliente', 'cliente@parfun.com',
 '$2a$10$RsVnajxtEj0zLzzcmI6.0uGCG2IV4NOmN657aDpX0xbdFnM6aTjGe',
 'CLIENTE')
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- ============================
-- Produtos iniciais
-- ============================

INSERT INTO products (id, name, description, price, stock, highlight) VALUES
(1, 'Perfume Dior Sauvage', 'Perfume masculino 100ml', 499.90, 50, TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products (id, name, description, price, stock, highlight) VALUES
(2, 'Perfume Chanel No.5', 'Perfume feminino 100ml', 599.90, 30, TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products (id, name, description, price, stock, highlight) VALUES
(3, 'Perfume Paco Rabanne Invictus', 'Perfume masculino 100ml', 399.90, 40, FALSE)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Produtos extras para teste
INSERT INTO products (id, name, description, price, stock, highlight) VALUES
(4, 'Perfume Calvin Klein Eternity', 'Perfume unissex 100ml', 299.90, 25, FALSE)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products (id, name, description, price, stock, highlight) VALUES
(5, 'Perfume Hugo Boss Bottled', 'Perfume masculino 100ml', 459.90, 35, TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products (id, name, description, price, stock, highlight) VALUES
(6, 'Perfume Givenchy Gentleman', 'Perfume masculino 100ml', 549.90, 20, FALSE)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- ============================
-- Pedidos iniciais
-- ============================

-- Pedido 1: Solnice Guy (ADMIN)
INSERT INTO orders (id, status, total, user_id, created_at) VALUES
(1, 'PENDING', 499.90, 1, NOW())
ON DUPLICATE KEY UPDATE status = VALUES(status);

INSERT INTO order_products (order_id, product_id, quantity, price)
VALUES (1, 1, 1, 499.90)
ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), price = VALUES(price);

-- Pedido 2: Allstarson (CLIENTE)
INSERT INTO orders (id, status, total, user_id, created_at) VALUES
(2, 'PAID', 599.90, 2, NOW())
ON DUPLICATE KEY UPDATE status = VALUES(status);

INSERT INTO order_products (order_id, product_id, quantity, price)
VALUES (2, 2, 1, 599.90)
ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), price = VALUES(price);

-- Pedido 3: Cliente (CLIENTE)
INSERT INTO orders (id, status, total, user_id, created_at) VALUES
(3, 'PENDING', 399.90, 4, NOW())
ON DUPLICATE KEY UPDATE status = VALUES(status);

INSERT INTO order_products (order_id, product_id, quantity, price)
VALUES (3, 3, 1, 399.90)
ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), price = VALUES(price);

-- Pedido 4: Admin (ADMIN) com múltiplos itens
INSERT INTO orders (id, status, total, user_id, created_at) VALUES
(4, 'PAID', 759.80, 3, NOW())
ON DUPLICATE KEY UPDATE status = VALUES(status);

INSERT INTO order_products (order_id, product_id, quantity, price)
VALUES (4, 4, 2, 299.90)
ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), price = VALUES(price);

INSERT INTO order_products (order_id, product_id, quantity, price)
VALUES (4, 5, 1, 459.90)
ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), price = VALUES(price);

-- Pedido 5: Allstarson (CLIENTE) com produto novo
INSERT INTO orders (id, status, total, user_id, created_at) VALUES
(5, 'PENDING', 549.90, 2, NOW())
ON DUPLICATE KEY UPDATE status = VALUES(status);

INSERT INTO order_products (order_id, product_id, quantity, price)
VALUES (5, 6, 1, 549.90)
ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), price = VALUES(price);
