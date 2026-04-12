import "dotenv/config";
import jwt from "jsonwebtoken";

const generateAccessToken = (userId: string) => {
  const accessToken = jwt.sign(
    { sub: userId },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1h" },
  );
  return accessToken;
};

const generateRefreshToken = (userId: string) => {
  const refreshToken = jwt.sign(
    { sub: userId },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "30d" },
  );
  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
