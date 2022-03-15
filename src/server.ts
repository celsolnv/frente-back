import "./database";
import "./setup";
import { app } from "./app";

app.listen(process.env.PORT, () => {
  console.log("servidor rodando...");
});
