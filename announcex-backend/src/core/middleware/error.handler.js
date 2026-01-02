import { AppError } from "../errors/app.error.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: err.code,
      message: err.message,
    });
  }

  console.error(err);

  res.status(500).json({
    error: "INTERNAL_ERROR",
    message: "Something went wrong",
  });
}
