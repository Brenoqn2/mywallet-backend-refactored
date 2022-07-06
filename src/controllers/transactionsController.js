import * as transactionsService from "../services/transactionsServices.js";

async function newTransaction(req, res) {
  const { value, type } = req.body;
  const authorization = req.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  await transactionsService.newTransaction(value, type, token);
  res.sendStatus(201);
}

async function getTransactions(req, res) {
  const authorization = req.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  const events = await transactionsService.getTransactions(token);

  res.send(events.rows);
}

async function getTransactionsSum(req, res) {
  const authorization = req.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  const sum = await transactionsService.getSum(token);
  res.send({ sum });
}

export { newTransaction, getTransactions, getTransactionsSum };
