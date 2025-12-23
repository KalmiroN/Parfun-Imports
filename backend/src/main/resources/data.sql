-- ============================
-- Usuários iniciais (com senha criptografada em BCrypt)
-- ============================

-- Senha original: A.marque@1979
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Solnice Guy', 'solniceguy@hotmail.com', '$2a$10$RsVnajxtEj0zLzzcmI6.0uGCG2IV4NOmN657aDpX0xbdFnM6aTjGe', 'USER');

-- Senha original: A.marque@1979
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Allstarson', 'allstarson@hotmail.com', '$2a$10$RsVnajxtEj0zLzzcmI6.0uGCG2IV4NOmN657aDpX0xbdFnM6aTjGe', 'USER');

-- ============================
-- Produtos iniciais
-- ============================

INSERT IGNORE INTO products (name, description, price, stock) VALUES
('Perfume X', 'Fragrância importada', 199.90, 50);

INSERT IGNORE INTO products (name, description, price, stock) VALUES
('Perfume Y', 'Fragrância francesa', 249.90, 30);

-- ============================
-- Pedidos iniciais
-- ============================

-- Pedido 1: Solnice Guy
INSERT IGNORE INTO orders (status, total, user_id) VALUES
('PENDING', 0, 1);

-- Pedido 2: Allstarson
INSERT IGNORE INTO orders (status, total, user_id) VALUES
('PAID', 0, 2);

-- ============================
-- Itens dos pedidos (em order_products)
-- ============================

-- Pedido 1 -> Perfume X
INSERT IGNORE INTO order_products (order_id, product_id, quantity) VALUES
(1, 1, 1);

-- Pedido 2 -> Perfume Y
INSERT IGNORE INTO order_products (order_id, product_id, quantity) VALUES
(2, 2, 1);
