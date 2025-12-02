## 📄 README.md

````markdown
# Parfun Imports

Projeto completo com **frontend (React)** e **backend (Spring Boot)** separados em branches dedicadas.  
Este repositório serve para organizar e compartilhar o desenvolvimento com a equipe.

---

## 🚀 Estrutura das Branches

- **main** → ponto de restauração (estado antigo, antes da separação).
- **frontend-react** → branch dedicada ao frontend.
- **backend-springboot** → branch dedicada ao backend.

---

## 📦 Como clonar o projeto

```bash
git clone https://github.com/KalmiroN/Parfun-Imports.git
cd Parfun-Imports
```
````

---

## 🎨 Frontend (React)

Branch: `frontend-react`

### Passos para rodar

```bash
git checkout frontend-react
cd frontend
npm install
npm run dev
```

### Tecnologias usadas

- React
- Vite
- TailwindCSS
- Context API

---

## ⚙️ Backend (Spring Boot)

Branch: `backend-springboot`

### Passos para rodar

```bash
git checkout backend-springboot
cd backend
mvn spring-boot:run
```

### Configuração do banco de dados

No arquivo `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/parfunimports
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```

> O banco é inicializado com `schema.sql` e `data.sql`.

---

## 👥 Equipe

Este repositório é colaborativo.  
Cada membro pode clonar e trabalhar em sua branch, depois abrir **Pull Requests** para revisão.

---

## 📌 Observações

- Use `main` apenas como referência/restauração.
- Para novas features, crie branches a partir de `frontend-react` ou `backend-springboot`.
- Sempre faça `git pull` antes de começar a trabalhar para manter sua branch atualizada.

```

```
