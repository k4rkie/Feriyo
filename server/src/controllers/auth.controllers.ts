import { Request, Response, NextFunction } from "express";
import {
  signUpUserSchema,
  loginUserSchema,
} from "../validators/auth.validator.js";
import { signUpUser, loginUser } from "../services/auth.services.js";
import path from "node:path/posix";

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
      message: null,
      data: null,
      error: fieldErrors,
    });
  }

  try {
    const newUser = await signUpUser(result.data);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user: newUser },
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

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = loginUserSchema.safeParse(req.body);

  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    return res.status(400).json({
      success: false,
      message: null,
      data: null,
      error: fieldErrors,
    });
  }
  try {
    const { loggedInUser, accessToken, refreshToken } = await loginUser(
      result.data,
    );
    res.cookie("refreshToken", refreshToken, {
      path: "/api/auth",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { user: loggedInUser, accessToken },
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

const refreshController = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No refresh token found",
      data: null,
      error: null,
    });
  }
};

export { signupController, loginController };
