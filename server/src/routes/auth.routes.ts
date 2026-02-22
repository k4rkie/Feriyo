import { Router } from "express";
import {
  signupController,
  loginController,
} from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);

export default authRouter;
