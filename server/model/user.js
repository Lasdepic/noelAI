import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userShema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userShema);
export default User;

// ################################## CRUD #################################

export async function addUser(user) {
  try {
    const created = await User.create(user);
    return created;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Trouver un user par email
export async function findUserByEmail(email) {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// supprimer un user

export async function deleteUser(user) {
  try {
    await User.deleteOne(user);
  } catch (error) {
    console.log(error);
  }
}

// modifier un user

export async function editUser(userId, updateUser) {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          nom: updateUser.nom,
          prenom: updateUser.prenom,
          email: updateUser.email,
          password: updateUser.password,
        },
      },
      {
        new: true,
      }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

// recupérer un user par son id

export async function getUserID(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
}

// recupérer tout les user 

export async function getAllUser(){
  return await User.find();
}
