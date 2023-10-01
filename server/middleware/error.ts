import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddlware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error!";

  // mongodb Id errors
  if (err.name === "CastError") {
    const message = `Resource not found, invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // auth duplicate key error
  if (err.statusCode === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered!`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong jwt
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid!`;
    err = new ErrorHandler(message, 400);
  }

  //Expired jwt
  if (err.name === "TokenExpiredError") {
    const message = `Json web token Expired!`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
