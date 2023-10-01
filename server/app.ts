require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddlware } from "./middleware/error";

export const app = express();

//Body parser
app.use(express.json({ limit: "50mb" }));

//cookie Parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// Testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Hello world",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found ${req.originalUrl}`) as any;
  error.statusCode = 404;
  next(error);
});


app.use(ErrorMiddlware)