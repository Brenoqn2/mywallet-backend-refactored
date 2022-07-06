import * as userServices from "../services/userServices.js";

async function signUp(req, res) {
  const { name, email, password } = req.body;

  await userServices.createUser(name, email, password);

  res.sendStatus(201);
}

async function signIn(req, res) {
  const { email, password } = req.body;

  const token = await userServices.loginUser(email, password);

  res.send({
    token,
  });
}

export { signUp, signIn };
