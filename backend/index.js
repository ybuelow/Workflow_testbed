import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { router as memoryRouter } from "./memory/memory.routes.js";
import { router as authRouter } from "./auth/auth.routes.js";
import { router as userRouter } from "./user/user.routes.js";
import { init } from "./auth/init.js";

const app = express();

mongoose.connect(process.env.DB_URL);
app.use(express.static("static"));
init(app);

app.use(express.json());
app.use("/memorys", memoryRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

mongoose.connection.once("open", () => {
  console.log(process.env.KEY_PATH, process.env.CERT_PATH);
  const port = process.env.PORT;
  console.log(port);
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Server listens to https://localhost:${port}`);
  });
});
