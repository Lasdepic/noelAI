import express from "express";
import { resgisterController } from "../controller/registerController.js";
import { login } from "../controller/login.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", resgisterController);
router.post("/login", login);

router.get("/profil", verifyToken, (req, res) => {
  res.json({ message: "Bienvenue" + req.user.prenom });
});

export default router;
