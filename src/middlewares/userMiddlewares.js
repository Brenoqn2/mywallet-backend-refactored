import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";

async function signUpMiddleware(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw { type: "error_missing_fields", message: "Missing fields" };
  }

  const existingUsers = await userRepository.existingUser(email);

  if (existingUsers.rowCount > 0) {
    console.log("aqui");
    throw { type: "error_user_already_exists", message: "User already exists" };
  }

  next();
}

async function signInMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw { type: "error_missing_fields", message: "Missing fields" };
  }

  next();
}

async function validateToken(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    throw { type: "error_invalid_token", message: "Invalid token" };
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw { type: "error_invalid_token", message: "Invalid token" };
    }
  });

  next();
}

export { signUpMiddleware, signInMiddleware, validateToken };
