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

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  const user = await userService.getUser(id);

  res.send(user);
}

export async function getUsers(req: Request, res: Response) {
  const users = await userService.getUsers();

  if (users.length === 0) {
    return res.status(404).send({ message: "Users not found" });
  }

  return res.send(users);
}
