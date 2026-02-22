import "dotenv/config";
import jwt from "jsonwebtoken";

const generateAccessToken = (userId: number) => {
  const accessToken = jwt.sign(
    { sub: userId },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );
  return accessToken;
};

const generateRefreshToken = (userId: number) => {
  const refreshToken = jwt.sign(
    { sub: userId },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );
  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
