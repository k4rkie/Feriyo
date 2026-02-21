import { db } from "../db/db.js";
import { usersTable } from "../db/schema.js";
import { SignupDataInput } from "../validators/user.validator.js";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { eq, or } from "drizzle-orm";

const signUpUser = async (signUpData: SignupDataInput) => {
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

export { signUpUser };
