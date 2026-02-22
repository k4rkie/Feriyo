import { db } from "../db/db.js";
import { usersTable } from "../db/schema.js";
import {
  signupDataInput,
  loginDataInput,
} from "../validators/user.validator.js";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { eq, or } from "drizzle-orm";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const signUpUser = async (signUpData: signupDataInput) => {
  const { username, email, password } = signUpData;

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(or(eq(usersTable.email, email), eq(usersTable.username, username)))
    .limit(1);

  if (existingUser) {
    const errMessage =
      existingUser.email === email
        ? "User with that email already exists"
        : "Username alrady taken";
    throw new Error(errMessage);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const [newUser] = await db
    .insert(usersTable)
    .values({
      username: username,
      email: email,
      passwordHash: passwordHash,
    })
    .returning({
      userId: usersTable.userId,
      username: usersTable.username,
      email: usersTable.email,
    });

  return newUser;
};

const loginUser = async (loginData: loginDataInput) => {
  const { email, password } = loginData;
  const [existingUser] = await db
    .select({
      userId: usersTable.userId,
      username: usersTable.username,
      email: usersTable.email,
      passwordHash: usersTable.passwordHash,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.passwordHash,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const loggedInUser = {
    userId: existingUser.userId,
    username: existingUser.username,
    email: existingUser.email,
  };

  const accessToken = generateAccessToken(existingUser.userId);
  const refreshToken = generateRefreshToken(existingUser.userId);

  return { loggedInUser, accessToken, refreshToken };
};

export { signUpUser, loginUser };
