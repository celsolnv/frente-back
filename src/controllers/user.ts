import { Request, Response } from "express";

import { createUserSchema } from "../schemas/userSchemas";
import * as userService from "../services/user";

export async function createUser(req: Request, res: Response) {
  const data: userService.ICreateUserData = req.body;
  try {
    const validate = createUserSchema.validate(data);
    if (validate.error) {
      return res.status(400).send(validate.error.message);
    }
    const user = await userService.createUser(data);

    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
