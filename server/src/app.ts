import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import userRouter from "./routes/user.routes.js";

const app = express();
const server = createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("Feriyo");
});

app.use("/api/users", userRouter);

export default server;
