import cors from "cors";
import express from "express";

import "express-async-errors";
import "reflect-metadata";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.get("/error", (req, res) => {
  if (!req.body) {
    throw new Error("batata");
  }
});

app.use(errorHandlingMiddleware);

export { app };
