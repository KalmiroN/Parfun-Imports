# 🪔 Parfun Imports

Uma loja de perfumes online com design elegante, tons de dourado e laranja claro, e suporte a tema escuro.  
Este projeto foi desenvolvido em **React + TailwindCSS**, com sistema de **temas dinâmicos** e páginas completas de autenticação e administração.

---

## 🚀 Funcionalidades

- 🛒 **Carrinho de compras** com atualização dinâmica de quantidade e total.
- 💳 **Checkout** com formulário de pagamento integrado ao sistema de temas.
- ✅ **Confirmação de pedido** com feedback visual elegante.
- 📦 **Meus pedidos** para acompanhar histórico de compras.
- 🔧 **Administração de produtos e pedidos** com CRUD simples.
- 🎨 **Troca de tema** (claro, escuro e minimalista) usando variáveis CSS.
- 🔐 **Autenticação**:
  - Login
  - Cadastro (Register)
  - Recuperação de senha (Forgot Password)
  - Perfil do usuário (Profile)

---

## 🛠️ Tecnologias utilizadas

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- Context API para gerenciamento de tema
- Git para versionamento

---

## 📂 Estrutura do projeto

src/
├── components/ # Componentes reutilizáveis (ThemeSwitcher, etc.)
├── context/ # Provider de tema (themeProvider.jsx)
├── layouts/ # Layout principal da aplicação
├── pages/ # Páginas (Login, Register, Cart, Checkout, Admin, etc.)
├── styles/ # tokens.css e theme.css

---

## ⚙️ Como rodar o projeto

1. Clone ou abra o repositório local no VS Code:
   ```bash
   git clone <url-do-repositorio>
   cd parfum-imports
   ```
   Instale as dependências:

bash
npm install
Rode o servidor de desenvolvimento:

bash
npm run dev
Abra no navegador: http://localhost:5173
