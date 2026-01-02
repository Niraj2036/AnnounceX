import express from "express";
import { createAnnouncement } from "./admin.ann.controller.js";

const router = express.Router();
router.post("/", createAnnouncement);

export default router;
