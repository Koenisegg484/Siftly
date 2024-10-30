import winston from "winston";
import { Request, Response, NextFunction } from "express";

// Middleware for error handling
export default function (err: any, req: Request, res: Response, next: NextFunction) {
  winston.error(err.message, err);

  // Logging levels:
  // error, warn, info, verbose, debug, silly

  res.status(500).send("Something went wrong.");
}
