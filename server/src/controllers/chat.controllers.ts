import { Request, Response, NextFunction } from "express";
import { contactSellerSchema } from "../validators/chat.validator.js";
import { contactSeller, getChatData } from "../services/chat.services.js";
import { log } from "node:console";
import { NotFoundError } from "../errors/index.js";

const contactSellerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user!.userId;

  const result = contactSellerSchema.safeParse(req.body);
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    return res.status(400).json({
      success: false,
      message: "Zod Validation Error",
      data: null,
      error: fieldErrors,
    });
  }
  try {
    const chatId = await contactSeller(result.data, userId);
    return res.status(201).json({
      success: true,
      message: "Contact seller successful",
      data: { chatId },
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
      data: null,
      error: error,
    });
    next(error);
  }
};

const getChatDataController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const chatId = String(req.params.chatId);
  try {
    const { chatData, messages } = await getChatData(chatId);
    return res.status(200).json({
      success: true,
      message: "Chat data fetched successfully",
      data: { chatData, messages },
      error: null,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(error.statusCode).json({
        success: false,
        message: "Listing fetch Error",
        data: null,
        error: error.message,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Data fetch error",
      data: null,
      error: error,
    });
  }
};

export { contactSellerController, getChatDataController };
