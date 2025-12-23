// server.js
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json()); // para ler JSON no body

app.use("/api/user", userRoutes);

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
