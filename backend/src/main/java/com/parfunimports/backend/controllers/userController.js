import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // seu model de usuário (mongoose ou sequelize)

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verifica se o usuário existe
    const user = await User.findOne({ where: { email } }); // Sequelize
    // const user = await User.findOne({ email }); // Mongoose

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    // 2. Compara a senha com bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    // 3. Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET, // chave secreta definida no .env
      { expiresIn: "1h" } // token expira em 1 hora
    );

    // 4. Retorna o token e dados básicos do usuário
    res.json({
      message: "Login bem-sucedido",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
