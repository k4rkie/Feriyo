import { z } from "zod";

const signUpUserSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters long")
      .max(30, "Username too long"),
    email: z.string().trim().email("Please enter a valid email").toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );

export type SignupDataInput = z.infer<typeof signUpUserSchema>;

export { signUpUserSchema };
