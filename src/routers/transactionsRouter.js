import { Router } from "express";
import * as transactionsController from "../controllers/transactionsController.js";
import * as userMiddlewares from "../middlewares/userMiddlewares.js";
import * as transactionsMiddlewares from "../middlewares/transactionsMiddlewares.js";

const transactionsRouter = Router();
transactionsRouter.post(
  "/financial-events",
  userMiddlewares.validateToken,
  transactionsMiddlewares.newTransactionMiddleware,
  transactionsController.newTransaction
);

transactionsRouter.get(
  "/financial-events",
  userMiddlewares.validateToken,
  transactionsController.getTransactions
);
transactionsRouter.get(
  "/financial-events/sum",
  userMiddlewares.validateToken,
  transactionsController.getTransactionsSum
);

export default transactionsRouter;
