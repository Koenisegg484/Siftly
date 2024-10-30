import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import { Express, Request, Response } from "express";
import errorHandler from "middleware/errorHandler";

export function initRoutes(app: Express) {
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/healthcheck", (req: Request, res: Response) => {
    res.send("OK");
  });
  app.use(errorHandler); // errorHandler with the correct signature as above
}
