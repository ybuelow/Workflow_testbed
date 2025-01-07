import { Router } from "express";
import {
  registerUser,
  getUser,
  loginUser,
  logoutUser,
} from "./auth.controller.js";
import { isAuthenticated } from "./authorisation.js";

const router = Router();

router.post("/register", registerUser);
router.get("/user", getUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
export { router };
