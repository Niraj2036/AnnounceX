import express from "express";
import { getAnnouncements } from "./user.ann.controller.js";

const router = express.Router();
router.get("/", getAnnouncements);

export default router;
