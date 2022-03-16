import { Request, Response, NextFunction } from "express";

import { PasswordNotMatch } from "../errors/PasswordNotMatch";
import { UserAlreadyExists } from "../errors/UserAlreadyExists";
import { UserDoesNotExists } from "../errors/UserDoesNotExist";

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
  if (err instanceof UserDoesNotExists) {
    return res.status(404).send({
      message: err.message,
    });
  }
  if (err instanceof PasswordNotMatch) {
    return res.status(401).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(500).send({
    message: "Internal Server Error!",
  });
}
