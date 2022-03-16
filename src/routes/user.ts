import { Router } from "express";

import * as userController from "../controllers/user";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Bem vindo visitante!");
});

router.post("/", userController.createUser);
router.post("/login", userController.login);
export { router as userRouter };
