import { Request, Response, NextFunction } from "express";
import { signUpUserSchema } from "../validators/user.validator.js";
import { signUpUser } from "../services/user.services.js";

const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = signUpUserSchema.safeParse(req.body);

  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    return res.status(400).json({
      success: false,
      message: "",
      data: null,
      error: fieldErrors,
    });
  }

  try {
    const newUser = await signUpUser(result.data);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
      error: null,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
      error: null,
    });
  }
};

export { signupController };
