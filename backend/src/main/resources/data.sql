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

