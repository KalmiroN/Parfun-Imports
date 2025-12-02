-- Usuários iniciais
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@parfun.com', '1234', 'ADMIN')
ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password), role=VALUES(role);

INSERT INTO users (name, email, password, role) VALUES
('Cliente', 'cliente@parfun.com', 'abcd', 'USER')
ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password), role=VALUES(role);

-- Produtos iniciais (tabela singular: product)
INSERT INTO product (name, description, price, stock) VALUES
('Perfume X', 'Fragrância importada', 199.90, 50)
ON DUPLICATE KEY UPDATE description=VALUES(description), price=VALUES(price), stock=VALUES(stock);

INSERT INTO product (name, description, price, stock) VALUES
('Perfume Y', 'Fragrância francesa', 249.90, 30)
ON DUPLICATE KEY UPDATE description=VALUES(description), price=VALUES(price), stock=VALUES(stock);

-- Pedidos iniciais (garantindo IDs corretos com LIMIT 1)
INSERT INTO orders (status, total, user_id, product_id) VALUES
('PENDING', 199.90,
 (SELECT id FROM users WHERE email='admin@parfun.com' LIMIT 1),
 (SELECT id FROM product WHERE name='Perfume X' LIMIT 1))
ON DUPLICATE KEY UPDATE status=VALUES(status), total=VALUES(total);

INSERT INTO orders (status, total, user_id, product_id) VALUES
('PAID', 249.90,
 (SELECT id FROM users WHERE email='cliente@parfun.com' LIMIT 1),
 (SELECT id FROM product WHERE name='Perfume Y' LIMIT 1))
ON DUPLICATE KEY UPDATE status=VALUES(status), total=VALUES(total);
