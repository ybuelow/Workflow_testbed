import { Router } from "express";
import {
  getGrantedMemories,
  updateMemory,
  deleteMemory,
  createMemorys,
  getMyMemories,
} from "./memory.controller.js";
import { get } from "mongoose";

const router = Router();

router.get("/granted/:id", getGrantedMemories);
router.get("/:id", getMyMemories);
router.post("/", createMemorys);
router.put("/:id", updateMemory);
router.delete("/:id", deleteMemory);

export { router };
