
import express from "express";
import announcementsRoutes from "./announcements/user.ann.routes.js";
import { requireAuth } from "../../core/middleware/auth.middleware.js";
import userRoutes from "./user.routes.js";

const router = express.Router();
router.use(requireAuth);
router.use("/announcements", announcementsRoutes);
router.use("/", userRoutes);
export default router;
