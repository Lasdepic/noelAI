
import mongoose from 'mongoose';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function connectDB() {
  const uri = process.env.DATA_URI;
  if (!uri) {
    throw new Error('DATA_URI is not defined. Please set DATA_URI in your environment or .env file.');
  }

  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Vous êtes connecté à la database!");
  } catch (err) {
    console.error("Erreur lors de la connexion à la DB:", err);
    throw err;
  }
}

