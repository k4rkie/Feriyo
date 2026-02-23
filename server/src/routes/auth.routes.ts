import { Router } from "express";
import {
  signupController,
  loginController,
  refreshController,
  logoutController,
} from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.post("/refresh", refreshController);

export default authRouter;
