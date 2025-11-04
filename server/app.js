import express, { json } from "express";
import ollama from "ollama";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

configDotenv();

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Mount user routes (register, login, profile)
app.use("/", userRoutes);


const PORT = 3000;

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;
  try {
    const response = await ollama.chat({
      model: "pereNoel",
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });
    const answer = response.message.content;
    res.status(200).json({ answer });
  } catch (error) {
    res.status(400).json({ message: "Une erreur est survenue sur le serveur" });
  }
});

app.listen(PORT, () => console.log("Vous êtes connecté sur le port " + PORT));
