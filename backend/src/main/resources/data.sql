-- Usuários iniciais
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@parfun.com', '1234', 'ADMIN'),
('Cliente', 'cliente@parfun.com', 'abcd', 'USER');

-- Produtos iniciais
INSERT INTO product (name, description, price, stock) VALUES 
('Perfume X', 'Fragrância importada', 199.90, 50),
('Perfume Y', 'Fragrância francesa', 249.90, 30);

-- Pedidos iniciais
INSERT INTO orders (status, total, user_id, product_id) VALUES 
('PENDING', 199.90, 1, 1),
('PAID', 249.90, 2, 2);
