import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";

async function createUser(name, email, password) {
  const hashedPassword = bcrypt.hashSync(password, 12);

  await userRepository.insertUser(name, email, hashedPassword);
}

async function loginUser(email, password) {
  const { rows } = await userRepository.existingUser(email);
  const [user] = rows;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw { type: "error_invalid_credentials", message: "Invalid credentials" };
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  return token;
}

export { createUser, loginUser };
