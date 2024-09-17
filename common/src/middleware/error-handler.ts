import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error-class";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ error: err.serializeErrors() });
  }
};
