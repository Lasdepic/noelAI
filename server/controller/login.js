import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getAllUser } from "../model/user.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await getAllUser();
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) return res.status(400).json({ message: "Mot de passe incorrect" });

    if (!process.env.JWT_SECRET)
      return res.status(500).json({ message: "JWT_SECRET non configuré sur le serveur" });

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ message: "Authentification réussi", token });
  } catch (error) {
    res.status(400).json({ message: "erreur serveur" });
  }
};
