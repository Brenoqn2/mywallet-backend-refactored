import { Router } from "express";
import * as userController from "../controllers/userController.js";
import * as userMiddlewares from "../middlewares/userMiddlewares.js";

const userRouter = Router();
userRouter.post(
  "/sign-up",
  userMiddlewares.signUpMiddleware,
  userController.signUp
);
userRouter.post(
  "/sign-in",
  userMiddlewares.signInMiddleware,
  userController.signIn
);

export default userRouter;
