import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import authRouter from "./routes/auth.routes.js";

const app = express();
const server = createServer(app);

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("Feriyo");
});

app.use("/api/auth", authRouter);

export default server;
