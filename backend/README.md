```markdown
# 🛍️ ParfunImports Backend

Backend da aplicação **ParfunImports**, desenvolvido em **Spring Boot** com integração ao **MySQL** e autenticação via **JWT interno**.  
Responsável por fornecer a API REST que conecta o frontend (React) ao banco de dados e serviços de autenticação.

---

## 🚀 Tecnologias

- **Java 17**
- **Spring Boot 3.3.5**
- **Spring Data JPA / Hibernate**
- **MySQL 8**
- **JWT (JSON Web Token)**
- **Maven**

---

## 📂 Estrutura de pastas
```

backend/
├── src/
│ ├── main/
│ │ ├── java/com/parfunimports/... # Código fonte principal
│ │ └── resources/ # application.properties, configs
│ └── test/ # Testes automatizados
├── pom.xml # Configuração Maven
└── README.md

````

---

## ⚙️ Configuração Local

### 1. Banco de Dados

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE parfun_imports;
````

### 2. Variáveis de Ambiente

Defina as variáveis necessárias:

- `DB_URL` → URL JDBC do banco (ex.: `jdbc:mysql://localhost:3306/parfun_imports?useSSL=false&serverTimezone=UTC`)
- `DB_USER` → usuário do MySQL (ex.: `root`)
- `DB_PASSWORD` → senha do MySQL
- `JWT_SECRET` → chave secreta usada para assinar os tokens JWT
- `JWT_EXPIRATION` → tempo de expiração dos tokens (em ms, ex.: `86400000` para 24h)

No PowerShell:

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/parfun_imports?useSSL=false&serverTimezone=UTC"
$env:DB_USER="root"
$env:DB_PASSWORD="sua_senha"
$env:JWT_SECRET="uma_chave_secreta_segura"
$env:JWT_EXPIRATION="86400000"
```

### 3. Rodando o projeto

```bash
mvn spring-boot:run
```

O backend estará disponível em:

```
http://localhost:8080
```

---

## ☁️ Deploy na Railway

1. Crie um novo projeto na [Railway](https://railway.app).
2. Adicione um serviço **MySQL** e copie as credenciais geradas.
3. Configure as variáveis de ambiente no painel da Railway:
   - `DB_URL`
   - `DB_USER`
   - `DB_PASSWORD`
   - `JWT_SECRET`
   - `JWT_EXPIRATION`
4. Faça o deploy do backend.  
   Railway injeta automaticamente a variável `PORT`, usada pelo Spring Boot.

A URL pública será algo como:

```
https://parfunimports-backend.up.railway.app
```

---

## 🔑 Autenticação com JWT

O backend utiliza **JWT interno** para autenticação.

### Fluxo de autenticação

1. **Registro de usuário** → `POST /api/auth/register`

   - Cria um novo usuário no banco.
   - Retorna dados básicos do usuário.

2. **Login** → `POST /api/auth/login`

   - Valida credenciais.
   - Retorna um `access_token` JWT assinado com `JWT_SECRET`.

3. **Uso do token**
   - Inclua o token no header das requisições protegidas:

```
Authorization: Bearer <access_token>
```

---

## 📡 Endpoints principais

| Endpoint             | Método | Descrição                        | Autenticação |
| -------------------- | ------ | -------------------------------- | ------------ |
| `/api/auth/register` | POST   | Registrar usuário                | ❌           |
| `/api/auth/login`    | POST   | Login e geração de JWT           | ❌           |
| `/api/products`      | GET    | Listar produtos                  | ❌           |
| `/api/products`      | POST   | Criar produto                    | ✅ (admin)   |
| `/api/orders`        | GET    | Listar pedidos                   | ✅           |
| `/api/orders/my`     | GET    | Listar pedidos do usuário logado | ✅           |
| `/api/orders`        | POST   | Criar pedido                     | ✅           |
| `/api/users`         | GET    | Listar usuários                  | ✅ (admin)   |
| `/api/users/{id}`    | GET    | Buscar usuário por ID            | ✅           |

---

## 🛠️ Melhorias futuras

- Implementar testes automatizados com **JUnit**.
- Adicionar documentação da API com **Swagger/OpenAPI**.
- Melhorar logs e monitoramento com **Spring Actuator**.
- Persistência de carrinho e wishlist no banco de dados.
- Integração com serviços de pagamento reais (ex.: Stripe, PayPal).

---

## 👨‍💻 Desenvolvedores

Este README serve para orientar quem for trabalhar no backend do **ParfunImports**.  
Para dúvidas sobre variáveis de ambiente e deploy, consulte a documentação da **Railway**.

```

---
```
