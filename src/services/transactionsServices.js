import jwt from "jsonwebtoken";
import * as transactionsRepository from "../repositories/transactionsRepository.js";

async function newTransaction(value, type, token) {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const financialTypes = ["INCOME", "OUTCOME"];

  if (!financialTypes.includes(type)) {
    throw { type: "error_invalid_type", message: "Invalid type" };
  }

  if (value < 0) {
    throw { type: "error_invalid_value", message: "Invalid value" };
  }

  await transactionsRepository.insertTransaction(user, value, type);
}

async function getTransactions(token) {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const transactions = await transactionsRepository.getTransactions(user);
  return transactions;
}

async function getSum(token) {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const events = await transactionsRepository.getTransactions(user);

  const sum = events.rows.reduce(
    (total, event) =>
      event.type === "INCOME" ? total + event.value : total - event.value,
    0
  );
  return sum;
}

export { newTransaction, getTransactions, getSum };
