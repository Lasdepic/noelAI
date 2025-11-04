import bcrypt from "bcrypt";
import { addUser, findUserByEmail } from "../model/user.js";

export const resgisterController = async (req, res) => {
    try {
        const { nom, prenom, email, password } = req.body;

        if (!nom || !prenom || !email || !password)
            return res.status(400).json({ message: "Identifiant incorrect" });

        // Vérifier si l'utilisateur existe déja
        const userExists = await findUserByEmail(email);
        if (userExists)
            return res.status(400).json({ message: "Utilisateur déjà existant" });

        // Hasher le mot de passe 
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await addUser({ nom, prenom, email, password: hashPassword });

        return res
            .status(200)
            .json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (error) {
        console.error("registerController error:", error);
        return res
            .status(500)
            .json({ message: "Erreur de serveur de création de compte" });
    }
};