# ParfunImports Backend

Backend da aplicação **ParfunImports**, desenvolvido em **Spring Boot** com integração ao **MySQL** e autenticação via **Auth0**.

---

## 🚀 Tecnologias

- Java 17
- Spring Boot 3.3.5
- Spring Data JPA / Hibernate
- MySQL 8
- Auth0 (JWT Authentication)
- Maven

---

## ⚙️ Configuração Local

### 1. Banco de Dados

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE parfun_imports;
```

### 2. Variáveis de Ambiente

Defina as variáveis necessárias:

- `DB_URL` → URL JDBC do banco (ex.: `jdbc:mysql://localhost:3306/parfun_imports?useSSL=false&serverTimezone=UTC`)
- `DB_USER` → usuário do MySQL (ex.: `root`)
- `DB_PASSWORD` → senha do MySQL
- `AUTH0_DOMAIN` → domínio do Auth0 (ex.: `dev-w4m4ego8rxl0jjzq.us.auth0.com`)
- `AUTH0_CLIENT_ID` → Client ID da aplicação no Auth0
- `AUTH0_CLIENT_SECRET` → Client Secret da aplicação no Auth0
- `AUTH0_AUDIENCE` → identificador da API configurada no Auth0 (ex.: `https://parfunimports/api`)

No PowerShell:

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/parfun_imports?useSSL=false&serverTimezone=UTC"
$env:DB_USER="root"
$env:DB_PASSWORD="sua_senha"
$env:AUTH0_DOMAIN="dev-w4m4ego8rxl0jjzq.us.auth0.com"
$env:AUTH0_CLIENT_ID="SEU_CLIENT_ID"
$env:AUTH0_CLIENT_SECRET="SEU_CLIENT_SECRET"
$env:AUTH0_AUDIENCE="https://parfunimports/api"
```

### 3. Rodando o projeto

```powershell
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
   - `AUTH0_DOMAIN`
   - `AUTH0_CLIENT_ID`
   - `AUTH0_CLIENT_SECRET`
   - `AUTH0_AUDIENCE`
4. Faça o deploy do backend.  
   Railway injeta automaticamente a variável `PORT`, usada pelo Spring Boot.

A URL pública será algo como:

```
https://parfunimports-backend.up.railway.app
```

---

## 🔑 Autenticação

O backend utiliza **Auth0** para autenticação JWT.

### Gerar Token

Faça uma requisição para o Auth0:

```
POST https://dev-w4m4ego8rxl0jjzq.us.auth0.com/oauth/token
```

Body:

```json
{
  "client_id": "SEU_CLIENT_ID",
  "client_secret": "SEU_CLIENT_SECRET",
  "audience": "https://parfunimports/api",
  "grant_type": "client_credentials"
}
```

A resposta conterá `access_token`.

### Usar Token

Inclua o token no header:

```
Authorization: Bearer <access_token>
```

---

## 📡 Endpoints principais

### Autenticação

- `POST /api/auth/register` → registrar usuário
- `POST /api/auth/login` → login via Auth0

### Produtos

- `GET /api/products` → listar produtos
- `POST /api/products` → criar produto (requer token)

### Pedidos

- `GET /api/orders` → listar pedidos
- `POST /api/orders` → criar pedido

### Usuários

- `GET /api/users` → listar usuários
- `GET /api/users/{id}` → buscar usuário por ID

---

## 👨‍💻 Desenvolvedores

Este README serve para orientar quem for trabalhar no backend do **ParfunImports**.  
Para dúvidas sobre variáveis de ambiente e deploy, consulte a documentação da Railway e do Auth0.
