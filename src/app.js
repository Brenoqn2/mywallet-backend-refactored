import cors from "cors";
import express from "express";
import "express-async-errors";
import userRouter from "./routers/userRouter.js";
import transactionsRouter from "./routers/transactionsRouter.js";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(transactionsRouter);
app.use(errorHandlingMiddleware);

export default app;
