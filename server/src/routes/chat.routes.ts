import express, { Router } from "express";
import {
  contactSellerController,
  getChatDataController,
} from "../controllers/chat.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.get("/:chatId", protect, getChatDataController);
chatRouter.post("", express.json(), protect, contactSellerController);

export default chatRouter;
