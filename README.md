---

## 📂 README.md (versão atualizada)

```markdown
# 🛍️ Loja de Perfumes - React + Vite

Este projeto é uma aplicação **React** com **React Router** que simula uma loja de perfumes online.  
Inclui catálogo de produtos, carrinho, checkout, confirmação de pedido, gerenciamento de pedidos e páginas administrativas.

---

## 🚀 Tecnologias utilizadas

- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- Context API para gerenciamento de tema (`ThemeProvider`)
- TailwindCSS para estilização

---

## 📂 Estrutura de pastas

```

src/
├── components/ # Componentes reutilizáveis (Hero, Header, ProductCard, etc.)
├── context/ # Contextos globais (ThemeProvider)
├── layouts/ # Layout principal (Header + Footer)
├── pages/ # Páginas da aplicação
│ ├── home.jsx
│ ├── products.jsx
│ ├── productDetail.jsx
│ ├── cart.jsx
│ ├── checkout.jsx
│ ├── orderConfirmation.jsx
│ ├── myOrders.jsx
│ ├── login.jsx
│ ├── register.jsx
│ ├── forgotPassword.jsx
│ ├── profile.jsx
│ ├── wishlist.jsx
│ ├── search.jsx
│ ├── admin/
│ │ ├── adminProducts.jsx
│ │ └── adminOrders.jsx
│ └── notFound.jsx # Página de erro 404
├── App.jsx # Configuração das rotas
└── index.js # Ponto de entrada da aplicação

```

---

## 🖥️ Funcionalidades principais

- **Catálogo de produtos** com cards e imagens.
- **Detalhes do produto** com botão de adicionar ao carrinho.
- **Carrinho de compras** com opção de remover itens e finalizar compra.
- **Checkout** com formulário de entrega e pagamento.
- **Confirmação de pedido** com botões de navegação.
- **Meus pedidos** com listagem e detalhes.
- **Autenticação**: login, cadastro e recuperação de senha.
- **Perfil do usuário** com edição de dados.
- **Wishlist** para salvar favoritos.
- **Busca de produtos** com resultados e botões de ação.
- **Administração**: gerenciamento de produtos e pedidos.
- **Página NotFound (404)** para rotas inválidas.
- **ThemeProvider** para alternar temas globais (gold, dark, orange).

---

## 🎨 ThemeProvider

O `ThemeProvider` gerencia o tema global da aplicação.

- Usa **Context API** para disponibilizar o estado do tema.
- Permite alternar entre os temas: `gold`, `dark` e `orange`.
- Aplica classes no `<html>` para estilização global.

Exemplo de uso em um componente:

```jsx
import { useTheme } from "../context/themeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "gold" ? "dark" : "gold")}>
      Alternar tema (atual: {theme})
    </button>
  );
}
```

---

## ⚙️ Como rodar o projeto

```bash
# Instalar dependências
npm install

# Rodar em ambiente de desenvolvimento
npm run dev

# Build para produção
npm run build

Abra no navegador: http://localhost:5173
```

---

## 📌 Rotas principais

| Rota                  | Página            | Descrição                 |
| --------------------- | ----------------- | ------------------------- |
| `/`                   | Home              | Página inicial            |
| `/products`           | Products          | Catálogo de produtos      |
| `/products/:id`       | ProductDetail     | Detalhes do produto       |
| `/cart`               | Cart              | Carrinho de compras       |
| `/checkout`           | Checkout          | Finalizar compra          |
| `/order-confirmation` | OrderConfirmation | Confirmação do pedido     |
| `/my-orders`          | MyOrders          | Histórico de pedidos      |
| `/login`              | Login             | Autenticação              |
| `/register`           | Register          | Cadastro                  |
| `/forgot-password`    | ForgotPassword    | Recuperação de senha      |
| `/profile`            | Profile           | Perfil do usuário         |
| `/wishlist`           | Wishlist          | Lista de desejos          |
| `/search`             | Search            | Busca de produtos         |
| `/admin/products`     | AdminProducts     | Administração de produtos |
| `/admin/orders`       | AdminOrders       | Administração de pedidos  |
| `*`                   | NotFound          | Página 404                |

---

## 🛠️ Melhorias futuras

- Integração com API real para produtos e pedidos.
- Autenticação com JWT ou OAuth.
- Persistência de carrinho e wishlist no banco de dados.
- Testes automatizados com Jest/React Testing Library.

---

## 👨‍💻 Autor

Grupo de Alunos Da Turma 23 do Periodo noturno da faculdade nove de julho (Uninove).

```

---

👉 Esse README.md documenta **todas as alterações que fizemos** e adiciona seções importantes (instalação, rotas, estrutura, melhorias futuras).

```
