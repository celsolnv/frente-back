import { Request, Response, NextFunction } from "express";

import { UserAlreadyExists } from "../errors/UserAlreadyExists";

// eslint-disable-next-line consistent-return
export function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log("Entramos no error");
  if (err instanceof UserAlreadyExists) {
    return res.status(409).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(500).send({
    message: "Internal Server Error!",
  });
}
