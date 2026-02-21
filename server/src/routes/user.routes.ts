import { Router } from "express";
import { signupController } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/signup", signupController);

export default userRouter;
