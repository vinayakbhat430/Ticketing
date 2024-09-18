import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error-class";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.error(err)
    res.status(err.statusCode).send({ error: err.serializeErrors() });
  }
};
