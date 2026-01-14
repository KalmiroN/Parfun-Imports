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
-- Pedidos iniciais (apenas 3 pedidos)
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
