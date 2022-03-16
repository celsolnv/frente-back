import { Request, Response } from "express";

import * as userSchema from "../schemas/userSchemas";
import * as userService from "../services/user";

export async function createUser(req: Request, res: Response) {
  const data: userService.ICreateUserData = req.body;
  data.cpf = data.cpf.replace(/[./-]/, "");
  data.cep = data.cep.replace(/[-]/, "");
  const validate = userSchema.createUser.validate(data);
  if (validate.error) {
    return res.status(400).send({ message: validate.error.message });
  }
  const user = await userService.createUser(data);
  return res.status(201).send(user);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const validate = userSchema.login.validate({ password, email });
  if (validate.error) {
    return res.status(400).send({ message: validate.error.message });
  }

  const token = await userService.login({ email, password });

  return res.send({ token });
}
