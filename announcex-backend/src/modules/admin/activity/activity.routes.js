import express from "express";
import { getActivityLogs } from "./activity.controller.js";

const router = express.Router();

router.get("/", getActivityLogs);

export default router;
