import { Request, Response } from "express";

import { createUserSchema } from "../schemas/userSchemas";
import * as userService from "../services/user";

export async function createUser(req: Request, res: Response) {
  const data: userService.ICreateUserData = req.body;
  data.cpf = data.cpf.replace(/[./-]/, "");
  data.cep = data.cep.replace(/[-]/, "");
  const validate = createUserSchema.validate(data);
  if (validate.error) {
    return res.status(400).send(validate.error.message);
  }
  const user = await userService.createUser(data);
  return res.status(201).send(user);
}
