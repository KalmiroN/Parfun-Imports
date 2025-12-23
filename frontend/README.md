```markdown
# 🛍️ Loja de Perfumes - React + Vite + Spring Boot

Este projeto é uma aplicação **React** com **React Router** que simula uma loja de perfumes online.  
Inclui catálogo de produtos, carrinho, checkout com opções de pagamento, confirmação de pedido, gerenciamento de pedidos e páginas administrativas.  
Agora o repositório está organizado em **frontend** (React) e **backend** (Spring Boot).

---

## 🚀 Tecnologias utilizadas

### Frontend

- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- Context API para gerenciamento de tema (`ThemeProvider`, `CartProvider`, `WishlistProvider`, `AuthProvider`)
- TailwindCSS para estilização

### Backend

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- Banco de dados relacional (PostgreSQL/MySQL)
- Autenticação JWT interna

---

## 📂 Estrutura de pastas
```

Parfun-Imports/
├── frontend/ # Aplicação React
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
└── backend/ # Aplicação Spring Boot
├── pom.xml
└── src/main/java/com/parfunimports/...

````

---

## 🖥️ Funcionalidades principais

- **Catálogo de produtos** com cards e imagens.
- **Detalhes do produto** com botão de adicionar ao carrinho.
- **Carrinho de compras** com opção de remover itens e finalizar compra.
- **Checkout** com formulário de entrega e **asides de pagamento (Cartão/Pix)**.
- **Confirmação de pedido** com botões de navegação.
- **Meus pedidos** com listagem e detalhes.
- **Autenticação**: login, cadastro e recuperação de senha.
- **Perfil do usuário** com edição de dados e inputs padronizados.
- **Wishlist** para salvar favoritos.
- **Busca de produtos** com resultados e botões de ação.
- **Administração**: gerenciamento de produtos e pedidos.
- **Página NotFound (404)** para rotas inválidas.
- **ThemeProvider** para alternar temas globais (gold, dark, orange).
- **Header** com logout funcional e menu mobile.

---

## 🎨 ThemeProvider

O `ThemeProvider` gerencia o tema global da aplicação.

- Usa **Context API** para disponibilizar o estado do tema.
- Permite alternar entre os temas: `gold`, `dark` e `orange`.
- Aplica classes no `<html>` para estilização global.

---

## 🔗 Integração Frontend ↔ Backend

A comunicação entre o **React (frontend)** e o **Spring Boot (backend)** é feita via **Fetch API**.
Foi criado um utilitário `authFetch.js` que encapsula o `fetch` nativo do JavaScript, adicionando:

- Headers padrão (`Content-Type: application/json`)
- Token JWT no header (`Authorization: Bearer <token>`)
- Tratamento de erros e respostas
- Retorno estruturado (`{ ok, status, data }`)

Exemplo de uso:

```js
import { authFetch } from "../utils/authFetch";

const response = await authFetch(
  `${import.meta.env.VITE_API_URL}/orders/my`,
  {},
  token
);

if (response.ok) {
  console.log(response.data);
}
````

---

## ⚙️ Como rodar o projeto

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abra no navegador: http://localhost:5173

### Backend

```bash
cd backend
mvn spring-boot:run
```

---

## 📌 Rotas principais (Frontend)

| Rota                  | Página            | Descrição                    |
| --------------------- | ----------------- | ---------------------------- |
| `/`                   | Home              | Página inicial               |
| `/products`           | Products          | Catálogo de produtos         |
| `/products/:id`       | ProductDetail     | Detalhes do produto          |
| `/cart`               | Cart              | Carrinho de compras          |
| `/checkout`           | Checkout          | Finalizar compra + Pagamento |
| `/order-confirmation` | OrderConfirmation | Confirmação do pedido        |
| `/my-orders`          | MyOrders          | Histórico de pedidos         |
| `/login`              | Login             | Autenticação                 |
| `/register`           | Register          | Cadastro                     |
| `/forgot-password`    | ForgotPassword    | Recuperação de senha         |
| `/profile`            | Profile           | Perfil do usuário            |
| `/wishlist`           | Wishlist          | Lista de desejos             |
| `/search`             | Search            | Busca de produtos            |
| `/admin/products`     | AdminProducts     | Administração de produtos    |
| `/admin/orders`       | AdminOrders       | Administração de pedidos     |
| `*`                   | NotFound          | Página 404                   |

---

## 🛠️ Melhorias futuras

- Integração completa entre frontend e backend via API REST.
- Persistência de carrinho e wishlist no banco de dados.
- Testes automatizados com Jest/React Testing Library e JUnit.
- Documentação da API com Swagger/OpenAPI.

---

## 👨‍💻 Autor

Grupo de Alunos da Turma 23 do período noturno da Faculdade Nove de Julho (Uninove).

```

---
```
